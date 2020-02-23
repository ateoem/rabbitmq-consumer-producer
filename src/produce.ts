import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve(__dirname, "../.env") });

import RabbitMQProducer from "./producer/RabbitMQProducer";
import { Connection, connect, Channel } from "amqplib";
import SeederProducerBridge from "./common/SeederProducerBridge";
import ExecuteSeederProducer from "./common/ExecuteSeederProducer";
import seedersConfig, { SeederConfigType } from "./seeder-config";

const seederName: string = process.env.SEEDER ? process.env.SEEDER : "";
const url: string = process.env.AMQP_URL ? process.env.AMQP_URL : "";
const ms: number = process.env.INTERVAL ? parseInt(process.env.INTERVAL) : 100;

const seedersToProduce: SeederConfigType[] = seedersConfig[seederName];
if (!seedersToProduce) {
  console.error("There is no such provider!");
  process.exit(1);
}

let executeSeeders: ExecuteSeederProducer[];

connect(url)
  .then((connection: Connection) => connection.createChannel())
  .then(async (channel: Channel) => {
    executeSeeders = seedersToProduce.map((seederConfig: SeederConfigType) => {
      const producer = new RabbitMQProducer(seederConfig.queueName, channel);
      const seederProducer = new SeederProducerBridge(
        [seederConfig.seeder],
        producer
      );
      return new ExecuteSeederProducer(seederProducer, ms);
    });

    executeSeeders.forEach((executeSeeder: ExecuteSeederProducer) => {
      executeSeeder.start();
    });
  })
  .catch((error: Error) => {
    console.error(`Couldn't start consumer: ${error.message}`);
  });

process.on("SIGINT", function() {
  console.log("Caught interrupt signal");
  if (executeSeeders.length > 0) {
    Promise.all(
      executeSeeders.map((consumerBridge: ExecuteSeederProducer) =>
        consumerBridge.stop()
      )
    ).then(() => {
      console.log(`Gracefully shutting down`);
      process.exit(0);
    });
  } else {
    console.log(`Gracefully shutting down`);
    process.exit(0);
  }
});

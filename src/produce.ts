import RabbitMQProducer from "./producer/RabbitMQProducer";
import { Connection, connect, Channel } from "amqplib";
import SeederProducerBridge from "./common/SeederProducerBridge";
import ExecuteSeederProducer from "./common/ExecuteSeederProducer";
import seedersConfig, { SeederConfigType } from "./seeder-config";
import InterruptListener from "./InterruptListener";

const seederName: string = process.env.SEEDER ? process.env.SEEDER : "";
const url: string = process.env.AMQP_URL ? process.env.AMQP_URL : "";
const ms: number = process.env.INTERVAL ? parseInt(process.env.INTERVAL) : 100;

const seedersToProduce: SeederConfigType[] = seedersConfig[seederName];
if (!seedersToProduce) {
  console.error(`There is no such seeder as ${seederName}!`);
  process.exit(1);
}

const executeSeeders: ExecuteSeederProducer[] = [];

connect(url)
  .then((connection: Connection) => connection.createChannel())
  .then(async (channel: Channel) => {
    seedersToProduce
      .map((seederConfig: SeederConfigType) => {
        const producer = new RabbitMQProducer(seederConfig.queueName, channel);
        const seederProducer = new SeederProducerBridge(
          [seederConfig.seeder],
          producer
        );
        return new ExecuteSeederProducer(seederProducer, ms);
      })
      .forEach(seeder => executeSeeders.push(seeder));

    executeSeeders.forEach((executeSeeder: ExecuteSeederProducer) => {
    console.log(`Start to produce@${ms} ms.`);
      executeSeeder.start();
    });
  })
  .catch((error: Error) => {
    console.error(`Couldn't start consumer: ${error.message}`);
  });

process.on("SIGINT", InterruptListener(executeSeeders));

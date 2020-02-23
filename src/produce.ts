import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve(__dirname, "../.env") });

import RabbitMQProducer from "./producer/RabbitMQProducer";
import { Connection, connect, Channel } from "amqplib";
import SeederProducerBridge from "./common/SeederProducerBridge";
import ExecuteSeederProducer from "./common/ExecuteSeederProducer";
import seedersConfig, { SeederConfigType } from "./seeder-config";

(async (): Promise<void> => {
  const seederName: string = process.env.SEEDER ? process.env.SEEDER : "";
  const url: string = process.env.AMQP_URL ? process.env.AMQP_URL : "";
  const ms: number = process.env.INTERVAL
    ? parseInt(process.env.INTERVAL)
    : 100;

  const seedersToProduce: SeederConfigType[] = seedersConfig[seederName];
  if (!seedersToProduce) {
    console.error("There is no such provider!");
    process.exit(1);
  }
  const connection: Connection = await connect(url);
  const channel: Channel = await connection.createChannel();

  const executeSeeders: ExecuteSeederProducer[] = seedersToProduce.map(
    (seederConfig: SeederConfigType) => {
      const producer = new RabbitMQProducer(seederConfig.queueName, channel);
      const seederProducer = new SeederProducerBridge(
        [seederConfig.seeder],
        producer
      );
      return new ExecuteSeederProducer(seederProducer, ms);
    }
  );

  executeSeeders.forEach((executeSeeder: ExecuteSeederProducer) => {
    executeSeeder.start();
  });
})();

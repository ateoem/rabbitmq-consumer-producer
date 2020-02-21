import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve(__dirname, "../.env") });

import { Connection, connect, Channel } from "amqplib";
import LoggerConsumerBrige from "./common/LoggerConsumerBridge";
import LoggerInterface from "./logger/LoggerInterface";
import ConsoleLogger from "./logger/ConsoleLogger";
import RabbitMQConsumer from "./consumer/RabbitMQConsumer";
import seeders, { SeederConfigType } from "./seeders";

(async (): Promise<void> => {
  const seederName: string = process.env.SEEDER ? process.env.SEEDER : "";
  const url: string = process.env.AMQP_URL ? process.env.AMQP_URL : "";

  const seedersToConsume: SeederConfigType[] = seeders[seederName];
  if (!seedersToConsume) {
    console.error("There is no such provider!");
    process.exit(1);
  }
  const connection: Connection = await connect(url);
  const channel: Channel = await connection.createChannel();
  const logger: LoggerInterface = new ConsoleLogger();
  const consumerBridges: LoggerConsumerBrige[] = await Promise.all(
    seedersToConsume.map((seeder: SeederConfigType) => {
      const consumer = new RabbitMQConsumer(seeder.queueName, channel);
      return new LoggerConsumerBrige(logger, consumer);
    })
  );

  consumerBridges.forEach((bridge: LoggerConsumerBrige) => {
    bridge.logWithConsume();
  });
})();

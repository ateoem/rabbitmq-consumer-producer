import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve(__dirname, "../.env") });

import { Connection, connect, Channel } from "amqplib";
import LoggerConsumerBrige from "./common/LoggerConsumerBridge";
import LoggerInterface from "./logger/LoggerInterface";
import ConsoleLogger from "./logger/ConsoleLogger";
import RabbitMQConsumer from "./consumer/RabbitMQConsumer";
import seeders, { SeederConfigType } from "./seeder-config";

const seederName: string = process.env.SEEDER ? process.env.SEEDER : "";
const url: string = process.env.AMQP_URL ? process.env.AMQP_URL : "";

const seedersToConsume: SeederConfigType[] = seeders[seederName];
if (!seedersToConsume) {
  console.error(`There is no such seeder as ${seederName}!`);
  process.exit(1);
}

let consumerBridges: LoggerConsumerBrige[];

connect(url)
  .then((connection: Connection) => connection.createChannel())
  .then((channel: Channel) => {
    const logger: LoggerInterface = new ConsoleLogger();
    consumerBridges = seedersToConsume.map((seeder: SeederConfigType) => {
      const consumer = new RabbitMQConsumer(seeder.queueName, channel);
      return new LoggerConsumerBrige(logger, consumer);
    });

    consumerBridges.forEach((bridge: LoggerConsumerBrige) => {
      console.log(`Start to consume.`);
      bridge.logWithConsume();
    });
  })
  .catch((error: Error) => {
    console.error(`Couldn't start consumer: ${error.message}`);
  });

process.on("SIGINT", function() {
  console.log("Caught interrupt signal");
  if (consumerBridges.length > 0) {
    Promise.all(
      consumerBridges.map((consumerBridge: LoggerConsumerBrige) =>
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

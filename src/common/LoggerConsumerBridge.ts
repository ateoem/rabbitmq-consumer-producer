import LoggerInterface from "../logger/LoggerInterface";
import Consumer from "../consumer/Consumer";
import IncomingMessage from "../message/IncomingMessage";

class LoggerConsumerBrige {
  private logger: LoggerInterface;
  private consumer: Consumer;

  constructor(logger: LoggerInterface, consumer: Consumer) {
    this.logger = logger;
    this.consumer = consumer;
  }

  logWithConsume(): void {
    this.consumer.consume(async (message: IncomingMessage) => {
      this.logger.log(message.toString());
      await message.ack();
    });
  }
}

export default LoggerConsumerBrige;

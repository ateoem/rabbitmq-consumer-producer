import LoggerInterface from "../logger/LoggerInterface";
import Consumer from "../consumer/Consumer";
import IncomingMessage from "../message/IncomingMessage";

class LoggerConsumerBrige {
  constructor(private logger: LoggerInterface, private consumer: Consumer) {}

  public logWithConsume(): void {
    this.consumer.consume(async (message: IncomingMessage) => {
      this.logger.log(message.toString());
      await message.ack();
    });
  }
}

export default LoggerConsumerBrige;

import LoggerInterface from "../logger/LoggerInterface";
import Consumer from "../consumer/Consumer";
import IncomingMessage from "../message/IncomingMessage";
import Stoppable from "./Stoppable";

class LoggerConsumerBrige implements Stoppable {
  constructor(private logger: LoggerInterface, private consumer: Consumer) {}

  public logWithConsume(): void {
    this.consumer.consume(async (message: IncomingMessage) => {
      this.logger.log(message.toString());
      await message.ack();
    });
  }

  public stop(): Promise<void> {
    return this.consumer.stop();
  }
}

export default LoggerConsumerBrige;

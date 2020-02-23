import { Channel } from "amqplib";
import Producer from "./Producer";

class RabbitMQProducer extends Producer {
  private channel: Channel;
  private closed = false;

  constructor(queueName: string, channel: Channel) {
    super(queueName);
    this.channel = channel;
  }

  public async produce(message: string): Promise<boolean> {
    if (!this.closed) {
      const bufferedMessage = Buffer.from(message.toString());
      await this.channel.assertQueue(this.queueName);
      return this.channel.sendToQueue(this.queueName, bufferedMessage);
    }

    return false;
  }

  public async stop(): Promise<void> {
    this.closed = true;
  }
}

export default RabbitMQProducer;

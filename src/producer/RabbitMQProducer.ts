import { Channel } from "amqplib";
import Producer from "./Producer";

class RabbitMQProducer extends Producer {
  private channel: Channel;

  constructor(queueName: string, channel: Channel) {
    super(queueName);
    this.channel = channel;
  }

  public async produce(message: string): Promise<boolean> {
    const bufferedMessage = Buffer.from(message.toString());
    await this.channel.assertQueue(this.queueName);
    return this.channel.sendToQueue(this.queueName, bufferedMessage);
  }

  public async close(): Promise<void> {
    await this.channel.close();
  }
}

export default RabbitMQProducer;

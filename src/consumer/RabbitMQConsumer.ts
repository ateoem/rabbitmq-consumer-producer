import Consumer from "./Consumer";
import { Channel, ConsumeMessage } from "amqplib";
import ConsumerCallback from "./ConsumerCallbackInterface";
import RabbitMQIncomingMessage from "../message/RabbitMQIncomingMessage";

class RabbitMQConsumer extends Consumer {
  private channel: Channel;

  constructor(queueName: string, channel: Channel) {
    super(queueName);
    this.channel = channel;
  }

  async consume(callback: ConsumerCallback): Promise<void> {
    await this.channel.assertQueue(this.queueName);
    await this.channel.consume(
      this.queueName,
      (rawMessage: ConsumeMessage | null) => {
        return callback(new RabbitMQIncomingMessage(rawMessage, this.channel));
      }
    );
  }

  async close(): Promise<void> {
    await this.channel.close();
  }
}

export default RabbitMQConsumer;

import Consumer from "./Consumer";
import { Channel, ConsumeMessage, Replies } from "amqplib";
import ConsumerCallback from "./ConsumerCallbackInterface";
import RabbitMQIncomingMessage from "../message/RabbitMQIncomingMessage";

class RabbitMQConsumer extends Consumer {
  private channel: Channel;
  private consumerTag?: string;

  constructor(queueName: string, channel: Channel) {
    super(queueName);
    this.channel = channel;
  }

  public async consume(callback: ConsumerCallback): Promise<void> {
    await this.channel.assertQueue(this.queueName);
    const consumeReply: Replies.Consume = await this.channel.consume(
      this.queueName,
      (rawMessage: ConsumeMessage | null) => {
        return callback(new RabbitMQIncomingMessage(rawMessage, this.channel));
      }
    );
    this.consumerTag = consumeReply.consumerTag;
  }

  public async close(): Promise<void> {
    if (this.consumerTag) {
      await this.channel.cancel(this.consumerTag);
    }
  }
}

export default RabbitMQConsumer;

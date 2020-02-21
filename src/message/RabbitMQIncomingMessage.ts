import { Channel, ConsumeMessage } from "amqplib";
import IncomingMessage from "./IncomingMessage";

class RabbitMQIncomingMessage extends IncomingMessage {
  private channel: Channel;
  private rawMessage: ConsumeMessage | null;

  constructor(rawMessage: ConsumeMessage | null, channel: Channel) {
    if (rawMessage) {
      super(rawMessage.content.toString("UTF-8"));
    } else {
      super("");
    }
    this.rawMessage = rawMessage;
    this.channel = channel;
  }

  public async ack(): Promise<void> {
    const channel = this.channel;
    if (this.rawMessage) {
      channel.ack(this.rawMessage);
    }
  }
}

export default RabbitMQIncomingMessage;

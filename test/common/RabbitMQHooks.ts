import { Channel, Connection, connect, Replies } from "amqplib";

class RabbitMQHooks {
  private queueName: string;
  public channel?: Channel;
  public connection?: Connection;

  constructor(queueName: string) {
    this.queueName = queueName;
  }

  async beforeEach(done: jest.DoneCallback): Promise<jest.DoneCallback> {
    await this.channel.deleteQueue(this.queueName);
    return done();
  }

  async beforeAll(done: jest.DoneCallback): Promise<jest.DoneCallback> {
    console.log(process.env.AMQP_URL);
    this.connection = await connect(process.env.AMQP_URL);
    this.channel = await this.connection.createChannel();
    return done();
  }

  async afterAll(done: jest.DoneCallback): Promise<jest.DoneCallback> {
    await this.channel.close();
    await this.connection.close();
    return done();
  }

  async waitForQueueToBeEmpty(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(async () => {
        const queueInfo: Replies.AssertQueue = await this.channel.assertQueue(
          this.queueName
        );
        if (queueInfo.messageCount === 0) {
          resolve();
        }
      }, 100);
    });
  }
}

export default RabbitMQHooks;

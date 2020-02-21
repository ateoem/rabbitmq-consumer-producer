import RabbitMQProducer from "../../../src/producer/RabbitMQProducer";
import RabbitMQHooks from "../../common/RabbitMQHooks";
import RabbitMQConsumer from "../../../src/consumer/RabbitMQConsumer";
import RabbitMQIncomingMessage from "../../../src/message/RabbitMQIncomingMessage";
import { Replies } from "amqplib";

describe("RabbitMQConsumer", () => {
  const QUEUE_NAME = "test_consume_queue";
  const hooks: RabbitMQHooks = new RabbitMQHooks(QUEUE_NAME);

  beforeAll(done => hooks.beforeAll(done));
  beforeEach(done => hooks.beforeEach(done));
  afterAll(done => hooks.afterAll(done));

  it("Should consume produced messages", async () => {
    const producer = new RabbitMQProducer(QUEUE_NAME, hooks.channel);
    const consumer = new RabbitMQConsumer(QUEUE_NAME, hooks.channel);
    await producer.produce("1");
    await producer.produce("2");
    await producer.produce("3");
    await producer.produce("4");
    await producer.produce("5");

    const queueInfo: Replies.AssertQueue = await hooks.channel.assertQueue(
      QUEUE_NAME
    );
    expect(queueInfo.messageCount).toEqual(5);

    const consumerCallbackMock = jest.fn(
      (message: RabbitMQIncomingMessage) => message.ack
    );

    consumer.consume(consumerCallbackMock);
    await hooks.waitForQueueToBeEmpty();
    expect(consumerCallbackMock.mock.calls.length).toEqual(5);
  });
});

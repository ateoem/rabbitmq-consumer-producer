import RabbitMQProducer from "../../../src/producer/RabbitMQProducer";
import RabbitMQHooks from "../../common/RabbitMQHooks";
import RabbitMQConsumer from "../../../src/consumer/RabbitMQConsumer";
import RabbitMQIncomingMessage from "../../../src/message/RabbitMQIncomingMessage";
import SeederProducerBridge from "../../../src/common/SeederProducerBridge";
import MD5Seeder from "../../../src/seeder/MD5Seeder";

describe("SeederProducerBridge", () => {
  const QUEUE_NAME = "test_bridge_queue";
  const hooks: RabbitMQHooks = new RabbitMQHooks(QUEUE_NAME);

  beforeAll(done => hooks.beforeAll(done));
  beforeEach(done => hooks.beforeEach(done));
  afterAll(done => hooks.afterAll(done));
  it("Should produce pre-seeded messages.", async () => {
    const producer = new RabbitMQProducer(QUEUE_NAME, hooks.channel);
    const consumer = new RabbitMQConsumer(QUEUE_NAME, hooks.channel);
    const bridge = new SeederProducerBridge([MD5Seeder], producer);

    const consumerCallbackMock = jest.fn(
      (message: RabbitMQIncomingMessage) => message.ack
    );

    await bridge.seed();
    await bridge.seed();
    await bridge.seed();

    consumer.consume(consumerCallbackMock);
    await hooks.waitForQueueToBeEmpty();
    expect(consumerCallbackMock.mock.calls.length).toEqual(3);
    expect(consumerCallbackMock.mock.calls[0].toString()).toEqual(
      "cfcd208495d565ef66e7dff9f98764da"
    );
    expect(consumerCallbackMock.mock.calls[1].toString()).toEqual(
      "c4ca4238a0b923820dcc509a6f75849b"
    );
    expect(consumerCallbackMock.mock.calls[2].toString()).toEqual(
      "c81e728d9d4c2f636f067f89cc14862c"
    );
  });
});

import RabbitMQProducer from "../../../src/producer/RabbitMQProducer";
import RabbitMQHooks from "../../common/RabbitMQHooks";
import RabbitMQConsumer from "../../../src/consumer/RabbitMQConsumer";
import SeederProducerBridge from "../../../src/common/SeederProducerBridge";
import MD5Seeder from "../../../src/seeder/MD5Seeder";
import InMemoryLogger from "../../common/InMemoryLogger";
import LoggerConsumerBrige from "../../../src/common/LoggerConsumerBridge";

describe("LoggerConsumerBridge", () => {
  const QUEUE_NAME = "test_logger_consumer_queue";
  const hooks: RabbitMQHooks = new RabbitMQHooks(QUEUE_NAME);

  beforeAll(done => hooks.beforeAll(done));
  beforeEach(done => hooks.beforeEach(done));
  afterAll(done => hooks.afterAll(done));

  it("Should retrieve pre-seeded messages.", async () => {
    const producer = new RabbitMQProducer(QUEUE_NAME, hooks.channel);
    const consumer = new RabbitMQConsumer(QUEUE_NAME, hooks.channel);
    const bridge = new SeederProducerBridge([MD5Seeder], producer);
    const logger = new InMemoryLogger();
    const loggerConsumer = new LoggerConsumerBrige(logger, consumer);
    await bridge.seed();
    await bridge.seed();
    await bridge.seed();
    loggerConsumer.logWithConsume();
    await hooks.waitForQueueToBeEmpty();
    expect(logger.logs.length).toEqual(3);
    expect(logger.logs[0]).toEqual("cfcd208495d565ef66e7dff9f98764da");
    expect(logger.logs[1]).toEqual("c4ca4238a0b923820dcc509a6f75849b");
    expect(logger.logs[2]).toEqual("c81e728d9d4c2f636f067f89cc14862c");
  });
});

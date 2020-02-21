import RabbitMQProducer from "../../../src/producer/RabbitMQProducer";
import RabbitMQHooks from "../../common/RabbitMQHooks";
import RabbitMQConsumer from "../../../src/consumer/RabbitMQConsumer";
import SeederProducerBridge from "../../../src/common/SeederProducerBridge";
import InMemoryLogger from "../../common/InMemoryLogger";
import SHA3Seeder from "../../../src/seeder/SHA3Seeder";
import LoggerConsumerBrige from "../../../src/common/LoggerConsumerBridge";
import ExecuteSeederProducer from "../../../src/common/ExecuteSeederProducer";
jest.mock("../../../src/logger/ConsoleLogger");

const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};
describe("ExecuteSeederProducer", () => {
  const QUEUE_NAME = "test_execute_consumer_queue";
  const hooks: RabbitMQHooks = new RabbitMQHooks(QUEUE_NAME);

  beforeAll(done => hooks.beforeAll(done));
  beforeEach(done => hooks.beforeEach(done));
  afterAll(done => hooks.afterAll(done));

  it("Should produce pre-seeded messages at given interval.", async () => {
    jest.setTimeout(10000);
    const producer = new RabbitMQProducer(QUEUE_NAME, hooks.channel);
    const consumer = new RabbitMQConsumer(QUEUE_NAME, hooks.channel);
    const bridge = new SeederProducerBridge([SHA3Seeder], producer);
    const logger = new InMemoryLogger();
    const loggerConsumer = new LoggerConsumerBrige(logger, consumer);

    const execute = new ExecuteSeederProducer(bridge, 100);
    execute.start();
    await sleep(450); // four messages
    execute.close();

    loggerConsumer.logWithConsume();
    await hooks.waitForQueueToBeEmpty();
    expect(logger.logs.length).toEqual(4);
    expect(logger.logs[0]).toEqual(
      "2d44da53f305ab94b6365837b9803627ab098c41a6013694f9b468bccb9c13e95b3900365eb58924de7158a54467e984efcfdabdbcc9af9a940d49c51455b04c"
    );
    expect(logger.logs[1]).toEqual(
      "ca2c70bc13298c5109ee0cb342d014906e6365249005fd4beee6f01aee44edb531231e98b50bf6810de6cf687882b09320fdd5f6375d1f2debd966fbf8d03efa"
    );
    expect(logger.logs[2]).toEqual(
      "564e1971233e098c26d412f2d4e652742355e616fed8ba88fc9750f869aac1c29cb944175c374a7b6769989aa7a4216198ee12f53bf7827850dfe28540587a97"
    );
    expect(logger.logs[3]).toEqual(
      "73fb266a903f956a9034d52c2d2793c37fddc32077898f5d871173da1d646fb80bbc21a0522390b75d3bcc88bd78960bdb73be323ad5fc5b3a16089992957d3a"
    );
  });
});

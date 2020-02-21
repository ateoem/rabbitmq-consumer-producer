abstract class Producer {
  protected queueName: string;

  constructor(queueName: string) {
    this.queueName = queueName;
  }

  abstract produce(message: string): Promise<boolean>;
  abstract close(): Promise<void>;
}

export default Producer;

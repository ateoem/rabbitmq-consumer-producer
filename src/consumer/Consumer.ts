import ConsumerCallback from "./ConsumerCallbackInterface";

abstract class Consumer {
  protected queueName: string;

  constructor(queueName: string) {
    this.queueName = queueName;
  }

  abstract consume(callback: ConsumerCallback): void;
  abstract close(): Promise<void>;
}

export default Consumer;

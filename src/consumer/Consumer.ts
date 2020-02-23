import ConsumerCallback from "./ConsumerCallbackInterface";

abstract class Consumer {
  constructor(protected queueName: string) {}

  public abstract consume(callback: ConsumerCallback): void;
  public abstract close(): Promise<void>;
}

export default Consumer;

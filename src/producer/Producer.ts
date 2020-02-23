abstract class Producer {
  constructor(protected queueName: string) {}

  public abstract produce(message: string): Promise<boolean>;
  public abstract close(): Promise<void>;
}

export default Producer;

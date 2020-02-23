import Stoppable from "../common/Stoppable";

abstract class Producer implements Stoppable {
  constructor(protected queueName: string) {}

  public abstract produce(message: string): Promise<boolean>;
  public abstract stop(): Promise<void>;
}

export default Producer;

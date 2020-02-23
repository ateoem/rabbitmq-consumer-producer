import ConsumerCallback from "./ConsumerCallbackInterface";
import Stoppable from "../common/Stoppable";

abstract class Consumer implements Stoppable {
  constructor(protected queueName: string) {}

  public abstract consume(callback: ConsumerCallback): void;
  public abstract stop(): Promise<void>;
}

export default Consumer;

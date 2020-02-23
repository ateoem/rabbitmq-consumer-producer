import SeederProducerBridge from "./SeederProducerBridge";
import Stoppable from "./Stoppable";

class ExecuteSeederProducer implements Stoppable {
  private timeout?: NodeJS.Timeout;
  private closed = false;

  constructor(private bridge: SeederProducerBridge, private ms: number) {}

  public start(): void {
    if (!this.closed) {
      this.timeout = setTimeout(() => {
        this.bridge.seed();
        this.start();
      }, this.ms);
    }
  }

  public stop(): Promise<void> {
    this.closed = true;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    return this.bridge.stop();
  }
}

export default ExecuteSeederProducer;

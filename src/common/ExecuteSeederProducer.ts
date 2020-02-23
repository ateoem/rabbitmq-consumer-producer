import SeederProducerBridge from "./SeederProducerBridge";

class ExecuteSeederProducer {
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

  public close(): void {
    this.closed = true;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}

export default ExecuteSeederProducer;

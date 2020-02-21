import SeederProducerBridge from "./SeederProducerBridge";

class ExecuteSeederProducer {
  private ms: number;
  private bridge: SeederProducerBridge;
  private timeout?: NodeJS.Timeout;
  private closed: boolean;

  constructor(bridge: SeederProducerBridge, ms: number) {
    this.bridge = bridge;
    this.ms = ms;
    this.closed = false;
  }

  start(): void {
    if (!this.closed) {
      this.timeout = setTimeout(() => {
        this.bridge.seed();
        this.start();
      }, this.ms);
    }
  }

  close(): void {
    this.closed = true;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}

export default ExecuteSeederProducer;

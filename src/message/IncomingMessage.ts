abstract class IncomingMessage {
  constructor(private data: string) {}

  public toString(): string {
    return this.data;
  }

  public abstract ack(): Promise<void>;
}

export default IncomingMessage;

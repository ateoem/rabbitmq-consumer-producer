abstract class IncomingMessage {
  private data: string;

  constructor(data: string) {
    this.data = data;
  }

  public toString(): string {
    return this.data;
  }

  abstract ack(): Promise<void>;
}

export default IncomingMessage;

import LoggerInterface from "../../src/logger/LoggerInterface";

class InMemoryLogger implements LoggerInterface {
  public logs: string[];

  constructor() {
    this.logs = [];
  }

  log(data: string): void {
    this.logs.push(data);
  }
}

export default InMemoryLogger;

import LoggerInterface from "./LoggerInterface";

class ConsoleLogger implements LoggerInterface {
  public log(data: string): void {
    console.log(data);
  }
}

export default ConsoleLogger;

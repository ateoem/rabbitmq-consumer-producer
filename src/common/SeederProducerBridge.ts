import SeederInterface from "../seeder/SeederInterface";
import ProducerInterface from "../producer/Producer";
import Stoppable from "./Stoppable";

class SeederProducerBridge implements Stoppable {
  private rounds = 0;

  constructor(
    private seeders: SeederInterface[],
    private producer: ProducerInterface
  ) {}

  public async seed(): Promise<void> {
    await Promise.all(
      this.seeders.map((seeder: SeederInterface) => {
        return this.producer.produce(seeder(this.rounds));
      })
    );

    this.rounds += 1;
  }

  public stop(): Promise<void> {
    return this.producer.stop();
  }
}

export default SeederProducerBridge;

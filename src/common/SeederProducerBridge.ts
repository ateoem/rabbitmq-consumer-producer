import SeederInterface from "../seeder/SeederInterface";
import ProducerInterface from "../producer/Producer";

class SeederProducerBridge {
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

  public async close(): Promise<void> {
    await this.producer.close();
  }
}

export default SeederProducerBridge;

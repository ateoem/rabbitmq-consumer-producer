import SeederInterface from "../seeder/SeederInterface";
import ProducerInterface from "../producer/ProducerInterface";

class SeederProducerBridge {
  private seeders: SeederInterface[];
  private producer: ProducerInterface;
  private rounds = 0;

  constructor(seeders: SeederInterface[], producer: ProducerInterface) {
    this.seeders = seeders;
    this.producer = producer;
  }

  async seed(): Promise<void> {
    await Promise.all(
      this.seeders.map((seeder: SeederInterface) => {
        return this.producer.produce(seeder(this.rounds));
      })
    );

    this.rounds += 1;
  }

  async close(): Promise<void> {
    await this.producer.close();
  }
}

export default SeederProducerBridge;

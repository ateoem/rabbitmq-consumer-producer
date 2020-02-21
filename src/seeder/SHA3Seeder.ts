import SeederInterface from "./SeederInterface";
import { SHA3 } from "sha3";

const SHA3Seeder: SeederInterface = (seed: number): string => {
  const hash = new SHA3(512);
  hash.update(seed.toString());
  return hash.digest("hex");
};

export default SHA3Seeder;

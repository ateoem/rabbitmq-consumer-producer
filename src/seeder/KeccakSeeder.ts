import SeederInterface from "./SeederInterface";
import { Keccak } from "sha3";

const KeccakSeeder: SeederInterface = (seed: number): string => {
  const hash = new Keccak(512);
  hash.update(seed.toString());
  return hash.digest("hex");
};

export default KeccakSeeder;

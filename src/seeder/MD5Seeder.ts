import SeederInterface from "./SeederInterface";
import md5 from "md5";

const MD5Seeder: SeederInterface = (seed: number): string => {
  return md5(seed.toString());
};

export default MD5Seeder;

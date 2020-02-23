import MD5Seeder from "./seeder/MD5Seeder";
import SHA3Seeder from "./seeder/SHA3Seeder";
import KeccakSeeder from "./seeder/KeccakSeeder";
import SeederInterface from "./seeder/SeederInterface";

export type SeederConfigType = { queueName: string; seeder: SeederInterface };
export type SeederConfigGlobalType = { [key: string]: SeederConfigType[] };

const config: SeederConfigGlobalType = {
  md5: [{ queueName: "md5_seeder", seeder: MD5Seeder }],
  sha3: [{ queueName: "sha3_seeder", seeder: SHA3Seeder }],
  keccak: [{ queueName: "keccak_seeder", seeder: KeccakSeeder }]
};

export default config;

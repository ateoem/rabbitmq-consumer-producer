import SHA3Seeder from "../../../src/seeder/SHA3Seeder";

describe("SHA3Seeder", () => {
  it("should return proper sha3 string.", () => {
    const generatedSHA3 = SHA3Seeder(1);
    expect(generatedSHA3).toEqual(
      "ca2c70bc13298c5109ee0cb342d014906e6365249005fd4beee6f01aee44edb531231e98b50bf6810de6cf687882b09320fdd5f6375d1f2debd966fbf8d03efa"
    );
  });
});

import KeccakSeeder from "../../../src/seeder/KeccakSeeder";

describe("KeccakSeeder", () => {
  it("should return proper keccak string.", () => {
    const generatedSHA3 = KeccakSeeder(1);
    expect(generatedSHA3).toEqual(
      "00197a4f5f1ff8c356a78f6921b5a6bfbf71df8dbd313fbc5095a55de756bfa1ea7240695005149294f2a2e419ae251fe2f7dbb67c3bb647c2ac1be05eec7ef9"
    );
  });
});

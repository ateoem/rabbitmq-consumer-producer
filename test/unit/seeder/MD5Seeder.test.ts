import MD5Seeder from "../../../src/seeder/MD5Seeder";

describe("MD5Seeder", () => {
  it("should return proper md5 string.", () => {
    const generatedMD5 = MD5Seeder(1);
    expect(generatedMD5).toEqual("c4ca4238a0b923820dcc509a6f75849b");
  });
});

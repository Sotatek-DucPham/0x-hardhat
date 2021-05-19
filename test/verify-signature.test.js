const { expect } = require("chai");
const { BigNumber } = require("ethers");

describe("Verify contract", () => {
  it("get r,s,v", async () => {
    const [deployer] = await ethers.getSigners();
    const VerifySignature = await ethers.getContractFactory("VerifySignature");
    const instance = await VerifySignature.deploy();

    const sig =
      "0x1c80988c966e581989637bd1aaecc02bc27ae2120e59478fff44acee7097b9a59b7b516eb9af878a45e40ee72477e47ae0833fb89de54e0f3ca340772c15ea489802";
    // const sig2 = ethers.utils.randomBytes(65);
    // console.log(BigNumber.from(sig2));
    // const sig2 =
    //   "0x9c55da44edc3f839d602aaa6831ee6d5730e247db49ec927beb7ab2c05d5fe5636ee07d3a4f2fbf9dc4aad7c50088d1bb01f7010bd8d65cd25251c257919c852ff";
    const result = await instance.splitSignature(sig);
    console.log({ result });
  });
});

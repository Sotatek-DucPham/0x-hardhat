const { expect } = require("chai");

describe("Token contract", () => {
  let token;
  let deposit;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token");
    const Deposit = await ethers.getContractFactory("Deposit");
    const decimals = 18;
    const initBalance = `1000000000${"0".repeat(decimals)}`;

    token = await Token.deploy(
      "TOKEN",
      "TOK",
      decimals,
      deployer.address,
      initBalance
    );
    deposit = await Deposit.deploy();
  });

  it("init balance", async () => {
    const [deployer] = await ethers.getSigners();
    const ownerBalance = await token.balanceOf(deployer.address);
    expect(await token.totalSupply()).to.equal(ownerBalance);

    await token.transfer(deposit.address, 1);
  });
});

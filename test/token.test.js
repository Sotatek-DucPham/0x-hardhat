const { expect } = require("chai");

describe("Token contract", () => {
  let token;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token");
    const decimals = 18;
    const initBalance = `1000000000${"0".repeat(decimals)}`;
    token = await Token.deploy(
      "TOKEN",
      "TOK",
      decimals,
      deployer.address,
      initBalance
    );
  });

  it("init balance", async () => {
    const [deployer] = await ethers.getSigners();
    const ownerBalance = await token.balanceOf(deployer.address);
    expect(await token.totalSupply()).to.equal(ownerBalance);

    const abi = [
      "function balanceOf(address owner) view returns (uint256)",
      "function decimals() view returns (uint8)",
      "function symbol() view returns (string)",
      "function transfer(address to, uint amount) returns (boolean)",
      "event Transfer(address indexed from, address indexed to, uint amount)",
    ];

    // This can be an address or an ENS name
    const address = "dai.tokens.ethers.eth";

    // An example Provider
    const provider = ethers.getDefaultProvider();

    // An example Signer
    const signer = ethers.Wallet.createRandom().connect(provider);

    // Read-Only; By connecting to a Provider, allows:
    // - Any constant function
    // - Querying Filters
    // - Populating Unsigned Transactions for non-constant methods
    // - Estimating Gas for non-constant (as an anonymous sender)
    // - Static Calling non-constant methods (as anonymous sender)
    const erc20 = new ethers.Contract(address, abi, provider);

    // Read-Write; By connecting to a Signer, allows:
    // - Everything from Read-Only (except as Signer, not anonymous)
    // - Sending transactions for non-constant functions
    const erc20_rw = new ethers.Contract(address, abi, signer);
  });
});

const { erc20TokenInfo } = require("../src/utils/token_info");

const func = async function ({ deployments, getNamedAccounts, getChainId }) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("ERC20Proxy", {
    from: deployer,
    args: [],
    log: true,
  });
  await deploy("ERC721Proxy", {
    from: deployer,
    args: [],
    log: true,
  });

  await deploy("DummyERC20Token", {
    from: deployer,
    args: ["0x Protocol Token", "ZRX", 18, "1000000000000000000000000000"],
    log: true,
  });

  await deploy("WETH9", {
    from: deployer,
    args: [],
    log: true,
  });

  const chainId = await getChainId();
  await deploy("Exchange", {
    from: deployer,
    args: [chainId],
    log: true,
  });

  // Dummy ERC20 tokens
  for (const token of erc20TokenInfo) {
    const totalSupply = "1000000000000000000000000000";
    await deploy("DummyERC20Token", {
      from: deployer,
      args: [token.name, token.symbol, token.decimals.toString(), totalSupply],
      log: true,
    });
  }
};

module.exports = func;

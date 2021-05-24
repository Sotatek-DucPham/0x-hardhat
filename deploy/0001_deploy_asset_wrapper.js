const { erc20TokenInfo, erc721TokenInfo } = require("../src/utils/token_info");

const func = async function ({ deployments, getNamedAccounts, getChainId }) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("ERC20Proxy", {
    from: deployer,
    args: [],
    log: true,
  });
  const erc721Proxy = await deploy("ERC721Proxy", {
    from: deployer,
    args: [],
    log: true,
  });

  const zrxToken = await deploy("DummyERC20Token", {
    from: deployer,
    args: ["0x Protocol Token", "ZRX", 18, "1000000000000000000000000000"],
    log: true,
  });

  const etherToken = await deploy("WETH9", {
    from: deployer,
    args: [],
    log: true,
  });

  const chainId = await getChainId();
  const exchangeTx = await deploy("Exchange", {
    from: deployer,
    args: [chainId],
    log: true,
  });

  // Dummy ERC20 tokens
  for (const token of erc20TokenInfo) {
    const totalSupply = "1000000000000000000000000000";
    const dummyErc20Token = await deploy("DummyERC20Token", {
      from: deployer,
      args: [token.name, token.symbol, token.decimals.toString(), totalSupply],
      log: true,
    });
  }

  const cryptoKittieToken = await deploy("DummyERC721Token", {
    from: deployer,
    args: [erc721TokenInfo[0].name, erc721TokenInfo[0].symbol],
    log: true,
  });

  // 1155 Asset Proxy
  const erc1155Proxy = await deploy("ERC1155Proxy", {
    from: deployer,
    args: [],
    log: true,
  });

  const staticCallProxy = await deploy("StaticCallProxy", {
    from: deployer,
    args: [],
    log: true,
  });

  const multiAssetProxy = await deploy("MultiAssetProxy", {
    from: deployer,
    args: [],
    log: true,
  });

  const erc20Proxy = await deployments.get("ERC20Proxy");
  console.log(erc20Proxy);
  await erc20Proxy.addAuthorizedAddress(exchangeTx.address);

  // await erc721Proxy
  //   .addAuthorizedAddress(exchange.address)
  //   .awaitTransactionSuccessAsync(txDefaults);
  // await erc1155Proxy
  //   .addAuthorizedAddress(exchange.address)
  //   .awaitTransactionSuccessAsync(txDefaults);
  // await multiAssetProxy
  //   .addAuthorizedAddress(exchange.address)
  //   .awaitTransactionSuccessAsync(txDefaults);
};

module.exports = func;

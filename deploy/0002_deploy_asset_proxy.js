const func = async function ({ deployments, getNamedAccounts }) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await Promise.all([
    deploy("ERC20Proxy", {
      from: deployer,
      args: [],
      log: true,
    }),
    deploy("ERC721Proxy", {
      from: deployer,
      args: [],
      log: true,
    }),
    deploy("MultiAssetProxy", {
      from: deployer,
      args: [],
      log: true,
    }),
  ]);
};

module.exports = func;

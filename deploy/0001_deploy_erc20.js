const func = async function ({ deployments, getNamedAccounts }) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("ZRXToken", {
    from: deployer,
    args: [],
    log: true,
  });
};

module.exports = func;

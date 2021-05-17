const func = async function ({ deployments, getNamedAccounts }) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("Fund", {
    from: deployer,
    args: [],
    log: true,
  });

  await deploy("Token", {
    from: deployer,
    args: ["TOKEN", "TOK", 18, deployer, "1000"],
    log: true,
  });
};

module.exports = func;

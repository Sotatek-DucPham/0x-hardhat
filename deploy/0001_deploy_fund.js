const func = async function ({ deployments, getNamedAccounts }) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const decimals = 18;
  const token = await deploy("Token", {
    from: deployer,
    args: ["TOKEN", "TOK", 18, deployer, `1000000000${"0".repeat(decimals)}`],
    log: true,
  });

  const deposit = await deploy("Deposit", {
    from: deployer,
    args: [],
    log: true,
  });
};

module.exports = func;

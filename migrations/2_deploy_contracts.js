const DAE = artifacts.require("DAE");

const NEW_MINTER = "0x1cAb97Def5fb15a965E875765Fce94073CB980C4";

module.exports = async function(deployer) {
  // Deploy DAE token
  await deployer.deploy(DAE);
  // Add new minter
  const dae = await DAE.deployed();
  await dae.addMinter(NEW_MINTER);
};

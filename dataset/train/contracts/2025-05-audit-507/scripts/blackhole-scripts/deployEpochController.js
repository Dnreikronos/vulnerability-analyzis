const { ethers } = require("hardhat")
const { permissionsRegistryAddress } = require("./gaugeConstants/permissions-registry")
const { voterV3Address } = require("./gaugeConstants/voter-v3")
const { minterUpgradableAddress } = require("./gaugeConstants/minter-upgradable")
const { chainlinkAutomationRegistryAddress } = require("./gaugeConstants/chainlink-automation-registry")

async function main () {
    data = await ethers.getContractFactory("EpochController");
    const EpochController = await upgrades.deployProxy(data, [], {initializer: 'initialize'});
    txDeployed = await EpochController.deployed();
    console.log('deployed EpochController: ', EpochController.address, txDeployed);
    await EpochController.setVoter(voterV3Address);
    console.log('Voter set in EpochController');
    await EpochController.setMinter(minterUpgradableAddress);
    console.log('minter set in EpochController');
    await EpochController.setAutomationRegistry(chainlinkAutomationRegistryAddress);
    console.log('registry set in EpochController');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

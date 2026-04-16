const { ethers } = require("hardhat")
const { minterUpgradableAddress } = require("./gaugeConstants/minter-upgradable")
const { voterV3Address } = require("./gaugeConstants/voter-v3")
const { chainlinkAutomationRegistryAddress } = require("./gaugeConstants/chainlink-automation-registry")

async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]
    const data = await ethers.getContractFactory("EpochControllerV2");
    const EpochControllerV2Contract = await data.deploy();
    txDeployed = await EpochControllerV2Contract.deployed();
    console.log("EpochControllerV2Contract Address: ", EpochControllerV2Contract.address)
    await EpochControllerV2Contract.setVoter(voterV3Address);
    console.log('Voter set in EpochControllerV2');
    await EpochControllerV2Contract.setMinter(minterUpgradableAddress);
    console.log('minter set in EpochControllerV2');
    await EpochControllerV2Contract.setAutomationRegistry(chainlinkAutomationRegistryAddress);
    console.log('rtegistry set in EpochControllerV2');

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

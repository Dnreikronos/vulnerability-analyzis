// const { chainlinkAutomationRegistryAddress } = require("./gaugeConstants/chainlink-automation-registry")
const { minterUpgradableAbi, minterUpgradableAddress } = require("./gaugeConstants/minter-upgradable");
const { epochControllerAbi, epochControllerAddress } = require("./gaugeConstants/epochContoller");



async function main () {
    const minterUpgradableContract = await ethers.getContractAt(minterUpgradableAbi, minterUpgradableAddress);
    const checkValue = await minterUpgradableContract.check();
    console.log('checkValue: ', checkValue);
    const epochControllerContract = await ethers.getContractAt(epochControllerAbi, epochControllerAddress);
    const minterAddress = await epochControllerContract.minter();
    console.log("check up keepup value: checkUpkeep", await epochControllerContract.checkUpkeep("0x"))
    console.log('minter: ', minterAddress);
    console.log("automation registry", await epochControllerContract.automationRegistry())
    console.log("voter address", await epochControllerContract.voter())

    // const minterAddress = await epochControllerContract.minter();


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

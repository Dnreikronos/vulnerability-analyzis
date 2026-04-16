const { chainlinkAutomationRegistryAddress } = require("./gaugeConstants/chainlink-automation-registry")
const { epochControllerAbi, epochControllerAddress } = require("./gaugeConstants/epochContoller");


async function main () {

    const epochControllerContract = await ethers.getContractAt(epochControllerAbi, epochControllerAddress);
    await epochControllerContract.setAutomationRegistry(chainlinkAutomationRegistryAddress);
    console.log('set automation registry');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

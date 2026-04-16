const { ethers } = require("hardhat");
const { gaugeManagerAbi, gaugeManagerAddress } = require("../../../../generated/gauge-manager");
const { farmingCenter, algebraEternalFarming, nonfungiblePositionManager } = require("../contract-deployments/algebra-addresses")

async function main () {
    const GaugeManagerContract = await ethers.getContractAt(gaugeManagerAbi, gaugeManagerAddress);
    const tx = await GaugeManagerContract.setFarmingParam(farmingCenter, algebraEternalFarming, nonfungiblePositionManager);
    await tx.wait();
    console.log("setFarming successful");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});

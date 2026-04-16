const { ethers } = require("hardhat");
const { gaugeFactoryCLAbi, gaugeFactoryCLAddress } = require("../../../../generated/gauge-factory-cl");

async function main () {
    const GaugeFactoryContract = await ethers.getContractAt(gaugeFactoryCLAbi, gaugeFactoryCLAddress);
    const tx = await GaugeFactoryContract.setReferralFee(500);
    await tx.wait();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});

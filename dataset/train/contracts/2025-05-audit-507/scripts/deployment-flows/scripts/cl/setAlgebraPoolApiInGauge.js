const { ethers } = require("hardhat");
const { gaugeFactoryCLAbi, gaugeFactoryCLAddress } = require("../../../../generated/gauge-factory-cl");
const {algebraPoolAPIStorageAddress } = require("../../../../generated/algebra-pool-apistorage");

async function main () {
    try{
    const GaugeFactoryContract = await ethers.getContractAt(gaugeFactoryCLAbi, gaugeFactoryCLAddress);
    const tx = await GaugeFactoryContract.setAlgebraPoolApi(algebraPoolAPIStorageAddress);
    await tx.wait();
    console.log("setAlgebraApi success");
    }catch (error){
        console.log("setCommunityFeeWithdraw failed: ", error);
        process.exit(1);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});

const { ethers } = require("hardhat");
const { pairFactoryAbi, pairFactoryAddress } = require("../../generated/pair-factory");

async function main () {
    const owner = await ethers.getSigners();
    const PairFactoryContract = await ethers.getContractAt(pairFactoryAbi, pairFactoryAddress);
    const tx = await PairFactoryContract.getReferralFee("0x6D65Fc745c71Fde88aD7e0df69bF625595063b29");
    console.log(tx)
    // await tx.wait();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});

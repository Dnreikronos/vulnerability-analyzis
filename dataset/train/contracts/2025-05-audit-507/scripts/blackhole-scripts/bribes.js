const { ethers } = require("hardhat");
const { bribeAbi } = require("../../generated/bribe");

async function main () {
    const owner = await ethers.getSigners();
    const PairFactoryContract = await ethers.getContractAt(bribeAbi, "0x4a09e6a9091aB05A349BAf00af1B070E2b71D3dc");
    const length = await PairFactoryContract.tokenRewardsPerEpoch("0xd5E6c285927702D711F8380D00631920D11BaA16", 1744207200);
    // const length = await PairFactoryContract.bribeTokens(3);
    // const tx = await PairFactoryContract.genesisPools(0);
    console.log(length);
    // await tx.wait();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});

const { ethers } = require("hardhat");
const { pairFactoryAbi, pairFactoryAddress } = require("../../generated/pair-factory");

async function main () {
    const owner = await ethers.getSigners();
    const PairFactoryContract = await ethers.getContractAt(pairFactoryAbi, pairFactoryAddress);
    const tx = await PairFactoryContract.setDibs("0x99767d366a143793C8F28190Bc1b85896Cfe5188");
    await tx.wait();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});

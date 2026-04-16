const { ethers } = require("hardhat");
const { genesisPoolFactoryAbi, genesisPoolFactoryAddress } = require("../../generated/genesis-pool-factory");

async function main () {
    const owner = await ethers.getSigners();
    const PairFactoryContract = await ethers.getContractAt(genesisPoolFactoryAbi, genesisPoolFactoryAddress);
    const length = await PairFactoryContract.genesisPoolsLength();
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

const { ethers } = require("hardhat");
const { genesisPoolManagerAbi, genesisPoolManagerAddress } = require("../../generated/genesis-pool-manager");

async function main () {
    const owner = await ethers.getSigners();
    const PairFactoryContract = await ethers.getContractAt(genesisPoolManagerAbi, genesisPoolManagerAddress);
    const tx = await PairFactoryContract.whiteListedTokensToUser("0x8f64Dd3894d259aD65a77Bc79c0d0b8d7DD9c8C6", "0xa7243fc6FB83b0490eBe957941a339be4Db11c29");
    console.log(tx);
    // await tx.wait();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});

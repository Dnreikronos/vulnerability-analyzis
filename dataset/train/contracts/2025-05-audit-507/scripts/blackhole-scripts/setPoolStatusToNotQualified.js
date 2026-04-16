

const { ethers } = require("hardhat");
const { genesisPoolAbi } = require("../../generated/genesis-pool");
const { genesisPoolManagerAddress } = require("../../generated/genesis-pool-manager");


async function main () {
    const owner = await ethers.getSigners();
    const GenesisPool = await ethers.getContractAt(genesisPoolAbi, "0x08cbce9fb70f8e6e208887ce827c3a440d8503fb");
    const statusToSet = 7;
    const tx = await GenesisPool.setPoolStatus(statusToSet);
    // const tx = await GenesisPool.poolStatus();;
    console.log(tx);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});

const { ethers } = require("hardhat");
const { epochControllerAbi, epochControllerAddress } = require("../../generated/epoch-controller");
const { genesisPoolManagerAbi, genesisPoolManagerAddress } = require("../../generated/genesis-pool-manager");
const { genesisPoolAPIAddress } = require("../../generated/genesis-pool-api");

async function main () {
    const genesisManager = await ethers.getContractAt(genesisPoolManagerAbi, genesisPoolManagerAddress);
    console.log("WEEK: ", await genesisManager.WEEK());
}

main().then(() => console.log("Done!"));

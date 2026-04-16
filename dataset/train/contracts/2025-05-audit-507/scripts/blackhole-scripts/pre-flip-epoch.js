const { epochControllerAbi, epochControllerAddress } = require("../../generated/epoch-controller");
const { genesisPoolManagerAbi } = require("../../generated/genesis-pool-manager");
const deployedTokens = require("../deployment-flows/token-constants/deploying-tokens.json");

console.log("deployed tokens: ", deployedTokens);

const GAS_LIMIT = process.env.GAS_LIMIT || 15_000_000;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

console.log("GAS_LIMIT: ", GAS_LIMIT);
async function main () {
    const epoch = await ethers.getContractAt(epochControllerAbi, "0xDbAAeD145c1512773425ceF192716379f887f335");
    const genesisManager = await ethers.getContractAt(genesisPoolManagerAbi, "0x9A68d0530301Eb7D2dB651Ec5dA299B4878ADE28")
    console.log("check for gm: ", await genesisManager.check())
    const tx1 = await epoch.performPreUpkeep("0x", {
        gasLimit: GAS_LIMIT,
    });
    await tx1.wait();
    console.log("Sleeping for 2 minutes...");
    console.log("tx done!");

}

main().then(() => console.log("Done!"));

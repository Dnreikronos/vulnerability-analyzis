const { ethers } = require("hardhat");
const { epochControllerAbi, epochControllerAddress } = require("../../../generated/epoch-controller");

async function main () {
    const epochController = await ethers.getContractAt(epochControllerAbi, epochControllerAddress);
    const flipEpoch = await epochController.performUpkeep("0x", {
        gasLimit: 15000000
    });
    await flipEpoch.wait();
}

main().then(() => console.log("done!"))

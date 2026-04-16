const { ethers } = require("hardhat");
const { tokenHandlerAbi, tokenHandlerAddress } = require("../../generated/token-handler");

async function main () {
    const owner = await ethers.getSigners();
    const TokenHandlerContract = await ethers.getContractAt(tokenHandlerAbi, tokenHandlerAddress);
    const tx = await TokenHandlerContract.isConnector("0x78dC6A039dDd938F70d8c50C2EF3C522BA0FB1e5");
    console.log(tx)
    // await tx.wait();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});

const { ethers } = require("hardhat");
const { epochControllerAbi, epochControllerAddress } = require("../../../../generated/epoch-controller");

async function main () {
    try{
        const epochController = await ethers.getContractAt(epochControllerAbi, epochControllerAddress);
        const tx = await epochController.setAutomationRegistry("0x2E56a1f7eC9A60941863840cd287327d5EA41393");
        await tx.wait();
        const tx2 = await epochController.setAutomationRegistry2("0x1f346406150F0c7607bbd2C04D9CD6f867d26B63");
        await tx2.wait();
        console.log("setChainLinkAddress success");
        // 0x08448BC3Ec5F58b0E6137f490Ffd43E5a5e6a4eD
    } catch(error){
        console.log("setChainLinkAddress failed: ", error);
        process.exit(1);
    }
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error); 
    process.exit(1);
  });

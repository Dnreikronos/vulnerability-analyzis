const { ethers } = require("hardhat");
const { epochControllerAbi, epochControllerAddress } = require("../../generated/epoch-controller");

async function main () {
    try{
        const epochController = await ethers.getContractAt(epochControllerAbi, epochControllerAddress);
        await epochController.performUpkeep('0x');
        console.log("perform upkeep successful");
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

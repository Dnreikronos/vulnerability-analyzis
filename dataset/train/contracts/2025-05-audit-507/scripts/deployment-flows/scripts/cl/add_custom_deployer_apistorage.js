const { ethers } = require("hardhat");
const { algebraFactory } = require("../contract-deployments/algebra-addresses")
const { contracts} = require("../../../../deployments/custom-pool-deployers.json")
const { algebraPoolAPIStorageAbi, algebraPoolAPIStorageAddress } = require("../../../../generated/algebra-pool-apistorage");


async function main () {
    try{
        const algebraPoolStorage = await ethers.getContractAt(algebraPoolAPIStorageAbi, algebraPoolAPIStorageAddress);
        for (const address of Object.values(contracts)) {
            console.log(address);
            const tx2 = await algebraPoolStorage.addCustomDeployer(address);
            await tx2.wait();
        }
    } catch(error){
        console.log("add_custom_deployer_apistorage failed: ", error);
        process.exit(1);
    }
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error); 
    process.exit(1);
  });

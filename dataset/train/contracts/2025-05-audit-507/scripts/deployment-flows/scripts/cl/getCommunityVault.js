const { ethers } = require("hardhat");
const {algebraPoolAbi } = require("../../../../generated/algebra-pool");
const { contracts } = require("../../../../deployments/custom-pool-deployers.json");

async function main () {
    accounts = await ethers.getSigners();
    const ownerAddress = accounts[0].address;
    console.log("ownerAddress : ", ownerAddress)
    // create pool with tickSpacing 1
    const algebraContract = await ethers.getContractAt(algebraPoolAbi, "0x700b78bfcaf00de5dff61fd4787dc4bfd47f78a5");
    const communityVault = await algebraContract.communityVault();
    
    console.log(communityVault);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error); 
    process.exit(1);
  });

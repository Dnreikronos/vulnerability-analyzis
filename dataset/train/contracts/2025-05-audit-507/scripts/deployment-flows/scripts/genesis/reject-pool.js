const { genesisPoolManagerAddress, genesisPoolManagerAbi } = require('../../../../generated/genesis-pool-manager');
const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main () {

  accounts = await ethers.getSigners();
  owner = accounts[0];
  const ownerAddress = owner.address;
  console.log("ownerAddress : ", ownerAddress)

    try{
        const nativeToken = process.env.NATIVE_TOKEN;
        if (!nativeToken) {
            throw new Error("NATIVE_TOKEN environment variable is required.");
        }
        console.log("nativeToken : ", nativeToken)
        const GenesisManagerContract = await ethers.getContractAt(genesisPoolManagerAbi, genesisPoolManagerAddress);
        const tx = await GenesisManagerContract.rejectGenesisPool(nativeToken);
        await tx.wait();
    }
    catch(error){
        console.log("Error in reject token : ", error)
    }
}

main()
  .then(
    () => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});


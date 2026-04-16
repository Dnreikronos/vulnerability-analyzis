const { genesisPoolAbi } = require('../../../../generated/genesis-pool');
const { customTokenAbi } = require('../../../../generated/custom-token');
const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');
const { BigNumber } = require("ethers");

async function main () {

  accounts = await ethers.getSigners();
  owner = accounts[0];
  const ownerAddress = owner.address;
  console.log("ownerAddress : ", ownerAddress)

    try{
        const genesisPoolAddress = "0x0d30356720feCeEFf74b35d416a50893fB8af23e";

        const GenesisPoolContract = await ethers.getContractAt(genesisPoolAbi, genesisPoolAddress);
        const genesisSigner = GenesisPoolContract.connect(accounts[1]);
        const data = await genesisSigner.claimableIncentives();

        console.log("claimable incentives : ", data);

        await genesisSigner.claimIncentives();
        console.log("claimed incentives");

    }
    catch(error){
        console.log("Error in deposit native token : ", error)
    }
}

main()
  .then(
    () => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});


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
        const genesisPoolAddress = "0xf6BDc4656298b9512620B7f4cd46D2221C3a5DfD";

        const GenesisPoolContract = await ethers.getContractAt(genesisPoolAbi, genesisPoolAddress);
        const genesisSigner = GenesisPoolContract.connect(accounts[1]);
        const data = await genesisSigner.claimableUnallocatedAmount();

        console.log("claimable deposits : ", data);

        await genesisSigner.claimUnallocatedAmount();
        console.log("claimed deposits");

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


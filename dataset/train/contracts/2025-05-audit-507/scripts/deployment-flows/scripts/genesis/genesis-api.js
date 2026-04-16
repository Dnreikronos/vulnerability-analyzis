const { genesisPoolAPIAbi, genesisPoolAPIAddress } = require('../../../../generated/genesis-pool-api');
const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');
const { genesisPoolManagerAbi, genesisPoolManagerAddress } = require('../../../../generated/genesis-pool-manager');
const { genesisPoolFactoryAbi, genesisPoolFactoryAddress } = require('../../../../generated/genesis-pool-factory');
const { genesisPoolAbi } = require('../../../../generated/genesis-pool');

async function main () {

  accounts = await ethers.getSigners();
  owner = accounts[0];
  const ownerAddress = owner.address;
  console.log("ownerAddress : ", accounts[1].address)

    try{
        const GenesisPoolManager = await ethers.getContractAt(genesisPoolManagerAbi, genesisPoolManagerAddress);

        const genesisFactory = await GenesisPoolManager.genesisFactory();
        console.log("genesisFactory : ", genesisFactory)

        const nativeTokens = await GenesisPoolManager.getAllNaitveTokens();

        console.log("nativeTokens : ", nativeTokens);
   
        const GenesisFactory = await ethers.getContractAt(genesisPoolFactoryAbi, genesisPoolFactoryAddress);

        for(let i=0;i<nativeTokens.length;i++){
          const genesiPools = await GenesisFactory.getGenesisPools(nativeTokens[i]);
          console.log("genesis pools : ", genesiPools)
          const Genesis = await ethers.getContractAt(genesisPoolAbi, genesiPools[0]);
          console.log("status : ", await Genesis.poolStatus())
        }

    }
    catch(error){
        console.log("Error in genesis api : ", error)
    }
}

main()
  .then(
    () => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});


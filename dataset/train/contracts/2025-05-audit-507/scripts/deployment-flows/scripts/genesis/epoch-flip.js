const { genesisPoolManagerAddress, genesisPoolManagerAbi } = require('../../../../generated/genesis-pool-manager');
const { tokenHandlerAbi, tokenHandlerAddress } = require('../../../../generated/token-handler');
const { genesisPoolAbi } = require('../../../../generated/genesis-pool');
const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');
const { BigNumber } = require("ethers");
// const { generateConstantFile } = require('../../../blackhole-scripts/postDeployment/generator');

async function main () {

  accounts = await ethers.getSigners();
  owner = accounts[0];
  const ownerAddress = owner.address;
  console.log("ownerAddress : ", ownerAddress)

    try{

        const GenesisManagerContract = await ethers.getContractAt(genesisPoolManagerAbi, genesisPoolManagerAddress);
        let txt = await GenesisManagerContract.checkAtEpochFlip();
        console.log("txt1 : ", txt);

        // const genesisPoolAddress = "0x6529f885a40725e79C90981d64ece5D1B4F89768"

        // const GenesisPoolContract = await ethers.getContractAt(genesisPoolAbi, genesisPoolAddress);
        // const eligible = await GenesisPoolContract.eligbleForPreLaunchPool();
        // console.log("eligible : ", eligible);

        // const TokenHandler = await ethers.getContractAt(tokenHandlerAbi, tokenHandlerAddress);
        // const len = await TokenHandler.whiteListedTokensLength();
        // for(let i=0;i<len;i++){
        //   console.log("data : ", await TokenHandler.whiteListed(i));
        // }
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


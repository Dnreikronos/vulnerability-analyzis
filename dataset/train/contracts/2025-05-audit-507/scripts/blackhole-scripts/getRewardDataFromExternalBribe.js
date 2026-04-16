const { ethers  } = require('hardhat');
// const { gaugeFactoryV2Abi, gaugeFactoryV2Address } = require('./gaugeConstants/gauge-factory-v2');
// const { routerV2Address } = require('./gaugeConstants/')
const { gaugeV2Abi } = require('./gaugeConstants/gaugeV2-constants');
const { bribeAbi } = require('./gaugeConstants/bribe');

const { BigNumber } = require("ethers");

async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]
      const gaugeV2Contract = await ethers.getContractAt(gaugeV2Abi, "0x4A05049d6C2c76a04F14F640ACDf8B832749B7Fb");
      const ExternalBribeAddress = await gaugeV2Contract.external_bribe();
      const ExternalBribeContract = await ethers.getContractAt(bribeAbi, ExternalBribeAddress);
      const earnedAmount = await ExternalBribeContract.bribeTokens(3);

      // const earnedAmount = await ExternalBribeContract.earned(2, "0xc41b8BEeE9f9AeD4558d226da38f67891B474731");
      console.log("earnedAmount ", earnedAmount);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
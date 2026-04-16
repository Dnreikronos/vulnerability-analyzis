const { ethers  } = require('hardhat');
const { gaugeFactoryV2Abi, gaugeFactoryV2Address } = require('./gaugeConstants/gauge-factory-v2');
const { gaugeV2Abi } = require('./gaugeConstants/gaugeV2-constants');
const { bribeAbi } = require('./gaugeConstants/bribe')
const { tokenThree, tokenFour, tokenOne, tokenAbi } = require("../V1/dexAbi");
const { ZERO_ADDRESS } = require("@openzeppelin/test-helpers/src/constants.js");
const { BigNumber } = require("ethers");

async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]

    const gaugeFactoryContract = await ethers.getContractAt(gaugeFactoryV2Abi, gaugeFactoryV2Address);
    const getAllGauge = await gaugeFactoryContract.gauges();
    for(const gauge of getAllGauge){
        if(gauge === ZERO_ADDRESS)
            continue;

        const gaugeV2Contract = await ethers.getContractAt(gaugeV2Abi, gauge);
        const ExternalBribeAddress = await gaugeV2Contract.external_bribe();
        const ExternalBribeContract = await ethers.getContractAt(bribeAbi, ExternalBribeAddress);
        const balance = await ExternalBribeContract.balanceOf(tokenThree);
        console.log("balance ", balance);

        try {
          const earnedAmount = await ExternalBribeContract.callStatic.earned(1, tokenThree);
          console.log("earnedAmount ", earnedAmount);
        } catch (error) {
          console.log("error ",error);
        }
    }
    console.log("getAllGauge", getAllGauge)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
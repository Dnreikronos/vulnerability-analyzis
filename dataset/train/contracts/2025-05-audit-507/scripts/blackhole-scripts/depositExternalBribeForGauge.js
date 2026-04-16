const { ethers  } = require('hardhat');
const { gaugeFactoryV2Abi, gaugeFactoryV2Address } = require('./gaugeConstants/gauge-factory-v2');
// const { routerV2Address } = require('./gaugeConstants/')
const { gaugeV2Abi } = require('./gaugeConstants/gaugeV2-constants');
const { minterUpgradableAbi } = require('./gaugeConstants/minter-upgradable');
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
        // console.log("gauge", gauge)
        if(gauge === ZERO_ADDRESS)
            continue;

        const gaugeV2Contract = await ethers.getContractAt(gaugeV2Abi, gauge);
        const ExternalBribeAddress = await gaugeV2Contract.external_bribe();
        const ExternalBribeContract = await ethers.getContractAt(bribeAbi, ExternalBribeAddress);

        await ExternalBribeContract.addRewardToken(tokenThree);

        // const approvalAmountString = (BigInt(1000000) * BigInt(10 ** 18)).toString();
        // const tokenContract = await ethers.getContractAt(tokenAbi, tokenThree);
        // await tokenContract.approve("0x523B93f757fA2184B0257aF98247275c7a028155", approvalAmountString);

        
        // const p = await ExternalBribeContract.isRewardToken(tokenThree);
        // // const x = await tokenContract.balanceOf("0x8ec18CcA7E8d40861dc07C217a6426f60005A661");
        // console.log("p ", p);
        // const bribeAmount = BigNumber.from("25000").mul(BigNumber.from("1000000000000000000"));

        // await ExternalBribeContract.notifyRewardAmount(tokenThree, bribeAmount);
    }
    console.log("getAllGauge", getAllGauge)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
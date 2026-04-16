const { ethers } = require("hardhat")
const { blackHolePairApiV2Abi, blackHolePairApiV2ProxyAddress } = require('./pairApiConstants');
const { minterUpgradableAddress, minterUpgradableAbi } = require('./gaugeConstants/minter-upgradable');
const { voterV3Address, voterV3Abi } = require("./gaugeConstants/voter-v3");
const { bribeAbi } = require("./gaugeConstants/bribe");
const { ZERO_ADDRESS } = require("@openzeppelin/test-helpers/src/constants.js");

async function main () {

    accounts = await ethers.getSigners();
    owner = accounts[0];
    console.log("Owner : ", owner.address);


    const voterV3Contract = await ethers.getContractAt(voterV3Abi, voterV3Address);
    await voterV3Contract.setMinter(minterUpgradableAddress);
    console.log("setMinter complete for VoterV3 \n");


    const blackHoleAllPairContract =  await ethers.getContractAt(blackHolePairApiV2Abi, blackHolePairApiV2ProxyAddress);
    const allPairs = await blackHoleAllPairContract.getAllPair(owner.address, BigInt(1000), BigInt(0));
    const pairs = allPairs[2];

    for(const p of pairs){
        const currentAddress = p[0];
        if(currentAddress === ZERO_ADDRESS)
            break;

        console.log("current pair ", currentAddress);
        let currentGaugeAddress = await voterV3Contract.gauges(currentAddress);
        console.log("currentGaugeAddress before", currentGaugeAddress);
        if(currentGaugeAddress === ZERO_ADDRESS){
            const createGaugeTx = await voterV3Contract.createGauge(currentAddress, BigInt(0), {
                gasLimit: 21000000
            });
            await createGaugeTx.wait();
            // console.log('createdgaugetx', createGaugeTx);

            currentGaugeAddress = await voterV3Contract.gauges(currentAddress);
        }
        console.log("currentGaugeAddress after", currentGaugeAddress);

        let internalBribeAddress = await voterV3Contract.internal_bribes(currentGaugeAddress);
        let externalBribeAddress = await voterV3Contract.external_bribes(currentGaugeAddress);

        console.log("bribe addresses", internalBribeAddress, externalBribeAddress);

        const internalBribeContract =  await ethers.getContractAt(bribeAbi, internalBribeAddress);
        await internalBribeContract.setMinter(minterUpgradableAddress);

        const externalBribeContract =  await ethers.getContractAt(bribeAbi, externalBribeAddress);
        await externalBribeContract.setMinter(minterUpgradableAddress)

        console.log("internal & external bribe minter set complete \n");
    } 


    
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

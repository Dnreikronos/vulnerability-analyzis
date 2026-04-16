async function main () {

}const { ethers  } = require('hardhat');

const { ZERO_ADDRESS } = require("@openzeppelin/test-helpers/src/constants.js");
const { blackHolePairApiV2Abi, blackHolePairApiV2ProxyAddress } = require('./pairApiConstants');
const { voterV3Abi, voterV3Address } = require('./gaugeConstants/voter-v3');

async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]
    const ownerAddress = owner.address;

    const voterV3Contract = await ethers.getContractAt(voterV3Abi, voterV3Address);
    console.log("voterV3Contract ", voterV3Address, voterV3Contract.address)

    // creating gauge for pair bwn - token one and token two - basic volatile pool

    const blackHoleAllPairContract =  await ethers.getContractAt(blackHolePairApiV2Abi, blackHolePairApiV2ProxyAddress);
    const allPairs = await blackHoleAllPairContract.getAllPair(owner.address, BigInt(1000), BigInt(0));
    const pairs = allPairs[2];


    // console.log("all pairs", allPairs)
    for(const p of pairs){
        const currentAddress = p[0];
        if(currentAddress === ZERO_ADDRESS)
            break;

        console.log("current pair ", currentAddress);
        const currentGaugeAddress = await voterV3Contract.gauges(currentAddress);
        console.log("currentGaugeAddress", currentGaugeAddress);
        if(currentGaugeAddress === ZERO_ADDRESS){
            const createGaugeTx = await voterV3Contract.createGauge(currentAddress, BigInt(0), {
                gasLimit: 21000000
            });
            // await createGaugeTx.wait();
            console.log('createdgaugetx', createGaugeTx);
        }
    }
    console.log('done creation of gauge tx')
}   

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
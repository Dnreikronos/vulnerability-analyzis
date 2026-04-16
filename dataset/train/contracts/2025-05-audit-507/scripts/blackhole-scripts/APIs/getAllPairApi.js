const { ethers  } = require('hardhat');

const { ZERO_ADDRESS } = require("@openzeppelin/test-helpers/src/constants.js");
const { blackHolePairApiV2Abi, blackHolePairApiV2ProxyAddress } = require('../pairApiConstants');
const { pairFactoryAbi, pairFactoryAddress } = require('../../V1/dexAbi');
const { voterV3Abi, voterV3Address } = require('../gaugeConstants/voter-v3');
const fs = require("fs");

async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]

    const voterV3Contract = await ethers.getContractAt(voterV3Abi, voterV3Address);

    const pairFactoryContract = await ethers.getContractAt(pairFactoryAbi, pairFactoryAddress);
    const pairsLength = await pairFactoryContract.allPairsLength();

    // console.log("pairsLength : ", pairsLength);

    const blackHoleAllPairContract = await ethers.getContractAt(blackHolePairApiV2Abi, blackHolePairApiV2ProxyAddress);
    const blackHoleAllPairContractOwner = await blackHoleAllPairContract.owner();
    // console.log("blackHoleAllPairContract owner : ", blackHoleAllPairContractOwner);
    // console.log('get all pair inputs', owner.address, BigInt(pairsLength), BigInt(0))
    const blackHoleAllPairContractPairsData = await blackHoleAllPairContract.getAllPair(owner.address, BigInt(pairsLength), BigInt(0));

    const totalPairs = blackHoleAllPairContractPairsData[0];
    const hasNextPage = blackHoleAllPairContractPairsData[1]
    const pairsInfo = blackHoleAllPairContractPairsData[2];
    console.log("All pairs : ", totalPairs, hasNextPage);


    let list = []
    try {
        pairsInfo.forEach(elm => {
            let i = 1;
            const keys = Object.keys(elm);
            let mp = {};
            keys.forEach(key => {
                if (isNaN(parseInt(key))){
                    mp[key] = elm[key];
                }
            })
            list.push(mp);
        })

        const outputPath = './blackHolePairsData.json';
        fs.writeFileSync(outputPath, JSON.stringify(list, null, 2));
        console.log(`Data written to ${outputPath}`);

    } catch (error) {
        console.error("Error fetching pairs data: ", error);
    }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
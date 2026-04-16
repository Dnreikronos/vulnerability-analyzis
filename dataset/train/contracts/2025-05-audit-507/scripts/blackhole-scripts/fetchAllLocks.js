const { ethers  } = require('hardhat');
const { gaugeFactoryV2Abi, gaugeFactoryV2Address } = require('./gaugeConstants/gauge-factory-v2');
const { veNFTAPIAbi, veNFTAPIAddress } = require('./gaugeConstants/ve-nft-api');
const { pairFactoryAbi } = require("../V1/dexAbi");


async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]

    const veNFTApi = await ethers.getContractAt(veNFTAPIAbi, veNFTAPIAddress);
    const userLocks = await veNFTApi.getNFTFromAddress("0xa7243fc6FB83b0490eBe957941a339be4Db11c29");
    console.log("userLocks: ", userLocks)
    const pairFactory = await veNFTApi.pairFactory();
    const pairFactoryContract = await ethers.getContractAt(pairFactoryAbi, pairFactory);
    console.log("get pair length", await pairFactoryContract.allPairsLength());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
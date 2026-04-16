const { ethers  } = require('hardhat');
const { pairFactoryAbi, pairFactoryAddress } = require('../../generated/pair-factory');
const { pairAbi } = require('../../generated/pair');



async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]
    try {
        const pairFactoryContract = await ethers.getContractAt(pairAbi, "0xEe839E18D678ab1d126f9b482aE2a0155a650f48");
        const getPair = await pairFactoryContract.metadata();
        console.log("getAllPairs", getPair)
    } catch (error) {
        console.log("error ", error)
    }
    
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
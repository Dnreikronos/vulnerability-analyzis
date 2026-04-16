const { ethers  } = require('hardhat');
const { algebraFactoryAbi } = require('../../generated/algebra-factory');
// const { pairAbi } = require('../../generated/pair');



async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]
    try {
        const algebraPairAPIContract = await ethers.getContractAt(algebraFactoryAbi, "0x26226a2146642cb22494Ccc50CB4315A5Dc92Fc9");
        const getPair = await algebraPairAPIContract.allPairsLength();
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
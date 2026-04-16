const { ethers  } = require('hardhat');
const { algebraPoolAPIAddress, algebraPoolAPIAbi } = require('../../generated/algebra-pool-api');
const { pairAbi } = require('../../generated/pair');



async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]
    try {
        const algebraPairAPIContract = await ethers.getContractAt(algebraPoolAPIAbi, algebraPoolAPIAddress);
        const getPair = await algebraPairAPIContract.getAllPoolInfo("10", "0");
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
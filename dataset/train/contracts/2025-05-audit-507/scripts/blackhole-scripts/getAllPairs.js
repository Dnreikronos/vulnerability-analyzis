const { ethers  } = require('hardhat');
const { blackholePairAPIV2Abi, blackholePairAPIV2Address } = require('../../generated/blackhole-pair-apiv2');



async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]
    try {
        const blackApiContract = await ethers.getContractAt(blackholePairAPIV2Abi, blackholePairAPIV2Address);
        console.log("blackApiContract found")
        const getAllPairs = await blackApiContract.getAllPair(owner.address, 10, 0);
        console.log("getAllPairs", getAllPairs)
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
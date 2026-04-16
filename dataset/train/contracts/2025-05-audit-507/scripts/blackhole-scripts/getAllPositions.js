const { ethers  } = require('hardhat');
const { nonfungiblePositionManager } = require('../../scripts/deployment-flows/scripts/contract-deployments/algebra-addresses');
const { nonfungiblePositionManagerAbi } = require('../../generated/nonfungiable-position-manager');




async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]
    try {
        const nonfungiblePositionManagerContract = await ethers.getContractAt(nonfungiblePositionManagerAbi, nonfungiblePositionManager);
        // console.log("blackApiContract found")
        const getAllPairs = await nonfungiblePositionManagerContract.positions(4);
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
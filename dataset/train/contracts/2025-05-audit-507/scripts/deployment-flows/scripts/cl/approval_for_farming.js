const { ethers } = require("hardhat");
const { nfpmAbi} = require("../../../../generated/algebra_nfpm");
const { nonfungiblePositionManager, farmingCenter } = require("../contract-deployments/algebra-addresses")

async function main () {
    const nfpmContract = await ethers.getContractAt(nfpmAbi, nonfungiblePositionManager);
    const tx = await nfpmContract.approveForFarming(1, true, farmingCenter);
    await tx.wait();
    console.log("approveForFarming done.");
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error); 
    process.exit(1);
  });
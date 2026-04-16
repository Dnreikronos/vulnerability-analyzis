const { ethers  } = require('hardhat');
const { rewardsDistributorAbi, rewardsDistributorAddress } = require('../../generated/rewards-distributor');



async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]
    try {
        const rewardsDistributorContract = await ethers.getContractAt(rewardsDistributorAbi, rewardsDistributorAddress);

        const claimable = await rewardsDistributorContract.claimable(1);
        console.log("claimable", claimable)
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
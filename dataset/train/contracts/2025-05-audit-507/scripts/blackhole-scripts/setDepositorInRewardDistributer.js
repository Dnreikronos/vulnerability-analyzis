const { rewardsDistributorAbi, rewardsDistributorAddress } = require("./gaugeConstants/reward-distributor");
const { minterUpgradableAddress } = require("./gaugeConstants/minter-upgradable");

async function main () {
    const rewardDistributerContract = await ethers.getContractAt(rewardsDistributorAbi, rewardsDistributorAddress);
    await rewardDistributerContract.setDepositor(minterUpgradableAddress);
    console.log('set depositer in rewardsDistributer');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
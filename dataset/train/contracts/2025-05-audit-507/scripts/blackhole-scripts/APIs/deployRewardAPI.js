const { ethers } = require("hardhat")
const { voterV3Address } = require("../gaugeConstants/voter-v3");

async function main () {

    data = await ethers.getContractFactory("RewardAPI");
    console.log('deploying...')
    input = [voterV3Address]
    const rewardApi = await upgrades.deployProxy(data, input, {initializer: 'initialize'});
    txDeployed = await rewardApi.deployed();
    console.log('rewardApi : ', rewardApi.address)
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

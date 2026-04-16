const { ethers } = require("hardhat")
const { permissionsRegistryAddress } = require('./gaugeConstants/permissions-registry')
const { ZERO_ADDRESS } = require("@openzeppelin/test-helpers/src/constants.js");
const { voterV3Address } = require("./gaugeConstants/voter-v3");
const { blackHolePairApiV2ProxyAddress } = require("./pairApiConstants");
const { rewardsDistributorAbi, rewardsDistributorAddress } = require("./gaugeConstants/reward-distributor");

async function main () {
    data = await ethers.getContractFactory("veNFTAPI");
    console.log('deploying...')
    // address _voter, address _rewarddistro, address _pairApi
    input = [voterV3Address, rewardsDistributorAddress, blackHolePairApiV2ProxyAddress] // 
    veNFTAPI = await upgrades.deployProxy(data, input, {initializer: 'initialize'});
    txDeployed = await veNFTAPI.deployed();
    console.log('deployed venftapi address: ', veNFTAPI.address)
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const { ethers } = require("hardhat");
const { blackholePairAPIV2Address } = require("../../generated/blackhole-pair-apiv2");
const { voterV3Address } = require("../../generated/voter-v3");

async function main() {
    const accounts = await ethers.getSigners();
    const owner = accounts[0];

    const rewardsBasedTopPools = await ethers.getContractFactory("RewardsBasedTopNPoolsStrategy");
    const deployedRewardsBasedPools = await rewardsBasedTopPools.deploy(blackholePairAPIV2Address, voterV3Address);
    console.log("top n pools", await deployedRewardsBasedPools.getTopNPools());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
    });
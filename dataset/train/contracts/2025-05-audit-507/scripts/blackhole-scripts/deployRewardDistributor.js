const { ethers } = require("hardhat")
const { votingEscrowAddress } = require('./gaugeConstants/voting-escrow')
const { pairFactoryAddress, tokenOne, tokenTwo, tokenThree, tokenFour, tokenFive, tokenSix, tokenSeven, tokenEight, tokenNine, tokenTen } = require("../V1/dexAbi");

async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]
    const ownerAddress = owner.address;
    console.log("Walltet address : ", ownerAddress);

    data = await ethers.getContractFactory("RewardsDistributor");
    const rewardsDistributor = await data.deploy(votingEscrowAddress);
    txDeployed = await rewardsDistributor.deployed();
    console.log('RewardsDistributor ', rewardsDistributor.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});

const { ethers } = require("hardhat")
const { voterV3Address } = require("../../../generated/voter-v3");
const { votingEscrowAddress } = require("../../../generated/voting-escrow");
const { minterUpgradeableAddress } = require("../../../generated/minter-upgradeable");
const { avmAbi, avmAddress } = require("../../../generated/avm");

async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0] 
    const avmContract = await ethers.getContractAt(avmAbi, avmAddress);
    console.log('voter in avm: ', await avmContract.voterV3())
    console.log("getRewardsPerVotingPower: ", await avmContract.getRewardsPerVotingPower("5"))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

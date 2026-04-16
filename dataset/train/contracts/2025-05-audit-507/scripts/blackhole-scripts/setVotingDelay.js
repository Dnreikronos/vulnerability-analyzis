const { ethers } = require("hardhat")
const { blackHolePairApiV2Abi, blackHolePairApiV2ProxyAddress } = require('./pairApiConstants');
const { minterUpgradableAddress, minterUpgradableAbi } = require('./gaugeConstants/minter-upgradable');
const { voterV3Address, voterV3Abi } = require("./gaugeConstants/voter-v3");
const { votingEscrowAddress, votingEscrowAbi } = require("./gaugeConstants/voting-escrow");
const { bribeAbi } = require("./gaugeConstants/bribe");
const { ZERO_ADDRESS } = require("@openzeppelin/test-helpers/src/constants.js");

async function main () {
    const voterV3 = await ethers.getContractAt(voterV3Abi, voterV3Address);
    const lastVoting = await voterV3.lastVoted("11");
    console.log("lastVoting :", lastVoting);
    console.log("_epochTimestamp: ", await voterV3._epochTimestamp())

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const { ethers } = require("hardhat")
const { blackHolePairApiV2Abi, blackHolePairApiV2ProxyAddress } = require('./pairApiConstants');
const { minterUpgradableAddress, minterUpgradableAbi } = require('./gaugeConstants/minter-upgradable');
const { voterV3Address, voterV3Abi } = require("./gaugeConstants/voter-v3");
const { votingEscrowAddress, votingEscrowAbi } = require("./gaugeConstants/voting-escrow");
const { bribeAbi } = require("./gaugeConstants/bribe");
const { ZERO_ADDRESS } = require("@openzeppelin/test-helpers/src/constants.js");

async function main () {
    const voteringEscrow = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress);
    await voteringEscrow.setVoter(voterV3Address);
    console.log("setVoter complete for voteringEscrow");
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

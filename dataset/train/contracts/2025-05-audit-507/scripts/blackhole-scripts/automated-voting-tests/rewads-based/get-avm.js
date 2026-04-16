const { ethers } = require("hardhat")
const { votingEscrowAddress, votingEscrowAbi } = require("../../../../generated/voting-escrow");
const { automatedVotingManagerAbi, automatedVotingManagerAddress } = require("../../../../generated/automated-voting-manager");
const { bribeAbi } = require("../../gaugeConstants/bribe");
const { blackholePairAPIV2Abi, blackholePairAPIV2Address } = require("../../../../generated/blackhole-pair-apiv2");

const deployedTokens = require('../../../deployment-flows/token-constants/deployed-tokens.json');
const { blackAbi } = require("../../../../generated/black");
const { voterV3Abi, voterV3Address } = require("../../../../generated/voter-v3");
const { rewardsBasedTopNPoolsStrategyAbi, rewardsBasedTopNPoolsStrategyAddress } = require("../../../../generated/rewards-based-top-npools-strategy");
const { veNFTAPIAbi, veNFTAPIAddress } = require("../../../../generated/ve-nftapi");
const blackAddress = deployedTokens[0].address;
console.log("blackAddress is as: ", blackAddress);

function getEpochStart (timestamp) {
    const WEEK = 30 * 60; // 604800 seconds
    return timestamp - (timestamp % WEEK);
}

async function main () {
  try {
    const user = await ethers.getSigners()
    console.log("user address: ", user[0].address)
        const veNFTApi = await ethers.getContractAt(veNFTAPIAbi, veNFTAPIAddress);
        console.log("avm: ", await veNFTApi.avm())
        const settingAVM = await veNFTApi.setAVM(automatedVotingManagerAddress);
        await settingAVM.wait();
        console.log("ve fnt locks avm: ", await veNFTApi.getAVMNFTFromAddress(user[0].address))
  } catch (err) {
    console.error("Error in this: ", err)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

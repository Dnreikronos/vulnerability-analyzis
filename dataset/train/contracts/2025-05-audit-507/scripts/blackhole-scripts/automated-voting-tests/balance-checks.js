const { ethers } = require("hardhat")
const { votingEscrowAddress } = require("../../../generated/voting-escrow");
const { votingEscrowAbi } = require("../../../generated/voting-escrow");
const { blackAbi } = require("../gaugeConstants/black");
const deployedTokens = require("../../deployment-flows/token-constants/deployed-tokens.json");
// console.log("dployed tokens", deployedTokens)
const blackAddress = deployedTokens[0].address;

// console.log("black token address is: ", blackAddress); 

// const { default: BigNumber } = require("bignumber.js");
const { avmAbi, avmAddress } = require("../../../generated/avm");
const { veArtProxyUpgradeableAbi, veArtProxyUpgradeableAddress } = require("../../../generated/ve-art-proxy-upgradeable");

async function main () {
    const votingEscrow = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress);
    const black = await ethers.getContractAt(blackAbi, blackAddress);
    const lockedAmount = "100000000000000000000"
    const approveTx = await black.approve(votingEscrowAddress, lockedAmount);
    await approveTx.wait();
    const creationLockTx = await votingEscrow.create_lock(lockedAmount, 10*86400, false);
    await creationLockTx.wait();
    // const lockId = await votingEscrow.
    const veNFTAPI = await ethers.getContractAt(veArtProxyUpgradeableAbi, veArtProxyUpgradeableAddress);
    console.log("ids", await veNFTAPI.getAllNFT("100", "0"));
    const avmContract = await ethers.getContractAt(avmAbi, avmAddress);
    console.log("owner of token id 1: ", await votingEscrow.ownerOf(1))
    const enableAutoVotingTx = await avmContract.enableAutoVoting(1); // hardcoded
    await enableAutoVotingTx.wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

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

    const approveTxTwo = await black.approve(votingEscrowAddress, lockedAmount);
    await approveTxTwo.wait();
    const creationLockTxTwo = await votingEscrow.create_lock(lockedAmount, 10*86400, false);
    await creationLockTxTwo.wait();

    console.log("here 123")

    // const notAutovotingBalance = "30000000000000000000"
    // const approveTxThree = await black.approve(votingEscrowAddress, notAutovotingBalance);
    // await approveTxThree.wait();
    // const creationLockTxThree = await votingEscrow.create_lock(notAutovotingBalance, 10*86400, false);
    // await creationLockTxThree.wait();
    // const lockId = await votingEscrow.
    const avmContract = await ethers.getContractAt(avmAbi, avmAddress);
    console.log("owner of token id 1: ", await votingEscrow.ownerOf(1))
    const approveLockTx = await votingEscrow.approve(avmAddress, 1);
    await approveLockTx.wait()
    const approveLockTxTwo = await votingEscrow.approve(avmAddress, 2);
    await approveLockTxTwo.wait()
    console.log("43")
    const enableAutoVotingTx = await avmContract.enableAutoVoting(1); // hardcoded
    await enableAutoVotingTx.wait();
    console.log("owner of token id 2: ", await votingEscrow.ownerOf(2))
    const enableAutoVotingTxTwo = await avmContract.enableAutoVoting(2); // hardcoded
    await enableAutoVotingTxTwo.wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

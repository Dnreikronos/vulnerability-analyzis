const { ethers } = require("hardhat")
const { votingEscrowAddress } = require("../../generated/voting-escrow");
const { votingEscrowAbi } = require("../../generated/voting-escrow");
const { blackAbi } = require("./gaugeConstants/black");
const deployedTokens = require("../deployment-flows/token-constants/deployed-tokens.json");
// console.log("dployed tokens", deployedTokens)
const blackAddress = deployedTokens[0].address;
const { automatedVotingManagerAbi, automatedVotingManagerAddress } = require("../../generated/automated-voting-manager");
const { veArtProxyUpgradeableAbi, veArtProxyUpgradeableAddress } = require("../../generated/ve-art-proxy-upgradeable");
const { veNFTAPIAbi, veNFTAPIAddress } = require("../../generated/ve-nftapi");

async function main () {
    const accounts = await ethers.getSigners();
    const owner = accounts[0];
    // const votingEscrow = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress);
    // const black = await ethers.getContractAt(blackAbi, blackAddress);
    // const lockedAmount = "100000000000000000000"
    // const approveTx = await black.approve(votingEscrowAddress, lockedAmount);
    // await approveTx.wait();
    // const creationLockTx = await votingEscrow.create_lock(lockedAmount, 10*86400, false);
    // await creationLockTx.wait();

    // const approveTxTwo = await black.approve(votingEscrowAddress, lockedAmount);
    // await approveTxTwo.wait();
    // const creationLockTxTwo = await votingEscrow.create_lock(lockedAmount, 10*86400, false);
    // await creationLockTxTwo.wait();

    // console.log("here 123")

    const avmContract = await ethers.getContractAt(automatedVotingManagerAbi, automatedVotingManagerAddress);
    // console.log("owner of token id 3: ", await votingEscrow.ownerOf(3))
    // const approveLockTx = await votingEscrow.approve(automatedVotingManagerAddress, 3);
    // await approveLockTx.wait()
    // console.log("approve lock tx")
    // const approveLockTxTwo = await votingEscrow.approve(automatedVotingManagerAddress, 4);
    // await approveLockTxTwo.wait()
    // console.log("43")
    // const enableAutoVotingTx = await avmContract.enableAutoVoting(3); // hardcoded
    // await enableAutoVotingTx.wait();
    // console.log("owner of token id 2: ", await votingEscrow.ownerOf(4))
    // const enableAutoVotingTxTwo = await avmContract.enableAutoVoting(4); // hardcoded
    // await enableAutoVotingTxTwo.wait();
    console.log("enabled second one as well")
    console.log("token idx length", await avmContract.tokenIdsLength())
    const veNFT = await ethers.getContractAt(veNFTAPIAbi, veNFTAPIAddress);
    const setAVMTx = await veNFT.setAVM(automatedVotingManagerAddress)
    await setAVMTx.wait();
    console.log("EREREerd", owner.address)
    const fetchLocks = await veNFT.getAVMNFTFromAddress(owner.address);
    console.log("fetch locks", fetchLocks)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

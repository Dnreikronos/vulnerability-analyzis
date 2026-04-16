const { autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress } = require("../../../../generated/auto-voting-escrow-manager");
const { blackAddress, blackAbi } = require("../../../../generated/black");
const { veNFTAPIAbi, veNFTAPIAddress } = require("../../../../generated/ve-nftapi");
const { votingEscrowAbi, votingEscrowAddress } = require("../../../../generated/voting-escrow");

async function main () {
    const accounts = await ethers.getSigners();
    const ownerAddress = accounts[0].address;
    // const veNFTAPI = await ethers.getContractAt(veNFTAPIAbi, veNFTAPIAddress);
    // const myAVMLocks = await veNFTAPI.getAVMNFTFromAddress(ownerAddress);
    // console.log("my avm locks: ", myAVMLocks);
    const amount = "10000000000000000000"
    const amountToApprove = "10000000000000000000"
    const votingEscrow = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress);
    const blackContract = await ethers.getContractAt(blackAbi, blackAddress);
    // console.log("got ve, i have balance of: ", await blackContract.balanceOf(ownerAddress));
    // return;
    const approveTx = await blackContract.approve(votingEscrowAddress, amountToApprove);
    await approveTx.wait();
    console.log("got approve")
    const createLockOne = await votingEscrow.create_lock(amount, 10*86400, false, {
      gasLimit: 15_000_000
    });
    console.log("RWFDSczx")
    await createLockOne.wait();
    const approveLockOne = await votingEscrow.approve(autoVotingEscrowManagerAddress, "1");
    await approveLockOne.wait();
    consoel.log("approved!")
    // const enableAutoVotingOneTx = await avmContract.enableAutoVoting("3");
    // await enableAutoVotingOneTx.wait();
    const avm = await ethers.getContractAt(autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress);
    // const autoVotingEscrows = await avm.getAVMs();
    const enableAutoVotingOneTx = await avm.enableAutoVoting("1");
    await enableAutoVotingOneTx.wait();
    // console.log("autovotingescrowS:", autoVotingEscrows);
}

main().then(() => console.log("Done!"))

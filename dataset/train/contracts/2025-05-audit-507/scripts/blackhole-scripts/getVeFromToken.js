const { ethers } = require("hardhat");
const { blackAbi, blackAddress } = require("./gaugeConstants/black");
const { votingEscrowAbi, votingEscrowAddress } = require("./gaugeConstants/voting-escrow")
const { BigNumber } = require("ethers");

async function main () {
    const acc = await ethers.getSigners();
    const owner = acc[0].address;
    console.log('owner is', owner)
    const blackholeContract = await ethers.getContractAt(blackAbi, blackAddress);
    const veContract =  await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress);
    let balanceOfOwner = await blackholeContract.balanceOf(owner);
    console.log('balanceOfOwner pre minting', balanceOfOwner)
    const approvalTxForBlackhole = await blackholeContract.approve(votingEscrowAddress, BigNumber.from(10));// given approval for 10 blackhole tokens
    await approvalTxForBlackhole.wait();
    console.log('approval done')

    const WEEK = 7 * 86400; // One week in seconds
    const TWO_YEARS_IN_SECONDS = 2 * 365 * 86400; // 2 years in seconds
    const CURRENT_TIME = Math.floor(Date.now() / 1000);

    // Calculate a safe lock duration (less than MAXTIME and rounded down to a week)
    const SAFE_LOCK_DURATION = Math.floor((TWO_YEARS_IN_SECONDS - WEEK) / WEEK) * WEEK;

    // Ensure the lock duration is within bounds
    const lockDuration = SAFE_LOCK_DURATION - (SAFE_LOCK_DURATION % WEEK);

    const mintingTx = await veContract.create_lock(
        BigNumber.from(10), 
        lockDuration, 
        {
            gasLimit: 2100000
        }
    );
    
    await mintingTx.wait();
    balanceOfOwner = await blackholeContract.balanceOf(owner);
    console.log('balanceOfOwner post minting', balanceOfOwner)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});

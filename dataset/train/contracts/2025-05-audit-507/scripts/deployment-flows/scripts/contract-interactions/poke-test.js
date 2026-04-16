const { ethers } = require("hardhat");
const { voterV3Abi, voterV3Address } = require("../../../../generated/voter-v3");
const { votingEscrowAbi, votingEscrowAddress } = require("../../../../generated/voting-escrow");
const { veNFTAPIAbi, veNFTAPIAddress } = require("../../../../generated/ve-nftapi");
const { blackAbi } = require("../../../blackhole-scripts/gaugeConstants/black");
const deployedTokens = require("../../token-constants/deployed-tokens.json");
const { minterUpgradeableAddress, minterUpgradeableAbi } = require("../../../../generated/minter-upgradeable");
const blackAddress = deployedTokens[0].address;

async function main() {
    const accounts = await ethers.getSigners();
    const user = accounts[0];

    const voterV3Contract = await ethers.getContractAt(voterV3Abi, voterV3Address);
    const votingEscrowContract = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress);
    const veNftApiContract = await ethers.getContractAt(veNFTAPIAbi, veNFTAPIAddress);
    const blackContract = await ethers.getContractAt(blackAbi, blackAddress);

    // Fetch and log user's BLACK token balance
    const blackBalance = await blackContract.balanceOf(user.address);
    console.log("User BLACK balance:", blackBalance.toString());

    // Approve votingEscrow contract to spend all user's BLACK balance
    const approvalTx = await blackContract.approve(votingEscrowAddress, blackBalance);
    await approvalTx.wait();
    console.log("Approved BLACK balance for Voting Escrow contract.");

    // Create 3 locks, each worth 5% of the balance (total 15%)
    const lockAmount = blackBalance.mul(5).div(100); // 5% of balance
    const lockDuration = 86400 * 7 * 52; // 1 year

    for (let i = 0; i < 1; i++) {
        const lockTx = await votingEscrowContract.create_lock(lockAmount, lockDuration);
        await lockTx.wait();
        console.log(`Lock ${i + 1} created with amount:`, lockAmount.toString());
    }

    const minterContract = await ethers.getContractAt(minterUpgradeableAbi, minterUpgradeableAddress);
    console.log("active_period", await minterContract.active_period());

    // Log VOTE_DELAY from voterV3 contract
    const voteDelay = await voterV3Contract.VOTE_DELAY();
    console.log("VOTE_DELAY:", voteDelay.toString());

    // Fetch NFT IDs owned by user
    const nftIds = await veNftApiContract.getNFTFromAddress(user.address);
    console.log("NFT IDs owned by user:", nftIds);

    // Define usingTokenId (token ID 1 for example)
    const usingTokenId = nftIds[0].id; // Assuming first owned NFT

    // Log lastVoted for usingTokenId
    const lastVoted = await voterV3Contract.lastVoted(usingTokenId);
    console.log("Last voted timestamp for tokenId", usingTokenId.toString(), ":", lastVoted.toString());

    // Approve usingTokenId for Voting Escrow contract
    const approveNFTTx = await votingEscrowContract.approve(votingEscrowAddress, usingTokenId);
    await approveNFTTx.wait();
    console.log("Approved NFT ID", usingTokenId.toString(), "for Voting Escrow contract.");

    // Increase locked amount by 2% of balance, twice
    const increaseAmount = blackBalance.mul(2).div(100); // 2% of balance
    for (let i = 0; i < 2; i++) {
      console.log("started loop for i: ", i)
      let lastVoted = await voterV3Contract.lastVoted(usingTokenId);
      let voteDelay = await voterV3Contract.VOTE_DELAY();
      console.log("vote delay", voteDelay)
      console.log("Last voted timestamp for tokenId", usingTokenId.toString(), ":", lastVoted.toString());
        const increaseTx = await votingEscrowContract.increase_amount(usingTokenId, increaseAmount);
        await increaseTx.wait();
        console.log(`Increased locked amount by 2% (${increaseAmount.toString()}) for tokenId`, usingTokenId.toString());

        // Log lastVoted for usingTokenId
    lastVoted = await voterV3Contract.lastVoted(usingTokenId);
    voteDelay = await voterV3Contract.VOTE_DELAY();
    console.log("vote delay", voteDelay)
    console.log("Last voted timestamp for tokenId", usingTokenId.toString(), ":", lastVoted.toString());
    }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

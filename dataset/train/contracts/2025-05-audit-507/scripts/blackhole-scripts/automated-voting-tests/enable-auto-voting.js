const { ethers } = require("hardhat")
const { votingEscrowAddress, votingEscrowAbi } = require("../../../generated/voting-escrow");
const { avmAbi, avmAddress } = require("../../../generated/avm");
const { veArtProxyUpgradeableAbi, veArtProxyUpgradeableAddress } = require("../../../generated/ve-art-proxy-upgradeable");
const { veNFTAPIAbi, veNFTAPIAddress } = require("../../../generated/ve-nftapi");

async function main () {
    const votingEscrow = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress);
    const lockId = 4;
    // console.log("recently creted lock id: ", await votingEscrow.tokenId())
    const veNFTAPI = await ethers.getContractAt(veNFTAPIAbi, veNFTAPIAddress);
    console.log("ids", await veNFTAPI.getAllNFT("10", "0"));

    // const approvalTx = await votingEscrow.approve(avmAddress, 4);
    // await approvalTx.wait();
    const avmContract = await ethers.getContractAt(avmAbi, avmAddress);
    // function enableAutoVoting(uint256 lockId) external nonReentrant {
    // const enableAutoVotingTx = await avmContract.enableAutoVoting(lockId);
    // await enableAutoVotingTx.wait();
    const originalOwner = await avmContract.originalOwner(lockId);
    console.log("original owner", originalOwner);
    const disableAutoVotingTx = await avmContract.disableAutoVoting(lockId);
    disableAutoVotingTx.wait();
    console.log("ENEDS HERE")
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

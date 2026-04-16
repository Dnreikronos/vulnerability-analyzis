const { autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress } = require("../../generated/auto-voting-escrow-manager");
const { veNFTAPIAbi, veNFTAPIAddress } = require("../../generated/ve-nftapi");

async function main () {
    const avm = await ethers.getContractAt(autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress);
    console.log("idx: ", await avm.tokenIdToAVMId("8"));
}

main()
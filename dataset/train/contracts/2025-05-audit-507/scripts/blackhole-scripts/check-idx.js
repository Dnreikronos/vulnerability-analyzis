const { autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress } = require("../../generated/auto-voting-escrow-manager");

async function main () {
    const avm = await ethers.getContractAt(autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress);
    console.log("idx: ", await avm.tokenIdToAVMId("33"))
}

main()
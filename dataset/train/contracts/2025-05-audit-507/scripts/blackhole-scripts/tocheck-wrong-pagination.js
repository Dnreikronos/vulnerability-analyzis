const { autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress } = require("../../envFiles/devnet/generated/auto-voting-escrow-manager");

async function main () {
    const avm = await ethers.getContractAt(autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress);
    console.log("token of owner")
}
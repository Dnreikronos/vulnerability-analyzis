const { autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress } = require("../../generated/auto-voting-escrow-manager");

async function main () {
    const avm = await ethers.getContractAt(autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress);
    const tx = await avm.performLockAction(0n, 0n, 1n, false);
    await tx.wait()
}

main().then(() => console.log("Done!"))
.catch(err => console.error("erropr in this thing: ", err))

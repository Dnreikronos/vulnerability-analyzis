const { gaugeManagerAddress, gaugeManagerAbi } = require("../../../envFiles/devnet/generated/gauge-manager");
const { autoVotingEscrowManagerAddress } = require("../../../generated/auto-voting-escrow-manager");

async function main () {
    const gaugeManager = await ethers.getContractAt(gaugeManagerAbi, gaugeManagerAddress);
    const avm = await gaugeManager.setAVM(autoVotingEscrowManagerAddress);
    await avm.wait()
    console.log("Avm: ", avm);
}

main().then(() => console.log("Done!"));

const { setterTopNPoolsStrategyAbi } = require("../../envFiles/devnet/generated/setter-top-npools-strategy");
const { autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress } = require("../../generated/auto-voting-escrow-manager");
const { setterTopNPoolsStrategyAddress } = require("../../generated/setter-top-npools-strategy");
const { setterVoteWeightStrategyAddress } = require("../../generated/setter-vote-weight-strategy");

async function main () {
    const avm = await ethers.getContractAt(autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress);
    const setterTx = await avm.setVoteWeightStrategy(setterVoteWeightStrategyAddress);
    await setterTx.wait();
    console.log("avm: ", await avm.topPoolsStrategy(), await avm.voteWeightStrategy());
}

main()


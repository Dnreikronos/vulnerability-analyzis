const { setterTopNPoolsStrategyAbi, setterTopNPoolsStrategyAddress } = require("../../../../generated/setter-top-npools-strategy");
const { autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress } = require("../../../../generated/auto-voting-escrow-manager");
const { setterVoteWeightStrategyAbi, setterVoteWeightStrategyAddress } = require("../../../../generated/setter-vote-weight-strategy");

async function main () {
    const accounts = await ethers.getSigners();
    const executor = "0x8ec18CcA7E8d40861dc07C217a6426f60005A661";
    console.log("executor:", executor)
    const avm = await ethers.getContractAt(autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress);
    const setterTopN = await ethers.getContractAt(setterTopNPoolsStrategyAbi, setterTopNPoolsStrategyAddress);
    const voteWgt = await ethers.getContractAt(setterVoteWeightStrategyAbi, setterVoteWeightStrategyAddress);
    const tx1 = await avm.setExecutor(executor);
    await tx1.wait();
    // console.log("tz1:done ")
    const tx2 = await setterTopN.setExecutor(executor);
    await tx2.wait();
    console.log("tz2:done ")
    const tx3 = await voteWgt.setExecutor(executor);
    await tx3.wait();

    console.log("ffs; executors: ", await avm.executor(), await setterTopN.executor(), await voteWgt.executor())
    console.log("tz3:done ")
}

main()

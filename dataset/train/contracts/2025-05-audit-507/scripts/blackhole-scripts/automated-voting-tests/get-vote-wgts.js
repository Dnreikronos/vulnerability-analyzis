const { ethers } = require("hardhat");


const { setterVoteWeightStrategyAbi, setterVoteWeightStrategyAddress } = require("../../../generated/setter-vote-weight-strategy");
const { autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress } = require("../../../generated/auto-voting-escrow-manager");

async function main() {
    // const voteWgtStrategy = await ethers.getContractFactory("SetterVoteWeightStrategy");
    // const deployedVoteWeightStrategy = await voteWgtStrategy.deploy("10");
    // await deployedVoteWeightStrategy.deployed();
    // generateConstantFile("SetterVoteWeightStrategy", deployedVoteWeightStrategy.address)
    // console.log("deployed setter vote wgtr strategy addresS: ", deployedVoteWeightStrategy.address);
    // const avmContract = await ethers.getContractAt(automatedVotingManagerAbi, automatedVotingManagerAddress);
    // const settingVoteWgtInAVM = await avmContract.setVoteWeightStrategy(deployedVoteWeightStrategy.address);
    // await settingVoteWgtInAVM.wait();
    // console.log("Done setting vote wgt in avm!")

    const avm = await ethers.getContractAt(autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress);
    console.log("vote wgt: ", await avm.voteWeightStrategy())
    const voteWgtAddress = await avm.voteWeightStrategy();
    const voteWgtContract = await ethers.getContractAt(setterVoteWeightStrategyAbi, setterVoteWeightStrategyAddress);
    console.log("vote wgts: ", await voteWgtContract.getVoteWeights());
    const topNPools = await ethers.getContractAt(setterVoteWeightStrategyAbi, setterVoteWeightStrategyAddress);
    const pools = await topNPools.getTopNPools();
    console.log("topN pools: ", pools);
}

main()
    .then((elm) => console.log("Done!"))
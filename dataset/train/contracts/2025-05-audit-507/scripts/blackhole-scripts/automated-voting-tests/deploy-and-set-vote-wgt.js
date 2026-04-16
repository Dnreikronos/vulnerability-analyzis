const { ethers } = require("hardhat");
const { automatedVotingManagerAbi, automatedVotingManagerAddress } = require("../../../generated/automated-voting-manager");

async function main() {
    const voteWgtStrategy = await ethers.getContractFactory("SetterVoteWeightStrategy");
    const deployedVoteWeightStrategy = await voteWgtStrategy.deploy("10");
    await deployedVoteWeightStrategy.deployed();
    console.log("deployed setter vote wgtr strategy addresS: ", deployedVoteWeightStrategy.address);
    const avmContract = await ethers.getContractAt(automatedVotingManagerAbi, automatedVotingManagerAddress);
    const settingVoteWgtInAVM = await avmContract.setVoteWeightStrategy(deployedVoteWeightStrategy.address);
    await settingVoteWgtInAVM.wait();
    console.log("Done setting vote wgt in avm!")
}

main()
    .then((elm) => console.log("Done!"))
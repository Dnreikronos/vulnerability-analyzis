const { automatedVotingManagerAbi, automatedVotingManagerAddress } = require("../../generated/automated-voting-manager");
const { simpleTopNPoolsStrategyAbi } = require("../../generated/simple-top-npools-strategy");
const { voterV3Address } = require("../../generated/voter-v3");
const { generateConstantFile } = require("./postDeployment/generator");

async function main () {
    // const simpleTopNPoolsStrategy = await ethers.getContractFactory("SetterVoteWeightStrategy");
    // const deployedThing = await simpleTopNPoolsStrategy.deploy(5);
    // await deployedThing.deployed();
    const avm = await ethers.getContractAt(automatedVotingManagerAbi, automatedVotingManagerAddress);
    // const tx = await avm.setVoteWeightStrategy(deployedThing.address);
    // await tx.wait();
    // generateConstantFile("SetterVoteWeightStrategy", deployedThing.address)

    const simpleTopNPoolsStrategy = await ethers.getContractFactory("SimpleTopNPoolsStrategy");
    const deployedPoolsStrategy = await simpleTopNPoolsStrategy.deploy(voterV3Address);
    await deployedPoolsStrategy.deployed();
    generateConstantFile("SimpleTopNPoolsStrategy", deployedPoolsStrategy.address);
    const tx = await avm.setTopNPoolsStrategy(deployedPoolsStrategy.address);
    await tx.wait();
}

main().then(() => console.log("done!"))

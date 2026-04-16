const { ethers } = require("hardhat")
const { voterV3Address, voterV3Abi } = require("../../generated/voter-v3");
const { votingEscrowAddress, votingEscrowAbi } = require("../../generated/voting-escrow");
const { minterUpgradeableAddress } = require("../../generated/minter-upgradeable");
const { rewardsDistributorAddress } = require("../../generated/rewards-distributor");
const { ZERO_ADDRESS } = require("@openzeppelin/test-helpers/src/constants");
  const { generateConstantFile } = require("./postDeployment/generator");
const { simpleTopNPoolsStrategyAbi, simpleTopNPoolsStrategyAddress } = require("../../generated/simple-top-npools-strategy");
const { voteWeightStrategyAbi, voteWeightStrategyAddress } = require("../../generated/vote-weight-strategy");
const { avmAddress } = require("../../generated/avm");

async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0] 
    data = await ethers.getContractFactory("AutomatedVotingManager");
    const simpleTopNStrat = await ethers.getContractFactory("RewardsBasedTopNPoolsStrategy");
    const deployedTopNStrategy = await simpleTopNStrat.deploy(voterV3Address, {
      gasLimit: 21000000
    });
    await deployedTopNStrategy.deployed();
    console.log("deployed top n start: ", deployedTopNStrategy.address)
    const voteWgtStrategy = await ethers.getContractFactory("VoteWeightStrategy");
    const deployVoteWgtStrat = await voteWgtStrategy.deploy();
    await deployVoteWgtStrat.deployed();
    generateConstantFile("SimpleTopNPoolsStrategy", deployedTopNStrategy.address)
    generateConstantFile("VoteWeightStrategy", deployVoteWgtStrat.address)
    console.log('deploying AVM...')
    input = [voterV3Address,
        votingEscrowAddress,
        minterUpgradeableAddress, 
        rewardsDistributorAddress,
      deployedTopNStrategy.address,
    deployVoteWgtStrat.address]
    const avmContract = await upgrades.deployProxy(data, input, {initializer: 'initialize'});
    txDeployed = await avmContract.deployed();
    console.log('deployed AVM v3: ', avmContract.address)
    const votingEscrow = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress);
    const settingAVM = await votingEscrow.setAVM(avmContract.address);
    await settingAVM.wait();
    const voter = await ethers.getContractAt(voterV3Abi, voterV3Address);
    const settingAVMInVoter = await voter.setAVM();
    await settingAVMInVoter.wait();
    const topNStrat = await ethers.getContractAt(simpleTopNPoolsStrategyAbi, deployedTopNStrategy.address)
    const avmTX = await topNStrat.setAVM(avmContract.address);
    await avmTX.wait();
    // const votewgtstrat = await ethers.getContractAt(voteWeightStrategyAbi, voteWeightStrategyAddress);
    // await votewgtstrat.
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

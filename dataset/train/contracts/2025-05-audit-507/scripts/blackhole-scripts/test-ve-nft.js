const { ethers } = require("hardhat")
const { voterV3Address, voterV3Abi } = require("../../generated/voter-v3");
const { votingEscrowAddress, votingEscrowAbi } = require("../../generated/voting-escrow");
const { minterUpgradeableAddress } = require("../../generated/minter-upgradeable");
const { rewardsDistributorAddress } = require("../../generated/rewards-distributor");

const { gaugeFactoryAddress } = require("../../generated/gauge-factory");
const { automatedVotingManagerAddress, automatedVotingManagerAbi } = require("../../generated/automated-voting-manager");
const { veNFTAPIAbi, veNFTAPIAddress } = require("../../generated/ve-nftapi");
const { avmAbi } = require("../../generated/avm");
const { generateConstantFile } = require("./postDeployment/generator");

async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0] 
    data = await ethers.getContractFactory("veNFTAPI");
    input = [
        voterV3Address,
        rewardsDistributorAddress,
        gaugeFactoryAddress,
        automatedVotingManagerAddress
    ]
    // function initialize(address _voter, address _rewarddistro, address _gaugeFactory, address _avm) 
    const veNFTDeployment = await upgrades.deployProxy(data, input, {initializer: 'initialize'});
    txDeployed = await veNFTDeployment.deployed();

    const veNFT = await ethers.getContractAt(veNFTAPIAbi, veNFTDeployment.address);
    // const setAVMTx = await veNFT.setAVM(automatedVotingManagerAddress)
    // await setAVMTx.wait();
    console.log("EREREerd", owner.address)
    console.log("shoudl be avm", await veNFT.avm());
    const avmAddr = await veNFT.avm();
    const avm = await ethers.getContractAt(automatedVotingManagerAbi, avmAddr);
    console.log("amv", await avm.tokenIdsLength());
    const fetchLocks = await veNFT.getAVMNFTFromAddress(owner.address);
    generateConstantFile("veNFTAPI", veNFT.address);
    console.log("fetch locks", fetchLocks)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

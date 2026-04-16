const { voterV3Address, voterV3Abi } = require("../../../../generated/voter-v3");
const { votingEscrowAddress, votingEscrowAbi } = require("../../../../generated/voting-escrow");
const { rewardsDistributorAddress, rewardsDistributorAbi } = require("../../../../generated/rewards-distributor");
const { generateConstantFile } = require("../../../blackhole-scripts/postDeployment/generator");
const { gaugeManagerAddress, gaugeManagerAbi } = require("../../../../generated/gauge-manager");
const { autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress } = require("../../../../generated/auto-voting-escrow-manager");
const { veNFTAPIAbi, veNFTAPIAddress } = require("../../../../generated/ve-nftapi");

const deployTopNStrategy = async (voterV3Address, autoVotingEscrowManagerAddress) => {
    try {
        console.log("entered simple to pn strat deployment fn")
        const simpleTopNStrat = await ethers.getContractFactory("SetterTopNPoolsStrategy");
        console.log("found!")
        const deployedTopNStrategy = await simpleTopNStrat.deploy(voterV3Address, autoVotingEscrowManagerAddress, {
            gasLimit: 15000000
        });
        await deployedTopNStrategy.deployed();
        console.log("deployed top n start: ", deployedTopNStrategy.address)
        generateConstantFile("SetterTopNPoolsStrategy", deployedTopNStrategy.address)
        return deployedTopNStrategy.address;
    } catch (err) {
        console.log("error in deploying top n strategy", err)
        process.exit(1);
    }
}

const deployVoteWeightStrategy = async (autoVotingEscrowAddress) => {
    try {
        const voteWgtStrategy = await ethers.getContractFactory("SetterVoteWeightStrategy");
        const deployVoteWgtStrat = await voteWgtStrategy.deploy(autoVotingEscrowAddress);
        await deployVoteWgtStrat.deployed();
        generateConstantFile("SetterVoteWeightStrategy", deployVoteWgtStrat.address)
        return deployVoteWgtStrat.address;
    } catch (err) {
        console.error("Error in deploying votewgtstrategy", err);
        process.exit(1);
    }
}

const deployAVM = async (voterV3Address, votingEscrowAddress, rewardsDistributorAddress) => {
    try {
        const data = await ethers.getContractFactory("AutoVotingEscrowManager");
        const accounts = await ethers.getSigners();
        const owner = accounts[0];
        // initialize(address _votingEscrow, address _voter, address _rewardsDistributor, address _topPoolsStrategy, address _voteWeightStrategy)
        const input = [
            votingEscrowAddress,
            voterV3Address,
            rewardsDistributorAddress
        ]
        const avmContract = await upgrades.deployProxy(data, input, {initializer: 'initialize'});
        txDeployed = await avmContract.deployed();
        console.log('deployed AutoVotingEscrowManager V1: ', avmContract.address)
        generateConstantFile("AutoVotingEscrowManager", avmContract.address);
        return avmContract.address;
    } catch (err) {
        console.error("Error in deploying avm", err);
        process.exit(1);
    }
}

const setAVMInVotingEscrow = async (veAddress, avmAddress) => {
    try {
        const votingEscrow = await ethers.getContractAt(votingEscrowAbi, veAddress);
        const settingAVMInVe = await votingEscrow.setAVM(avmAddress);
        await settingAVMInVe.wait();
    } catch (err) {
        console.error("erro in setting avm in ve", err);
        process.exit(1);
    }
}

const setAVMInVoter = async (voterAddress) => {
    try {
        const voter = await ethers.getContractAt(voterV3Abi, voterAddress);
        const settingAvmInVoter = await voter.setAVM();
        await settingAvmInVoter.wait();
    } catch (err) {
        console.error("Error in setting avm in voter", err);
        process.exit(1);
    }
}

const setTopNStrategyInAVM = async (topNStrategyAddress, avmAddress) => {
    try {
        const avm = await ethers.getContractAt(autoVotingEscrowManagerAbi, avmAddress);
        const settingAVMInTopNStrategy = await avm.setTopPoolsStrategy(topNStrategyAddress);
        await settingAVMInTopNStrategy.wait();
    } catch (err) {
        console.error("Error in setting avm in top n strategy", err);
        process.exit(1);
    }
}

const setVoteWgtStrategyInAVM = async (avmAddress, voteWgtStrategyAddress) => {
    try {
        const avm = await ethers.getContractAt(autoVotingEscrowManagerAbi, avmAddress);
        const settingAVMInVoteWgtStrategy = await avm.setVoteWeightStrategy(voteWgtStrategyAddress);
        await settingAVMInVoteWgtStrategy.wait();
    } catch (err) {
        console.error("Error in setting avm in top n strategy", err);
        process.exit(1);
    }
}

const setAVMInVeNFTAPI = async (veNFTAPIAddress, avmAddress) => {
    try {
        const veNFTAPI = await ethers.getContractAt(veNFTAPIAbi, veNFTAPIAddress);
        const settingAvmInVeNFTAPI = await veNFTAPI.setAVM(avmAddress);
        await settingAvmInVeNFTAPI.wait();
    } catch(err) {
        console.error("Error in setting avm in ve nft api", err);
        process.exit(1);
    }
}

const setTopNInAVM = async (topN, autoVotingEscrowManagerAddress) => {
    try {
        const avm = await ethers.getContractAt(autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress);
        const txForSettingTopN = await avm.setTopN(topN);
        await txForSettingTopN.wait();
        console.log("tx for setting top n...")
    } catch (err) {
        console.error("error in setting topn in avm tx: ", errr)
    }
} 

const setAVMInGaugeManager = async (avm, gaugeManager) => {
    const gaugeManagerContract = await ethers.getContractAt(gaugeManagerAbi, gaugeManager);
    const tx = await gaugeManagerContract.setAVM(avm);
    await tx.wait();
}

const setAVMInRewardsDistributor = async (avm, rewardsDistributor) => {
    console.log("rewardsDistributor: ", avm)
    const rewardsDistributorContract = await ethers.getContractAt(rewardsDistributorAbi, rewardsDistributor);
    console.log("owner: ", await rewardsDistributorContract.owner())
    const tx = await rewardsDistributorContract.setAVM(avm);
    await tx.wait();
}

async function main () {
    const deployedAVMAddress = await deployAVM(voterV3Address, votingEscrowAddress, rewardsDistributorAddress);
    
    const deployedVoteWeightStrategyAddress = await deployVoteWeightStrategy(deployedAVMAddress);
    const deployedTopNStrategyAddress = await deployTopNStrategy(voterV3Address, deployedAVMAddress);

    await setTopNStrategyInAVM(deployedTopNStrategyAddress, deployedAVMAddress);
    console.log("done setting avm in top n strat")
    await setVoteWgtStrategyInAVM(deployedAVMAddress, deployedVoteWeightStrategyAddress);
    console.log("done setting avm in vote wgt")

    await setTopNInAVM("5", deployedAVMAddress)

    await setAVMInVotingEscrow(votingEscrowAddress, deployedAVMAddress);
    console.log("done setting avm in voting escrow")
    await setAVMInVoter(voterV3Address);
    console.log("done setting avm in voter")
    // rewards distributor and gauge manager
    await setAVMInRewardsDistributor(deployedAVMAddress, rewardsDistributorAddress)
    console.log("RFWDSXfdsxz")
    await setAVMInGaugeManager(deployedAVMAddress, gaugeManagerAddress)
    await setAVMInVeNFTAPI(veNFTAPIAddress, deployedAVMAddress);
    console.log("done setting avm in ve nft api")

    generateConstantFile("AutoVotingEscrow", "")
}

main().then(() => console.log("Done!"))
    .catch((err) => console.error("err up in this thing: ", err));

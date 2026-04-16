const { ethers } = require("hardhat");
const { blackAddress } = require("../../../../generated/black");
const { ZERO_ADDRESS } = require("@openzeppelin/test-helpers/src/constants");
const { generateConstantFile } = require("../../../blackhole-scripts/postDeployment/generator");

const deployVotingBalanceLogic = async() => {
    const VotingBalanceLogic = await ethers.getContractFactory("VotingBalanceLogic");
    const votingBalanceLogic = await VotingBalanceLogic.deploy();
    await votingBalanceLogic.deployed();
    console.log("VotingBalanceLogic deployed at:", votingBalanceLogic.address);
    return votingBalanceLogic.address;
}

const deployVotingEscrow = async(blackAddress, votingBalanceLogicAddress) =>{
    try {
        const VeArtProxyUpgradeableContract = await ethers.getContractFactory("VeArtProxyUpgradeable");
        const veArtProxy = await upgrades.deployProxy(VeArtProxyUpgradeableContract,[], {initializer: 'initialize', timeout: 180000, pollingInterval: 3000});
        txDeployed = await veArtProxy.deployed();
        console.log("veArtProxy Address: ", veArtProxy.address)
        generateConstantFile("VeArtProxyUpgradeable", veArtProxy.address);

        const VotingEscrowContract = await ethers.getContractFactory("VotingEscrow", {
            libraries: {
                VotingBalanceLogic: votingBalanceLogicAddress,
            },
        });
        const veBlack = await VotingEscrowContract.deploy(blackAddress, veArtProxy.address, ZERO_ADDRESS);
        txDeployed = await veBlack.deployed();
        console.log("veBlack Address: ", veBlack.address);
        generateConstantFile("VotingEscrow", veBlack.address);
        return veBlack.address;
    } catch (error) {
        console.log("error in deploying deployVotingEscrow: ", error);
        process.exit(1);
    }
    
}

async function main () {
    const balanceLogicAddress = await deployVotingBalanceLogic();
    await deployVotingEscrow(blackAddress, balanceLogicAddress);
}

main().then(() => console.log("Done!"))
.catch(err => console.error("error in this: ", err));

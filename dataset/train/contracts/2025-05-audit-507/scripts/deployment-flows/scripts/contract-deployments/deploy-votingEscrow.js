const { ethers } = require("hardhat")

const { generateConstantFile } = require('../../../blackhole-scripts/postDeployment/generator');
const { ZERO_ADDRESS } = require("@openzeppelin/test-helpers/src/constants");
const deployedTokens = require('../../token-constants/deployed-tokens.json');

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
        const votingEscrow = await VotingEscrowContract.deploy(blackAddress, veArtProxy.address, ZERO_ADDRESS);
        txDeployed = await votingEscrow.deployed();
        console.log("votingEscrow Address: ", votingEscrow.address);
        generateConstantFile("VotingEscrow", votingEscrow.address);
        return votingEscrow.address;
    } catch (error) {
        console.log("error in deploying deployVotingEscrow: ", error);
        process.exit(1);
    }
}

const deployveNFT = async (votingEscrow) => {
    try {
        data = await ethers.getContractFactory("veNFTAPI");
        input = [votingEscrow] 
        const veNFTAPI = await upgrades.deployProxy(data, input, {initializer: 'initialize', timeout: 180000, pollingInterval: 3000});
        txDeployed = await veNFTAPI.deployed();

        console.log('deployed venftapi address: ', veNFTAPI.address);
        generateConstantFile("veNFTAPI", veNFTAPI.address);
    } catch (error) {
        console.log('deployed venftapi error ', error)
        process.exit(1);
    }
}
    



async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0];
    const ownerAddress = owner.address;

    const votingBalanceLogicAddress = await deployVotingBalanceLogic();
    console.log("votingBalanceLogicAddress ", votingBalanceLogicAddress)

    //deploy voting  escrow
    // const blackAddress = deployedTokens[0].address;
    const blackAddress = "0x43d105B33c415d703fFAdB2BB9c5064b01E7E098";
    const votingEscrowAddress = await deployVotingEscrow(blackAddress, votingBalanceLogicAddress);
    
    //deploy veNFT
    await deployveNFT(votingEscrowAddress); 
}

main()
  .then(
    () => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
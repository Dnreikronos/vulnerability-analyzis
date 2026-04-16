const { ethers } = require("hardhat");
const { epochControllerAbi, epochControllerAddress } = require("../../../../generated/epoch-controller");
const { minterUpgradeableAbi, minterUpgradeableAddress } = require("../../../../generated/minter-upgradeable");
const { voterV3Address, voterV3Abi } = require("../../../../generated/voter-v3");
const { genesisPoolManagerAbi, genesisPoolManagerAddress } = require("../../../../generated/genesis-pool-manager");
const { routerV2Address } = require("../../../../generated/router-v2");
const { permissionsRegistryAddress, permissionsRegistryAbi } = require("../../../../generated/permissions-registry");
const { pairFactoryAddress, pairFactoryAbi } = require("../../../../generated/pair-factory");
const { genesisPoolFactoryAddress, genesisPoolFactoryAbi } = require("../../../../generated/genesis-pool-factory");
const { generateConstantFile } = require("../../postDeployment/generator");
const { auctionFactoryAddress } = require("../../../../generated/auction-factory");
const { tokenHandlerAddress } = require("../../../../generated/token-handler");



const deployGenesisFactory = async (tokenHandlerAddress) => {
    try {
        data = await ethers.getContractFactory("GenesisPoolFactory");
        input = [tokenHandlerAddress] 
        const genesisFactory = await upgrades.deployProxy(data, input, {initializer: 'initialize', gasLimit:150000000});
        const txDeployed = await genesisFactory.deployed();

        console.log('deployed genesis factory address : ', genesisFactory.address);
        generateConstantFile("GenesisPoolFactory", genesisFactory.address);
        return genesisFactory.address;
    } catch (error) {
        console.log('deployed genesis factory address : ', error);
        process.exit(1);
    }
}

const setGenesisManagerInGenesisFactory = async (genesisFactoryAddress, genesisManagerAddress) => {
    try {
        const genesisFactoryContract = await ethers.getContractAt(genesisPoolFactoryAbi, genesisFactoryAddress);
        const genesisManagerSettingTx = await genesisFactoryContract.setGenesisManager(genesisManagerAddress);
        await genesisManagerSettingTx.wait();
        console.log("set genesis manager in genesis factory\n");
    } catch (error) {
        console.log("error genesis manager in genesis factory", error);
        process.exit(1);
    }
}

const setGenesisManagerRole = async (permissionRegistryAddress, genesisManagerAddress) => {
    const permissionRegistryContract = await ethers.getContractAt(permissionsRegistryAbi, permissionRegistryAddress);

    try {
        const setRoleTx = await permissionRegistryContract.setRoleFor(genesisManagerAddress, "GENESIS_MANAGER");
        await setRoleTx.wait(); // Wait for the transaction to be mined
        console.log('setRoleFor in permissionRegistry\n');
    } catch (err) {
        console.log('Error in setRoleFor in setting genesis manager role:', err);
        process.exit(1);
    }
};

const setGenesisPoolManagerInVoter = async(voterV3Address, genesisManagerAddress) => {
    try {
        const VoterContract = await ethers.getContractAt(voterV3Abi, voterV3Address);
        const genesisManagerTx = await VoterContract.setGenesisManager(genesisManagerAddress);
        await genesisManagerTx.wait();
        console.log("set genesis manager in voter\n");
    } catch (error) {
        console.log("error genesis manager in gvoter", error);
        process.exit(1);
    }
};

const setGenesisPoolManagerInPairFactory = async(pairFactoryAddress, genesisManagerAddress) => {
    try {
        const PairFactoryContract = await ethers.getContractAt(pairFactoryAbi, pairFactoryAddress);
        await PairFactoryContract.setGenesisManager(genesisManagerAddress);
        console.log("set genesis manager in pair factory\n");
    } catch (error) {
        console.log("error genesis manager in pair factory", error);
        process.exit(1);
    }
};

const deployFixedAuction = async () => {
    try {
        const fixedAuctionContract = await ethers.getContractFactory("FixedAuction");
        const fixedAuction = await fixedAuctionContract.deploy();
        const txDeployed = await fixedAuction.deployed();

        console.log("fixed auction address: ", fixedAuction.address)
        generateConstantFile("FixedAuction", fixedAuction.address);
        return fixedAuction.address;
    } catch (error) {
        console.log("error in deploying fixed aution : ", error);
        process.exit(1);
    }
}

async function fetchAllLiveNativeTokens(genesisManager) {
    const tokens = [];
    let index = 0;
  
    while (true) {
      try {
        const token = await genesisManager.liveNativeTokens(index);
        tokens.push(token);
        index++;
      } catch (error) {
        // This means no more tokens — we've hit an out-of-bounds index
        if (error.message.includes("invalid opcode") || error.message.includes("revert")) {
          break;
        } else {
          console.error("Unexpected error at index", index, ":", error);
          throw error; // Only throw on unexpected issues
        }
      }
    }
  
    return tokens;
  }
  const deployAuctionFacotry = async (fixedAuctionAddress) => {
    try {
        data = await ethers.getContractFactory("AuctionFactory");
        input = [fixedAuctionAddress] 
        const auctionFactory = await upgrades.deployProxy(data, input, {initializer: 'initialize', gasLimit:150000000});
        const txDeployed = await auctionFactory.deployed();

        console.log('deployed auction factory address : ', auctionFactory.address);
        generateConstantFile("AuctionFactory", auctionFactory.address);
        return auctionFactory.address;
    } catch (error) {
        console.log('deployed auction factory address : ', error);
        process.exit(1);
    }
}

const setGenesisPoolManagerInEpochController = async (epochControllerAddress, genesisManagerAddress) => {
    try {
        const EpochControllerContract = await ethers.getContractAt(epochControllerAbi, epochControllerAddress);
        await EpochControllerContract.setGenesisManager(genesisManagerAddress);
        console.log("set genesis manager in epoch controller\n");
    } catch (error) {
        console.log("error genesis manager in epoch controller", error);
        process.exit(1);
    }
}


async function main () {
    const epochController = await ethers.getContractAt(epochControllerAbi, epochControllerAddress);
    // console.log("check upkeep: ", await epochController.checkUpkeep("0x"));
    const minter = await ethers.getContractAt(minterUpgradeableAbi, minterUpgradeableAddress);
    console.log("active_period: ", await epochController.minter());
    const setMinterTx = await epochController.setMinter(minterUpgradeableAddress);
    await setMinterTx.wait();
    // // console.log("Rfdscxz")
    const setVoterTx = await epochController.setVoter(voterV3Address);
    await setVoterTx.wait();
    // console.log("thing: ", await genesisManager.liveNativeTokekns())

    console.log("y5hrgfdc")
    // console.log("genesisManager: ", await epochController.genesisManager())
    const tx1 = await setGenesisPoolManagerInEpochController(epochControllerAddress, genesisPoolManagerAddress);
    // const tx = await epochController.performUpkeep("0x");
    // await tx.wait();

    // const genesisFactory = await ethers.getContractAt(genesisPoolFactoryAbi, genesisPoolFactoryAddress);
    const genesisFactory = await deployGenesisFactory(tokenHandlerAddress);

    const data = await ethers.getContractFactory("GenesisPoolManager");
    const input = [epochControllerAddress, routerV2Address, permissionsRegistryAddress, voterV3Address, pairFactoryAddress, genesisFactory, auctionFactoryAddress, tokenHandlerAddress];
    const genesisManager = await upgrades.deployProxy(data, input, {initializer: 'initialize', gasLimit:150000000});
    const txDeployed = await genesisManager.deployed();
    generateConstantFile("GenesisPoolManager", genesisManager.address);

    await setGenesisManagerInGenesisFactory(genesisFactory, genesisManager.address);

    //assign genesisManager role of GENESIS_MANAGER
    await setGenesisManagerRole(permissionsRegistryAddress, genesisManager.address);

    //set genesisManager in VoterV3
    await setGenesisPoolManagerInVoter(voterV3Address, genesisManager.address);
    // deploy genesisFactory


    //set genesisManager in pairFactory
    await setGenesisPoolManagerInPairFactory(pairFactoryAddress, genesisManager.address);

    console.log("Genesis manager address : ", genesisManager.address)
    generateConstantFile("GenesisPoolManager", genesisManager.address);
    return genesisManager.address;
}

main().then(() => console.log("Done!"))
.catch(err => console.error("error is: ", err))


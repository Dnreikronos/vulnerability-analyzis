const { ethers } = require("hardhat")
const { bribeFactoryV3Abi } = require('./gaugeConstants/bribe-factory-v3')
const { permissionRegistryAbi } = require('./gaugeConstants/permissions-registry')
const { ZERO_ADDRESS } = require("@openzeppelin/test-helpers/src/constants.js");
const { blackHolePairApiV2Abi } = require('./pairApiConstants');
const { voterV3Abi } = require('./gaugeConstants/voter-v3')
const { minterUpgradableAbi } = require('./gaugeConstants/minter-upgradable')
const { blackAbi } = require('./gaugeConstants/black')
const { votingEscrowAbi } = require('./gaugeConstants/voting-escrow')
const { rewardsDistributorAbi, rewardsDistributorAddress } = require('./gaugeConstants/reward-distributor')
const { addLiquidity } = require('./addLiquidity')
const { BigNumber } = require("ethers");
const { pairFactoryAbi, tokenOne, tokenTwo, tokenThree, tokenFour, tokenFive, tokenSix, tokenSeven, tokenEight, tokenNine, tokenTen } = require("./dexAbi");
const { generateConstantFile } = require('./postDeployment/generator');

const deployBlack = async () =>{
    try {
        const blackContract = await ethers.getContractFactory("Black");
        const blackFactory = await blackContract.deploy();
        txDeployed = await blackFactory.deployed();
        console.log("blackFactory address ", blackFactory.address)
        return blackFactory.address;
    } catch (error) {
        console.log("error in deploying Black: ", error)
    }
}

const deployPairFactory = async () => {
    try {
        const pairFactoryContract = await ethers.getContractFactory("PairFactory");
        const pairFactory = await upgrades.deployProxy(pairFactoryContract,[],{initializer: 'initialize'});
        txDeployed = await pairFactory.deployed();
        console.log("pairFactory: ", pairFactory.address)
        generateConstantFile("PairFactory", pairFactory.address);
        return pairFactory.address;
    } catch (error) {
        console.log("error in deploying pairFactory: ", error)
    }
    
}

const deployRouterV2 = async(pairFactoryAddress) => {
    try {
        const wETH = '0x4200000000000000000000000000000000000006'
        const routerV2Contract = await ethers.getContractFactory("RouterV2");
        const routerV2 = await routerV2Contract.deploy(pairFactoryAddress, wETH);
        txDeployed = await routerV2.deployed();
        console.log("routerV2 address: ", routerV2.address)
        return routerV2.address;
    } catch (error) {
        console.log("error in deploying routerV2: ", error)
    }
    
}

const setDibs = async (pairFactoryAddress) =>{
   try {
        const owner = await ethers.getSigners();
        const PairFactoryContract = await ethers.getContractAt(pairFactoryAbi, pairFactoryAddress);
        const tx = await PairFactoryContract.setDibs(owner[0].address);
        await tx.wait();
   } catch (error) {
        console.log("error in setting dibs: ", error)
   }
}

const deployPermissionRegistry = async() =>{
    try {
        const permissionRegistryContract = await ethers.getContractFactory("PermissionsRegistry");
        const permissionsRegistry = await permissionRegistryContract.deploy();
        const txDeployed = await permissionsRegistry.deployed();
        console.log("permissionsRegistry: ", permissionsRegistry.address)
        return permissionsRegistry.address;
    } catch (error) {
        console.log("error in deploying permissionRegistry: ", error)
    }
}

const deployBloackholeV2Abi = async(voterV3Address)=>{
    try {
        const blackholePairAbiV2Contract = await ethers.getContractFactory("BlackholePairAPIV2");
        const input = [voterV3Address]
        const blackHolePairAPIV2Factory = await upgrades.deployProxy(blackholePairAbiV2Contract, input, {initializer: 'initialize'});
        txDeployed = await blackHolePairAPIV2Factory.deployed();
        console.log('BlackHolePairAPIV2Factory : ', blackHolePairAPIV2Factory.address)
        return blackHolePairAPIV2Factory.address;
    } catch (error) {
        console.log("error in deploying deployBloackholeV2Abi: ", error)
    }
}

const setPermissionRegistryRoles = async (permissionRegistryAddress, ownerAddress) => {
    const permissionRegistryContract = await ethers.getContractAt(permissionRegistryAbi, permissionRegistryAddress);
    const permissionRegistryRolesInStringFormat = await permissionRegistryContract.rolesToString();

    for (const element of permissionRegistryRolesInStringFormat) {
        try {
            const setRoleTx = await permissionRegistryContract.setRoleFor(ownerAddress, element, {
                gasLimit: 21000000,
            });
            await setRoleTx.wait(); // Wait for the transaction to be mined
        } catch (err) {
            console.log('Error in setRoleFor in permissionRegistry:', err);
        }
    }
};


const deployVotingEscrow = async(blackAddress) =>{
    try {
        const VeArtProxyUpgradeableContract = await ethers.getContractFactory("VeArtProxyUpgradeable");
        const veArtProxy = await upgrades.deployProxy(VeArtProxyUpgradeableContract,[], {initializer: 'initialize'});
        txDeployed = await veArtProxy.deployed();
        console.log("veArtProxy Address: ", veArtProxy.address)

        const VotingEscrowContract = await ethers.getContractFactory("VotingEscrow");
        const veBlack = await VotingEscrowContract.deploy(blackAddress, veArtProxy.address);
        txDeployed = await veBlack.deployed();
        console.log("veBlack Address: ", veBlack.address);
        return veBlack.address;
    } catch (error) {
        console.log("error in deploying veArtProxy: ", error)
    }
    
}

const deployVoterV3AndSetInit = async (votingEscrowAddress, permissionRegistryAddress, pairFactoryAddress, ownerAddress, bribeFactoryV3Address, gaugeV2Address) => {
    try {
        const voterV3ContractFactory = await ethers.getContractFactory("VoterV3");
        const inputs = [votingEscrowAddress, pairFactoryAddress , gaugeV2Address, bribeFactoryV3Address]
        const VoterV3 = await upgrades.deployProxy(voterV3ContractFactory, inputs, {initializer: 'initialize'});
        const txDeployed = await VoterV3.deployed();
        console.log('VoterV3 address: ', VoterV3.address)
        const listOfTokens = [tokenOne, tokenTwo, tokenThree, tokenFour, tokenFive, tokenSix, tokenSeven, tokenEight, tokenNine, tokenTen];
        const initializeVoter = await VoterV3._init(listOfTokens, permissionRegistryAddress, ownerAddress)
        return VoterV3.address;
    } catch (error) {
        console.log("error in deploying voterV3: ", error);
    }
    
}

const setVoterBribeV3 = async(voterV3Address, bribeFactoryV3Address) => {
    try {
        const bribeV3Contract = await ethers.getContractAt(bribeFactoryV3Abi, bribeFactoryV3Address);
        const createVoter = await bribeV3Contract.setVoter(voterV3Address);
    } catch (error) {
        console.log("error in setting voter in bribeV3: ", error);
    }
    
}

const deployRewardsDistributor = async(votingEscrowAddress) => {
    try {
        const rewardsDistributorContractFactory = await ethers.getContractFactory("RewardsDistributor");
        const rewardsDistributor = await rewardsDistributorContractFactory.deploy(votingEscrowAddress);
        const txDeployed = await rewardsDistributor.deployed();
        console.log('RewardsDistributor address: ', rewardsDistributor.address)
        return rewardsDistributor.address;
    } catch (error) {
        console.log("error in deploying rewardsDiastributer: ", error);
    }
    
}

const deployMinterUpgradeable = async(votingEscrowAddress, voterV3Address, rewardsDistributorAddress) => {
    try {
        const minterUpgradableContractFactory = await ethers.getContractFactory("MinterUpgradeable");
        const inputs = [voterV3Address, votingEscrowAddress, rewardsDistributorAddress]
        const minterUpgradeable = await upgrades.deployProxy(minterUpgradableContractFactory, inputs, {initializer: 'initialize'});
        const txDeployed = await minterUpgradeable.deployed();
        console.log('minterUpgradeable address: ', minterUpgradeable.address)
        return minterUpgradeable.address;
    } catch (error) {
        console.log("error in deploying minterUpgradeable: ", error);
    }
}

const createGauges = async(voterV3Address, blackholeV2AbiAddress) => {

    // creating gauge for pair bwn - token one and token two - basic volatile pool
    const blackHoleAllPairContract =  await ethers.getContractAt(blackHolePairApiV2Abi, blackholeV2AbiAddress);
    console.log("blackHoleAllPairContract fetched");
    const allPairs = await blackHoleAllPairContract.getAllPair(owner.address, BigInt(100), BigInt(0));
    console.log("All pairs fetched");
    const pairs = allPairs[2];

    const voterV3Contract = await ethers.getContractAt(voterV3Abi, voterV3Address);

    for(const p of pairs){
        const currentAddress = p[0];
        if(currentAddress === ZERO_ADDRESS)
            break;

        console.log("current pair ", currentAddress);
        const currentGaugeAddress = await voterV3Contract.gauges(currentAddress);
        console.log("currentGaugeAddress", currentGaugeAddress);
        if(currentGaugeAddress === ZERO_ADDRESS){
            const createGaugeTx = await voterV3Contract.createGauge(currentAddress, BigInt(0), {
                gasLimit: 21000000
            });
            console.log('createdgaugetx', createGaugeTx);
        }
    }
    console.log('done creation of gauge tx')
}

const deployBribeV3Factory = async (permissionRegistryAddress) => {
    try {
        const bribeContractFactory = await ethers.getContractFactory("BribeFactoryV3");
        const input = [ZERO_ADDRESS, permissionRegistryAddress]
        const BribeFactoryV3 = await upgrades.deployProxy(bribeContractFactory, input, {initializer: 'initialize'});
        const txDeployed = await BribeFactoryV3.deployed();
        console.log('deployed bribefactory v3: ', BribeFactoryV3.address)
        return BribeFactoryV3.address;
    } catch (error) {
        console.log("error in deploying bribeV3: ", error);
    }
}

const deployGaugeV2Factory = async (permissionRegistryAddress) => {
    try {
        const gaugeContractFactory = await ethers.getContractFactory("GaugeFactory");
        const input = [permissionRegistryAddress]
        const GaugeFactory = await upgrades.deployProxy(gaugeContractFactory, input, {initializer: 'initialize'});
        const txDeployed = await GaugeFactory.deployed();
        console.log('deployed GaugeFactory: ', GaugeFactory.address)
        return GaugeFactory.address
    } catch (error) {
        console.log("error in deploying gaugeV2: ", error)
    }
}

const setMinterUpgradableInVoterV3 = async(voterV3Address, minterUpgradableAddress)=>{
    const voterV3Contract = await ethers.getContractAt(voterV3Abi, voterV3Address);
    await voterV3Contract.setMinter(minterUpgradableAddress);
    console.log('set minter in voterV3Contract');
}

const setMinterInBlack = async(minterUpgradableAddress, blackAddress) => {
    const blackContract = await ethers.getContractAt(blackAbi, blackAddress);
    await blackContract.setMinter(minterUpgradableAddress);
    console.log('set minter in Black');
}

const setMinterInRewardDistributer = async(minterUpgradableAddress, rewardsDistributorAddress) => {
    const rewardDistributerContract = await ethers.getContractAt(rewardsDistributorAbi, rewardsDistributorAddress);
    await rewardDistributerContract.setDepositor(minterUpgradableAddress);
    console.log('set depositor in rewardDistributer');
}

const initializeMinter = async (minterUpgradableAddress) => {
    try {
        const minterContract = await ethers.getContractAt(minterUpgradableAbi, minterUpgradableAddress);
        const mintAmount = BigNumber.from("100000").mul(BigNumber.from("1000000000000000000"));
        console.log("mintAmount ", mintAmount)
        const initializingTx = await minterContract._initialize(
            [],
            [],
            mintAmount
        );
        await initializingTx.wait();
        console.log("Done initializing minter post deployment")
    } catch (error) {
        console.log("error in initializing black value ", error)
    }
}

const deployEpochController = async(voterV3Address, minterUpgradableAddress) =>{
    try {
        data = await ethers.getContractFactory("EpochController");
        const EpochController = await upgrades.deployProxy(data, [], {initializer: 'initialize'});
        txDeployed = await EpochController.deployed();
        console.log('deployed EpochController: ', EpochController.address);
        await EpochController.setVoter(voterV3Address);
        console.log('Voter set in EpochController');
        await EpochController.setMinter(minterUpgradableAddress);
        console.log('minter set in EpochController');
        chainlinkAutomationRegistryAddress = "0x91D4a4C3D448c7f3CB477332B1c7D420a5810aC3";
        await EpochController.setAutomationRegistry(chainlinkAutomationRegistryAddress);
        console.log('registry set in EpochController');
        return EpochController.address;
    } catch (error) {
        console.log("error in deploying EpochController: ", error)
    }
}

const addBlackToUserAddress = async (minterUpgradableAddress) => {
    try {
        const minterContract = await ethers.getContractAt(minterUpgradableAbi, minterUpgradableAddress);
        const amountAdd = BigNumber.from("5000").mul(BigNumber.from("1000000000000000000"));
        await minterContract.transfer("0xa7243fc6FB83b0490eBe957941a339be4Db11c29", amountAdd);
        console.log("transfer token successfully");
    } catch (error) {
        console.log("error in transfering token: ", error);
    }
    
}

const setVoterV3InVotingEscrow = async(voterV3Address, votingEscrowAddress) => {
    try {
        const VotingEscrowContract = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress);
        await VotingEscrowContract.setVoter(voterV3Address);
        console.log("set voterV3 in voting escrow");
    } catch (error) {
        console.log("error voterV3 in voting escrow", error);
    }
}

const deployveNFT = async (voterV3Address, rewardsDistributorAddress, blackholeV2AbiAddress) => {
    try {
        data = await ethers.getContractFactory("veNFTAPI");
        input = [voterV3Address, rewardsDistributorAddress, blackholeV2AbiAddress] // 
        veNFTAPI = await upgrades.deployProxy(data, input, {initializer: 'initialize'});
        txDeployed = await veNFTAPI.deployed();
        console.log('deployed venftapi address: ', veNFTAPI.address)
    } catch (error) {
        console.log('deployed venftapi error ', veNFTAPI.address)
    }
}

const pushDefaultRewardToken = async (bribeFactoryV3Address, blackAddress) => {
    const BribeFactoryV3Contract = await ethers.getContractAt(bribeFactoryV3Abi, bribeFactoryV3Address);
    await BribeFactoryV3Contract.pushDefaultRewardToken(blackAddress);
}

async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0];
    const ownerAddress = owner.address;

    //deploy Black token: Protocol Native token.
    const blackAddress = await deployBlack();

    //deploy pairFactory
    // PairFactory is responsible for creating new pair token with predefined stable/volatile pair trading Fees. 
    const pairFactoryAddress = await deployPairFactory();

    //deploy RouterV2
    // RouterV2 is resposible for Add/remove liquidity in LP pair, Swap, quoteLiquidity. 
    const routerV2Address = await deployRouterV2(pairFactoryAddress);

    //setDibs
    // A certain percentage of trading fee goes to platform, so setting that address here. (Not decided whether we're going with functionality or not.)
    await setDibs(pairFactoryAddress);

    //deploy permissionRegistry
    // Permission Registry to set GOVERNANCE, VOTER_ADMIN, GAUGE_ADMIN, BRIBE_ADMIN, FEE_MANAGER
    const permissionRegistryAddress = await deployPermissionRegistry();

    //deploy VeArtProxyUpgradeable: It's being used to provide tokenURI for each of veToken. 
    const votingEscrowAddress = await deployVotingEscrow(blackAddress);

    //set owner roles in permission registry
    // For now giving all above roles to owner.
    await setPermissionRegistryRoles(permissionRegistryAddress, ownerAddress);
    
    //deploy bribeV3
    // Bribe Contract is responsible for collecting external/internal bribe which will be available to voters in next epoch. 
    const bribeV3Address = await deployBribeV3Factory(permissionRegistryAddress);

    // deploygaugeV2
    // Gauges are responsible for black token emission. It has staked Pair token info and based onf the proportions emission get distributed.
    const gaugeV2Address = await deployGaugeV2Factory(permissionRegistryAddress);

    // //deploy voterV3 and initialize
    // VoterV3 is being used to createGauge/Vote/Claim Voting Reward
    // VoterV3 has voting info data
    const voterV3Address = await deployVoterV3AndSetInit(votingEscrowAddress, permissionRegistryAddress, pairFactoryAddress, ownerAddress, bribeV3Address, gaugeV2Address);

    //setVoter in bribe factory
    await setVoterBribeV3(voterV3Address, bribeV3Address);

    //blackholeV2Abi deployment
    // BlackholePair Api is being users has an interface which client uses to fetch all the lp pair info
    const blackholeV2AbiAddress = await deployBloackholeV2Abi(voterV3Address);

    //deploy rewardsDistributor
    // It's being used to distribute rebase reward
    const rewardsDistributorAddress = await deployRewardsDistributor(votingEscrowAddress);

    //set depositor

    //deploy minterUpgradable
    // MinterUpgradable calculates the number of black token needs for emission in upcoming epoch. 
    // It checks the current Black Token balance minterUpgradable address has, if it's not sufficient then it mints the required tokens.
    const minterUpgradableAddress = await deployMinterUpgradeable(votingEscrowAddress, voterV3Address, rewardsDistributorAddress);

    //set MinterUpgradable in VoterV3
    await setMinterUpgradableInVoterV3(voterV3Address, minterUpgradableAddress);

    //set minter in black
    await setMinterInBlack(minterUpgradableAddress, blackAddress);

    // call _initialize
    await initializeMinter(minterUpgradableAddress);

    //set minter in reward distributer in depositer
    await setMinterInRewardDistributer(minterUpgradableAddress, rewardsDistributorAddress); //set as depositor

    // deploy epoch controller here.
    const epochControllerAddress = await deployEpochController(voterV3Address, minterUpgradableAddress);

    //add black to user Address
    await addBlackToUserAddress(minterUpgradableAddress);

    //deploy veNFT
    await deployveNFT(voterV3Address, rewardsDistributorAddress, blackholeV2AbiAddress);

    //set voterV3 in voting escrow
    await setVoterV3InVotingEscrow(voterV3Address, votingEscrowAddress);

    //createPairs two by default
    await addLiquidity(routerV2Address, tokenOne, tokenTwo);
    await addLiquidity(routerV2Address, tokenTwo, tokenThree);
    await addLiquidity(routerV2Address, tokenFour, tokenSeven);

    //create Gauges
    await createGauges(voterV3Address, blackholeV2AbiAddress);

    await pushDefaultRewardToken(bribeV3Address, blackAddress);
}

main()
  .then(
    () => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});

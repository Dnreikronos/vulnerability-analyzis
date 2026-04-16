const { ethers } = require("hardhat")
const { run } = require("hardhat");

const { bribeFactoryV3Abi, bribeFactoryV3Address, bribeFactoryV3Version} = require('../../../../generated/bribe-factory-v3')
const { tokenHandlerAddress, tokenHandlerVersion, tokenHandlerAbi} = require("../../../../generated/token-handler");
const { permissionsRegistryAbi, permissionsRegistryAddress, permissionsRegistryVersion} = require('../../../../generated/permissions-registry')
const { ZERO_ADDRESS } = require("@openzeppelin/test-helpers/src/constants.js");
const { blackholePairAPIV2Abi, blackholePairAPIV2Version, blackholePairAPIV2Address} = require('../../../../generated/blackhole-pair-apiv2');
const { voterV3Abi, voterV3Version, voterV3Address} = require('../../../../generated/voter-v3');
const { minterUpgradeableAbi, minterUpgradeableVersion, minterUpgradeableAddress} = require('../../../../generated/minter-upgradeable');
const { epochControllerAbi, epochControllerAddress, epochControllerVersion} = require('../../../../generated/epoch-controller')
const { blackAbi } = require('../../../blackhole-scripts/gaugeConstants/black')
const { votingEscrowAbi, votingEscrowVersion, votingEscrowAddress} = require('../../../../generated/voting-escrow');
const { gaugeManagerAbi, gaugeManagerVersion, gaugeManagerAddress} = require('../../../../generated/gauge-manager');
const { rewardsDistributorAbi, rewardsDistributorVersion, rewardsDistributorAddress} = require('../../../../generated/rewards-distributor');
const { pairFactoryAbi, pairFactoryVersion, pairFactoryAddress} = require('../../../../generated/pair-factory');
const { gaugeFactoryCLAbi, gaugeFactoryCLVersion, gaugeFactoryCLAddress} = require('../../../../generated/gauge-factory-cl');
const { genesisPoolFactoryAbi, genesisPoolFactoryVersion, genesisPoolFactoryAddress} = require('../../../../generated/genesis-pool-factory');
const { algebraPoolAPIStorageVersion, algebraPoolAPIStorageAddress} = require('../../../../generated/algebra-pool-apistorage');
const { addLiquidity } = require('../../../blackhole-scripts/addLiquidity')
const { BigNumber } = require("ethers");
const { algebraFactory, nonfungiblePositionManager, swapRouter, quoterV2, farmingCenter, algebraEternalFarming } = require("../contract-deployments/algebra-addresses")
const { algebraFactoryAbi} = require("../../../../generated/algebra-factory");
const { contracts} = require("../../../../deployments/custom-pool-deployers.json")
const { algebraEternalFarmingAbi } = require("../../../../generated/algebra-eternal-farming");

const { generateConstantFile } = require('../../../blackhole-scripts/postDeployment/generator');
const fs = require('fs');
const path = require('path');

// Load the JSON file
const jsonFilePath = path.join(__dirname, '../../token-constants/deploying-tokens.json'); // Adjust the path
const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
// Extract addresses
const addresses = jsonData.map(obj => obj.address);

const deployedTokens = require('../../token-constants/deployed-tokens.json');
const { routerV2Abi, routerV2Address, routerV2Version} = require("../../../../generated/router-v2");
const {pairGeneratorVersion, pairGeneratorAddress} = require("../../../../generated/pair-generator");
const {gaugeFactoryVersion, gaugeFactoryAddress} = require("../../../../generated/gauge-factory");
const {voterFactoryLibVersion, voterFactoryLibAddress} = require("../../../../generated/voter-factory-lib");
const {algebraPoolAPIVersion, algebraPoolAPIAddress} = require("../../../../generated/algebra-pool-api");
const {veNFTAPIVersion, veNFTAPIAddress} = require("../../../../generated/ve-nftapi");
const {blackClaimsVersion, blackClaimsAddress} = require("../../../../generated/black-claims");
const {fixedAuctionVersion, fixedAuctionAddress} = require("../../../../generated/fixed-auction");
const {auctionFactoryVersion, auctionFactoryAddress} = require("../../../../generated/auction-factory");
const {genesisPoolManagerVersion, genesisPoolManagerAddress} = require("../../../../generated/genesis-pool-manager");
const {genesisPoolAPIVersion, genesisPoolAPIAddress} = require("../../../../generated/genesis-pool-api");
const {tokenAPIVersion, tokenAPIAddress} = require("../../../../generated/token-api");
const {veArtProxyUpgradeableVersion, veArtProxyUpgradeableAddress} = require("../../../../generated/ve-art-proxy-upgradeable");
const {votingBalancingLogicVersion, votingBalancingLogicAddress} = require("../../../../generated/voting-balancing-logic");
const blackAddress = deployedTokens[0].address;
const wETH = '0xb3B3CbEd8243682845C2ff23Ea1FD48e6144E34F'; //TODO::SREDDY
console.log("Extracted Addresses: ", addresses);

const retryCount = 1;
const verifyContracts = false;
let noCompile = true;


const statusFile = path.resolve(__dirname, "../../../../generated/deploymentStatus.json");

const deploymentVersion = process.env.DEPLOYMENT_VERSION;
const env = process.env.ENV_NET;
const network = process.env.NETWORK;

// Load status from file or initialize
let status = {};
if (fs.existsSync(statusFile)) {
    status = JSON.parse(fs.readFileSync(statusFile, 'utf8'));
} else {
    status = {
    };
}

async function verifyStep(name, fn) {
    if (verifyContracts) {

        if ((status[name] || 0) < deploymentVersion) {
            console.log(`Running step: ${name}`);
            await fn();
            status[name] = deploymentVersion;
            fs.writeFileSync(statusFile, JSON.stringify(status, null, 2));
            console.log(`Step complete: ${name}`);
        } else {
            console.log(`Skipping ${name}, already completed at version ${status[name]}`);
        }
    }
    else {
        console.log(`Skipping ${name}, as verification is disabled`);
    }
}

async function runStep(name, fn) {
    if ((status[name] || 0) < deploymentVersion) {
        console.log(`Running step: ${name}`);
        await fn();
        status[name] = deploymentVersion;
        fs.writeFileSync(statusFile, JSON.stringify(status, null, 2));
        console.log(`Step complete: ${name}`);
    } else {
        console.log(`Skipping ${name}, already completed at version ${status[name]}`);
    }
}


const verifyContractProxy = async(contractName, contractAddress, constructorArgs = []) => {
    try {
        const implAddress = await upgrades.erc1967.getImplementationAddress(contractAddress);
        console.log("Implementation address:", implAddress);

        await verifyContract(contractName, implAddress, constructorArgs);
    } catch (error) {
        // Hardhat verify throws if already verified or on error, handle gracefully
        if (
            error.message.toLowerCase().includes("already verified") ||
            error.message.toLowerCase().includes("already verified")
        ) {
            console.log(`ℹ️ Contract ${contractName} is already verified.`);
        } else {
            console.error(`❌ Verification failed for ${contractName}:`, error.message);
            process.exit(1);
        }
    }
}

const verifyContract = async(contractName, contractAddress, constructorArgs = []) => {
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: constructorArgs,
            noCompile: noCompile,
        });
        console.log(`✅ Verification successful for ${contractName}!`);
        noCompile = true;
    } catch (error) {
        // Hardhat verify throws if already verified or on error, handle gracefully
        if (
            error.message.toLowerCase().includes("already verified") ||
            error.message.toLowerCase().includes("already verified")
        ) {
            console.log(`ℹ️ Contract ${contractName} is already verified.`);
        } else {
            console.error(`❌ Verification failed for ${contractName}:`, error.message);
            process.exit(1);
        }
    }
}


const deployPermissionRegistry = async() =>{
    try {
        return await deployPermissionRegistry_(retryCount);
    }
    catch (error) {
        console.log("error in deploying permissionRegistry: ", error)
        process.exit(1);
    }
}
const deployPermissionRegistry_ = async(retries) =>{
    try {
        const permissionRegistryContract = await ethers.getContractFactory("PermissionsRegistry");
        const permissionsRegistry = await permissionRegistryContract.deploy();
        const txDeployed = await permissionsRegistry.deployed();
        console.log("permissionsRegistry: ", permissionsRegistry.address)
        generateConstantFile("PermissionsRegistry", permissionsRegistry.address);
        return permissionsRegistry.address;
    } catch (error) {
        if (retries > 0) {
            return await deployPermissionRegistry_(retries -1);
        }
        throw error;
    }
}

const setPermissionRegistryRoles = async (permissionRegistryAddress, ownerAddress) => {
    try {
        await setPermissionRegistryRoles_(permissionRegistryAddress, ownerAddress, retryCount);
        return;
    }
    catch (err) {
        console.log('Error in setRoleFor in permissionRegistry:', err);
        process.exit(1);
    }
}

const setPermissionRegistryRoles_ = async (permissionRegistryAddress, ownerAddress, retries) => {
    const permissionRegistryContract = await ethers.getContractAt(permissionsRegistryAbi, permissionRegistryAddress);
    const permissionRegistryRolesInStringFormat = await permissionRegistryContract.rolesToString();

    let gasPrice = await ethers.provider.getGasPrice(); // Get current network gas price
    const gasBump = ethers.utils.parseUnits("2", "gwei"); // Increase each time to avoid "replacement fee too low"

    for (const element of permissionRegistryRolesInStringFormat) {
        try {
            const setRoleTx = await permissionRegistryContract.setRoleFor(ownerAddress, element);
            await setRoleTx.wait(); // Wait for the transaction to be mined
            console.log(`Role ${ownerAddress} = ${element}`);

            // Bump the gas price slightly for the next transaction
            gasPrice = gasPrice.add(gasBump);

        } catch (err) {
            if (retries > 0) {
                await setPermissionRegistryRoles_(permissionRegistryAddress, ownerAddress, retries -1);
                return;
            }
            throw err;
        }
    }
};


const deployTokenHanlder = async (permissionRegistryAddress) => {
    try {
        return await deployTokenHanlder_(permissionRegistryAddress, retryCount);
    }
    catch (error) {
        console.log("error in deploying token handler: ", error)
        process.exit(1);
    }
}

const deployTokenHanlder_ = async (permissionRegistryAddress, retries) => {
    try {
        const tokenHandlerContract = await ethers.getContractFactory("TokenHandler");
        const tokenHandler = await tokenHandlerContract.deploy(permissionRegistryAddress);
        const txDeployed = await tokenHandler.deployed();

        console.log("\ntoken handler address : ", tokenHandler.address)
        generateConstantFile("TokenHandler", tokenHandler.address);

        return tokenHandler.address;
    } catch (error) {
        if (retries > 0) {
            return await deployTokenHanlder_(permissionRegistryAddress, retries - 1);
        }
        throw error;
    }
}

const setWhitelistedTokens = async (tokenHandlerAddress) => {
    const defaultTokens = deployedTokens.map(obj => obj.address);
    const whitelistTokens = [...defaultTokens, ...addresses];
    try {
        const tokenHandler = await ethers.getContractAt(tokenHandlerAbi, tokenHandlerAddress);
        await tokenHandler.whitelistTokens(whitelistTokens);
        // what about connector 
        console.log("set whitelisted tokens in token handler");
    }
    catch (err) {
        console.log('Error in set whitelistedToken in tokenHandler:', err);
        process.exit(1);
    }
}

const setConnectorTokens = async (tokenHandlerAddress) => {
    const defaultTokens = deployedTokens.map(obj => obj.address);
    const connectorTokens = [...defaultTokens, addresses[0], addresses[1], addresses[5]];

    try {
        const tokenHandler = await ethers.getContractAt(tokenHandlerAbi, tokenHandlerAddress);
        await tokenHandler.whitelistConnectors(connectorTokens);
        console.log("set connector tokens in token handler\n");
    }
    catch (err) {
        console.log('Error in set ConnectorTokens in tokenHandler:', err);
        process.exit(1);
    }
}

const deployPairGenerator = async () => {
    try {
        return await deployPairGenerator_(retryCount);
    }
    catch (error) {
        console.log("error in deploying pairGenerator: ", error);
        process.exit(1);
    }
}

const deployPairGenerator_ = async (retries) => {
    try {
        const pairGeneratorContract = await ethers.getContractFactory("PairGenerator");
        const pairGenerator = await pairGeneratorContract.deploy();
        txDeployed = await pairGenerator.deployed();
        console.log("PairGenerator: ", pairGenerator.address)
        generateConstantFile("PairGenerator", pairGenerator.address);
        return pairGenerator.address;
    } catch (error) {
        if (retries > 1) {
            return await deployPairGenerator_(retries-1);
        }
        throw error;
    }
}

const deployPairFactory = async (pairGeneratorAddress) => {
    try {
        return await deployPairFactory_(pairGeneratorAddress, retryCount);
    }
    catch (error) {
        console.log("error in deploying pairFactory: ", error)
        process.exit(1);
    }
}

const deployPairFactory_ = async (pairGeneratorAddress, retries) => {
    try {
        const pairFactoryContract = await ethers.getContractFactory("PairFactory");
        const inputs = [pairGeneratorAddress];
        const pairFactory = await upgrades.deployProxy(pairFactoryContract,inputs,{initializer: 'initialize', timeout: 180000, pollingInterval: 3000});
        txDeployed = await pairFactory.deployed();
        console.log("pairFactory: ", pairFactory.address)
        generateConstantFile("PairFactory", pairFactory.address);
        return pairFactory.address;
    } catch (error) {
        if (retries > 1) {
            return await deployPairFactory_(pairGeneratorAddress, retries-1);
        }
        throw error;
    }

}

const deployRouterV2 = async(pairFactoryAddress, algebraPoolApiStorageAddress) => {
    try {
        return await deployRouterV2_(pairFactoryAddress, algebraPoolApiStorageAddress,  retryCount);
    }
    catch (error) {
        console.log("error in deploying routerV2: ", error)
        process.exit(1);
    }
}
const deployRouterV2_ = async(pairFactoryAddress, algebraPoolApiStorageAddress, retries) => {
    try {
        const routerV2Contract = await ethers.getContractFactory("RouterV2");
        const routerV2 = await routerV2Contract.deploy(pairFactoryAddress, wETH, swapRouter, algebraFactory, quoterV2, algebraPoolApiStorageAddress);
        txDeployed = await routerV2.deployed();
        console.log("routerV2 address: ", routerV2.address)
        generateConstantFile("RouterV2", routerV2.address);
        return routerV2.address;
    } catch (error) {
        if (retries > 1) {
            return await deployRouterV2_(pairFactoryAddress, algebraPoolApiStorageAddress,  retries-1);
        }
        throw error;
    }

}

const setDibs = async (pairFactoryAddress) =>{
    try {
        await setDibs_(pairFactoryAddress, retryCount);
        return;
    }
    catch (error) {
        console.log("error in setting dibs: ", error)
        process.exit(1);
    }
}

const setDibs_ = async (pairFactoryAddress, retries) =>{
    try {
        const owner = await ethers.getSigners();
        const PairFactoryContract = await ethers.getContractAt(pairFactoryAbi, pairFactoryAddress);
        const tx = await PairFactoryContract.setDibs(owner[0].address);
        await tx.wait();
        console.log("setDibs\n");
    } catch (error) {
        if (retries > 1) {
            await setDibs_(pairFactoryAddress, retries-1);
            return;
        }
        throw error;

    }
}

const setDibsInGaugeCLFactory = async (gaugeFactoryCLAddress) => {
    try {
        await setDibsInGaugeCLFactory_(gaugeFactoryCLAddress, retryCount);
        return;
    }
    catch (error) {
        console.log("error in setting dibs: ", error)
        process.exit(1);
    }
}
const setDibsInGaugeCLFactory_ = async (gaugeFactoryCLAddress, retries) => {
    try {
        const owner = await ethers.getSigners();
        const GaugeFactoryCLContract = await ethers.getContractAt(gaugeFactoryCLAbi, gaugeFactoryCLAddress);
        const tx = await GaugeFactoryCLContract.setDibs(owner[0].address);
        await tx.wait();
        console.log("setDibs in GaugeFactory");
    } catch (error) {
        if (retries > 1) {
            await setDibsInGaugeCLFactory_(gaugeFactoryCLAddress, retries-1);
            return;
        }
        throw error;

    }
}

const setReferralFeeInGaugeCLFactory = async (gaugeFactoryCLAddress) => {
    try {
        const GaugeFactoryCLContract = await ethers.getContractAt(gaugeFactoryCLAbi, gaugeFactoryCLAddress);
        const tx = await GaugeFactoryCLContract.setReferralFee(500);
        await tx.wait();
        console.log("setReferral in GaugeFactory");
    } catch (error) {
        console.log("error in setting dibs: ", error)
        process.exit(1);
    }
}

const setIncentiveMarkerRole = async (gaugeFactoryCLAddress) => {
    const algebraFactoryContract = await ethers.getContractAt(algebraFactoryAbi, algebraFactory);
        
    const algebraEternalFarmingContract = await ethers.getContractAt(algebraEternalFarmingAbi, algebraEternalFarming);

    const INCENTIVE_MAKER_ROLE = await algebraEternalFarmingContract.INCENTIVE_MAKER_ROLE();

    const tx1 = await algebraFactoryContract.grantRole(INCENTIVE_MAKER_ROLE, gaugeFactoryCLAddress);
    await tx1.wait();
}

const setFarmingParamGaugeManager = async (gaugeManagerAddress) => {
    const GaugeManagerContract = await ethers.getContractAt(gaugeManagerAbi, gaugeManagerAddress);
    const tx = await GaugeManagerContract.setFarmingParam(farmingCenter, algebraEternalFarming, nonfungiblePositionManager);
    await tx.wait();
    console.log("setFarming successful");
}

const setCommunityFeeWithdraw = async (gaugeManagerAddress) => {
    const algebraFactoryContract = await ethers.getContractAt(algebraFactoryAbi, algebraFactory);
    const gaugeManagerContract = await ethers.getContractAt(gaugeManagerAbi, gaugeManagerAddress);

    const COMMUNITY_FEE_WITHDRAWER_ROLE = await gaugeManagerContract.COMMUNITY_FEE_WITHDRAWER_ROLE();
    const COMMUNITY_FEE_VAULT_ADMINISTRATOR = await gaugeManagerContract.COMMUNITY_FEE_VAULT_ADMINISTRATOR();

    const tx = await algebraFactoryContract.grantRole(COMMUNITY_FEE_WITHDRAWER_ROLE, gaugeManagerAddress);
    await tx.wait();

    const tx1 = await algebraFactoryContract.grantRole(COMMUNITY_FEE_VAULT_ADMINISTRATOR, gaugeManagerAddress);
    await tx1.wait();
    for (const address of Object.values(contracts)) {
        console.log(address);
        const tx2 = await algebraFactoryContract.grantRole(COMMUNITY_FEE_VAULT_ADMINISTRATOR, address);
        await tx2.wait();
    }
    console.log("setCommunityFeeWithdraw success");
}

const setDibsPercentageInGaugeCLFactory = async (gaugeFactoryCLAddress) => {
    try {
        const owner = await ethers.getSigners();
        const GaugeFactoryCLContract = await ethers.getContractAt(gaugeFactoryCLAbi, gaugeFactoryCLAddress);
        const tx = await GaugeFactoryCLContract.setReferralFee(500);
        await tx.wait();
        console.log("set Referral Fee In GagueFactory");
    } catch (error) {
        console.log("error in setting Referral Fee: ", error)
        process.exit(1);
    }
}

const transferBlackToGaugeFactoryCL = async(gaugeFactoryCLAddress) => {
    const blackContract = await ethers.getContractAt(blackAbi, blackAddress);
    const tranferAmount = (BigInt("2") * BigInt(10 ** 18)).toString();
    const tx = await blackContract.transfer(gaugeFactoryCLAddress, tranferAmount);
    await tx.wait();
    console.log('transferred Black to GaugeFactoryCL\n');
}

const deployBloackholeV2Abi = async(voterV3Address, routerV2Address, gaugeManagerAddress, pairFactoryAddress, algebraPoolApiStorageAddress)=>{
    try {
        return await deployBloackholeV2Abi_(voterV3Address, routerV2Address, gaugeManagerAddress, pairFactoryAddress, algebraPoolApiStorageAddress, retryCount);
    }
    catch (error) {
        console.log("error in deploying deployBloackholeV2Abi: ", error);
        process.exit(1);
    }
}
const deployBloackholeV2Abi_ = async(voterV3Address, routerV2Address, gaugeManagerAddress, pairFactoryAddress, algebraPoolApiStorageAddress, retries)=>{
    try {
        const blackholePairAbiV2Contract = await ethers.getContractFactory("BlackholePairAPIV2");
        const input = [voterV3Address, routerV2Address, gaugeManagerAddress, pairFactoryAddress, algebraFactory, quoterV2, algebraPoolApiStorageAddress]
        const blackHolePairAPIV2Factory = await upgrades.deployProxy(blackholePairAbiV2Contract, input, {initializer: 'initialize', timeout: 180000, pollingInterval: 3000});
        txDeployed = await blackHolePairAPIV2Factory.deployed();
        console.log('BlackHolePairAPIV2Factory : ', blackHolePairAPIV2Factory.address)
        generateConstantFile("BlackholePairAPIV2", blackHolePairAPIV2Factory.address);
        return blackHolePairAPIV2Factory.address;
    } catch (error) {
        if (retries > 1) {
            return await deployBloackholeV2Abi_(voterV3Address, routerV2Address, gaugeManagerAddress, pairFactoryAddress, algebraPoolApiStorageAddress, retries-1);
        }
        throw error;

    }
}

const deployAlgebraPoolAbi = async(voterV3Address, gaugeManagerAddress)=>{
    try {
        return await deployAlgebraPoolAbi_(voterV3Address, gaugeManagerAddress, retryCount);
    }
    catch (error) {
        console.log("error in deploying algebraPoolAPI: ", error);
        process.exit(1);
    }
}

const deployAlgebraPoolAPIStorage = async(permissionsRegistryAddress)=>{
    try {
        return await deployAlgebraPoolAPIStorage_(permissionsRegistryAddress, retryCount);
    }
    catch (error) {
        console.log("error in deploying algebraPoolAPIStorage: ", error);
        process.exit(1);
    }
}

const deployAlgebraPoolAPIStorage_ = async(permissionsRegistryAddress, retries)=>{
    try {
        const algebraPoolAPIStorageContract = await ethers.getContractFactory("AlgebraPoolAPIStorage");
        const input = [algebraFactory, permissionsRegistryAddress]
        const algebraPoolAPIStorage = await upgrades.deployProxy(algebraPoolAPIStorageContract, input, {initializer: 'initialize', timeout: 180000, pollingInterval: 3000});
        txDeployed = await algebraPoolAPIStorage.deployed();
        console.log('algebraPoolAPIStorage : ', algebraPoolAPIStorage.address)
        generateConstantFile("AlgebraPoolAPIStorage", algebraPoolAPIStorage.address);
        return algebraPoolAPIStorage.address;
    } catch (error) {
        if (retries > 1) {
            return await deployAlgebraPoolAPIStorage_(retries-1);
        }
        throw error;
    }
}

const deployAlgebraPoolAbi_ = async(voterV3Address, gaugeManagerAddress, retries)=>{
    try {
        const algebraPoolAPIContract = await ethers.getContractFactory("AlgebraPoolAPI");
        const input = [voterV3Address, algebraFactory, nonfungiblePositionManager, gaugeManagerAddress]
        const algebraPoolAPI = await upgrades.deployProxy(algebraPoolAPIContract, input, {initializer: 'initialize', timeout: 180000, pollingInterval: 3000});
        txDeployed = await algebraPoolAPI.deployed();
        console.log('algebraPoolAPI : ', algebraPoolAPI.address)
        generateConstantFile("AlgebraPoolAPI", algebraPoolAPI.address);
        return algebraPoolAPI.address;
    } catch (error) {
        if (retries > 1) {
            return await deployAlgebraPoolAbi_(voterV3Address, gaugeManagerAddress, retries-1);
        }
        throw error;
    }
}

const setAlgebraPoolApiInGaugeFactoryCL = async (algebraPoolApiStorageAddress, gaugeFactoryCLAddress) =>{
    const GaugeFactoryCLContract = await ethers.getContractAt(gaugeFactoryCLAbi, gaugeFactoryCLAddress);
    const tx = await GaugeFactoryCLContract.setAlgebraPoolApi(algebraPoolApiStorageAddress);
    await tx.wait();
    console.log("Set AlgebraPoolApi in GaugeCL");
}

const deployVotingBalanceLogic = async() => {
    try {
        return await deployVotingBalanceLogic_(retryCount);
    }
    catch (error) {
        console.log("error in deploying votingBalanceLogic: ", error);
        process.exit(1);
    }
}
const deployVotingBalanceLogic_ = async(retries) => {
    try {
        const VotingBalanceLogic = await ethers.getContractFactory("VotingBalanceLogic");
        const votingBalanceLogic = await VotingBalanceLogic.deploy();
        await votingBalanceLogic.deployed();
        console.log("VotingBalanceLogic deployed at:", votingBalanceLogic.address);
        generateConstantFile("VotingBalanceLogic", votingBalanceLogic.address);
        return votingBalanceLogic.address;
    }
    catch (error) {
        if (retries > 1) {
            return await deployVotingBalanceLogic_(retries-1);
        }
        throw error;
    }

}


const deployVotingEscrowArtproxyUpgradable = async() =>{
    try {
        return deployVotingEscrowArtproxyUpgradable_(retryCount);
    }
    catch (error) {
        console.log("error in deploying deployVotingEscrowArtproxyUpgradable: ", error);
        process.exit(1);
    }
}
const deployVotingEscrowArtproxyUpgradable_ = async(retries) =>{
    try {
        const VeArtProxyUpgradeableContract = await ethers.getContractFactory("VeArtProxyUpgradeable");
        const veArtProxy = await upgrades.deployProxy(VeArtProxyUpgradeableContract,[], {initializer: 'initialize', timeout: 180000, pollingInterval: 3000, gasLimit: 21000000});
        txDeployed = await veArtProxy.deployed();
        console.log("veArtProxy Address: ", veArtProxy.address)
        generateConstantFile("VeArtProxyUpgradeable", veArtProxy.address);
        return veArtProxy.address;
    } catch (error) {
        if (retries > 1) {
            return deployVotingEscrowArtproxyUpgradable_(retries-1);
        }
        throw error;
    }
}


const deployVotingEscrow = async(blackAddress, veArtProxyAddress, votingBalanceLogicAddress) =>{
    try {
        return deployVotingEscrow_(blackAddress, veArtProxyAddress, votingBalanceLogicAddress, retryCount);
    }
    catch (error) {
        console.log("error in deploying deployVotingEscrow: ", error);
        process.exit(1);
    }
}
const deployVotingEscrow_ = async(blackAddress, veArtProxyAddress, votingBalanceLogicAddress, retries) =>{
    try {
        const VotingEscrowContract = await ethers.getContractFactory("VotingEscrow", {
            libraries: {
                VotingBalanceLogic: votingBalanceLogicAddress,
            },
        });
        const veBlack = await VotingEscrowContract.deploy(blackAddress, veArtProxyAddress, ZERO_ADDRESS);
        txDeployed = await veBlack.deployed();
        console.log("veBlack Address: ", veBlack.address);
        generateConstantFile("VotingEscrow", veBlack.address);
        return veBlack.address;
    } catch (error) {
        if (retries > 1) {
            return deployVotingEscrow_(blackAddress, veArtProxyAddress, votingBalanceLogicAddress, retries-1);
        }
        throw error;
    }

}

const deployVoterFactoryLib = async() => {
    try {
        return await deployVoterFactoryLib_(retryCount);
    }
    catch (error) {
        console.log("error in deploying VoterFactoryLib: ", error);
        process.exit(1);
    }
}
const deployVoterFactoryLib_ = async(retries) => {
    try {
        const VoterFactoryLib = await ethers.getContractFactory("VoterFactoryLib");
        const voterFactoryLib = await VoterFactoryLib.deploy();
        await voterFactoryLib.deployed();
        console.log("VoterFactorLib deployed at:", voterFactoryLib.address);
        generateConstantFile("VoterFactoryLib", voterFactoryLib.address);
        return voterFactoryLib.address;
    }
    catch (error) {
        if (retries > 1) {
            return await deployVoterFactoryLib_(retries-1);
        }
        throw error;
    }
}

const deployVoterV3AndSetInit = async (votingEscrowAddress, tokenHandlerAddress, gaugeManagerAddress, permissionRegistry) => {
    try {
        return await deployVoterV3AndSetInit_(votingEscrowAddress, tokenHandlerAddress, gaugeManagerAddress,permissionRegistry, retryCount);
    }
    catch (error) {
        console.log("error in deploying voterV3: ", error);
        process.exit(1);
    }
}
const deployVoterV3AndSetInit_ = async (votingEscrowAddress, tokenHandlerAddress, gaugeManagerAddress,permissionRegistry, retries) => {
    try {
        const voterV3ContractFactory = await ethers.getContractFactory("VoterV3");

        const inputs = [votingEscrowAddress,  tokenHandlerAddress, gaugeManagerAddress, permissionRegistry]
        const VoterV3 = await upgrades.deployProxy(voterV3ContractFactory, inputs, {initializer: 'initialize', unsafeAllowLinkedLibraries: true, timeout: 180000, pollingInterval: 3000, gasLimit: 21000000});
        const txDeployed = await VoterV3.deployed();

        console.log('VoterV3 address: ', VoterV3.address)
        generateConstantFile("VoterV3", VoterV3.address);
        return VoterV3.address;
    } catch (error) {
        if (retries > 1) {
            return await deployVoterV3AndSetInit_(votingEscrowAddress, tokenHandlerAddress, gaugeManagerAddress, retries-1);
        }
        throw error;
    }

}

const deployVoterV3Init = async (permissionRegistryAddress, votingAddress) => {
    try {
        await deployVoterV3Init_(permissionRegistryAddress, votingAddress, retryCount);
        return;
    }
    catch (error) {
        console.log("error in deployVoterV3Init: ", error);
        process.exit(1);
    }
}
const deployVoterV3Init_ = async (permissionRegistryAddress, votingAddress, retries) => {
    try {

        const VoterV3 = await ethers.getContractAt(voterV3Abi, votingAddress)
        const initializeVoter = await VoterV3.setPermissionsRegistry(permissionRegistryAddress);
        await initializeVoter.wait();

    } catch (error) {
        if (retries > 1) {
            await deployVoterV3Init_(permissionRegistryAddress, votingAddress, retries-1);
            return;
        }
        throw error;
    }

}



const setVoterBribeV3 = async(voterV3Address, bribeFactoryV3Address) => {
    try {

        await setVoterBribeV3_(voterV3Address, bribeFactoryV3Address, retryCount);
        return;
    }
    catch (error) {
        console.log("error in setting voter in bribeV3: ", error);
        process.exit(1);
    }
}
const setVoterBribeV3_ = async(voterV3Address, bribeFactoryV3Address, retries) => {
    try {
        const bribeV3Contract = await ethers.getContractAt(bribeFactoryV3Abi, bribeFactoryV3Address);
        const createVoter = await bribeV3Contract.setVoter(voterV3Address);
        const txDeployed = await createVoter.wait();

        console.log('set VoterV3 in bribe\n');
    } catch (error) {
        if (retries > 1) {
            await setVoterBribeV3_(voterV3Address, bribeFactoryV3Address, retries-1);
            return;
        }
        throw error;
    }

}

const deployRewardsDistributor = async(votingEscrowAddress) => {
    try {
        return await deployRewardsDistributor_(votingEscrowAddress, retryCount);
    }
    catch (error) {
        console.log("error in deploying rewardsDiastributer: ", error);
        process.exit(1);
    }
}
const deployRewardsDistributor_ = async(votingEscrowAddress, retries) => {
    try {
        const rewardsDistributorContractFactory = await ethers.getContractFactory("RewardsDistributor");
        const rewardsDistributor = await rewardsDistributorContractFactory.deploy(votingEscrowAddress);
        const txDeployed = await rewardsDistributor.deployed();
        console.log('RewardsDistributor address: ', rewardsDistributor.address)
        generateConstantFile("RewardsDistributor", rewardsDistributor.address);
        return rewardsDistributor.address;
    } catch (error) {
        if (retries > 1) {
            return await deployRewardsDistributor_(votingEscrowAddress, retries-1);
        }
        throw error;
    }

}

const deployMinterUpgradeable = async(votingEscrowAddress, gaugeManagerAddress, rewardsDistributorAddress) => {
    try {
        return await deployMinterUpgradeable_(votingEscrowAddress, gaugeManagerAddress, rewardsDistributorAddress, retryCount);
    }
    catch (error) {
        console.log("error in deploying minterUpgradeable: ", error);
        process.exit(1);
    }
}
const deployMinterUpgradeable_ = async(votingEscrowAddress, gaugeManagerAddress, rewardsDistributorAddress, retries) => {
    try {
        const minterUpgradableContractFactory = await ethers.getContractFactory("MinterUpgradeable");
        const inputs = [gaugeManagerAddress, votingEscrowAddress, rewardsDistributorAddress]
        const minterUpgradeable = await upgrades.deployProxy(minterUpgradableContractFactory, inputs, {initializer: 'initialize', timeout: 180000, pollingInterval: 3000});
        const txDeployed = await minterUpgradeable.deployed();
        console.log('minterUpgradeable address: ', minterUpgradeable.address)
        generateConstantFile("MinterUpgradeable", minterUpgradeable.address);
        return minterUpgradeable.address;
    } catch (error) {
        if (retries > 1) {
            return await deployMinterUpgradeable_(votingEscrowAddress, gaugeManagerAddress, rewardsDistributorAddress, retries-1);
        }
        throw error;
    }
}

const createGauges = async(voterV3Address, blackholeV2AbiAddress) => {
    try {
        await createGauges_(voterV3Address, blackholeV2AbiAddress, retryCount);
        return;
    }
    catch (error) {
        process.exit(1);
    }
}
const createGauges_ = async(voterV3Address, blackholeV2AbiAddress, retries) => {

    try {
        // creating gauge for pair bwn - token one and token two - basic volatile pool
        const blackHoleAllPairContract =  await ethers.getContractAt(blackholePairAPIV2Abi, blackholeV2AbiAddress);
        const allPairs = await blackHoleAllPairContract.getAllPair(owner.address, BigInt(100), BigInt(0));
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
                const createGaugeTx = await voterV3Contract.createGauge(currentAddress, BigInt(0));

            }
        }
        console.log('done creation of gauge tx\n')
    }
    catch (error) {
        if (retries > 1) {
            await createGauges_(voterV3Address, blackholeV2AbiAddress, retries-1);
            return;
        }
        throw error;
    }
}

const deployBribeV3Factory = async (voterV3Address, gaugeManagerAddress, permissionRegistryAddress, tokenHandlerAddress) => {
    try {
        return await deployBribeV3Factory_(voterV3Address, gaugeManagerAddress, permissionRegistryAddress, tokenHandlerAddress, retryCount);
    }
    catch (error) {
        console.log("error in deploying bribeV3: ", error);
        process.exit(1);
    }
}
const deployBribeV3Factory_ = async (voterV3Address, gaugeManagerAddress, permissionRegistryAddress, tokenHandlerAddress, retries) => {
    try {
        const bribeContractFactory = await ethers.getContractFactory("BribeFactoryV3");
        const input = [voterV3Address, gaugeManagerAddress, permissionRegistryAddress, tokenHandlerAddress]
        const BribeFactoryV3 = await upgrades.deployProxy(bribeContractFactory, input, {initializer: 'initialize', timeout: 180000, pollingInterval: 3000});
        const txDeployed = await BribeFactoryV3.deployed();
        console.log('deployed bribefactory v3: ', BribeFactoryV3.address)
        generateConstantFile("BribeFactoryV3", BribeFactoryV3.address);
        return BribeFactoryV3.address;
    } catch (error) {
        if (retries > 1) {
            return await deployBribeV3Factory_(voterV3Address, gaugeManagerAddress, permissionRegistryAddress, tokenHandlerAddress, retries-1);
        }
        throw error;
    }
}

const setBribeFactoryInGaugeManager = async(bribeFactoryV3Address, gaugeManagerAddress) => {
    try {
        await setBribeFactoryInGaugeManager_(bribeFactoryV3Address, gaugeManagerAddress, retryCount);
        return;
    }
    catch (error) {
        process.exit(1);
    }
}
const setBribeFactoryInGaugeManager_ = async(bribeFactoryV3Address, gaugeManagerAddress, retries) => {
    try {

        const gaugeManagerContract = await ethers.getContractAt(gaugeManagerAbi, gaugeManagerAddress);
        const tx = await gaugeManagerContract.setBribeFactory(bribeFactoryV3Address);
        await tx.wait();
    }
    catch (error) {
        if (retries > 1) {
            await setBribeFactoryInGaugeManager_(bribeFactoryV3Address, gaugeManagerAddress, retries-1);
            return;
        }
        throw error;
    }
}

const setVoterInGaugeManager = async(voterV3Address, gaugeManagerAddress) => {
    try {
        await setVoterInGaugeManager_(voterV3Address, gaugeManagerAddress, retryCount);
        return;
    }
    catch (error) {
        console.log("error in GaugeManager VoterV3 set");
        process.exit(1);
    }
}
const setVoterInGaugeManager_ = async(voterV3Address, gaugeManagerAddress, retries) => {
    try {
        const GaugeManager = await ethers.getContractAt(gaugeManagerAbi, gaugeManagerAddress);
        const tx = await GaugeManager.setVoter(voterV3Address);
        await tx.wait();
        console.log("GaugeManager VoterV3 set");
    } catch (error) {
        if (retries > 1) {
            await setVoterInGaugeManager_(voterV3Address, gaugeManagerAddress, retries-1);
            return;
        }
        throw error;
    }
}

const deployGaugeManager = async (votingEscrowAddress, tokenHandlerAddress, gaugeFactoryAddress, gaugeFactoryCLAddress, voterFactoryLibAddress, pairFactoryAddress, permissionRegistryAddress) => {
    try {
        return await deployGaugeManager_ (votingEscrowAddress, tokenHandlerAddress, gaugeFactoryAddress, gaugeFactoryCLAddress, voterFactoryLibAddress, pairFactoryAddress, permissionRegistryAddress, retryCount);
    }
    catch (error) {
        console.log("error in deploying gaugeManagerContract: ", error);
        process.exit(1);
    }
}
const deployGaugeManager_ = async (votingEscrowAddress, tokenHandlerAddress, gaugeFactoryAddress, gaugeFactoryCLAddress, voterFactoryLibAddress, pairFactoryAddress, permissionRegistryAddress, retries) => {
    try {
        const gaugeManagerContract = await ethers.getContractFactory("GaugeManager", {
            libraries: {
                VoterFactoryLib: voterFactoryLibAddress
            },
        });
        const input = [votingEscrowAddress, tokenHandlerAddress, gaugeFactoryAddress, gaugeFactoryCLAddress, pairFactoryAddress, algebraFactory, permissionRegistryAddress]
        const gaugeManager = await upgrades.deployProxy(gaugeManagerContract, input, {initializer: 'initialize', unsafeAllowLinkedLibraries: true, timeout: 180000, pollingInterval: 3000});
        const txDeployed = await gaugeManager.deployed();
        console.log('deployed gaugeManager: ', gaugeManager.address)
        generateConstantFile("GaugeManager", gaugeManager.address);
        return gaugeManager.address;
    } catch (error) {
        if (retries > 1) {
            return await deployGaugeManager_ (votingEscrowAddress, tokenHandlerAddress, gaugeFactoryAddress, gaugeFactoryCLAddress, voterFactoryLibAddress, pairFactoryAddress, permissionRegistryAddress, retries-1);
        }
        throw error;
    }
}

const deployGaugeFactory = async (permissionRegistryAddress) => {
    try {
        return await deployGaugeFactory_(permissionRegistryAddress, retryCount);
    }
    catch (error) {
        console.log("error in deploying gaugeV2: ", error);
        process.exit(1);
    }
}
const deployGaugeFactory_ = async (permissionRegistryAddress, retries) => {
    try {
        const gaugeContractFactory = await ethers.getContractFactory("GaugeFactory");
        const input = [permissionRegistryAddress]
        const GaugeFactory = await upgrades.deployProxy(gaugeContractFactory, input, {initializer: 'initialize', timeout: 180000, pollingInterval: 3000});
        const txDeployed = await GaugeFactory.deployed();
        console.log('deployed GaugeFactory: ', GaugeFactory.address);
        generateConstantFile("GaugeFactory", GaugeFactory.address);
        return GaugeFactory.address
    } catch (error) {
        if (retries > 1) {
            return await deployGaugeFactory_(permissionRegistryAddress, retries-1);
        }
        throw error;
    }
}

const deployGaugeFactoryCL = async (permissionRegistryAddress) => {
    try {
        return await deployGaugeFactoryCL_(permissionRegistryAddress, retryCount);
    }
    catch (error) {
        console.log("error in deploying gaugeV2: ", error);
        process.exit(1);
    }
}
const deployGaugeFactoryCL_ = async (permissionRegistryAddress, retries) => {
    try {
        const gaugeCLContractFactory = await ethers.getContractFactory("GaugeFactoryCL");
        const input = [permissionRegistryAddress]
        const gaugeCL = await upgrades.deployProxy(gaugeCLContractFactory, input, {initializer: 'initialize', timeout: 180000, pollingInterval: 3000});
        const txDeployed = await gaugeCL.deployed();
        console.log('deployed gaugeCL: ', gaugeCL.address);
        generateConstantFile("GaugeFactoryCL", gaugeCL.address);
        return gaugeCL.address
    } catch (error) {
        if (retries > 1) {
            return await deployGaugeFactoryCL_(permissionRegistryAddress, retries-1);
        }
        throw error;
    }
}

const setMinterUpgradableInGaugeManager = async(gaugeManagerAddress, minterUpgradableAddress)=>{
    try {
        await setMinterUpgradableInGaugeManager_(gaugeManagerAddress, minterUpgradableAddress, retryCount);
        return;
    }
    catch (error) {
        process.exit(1);
    }
}
const setMinterUpgradableInGaugeManager_ = async(gaugeManagerAddress, minterUpgradableAddress, retries)=>{
    try {
        const gaugeManagerContract = await ethers.getContractAt(gaugeManagerAbi, gaugeManagerAddress);
        await gaugeManagerContract.setMinter(minterUpgradableAddress);
        console.log('set minter in GaugeManager\n');
    }
    catch (error) {
        if (retries > 1) {
            await setMinterUpgradableInGaugeManager_(gaugeManagerAddress, minterUpgradableAddress, retries-1);
            return;
        }
        throw error;
    }
}

const setMinterInBlack = async(minterUpgradableAddress, blackAddress) => {
    try {
        await setMinterInBlack_(minterUpgradableAddress, blackAddress, retryCount);
        return;
    }
    catch (error) {
        throw error
        process.exit(1);
    }
}
const setMinterInBlack_ = async(minterUpgradableAddress, blackAddress, retries) => {
    try {
        const blackContract = await ethers.getContractAt(blackAbi, blackAddress);
        const tx = await blackContract.setMinter(minterUpgradableAddress);
        await tx.wait();
        console.log('set minter in Black\n');
    }
    catch (error) {
        if (retries > 1) {
            await setMinterInBlack_(minterUpgradableAddress, blackAddress, retries-1);
            return;
        }
        throw error;
    }

}

const setMinterInRewardDistributer = async(minterUpgradableAddress, rewardsDistributorAddress) => {
    try {
        await setMinterInRewardDistributer_(minterUpgradableAddress, rewardsDistributorAddress, retryCount);
        return;
    }
    catch (error) {
        process.exit(1);
    }
}
const setMinterInRewardDistributer_ = async(minterUpgradableAddress, rewardsDistributorAddress, retries) => {
    try {
        const rewardDistributerContract = await ethers.getContractAt(rewardsDistributorAbi, rewardsDistributorAddress);
        await rewardDistributerContract.setDepositor(minterUpgradableAddress);
        console.log('set depositor in rewardDistributer\n');
    }
    catch (error) {
        if (retries > 1) {
            await setMinterInRewardDistributer_(minterUpgradableAddress, rewardsDistributorAddress, retries-1);
            return;
        }
        throw error;
    }
}

const initializeMinter = async (minterUpgradableAddress) => {
    try {
        await initializeMinter_(minterUpgradableAddress, retryCount);
        return;
    }
    catch (error) {
        console.log("error in initializing black value ", error);
        process.exit(1);
    }
}
const initializeMinter_ = async (minterUpgradableAddress, retries) => {
    try {
        const minterContract = await ethers.getContractAt(minterUpgradeableAbi, minterUpgradableAddress);
        const mintAmount = BigNumber.from("100000").mul(BigNumber.from("1000000000000000000"));
        console.log("mintAmount ", mintAmount)
        const initializingTx = await minterContract._initialize(
            [],
            [],
            mintAmount
        );
        await initializingTx.wait();
        console.log("Done initializing minter post deployment\n");
    } catch (error) {
        if (retries > 1) {
            await initializeMinter_(minterUpgradableAddress, retries-1);
            return;
        }
        throw error;
    }
}

const deployEpochController = async(minterUpgradableAddress, permissionRegistryAddress, gaugeManagerAddress) =>{
    try {
        return await deployEpochController_(minterUpgradableAddress, permissionRegistryAddress, gaugeManagerAddress, retryCount);
    }
    catch (error) {
        console.log("error in deploying EpochController: ", error);
        process.exit(1);
    }
}
const deployEpochController_ = async(minterUpgradableAddress, permissionRegistryAddress, gaugeManagerAddress, retries) =>{
    try {
        data = await ethers.getContractFactory("EpochController");
        const inputs = [minterUpgradableAddress, permissionRegistryAddress, gaugeManagerAddress];
        const EpochController = await upgrades.deployProxy(data, inputs, {initializer: 'initialize', timeout: 180000, pollingInterval: 3000});
        txDeployed = await EpochController.deployed();

        console.log('deployed EpochController: ', EpochController.address);
        generateConstantFile("EpochController", EpochController.address);

        return EpochController.address;
    } catch (error) {
        if (retries > 1) {
            return await deployEpochController_(minterUpgradableAddress, permissionRegistryAddress, gaugeManagerAddress, retries-1);
        }
        throw error;
    }
}

const setChainLinkAddress = async (epocControllerAddress, chainlinkAutomationAddress1, chainlinkAutomationAddress2) => {
    try {
        await setChainLinkAddress_(epocControllerAddress, chainlinkAutomationAddress1, chainlinkAutomationAddress2, retryCount);
        return;
    }
    catch (error) {
        console.log("setChainLinkAddress failed: ", error);
        process.exit(1);
    }
}
const setChainLinkAddress_ = async (epocControllerAddress, chainlinkAutomationAddress1, chainlinkAutomationAddress2, retries) => {
    try{
        const epochController = await ethers.getContractAt(epochControllerAbi, epocControllerAddress);
        await epochController.setAutomationRegistry(chainlinkAutomationAddress1);
        await epochController.setAutomationRegistry2(chainlinkAutomationAddress2);
        console.log("setChainLinkAddress succes\n");
    } catch(error){
        if (retries > 1) {
            await setChainLinkAddress_(epocControllerAddress, chainlinkAutomationAddress1, chainlinkAutomationAddress2, retries-1);
            return;
        }
        throw error;
    }
}

const addBlackToUserAddress = async (minterUpgradableAddress) => {
    try {
        await addBlackToUserAddress_(minterUpgradableAddress, retryCount);
        return;
    }
    catch (error) {
        console.log("error in transfering token: ", error);
        process.exit(1);
    }
}
const addBlackToUserAddress_ = async (minterUpgradableAddress, retries) => {
    try {
        const accounts = await ethers.getSigners();
        const owner = accounts[0];
        const minterContract = await ethers.getContractAt(minterUpgradeableAbi, minterUpgradableAddress);
        const amountAdd = BigNumber.from("5000").mul(BigNumber.from("1000000000000000000"));

        console.log("owner address", owner.address)
        // await minterContract.transfer("0xa7243fc6FB83b0490eBe957941a339be4Db11c29", amountAdd);
        const transferTx = await minterContract.transfer(owner.address, amountAdd);
        await transferTx.wait();
        console.log("transfer token successfully");

    } catch (error) {
        if (retries > 1) {
            await addBlackToUserAddress_(minterUpgradableAddress, retries-1);
            return;
        }
        throw error;
    }

}

const setVoterV3InVotingEscrow = async(voterV3Address, votingEscrowAddress) => {
    try {
        await setVoterV3InVotingEscrow_(voterV3Address, votingEscrowAddress, retryCount);
        return;
    }
    catch (error) {
        console.log("error voterV3 in voting escrow", error);
        process.exit(1);
    }
}
const setVoterV3InVotingEscrow_ = async(voterV3Address, votingEscrowAddress, retries) => {
    try {
        const VotingEscrowContract = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress);
        await VotingEscrowContract.setVoter(voterV3Address);
        console.log("set voterV3 in voting escrow\n");
    } catch (error) {
        if (retries > 1) {
            await setVoterV3InVotingEscrow_(voterV3Address, votingEscrowAddress, retries-1);
            return;
        }
        throw error;
    }
}

const deployveNFT = async (voterV3Address, rewardsDistributorAddress, gaugeFactoryAddress, gaugeFactoryCLAddress, gaugeManagerAddress) => {
    try {
        return await deployveNFT_(voterV3Address, rewardsDistributorAddress, gaugeFactoryAddress, gaugeFactoryCLAddress, gaugeManagerAddress, retryCount);
    }
    catch (error) {
        console.log('deployed venftapi error ', error)
        process.exit(1);
    }
}
const deployveNFT_ = async (voterV3Address, rewardsDistributorAddress, gaugeFactoryAddress, gaugeFactoryCLAddress, gaugeManagerAddress, retries) => {
    try {
        const deployveNFTContract = await ethers.getContractFactory("veNFTAPIV1");
        input = [voterV3Address, rewardsDistributorAddress, gaugeFactoryAddress, gaugeFactoryCLAddress, gaugeManagerAddress];
        const veNFTAPI = await upgrades.deployProxy(deployveNFTContract, input, {initializer: 'initialize', timeout: 180000, pollingInterval: 3000});
        txDeployed = await veNFTAPI.deployed();
        console.log('deployed venftapi address: ', veNFTAPI.address);
        generateConstantFile("veNFTAPI", veNFTAPI.address);
        return veNFTAPI.address;
    } catch (error) {
        if (retries > 1) {
            return await deployveNFT_(voterV3Address, rewardsDistributorAddress, gaugeFactoryAddress, gaugeFactoryCLAddress, gaugeManagerAddress, retries-1);
        }
        throw error;
    }
}

const deployBlackGovernor = async(votingEscrowAddress, minterUpgradableAddress) => {
    try {
        return await deployBlackGovernor_(votingEscrowAddress, minterUpgradableAddress, retryCount);
    }
    catch (error) {
        console.log("error in deploying BlackGovernor: ", error);
        process.exit(1);
    }
}
const deployBlackGovernor_ = async(votingEscrowAddress, minterUpgradableAddress, retries) => {
    try {
        const blackGovernorContract = await ethers.getContractFactory("BlackGovernor");
        const BlackGovernor = await blackGovernorContract.deploy(votingEscrowAddress, minterUpgradableAddress);
        const txDeployed = await BlackGovernor.deployed();
        generateConstantFile("BlackGovernor", BlackGovernor.address);
        console.log('BlackGovernor address: ', BlackGovernor.address);
        return BlackGovernor.address;
    } catch (error) {
        if (retries > 1) {
            return await deployBlackGovernor_(votingEscrowAddress, minterUpgradableAddress, retries-1);
        }
        throw error;
    }
}

const pushDefaultRewardToken = async (bribeFactoryV3Address, blackAddress) => {
    try {
        await pushDefaultRewardToken_(bribeFactoryV3Address, blackAddress, retryCount);
        return;
    }
    catch (error) {
        process.exit(1);
    }
}
const pushDefaultRewardToken_ = async (bribeFactoryV3Address, blackAddress, retries) => {
    try {
        const BribeFactoryV3Contract = await ethers.getContractAt(bribeFactoryV3Abi, bribeFactoryV3Address);
        await BribeFactoryV3Contract.pushDefaultRewardToken(blackAddress);
        console.log("pushDefaultRewardToken\n");
    }
    catch (error) {
        if (retries > 1) {
            await pushDefaultRewardToken_(bribeFactoryV3Address, blackAddress, retries-1);
            return;
        }
        throw error;
    }
}

const deployBlackClaim = async (votingEscrowAddress, treasury) => {
    try {
        return await deployBlackClaim_(votingEscrowAddress, treasury, retryCount);
    }
    catch (error) {
        console.log("error in deploying Black Claims: ", error);
        process.exit(1);
    }
}
const deployBlackClaim_ = async (votingEscrowAddress, treasury, retries) => {
    try {
        const BlackClaimsContract = await ethers.getContractFactory("BlackClaims");
        const BlackClaims = await BlackClaimsContract.deploy(treasury, votingEscrowAddress);
        const txDeployed =  await BlackClaims.deployed();

        console.log("BlackClaims address: ", BlackClaims.address)
        generateConstantFile("BlackClaims", BlackClaims.address);
        return BlackClaims.address;
    } catch (error) {
        if (retries > 1) {
            return await deployBlackClaim_(votingEscrowAddress, treasury, retries-1);
        }
        throw error;
    }
}

const deployFixedAuction = async () => {
    try {
        return await deployFixedAuction_(retryCount);
    }
    catch (error) {
        console.log("error in deploying fixed aution : ", error);
        process.exit(1);
    }
}
const deployFixedAuction_ = async (retries) => {
    try {
        const fixedAuctionContract = await ethers.getContractFactory("FixedAuction");
        const fixedAuction = await fixedAuctionContract.deploy();
        const txDeployed = await fixedAuction.deployed();

        console.log("fixed auction address: ", fixedAuction.address)
        generateConstantFile("FixedAuction", fixedAuction.address);
        return fixedAuction.address;
    } catch (error) {
        if (retries > 1) {
            return await deployFixedAuction_(retries-1);
        }
        throw error;
    }
}

const deployAuctionFacotry = async (fixedAuctionAddress) => {
    try {
        return await deployAuctionFacotry_(fixedAuctionAddress, retryCount);
    }
    catch (error) {
        console.log('deployed auction factory address : ', error);
        process.exit(1);
    }
}
const deployAuctionFacotry_ = async (fixedAuctionAddress, retries) => {
    try {
        data = await ethers.getContractFactory("AuctionFactory");
        input = [fixedAuctionAddress]
        const auctionFactory = await upgrades.deployProxy(data, input, {initializer: 'initialize', timeout: 180000, pollingInterval: 3000});
        const txDeployed = await auctionFactory.deployed();

        console.log('deployed auction factory address : ', auctionFactory.address);
        generateConstantFile("AuctionFactory", auctionFactory.address);
        return auctionFactory.address;
    } catch (error) {
        if (retries > 1) {
            return await deployAuctionFacotry_(fixedAuctionAddress, retries-1);
        }
        throw error;
    }
}

const deployGenesisFactory = async (tokenHandlerAddress) => {
    try {
        return await deployGenesisFactory_(tokenHandlerAddress, retryCount);
    }
    catch (error) {
        console.log('deployed genesis factory address : ', error);
        process.exit(1);
    }
}
const deployGenesisFactory_ = async (tokenHandlerAddress, retries) => {
    try {
        data = await ethers.getContractFactory("GenesisPoolFactory");
        input = [tokenHandlerAddress]
        const genesisFactory = await upgrades.deployProxy(data, input, {initializer: 'initialize', timeout: 180000, pollingInterval: 3000});
        const txDeployed = await genesisFactory.deployed();

        console.log('deployed genesis factory address : ', genesisFactory.address);
        generateConstantFile("GenesisPoolFactory", genesisFactory.address);
        return genesisFactory.address;
    } catch (error) {
        if (retries > 1) {
            return await deployGenesisFactory_(tokenHandlerAddress, retries-1);
        }
        throw error;
    }
}

const deployGenesisManager = async (epochControllerAddress, routerV2Address, permissionRegistryAddress, gaugeManagerAddress, pairFactoryAddress, genesisFactoryAddress, auctionFactoryAddress, tokenHandlerAddress) => {
    try {
        return await deployGenesisManager_(epochControllerAddress, routerV2Address, permissionRegistryAddress, gaugeManagerAddress, pairFactoryAddress, genesisFactoryAddress, auctionFactoryAddress, tokenHandlerAddress, retryCount);
    }
    catch (error) {
        console.log("error in deploying Genesis manager : ", error);
        process.exit(1);
    }
}
const deployGenesisManager_ = async (epochControllerAddress, routerV2Address, permissionRegistryAddress, gaugeManagerAddress, pairFactoryAddress, genesisFactoryAddress, auctionFactoryAddress, tokenHandlerAddress, retries) => {
    try {
        const data = await ethers.getContractFactory("GenesisPoolManager");
        input = [epochControllerAddress, routerV2Address, permissionRegistryAddress, gaugeManagerAddress, pairFactoryAddress, genesisFactoryAddress, auctionFactoryAddress, tokenHandlerAddress];
        const genesisManager = await upgrades.deployProxy(data, input, {initializer: 'initialize', timeout: 180000, pollingInterval: 3000});
        const txDeployed = await genesisManager.deployed();

        console.log("Genesis manager address : ", genesisManager.address)
        generateConstantFile("GenesisPoolManager", genesisManager.address);
        return genesisManager.address;
    } catch (error) {
        if (retries > 1) {
            return await deployGenesisManager_(epochControllerAddress, routerV2Address, permissionRegistryAddress, gaugeManagerAddress, pairFactoryAddress, genesisFactoryAddress, auctionFactoryAddress, tokenHandlerAddress, retries-1);
        }
        throw error;
    }
}

const setGenesisManagerInGenesisFactory = async (genesisFactoryAddress, genesisManagerAddress) => {
    try {
        await setGenesisManagerInGenesisFactory_(genesisFactoryAddress, genesisManagerAddress, retryCount);
        return;
    }
    catch (error) {
        console.log("error genesis manager in genesis factory", error);
        process.exit(1);
    }
}
const setGenesisManagerInGenesisFactory_ = async (genesisFactoryAddress, genesisManagerAddress, retries) => {
    try {
        const genesisFactoryContract = await ethers.getContractAt(genesisPoolFactoryAbi, genesisFactoryAddress);
        const tx = await genesisFactoryContract.setGenesisManager(genesisManagerAddress);
        await tx.wait();
        console.log("set genesis manager in genesis factory\n");
    } catch (error) {
        if (retries > 1) {
            await setGenesisManagerInGenesisFactory_(genesisFactoryAddress, genesisManagerAddress, retries-1);
            return;
        }
        throw error;
    }
}

const setGenesisManagerRole = async (permissionRegistryAddress, genesisManagerAddress) => {
    try {
        await setGenesisManagerRole_(permissionRegistryAddress, genesisManagerAddress, retryCount);
        return;
    }
    catch (error) {
        console.log('Error in setRoleFor in permissionRegistry:', error);
        process.exit(1);
    }
}
const setGenesisManagerRole_ = async (permissionRegistryAddress, genesisManagerAddress, retries) => {
    const permissionRegistryContract = await ethers.getContractAt(permissionsRegistryAbi, permissionRegistryAddress);

    try {
        const setRoleTx = await permissionRegistryContract.setRoleFor(genesisManagerAddress, "GENESIS_MANAGER");
        await setRoleTx.wait(); // Wait for the transaction to be mined
        console.log('setRoleFor in permissionRegistry\n');
    } catch (error) {
        if (retries > 1) {
            await setGenesisManagerRole_(permissionRegistryAddress, genesisManagerAddress, retries-1);
            return;
        }
        throw error;
    }
};

const setGenesisPoolManagerInGaugeManager = async(gaugeManagerAddress, genesisManagerAddress) => {
    try {
        await setGenesisPoolManagerInGaugeManager_(gaugeManagerAddress, genesisManagerAddress, retryCount);
        return;
    }
    catch (error) {
        console.log("error genesis manager in gvoter", error);
        process.exit(1);
    }
}
const setGenesisPoolManagerInGaugeManager_ = async(gaugeManagerAddress, genesisManagerAddress, retries) => {
    try {
        const gaugeManagerContract = await ethers.getContractAt(gaugeManagerAbi, gaugeManagerAddress);
        const tx = await gaugeManagerContract.setGenesisManager(genesisManagerAddress);
        await tx.wait();
        console.log("set genesis manager in gaugeManager\n");
    } catch (error) {
        if (retries > 1) {
            await setGenesisPoolManagerInGaugeManager_(gaugeManagerAddress, genesisManagerAddress, retries-1);
            return;
        }
        throw error;
    }
};

const setGenesisPoolManagerInPairFactory = async(pairFactoryAddress, genesisManagerAddress) => {
    try {
        await setGenesisPoolManagerInPairFactory_(pairFactoryAddress, genesisManagerAddress, retryCount);
        return;
    }
    catch (error) {
        console.log("error genesis manager in pair factory", error);
        process.exit(1);
    }
}
const setGenesisPoolManagerInPairFactory_ = async(pairFactoryAddress, genesisManagerAddress, retries) => {
    try {
        const PairFactoryContract = await ethers.getContractAt(pairFactoryAbi, pairFactoryAddress);
        const tx = await PairFactoryContract.setGenesisManager(genesisManagerAddress);
        await tx.wait();
        console.log("set genesis manager in pair factory\n");
    } catch (error) {
        if (retries > 1) {
            await setGenesisPoolManagerInPairFactory_(pairFactoryAddress, genesisManagerAddress, retries-1);
            return;
        }
        throw error;
    }
};

const setGenesisPoolManagerInEpochController = async (epochControllerAddress, genesisManagerAddress) => {
    try {
        await setGenesisPoolManagerInEpochController_(epochControllerAddress, genesisManagerAddress, retryCount);
        return;
    }
    catch (error) {
        console.log("error genesis manager in epoch controller", error);
        process.exit(1);
    }
}
const setGenesisPoolManagerInEpochController_ = async (epochControllerAddress, genesisManagerAddress, retries) => {
    try {
        const EpochControllerContract = await ethers.getContractAt(epochControllerAbi, epochControllerAddress);
        const tx = await EpochControllerContract.setGenesisManager(genesisManagerAddress);
        await tx.wait();
        console.log("set genesis manager in epoch controller\n");
    } catch (error) {
        if (retries > 1) {
            await setGenesisPoolManagerInEpochController_(epochControllerAddress, genesisManagerAddress, retries-1);
            return;
        }
        throw error;
    }
}

const deployGenesisApi = async (genesisManagerAddress, genesisFactoryAddress) => {
    try {
        return await deployGenesisApi_(genesisManagerAddress, genesisFactoryAddress, retryCount);
    }
    catch (error) {
        console.log('error genesis pool API  ', error);
        process.exit(1);
    }
}
const deployGenesisApi_ = async (genesisManagerAddress, genesisFactoryAddress, retries) => {
    try {
        data = await ethers.getContractFactory("GenesisPoolAPI");
        input = [genesisManagerAddress, genesisFactoryAddress]
        const genesisApi = await upgrades.deployProxy(data, input, {initializer: 'initialize', timeout: 180000, pollingInterval: 3000});
        txDeployed = await genesisApi.deployed();

        console.log('deployed genesis pool API address: ', genesisApi.address);
        generateConstantFile("GenesisPoolAPI", genesisApi.address);
        return genesisApi.address;
    } catch (error) {
        if (retries > 1) {
            return await deployGenesisApi_(genesisManagerAddress, genesisFactoryAddress, retries-1);
        }
        throw error;
    }
}

const deployTokenApi = async (tokenHandlerAddress) => {
    try {
        return await deployTokenApi_(tokenHandlerAddress, retryCount);
    }
    catch (error) {
        console.log('error Token API  ', error);
        process.exit(1);
    }
}
const deployTokenApi_ = async (tokenHandlerAddress, retries) => {
    try {
        data = await ethers.getContractFactory("TokenAPI");
        input = [tokenHandlerAddress]
        const tokenApi = await upgrades.deployProxy(data, input, {initializer: 'initialize', timeout: 180000, pollingInterval: 3000});
        txDeployed = await tokenApi.deployed();

        console.log('deployed token API address: ', tokenApi.address);
        generateConstantFile("TokenAPI", tokenApi.address);
        return tokenApi.address;
    } catch (error) {
        if (retries > 1) {
            return await deployTokenApi_(tokenHandlerAddress, retries-1);
        }
        throw error;
    }
}

const checker = async (routerV2Address, pairFactoryAddress) => {
    try {
        await checker_(routerV2Address, pairFactoryAddress, retryCount);
    }
    catch (error) {
        console.log("error genesis pool in genesis factory", error);
        process.exit(1);
    }
}
const checker_ = async (routerV2Address, pairFactoryAddress, retries) => {

    try {
        const RouterContract = await ethers.getContractAt(routerV2Abi, routerV2Address);
        const PairFactoryContract = await ethers.getContractAt(pairFactoryAbi, pairFactoryAddress);

        const tokenA = addresses[1] < addresses[2] ? addresses[1] : addresses[2];
        const tokenB = tokenA == addresses[1] ? addresses[2] : addresses[1];
        const stable = false;

        const tx = await PairFactoryContract.createPair(tokenA, tokenB, stable);
        const receipt = await tx.wait();
        const event = receipt.events.find(e => e.event === "PairCreated");
        const deployedPair = event.args.pair;

        const computedPair = await RouterContract.pairFor(tokenA, tokenB, stable);

        console.log("Deployed Pair:", deployedPair);
        console.log("Computed Pair:", computedPair);


        if (computedPair.toLowerCase() === deployedPair.toLowerCase()) {
            console.log("✅ Addresses Match!");
        } else {
            console.log("❌ Address Mismatch!");
        }

    } catch (error) {
        if (retries > 1) {
            await checker_(routerV2Address, pairFactoryAddress, retries--);
            return;
        }
        throw error;
    }
}

const deploySimpleTopNStrategy = async (voterV3Address) => {
    try {
        console.log("entered simple to pn strat deployment fn")
        const simpleTopNStrat = await ethers.getContractFactory("SimpleTopNPoolsStrategy");
        console.log("found!")
        const deployedTopNStrategy = await simpleTopNStrat.deploy(blackholePairAPIV2Address, voterV3Address, {
        gasLimit: 15000000
        });
        await deployedTopNStrategy.deployed();
        console.log("deployed top n start: ", deployedTopNStrategy.address)
        generateConstantFile("RewardsBasedTopNPoolsStrategy", deployedTopNStrategy.address)
        return deployedTopNStrategy.address;
    } catch (err) {
        console.log("error in deploying top n strategy", err)
        process.exit(1);
    }
}

const deployVoteWeightStrategy = async () => {
    try {
        const voteWgtStrategy = await ethers.getContractFactory("SetterVoteWeightStrategy");
        const deployVoteWgtStrat = await voteWgtStrategy.deploy(ZERO_ADDRESS);
        await deployVoteWgtStrat.deployed();
        generateConstantFile("RewardsBasedVoteWeightStrategy", deployVoteWgtStrat.address)
        return deployVoteWgtStrat.address;
    } catch (err) {
        console.error("Error in deploying votewgtstrategy", err);
        process.exit(1);
    }
}

const deployAVM = async (voterV3Address, votingEscrowAddress, minterUpgradableAddress, rewardsDistributorAddress, topNStrategyAddress, voteWgtStrategyAddress) => {
    try {
        const data = await ethers.getContractFactory("AutomatedVotingManager");
        const accounts = await ethers.getSigners();
        const owner = accounts[0];
        const input = [
            voterV3Address,
            votingEscrowAddress,
            // chainlinkExecutorAddress,
            // owner.address,
            minterUpgradableAddress, 
            rewardsDistributorAddress,
            topNStrategyAddress,
            voteWgtStrategyAddress
        ]
        const avmContract = await upgrades.deployProxy(data, input, {initializer: 'initialize'});
        txDeployed = await avmContract.deployed();
        console.log('deployed AVM v3: ', avmContract.address)
        generateConstantFile("AutomatedVotingManager", avmContract.address);
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

const setAVMInTopNStrategy = async (topNStrategyAddress, avmAddress) => {
    try {
        const topNStrategy = await ethers.getContractAt(simpleTopNPoolsStrategyAbi, topNStrategyAddress);
        const settingAVMInTopNStrategy = await topNStrategy.setAVM(avmAddress);
        await settingAVMInTopNStrategy.wait();
    } catch (err) {
        console.error("Error in setting avm in top n strategy", err);
        process.exit(1);
    }
}

const setAVMInVoteWgtStrategy = async (avmAddress, voteWgtStrategyAddress) => {
    try {
        const voteWgtStrategy = await ethers.getContractAt(voteWeightStrategyAbi, voteWgtStrategyAddress);
        const settingAVMInVoteWgtStrategy = await voteWgtStrategy.setAVM(avmAddress);
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

async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0];
    const ownerAddress_ = owner.address;

    console.log("Black token address is: ", blackAddress);
    console.log("DEPLOYMENT VERSION IS: ", deploymentVersion);

    // deploy permissionRegistry
    const permissionRegistryAddress_ = permissionsRegistryVersion === deploymentVersion? permissionsRegistryAddress: await deployPermissionRegistry();
    await verifyStep('verifyPermissionsRegistry', async () => {await verifyContract("PermissionsRegistry", permissionRegistryAddress_, []) });

    //set owner roles in permission registry
    await runStep('setPermissionRegistryRoles', async () => {await setPermissionRegistryRoles(permissionRegistryAddress_, ownerAddress_) });

    //deploy token handler & whitelist tokens and connectors
    const tokenHandlerAddress_ = tokenHandlerVersion === deploymentVersion? tokenHandlerAddress: await deployTokenHanlder(permissionRegistryAddress_);
    await verifyStep('verifyTokenHanlder', async () => {await verifyContract("TokenHanlder", tokenHandlerAddress_, [permissionRegistryAddress_]) });

    await runStep('setWhitelistedTokens', async () => {await setWhitelistedTokens(tokenHandlerAddress_)});

    await runStep('setConnectorTokens', async () => {await setConnectorTokens(tokenHandlerAddress_)});

    //deploy pairGenerator
    const pairGeneratorAddress_ = pairGeneratorVersion === deploymentVersion? pairGeneratorAddress: await deployPairGenerator();
    await verifyStep('verifyPairGenerator', async () => {await verifyContract("PairGenerator", pairGeneratorAddress_, [])});

    //deploy pairFactory
    const pairFactoryAddress_ = pairFactoryVersion === deploymentVersion? pairFactoryAddress: await deployPairFactory(pairGeneratorAddress_);
    await verifyStep('verifyPairFactory', async () => {await verifyContractProxy("PairFactory", pairFactoryAddress_, [])});

    // setDibs
    await runStep('setDibs', async () => {await setDibs(pairFactoryAddress_) });

    const votingBalanceLogicAddress_ = votingBalancingLogicVersion === deploymentVersion? votingBalancingLogicAddress: await deployVotingBalanceLogic();
    await verifyStep('verifyVotingBalanceLogic', async () => {await verifyContract("VotingBalanceLogic", votingBalanceLogicAddress_, [])});

    //deploy veArtProxy
    const veArtProxyAddress_ =  veArtProxyUpgradeableVersion=== deploymentVersion? veArtProxyUpgradeableAddress: await deployVotingEscrowArtproxyUpgradable();
    await verifyStep('verifyVeArtProxyUpgradeable', async () => {await verifyContractProxy("VeArtProxyUpgradeable", veArtProxyAddress_, [])});

    //deploy voting  escrow
    const votingEscrowAddress_ = votingEscrowVersion === deploymentVersion? votingEscrowAddress: await deployVotingEscrow(blackAddress, veArtProxyAddress_, votingBalanceLogicAddress_);
    await verifyStep('verifyVotingEscrow', async () => {await verifyContract("VotingEscrow", votingEscrowAddress_, [blackAddress,veArtProxyAddress_,ZERO_ADDRESS ])});

    //deploygaugeV2
    const gaugeFactoryAddress_ = gaugeFactoryVersion === deploymentVersion? gaugeFactoryAddress: await deployGaugeFactory(permissionRegistryAddress_);
    await verifyStep('verifyGaugeFactory', async () => {await verifyContractProxy("gaugeFactory", gaugeFactoryAddress_, [])});

    //gaugeFactory CL
    const gaugeFactoryCLAddress_ = gaugeFactoryCLVersion === deploymentVersion? gaugeFactoryCLAddress: await deployGaugeFactoryCL(permissionRegistryAddress_);
    await verifyStep('verifyGaugeFactoryCL', async () => {await verifyContractProxy("gaugeFactoryCL", gaugeFactoryCLAddress_, [])});

    await runStep('setDibsInGaugeCLFactory', async () => {await setDibsInGaugeCLFactory(gaugeFactoryCLAddress_)});

    console.log("gaugeFactory  " +  gaugeFactoryCLAddress + ":: gaugeFactoryNew: " +  gaugeFactoryCLAddress_);
    // await runStep('setReferralFeeInGaugeCLFactory', async() => {await setReferralFeeInGaugeCLFactory(gaugeFactoryCLAddress_)});

    // await runStep('setIncentiveMarkerRole', async() => {await setIncentiveMarkerRole(gaugeFactoryCLAddress_)});

    // await setDibsPercentageInGaugeCLFactory(gaugeFactoryCLAddress);
    await runStep('transferBlackToGaugeFactoryCL', async() => {await transferBlackToGaugeFactoryCL(gaugeFactoryCLAddress_)});

    //deploy VoterV3
    const voterFactoryLibAddress_ = voterFactoryLibVersion === deploymentVersion? voterFactoryLibAddress: await deployVoterFactoryLib();
    await verifyStep('verifyVoterFactory', async () => {await verifyContract("voterFactory", voterFactoryLibAddress_, [])});

    //deploy gaugeManager
    const gaugeManagerAddress_ = gaugeManagerVersion === deploymentVersion? gaugeManagerAddress: await deployGaugeManager(votingEscrowAddress_, tokenHandlerAddress_, gaugeFactoryAddress_, gaugeFactoryCLAddress_, voterFactoryLibAddress_, pairFactoryAddress_, permissionRegistryAddress_);
    await verifyStep('verifyGaugeManager', async () => {await verifyContractProxy("gaugeManager", gaugeManagerAddress_, [])});

    // //deploy voterV3 and initialize
    const voterV3Address_ = voterV3Version === deploymentVersion? voterV3Address: await deployVoterV3AndSetInit(votingEscrowAddress_, tokenHandlerAddress_, gaugeManagerAddress_, permissionRegistryAddress_);
    await verifyStep('verifyVoterV3', async () => {await verifyContractProxy("voterV3", voterV3Address_, [])});

    // await runStep('deployVoterV3Init', async () => {await deployVoterV3Init(permissionRegistryAddress_, voterV3Address_)});

    //set VoterV3
    await runStep('setVoterInGaugeManager', async () => {await setVoterInGaugeManager(voterV3Address_, gaugeManagerAddress_)});;

    // await runStep('setFarmingParamGaugeManager', async () => { await setFarmingParamGaugeManager(gaugeManagerAddress)});

    // await runStep('setCommunityFeeWithdraw', async () => { await setCommunityFeeWithdraw(gaugeManagerAddress)});

    //deploy bribeV3
    const bribeV3Address_ = bribeFactoryV3Version === deploymentVersion? bribeFactoryV3Address: await deployBribeV3Factory(voterV3Address_, gaugeManagerAddress_, permissionRegistryAddress_, tokenHandlerAddress_);
    await verifyStep('verifyBribeFactoryV3', async () => {await verifyContractProxy("bribeFactoryV3", bribeV3Address_, [])});

    await runStep('setBribeFactoryInGaugeManager', async () => {await setBribeFactoryInGaugeManager(bribeV3Address_, gaugeManagerAddress_)});

    //setVoter in bribe factory
    await runStep('setVoterBribeV3', async () => {await setVoterBribeV3(voterV3Address_, bribeV3Address_)});


    const algebraPoolAPIStorageAddress_ = algebraPoolAPIStorageVersion === deploymentVersion ? algebraPoolAPIStorageAddress: await deployAlgebraPoolAPIStorage(permissionRegistryAddress_);
    await verifyStep('verifyAlgebraPoolAPIStorage', async () => {await verifyContractProxy("AlgebraPoolAPIStorage", algebraPoolAPIStorageAddress_, [])});

    const algebraPoolAbiAddress_ = algebraPoolAPIVersion === deploymentVersion? algebraPoolAPIAddress: await deployAlgebraPoolAbi(voterV3Address_, gaugeManagerAddress_);
    await verifyStep('verifyAlgebraPoolAPI', async () => {await verifyContractProxy("AlgebraPoolAPI", algebraPoolAbiAddress_, [])});

    // await verifyStep('setAlgebraPoolApiInGaugeFactoryCL', async () => {await setAlgebraPoolApiInGaugeFactoryCL(algebraPoolAPIStorageAddress_, gaugeFactoryCLAddress)});

    //deploy router V2
    const routerV2Address_ = routerV2Version === deploymentVersion? routerV2Address: await deployRouterV2(pairFactoryAddress_, algebraPoolAPIStorageAddress_);
    await verifyStep('verifyRouterV2', async () => {await verifyContract("RouterV2", routerV2Address_, [pairFactoryAddress_, wETH, swapRouter, algebraFactory, quoterV2, algebraPoolAPIStorageAddress_])});

    // // blackholeV2Abi deployment
    const blackholeV2AbiAddress_ = blackholePairAPIV2Version === deploymentVersion? blackholePairAPIV2Address: await deployBloackholeV2Abi(voterV3Address_, routerV2Address_, gaugeManagerAddress_, pairFactoryAddress_, algebraPoolAPIStorageAddress_);
    await verifyStep('verifyBlackholePairAPIV2', async () => {await verifyContractProxy("BlackholePairAPIV2", blackholeV2AbiAddress_, [])});

    //deploy rewardsDistributor
    const rewardsDistributorAddress_ = rewardsDistributorVersion === deploymentVersion? rewardsDistributorAddress: await deployRewardsDistributor(votingEscrowAddress_);
    await verifyStep('verifyRewardsDistributor', async () => {await verifyContract("RewardsDistributor", rewardsDistributorAddress_, [votingEscrowAddress_])});

    //deploy veNFT
    const veNFTAddress = veNFTAPIVersion === deploymentVersion? veNFTAPIAddress: await deployveNFT(voterV3Address_, rewardsDistributorAddress_, gaugeFactoryAddress_, gaugeFactoryCLAddress_, gaugeManagerAddress_);
    await verifyStep('verifyVeNFT', async () => {await verifyContractProxy("VeNFT", veNFTAddress, [])});

    //deploy minterUpgradable
    const minterUpgradableAddress_ = minterUpgradeableVersion === deploymentVersion? minterUpgradeableAddress: await deployMinterUpgradeable(votingEscrowAddress_, gaugeManagerAddress_, rewardsDistributorAddress_);
    await verifyStep('verifyMinterUpgradable', async () => {await verifyContractProxy("MinterUpgradable", minterUpgradableAddress_, [])});

    //set MinterUpgradable in VoterV3
    await runStep('setMinterUpgradableInGaugeManager', async () => {await setMinterUpgradableInGaugeManager(gaugeManagerAddress_, minterUpgradableAddress_)});

    //set minter in black
    await runStep('setMinterInBlack', async () => {await setMinterInBlack(minterUpgradableAddress_, blackAddress)});

    // // await logActivePeriod();

    // call _initialize
    await runStep('initializeMinter', async () => {await initializeMinter(minterUpgradableAddress_)});

    // // await logActivePeriod();

    //set minter in reward distributer in depositer
    await runStep('setMinterInRewardDistributer', async () => {await setMinterInRewardDistributer(minterUpgradableAddress_, rewardsDistributorAddress_)}); //set as depositor

    // deploy epoch controller here.
    const epochControllerAddress_ = epochControllerVersion === deploymentVersion? epochControllerAddress: await deployEpochController(minterUpgradableAddress_, permissionRegistryAddress_, gaugeManagerAddress_);
    await verifyStep('verifyEpochController', async () => {await verifyContractProxy("EpochController", epochControllerAddress_, [])});

    // set chainlink address
    // TODO: separate out the setting of chalink address
    // await setChainLinkAddress(epochControllerAddress, "0x859e9da8b3FBEEd0Dff61a2262B6AEB66081413A", "0x9e12f224D5077a78a84580c8Eb0D499260fC45d5");

    //set voterV3 in voting escrow
    await runStep('setVoterV3InVotingEscrow', async () => {await setVoterV3InVotingEscrow(voterV3Address_, votingEscrowAddress_)});

    await runStep('pushDefaultRewardToken', async () => {await pushDefaultRewardToken(bribeV3Address_, blackAddress)});

    //deploy blackClaim
    const blackClaimAddress_ = blackClaimsVersion === deploymentVersion? blackClaimsAddress: await deployBlackClaim(votingEscrowAddress_, ownerAddress_);
    await verifyStep('verifyBlackClaim', async () => {await verifyContract("BlackClaim", blackClaimAddress_, [ownerAddress_, votingEscrowAddress_])});

    //deploy fixedAuction
    const fixedAuctionAddress_ = fixedAuctionVersion === deploymentVersion? fixedAuctionAddress: await deployFixedAuction();
    await verifyStep('verifyFixedAuction', async () => {await verifyContract("FixedAuction", fixedAuctionAddress_, [])});

    //deploy auctionFactory
    const auctionFactoryAddress_ = auctionFactoryVersion === deploymentVersion? auctionFactoryAddress:  await deployAuctionFacotry(fixedAuctionAddress_);
    await verifyStep('verifyAuctionFactory', async () => {await verifyContractProxy("AuctionFactory", auctionFactoryAddress_, [])});

    //deploy genesisFactory
    const genesisFactoryAddress_ = genesisPoolFactoryVersion === deploymentVersion? genesisPoolFactoryAddress:  await deployGenesisFactory(tokenHandlerAddress_);
    await verifyStep('verifyGenesisFactory', async () => {await verifyContractProxy("GenesisFactory", genesisFactoryAddress_, [])});

    //deploy genesisManager
    const genesisManagerAddress_ = genesisPoolManagerVersion === deploymentVersion? genesisPoolManagerAddress:  await deployGenesisManager(epochControllerAddress_, routerV2Address_, permissionRegistryAddress_, gaugeManagerAddress_, pairFactoryAddress_, genesisFactoryAddress_, auctionFactoryAddress_, tokenHandlerAddress_);
    await verifyStep('verifyGenesisManager', async () => {await verifyContractProxy("GenesisManager", genesisManagerAddress_, [])});

    //set genesisManager in genesisFactory
    await runStep('setGenesisManagerInGenesisFactory', async () => {await setGenesisManagerInGenesisFactory(genesisFactoryAddress_, genesisManagerAddress_)});

    //assign genesisManager role of GENESIS_MANAGER
    await runStep('setGenesisManagerRole', async () => {await setGenesisManagerRole(permissionRegistryAddress_, genesisManagerAddress_)});

    //set genesisManager in VoterV3
    await runStep('setGenesisPoolManagerInGaugeManager', async () => {await setGenesisPoolManagerInGaugeManager(gaugeManagerAddress_, genesisManagerAddress_)});

    //set genesisManager in pairFactory
    await runStep('setGenesisPoolManagerInPairFactory', async () => {await setGenesisPoolManagerInPairFactory(pairFactoryAddress_, genesisManagerAddress_)});

    //set genesisManager in epochController
    await runStep('setGenesisPoolManagerInEpochController', async () => {await setGenesisPoolManagerInEpochController(epochControllerAddress_, genesisManagerAddress_)});

    //deploy GenesisApi

    const genesisAPiAddress_ = genesisPoolAPIVersion === deploymentVersion? genesisPoolAPIAddress:  await deployGenesisApi(genesisManagerAddress_, genesisFactoryAddress_);
    await verifyStep('verifyGenesisAPi', async () => {await verifyContractProxy("GenesisAPi", genesisAPiAddress_, [])});



    // //deploy TokenApi
    const tokenApiAddress_ = tokenAPIVersion === deploymentVersion? tokenAPIAddress:   await deployTokenApi(tokenHandlerAddress);
    await verifyStep('verifyTokenAPi', async () => {await verifyContractProxy("TokenAPi", genesisAPiAddress_, [])});

    // await deployBlackGovernor(votingEscrowAddress, minterUpgradableAddress);

    generateConstantFile("Pair", "");
    generateConstantFile("GaugeV2", "");
    generateConstantFile("GenesisPool", "");
    generateConstantFile("Bribe", "");
    generateConstantFile("GaugeCL", "");
}

main()
    .then(
        () => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
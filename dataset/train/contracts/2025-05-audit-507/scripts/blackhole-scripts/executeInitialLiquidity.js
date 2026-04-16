const { ethers } = require("hardhat")
const { bribeFactoryV3Abi } = require('../../generated/bribe-factory-v3')
const { permissionsRegistryAbi } = require('../../generated/permissions-registry')
const { ZERO_ADDRESS } = require("@openzeppelin/test-helpers/src/constants.js");
const { blackholePairAPIV2Abi, blackholePairAPIV2Address } = require('../../generated/blackhole-pair-apiv2');
const { voterV3Abi, voterV3Address } = require('../../generated/voter-v3');
const { minterUpgradeableAbi } = require('../../generated/minter-upgradeable');
const { epochControllerAbi } = require('../../generated/epoch-controller')
const { blackAbi } = require('../blackhole-scripts/gaugeConstants/black')
const { votingEscrowAbi } = require('../../generated/voting-escrow');
const { rewardsDistributorAbi } = require('../../generated/rewards-distributor');
const { pairFactoryAbi } = require('../../generated/pair-factory');
const { genesisPoolFactoryAbi } = require('../../generated/genesis-pool-factory');
const { addLiquidity } = require('../blackhole-scripts/addLiquidity')
const { BigNumber } = require("ethers");

const { generateConstantFile } = require('../blackhole-scripts/postDeployment/generator');
const fs = require('fs');
const path = require('path');

const avaxGasLimit = 15000000;

// Load the JSON file
const jsonFilePath = path.join(__dirname, '../deployment-flows/token-constants/deploying-tokens.json'); // Adjust the path
const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
// Extract addresses
const addresses = jsonData.map(obj => obj.address);

const deployedTokens = require('../deployment-flows/token-constants/deployed-tokens.json');
const { routerV2Abi } = require("../../generated/router-v2");
const {routerV2Address} = require("../../generated/router-v2");
const { gaugeManagerAbi, gaugeManagerAddress } = require("../../generated/gauge-manager");
const { create } = require("domain");
const blackAddress = deployedTokens[0].address;
console.log("Extracted Addresses: ", addresses);

const createGauges = async(voterV3Address, blackholeV2AbiAddress) => {

    // creating gauge for pair bwn - token one and token two - basic volatile pool
    const blackHoleAllPairContract =  await ethers.getContractAt(blackholePairAPIV2Abi, blackholeV2AbiAddress);
    const allPairs = await blackHoleAllPairContract.getAllPair(owner.address, BigInt(100), BigInt(0));
    const pairs = allPairs[2];

    const gaugeManager = await ethers.getContractAt(gaugeManagerAbi, gaugeManagerAddress)

    for(const p of pairs){
        const currentAddress = p[0];
        if(currentAddress === ZERO_ADDRESS)
            break;

        console.log("current pair ", currentAddress);
        const currentGaugeAddress = await gaugeManager.gauges(currentAddress);
        console.log("currentGaugeAddress", currentGaugeAddress);
        if(currentGaugeAddress === ZERO_ADDRESS){
            const createGaugeTx = await gaugeManager.createGauge(currentAddress, BigInt(0));
            await createGaugeTx.wait()

        }
    }
    console.log('done creation of gauge tx\n')
}

async function main () {

    accounts = await ethers.getSigners();
    owner = accounts[0];
    const ownerAddress = owner.address;
    console.log("Black token address is: ", blackAddress);
    console.log("Owner address is: ", ownerAddress);
    // createPairs two by default
    const wavax = "0xb3B3CbEd8243682845C2ff23Ea1FD48e6144E34F";
    const dai = "0xBb0aB77Cf6E08f03e4cceABbA163860Cd1848df7";
    const black = blackAddress;
    const superT = "0xdDC18bF5f716742C746F156333f86E9c5bFbeC36";
    const champT = "0x78dC6A039dDd938F70d8c50C2EF3C522BA0FB1e5";
    const xai = "0x7017d1489ba5902D7b5a9e74BBA8a3eA5addcE88";
    const virtuals = "0x41B3601B0e6becE4D14595979E041Ec6878777FC";
    const ygg = "0xaf59662042247281E08f100Ce43bf647D39A2FA5";
    const usdc = "0x0ea98bf8ff474639f6cbeb4c4bdd1ba74aa9a4a4";


    // await addLiquidity(routerV2Address, usdc, dai, 180500, 180500);
    // await addLiquidity(routerV2Address, usdc, black, 1805, 5356);
    // await addLiquidity(routerV2Address, usdc, champT, 180500, 1071200);
    // await addLiquidity(routerV2Address, usdc, superT, 180500, 802400);
    // await addLiquidity(routerV2Address, usdc, xai, 180500, 957634200);
    // await addLiquidity(routerV2Address, usdc, ygg, 180500, 1059670);
    // await addLiquidity(routerV2Address, usdc, virtuals, 180500, 205850);
    // await addLiquidity(routerV2Address, black, dai, 5356, 1500);
    // await addLiquidity(routerV2Address, black, superT, 3000, 8160);

    console.log("DONE ADDING LIQUIDITY");

    await createGauges(voterV3Address, blackholePairAPIV2Address);

}

main()
    .then(
        () => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

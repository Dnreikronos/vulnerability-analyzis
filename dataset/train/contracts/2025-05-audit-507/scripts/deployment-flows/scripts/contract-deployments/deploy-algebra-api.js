const { gaugeManagerAddress } = require("../../../../generated/gauge-manager");
const { voterV3Address } = require("../../../../generated/voter-v3");
const { generateConstantFile } = require("../../../blackhole-scripts/postDeployment/generator");
const { algebraFactory, nonfungiblePositionManager } = require("./algebra-addresses");

const deployBlackholeV2Abi = async(voterV3Address, gaugeManagerAddress)=>{
    try {
        const algebraPairAPIContract = await ethers.getContractFactory("AlgebraPoolAPI");
        const input = [voterV3Address, algebraFactory, nonfungiblePositionManager, gaugeManagerAddress]
        const algebraPoolAPI = await upgrades.deployProxy(algebraPairAPIContract, input, {initializer: 'initialize', timeout: 180000, pollingInterval: 3000, gasLimit: 21000000});
        txDeployed = await algebraPoolAPI.deployed();
        console.log('algebraPoolAPI : ', algebraPoolAPI.address)
        generateConstantFile("AlgebraPoolAPI", algebraPoolAPI.address);
    } catch (error) {
        console.log("error in deploying deployBloackholeV2Abi: ", error);
        process.exit(1);
    }
}

async function main () {
    const tx = await deployBlackholeV2Abi(voterV3Address, gaugeManagerAddress)
}

main().then(() => console.log("Done!"))
const { algebraPoolAPIAddress } = require("../../../../generated/algebra-pool-api");
const { gaugeManagerAddress } = require("../../../../generated/gauge-manager");
const { pairFactoryAddress } = require("../../../../generated/pair-factory");
const { routerV2Address } = require("../../../../generated/router-v2");
const { voterV3Address } = require("../../../../generated/voter-v3");
const { generateConstantFile } = require("../../../blackhole-scripts/postDeployment/generator");
const { algebraFactory, quoterV2 } = require("./algebra-addresses");

const deployBlackholeV2Abi = async(voterV3Address, routerV2Address, gaugeManagerAddress, pairFactoryAddress, algebraPoolApiAddress)=>{
    try {
        const blackholePairAbiV2Contract = await ethers.getContractFactory("BlackholePairAPIV2");
        const input = [voterV3Address, routerV2Address, gaugeManagerAddress, pairFactoryAddress, algebraFactory, quoterV2, algebraPoolApiAddress]
        const blackHolePairAPIV2Factory = await upgrades.deployProxy(blackholePairAbiV2Contract, input, {initializer: 'initialize', timeout: 180000, pollingInterval: 3000});
        txDeployed = await blackHolePairAPIV2Factory.deployed();
        console.log('BlackHolePairAPIV2Factory : ', blackHolePairAPIV2Factory.address)
        generateConstantFile("BlackholePairAPIV2", blackHolePairAPIV2Factory.address);
        return blackHolePairAPIV2Factory.address;
    } catch (error) {
        console.log("error in deploying deployBloackholeV2Abi: ", error);
        process.exit(1);
    }
}

async function main () {
    const tx = await deployBlackholeV2Abi(voterV3Address, routerV2Address, gaugeManagerAddress, pairFactoryAddress, algebraPoolAPIAddress)
}

main().then(() => console.log("Done!"))
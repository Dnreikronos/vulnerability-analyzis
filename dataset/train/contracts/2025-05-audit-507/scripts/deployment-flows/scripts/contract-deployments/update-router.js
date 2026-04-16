const { auctionFactoryAddress } = require("../../../../generated/auction-factory");
const { epochControllerAddress } = require("../../../../generated/epoch-controller");
const { genesisPoolFactoryAddress } = require("../../../../generated/genesis-pool-factory");
const { genesisPoolManagerAddress, genesisPoolManagerAbi } = require("../../../../generated/genesis-pool-manager");
const { pairFactoryAddress } = require("../../../../generated/pair-factory");
const { permissionsRegistryAddress } = require("../../../../generated/permissions-registry");
const { tokenHandlerAddress } = require("../../../../generated/token-handler");
const { voterV3Address } = require("../../../../generated/voter-v3");
const { generateConstantFile } = require("../../../blackhole-scripts/postDeployment/generator");
const {swapRouter, algebraFactory, quoterV2} = require("./algebra-addresses");
const {algebraPoolAPIAddress} = require("../../../../generated/algebra-pool-api");
const {gaugeManagerAddress} = require("../../../../generated/gauge-manager");

async function main () {

    const wETH = '0xb3B3CbEd8243682845C2ff23Ea1FD48e6144E34F'
    const routerV2Contract = await ethers.getContractFactory("RouterV2");
    const routerV2 = await routerV2Contract.deploy(pairFactoryAddress, wETH, swapRouter, algebraFactory, quoterV2, algebraPoolAPIAddress);
    txDeployed = await routerV2.deployed();
    console.log("routerV2 address: ", routerV2.address)
    generateConstantFile("RouterV2", routerV2.address);
    const blackholePairAbiV2Contract = await ethers.getContractFactory("BlackholePairAPIV2");
    const input = [voterV3Address, routerV2.address, gaugeManagerAddress, pairFactoryAddress, algebraFactory, quoterV2, algebraPoolAPIAddress];
    const blackHolePairAPIV2Factory = await upgrades.deployProxy(blackholePairAbiV2Contract, input, {initializer: 'initialize', timeout: 180000, pollingInterval: 3000});
    txDeployed = await blackHolePairAPIV2Factory.deployed();
    console.log('BlackHolePairAPIV2Factory : ', blackHolePairAPIV2Factory.address)
    generateConstantFile("BlackholePairAPIV2", blackHolePairAPIV2Factory.address);
    const GenesisPoolManager = await ethers.getContractFactory("GenesisPoolManager");

    // 2️⃣— Address of your live proxy (same one you got back from deployProxy)
    const proxyAddress = genesisPoolManagerAddress; 
    if (!proxyAddress) {
        throw new Error("Please set GENESIS_MANAGER_PROXY in your env to the proxy’s address");
    }

    // 3️⃣— Call upgradeProxy (initializer NOT re-run)
    console.log("🔃 Upgrading proxy at", proxyAddress, "to new implementation…");
    const upgraded = await upgrades.upgradeProxy(
        proxyAddress,
        GenesisPoolManager,
        {
        timeout: 180_000,
        pollingInterval: 3_000
        }
    );

    // 4️⃣— Wait for it, then verify
    await upgraded.deployed();

    console.log("Genesis manager address : ", upgraded.address)
    generateConstantFile("GenesisPoolManager", upgraded.address);
    // return genesisManager.address;
    const updateRouter = await upgraded.setRouter(routerV2.address)
    await updateRouter.wait();
    console.log("upgraded router: ", await upgraded.router());
    // return routerV2.address;
}

main().then(() => console.log("Done!"))

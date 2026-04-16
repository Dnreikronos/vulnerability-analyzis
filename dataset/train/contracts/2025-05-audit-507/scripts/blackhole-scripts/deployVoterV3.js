const { ethers } = require("hardhat")
const { votingEscrowAddress } = require('./gaugeConstants/voting-escrow')
const { gaugeFactoryV2Address } = require('./gaugeConstants/gauge-factory-v2')
const { bribeFactoryV3Address } = require('./gaugeConstants/bribe-factory-v3')
const { permissionsRegistryAddress } = require('./gaugeConstants/permissions-registry')
const { pairFactoryAddress, tokenOne, tokenTwo, tokenThree, tokenFour, tokenFive, tokenSix, tokenSeven, tokenEight, tokenNine, tokenTen } = require("../V1/dexAbi");

async function main () {
    data = await ethers.getContractFactory("VoterV3");
    accounts = await ethers.getSigners();
    owner = accounts[0]
    const ownerAddress = owner.address;
    // function initialize(address __ve, address _pairFactory, address  _gaugeFactory, address _bribes) initializer public {
    inputs = [votingEscrowAddress, pairFactoryAddress , gaugeFactoryV2Address, bribeFactoryV3Address]
    VoterV3 = await upgrades.deployProxy(data, inputs, {initializer: 'initialize'});
    txDeployed = await VoterV3.deployed();
    console.log('VoterV3.address: ', VoterV3.address)
    // function _init(address[] memory _tokens, address _permissionsRegistry, address _minter) external 
    const listOfTokens = [tokenOne, tokenTwo, tokenThree, tokenFour, tokenFive, tokenSix, tokenSeven, tokenEight, tokenNine, tokenTen];
    const initializeVoter = await VoterV3._init(listOfTokens, permissionsRegistryAddress, ownerAddress)
    console.log("initializeVoter", initializeVoter);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});

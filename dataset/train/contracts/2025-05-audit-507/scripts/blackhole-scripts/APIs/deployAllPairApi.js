const { ethers } = require("hardhat")
const { voterV3Address } = require("../gaugeConstants/voter-v3");

async function main () {

    // data = await ethers.getContractFactory("BlackHolePairAPI");
    // console.log('deploying...')
    // const blackHolePairAPIFactory = await upgrades.deployProxy(data, [pairFactoryAddress], {initializer: 'initialize'});
    // await blackHolePairAPIFactory.deployed();
    // console.log("BlackHolePairAPIFactory : ", blackHolePairAPIFactory.address);

    data = await ethers.getContractFactory("BlackholePairAPIV2");
    console.log('deploying...')
    input = [voterV3Address]
    const blackHolePairAPIV2Factory = await upgrades.deployProxy(data, input, {initializer: 'initialize'});
    txDeployed = await blackHolePairAPIV2Factory.deployed();
    console.log('BlackHolePairAPIV2Factory : ', blackHolePairAPIV2Factory.address)
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

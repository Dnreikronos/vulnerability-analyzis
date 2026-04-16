const { ethers } = require("hardhat")
const { permissionsRegistryAddress } = require('./gaugeConstants/permissions-registry')
const { ZERO_ADDRESS } = require("@openzeppelin/test-helpers/src/constants.js");


async function main () {
    // data = await ethers.getContractFactory("GaugeFactory");
    // input = [permissionRegistry]
    // gaugeFactory = await upgrades.deployProxy(data, input, {initializer: 'initialize'});
    // txDeployed = await gaugeFactory.deployed();
    // console.log("gaugeFactory: ", gaugeFactory.address)

    data = await ethers.getContractFactory("BribeFactoryV3");
    console.log('deploying...')
    input = [ZERO_ADDRESS, permissionsRegistryAddress]
    BribeFactoryV3 = await upgrades.deployProxy(data, input, {initializer: 'initialize'});
    txDeployed = await BribeFactoryV3.deployed();
    console.log('deployed bribefactory v3: ', BribeFactoryV3.address)
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

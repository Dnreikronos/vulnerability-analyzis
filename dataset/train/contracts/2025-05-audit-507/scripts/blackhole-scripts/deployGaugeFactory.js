const { ethers } = require("hardhat")
const { permissionsRegistryAddress } = require("./gaugeConstants/permissions-registry")

async function main () {
    data = await ethers.getContractFactory("GaugeFactory");
    input = [permissionsRegistryAddress]
    GaugeFactory = await upgrades.deployProxy(data, input, {initializer: 'initialize'});
    txDeployed = await GaugeFactory.deployed();
    console.log('deployed GaugeFactory: ', GaugeFactory.address, txDeployed)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

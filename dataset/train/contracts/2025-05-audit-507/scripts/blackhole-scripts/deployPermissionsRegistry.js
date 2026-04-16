const { ethers } = require("hardhat")

async function main () {
    data = await ethers.getContractFactory("PermissionsRegistry");
    permissionsRegistry = await data.deploy();
    txDeployed = await permissionsRegistry.deployed();
    console.log("permissionsRegistry: ", permissionsRegistry.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});

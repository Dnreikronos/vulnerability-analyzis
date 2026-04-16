
const { ethers  } = require('hardhat');

const { permissionRegistryAbi, permissionsRegistryAddress } = require('./gaugeConstants/permissions-registry')



async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]
    const adminAddress = owner.address;

    const permissionRegistryContract = await ethers.getContractAt(permissionRegistryAbi, permissionsRegistryAddress);
    
    const hasRole = await permissionRegistryContract.hasRole("GOVERNANCE", adminAddress)
    console.log('has role', hasRole)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
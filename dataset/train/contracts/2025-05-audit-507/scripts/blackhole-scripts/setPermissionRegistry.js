const { ethers } = require("hardhat");
const { permissionsRegistryAddress } = require("../../generated/permissions-registry");
const { gaugeManagerAbi, gaugeManagerAddress } = require("../../generated/gauge-manager");


async function main () {
    const owner = await ethers.getSigners();
    const GaugeManager = await ethers.getContractAt(gaugeManagerAbi, gaugeManagerAddress);
    const tx = await GaugeManager.setPermissionsRegistry(permissionsRegistryAddress);
    console.log(tx)
    // await tx.wait();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});

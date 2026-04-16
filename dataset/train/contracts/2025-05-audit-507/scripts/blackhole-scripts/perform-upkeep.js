const { epochControllerAbi, epochControllerAddress } = require("../../generated/epoch-controller");
const { permissionsRegistryAbi, permissionsRegistryAddress } = require("../../generated/permissions-registry");

async function main () {
    const permissions = await ethers.getContractAt(permissionsRegistryAbi, permission)
    const epochController = await ethers.getContractAt(epochControllerAbi, epochControllerAddress);
    const updatePeriod = await epochController.performUpkeep("0x");
    await updatePeriod.wait();
    console.log("Finished!")
}

main() 
    .then(() => console.log("Done!"))
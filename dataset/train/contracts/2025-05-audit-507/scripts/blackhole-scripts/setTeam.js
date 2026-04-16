const { ethers } = require("hardhat");
const { minterUpgradeableAbi, minterUpgradeableAddress } = require("../../generated/minter-upgradeable");

async function main () {
    const owner = await ethers.getSigners();
    const MinterUpgradeableContract = await ethers.getContractAt(minterUpgradeableAbi, minterUpgradeableAddress);
    const tx = await MinterUpgradeableContract.setTeam("0xC0071bb38544dA9FE162FB39B1914ABfe8B082dF");
    await tx.wait();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});

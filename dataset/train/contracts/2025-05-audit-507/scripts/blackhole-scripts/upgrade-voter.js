const { ethers, upgrades } = require("hardhat");
const { voterV3Abi, voterV3Address } = require("../../generated/voter-v3");
const { autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress } = require("../../envFiles/devnet/generated/auto-voting-escrow-manager");

async function main() {
    // Get signer
    const [deployer] = await ethers.getSigners();
    console.log("Upgrading contract with account:", deployer.address);

    // Get proxy instance (existing contract)
    const proxy = await ethers.getContractAt(voterV3Abi, voterV3Address);

    // Get current implementation address
    const adminAddress = await upgrades.erc1967.getAdminAddress(proxy.address);
    const implBefore = await upgrades.erc1967.getImplementationAddress(proxy.address);
    console.log("Admin address:", adminAddress);
    console.log("Implementation BEFORE upgrade:", implBefore);
    const voters = await ethers.getContractAt(voterV3Abi, voterV3Address);

    console.log("owner: ", await voters.owner())
    // Load new implementation factory
    const VoterV3 = await ethers.getContractFactory("VoterV3");

    // Perform the upgrade
    const upgraded = await upgrades.upgradeProxy(proxy.address, VoterV3);
    await upgraded.deployed();

    console.log("Upgrade completed");

    // Get new implementation address
    const implAfter = await upgrades.erc1967.getImplementationAddress(proxy.address);
    console.log("Implementation AFTER upgrade:", implAfter);

    // Optional: sanity check
    console.log("Contract version check (if method exists):");
    try {
        console.log("Version:", await upgraded.version?.());
    } catch (err) {
        console.log("No version() function available");
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

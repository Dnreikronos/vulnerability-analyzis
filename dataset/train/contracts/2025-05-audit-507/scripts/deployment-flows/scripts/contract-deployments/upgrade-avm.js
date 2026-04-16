const { ethers, upgrades } = require("hardhat");
const { voterV3Address } = require("../../../../generated/voter-v3");

async function main() {
  // Replace with your deployed proxy address
  const proxyAddress = voterV3Address;

  // Get the new contract version (e.g., VoterV3)
  const VoterV3 = await ethers.getContractFactory("VoterV3");

  // Upgrade the contract
  console.log("Upgrading contract...");
  const upgraded = await upgrades.upgradeProxy(proxyAddress, VoterV3);

  console.log("Contract upgraded at:", upgraded.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error upgrading contract:", error);
    process.exit(1);
  });

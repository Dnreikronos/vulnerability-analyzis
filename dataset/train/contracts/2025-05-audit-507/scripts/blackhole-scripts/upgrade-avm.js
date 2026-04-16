const { ethers, upgrades } = require("hardhat");
const { autoVotingEscrowManagerAddress } = require("../../generated/auto-voting-escrow-manager");
const { getImplementationAddress } = require("@openzeppelin/upgrades-core");

async function main() {
  console.log("Starting AVM upgrade...");

  const proxyAddress = autoVotingEscrowManagerAddress; // or use the hardcoded address if needed

  // Log current implementation address
  const preImplAddress = await getImplementationAddress(ethers.provider, proxyAddress);
  console.log("Implementation address BEFORE upgrade:", preImplAddress);

  // Get the new contract factory
  const AVMNew = await ethers.getContractFactory("AutoVotingEscrowManager");

  // Upgrade the proxy to the new implementation
  const upgraded = await upgrades.upgradeProxy(proxyAddress, AVMNew);

  console.log("AVM successfully upgraded at proxy address:", upgraded.address);

  // Log new implementation address
  const postImplAddress = await getImplementationAddress(ethers.provider, upgraded.address);
  console.log("Implementation address AFTER upgrade:", postImplAddress);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Upgrade failed:", err);
    process.exit(1);
  });

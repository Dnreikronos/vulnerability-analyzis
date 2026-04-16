const { ethers, upgrades } = require("hardhat");
const { getImplementationAddress } = require("@openzeppelin/upgrades-core");

// Replace with your actual proxy address
const { gaugeManagerAddress } = require("../../generated/gauge-manager");

async function main() {
  console.log("🔁 Starting GaugeManager upgrade...");

  const proxyAddress = gaugeManagerAddress;
  const voterFactoryLibAddress = "0xBFa6a48F3ddD75d78E66254Eb154638b88ee4527"; // Your deployed library address

  // Log current implementation address
  const preImplAddress = await getImplementationAddress(ethers.provider, proxyAddress);
  console.log("📍 Implementation address BEFORE upgrade:", preImplAddress);

  // Prepare the new contract factory with the linked library
  const GaugeManagerNew = await ethers.getContractFactory("GaugeManager", {
    libraries: {
      VoterFactoryLib: voterFactoryLibAddress,
    },
  });

  // Perform the upgrade
  const upgraded = await upgrades.upgradeProxy(proxyAddress, GaugeManagerNew, {
    libraries: {
      VoterFactoryLib: voterFactoryLibAddress,
    },
    unsafeAllowLinkedLibraries: true, // 👈 This is required
  });
  

  console.log("✅ GaugeManager successfully upgraded at proxy address:", upgraded.address);

  // Log new implementation address
  const postImplAddress = await getImplementationAddress(ethers.provider, upgraded.address);
  console.log("📍 Implementation address AFTER upgrade:", postImplAddress);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Upgrade failed:", err);
    process.exit(1);
  });

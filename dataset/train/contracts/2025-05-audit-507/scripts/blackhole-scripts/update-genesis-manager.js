const { ethers, upgrades } = require("hardhat");
const { genesisPoolManagerAddress } = require("../../generated/genesis-pool-manager");

async function main() {
  const proxyAddress = genesisPoolManagerAddress;

  console.log("Starting upgrade for GenesisPoolManager...");

  const GenesisPoolManagerV2 = await ethers.getContractFactory("GenesisPoolManager");
  
  // use forceImport when faced with issue of not available addresses on .openzeppelin file
//   const upgraded = await upgrades.forceImport(proxyAddress, GenesisPoolManagerV2);

//   console.log("GenesisPoolManager upgraded at proxy address:", upgraded.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

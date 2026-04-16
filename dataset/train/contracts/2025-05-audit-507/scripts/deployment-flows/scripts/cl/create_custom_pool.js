const { ethers } = require("hardhat");
const { customPoolDeployerAbi } = require("../../../../generated/custom-pool-deployer");
const { contracts } = require("../../../../deployments/custom-pool-deployers.json");
// const { algebraFactoryAbi } = require("../../../../generated/algebra-factory");
const { default: BigNumber } = require("bignumber.js");

async function main() {
  accounts = await ethers.getSigners();
  const ownerAddress = accounts[0].address;
  console.log("ownerAddress : ", ownerAddress);
  // create pool with tickSpacing 1
  const token0 = "0x78dC6A039dDd938F70d8c50C2EF3C522BA0FB1e5";
  const token1 = "0xdDC18bF5f716742C746F156333f86E9c5bFbeC36";

  const customPoolDeployerTickSpacing1 = await ethers.getContractAt(customPoolDeployerAbi, contracts.tickSpacing_20);
  const tx = await customPoolDeployerTickSpacing1.createCustomPool(
    ownerAddress,
    token0,
    token1,
    "0x",
    BigNumber(1)
      .sqrt()
      .multipliedBy(2 ** 96)
      .toFixed(0)
  );
  const pool = await tx.wait();
  console.log("deployer address " + contracts.tickSpacing_20, pool);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

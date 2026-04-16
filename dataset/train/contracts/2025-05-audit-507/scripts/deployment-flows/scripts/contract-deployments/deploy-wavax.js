// const { generateConstantFile } = require("../../../blackhole-scripts/postDeployment/generator");

// async function main () {
    // const wavaxContract = await ethers.getContractFactory("WAVAX");
    // const deployedWAVAX = await wavaxContract.deploy();
    // await deployedWAVAX.deployed();
    // console.log("deployed address: ", deployedWAVAX.address);
    // generateConstantFile("WAVAX", deployedWAVAX.address)
    
// }

// main().then(() => console.log("Done!"));

// scripts/test-deposit.js
const { ethers } = require("hardhat");
const { wAVAXAbi, wAVAXAddress } = require("../../../../generated/wavax.js"); // adjust path as needed

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Using deployer:", deployer.address);

  // Connect to WAVAX
  const wavax = await ethers.getContractAt(wAVAXAbi, wAVAXAddress);
  console.log("WAVAX @", wavax.address);

  // 1) Read initial WAVAX balance
  const before = await wavax.balanceOf(deployer.address);
  console.log("WAVAX balance before:", ethers.utils.formatEther(before));

  // 2) Deposit 1 AVAX → get 1 WAVAX
  const depositAmount = ethers.utils.parseEther("0.01");
  const tx = await wavax.deposit({ value: depositAmount });
  console.log("Sending deposit tx...", tx.hash);
  await tx.wait();
  console.log("Deposit confirmed");

  // 3) Read balances again
  const after = await wavax.balanceOf(deployer.address);
  console.log("WAVAX balance after:", ethers.utils.formatEther(after));

  // 4) Check totalSupply (should have increased by 1)
  const supply = await wavax.totalSupply();
  console.log("totalSupply:", ethers.utils.formatEther(supply));
}

main()
  .then(() => console.log("✅ Done"))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

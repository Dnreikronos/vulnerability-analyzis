const { ethers } = require("hardhat");
const { autoVotingEscrowManagerAddress } = require("../../generated/auto-voting-escrow-manager");
const { autoVotingEscrowAbi } = require("../../generated/auto-voting-escrow")

const WINDOW_SIZE = 100; // Adjust as needed
const IS_VOTE = true;    // Toggle between vote mode or not

// Helper: fetch lock count from a single AVM
async function getTokenIdCount(avmContract) {
  const count = await avmContract.getLockCount();
  return count.toNumber();
}

// Helper: fetch lock counts for all AVMs
async function getTokenIdCountForAVMs(avmAddresses, signerOrProvider, abi) {
  const tokenIdCounts = [];

  for (let i = 0; i < avmAddresses.length; i++) {
    const avm = new ethers.Contract(avmAddresses[i], abi, signerOrProvider);
    const count = await getTokenIdCount(avm);
    tokenIdCounts.push(count);
  }

  return tokenIdCounts;
}

async function main() {
  const [deployer] = await ethers.getSigners();

  const avmManager = await ethers.getContractAt(
    "AutoVotingEscrowManager",
    autoVotingEscrowManagerAddress,
    deployer
  );

  // Step 1: Fetch AVM addresses
  const avmAddresses = await avmManager.getAVMs();
  console.log("📦 AVM addresses:", avmAddresses);

  // Step 2: Fetch token lock counts using helper
  const tokenIdCounts = await getTokenIdCountForAVMs(avmAddresses, deployer, autoVotingEscrowAbi);
  console.log("🔢 Token ID counts for AVMs:", tokenIdCounts);

  // Step 3: Iterate through each AVM and process in windows
  for (let i = 0; i < tokenIdCounts.length; i++) {
    const count = tokenIdCounts[i];
    console.log(`\n🔁 Processing AVM #${i} (${avmAddresses[i]}) with ${count} tokenIds`);

    for (let j = 0; j < count; j += WINDOW_SIZE) {
      const startWindow = j;
      const endWindow = Math.min(j + WINDOW_SIZE - 1, count - 1);
      console.log(`➡️ Window: [${startWindow}, ${endWindow}]`);

      try {
        const tx = await avmManager.performLockAction(i, startWindow, endWindow, IS_VOTE);
        await tx.wait();
        console.log(`✅ Executed tx: ${tx.hash}`);
      } catch (err) {
        console.error(`❌ Error executing window [${startWindow}, ${endWindow}]:`, err);
      }
    }
  }

  console.log("\n🎉 Finished processing all AVM locks.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("🚨 Fatal error:", err);
    process.exit(1);
  });

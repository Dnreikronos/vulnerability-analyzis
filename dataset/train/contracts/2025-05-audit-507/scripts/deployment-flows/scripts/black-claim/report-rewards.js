const axios = require('axios');
const { blackClaimsAddress, blackClaimsAbi } = require('../../../../generated/black-claims');
const { blackAddress, blackAbi } = require("../../../../generated/black");

const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function getRewardsDataJson() {
  const REWARDS_DATA_URL = process.env.REWARDS_DATA_URL??null;
  if (REWARDS_DATA_URL) {

    const response = await axios.get(REWARDS_DATA_URL);
    return response.data;
  }
  else {
    const rewardsFilePath = path.join(__dirname, "rewards-data.json");
    return JSON.parse(fs.readFileSync(rewardsFilePath, "utf-8"))
  }
}


async function main() {
  const accounts = await ethers.getSigners();
  const owner = accounts[0];
  const ownerAddress = owner.address;
  console.log("Owner address:", ownerAddress);

  // Get the rewards contract instance
  const blackClaimsContract = await ethers.getContractAt(blackClaimsAbi, blackClaimsAddress);
  const blackContract = await ethers.getContractAt(blackAbi, blackAddress);

  try {
    // Read rewards data from a JSON file (assumed to be located at ../../token-constants/rewards-data.json)
    const rewardsData = await getRewardsDataJson();
    // First, start the season by calling the contract function
    console.log("Starting season...");
    const startTime = Math.floor(Date.now() / 1000);
    const startSeasonTx = await blackClaimsContract.startSeason(startTime);
    await startSeasonTx.wait();
    console.log("Season started.");
    // Prepare arrays for batch reporting
    const players = rewardsData.map((entry) => entry.user);
    const rewards = rewardsData.map((entry) => ethers.utils.parseUnits(entry.reward.toString(), "ether"));
    console.log("Reporting rewards for players:", players);
    console.log("Reporting rewards:", rewards);
    const reportTx = await blackClaimsContract.reportRewards(players, rewards);
    await reportTx.wait();
    console.log("Rewards reported successfully.");

    //Approve rewards
    const totalRewards = rewards.reduce((a, b) => a.add(b), ethers.BigNumber.from(0));
    const approveTx = await blackContract.approve(blackClaimsAddress, totalRewards);
    await approveTx.wait();
    console.log("Approved total rewards for blackClaimsContract.");
    console.log("Total rewards approved:", totalRewards.toString());

    const duration = 86400 * 30;
    const endSeasonTx = await blackClaimsContract.finalize(duration);
    await endSeasonTx.wait();
    console.log("endseason set successfully.");
  } catch (error) {
    console.error("Error in reporting rewards:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const { ethers } = require("hardhat")
const { votingEscrowAddress, votingEscrowAbi } = require("../../../generated/voting-escrow");
const { avmAbi, avmAddress } = require("../../../generated/avm");
const { veNFTAPIAbi, veNFTAPIAddress } = require("../../../generated/ve-nftapi");
const { bribeAbi } = require("../gaugeConstants/bribe");
const { ZERO_ADDRESS } = require("@openzeppelin/test-helpers/src/constants");
const { blackholePairAPIV2Abi, blackholePairAPIV2Address } = require("../../../generated/blackhole-pair-apiv2");

const deployedTokens = require('../../deployment-flows/token-constants/deployed-tokens.json');
const { blackAbi } = require("../../../generated/black");
const { pairAbi } = require("../dexAbi");
const { gaugeV2Abi } = require("../gaugeConstants/gaugeV2-constants");
const { default: BigNumber } = require("bignumber.js");
const { voterV3Abi, voterV3Address } = require("../../../generated/voter-v3");
const blackAddress = deployedTokens[0].address;
console.log("blackAddress is as: ", blackAddress);

function getEpochStart (timestamp) {
    const WEEK = 30 * 60; // 604800 seconds
    return timestamp - (timestamp % WEEK);
}

async function main () {
  try {
    // INITIAL SETUP OF FETCHING CONTRACTS AND SUCH
    const owner = (await ethers.getSigners())[0];
    const ownerAddress = owner.address;
    console.log("owner address: ", ownerAddress)
    
    // GET CONTRACTS 
    const pairApiContract = await ethers.getContractAt(blackholePairAPIV2Abi, blackholePairAPIV2Address);
    const avmContract = await ethers.getContractAt(avmAbi, avmAddress);
    const blackContract = await ethers.getContractAt(blackAbi, blackAddress)
    const allPairs = await pairApiContract.getAllPair(ownerAddress, "5", "0");
    const allPairsInfo = allPairs[2];
    const voterV3 = await ethers.getContractAt(voterV3Abi, voterV3Address);
    console.log("got contracts" )
        
    for (const elm of allPairsInfo) {
      console.log(
        "voter v3 votes before incentivization and voting for pools: ",
        elm.pair_address,
        await voterV3.weights(elm.pair_address)
      );
    }    

    console.log("last voted for token 1: ", await voterV3.lastVoted("1"), await voterV3.lastVoted("2"))
    // Prepare transactions
    for (const element of allPairsInfo) {
        const externalBribe = await ethers.getContractAt(bribeAbi, element.external_bribes[0]);
    
        console.log(`Sending transaction for ${element.external_bribes[0]}...`);
        
        // Send transaction and wait for it to be mined before continuing
        const tx = await externalBribe.addRewardToken(blackAddress);
        await tx.wait();
        
        console.log(`Transaction confirmed for ${element.external_bribes[0]}`);
    }
    
    console.log("All transactions executed sequentially!");
    

    // STEP 1: INCENTIVIZE USERS - INCENTIVIZATION CAN BE DONE BY ANYBODY AND WILL BE DISTRIBUTED TO THE VOTERS BASED ON THE VOTES
    const externalBribeOne = await ethers.getContractAt(bribeAbi, allPairsInfo[0].external_bribes[0]);
    const externalBribeTwo = await ethers.getContractAt(bribeAbi, allPairsInfo[1].external_bribes[0]);
    const amount = "1000000000000000000"
    const approveBlackToBribe = await blackContract.approve(allPairsInfo[0].external_bribes[0], amount);
    await approveBlackToBribe.wait();
    const incentivizeFirstPool = await externalBribeOne.notifyRewardAmount(blackAddress, amount);
    await incentivizeFirstPool.wait();

    const approveBlackToSecondBribe = await blackContract.approve(allPairsInfo[1].external_bribes[0], amount);
    await approveBlackToSecondBribe.wait();
    const incentivizeSecondPool = await externalBribeTwo.notifyRewardAmount(blackAddress, amount);
    await incentivizeSecondPool.wait();

    // STEP 1.1: TRADE IN ALL 5 POOLS IN WHICH U ADDED LIQUIDITY
    // SKIPPED FOR STAGE I

    // STEP 1.2: STAKE LIQUIDITY
    // console.log("pair address: ", allPairsInfo[0].pair_address);
    // const pairOne = await ethers.getContractAt(pairAbi, allPairsInfo[0].pair_address)
    // const gaugeOne = await ethers.getContractAt(gaugeV2Abi, allPairsInfo[0].gauge)
    // const pairBalance = allPairsInfo[0].account_lp_balance;
    // const depositingAmount = BigNumber(pairBalance.toString()).multipliedBy(0.3).dividedToIntegerBy(1);
    // console.log("pair balance is: ", pairBalance, BigNumber(pairBalance.toString()), " depositing pair tokens quantity: ", depositingAmount.toString())
    // const pairApproval = await pairOne.approve(allPairsInfo[0].gauge, depositingAmount.toString());
    // await pairApproval.wait();
    // const depositLPTx = await gaugeOne.deposit(depositingAmount.toString());
    // await depositLPTx.wait();
    // console.log("approve and deposit done")

    // const pairTwo = await ethers.getContractAt(pairAbi, allPairsInfo[1].pair_address)
    // const gaugeTwo = await ethers.getContractAt(gaugeV2Abi, allPairsInfo[1].gauge)

    // const pairTwoApproval = await pairTwo.approve(allPairsInfo[1].gauge, depositingAmount.toString());
    // await pairTwoApproval.wait();
    // const depositLPTxForPairTwo = await gaugeTwo.deposit(depositingAmount.toString());
    // await depositLPTxForPairTwo.wait();

    // STEP 2: LAST HOUR FUNCTION CALL SIMULATED
    const votingEscrow = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress);
    console.log("chainlink executor", await avmContract.chainlinkExecutor())
    console.log("avm from ve", await votingEscrow.avm())
    console.log("avm from voter", await voterV3.avm())
    const executeVotesTx = await avmContract.executeVotes();
    await executeVotesTx.wait();


    // // // STEP 3: VERIFY AUTOVOTING HAS HAPPENED
    const epochStart = getEpochStart(Math.floor(Date.now() / 1000));
    console.log(
      "has voted this epoch start, where epoch started at: ",
      epochStart,
      await avmContract.hasVotedThisEpoch(epochStart)
    );
    
    for (const elm of allPairsInfo) {
      console.log(
        "voter v3 votes for pools: ",
        elm.pair_address,
        await voterV3.weights(elm.pair_address)
      );
    }    

    // // STEP 4: VERIFY EMISSIONS CALL HAS BEEN DONE AFTER EPOCH ENDS 

    // // STEP 5: VERIFY REWARDS TO MY VOTERS 
    const blackBalance = await blackContract.balanceOf(ownerAddress);
    console.log("black balance: ", blackBalance);
    // const gaugeContract = await ethers.getContractAt(gaugeV2Abi, allPairsInfo[1].gauge);
    // console.log("emissions: ", await gaugeContract.earned());

    // const veNFTAPI = await ethers.getContractAt(veNFTAPIAbi, veNFTAPIAddress);
    // console.log("token id 1 details: ", await veNFTAPI.getNFTFromId("1"));

    // STAGE II OF TESTING STARTS FROM HERE
    
    // STEP 6: INCENTIVES HAVE BEEN RESET 

    // STEP 7: INCENTIVIZE THE OTHER POOLS 

    // STEP 8: LAST HOUR FUNCTION CALL SIMULATED 

    // STEP 8: VERIFY AUTOVOTING HAS HAPPENED

    // STEP 9: VERIFY EMISSIONS CALL HAS BEEN DONE AFTER EPOCH ENDS 

    // STEP 10: VERIFY REWARDS TO MY VOTERS 
  } catch (err) {
    console.error("Error in this: ", err)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

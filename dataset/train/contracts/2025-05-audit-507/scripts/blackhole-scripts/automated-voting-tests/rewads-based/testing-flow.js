const { ethers } = require("hardhat")
const { votingEscrowAddress, votingEscrowAbi } = require("../../../../generated/voting-escrow");
const { bribeAbi } = require("../../gaugeConstants/bribe");
const { blackholePairAPIV2Abi, blackholePairAPIV2Address } = require("../../../../generated/blackhole-pair-apiv2");
const { gaugeV2Abi } = require('../../gaugeConstants/gaugeV2-constants');
const deployedTokens = require('../../../deployment-flows/token-constants/deployed-tokens.json');
const { blackAbi } = require("../../../../generated/black");
const { voterV3Abi, voterV3Address } = require("../../../../generated/voter-v3");
const { rewardsBasedTopNPoolsStrategyAbi, rewardsBasedTopNPoolsStrategyAddress } = require("../../../../generated/rewards-based-top-npools-strategy");
const { pairAbi } = require("../../dexAbi");
const { autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress } = require("../../../../generated/auto-voting-escrow-manager");
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
    
    // // GET CONTRACTS 
    const votingEscrow = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress);
    const pairApiContract = await ethers.getContractAt(blackholePairAPIV2Abi, blackholePairAPIV2Address);
    const avmContract = await ethers.getContractAt(autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress);
    const blackContract = await ethers.getContractAt(blackAbi, blackAddress);
    const allPairs = await pairApiContract.getAllPair(ownerAddress, "5", "0");
    console.log("allPairs: ", allPairs.map(elm => elm.pair_address))
    const allPairsInfo = allPairs[2];
    const voterV3 = await ethers.getContractAt(voterV3Abi, voterV3Address);
    
    // // console.log("All transactions executed sequentially!");

    // // // // STEP 0: CREATE LOCKS 
    const amount = "10000000000000000000"
    const amountToApprove = "200000000000000000000000"

    console.log("black blalance of: ", await blackContract.balanceOf(ownerAddress));
    // const approveTx = await blackContract.approve(votingEscrowAddress, amountToApprove);
    // await approveTx.wait();
    // const createLockOne = await votingEscrow.create_lock(amount, 10*86400, false, {
    //   gasLimit: 15_000_000
    // });
    // await createLockOne.wait();
    // console.log("EDASXZWEDASZXDEWREEDSEWRDXZEWADSZXDSEWASZAZSAWSZSAZSAZSAZ")
    // const createLockTwo = await votingEscrow.create_lock(amount, 10*68400, false);
    // await createLockTwo.wait();
    // console.log("owner of lock one", await votingEscrow.ownerOf("3"))
    // console.log("owner of lock two", await votingEscrow.ownerOf("4"))
    // const approveLockOne = await votingEscrow.approve(autoVotingEscrowManagerAddress, "3");
    // await approveLockOne.wait();
    // console.log("approval for first lock done ")
    // const approveLockTwo = await votingEscrow.approve(autoVotingEscrowManagerAddress, "4");
    // await approveLockTwo.wait();
    // console.log("approval for second lock done ")
    // const enableAutoVotingOneTx = await avmContract.enableAutoVoting("3");
    // await enableAutoVotingOneTx.wait();
    // console.log("enable one done")
    // const enableAutoVotingTwoTx = await avmContract.enableAutoVoting("4");
    // await enableAutoVotingTwoTx.wait();
    // console.log("enable two done")

    console.log("enable and create locks done!")
    const approveAmountForPrevVotedLogic = "10000000000000000000"
    // const 
    const approveTxTwo = await blackContract.approve(votingEscrowAddress, approveAmountForPrevVotedLogic);
    await approveTxTwo.wait();

    const createLockTx = await votingEscrow.create_lock(approveAmountForPrevVotedLogic, 10*86400, false);
    await createLockTx.wait();

    console.log("donr creating the extra lock")

    // STEP 1: INCENTIVIZE USERS - INCENTIVIZATION CAN BE DONE BY ANYBODY AND WILL BE DISTRIBUTED TO THE VOTERS BASED ON THE VOTES
    const externalBribeOne = await ethers.getContractAt(bribeAbi, allPairsInfo[0].external_bribes[0]);
    const externalBribeTwo = await ethers.getContractAt(bribeAbi, allPairsInfo[1].external_bribes[0]);
    const externalBribeThree = await ethers.getContractAt(bribeAbi, allPairsInfo[2].external_bribes[0]);
    const externalBribeFour = await ethers.getContractAt(bribeAbi, allPairsInfo[3].external_bribes[0]);
    const approveBlackToBribe = await blackContract.approve(allPairsInfo[0].external_bribes[0], amount);
    await approveBlackToBribe.wait();
    const incentivizeFirstPool = await externalBribeOne.notifyRewardAmount(blackAddress, amount);
    await incentivizeFirstPool.wait();
    const secondAmount = "1200000000000000000"
    const approveBlackToSecondBribe = await blackContract.approve(allPairsInfo[1].external_bribes[0], secondAmount);
    await approveBlackToSecondBribe.wait();
    const incentivizeSecondPool = await externalBribeTwo.notifyRewardAmount(blackAddress, secondAmount);
    await incentivizeSecondPool.wait();
    console.log("done incentivization of the extra lock ")

    const thirdAmount = "30001000000000000000"
    const approveBlackToThirdBribe = await blackContract.approve(allPairsInfo[2].external_bribes[0], thirdAmount);
    await approveBlackToThirdBribe.wait();
    const incentivizeThirdPool = await externalBribeThree.notifyRewardAmount(blackAddress, thirdAmount);
    await incentivizeThirdPool.wait();
    
    const fourthAmount = "30001000000000000000"
    const approveBlackToFourthBribe = await blackContract.approve(allPairsInfo[3].external_bribes[0], fourthAmount);
    await approveBlackToFourthBribe.wait();
    const incentivizeFourthPool = await externalBribeFour.notifyRewardAmount(blackAddress, fourthAmount);
    await incentivizeFourthPool.wait();

    // // STEP 1.1: TRADE IN ALL 5 POOLS IN 1WHICH U ADDED LIQUIDITY
    // // SKIPPED FOR STAGE I

    // // STEP 1.2: STAKE LIQUIDITY
    // // console.log("pair address: ", allPairsInfo[0].pair_address);
    // // const pairOne = await ethers.getContractAt(pairAbi, allPairsInfo[0].pair_address)
    // // const gaugeOne = await ethers.getContractAt(gaugeV2Abi, allPairsInfo[0].gauge)
    // // const pairBalance = allPairsInfo[0].account_lp_balance;
    // // const depositingAmount = BigNumber(pairBalance.toString()).multipliedBy(0.3).dividedToIntegerBy(1);
    // // console.log("pair balance is: ", pairBalance, BigNumber(pairBalance.toString()), " depositing pair tokens quantity: ", depositingAmount.toString())
    // // const pairApproval = await pairOne.approve(allPairsInfo[0].gauge, depositingAmount.toString());
    // // await pairApproval.wait();
    // // const depositLPTx = await gaugeOne.deposit(depositingAmount.toString());
    // // await depositLPTx.wait(); 
    // // console.log("approve and deposit done")

    // // const pairTwo = await ethers.getContractAt(pairAbi, allPairsInfo[1].pair_address)
    // // const gaugeTwo = await ethers.getContractAt(gaugeV2Abi, allPairsInfo[1].gauge)

    // // const pairTwoApproval = await pairTwo.approve(allPairsInfo[1].gauge, depositingAmount.toString());
    // // await pairTwoApproval.wait();
    // // const depositLPTxForPairTwo = await gaugeTwo.deposit(depositingAmount.toString());
    // // await depositLPTxForPairTwo.wait();

    // // STEP 2: LAST HOUR FUNCTION CALL SIMULATED
    console.log("chainlink executor", await avmContract.executor())
    console.log("avm from ve", await votingEscrow.avm())
    console.log("avm from voter", await voterV3.avm())
    console.log("topNPoolsStrategy", await avmContract.topNPoolsStrategy())
    const topNAddress = await avmContract.topNPoolsStrategy();
    const topNPoolsContract = await ethers.getContractAt(rewardsBasedTopNPoolsStrategyAbi, topNAddress);
    console.log("get top n pools from top n pooks", await topNPoolsContract.getTopNPools());
    // const executeVotesTx = await avmContract.executeVotes();
    // await executeVotesTx.wait();
    // check for top n pools
    console.log("get top n pools", await avmContract.topNPools());

    // vote for pools, based on rewards -> to be done in a separate script


    // // // STEP 3: VERIFY AUTOVOTING HAS HAPPENED
    const epochStart = getEpochStart(Math.floor(Date.now() / 1000));
    console.log(
      "has voted this epoch start, where epoch started at: ",
      epochStart,
      // await avmContract.hasVotedThisEpoch(epochStart)
      123
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

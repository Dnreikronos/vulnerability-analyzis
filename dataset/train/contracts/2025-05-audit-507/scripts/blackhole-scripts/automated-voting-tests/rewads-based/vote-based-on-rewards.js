const { ethers } = require("hardhat")
const { votingEscrowAddress, votingEscrowAbi } = require("../../../../generated/voting-escrow");
const { automatedVotingManagerAbi, automatedVotingManagerAddress } = require("../../../../generated/automated-voting-manager");
const { bribeAbi } = require("../../gaugeConstants/bribe");
const { blackholePairAPIV2Abi, blackholePairAPIV2Address } = require("../../../../generated/blackhole-pair-apiv2");

const deployedTokens = require('../../../deployment-flows/token-constants/deployed-tokens.json');
const { blackAbi } = require("../../../../generated/black");
const { voterV3Abi, voterV3Address } = require("../../../../generated/voter-v3");
const { rewardsBasedTopNPoolsStrategyAbi, rewardsBasedTopNPoolsStrategyAddress } = require("../../../../generated/rewards-based-top-npools-strategy");
const { veNFTAPIAbi, veNFTAPIAddress } = require("../../../../generated/ve-nftapi");
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
    const votingEscrow = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress);
    const veNFTAPI = await ethers.getContractAt(veNFTAPIAbi, veNFTAPIAddress);
    const pairApiContract = await ethers.getContractAt(blackholePairAPIV2Abi, blackholePairAPIV2Address);
    const votingEscrowContract = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress);
    const avmContract = await ethers.getContractAt(automatedVotingManagerAbi, automatedVotingManagerAddress);
    const blackContract = await ethers.getContractAt(blackAbi, blackAddress)
    const allPairs = await pairApiContract.getAllPair(ownerAddress, "5", "0");
    const allPairsInfo = allPairs[2];
    const voterV3 = await ethers.getContractAt(voterV3Abi, voterV3Address);

    console.log("avm based voting power", await avmContract.getTotalVotingPower());
    let pools =[];
    try {
      pools = await avmContract.topNPools();

      console.log("pools", pools);
    } catch(err) {
      console.log("Error n get top n pools", err)
    }
    console.log("voting power of token id: 3", await veNFTAPI.getNFTFromId("3"));
    const arr = [Math.floor(30.001/3),Math.floor(10/3),Math.floor(3.1/3),Math.floor(1.2/3),0]
    const poolsArr = [];

    pools.forEach(element => {
        poolsArr.push(element.pool);
    });
    // function vote(uint256 _tokenId, address[] calldata _poolVote, uint256[] calldata _weights) 
    const voteTx = await voterV3.vote("3", poolsArr, arr)
    await voteTx.wait();

    for (const elm of poolsArr) {
        console.log(
          "voter v3 votes before incentivization and voting for pools: ",
          elm,
          await voterV3.weights(elm)
        );
      }

    // const executeVotesTx = await avmContract.executeVotes();
    // await executeVotesTx.wait();


    for (const elm of poolsArr) {
        console.log(
          "voter v3 votes after auto voting for pools: ",
          elm,
          await voterV3.weights(elm)
        );
      }

    // rewards right now are 44.301

    // case 1: 1 will have really high votes, and rest will go to the others as 1, 1, 1, 1
    // case 2: 2 will have 0 votes and rest will have 1,1,1,1 votes 
    // that should be enough 

    // 100000000000
        
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

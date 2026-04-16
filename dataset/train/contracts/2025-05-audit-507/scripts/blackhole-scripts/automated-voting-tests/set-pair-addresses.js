const { ethers } = require("hardhat")
const { votingEscrowAddress } = require("../../../generated/voting-escrow");
const { votingEscrowAbi } = require("../../../generated/voting-escrow");
const { blackAbi } = require("../gaugeConstants/black");
const deployedTokens = require("../../deployment-flows/token-constants/deployed-tokens.json");
// console.log("dployed tokens", deployedTokens)
const blackAddress = deployedTokens[0].address;

// console.log("black token address is: ", blackAddress); 

// const { default: BigNumber } = require("bignumber.js");
const { avmAbi, avmAddress } = require("../../../generated/avm");
const { veArtProxyUpgradeableAbi, veArtProxyUpgradeableAddress } = require("../../../generated/ve-art-proxy-upgradeable");
const { voterV3Abi, voterV3Address } = require("../../../generated/voter-v3");
const { simpleTopNPoolsStrategyAbi, simpleTopNPoolsStrategyAddress } = require("../../../generated/simple-top-npools-strategy");

async function main () {
    const voterV3 = await ethers.getContractAt(voterV3Abi, voterV3Address);
    const poolsLength = await voterV3.length();
    // set for only first 2 votes 
    const arr = [];
    for(let i=0; i<2; i++) {
        const poolAddress = await voterV3.pools(i);
        console.log("pool addresS: ", poolAddress);
        const gaugeAddress = await voterV3.gauges(poolAddress);
        console.log("gauge address", gaugeAddress);
        arr.push(poolAddress);
    }
    const avmContract = await ethers.getContractAt(avmAbi, avmAddress);
    const topNOnAVM = await avmContract.setTopN("2");
    await topNOnAVM.wait();
    const simpleTopNStrat = await ethers.getContractAt(simpleTopNPoolsStrategyAbi, simpleTopNPoolsStrategyAddress);
    const updateTopN = await simpleTopNStrat.updateTopN();
    await updateTopN.wait()
    console.log("update top n done, so top n from contract is: ", await simpleTopNStrat.topN());
    const updatePools = await simpleTopNStrat.updateTopNPools(arr);
    await updatePools.wait();

    const topNPools = await simpleTopNStrat.getTopNPools();
    console.log("top n pools: ", topNPools)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

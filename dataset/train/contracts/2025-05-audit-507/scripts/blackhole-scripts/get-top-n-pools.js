const { ethers } = require("hardhat");

const { setterTopNPoolsStrategyAbi, setterTopNPoolsStrategyAddress } = require("../../generated/setter-top-npools-strategy");

async function main () {
    const avm = await ethers.getContractAt(setterTopNPoolsStrategyAbi, setterTopNPoolsStrategyAddress);
    console.log("topn adfress: ", await avm.getTopNPools())
    // const topNpools = await ethers.getContractAt(simpleTopNPoolsStrategyAbi, "0x44C9c20bFd78fc497D3846eb53b6a1e0E8CE936E");
    // const poolsAndRewards = await topNpools.getTopNPools();
    // console.log("pools and rewards: ", poolsAndRewards);
}

main().then(() => console.log("Done!"))
.catch(err => console.error(err))

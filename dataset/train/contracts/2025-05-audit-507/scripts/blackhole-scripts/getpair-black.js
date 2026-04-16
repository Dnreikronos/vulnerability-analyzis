const { ethers } = require("hardhat");
const { pairFactoryAbi, pairFactoryAddress } = require("../../generated/pair-factory");
const { tokenHandlerAbi, tokenHandlerAddress } = require("../../generated/token-handler");
const { blackAddress, blackAbi } = require("../../generated/black");

async function main () {
    const pairFactory = await ethers.getContractAt(pairFactoryAbi, pairFactoryAddress);
    const token0 = "0xc8251e648734e116e91600C8E561eB5f507bD21e";
const token1 = "0x1747af8251400F397F9c29173b8c2dc996647114";


const [tokenA, tokenB] = token0.toLowerCase() < token1.toLowerCase()
? [token0, token1]
: [token1, token0];
    const pairAddressVolatile = await pairFactory.getPair(tokenA, tokenB, false);
    console.log("pairAddressVolatile: ", pairAddressVolatile)
    const pairAddressStable = await pairFactory.getPair(tokenA, tokenB, true);
    console.log("pairAddressStable: ", pairAddressStable)

    // const tokenHandler = await ethers.getContractAt(tokenHandlerAbi, tokenHandlerAddress);
    // console.log("whiretelisted tokens: ", await tokenHandler.whiteListedTokens());

    const black = await ethers.getContractAt(blackAbi, blackAddress);
    console.log("trial; ", await black.name())
}

main().then(() => console.log("Done!"))
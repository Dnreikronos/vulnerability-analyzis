const { genesisPoolAbi } = require('../../../../generated/genesis-pool');
const { customTokenAbi } = require('../../../../generated/custom-token');
const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');
const { BigNumber } = require("ethers");
const { tokenHandlerAbi, tokenHandlerAddress } = require('../../../../generated/token-handler');
const deployedTokens = require("../../token-constants/deploying-tokens.json");

async function main () {

  accounts = await ethers.getSigners();
  owner = accounts[0];
  const ownerAddress = owner.address;
  console.log("ownerAddress : ", ownerAddress);
  console.log("deployedTokens: ", deployedTokens);

  try {
    if (!deployedTokens || !Array.isArray(deployedTokens)) {
      throw new Error("Invalid or missing deployedTokens array");
    }

    const tokens = deployedTokens.map(token => token.address);
    const newTokens = [...tokens, "0x385F9552A852dfF8bB48a4074d8368EF91Fe53F2",]
    console.log("tokens:", newTokens);

    // Example of interacting with the contract if needed:
    const TokenHandlerContract = await ethers.getContractAt(tokenHandlerAbi, tokenHandlerAddress);
    const connectors = ["0xd6cE7D0b5d91DA81091a6cbEe96A0c3F311B4D01", "0x385F9552A852dfF8bB48a4074d8368EF91Fe53F2", "0x10eD98212f1Ba49aCBaE6e4418AC4cD849374Cb3", "0x17f6EA5dE1B1E83ABFe87f2CC0395d25055cC092"]
    for(let i=2; i<connectors.length; i++) {
        const connectorTx = await TokenHandlerContract.whitelistConnector(connectors[i]);
        await connectorTx.wait();
    }

    console.log("Done.");
  } catch (error) {
    console.error("Error in processing tokens:", error);
  }
}

main()
  .then(
    () => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});


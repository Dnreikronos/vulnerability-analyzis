const { genesisPoolAbi } = require('../../../../generated/genesis-pool');
const { customTokenAbi } = require('../../../../generated/custom-token');
const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');
const { BigNumber } = require("ethers");
const { tokenHandlerAbi, tokenHandlerAddress } = require('../../../../generated/token-handler');
const deployedTokens = require("../../token-constants/deployed-tokens.json");

async function main () {

    accounts = await ethers.getSigners();
    owner = accounts[0];
    const ownerAddress = owner.address;
    console.log("ownerAddress : ", ownerAddress);
    try{

        const token = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";

        const jsonFilePath = path.join(__dirname, '../../token-constants/deploying-tokens.json'); // Adjust the path
        const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
// Extract addresses
        const addresses = jsonData.map(obj => obj.address);

        const deployedTokens = require('../../token-constants/deployed-tokens.json');
        const defaultTokens = deployedTokens.map(obj => obj.address);
        const whitelistTokens = [...defaultTokens, ...addresses];
        const connectorTokens = [...defaultTokens, addresses[0], addresses[1], addresses[5]];


        const TokenHandlerContract = await ethers.getContractAt(tokenHandlerAbi, tokenHandlerAddress);
        await TokenHandlerContract.whitelistTokens(whitelistTokens);
        await TokenHandlerContract.whitelistConnectors(connectorTokens);


    }
    catch (error) {
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


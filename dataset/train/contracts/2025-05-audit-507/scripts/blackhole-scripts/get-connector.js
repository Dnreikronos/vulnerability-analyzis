const { ethers } = require("hardhat");
const { tokenHandlerAbi, tokenHandlerAddress } = require("../../generated/token-handler");

const fs = require('fs');
const path = require('path');
// Load the JSON file
const jsonFilePath = path.join(__dirname, '../deployment-flows/token-constants/deploying-tokens.json'); // Adjust the path
const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
// Extract addresses
const addresses = jsonData.map(obj => obj.address);

const deployedTokens = require('../deployment-flows/token-constants/deployed-tokens.json');
const { generateConstantFile } = require("./postDeployment/generator");
const { veNFTAPIAbi, veNFTAPIAddress } = require("../../generated/ve-nftapi");


const deployTokenHanlder_ = async (retries) => {
    const defaultTokens = deployedTokens.map(obj => obj.address);
    const whitelistTokens = [...defaultTokens, ...addresses];
    const connectorTokens = [...defaultTokens, addresses[0], addresses[1], addresses[5]];

    try {
        const tokenHandler = await ethers.getContractAt(tokenHandlerAbi, tokenHandlerAddress);

        console.log("\ntoken handler address : ", tokenHandler.address)
        generateConstantFile("TokenHandler", tokenHandler.address);

        // const tx = await tokenHandler.whitelistTokens(whitelistTokens);
        // await tx.wait()
        console.log("set tokens in token handler");
        const whitelistConnectors = await tokenHandler.whitelistConnectors(whitelistTokens);
        await whitelistConnectors.wait();
        console.log("set connector tokens in token handler\n");


        return tokenHandler.address;
    } catch (error) {
        console.log("Error in ", error)
        if (retries > 0) {
            return await deployTokenHanlder_(retries - 1);
        }
        throw error;
    }
}

const logAVMLocks = async () => {
    const owners = await ethers.getSigners();
    const ownerAddress = owners[0].address;
    const veNFTAPI = await ethers.getContractAt(veNFTAPIAbi, veNFTAPIAddress);
    console.log("avm locks: ", await veNFTAPI.getAVMNFTFromAddress(ownerAddress))

}

async function main () {
    // await deployTokenHanlder_(3);
    await logAVMLocks();
}

main()

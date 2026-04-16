const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

const jsonPath = path.resolve(__dirname, "../../token-constants/genesis-tokens.json");
let tokens = require(jsonPath);

async function main() {
    const customTokenContract = await ethers.getContractFactory("CustomToken");
    const millionTokens = "1000000000000000000000000000000000";

    // console.log("Custom Token Contract:", customTokenContract);

    // Deploy tokens sequentially using a for...of loop
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        const deployingCustomToken = await customTokenContract.deploy(token.name, token.ticker, millionTokens);
        const deployedToken = await deployingCustomToken.deployed();

        console.log(`Deployed ${token.name} at address: ${deployedToken.address}`);

        // Update the token object with the deployed address
        tokens[i].address = deployedToken.address;

        // Save the updated JSON after each deployment (optional but ensures no data loss if script fails midway)
        fs.writeFileSync(jsonPath, JSON.stringify(tokens, null, 2));
    }

    console.log("Updated deploying-tokens.json with deployed addresses!");
}

main()
    .then(() => console.log("Done deploying custom tokens"))
    .catch((err) => console.error("Error in deploying custom tokens:", err));

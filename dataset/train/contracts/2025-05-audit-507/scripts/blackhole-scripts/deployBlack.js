const { ethers } = require("hardhat")
const {generateConstantFile} = require("./postDeployment/generator");
const fs = require("fs");
const path = require("path");
const { BigNumber } = require("ethers");

const deployedTokensPath = path.resolve(__dirname, "../deployment-flows/token-constants/deployed-tokens.json");
const deployedTokens = require(deployedTokensPath);
const {blackAbi} = require("../../generated/black");
const deployBlack = async () => {
    try {
        const blackContract = await ethers.getContractFactory("Black");
        const blackFactory = await blackContract.deploy();
        await blackFactory.deployed();
        console.log("Black token deployed at:", blackFactory.address);
        generateConstantFile("Black", blackFactory.address);
        return blackFactory.address;
    } catch (error) {
        console.log("Error deploying Black:", error);
    }
};

const mintBlack = async (blackAddress, receiver, amount) => {
    try {

        const amountAdd = BigNumber.from(amount).mul(BigNumber.from("1000000000000000000"));

        const blackContract = await ethers.getContractAt(blackAbi, blackAddress);
        await blackContract.mint(receiver, amountAdd);
        console.log("Black token transferred");
    } catch (error) {
        console.log("Black token transfer failed : ", error);
    }
};

const setMinter = async (blackAddress, minterAddress) => {
    try {
        const blackContract = await ethers.getContractAt(blackAbi, blackAddress);
        await blackContract.setMinter(minterAddress);
        console.log("Minter is set");
    } catch (error) {
        console.log("Minter set failed: ", error);
    }
}


async function main() {
    const accounts = await ethers.getSigners();
    const owner = accounts[0];
    // const receiver = owner.address;
    // const receiver = "0xa7243fc6FB83b0490eBe957941a339be4Db11c29";
    const receiver = owner.address;
    const mintAmount = 500000;
    //  const mintAmount = <add_mint_amount>;

    // Deploy Black token
    const blackAddress = await deployBlack();

    if (!blackAddress) {
        console.error("Failed to deploy Black token.");
        process.exit(1);
    }

    await mintBlack(blackAddress, receiver, mintAmount);

    // await setMinter(blackAddress, receiver);
    // Update or add the Black token address
    deployedTokens[0].address = blackAddress;

    // console.log("deployedTokens" , deployedTokensPath, JSON.stringify(deployedTokens, null, 2));

    // Write the updated JSON back to the file
    fs.writeFileSync(deployedTokensPath, JSON.stringify(deployedTokens, null, 2));

    console.log("Updated deployed-tokens.json with Black token address!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error in deployment:", error);
        process.exit(1);
    });

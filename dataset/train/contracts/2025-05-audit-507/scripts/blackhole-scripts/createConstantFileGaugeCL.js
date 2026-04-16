

const { ethers } = require("hardhat")
const { generateConstantFile } = require('../blackhole-scripts/postDeployment/generator');
const fs = require('fs');
const path = require('path');

async function main() {
    generateConstantFile("GaugeCL", "");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
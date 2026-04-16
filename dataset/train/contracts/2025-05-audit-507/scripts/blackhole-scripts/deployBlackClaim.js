const { ethers } = require("hardhat")
const { votingEscrowAddress } = require('../../generated/voting-escrow');
const { generateConstantFile } = require('./postDeployment/generator');

const deployBlackClaim = async (votingEscrowAddress, treasury) => {
    try {
        const BlackClaimsContract = await ethers.getContractFactory("BlackClaims");
        const BlackClaims = await BlackClaimsContract.deploy(treasury, votingEscrowAddress);
        const txDeployed =  await BlackClaims.deployed();

        console.log("BlackClaims address: ", BlackClaims.address)
        generateConstantFile("BlackClaims", BlackClaims.address);
        return BlackClaims.address;
    } catch (error) {
        console.log("error in deploying Black Claims: ", error);
        process.exit(1);
    }
}


async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0];
    const ownerAddress = owner.address;
    const blackClaimAddress = await deployBlackClaim(votingEscrowAddress, ownerAddress);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});


const { ethers } = require("hardhat")
const { blackAddress } = require('./gaugeConstants/black');
const { VeArtProxyUpgradeableAddress } = require('./gaugeConstants/ve-art-proxy-upgradeable')
const { voterV3Abi, voterV3Address } = require('./gaugeConstants/voter-v3')
const { votingEscrowAbi, votingEscrowAddress } = require('./gaugeConstants/voting-escrow')
async function main () {
    //deployment of VotingEscrow
    const votingEscrow = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress)
    console.log('votingEscrow ', votingEscrow.address)
    console.log("voter: ", await votingEscrow.voter())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});

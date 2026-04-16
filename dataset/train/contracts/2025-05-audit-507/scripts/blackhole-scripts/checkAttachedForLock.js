const { ethers } = require("hardhat");
const { blackAbi, blackAddress } = require("./gaugeConstants/black");
const { BigNumber } = require("ethers");
const { votingEscrowAbi, votingEscrowAddress } = require("./gaugeConstants/voting-escrow");

async function main () {
    const votingEscrow = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress);
    const attachmentsForFrom = await votingEscrow.attachments(BigNumber.from(4));
    console.log("attachmetnsForFourth ve", attachmentsForFrom);
    const voted = await votingEscrow.voted(BigNumber.from(1));
    console.log("voted for fourth token id", voted);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});

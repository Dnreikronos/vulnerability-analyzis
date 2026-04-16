const { votingEscrowAbi, votingEscrowAddress } = require("../../generated/voting-escrow");

async function main () {
    const votingEscrow = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress);
    console.log("balanceOfNFT: ", await votingEscrow.balanceOfNFT("13"))
}

main().then(() => console.log("Done!"))

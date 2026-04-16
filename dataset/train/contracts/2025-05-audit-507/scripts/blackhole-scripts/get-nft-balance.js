const { BigNumber } = require("ethers");
const { veNFTAPIAbi, veNFTAPIAddress } = require("../../generated/ve-nftapi")
const { votingEscrowAbi, votingEscrowAddress } = require("../../generated/voting-escrow")


async function main () {
    const votingEscrow = await ethers.getContractAt(veNFTAPIAbi, veNFTAPIAddress);
    const balanceOfNFT = await votingEscrow.getNFTFromAddress("0x8ec18CcA7E8d40861dc07C217a6426f60005A661");
    console.log('balance of nft: ', balanceOfNFT);

    // const votingEscrow = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress);
    // const balanceOfNFT = await votingEscrow.locked(1);
    // console.log('balance of nft: ', balanceOfNFT);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});

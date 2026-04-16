const { ethers  } = require('hardhat');
const { votingEscrowAbi, votingEscrowAddress } = require('../../generated/voting-escrow');
const { veNFTAPIAddress, veNFTAPIAbi } = require('../../generated/ve-nftapi');




async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0];

    const veNft = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress);
    // const getAllNft = await veNft.point_history(1);
    const getAllNft1 = await veNft.totalSupplyAtT(1742300806);
    
    console.log("getAllGauge", getAllNft1);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
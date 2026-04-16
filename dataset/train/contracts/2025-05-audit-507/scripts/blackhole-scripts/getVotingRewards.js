const { ethers  } = require('hardhat');
const { veNFTAPIAbi, veNFTAPIAddress } = require('../../generated/ve-nftapi');



async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0];

    const veNFTAPIContract = await ethers.getContractAt(veNFTAPIAbi, veNFTAPIAddress);
    const getAllGauge = await veNFTAPIContract.getAllPairRewards("0x476461e6d5cAf709Fe2455f881721853Ce0433A5", 2, 0);
    console.log("getAllGauge", getAllGauge[2][1].pairRewards[1])
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
const { ethers  } = require('hardhat');
const { veNFTAPIAbi, veNFTAPIAddress } = require('../../generated/ve-nftapi');



async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0];

    const gaugeContract = await ethers.getContractAt(veNFTAPIAbi, veNFTAPIAddress);
    const getAllGauge = await gaugeContract.getAllGauges();
    console.log("getAllGauge", getAllGauge)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
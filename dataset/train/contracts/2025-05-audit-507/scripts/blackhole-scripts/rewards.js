const { ethers  } = require('hardhat');
const { veNFTAPIAbi, veNFTAPIAddress } = require('./gaugeConstants/ve-nft-api');
const { BigNumber } = require("ethers");


async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]
    const veNFTContract = await ethers.getContractAt(veNFTAPIAbi, veNFTAPIAddress);
    try {
        const amount = BigNumber.from("2");
        const offset = BigNumber.from("0")
        const id = BigNumber.from("1")
        const rewards = await veNFTContract.allPairRewards(amount, offset, id);
        console.log("rewatdsList", rewards[0].rewards, rewards[1].rewards)
    } catch (error) {
        console.log("error in fetching rewards", error)
    }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
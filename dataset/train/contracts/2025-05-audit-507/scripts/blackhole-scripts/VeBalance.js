const { ethers  } = require('hardhat');
const { votingEscrowAbi } = require('./gaugeConstants/voting-escrow.js');
const { veNFTAPIAbi } = require('./gaugeConstants/ve-nft-api.js');
const { BigNumber } = require("ethers");

async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]
    const VotingEscrowContract = await ethers.getContractAt(votingEscrowAbi, "0x0cF023363463F5222AD093C9570F5343d9d2Fe10");
    const balance = await VotingEscrowContract.balanceOf("0xF1e222EC313a7E819491aaFEA709a49c10571dA9");
    // const balance = await VotingEscrowContract.tokenOfOwnerByIndex("0xF1e222EC313a7E819491aaFEA709a49c10571dA9", 1);
    // const balance = await VotingEscrowContract.balanceOfNFT(0);
    // const balance = await VotingEscrowContract.locked(1);
    // const balance = await VotingEscrowContract.attachments(1);
    // const balance = await VotingEscrowContract.ownerOf(1);
    const veNFTApiContract = await ethers.getContractAt(veNFTAPIAbi, "0x1E83D465FcF070417c3D6EDf7c768Ac8E5298103");
    await veNFTApiContract.getNFTFromAddress("0xF1e222EC313a7E819491aaFEA709a49c10571dA9");
    // await veNFTApiContract.getNFTFromId(1);
    console.log("balance ", balance);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
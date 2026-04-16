const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");
const {blackAbi, blackAddress} = require("../../generated/black");

async function main () {

    const acc = await ethers.getSigners();
    const owner = acc[0].address;
    console.log('owner is', owner)
    const blackholeContract = await ethers.getContractAt(blackAbi, blackAddress);
    let balanceOfOwner = await blackholeContract.balanceOf(owner);
    console.log('balanceOfOwner pre minting', balanceOfOwner)
    const mintAmount = BigNumber.from("100000000").mul(BigNumber.from("1000000000000000000")); // 100M * 10^18
    const mintingTx = await blackholeContract.mint(owner, mintAmount);
    await mintingTx.wait();
    balanceOfOwner = await blackholeContract.balanceOf(owner);
    console.log('balanceOfOwner post minting', balanceOfOwner)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});

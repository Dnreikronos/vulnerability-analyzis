const { ethers } = require("hardhat")
const { minterUpgradableAbi } = require('./gaugeConstants/minter-upgradable');
const { BigNumber } = require("ethers");

// function _initialize(
//     address[] memory claimants,
//     uint[] memory amounts,
//     uint max // sum amounts / max = % ownership of top protocols, so if initial 20m is distributed, and target is 25% protocol ownership, then max - 4 x 20m = 80m
// ) external {

async function main () {
    const minter = await ethers.getContractAt(minterUpgradableAbi, "0xE3406768E4bcBF8796B0Fa520d4997b85F81ae45");
    const mintAmount = BigNumber.from("100000").mul(BigNumber.from("1000000000000000000"));
    const initializingTx = await minter._initialize(
        [],
        [],
        mintAmount
    );
    await initializingTx.wait();
    console.log("Done initializing minter post deployment")

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

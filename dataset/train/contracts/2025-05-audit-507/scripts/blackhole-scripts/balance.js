const { ethers  } = require('hardhat');
const { pairAbi, tokenAbi, tokenOne, tokenTwo } = require("../V1/dexAbi");
const { deployedPairs } = require("../../constants/pairs");

async function main(){
    accounts = await ethers.getSigners();
    owner = accounts[0];
    console.log("selfAddress : ", owner.address);
    const selfAddress = owner.address;
    const pairAddress = deployedPairs[0].pairAddress;
    const pairContract = await ethers.getContractAt(pairAbi, pairAddress);

    const pairBalanceInWallet  = await pairContract.balanceOf(owner.address);
    console.log('pair balance in wallet', pairBalanceInWallet);

    const tokenOneContract = await ethers.getContractAt(tokenAbi, tokenOne);
    console.log('balance 0 in pool', owner.address,  await tokenOneContract.balanceOf(pairAddress))

    const tokenTwoContract = await ethers.getContractAt(tokenAbi, tokenTwo);
    console.log('balance 1 in pool', owner.address,  await tokenTwoContract.balanceOf(pairAddress))
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

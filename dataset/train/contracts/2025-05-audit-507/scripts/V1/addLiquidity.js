const { ethers  } = require('hardhat');

const { ZERO_ADDRESS } = require("@openzeppelin/test-helpers/src/constants.js");
const { pairFactoryAbi, routerV2Abi, routerV2Address, tokenOne, tokenTwo, tokenAbi, tokenFive, tokenThree, tokenFour, tokenEight, tokenTen, tokenNine } = require("./dexAbi");



async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]
    const selfAddress = "0x8ec18CcA7E8d40861dc07C217a6426f60005A661";
    const tokenA = tokenTwo;
    const tokenB = tokenThree;
    const tokenAAmount = 100;
    const tokenBAmount = 99;
    const approvalAmount = Math.max(tokenAAmount, tokenBAmount)
    const approvalAmountString = (BigInt(approvalAmount) * BigInt(10 ** 18)).toString();
    const tokenOneContract = await ethers.getContractAt(tokenAbi, tokenA);
    const tokenTwoContract = await ethers.getContractAt(tokenAbi, tokenB);
    const txApprovalOne = await tokenOneContract.approve(routerV2Address, approvalAmountString);
    await txApprovalOne.wait();
    const txApprovalTwo = await tokenTwoContract.approve(routerV2Address, approvalAmountString);
    await txApprovalTwo.wait();
    const routerV2Contract = await ethers.getContractAt(routerV2Abi, routerV2Address);
    const stable = false;
    const amountADesired = (BigInt(tokenAAmount) * BigInt(10 ** 18)).toString();
    const amountBDesired = (BigInt(tokenBAmount) * BigInt(10 ** 18)).toString();
    const amountAMin = "0";
    const amountBMin = "0";
    const to = selfAddress;
    const deadlineUnixTimestamp = Math.floor(Date.now() / 1000) + 718080;
    console.log(deadlineUnixTimestamp);
    const deadline = deadlineUnixTimestamp;
    
    const parameters = {
        tokenA,
        tokenB,
        stable,
        amountADesired,
        amountBDesired,
        amountAMin,
        amountBMin,
        to,
        deadline
    }
    console.log('add liq method', parameters, routerV2Contract.addLiquidity)
    const tx = await routerV2Contract.addLiquidity(
        tokenA,
        tokenB,
        stable,
        amountADesired,
        amountBDesired,
        amountAMin,
        amountBMin,
        to,
        deadline
    );
    const awaitedTx = await tx.wait(); 
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

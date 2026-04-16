const { ethers  } = require('hardhat');
const { pairAbi, tokenAbi, tokenOne, tokenTwo, routerV2Abi, routerV2Address } = require("./dexAbi");
const {deployedPairs} = require("../../constants/pairs");

async function main(){
    accounts = await ethers.getSigners();
    owner = accounts[0]; 
    const selfAddress = owner.address;
    console.log("selfAddress : ", owner.address);

    const pairAddress = deployedPairs[0].pairAddress;
    const pairContract = await ethers.getContractAt(pairAbi, pairAddress);

    const balanceOfMe = await pairContract.balanceOf(selfAddress);
    console.log("balanceOfMe", balanceOfMe);

    const routerV2Contract = await ethers.getContractAt(routerV2Abi, routerV2Address);
    const txApprovalpairContract = await pairContract.approve(routerV2Address, balanceOfMe);
    await txApprovalpairContract.wait();
    
    const tokenA = tokenOne;
    const tokenB = tokenTwo;
    const stable = false;
    const liquidity = "9004";
    const amountAMin = "0";
    const amountBMin = "0";
    const to = selfAddress;
    const deadline = Math.floor(Date.now() / 1000) + 718080;

    const parameters = {
        tokenA,
        tokenB,
        stable,
        liquidity,
        amountAMin,
        amountBMin,
        to,
        deadline
    }

    console.log("Remove liquidity params : ", parameters);

    const tx = await routerV2Contract.removeLiquidity(
        tokenA,
        tokenB,
        stable,
        liquidity,
        amountAMin,
        amountBMin,
        to,
        deadline,
    {
        gasLimit: 21000000
    });

    const awaitedTx = await tx.wait();
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

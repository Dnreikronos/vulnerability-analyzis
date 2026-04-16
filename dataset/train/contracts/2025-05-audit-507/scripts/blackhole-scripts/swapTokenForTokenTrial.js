const { ethers } = require("hardhat");
const { routerV2Abi, tokenAbi, tokenOne, tokenTwo, pairFactoryAbi } = require("../V1/dexAbi");

// 0x1c2b9eb0a6c13e7d21f9915bea738e4d7a24c358 - pool address for TT/TO

async function main () {
    const owner = (await ethers.getSigners())[0];
    console.log('owner', owner)
    console.log('Deploying Pairfactory Contract...');
    data = await ethers.getContractFactory("PairFactory");
    let pairFactory = await data.deploy();
    txDeployed = await pairFactory.deployed();
    console.log("pairFactory: ", pairFactory.address)
    const router = await ethers.getContractFactory("RouterV2");
    // const pairFactory = '0x02b14Bc0dF9f899E98080c110851AF15cd5ab571'
    const wETH = '0x4200000000000000000000000000000000000006'
    const tx = await router.deploy(pairFactory.address, wETH);
    await tx.deployed();

    const pairFactoryContract = await ethers.getContractAt(pairFactoryAbi, pairFactory.address)
    const setdibsTx = await pairFactoryContract.setDibs(owner.address);
    await setdibsTx.wait();

    const RouterV2Contract = await ethers.getContractAt(routerV2Abi, tx.address);
    // const tokenOneContract = await ethers.getContractAt(tokenAbi, tokenOne);
    // const tokenTwoContract = await ethers.getContractAt(tokenAbi, tokenTwo);
    /**
     * function swapExactTokensForTokensSimple(
        uint amountIn,
        uint amountOutMin,
        address tokenFrom,
        address tokenTo,
        bool stable,
        address to,
        uint deadline
    )
     */

    // weirdly enuf routev2 is centralized
    const swapIn = "100000";
    const approvalIn = "110000"
    // const approvalTx = await tokenOneContract.approve(tx.address, approvalIn);
    // await approvalTx.wait();
    // console.log('approvalTx', approvalTx)

    console.log(swapIn,
        "100",
        tokenOne,
        tokenTwo,
        false,
        owner.address,
        Math.floor(Date.now()/1000) + 718080,
        {
            gasLimit: 21000000
        })
    // here
    const tokenOneContract = await ethers.getContractAt(tokenAbi, tokenOne);
    const tokenTwoContract = await ethers.getContractAt(tokenAbi, tokenTwo);
    const txApprovalOne = await tokenOneContract.approve(tx.address, "12000000");
    await txApprovalOne.wait();
    const txApprovalTwo = await tokenTwoContract.approve(tx.address, "12000000");
    await txApprovalTwo.wait();
    /**
     *  address tokenA,
        address tokenB,
        bool stable,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
     */
    const tokenA = tokenOne;
    const tokenB = tokenTwo;
    const stable = false;
    const amountADesired = "1200000";
    const amountBDesired = "1200000";
    const amountAMin = "1000000";
    const amountBMin = "1000000";
    const to = owner.address;
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
    console.log('add liq method', parameters, RouterV2Contract.addLiquidity)
    const txTwo = await RouterV2Contract.addLiquidity(
        tokenA,
        tokenB,
        stable,
        amountADesired,
        amountBDesired,
        amountAMin,
        amountBMin,
        to,
        deadline,
    {
        gasLimit: 21000000
    });
    const awaitedTx = await txTwo.wait();

    const swappintTx = await RouterV2Contract.swapExactTokensForTokensSimple(
        swapIn,
        "0", 
        tokenOne,
        tokenTwo,
        stable,
        owner.address,
        Math.floor(Date.now() / 1000) + 718080,
        {
            gasLimit: 21000000
        }
    );

    await swappintTx.wait();
    console.log('swappingTx', swappintTx)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


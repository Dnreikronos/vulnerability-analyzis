const { ethers } = require("hardhat");
const { routerV2Address, routerV2Abi } = require('../../generated/router-v2')
const { pairFactoryAbi, pairFactoryAddress } = require('../../generated/pair-factory')
const { tokenAbi } = require('../../generated/token')

const path = require('path');
const fs = require('fs');

async function main () {
    const owner = (await ethers.getSigners())[0];
    // const routerContractV2 = await ethers.getContractAt(routerV2Abi, routerV2Address);
    // const pairFactoryContract = await ethers.getContractAt(pairFactoryAbi, pairFactoryAddress)
    
    // const setdibsTx = await pairFactoryContract.setDibs("0xa7243fc6FB83b0490eBe957941a339be4Db11c29");
    // await setdibsTx.wait();

    const jsonFilePath = path.join(__dirname, '../deployment-flows/token-constants/deploying-tokens.json'); // Adjust the path
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
    const addresses = jsonData.map(obj => obj.address);

    const RouterV2Contract = await ethers.getContractAt(routerV2Abi, routerV2Address);
    const tokenOneContract = await ethers.getContractAt(tokenAbi, addresses[0]);
    const tokenTwoContract = await ethers.getContractAt(tokenAbi, addresses[1]);
    // console.log('owner balance of tokens pre swapping', await tokenOneContract.balanceOf(owner.address), await tokenTwoContract.balanceOf(owner.address));

    // weirdly enuf routev2 is centralized
    const swapIn = "1310000000000000000000";
    const approvalIn = "1510000000000000000000"
    const approvalTx = await tokenOneContract.approve(routerV2Address, approvalIn);
    await approvalTx.wait();
    // console.log('approvalTx', approvalTx)

    // console.log(swapIn,
    //     "100",
    //     tokenOne,
    //     tokenFour,
    //     false,
    //     owner.address,
    //     Math.floor(Date.now()/1000) + 718080,
    //     {
    //         gasLimit: 21000000
    //     })

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
    const stable = false;

    console.log('owner balance of tokens post swapping', await tokenOneContract.balanceOf("0xa7243fc6FB83b0490eBe957941a339be4Db11c29"), await tokenTwoContract.balanceOf("0xa7243fc6FB83b0490eBe957941a339be4Db11c29"));

    const swappintTx = await RouterV2Contract.swapExactTokensForTokensSimple(
        swapIn,
        "0", 
        addresses[0],
        addresses[1],
        stable,
        "0xa7243fc6FB83b0490eBe957941a339be4Db11c29",
        Math.floor(Date.now() / 1000) + 718080,
        {
            gasLimit: 21000000
        }
    );

    await swappintTx.wait();
    console.log('swappingTx', swappintTx)


    console.log('owner balance of tokens post swapping', await tokenOneContract.balanceOf("0xa7243fc6FB83b0490eBe957941a339be4Db11c29"), await tokenTwoContract.balanceOf("0xa7243fc6FB83b0490eBe957941a339be4Db11c29"));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


const { ethers } = require("hardhat");
const { routerV2Address, routerV2Abi } = require('../../generated/router-v2')

async function main () {
    const owner = (await ethers.getSigners())[0];

    const RouterV2Contract = await ethers.getContractAt(routerV2Abi, routerV2Address);
    // const tokenOneContract = await ethers.getContractAt(tokenAbi, addresses[0]);

    const swapIn = "100000000000000000000";
    const approvalIn = "10000000000000"
    // const approvalTx = await tokenOneContract.approve(routerV2Address, approvalIn);
    // await approvalTx.wait();
    
    const stable = false;


    const swappintTx = await RouterV2Contract.getAmountOut(swapIn, "0xB32cB5BeE5b0D80c221eBbC3FaA4cDC789953aCD", "0xD3916ddf71d765CfEf2E3C889a5a9dC9D1abDD09");

    // const swappintTx = await RouterV2Contract.getAmountOut(swapIn, "0xB32cB5BeE5b0D80c221eBbC3FaA4cDC789953aCD", "0xD3916ddf71d765CfEf2E3C889a5a9dC9D1abDD09");
    // await swappintTx.wait();
    console.log('swappingTx', swappintTx)


    // console.log('owner balance of tokens post swapping', await tokenOneContract.balanceOf("0xa7243fc6FB83b0490eBe957941a339be4Db11c29"), await tokenTwoContract.balanceOf("0xa7243fc6FB83b0490eBe957941a339be4Db11c29"));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


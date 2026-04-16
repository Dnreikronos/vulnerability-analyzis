const { ethers } = require("hardhat");

const wethAddress = "0x4200000000000000000000000000000000000006";
const { routerV2Abi, routerV2Address } = require("../../../generated/router-v2");
const deployedTokens = require("../../deployment-flows/token-constants/deploying-tokens.json");
const { abi: wethAbi } = require("./weth-abi.json");
const { tokenAbi } = require("../dexAbi");
const { default: BigNumber } = require("bignumber.js");

async function main() {
    try {
        const accounts = await ethers.getSigners();
        const owner = accounts[1];
        const ownerAddress = owner.address; // primarily uses 0th index itself for transactions
        const signerAddress = accounts[0].address;
        console.log("Owner address:", ownerAddress);

        const wethErc20 = await ethers.getContractAt(wethAbi, wethAddress);
        console.log("WETH balance before depositing:", await wethErc20.balanceOf(ownerAddress));

        // Ensure deposit amount is properly formatted
        const depositTx = await wethErc20.deposit({
            value: "10000000000000", // Sending 0.0001 ETH instead of 100000 wei
            gasLimit: 2000000
        });
        console.log("deposited tx, now gonna wait", depositTx)
        await depositTx.wait();
        console.log("Deposit successful.");

        console.log("WETH balance after depositing:", await wethErc20.balanceOf(ownerAddress));
        
        const champToken = deployedTokens.find((elm) => elm.name === 'CHAMP');
        const champAddress = champToken.address

        const champTokenContract = await ethers.getContractAt(tokenAbi, champAddress);
        const routerV2Contract = await ethers.getContractAt(routerV2Abi, routerV2Address);
        const stable = false;


        const champBalance = await champTokenContract.balanceOf(signerAddress);
        console.log("champ balance", champBalance);
        const champApprovalTx = await champTokenContract.approve(routerV2Address, BigNumber(1).multipliedBy(1e18).toString()); 
        await champApprovalTx.wait();
        const amountDesired = BigNumber(1).multipliedBy(1e14).toString();
        const deadline = Math.floor(Date.now() / 1000) + 718080;
        const addLiqTx = await routerV2Contract.addLiquidityETH(
            champAddress,
            stable,
            amountDesired,
            BigNumber(amountDesired).multipliedBy(0.85).toString(),
            amountDesired,
            signerAddress,
            deadline,
            {
                value: amountDesired,
                gasLimit: 21000000
            }
        )
        await addLiqTx.wait();
    } catch (error) {
        console.error("Error during execution:", error);
    } finally {
        process.exit(0);
    }
}

main();

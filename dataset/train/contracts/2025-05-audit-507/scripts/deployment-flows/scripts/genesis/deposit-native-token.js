const { genesisPoolManagerAddress, genesisPoolManagerAbi } = require('../../../../generated/genesis-pool-manager');
const { customTokenAbi } = require('../../../../generated/custom-token');
const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');
const { BigNumber } = require("ethers");

async function main () {

  accounts = await ethers.getSigners();
  owner = accounts[0];
  const ownerAddress = owner.address;
  console.log("ownerAddress : ", ownerAddress)

    try{
        const jsonFilePath = path.join(__dirname, '../../token-constants/genesis-tokens.json'); 
        const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
        const addresses = jsonData.map(obj => obj.address);

        const deployedTokens = require('../../token-constants/deployed-tokens.json');
        const blackAddress = deployedTokens[0].address;

        const nativeToken = addresses[0];
        const tokenOwner = accounts[1].address;
        const auctionIndex = 0;

        const genesisPoolInfo = {
            nativeToken : nativeToken,
            fundingToken : blackAddress,
            stable : false,
            duration : 3600,
            threshold : 5000,
            supplyPercent : 100, 
            startPrice : (BigInt(1) * BigInt(10 ** 16)).toString(),
            startTime : 1741151000
        }

        proposedNativeAmount = "200";
        proposedFundingAmount = "100"

        const tokenAllocation = {
            tokenOwner : tokenOwner,
            proposedNativeAmount : (BigInt(proposedNativeAmount) * BigInt(10 ** 18)).toString(),
            proposedFundingAmount : (BigInt(proposedFundingAmount) * BigInt(10 ** 18)).toString(),
            allocatedNativeAmount : 0,
            allocatedFundingAmount : 0,
            refundableNativeAmount : 0
        }

        console.log("nativeToken : ", nativeToken, "tokenOwner : ", tokenOwner);

        const approvalAmountString = (BigInt(proposedNativeAmount) * BigInt(10 ** 18)).toString();
        const tokenContract = await ethers.getContractAt(customTokenAbi, nativeToken);
        const tokenSigner = tokenContract.connect(accounts[1]);
        const txApproval = await tokenSigner.approve(genesisPoolManagerAddress, approvalAmountString);
        await txApproval.wait();

        const GenesisManagerContract = await ethers.getContractAt(genesisPoolManagerAbi, genesisPoolManagerAddress);
        const genesisSigner = GenesisManagerContract.connect(accounts[1]);
        const txt = await genesisSigner.depositNativeToken(nativeToken, auctionIndex, genesisPoolInfo, tokenAllocation);
        console.log("txt : ", txt);
    }
    catch(error){
        console.log("Error in deposit native token : ", error)
    }
}

main()
  .then(
    () => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});


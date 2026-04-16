const { genesisPoolAbi } = require('../../../../generated/genesis-pool');
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
        let jsonFilePath = path.join(__dirname, '../../token-constants/genesis-tokens.json'); 
        let jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
        const nativeAddresses = jsonData.map(obj => obj.address);

        jsonFilePath = path.join(__dirname, '../../token-constants/deploying-tokens.json'); 
        jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
        const addresses = jsonData.map(obj => obj.address);

        const deployedTokens = require('../../token-constants/deployed-tokens.json');
        const blackAddress = deployedTokens[0].address;

        const genesisPoolAddress = "0x6529f885a40725e79C90981d64ece5D1B4F89768";

        const nativeToken = nativeAddresses[0];
        const incentivesTokens = [addresses[0], addresses[1], blackAddress, nativeToken];
        const incentivesAmounts = [
            (BigInt(100) * BigInt(10 ** 18)).toString(),
            (BigInt(20) * BigInt(10 ** 18)).toString(),
            (BigInt(70) * BigInt(10 ** 18)).toString(),
            (BigInt(50) * BigInt(10 ** 18)).toString(),
        ];

        for(let i=0;i<incentivesTokens.length;i++){
          const tokenContract = await ethers.getContractAt(customTokenAbi, incentivesTokens[i]);
          const tokenSigner = tokenContract.connect(accounts[1]);
          const txApproval = await tokenSigner.approve(genesisPoolAddress, incentivesAmounts[i]);
          await txApproval.wait();
        }

        const GenesisPoolContract = await ethers.getContractAt(genesisPoolAbi, genesisPoolAddress);
        const genesisSigner = GenesisPoolContract.connect(accounts[1]);
        await genesisSigner.addIncentives(incentivesTokens, incentivesAmounts);
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


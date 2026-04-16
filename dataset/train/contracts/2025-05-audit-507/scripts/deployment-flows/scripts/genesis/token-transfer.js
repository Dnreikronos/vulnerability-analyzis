const { customTokenAbi } = require('../../../../generated/custom-token');
const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main () {

  accounts = await ethers.getSigners();
  owner = accounts[0];
  const ownerAddress = owner.address;
  console.log("ownerAddress : ", ownerAddress)

    try{
        const jsonFilePath = path.join(__dirname, '../../token-constants/genesis-tokens.json'); 
        const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
        const addresses = jsonData.map(obj => obj.address);

        const tranferAmount = (BigInt("1000000000") * BigInt(10 ** 18)).toString();

        for(let i=1; i<addresses.length; i++){
            const TokenContract = await ethers.getContractAt(customTokenAbi, addresses[i]);
            await TokenContract.approve(accounts[1].address, tranferAmount);
            await TokenContract.transfer(accounts[1].address, tranferAmount);
        }
    }
    catch(error){
        console.log("Error in aprrove token : ", error)
    }
}

main()
  .then(
    () => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});


const { ethers } = require("hardhat");
const { addLiquidity } = require('../../../blackhole-scripts/addLiquidity')
const { routerV2Address } = require('../../../../generated/router-v2')
const fs = require('fs');
const path = require('path');

async function main () {

  accounts = await ethers.getSigners();
  owner = accounts[0];
  const ownerAddress = owner.address;
  console.log("ownerAddress : ", ownerAddress)

    try{
        const jsonFilePath = path.join(__dirname, '../../token-constants/deploying-tokens.json'); // Adjust the path
        const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
        // Extract addresses
        const addresses = jsonData.map(obj => obj.address);

        const deployedTokens = require('../../token-constants/deployed-tokens.json');
        const black = deployedTokens[0].address;
        const usdc = deployedTokens[1].address;
        // const weth = deployedTokens[2].address;

        // await addLiquidity(routerV2Address, weth, usdc, 100, 267800);  // WETH/USDC
        // await addLiquidity(routerV2Address, weth, addresses[6], 100, 261100);  // WETH/DAI
        // await addLiquidity(routerV2Address, weth, addresses[5], 3604, 100);  // WETH/cbBTC
        // // await addLiquidity(routerV2Address, addresses[0], blackAddress, 100, 535600);  // WETH/BLACK
        // await addLiquidity(routerV2Address, weth, addresses[0], 100, 1071200);  // WETH/CHAMP
        // await addLiquidity(routerV2Address, weth, addresses[1], 100, 802400);  // WETH/SUPER
        // await addLiquidity(routerV2Address, weth, addresses[2], 100, 957634200);  // WETH/XAI
        // await addLiquidity(routerV2Address, weth, addresses[4], 100, 1059670);  // WETH/YGG
        // await addLiquidity(routerV2Address, weth, addresses[3], 100, 205850);  // WETH/VIRTUALS

        await addLiquidity(routerV2Address, usdc, addresses[6], 100, 100);      // USDC/DAI
        await addLiquidity(routerV2Address, usdc, addresses[5], 9614320, 100);  // USDC/cbBTC
        await addLiquidity(routerV2Address, usdc, black, 100, 202);      // USDC/BLACK  
       
        // await addLiquidity(routerV2Address, black, addresses[2], 125000, 125000);  // BLACK/XAI
        // await addLiquidity(routerV2Address, black, addresses[5], 150000, 3);  // BLACK/cbBTC
        // await addLiquidity(routerV2Address, black, addresses[4], 50000, 50000);  // BLACK/YGG
        // await addLiquidity(routerV2Address, black, addresses[1], 50000, 50000);  // BLACK/SUPER

        // await addLiquidity(routerV2Address, addresses[2], addresses[5], 50000, 1);  // XAI/cbBTC
        // await addLiquidity(routerV2Address, addresses[2], addresses[6], 100000, 5);  // XAI/DAI
        // await addLiquidity(routerV2Address, addresses[0], addresses[1], 25000, 25000);  // CHAMP/SUPER
        // await addLiquidity(routerV2Address, addresses[4], addresses[3], 250000, 25000);  // YGG/VIRTUALS
        

    }
    catch(error){
      console.log("error : ",error);
    }
}

main()
  .then(
    () => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});


const { ethers  } = require('hardhat');

async function main(){
    const TokenFactory = await ethers.getContractFactory("TokenFour");
    const token = await TokenFactory.deploy(); 
    await token.deployed();
    console.log("Token deployed at:", token.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

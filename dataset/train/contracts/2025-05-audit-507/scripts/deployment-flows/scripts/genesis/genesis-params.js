const { genesisPoolManagerAddress, genesisPoolManagerAbi } = require('../../../../generated/genesis-pool-manager');
const { ethers } = require("hardhat");

async function main () {

  accounts = await ethers.getSigners();
  owner = accounts[0];
  const ownerAddress = owner.address;
  console.log("ownerAddress : ", ownerAddress)

    try{

        const GenesisManagerContract = await ethers.getContractAt(genesisPoolManagerAbi, genesisPoolManagerAddress);
        const txt1 = await GenesisManagerContract.setMinimumDuration(2 * 3600);
        console.log("txt : ", txt1);

        const txt2 = await GenesisManagerContract.setMaturityTime(900);
        console.log("txt : ", txt2);
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


const ether = require('@openzeppelin/test-helpers/src/ether');
const { ethers  } = require('hardhat');




async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]

    console.log('Deploying Contract...');
    
    
    /*data = await ethers.getContractFactory("Black");
    black = await data.deploy();
    txDeployed = await black.deployed();
    console.log("black Address: ", black.address)*/

    data = await ethers.getContractFactory("VeArtProxyUpgradeable");
    veArtProxy = await upgrades.deployProxy(data,[], {initializer: 'initialize'});
    txDeployed = await veArtProxy.deployed();
    console.log("veArtProxy Address: ", veArtProxy.address)

    const black = ethers.utils.getAddress("0xF4C8E32EaDEC4BFe97E0F595AdD0f4450a863a11")

    data = await ethers.getContractFactory("VotingEscrow");
    veBlack = await data.deploy(black, veArtProxy.address);
    txDeployed = await veBlack.deployed();
    console.log("veBlack Address: ", veBlack.address);

    data = await ethers.getContractFactory("RewardsDistributor");
    RewardsDistributor = await data.deploy(veBlack.address);
    txDeployed = await RewardsDistributor.deployed();
    console.log("RewardsDistributor Address: ", RewardsDistributor.address)


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

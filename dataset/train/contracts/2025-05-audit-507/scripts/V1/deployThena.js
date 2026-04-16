const { ethers  } = require('hardhat');




async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]

    console.log('Deploying Contract...');
    
    
    data = await ethers.getContractFactory("Black");
    black = await data.deploy();
    txDeployed = await black.deployed();
    console.log("black Address: ", black.address)

    data = await ethers.getContractFactory("VeArtProxy");
    veArtProxy = await data.deploy();
    txDeployed = await veArtProxy.deployed();
    console.log("veArtProxy Address: ", veArtProxy.address)

    data = await ethers.getContractFactory("VotingEscrow");
    veBlack = await data.deploy(black.address, veArtProxy.address);
    txDeployed = await veBlack.deployed();
    console.log("veBlack Address: ", veBlack.address)

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

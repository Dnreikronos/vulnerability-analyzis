const { ethers  } = require('hardhat');

async function main () {

  accounts = await ethers.getSigners();
  console.log('accounts', accounts)
  owner = accounts[0]

  console.log('Deploying Contract...');

  data = await ethers.getContractFactory("PairFactory");
  console.log('data', data)
  pairFactory = await data.deploy();
  console.log('paurFactory', pairFactory);
  txDeployed = await pairFactory.deployed();
  console.log("pairFactory: ", pairFactory.address)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

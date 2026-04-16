const { ethers  } = require('hardhat');




async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]

    console.log('Deploying Contract...');

    const pairFactory = '0x02b14Bc0dF9f899E98080c110851AF15cd5ab571'
    const wETH = '0x4200000000000000000000000000000000000006'

    data = await ethers.getContractFactory("RouterV2");
    router = await data.deploy(pairFactory, wETH);

    txDeployed = await router.deployed();
    console.log("router: ", router.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

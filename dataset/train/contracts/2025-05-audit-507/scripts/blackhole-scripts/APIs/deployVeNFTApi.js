const { ethers  } = require('hardhat');
const { voterV3Address } = require("../gaugeConstants/voter-v3");
const { rewardsDistributorAddress } = require("../gaugeConstants/reward-distributor")
const {} = require("../gaugeConstants/")



async function main () {

  accounts = await ethers.getSigners();
  owner = accounts[0]

  console.log('Deploying Contract...');

  /*data = await ethers.getContractFactory("PairAPI");
  pairApi = await data.deploy(voter,wbribe);
  txDeployed = await pairApi.deployed();
  console.log("pairApi: ", pairApi.address)*/


  /*data = await ethers.getContractFactory("veNFTAPI");
  veNFTAPI = await data.deploy(voter, rewDistro, pairApi.address, pairFactory);
  txDeployed = await veNFTAPI.deployed();
  console.log("veNFTAPI: ", veNFTAPI.address)*/

  address _voter, address _rewarddistro, address _pairApi

  // deploy
  data = await ethers.getContractFactory("veNFTAPI");
  input = [voterV3Address, rewardsDistributorAddress, pairapi, pairFactory]
  venftapi = await upgrades.deployProxy(data,input, {initializer: 'initialize'});
  txDeployed = await venftapi.deployed();
  console.log("veNFTAPI: ", venftapi.address)

  /*data = await ethers.getContractFactory("veNFTAPI");
  console.log('upgrading...')
  venftapi = await upgrades.upgradeProxy('0x190b166Edf30Baa8C1cdBF6653107Cec1020D36D', data);
  console.log('upgraded...')*/

  


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

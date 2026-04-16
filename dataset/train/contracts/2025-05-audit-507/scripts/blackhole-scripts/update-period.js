const { ethers  } = require('hardhat');
const { voterV3Abi, voterV3Address } = require('./gaugeConstants/voter-v3');
const { minterUpgradeableAbi, minterUpgradeableAddress } = require('../../generated/minter-upgradeable');



async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]

    const VoterV3Contract = await ethers.getContractAt(minterUpgradeableAbi, minterUpgradeableAddress);
    const getAllPools = await VoterV3Contract.update_period();

    console.log("poolsSize ", getAllPools)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
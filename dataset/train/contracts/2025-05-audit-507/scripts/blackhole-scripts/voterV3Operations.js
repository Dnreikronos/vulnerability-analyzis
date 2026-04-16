const { ethers  } = require('hardhat');
const { voterV3Abi, voterV3Address } = require('./gaugeConstants/voter-v3');



async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]

    const VoterV3Contract = await ethers.getContractAt(voterV3Abi, voterV3Address);
    const getAllPools = await VoterV3Contract.distributeFees();

    console.log("poolsSize ", getAllPools)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
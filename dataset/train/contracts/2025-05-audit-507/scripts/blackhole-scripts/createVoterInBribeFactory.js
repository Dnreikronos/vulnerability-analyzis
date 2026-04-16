const { bribeFactoryV3Abi, bribeFactoryV3Address } = require('./gaugeConstants/bribe-factory-v3')
const { ethers  } = require('hardhat');
const { voterV3Address } = require('./gaugeConstants/voter-v3')
const { ZERO_ADDRESS } = require("@openzeppelin/test-helpers/src/constants.js");

async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]
    const ownerAddress = owner.address;

    const bribeV3Contract = await ethers.getContractAt(bribeFactoryV3Abi, bribeFactoryV3Address);
    // // console.log("bribeV3Contract ", bribeV3Contract.address)
    const createVoter = await bribeV3Contract.setVoter(voterV3Address);
    console.log("createVoter", createVoter)
}   

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
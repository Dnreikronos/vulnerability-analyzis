const { ethers  } = require('hardhat');
const { gaugeV2Abi } = require('./gaugeConstants/gaugeV2-constants');
const { ZERO_ADDRESS } = require("@openzeppelin/test-helpers/src/constants.js");
const { BigNumber } = require("ethers");

async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]
    const gaugeV2Contract = await ethers.getContractAt(gaugeV2Abi, "0xd30214ADBE03fc60FFf8627f53181d730407C900");
    const balance = await gaugeV2Contract.withdrawAll();
    console.log("balance ", balance);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
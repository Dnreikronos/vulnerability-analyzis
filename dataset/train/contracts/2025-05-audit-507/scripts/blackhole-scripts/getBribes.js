const { ethers  } = require('hardhat');
const { gaugeV2Abi } = require('./gaugeConstants/gaugeV2-constants');
const { bribeAbi } = require('./gaugeConstants/bribe');



async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]

    const gaugeContract = await ethers.getContractAt(gaugeV2Abi, "0xd4d6D68fb9Bf88Bf4C2323c3951F873f88c15CCa");
    const bribeAddress = await gaugeContract.internal_bribe();

    console.log("bribeAddress", bribeAddress)

    const bribeContract = await ethers.getContractAt(bribeAbi, bribeAddress);

    console.log("bribeContract", bribeAddress)

    const time = await bribeContract.getNextEpochStart();

    console.log("time", time);

    const xx = await bribeContract.tokenRewardsPerEpoch("0xa63Fe72AdE0A4e5eD762B2ECF9CaD3a58664001A", time);
    console.log("tokenRewardsPerEpoch", time)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
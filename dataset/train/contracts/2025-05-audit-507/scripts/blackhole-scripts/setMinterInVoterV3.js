
const { voterV3Abi, voterV3Address } = require("./gaugeConstants/voter-v3");
const { minterUpgradableAddress } = require("./gaugeConstants/minter-upgradable");

async function main () {

    const voterV3Contract = await ethers.getContractAt(voterV3Abi, voterV3Address);
    await voterV3Contract.setMinter(minterUpgradableAddress);
    console.log('set minter in voterV3Contract');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
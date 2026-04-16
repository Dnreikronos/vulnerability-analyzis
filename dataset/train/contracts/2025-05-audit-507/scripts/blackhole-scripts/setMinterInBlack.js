const { blackAbi, blackAddress } = require("./gaugeConstants/black");
const { minterUpgradableAddress } = require("./gaugeConstants/minter-upgradable");

async function main () {
    const blackContract = await ethers.getContractAt(blackAbi, blackAddress);
    await blackContract.setMinter(minterUpgradableAddress);
    console.log('set minter in Black');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
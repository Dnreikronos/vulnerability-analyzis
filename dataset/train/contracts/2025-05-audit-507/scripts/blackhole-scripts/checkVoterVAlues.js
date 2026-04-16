
const { voterV3Abi, voterV3Address } = require('./gaugeConstants/voter-v3')

async function main () {
    const voterV3Contract = await ethers.getContractAt(voterV3Abi, voterV3Address);
    console.log("voterV3Contract ", voterV3Address, voterV3Contract.address)
    const minterValue = await voterV3Contract.minter();
    const veValue = await voterV3Contract._ve();
    console.log("minter value", minterValue, "ve Value", veValue);
}   

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
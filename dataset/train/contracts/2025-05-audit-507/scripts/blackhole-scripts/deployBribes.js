const { ethers  } = require('hardhat');
const { tokenOne, tokenTwo } = require('../V1/dexAbi');
const { bribeFactoryV3Address, bribeFactoryV3Abi, bribeTypeEnum } = require('./bribesAbi');

async function main () {

    accounts = await ethers.getSigners();
    owner = accounts[0]
    const ownerAddress = owner.address
    // function createBribe(address _owner,address _token0,address _token1, string memory _type) external returns (address) {
    const bribeFactoryContract = await ethers.getContractAt(bribeFactoryV3Abi, bribeFactoryV3Address, owner);
    // keeping the owner as the common account listed in the google doc.
    await bribeFactoryContract.last_bribe();
    // function createBribe(address _owner,address _token0,address _token1, string memory _type) external returns (address) {
    const deployInternalBribeTx = await bribeFactoryContract.createBribe(ownerAddress, tokenOne, tokenTwo, "internal", {
        gasLimit: 2000000
    });
    await deployInternalBribeTx.wait();
    console.log('address of interal address', deployInternalBribeTx.address)
    const deployInternalBribeTxExternal = await bribeFactoryContract.createBribe(ownerAddress, tokenOne, tokenTwo, bribeTypeEnum.EXTERNAL, {
        gasLimit: 2000000
    });
    console.log('bribe factory contract second bribe trynna deploy');
    await deployInternalBribeTxExternal.wait();
    console.log('deployed external bribe address', deployInternalBribeTxExternal.address)
}   

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const { ethers  } = require('hardhat');
const { gaugeFactoryV2Abi, gaugeFactoryV2Address } = require('./gaugeConstants/gauge-factory-v2');
const { veNFTAPIAbi, veNFTAPIAddress } = require('./gaugeConstants/ve-nft-api');



async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0]

    const veNFTApi = await ethers.getContractAt(veNFTAPIAbi, veNFTAPIAddress);
    const userLocks = await veNFTApi.getNFTFromAddress(owner.address);
    // for(const p of userLocks){
        // const lockId = p.id.toNumber();
        // const amount = p.amount.toNumber();
        try {
    const rewardForLock = await veNFTApi.allPairRewards(BigInt(13), BigInt(0), BigInt(2), { gasLimit: 21000000 });
    console.log("Reward for lock ID 1", rewardForLock);
        } catch (error) {
            console.error("Error fetching rewards for lock ID", ":", error);
        }
        
    // }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
const { ethers } = require("hardhat");
const { algebraFactoryAbi} = require("../../../../generated/algebra-factory");
const { algebraEternalFarmingAbi } = require("../../../../generated/algebra-eternal-farming");
const { algebraFactory, algebraEternalFarming } = require("../contract-deployments/algebra-addresses")
const { gaugeFactoryCLAddress } = require("../../../../generated/gauge-factory-cl");
const { gaugeManagerAddress } = require("../../../../generated/gauge-manager");

async function main () {
    try{
        const algebraFactoryContract = await ethers.getContractAt(algebraFactoryAbi, algebraFactory);
        
        const algebraEternalFarmingContract = await ethers.getContractAt(algebraEternalFarmingAbi, algebraEternalFarming);

        // role of community_fee_withdrawer: It'll call withdraw function of CommunityVault address
        // role of community_fee_vault_admin: Used in ChangeCommunityFeeReceiver AND to accept algebraFeeChangeProposal

        // In our usecase both of the role will be with GaugeManager contract address.

        const INCENTIVE_MAKER_ROLE = await algebraEternalFarmingContract.INCENTIVE_MAKER_ROLE();

        const tx1 = await algebraFactoryContract.grantRole(INCENTIVE_MAKER_ROLE, gaugeFactoryCLAddress);
        await tx1.wait();

        const tx2 = await algebraFactoryContract.grantRole(INCENTIVE_MAKER_ROLE, gaugeManagerAddress);
        await tx2.wait();

        console.log("setCommunityFeeWithdraw success");
    } catch(error){
        console.log("setCommunityFeeWithdraw failed: ", error);
        process.exit(1);
    }
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error); 
    process.exit(1);
  });

const { ethers } = require("hardhat");
const { algebraFactoryAbi} = require("../../../../generated/algebra-factory");
const { algebraFactory } = require("../contract-deployments/algebra-addresses")
const { gaugeManagerAddress, gaugeManagerAbi } = require("../../../../generated/gauge-manager");
const { contracts} = require("../../../../deployments/custom-pool-deployers.json")

async function main () {
    try{
        const algebraFactoryContract = await ethers.getContractAt(algebraFactoryAbi, algebraFactory);
        
        const gaugeManagerContract = await ethers.getContractAt(gaugeManagerAbi, gaugeManagerAddress);

        // role of community_fee_withdrawer: It'll call withdraw function of CommunityVault address
        // role of community_fee_vault_admin: Used in ChangeCommunityFeeReceiver AND to accept algebraFeeChangeProposal

        // In our usecase both of the role will be with GaugeManager contract address.

        const COMMUNITY_FEE_WITHDRAWER_ROLE = await gaugeManagerContract.COMMUNITY_FEE_WITHDRAWER_ROLE();
        const COMMUNITY_FEE_VAULT_ADMINISTRATOR = await gaugeManagerContract.COMMUNITY_FEE_VAULT_ADMINISTRATOR();

        const tx = await algebraFactoryContract.grantRole(COMMUNITY_FEE_WITHDRAWER_ROLE, gaugeManagerAddress);
        await tx.wait();

        const tx1 = await algebraFactoryContract.grantRole(COMMUNITY_FEE_VAULT_ADMINISTRATOR, gaugeManagerAddress);
        await tx1.wait();
        for (const address of Object.values(contracts)) {
            console.log(address);
            const tx2 = await algebraFactoryContract.grantRole(COMMUNITY_FEE_VAULT_ADMINISTRATOR, address);
            await tx2.wait();
        }
        
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

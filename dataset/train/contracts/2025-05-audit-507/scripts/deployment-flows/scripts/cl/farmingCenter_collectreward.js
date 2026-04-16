const { ethers } = require("hardhat");
const {algebraPoolAbi } = require("../../../../generated/algebra-pool");
const { contracts } = require("../../../../deployments/custom-pool-deployers.json");

async function main () {
    accounts = await ethers.getSigners();
    const ownerAddress = accounts[0].address;
    const farmingCenter = 0xB05E0F8c7Ca4827591266f9A067AA42a3A95d478; // Replace with actual address
    // Get incentive key first
    (IERC20Minimal rewardTokenAdd, IERC20Minimal bonusRewardTokenAdd, IAlgebraPool pool, uint256 nonce) =
        IAlgebraEternalFarming(0x0c040F2e0aacFf3751CCb6143B3DbE313BF2173a).incentiveKeys(positionsInfo[i].pair);
        IncentiveKey memory incentiveKey = IncentiveKey(rewardTokenAdd, bonusRewardTokenAdd, pool, nonce);

        // Staticcall collectRewards on the hardcoded FarmingCenter
        (bool success, bytes memory result) = farmingCenter.staticcall(
            abi.encodeWithSelector(
            IFarmingCenter.collectRewards.selector,
            incentiveKey,
            tokenId
        ));
        if(success){
            (positionsInfo[i].account_gauge_earned, ) = abi.decode(result, (uint256, uint256));
        }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error); 
    process.exit(1);
  });

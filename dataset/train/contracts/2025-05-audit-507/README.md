# Blackhole audit details
* Total Prize Pool: $28,000 in USDC
  + HM awards: up to $19,950 in USDC
    - If no valid Highs or Mediums are found, the HM pool is $0 
  + QA awards: $800 in USDC
  + Judge awards: $2,500 in USDC
  + Scout awards: $500 in USDC
  + Mitigation Review: $4,250 in USDC
* [Read our guidelines for more details](https://docs.code4rena.com/roles/wardens)
* Starts May 28, 2025 20:00 UTC 
* Ends June 9, 2025 20:00 UTC 

**Note re: risk level upgrades/downgrades**

Two important notes about judging phase risk adjustments: 
* High- or Medium-risk submissions downgraded to Low-risk (QA) will be ineligible for awards.
* Upgrading a Low-risk finding from a QA report to a Medium- or High-risk finding is not supported.

As such, wardens are encouraged to select the appropriate risk level carefully during the submission phase.

## Automated Findings / Publicly Known Issues

The 4naly3er report can be found [here](https://github.com/code-423n4/2025-05-audit-507/blob/main/4naly3er-report.md).

_Note for C4 wardens: Anything included in this `Automated Findings / Publicly Known Issues` section is considered a publicly known issue and is ineligible for awards._

Any issues that have been identified in previous audits of the ThenaFi as well as the audit of the codebase itself are considered known and thus out-of-scope.

Privilege issues are solely accepted if they result in a privilege escalation pathway that would result from incorrect behaviour of the code, and are judged on a case-by-case basis.

# Overview

Introducing Blackhole, the Ultimate Liquidity & Trading Hub for all Blockchain Projects on Avalanche combining the best of DeFi:

* Curve's vote-escrow
* Uniswap V3's clAMM pools
* Custom Fee pools
* Enhanced ve(3, 3) token design

Additional features that have been introduced to the above DeFi components include:

* Supermassive veNFT burns team tokens forever, ensuring trustless alignment
* Genesis Pools; an innovative pre-TGE liquidity seeding tool empowers projects to launch with community-aligned, capital-efficient liquidity. Contributors earn yield-bearing LP tokens, driving organic growth

## Links

* **Previous audits:**  [Peckshield Audit](https://drive.google.com/file/d/1e-ePA3ZofuJ4rjwoADkaBqvqK3Pnyi49/view)
* **Documentation:**
  + Main Documentation: https://docs.google.com/document/d/1SOG2RGIin-EmAKZtnIXppRX9GmHWBC5ucEodeLG8kzU/edit?tab=t.0
  + Contract Diff: https://docs.google.com/document/d/1rw7sW0yc7PqPV2MtMX6zpKIvsT9PCPyCoSec1zYuP_s/edit?tab=t.m41e7w3joszr
* **Website:** https://blackhole.xyz/
* **X/Twitter:** https://x.com/BlackholeDex

---

# Scope

The **main focus of contest participants should be to ensure the validity of the code delta introduced by the Blackhole team**. The codebase is effectively a fork of ThenaFi, a project that has undergone several audits and whose behaviour is considered to be sound.

Wardens should maximize the efficiency of the time they invest in the contest by assessing the code delta and documentation of changes provided in the links above.

### Files in scope

| Contract | SLOC | Purpose | Libraries used |  
| ----------- | ----------- | ----------- | ----------- |
| contracts/APIHelper/AlgebraPoolAPI.sol | 288 |N/A|@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol<br>@cryptoalgebra/integral-core/contracts/interfaces/IAlgebraPool.sol<br>@cryptoalgebra/integral-periphery/contracts/interfaces/INonfungiblePositionManager.sol|
| contracts/APIHelper/AlgebraPoolAPIStorage.sol | 43 |N/A|@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol<br>@cryptoalgebra/integral-core/contracts/interfaces/IAlgebraPool.sol<br>@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol|
| contracts/APIHelper/BlackholePairAPIV2.sol | 582 |N/A|@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol<br>@cryptoalgebra/integral-periphery/contracts/interfaces/IQuoterV2.sol<br>@cryptoalgebra/integral-core/contracts/interfaces/IAlgebraPool.sol<br>hardhat/console.sol|
| contracts/APIHelper/GenesisPoolAPI.sol | 171 |N/A|@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol|
| contracts/APIHelper/RewardAPI.sol | 109 |N/A|@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol<br>hardhat/console.sol|
| contracts/APIHelper/TokenAPI.sol | 51 |N/A|@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol|
| contracts/APIHelper/TradeHelper.sol | 124 |N/A||
| contracts/APIHelper/veNFTAPI.sol | 300 |N/A|@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol<br>hardhat/console.sol|
| contracts/APIHelper/veNFTAPIV1.sol | 367 |N/A|@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol<br>hardhat/console.sol|
| contracts/AVM/AutoVotingEscrow.sol | 94 |N/A||
| contracts/AVM/AutoVotingEscrowManager.sol | 157 |N/A|@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol<br>@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol<br>@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol|
| contracts/AVM/interfaces/IAutoVotingEscrow.sol | 7 |N/A||
| contracts/AVM/interfaces/IAutoVotingEscrowManager.sol | 4 |N/A||
| contracts/AlgebraCLVe33/GaugeCL.sol | 232 |N/A|@openzeppelin/contracts/security/ReentrancyGuard.sol<br>@openzeppelin/contracts/access/Ownable.sol<br>@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol<br>@openzeppelin/contracts/token/ERC20/IERC20.sol<br>@cryptoalgebra/integral-core/contracts/interfaces/IAlgebraPool.sol<br>@cryptoalgebra/integral-periphery/contracts/interfaces/INonfungiblePositionManager.sol<br>@cryptoalgebra/integral-farming/contracts/interfaces/IAlgebraEternalFarming.sol<br>@cryptoalgebra/integral-farming/contracts/interfaces/IAlgebraEternalVirtualPool.sol<br>@cryptoalgebra/integral-farming/contracts/interfaces/IFarmingCenter.sol<br>@cryptoalgebra/integral-farming/contracts/base/IncentiveKey.sol<br>@cryptoalgebra/integral-core/contracts/interfaces/IERC20Minimal.sol<br>@cryptoalgebra/integral-farming/contracts/libraries/IncentiveId.sol|
| contracts/AlgebraCLVe33/GaugeFactoryCL.sol | 104 |N/A|@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol<br>@cryptoalgebra/integral-farming/contracts/interfaces/IAlgebraEternalFarming.sol<br>@cryptoalgebra/integral-core/contracts/interfaces/IAlgebraPool.sol<br>@cryptoalgebra/integral-farming/contracts/base/IncentiveKey.sol<br>@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol<br>@openzeppelin/contracts/token/ERC20/IERC20.sol|
| contracts/Black.sol | 81 |N/A||
| contracts/BlackClaims.sol | 145 |N/A||
| contracts/BlackGovernor.sol | 78 |N/A|@openzeppelin/contracts/governance/IGovernor.sol|
| contracts/Bribes.sol | 270 |N/A|@openzeppelin/contracts/token/ERC20/IERC20.sol<br>@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol<br>@openzeppelin/contracts/security/ReentrancyGuard.sol<br>@openzeppelin/contracts/utils/math/Math.sol|
| contracts/CustomPoolDeployer.sol | 150 |N/A|@cryptoalgebra/integral-periphery/contracts/interfaces/IAlgebraCustomPoolEntryPoint.sol<br>@cryptoalgebra/integral-core/contracts/interfaces/IAlgebraPool.sol<br>@cryptoalgebra/integral-core/contracts/interfaces/vault/IAlgebraCommunityVault.sol<br>@openzeppelin/contracts/access/Ownable.sol|
| contracts/CustomToken.sol | 20 |N/A|@openzeppelin/contracts/token/ERC20/ERC20.sol<br>@openzeppelin/contracts/access/Ownable.sol|
| contracts/Fan.sol | 15 |N/A|@openzeppelin/contracts/token/ERC20/ERC20.sol<br>@openzeppelin/contracts/access/Ownable.sol|
| contracts/FixedAuction.sol | 28 |N/A|@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol|
| contracts/GaugeExtraRewarder.sol | 128 |N/A|@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol<br>@openzeppelin/contracts/token/ERC20/IERC20.sol<br>@openzeppelin/contracts/access/Ownable.sol|
| contracts/GaugeManager.sol | 418 |N/A|@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol<br>@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol<br>@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol<br>@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol<br>@cryptoalgebra/integral-core/contracts/interfaces/IAlgebraPool.sol<br>@cryptoalgebra/integral-core/contracts/interfaces/vault/IAlgebraCommunityVault.sol<br>@cryptoalgebra/integral-farming/contracts/interfaces/IAlgebraEternalFarming.sol<br>@cryptoalgebra/integral-farming/contracts/base/IncentiveKey.sol|
| contracts/GaugeV2.sol | 287 |N/A|@openzeppelin/contracts/security/ReentrancyGuard.sol<br>@openzeppelin/contracts/access/Ownable.sol<br>@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol<br>@openzeppelin/contracts/token/ERC20/IERC20.sol|
| contracts/GenesisPool.sol | 328 |N/A|@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol<br>@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol|
| contracts/GenesisPoolManager.sol | 244 |N/A|@openzeppelin/contracts/access/Ownable.sol<br>@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol<br>@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol<br>@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol|
| contracts/GlobalRouter.sol | 144 |N/A|@openzeppelin/contracts/utils/math/SafeMath.sol<br>@openzeppelin/contracts/security/ReentrancyGuard.sol<br>@openzeppelin/contracts/access/Ownable.sol<br>@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol<br>@openzeppelin/contracts/token/ERC20/IERC20.sol|
| contracts/MinterUpgradeable.sol | 168 |N/A|@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol|
| contracts/Pair.sol | 453 |N/A||
| contracts/PairFees.sol | 46 |N/A||
| contracts/PairGenerator.sol | 16 |N/A||
| contracts/PermissionsRegistry.sol | 151 |N/A||
| contracts/RewardsDistributor.sol | 215 |N/A||
| contracts/RouterV2.sol | 520 |N/A|@cryptoalgebra/integral-periphery/contracts/interfaces/IQuoterV2.sol<br>@cryptoalgebra/integral-periphery/contracts/interfaces/ISwapRouter.sol|
| contracts/SetterTopNPoolsStrategy.sol | 60 |N/A|@openzeppelin/contracts/access/Ownable.sol|
| contracts/SetterVoteWeightStrategy.sol | 57 |N/A|@openzeppelin/contracts/access/Ownable.sol|
| contracts/Thenian.sol | 113 |N/A|@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol<br>@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol<br>@openzeppelin/contracts/access/Ownable.sol<br>@openzeppelin/contracts/utils/math/SafeMath.sol<br>@openzeppelin/contracts/utils/cryptography/MerkleProof.sol|
| contracts/TokenHandler.sol | 150 |N/A||
| contracts/VeArtProxyUpgradeable.sol | 38 |N/A|@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol|
| contracts/VoterV3.sol | 185 |N/A|@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol<br>@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol<br>@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol<br>@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol|
| contracts/VotingEscrow.sol | 803 |N/A|@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol<br>@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol|
| contracts/WAVAX.sol | 56 |N/A||
| contracts/chainlink/AutomationBase.sol | 13 |N/A||
| contracts/chainlink/AutomationCompatible.sol | 4 |N/A||
| contracts/chainlink/AutomationCompatibleInterface.sol | 3 |N/A||
| contracts/chainlink/EpochController.sol | 68 |N/A|@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol<br>@openzeppelin/contracts/utils/Strings.sol|
| contracts/factories/AuctionFactory.sol | 50 |N/A|@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol|
| contracts/factories/BribeFactoryV3.sol | 133 |N/A|@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol|
| contracts/factories/GaugeFactory.sol | 83 |N/A|@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol|
| contracts/factories/GenesisPoolFactory.sol | 65 |N/A|@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol|
| contracts/factories/PairFactory.sol | 129 |N/A|@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol|
| contracts/governance/Governor.sol | 349 |N/A|@openzeppelin/contracts/utils/math/SafeCast.sol<br>@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol<br>@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol<br>@openzeppelin/contracts/utils/cryptography/ECDSA.sol<br>@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol<br>@openzeppelin/contracts/utils/introspection/ERC165.sol<br>@openzeppelin/contracts/utils/structs/DoubleEndedQueue.sol<br>@openzeppelin/contracts/utils/Address.sol<br>@openzeppelin/contracts/utils/Context.sol<br>@openzeppelin/contracts/utils/Timers.sol<br>@openzeppelin/contracts/governance/IGovernor.sol|
| contracts/governance/L2Governor.sol | 254 |N/A|@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol<br>@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol<br>@openzeppelin/contracts/utils/cryptography/ECDSA.sol<br>@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol<br>@openzeppelin/contracts/utils/introspection/ERC165.sol<br>@openzeppelin/contracts/utils/math/SafeCast.sol<br>@openzeppelin/contracts/utils/structs/DoubleEndedQueue.sol<br>@openzeppelin/contracts/utils/Address.sol<br>@openzeppelin/contracts/utils/Context.sol<br>@openzeppelin/contracts/utils/Timers.sol<br>@openzeppelin/contracts/governance/IGovernor.sol|
| contracts/governance/L2GovernorCountingSimple.sol | 52 |N/A|contracts/governance/L2Governor.sol|
| contracts/governance/L2GovernorVotes.sol | 12 |N/A|@openzeppelin/contracts/governance/utils/IVotes.sol<br>contracts/governance/L2Governor.sol|
| contracts/governance/L2GovernorVotesQuorumFraction.sol | 30 |N/A|contracts/governance/L2GovernorVotes.sol|
| contracts/interfaces/IAlgebraCLFactory.sol | 4 |N/A|@cryptoalgebra/integral-core/contracts/interfaces/IAlgebraFactory.sol|
| contracts/interfaces/IAlgebraCustomCommunityVault.sol | 4 |N/A|@cryptoalgebra/integral-core/contracts/interfaces/vault/IAlgebraCommunityVault.sol|
| contracts/interfaces/IAlgebraEternalFarmingCustom.sol | 5 |N/A|@cryptoalgebra/integral-farming/contracts/base/IncentiveKey.sol<br>@cryptoalgebra/integral-farming/contracts/interfaces/IAlgebraEternalFarming.sol|
| contracts/interfaces/IAlgebraFarmingProxyPluginFactory.sol | 3 |N/A||
| contracts/interfaces/IAlgebraPoolAPIStorage.sol | 3 |N/A||
| contracts/interfaces/IAuction.sol | 3 |N/A||
| contracts/interfaces/IAuctionFactory.sol | 3 |N/A||
| contracts/interfaces/IAutomatedVotingManager.sol | 3 |N/A||
| contracts/interfaces/IBlack.sol | 3 |N/A||
| contracts/interfaces/IBlackClaims.sol | 9 |N/A||
| contracts/interfaces/IBlackGovernor.sol | 13 |N/A||
| contracts/interfaces/IBlackHoleVotes.sol | 4 |N/A|@openzeppelin/contracts/governance/utils/IVotes.sol|
| contracts/interfaces/IBlackholePairApiV2.sol | 43 |N/A||
| contracts/interfaces/IBribe.sol | 3 |N/A||
| contracts/interfaces/IBribeAPI.sol | 3 |N/A||
| contracts/interfaces/IBribeDistribution.sol | 3 |N/A||
| contracts/interfaces/IBribeFactory.sol | 3 |N/A||
| contracts/interfaces/IBribeFull.sol | 3 |N/A||
| contracts/interfaces/IDibs.sol | 3 |N/A||
| contracts/interfaces/IERC20.sol | 3 |N/A||
| contracts/interfaces/IGauge.sol | 3 |N/A||
| contracts/interfaces/IGaugeAPI.sol | 3 |N/A||
| contracts/interfaces/IGaugeCL.sol | 4 |N/A|@cryptoalgebra/integral-farming/contracts/base/IncentiveKey.sol|
| contracts/interfaces/IGaugeDistribution.sol | 3 |N/A||
| contracts/interfaces/IGaugeFactory.sol | 3 |N/A||
| contracts/interfaces/IGaugeFactoryCL.sol | 4 |N/A||
| contracts/interfaces/IGaugeManager.sol | 8 |N/A||
| contracts/interfaces/IGenesisPool.sol | 4 |N/A||
| contracts/interfaces/IGenesisPoolBase.sol | 42 |N/A||
| contracts/interfaces/IGenesisPoolFactory.sol | 3 |N/A||
| contracts/interfaces/IGenesisPoolManager.sol | 3 |N/A||
| contracts/interfaces/IMinter.sol | 3 |N/A||
| contracts/interfaces/IPair.sol | 3 |N/A||
| contracts/interfaces/IPairCallee.sol | 3 |N/A||
| contracts/interfaces/IPairFactory.sol | 3 |N/A||
| contracts/interfaces/IPairGenerator.sol | 3 |N/A||
| contracts/interfaces/IPairInfo.sol | 3 |N/A||
| contracts/interfaces/IPermissionsRegistry.sol | 3 |N/A||
| contracts/interfaces/IRewardsDistributor.sol | 3 |N/A||
| contracts/interfaces/IRouter.sol | 8 |N/A||
| contracts/interfaces/ITokenHandler.sol | 3 |N/A||
| contracts/interfaces/ITopNPoolsStrategy.sol | 3 |N/A||
| contracts/interfaces/IUniswapRouterETH.sol | 3 |N/A||
| contracts/interfaces/IUniswapV2Pair.sol | 3 |N/A||
| contracts/interfaces/IVeArtProxy.sol | 3 |N/A||
| contracts/interfaces/IVoteWeightStrategy.sol | 4 |N/A||
| contracts/interfaces/IVoter.sol | 3 |N/A||
| contracts/interfaces/IVotingEscrow.sol | 18 |N/A||
| contracts/interfaces/IWETH.sol | 3 |N/A||
| contracts/interfaces/IWrappedBribeFactory.sol | 3 |N/A||
| contracts/libraries/Base64.sol | 41 |N/A||
| contracts/libraries/BlackTimeLibrary.sol | 52 |N/A||
| contracts/libraries/Math.sol | 33 |N/A||
| contracts/libraries/PoolsAndRewardsLibrary.sol | 10 |N/A||
| contracts/libraries/SignedSafeMath.sol | 33 |N/A||
| contracts/libraries/VoterFactoryLib.sol | 63 |N/A||
| contracts/libraries/VotingBalanceLogic.sol | 178 |N/A||
| contracts/libraries/VotingDelegationLib.sol | 174 |N/A||
| **Totals** | **10108** | | |

*For a machine-readable version, see [scope.txt](https://github.com/code-423n4/2025-05-audit-507/blob/main/scope.txt)*

### Files out of scope

| File         |
| ------------ |
| envFiles/devnet/BlackTimeLibrary.sol |
| envFiles/qanet/BlackTimeLibrary.sol |
| envFiles/testnet/BlackTimeLibrary.sol |
| Totals: 3 |

*For a machine-readable version, see [out_of_scope.txt](https://github.com/code-423n4/2025-05-audit-507/blob/main/out_of_scope.txt)*

# Additional context

## AVM Voting Mechanism

Voting for AVM locks happens within the last hour before an epoch ends.

The steps followed in succession for processing the AVM votes are as follows:

1. Reset all locks using `AutoVotingEscrowManager::performLockAction` in a paginated manner with the `isVote` argument set to `false`
2. Set the `topNPools` and `voteWeights` being as an array of max size as `topN` is based off of an algorithm on the Blackhole backend whose inputs are the rewards on gauges and the votes made by non-AVM locks (via `SetterTopNPoolsStrategy` and `SetterVoteWeightStrategy` for the `topNPools` and `voteWeights` configurations respectively)
3. Execute voting using `AutoVotingEscrowManager::performLockAction` in a paginated manner with the `isVote` argument set to `true`

## Areas of concern (where to focus for bugs)

Access Control & Permissions – Ensure that critical contracts (e.g., Upgrade Executor) have tightly scoped and secure access controls to prevent unauthorized actions.

Logic & Flow Validation – Verify that core logic and processes function as intended and align with system goals, without inconsistencies or unintended behaviors.

Race Conditions & Edge Cases – Look out for subtle race conditions or edge cases, especially around upgrades and interactions between components, that could introduce vulnerabilities.

## Main invariants

### Blackhole Minting

* Mints should solely occur via the `MinterUpgradeable` contract
* `Black` tokens can only be minted on an epoch flip when the `MinterUpgradeable` transfers newly minted tokens to the `GaugeManager` for emission
* A certain percentage of emission goes to the team wallet which can be reconfigured post-deployment
* The `BlackGovernor` can update the emission rate after it crosses the `TAIL_START` emission rate which will be roughly `8,969,150` tokens
* The `BlackGovernor` will be referenced from the `GaugeManager` and can only be set by the `GAUGE_ADMIN` role
* The starting `Black` emission value as well as increase / decrease percentages are part of the `MinterUpgradable` contract and may change if the whitepaper is updated
* Minting of `Black` tokens and distribution to the `GaugeManager` and each of the `Gauge` instances should happen only once in single epoch

### Liquidity Pools

#### AMM Pairs

* Creation of basic pools should be permissionless
* Each pool should retain its configured fee which can be changed by the `FeeManager`
* The `FeeManager` role can transition through a two-step acceptance process
* The `FeeManager` can update the `dibs` address as well as the referral fee of the `PairFactory`

#### Token Handling

* Only the `Governor` and `GenesisManager` can whitelist / blacklist tokens
* Only the `Governor` and `GenesisManager` can create a token connector
* The token volatility can be configured solely by the `Governor`

### Voting System

#### Voter

* A vote cannot be split in more than `maxVotingNum` instances; a value configurable by the `VOTER_ADMIN`
* Updating the AVM and Gauge Manager in the Voter instance can only be done by the `VOTER_ADMIN`
* A reset of a particular lock cannot be performed if a vote has been cast with it; it also cannot be done in the first hour of an epoch
* A vote cannot be cast if it has already been done so in the current epoch or if it is the first hour of an epoch
* Before a vote is cast, a rest is mandatory to ensure that all existing votes have been removed from all gauges
* A vote cast or reset can only be done by the owner or approved party of a lock
* Votes cannot be cast in the last hour of an epoch unless it is a whitelisted lock or the AVM is casting the vote
* A poke operation can only be carried out by the owner or approved party of a lock, or via the `VotingEscrow` contract

#### Gauge Manager

* Only the `GOVERNANCE` role can kill / revive a Gauge
* The `blackGovernor` can solely be set by the `GAUGE_ADMIN`
* Anyone can create a Gauge as long as both tokens of the gauge are whitelisted tokens and either one is a connector token
* Farming-related parameters can solely be set by the `GAUGE_ADMIN`
* The distribution functions of the system should be invoked only once in a single epoch per Gauge
* The `GAUGE_ADMIN` can update the `GaugeFactory` as well
* The `ClaimReward` and `Emission` value transfers can solely be executed by the `DISTRIBUTOR` which is the `GaugeAdmin` address

#### Gauge Factory CL / Gauges

* The `GAUGE_ADMIN` can update the `dibs` address as well as the referral fee of the factory
* At the end of an epoch, the a Gauge will transfer the epoch's accrued fee to its `internal_bribe` and will impose a fee on it that is transferred to the `dibs` address if a non-zero `dibsPercentage` has been defined
* The emergency council can set and unset the emergency status of any Gauge
* Stake and unstake capabilities are inaccesible when a Gauge is in emergency mode
* A Gauge cannot accept its emission reward if it is in emergency mode

#### Bribe

* The configuration of the voter and minter can only be done by a bribe's administrator

#### Voting Escrow

* The owner or approved member of a voting escrow lock can increase the value and unlock time of an escrow as well as merge, transfer, and burn it
* A particular lock can be split by an `address` that has `canSplit` access
* An smNFT lock will need to be burned when processed and cannot be claimed back
* An smNFT lock provides a configurable additional bonus
* An smNFT and permanent lock will never decay
* The owner or approved member of a voting escrow lock can cause it to be locked / unlocked permanently
* A particular voting escrow lock's power can be delegated to another address

#### Genesis Pool

* The Genesis Pool creation whitelist is maintained by the `Governance`
* Only whitelisted address can deposit initial liquidity for Genesis Pools
* Genesis Pool approval / rejection can only be done by the `Governance`
* The Auction mechanism can be changed by the `Governance`
* The `Governance` can update the launch time of a Genesis Pool as well as the maturity time of Genesis Pool stakers
* Genesis Pool information can solely be configured by the `GenesisManager`
* The `GenesisManager` can update the launch status of a pool
* A `Gauge` can deduct staked liquidity from a Genesis Pool after it has been launched and configured to autostake

## All trusted roles in the protocol

The protocol contains several trusted roles inherited from ThenaFi as well as several roles that are meant to be held by on-chain accounts rather than off-chain entities. 

The codebase contains a significant degree of configurability and thus centralization; this is a known issue. This list contains off-chain role entities that complement the roles defined in the invariant chapter and is non-exhaustive as the codebase is vast:

| Role                                | Description                       |
| --------------------------------------- | ---------------------------- |
| Team                         | - Can propose a new team address in several contracts<br>- Can set the team's rate in the `MinterUpgradeable` contract<br>- Can configure the reward distributor in the `MinterUpgradeable` contract<br>- Can configure the proposal numerator in the `BlackGovernor` implementation               |
| Team Multisig ( `blackMultisig` ) | - Can manage roles within the `PermissionsRegistry` |
| Epoch Manager | - Can manually perform upkeeps in the `EpochController` implementation |
| Gauge Admin | - Can configure gauge rewarders, rewarder pool IDs, distribution contracts, internal bribes, and the genesis manager fo all gauges under a particular factory |
| CL Gauge Admin | - Can set the internal bribe of a CL gauge<br>- Can set the `dibs` and `dibsPercentage` configurations of the gauge factory |
| Bribe Factory | - Can execute emergency mechanisms in `Bribes` such as `Bribes::emergencyRecoverERC20` <br>- Can configure the voter, gauge manager, minter, AVM, and owner of a particular bribe |
| Team Multisig ( `blackTeamMultisig` ) | - Is configured as the owner of newly deployed `Bribes` and inherits the Bribe Factory capabilities |
| Emergency Council | - Can start and stop emergency modes across gauge factories |
| Voter Administrator | - Can set the AVM, permissoins registry, and max voting number on the `VoterV3` implementation |

## Running tests

### Setup

Clone the repository locally and change the working directory to it:

```bash
git clone https://github.com/code-423n4/2025-05-blackhole
cd ./2025-05-blackhole
```

Make sure you have [NodeJS](https://nodejs.org/en) ( `v22.11.0` tested) installed.

Install dependencies:

```bash 
npm i

```

Remove potential unnecessary artifacts:

```bash
rm -rf .openzeppelin .vscode artifacts cache
```

Configure the private key for usage during compilations and tests (without the `0x` prefix):

```bash
export PRIVATEKEY=<add private key here>
```

### Tests

The compilation pipeline of the project relies on `hardhat` .

Clean any `hardhat` -related artifacts via the provided script:

```bash
node clean.js
```

Alternatively, execute the `clean` command directly:

```bash
npx hardhat clean
```

Compile the project via the provided script for the desired environment (one of [ `devnet` , `qanet` , `testnet` ]):

```bash
node compile.js --env qanet
```

Alternatively, execute the `compile` command directly:

```bash
npx hardhat compile
```

### Algebra CL Integration

For the repository's deployment scripts to execute as expected, the Algebra CL addresses need to be defined within the `scripts/deployment-flows/scripts/contract-deployments/algebra-addresses.js` file.

If deployments in testnets is desired, the Algebra system should be deployed via the [Blackhole variant](https://github.com/BlackHoleDEX/Algebra/tree/bh_ideation) and specifically the `scripts/deployAll.js` file.

### Demo Deployments

The project contains useful scripts for deploying the contract across testnets which can be executed as follows:

```bash
node run.js scripts/blackhole-scripts/deployBlack.js --network fuji --env qanet --version v1

node run.js scripts/blackhole-scripts/mintBlackhole.js --network fuji --env qanet --version v1

node run.js scripts/deployment-flows/scripts/contract-deployments/deploy-contracts.js --network fuji --env qanet --version v1

node run.js scripts/deployment-flows/scripts/contract-deployments/deploy-cl-dependency.js -–network fuji -–env qanet -–version v1

node run.js scripts/deployment-flows/scripts/contract-deployments/deploy-avm.js -–network fuji -–env qanet -–version v1
```

The version specified for each script should consistently become higher on each re-deployment so as to avoid issues within the scripts.

### Epoch Flip Scripts

The project contains certain scripts around epoch transitions; namely, `pre-flip-epoch.js` and `flip-epoch.js` within the `scripts/blackhole-scripts` sub-folder.

Both of the above affect the `contracts/chainlink/EpochController.sol` and are meant to represent the following:

* Pre-Epoch Flip: If `EpochController::checkUpPrekeep` returns `true` (i.e. one hour before an epoch's duration ends), the `EpochController::performPreUpkeep` function must be executed
* Epoch Flip: If `EpochController::checkUpkeep` returns `true` (i.e. after an epoch's duration ends), the `EpochController::performUpkeep` function must be executed

## Miscellaneous

Employees of Blackhole and employees' family members are ineligible to participate in this audit.

Code4rena's rules cannot be overridden by the contents of this README. In case of doubt, please check with C4 staff.

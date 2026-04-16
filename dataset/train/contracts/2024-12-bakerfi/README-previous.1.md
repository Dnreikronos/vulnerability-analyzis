# BakerFi Invitational audit details
- Total Prize Pool: $24,000 in USDC
  - HM awards: $19,100 in USDC
  - QA awards: $800 in USDC
  - Judge awards: $3,600 in USDC
  - Scout awards: $500 in USDC
- [Read our guidelines for more details](https://docs.code4rena.com/roles/wardens)
- Starts December 11, 2024 20:00 UTC
- Ends December 27, 2024 20:00 UTC

**Note re: risk level upgrades/downgrades**

Two important notes about judging phase risk adjustments: 
- High-risk or Medium-risk submissions downgraded to Low-risk (QA) will be ineligible for awards.
- Upgrading a Low-risk finding from a QA report to a Medium- or High-risk finding is not supported.

As such, wardens are encouraged to select the appropriate risk level carefully during the submission phase.

## This is a Private audit

This audit repo and its Discord channel are accessible to **certified wardens only.** Participation in private audits is bound by:

1. Code4rena's [Certified Contributor Terms and Conditions](https://github.com/code-423n4/code423n4.com/blob/main/_data/pages/certified-contributor-terms-and-conditions.md)
2. C4's [Certified Contributor Code of Professional Conduct](https://code4rena.notion.site/Code-of-Professional-Conduct-657c7d80d34045f19eee510ae06fef55)

*All discussions regarding private audits should be considered private and confidential, unless otherwise indicated.*

Please review the following confidentiality requirements carefully, and if anything is unclear, ask questions in the private audit channel in the C4 Discord.

## Automated Findings / Publicly Known Issues

The 4naly3er report can be found [here](https://github.com/code-423n4/2024-12-bakerfi/blob/main/4naly3er-report.md).

_Note for C4 wardens: Anything included in this `Automated Findings / Publicly Known Issues` section is considered a publicly known issue and is ineligible for awards._

- Minting Fees Accuracy


# Overview

**BakerFi Smart Contracts**

Unlock higher yields with flexible, low-risk strategies that go beyond just ETH staking. Our platform leverages diverse opportunities across liquidity, money markets and defi protocols, allowing you to maximize returns with customized, secure and curated investments.

**Features**

* Pool Based Yield Generation
* Liquidation Protection
* Easy to Use Interface
* Leverage based on Flash Loans
* Liquid Yield Shares brETH
* Proxied Deployment for Settings, Vault and Strategies

**Integrations**
* AAVE v3
* Lido Staking Contracts
* Uniswap v3
* Balancer Flash Loans

## Links

- **Previous audits:**  
  - [Creed Audit Q1 2024](https://github.com/baker-fi/bakerfi-contracts/blob/master/audits/audit-creed-2024-05-10.pdf)
  - [BakerFi Code4rena Competitive Audit Q2 2024](https://code4rena.com/reports/2024-05-bakerfi)
- **Documentation:** https://bakerfi.notion.site/BakerFi-Documentation-58ad03351df447d082968b14952a7c3b
- **Website:** https://bakerfi.xyz/
- **X/Twitter:** https://x.com/bakerfi_
- **Discord:** https://dub.sh/bakerfi-discord

---

# Scope

*See [scope.txt](https://github.com/code-423n4/2024-12-bakerfi/blob/main/scope.txt)*

### Files in scope


| File   | Logic Contracts | Interfaces | nSLOC | Purpose | Libraries used |
| ------ | --------------- | ---------- | ----- | -----   | ------------ |
| /contracts/core/MultiCommand.sol | 1| **** | 25 | ||
| /contracts/core/MultiStrategy.sol | 1| **** | 149 | |@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol<br>@openzeppelin/contracts/token/ERC20/IERC20.sol<br>@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol|
| /contracts/core/MultiStrategyVault.sol | 1| **** | 65 | |@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol<br>@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol|
| /contracts/core/Vault.sol | 1| **** | 54 | |@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol<br>@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol|
| /contracts/core/VaultBase.sol | 1| **** | 218 | |@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol<br>@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol<br>@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol<br>@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PermitUpgradeable.sol<br>@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol<br>@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol<br>@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol|
| /contracts/core/VaultRouter.sol | 1| **** | 262 | |@openzeppelin/contracts/interfaces/IERC4626.sol<br>@openzeppelin/contracts/token/ERC20/IERC20.sol<br>@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol|
| /contracts/core/hooks/UseLeverage.sol | 1| **** | 39 | ||
| /contracts/core/hooks/UseOracle.sol | 1| **** | 18 | |@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol|
| /contracts/core/hooks/UsePermitTransfers.sol | 2| **** | 16 | |@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol<br>@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol<br>@openzeppelin/contracts/token/ERC20/IERC20.sol|
| /contracts/core/hooks/UseTokenActions.sol | 2| **** | 54 | |@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol<br>@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol<br>@openzeppelin/contracts/token/ERC20/IERC20.sol|
| /contracts/core/hooks/swappers/UseUnifiedSwapper.sol | 2| **** | 78 | |@openzeppelin/contracts/token/ERC20/IERC20.sol<br>@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol|
| /contracts/core/router/Commands.sol | 1| **** | 48 | ||
| /contracts/core/strategies/StrategyLeverageAAVEv3.sol | 1| **** | 55 | |@openzeppelin/contracts/token/ERC20/ERC20.sol<br>@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol<br>@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol<br>@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol|
| /contracts/core/strategies/StrategyLeverageMorphoBlue.sol | 1| **** | 101 | |@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol<br>@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol<br>@openzeppelin/contracts/token/ERC20/ERC20.sol<br>@morpho-org/morpho-blue/src/interfaces/IMorpho.sol<br>@morpho-org/morpho-blue/src/libraries/MarketParamsLib.sol<br>@morpho-org/morpho-blue/src/libraries/periphery/MorphoLib.sol<br>@morpho-org/morpho-blue/src/libraries/periphery/MorphoBalancesLib.sol<br>@morpho-org/morpho-blue/src/libraries/SharesMathLib.sol|
| /contracts/core/strategies/StrategySupplyAAVEv3.sol | 1| **** | 35 | |@openzeppelin/contracts/token/ERC20/ERC20.sol<br>@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol|
| /contracts/core/strategies/StrategySupplyBase.sol | 1| **** | 65 | |@openzeppelin/contracts/token/ERC20/ERC20.sol<br>@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol<br>@openzeppelin/contracts/security/ReentrancyGuard.sol<br>@openzeppelin/contracts/access/Ownable.sol|
| /contracts/core/strategies/StrategySupplyERC4626.sol | 1| **** | 25 | |@openzeppelin/contracts/interfaces/IERC4626.sol<br>@openzeppelin/contracts/token/ERC20/ERC20.sol<br>@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol|
| /contracts/core/strategies/StrategySupplyMorpho.sol | 1| **** | 56 | |@openzeppelin/contracts/token/ERC20/ERC20.sol<br>@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol<br>@morpho-org/morpho-blue/src/interfaces/IMorpho.sol<br>@morpho-org/morpho-blue/src/libraries/MarketParamsLib.sol<br>@morpho-org/morpho-blue/src/libraries/periphery/MorphoLib.sol<br>@morpho-org/morpho-blue/src/libraries/periphery/MorphoBalancesLib.sol<br>@morpho-org/morpho-blue/src/libraries/SharesMathLib.sol|
| **Totals** | **21** | **** | **1363** | | |

### Files out of scope

*See [out_of_scope.txt](https://github.com/code-423n4/2024-12-bakerfi/blob/main/out_of_scope.txt)*

| File         |
| ------------ |
| ./contracts/core/Constants.sol |
| ./contracts/core/EmptySlot.sol |
| ./contracts/core/GovernableOwnable.sol |
| ./contracts/core/VaultRegistry.sol |
| ./contracts/core/VaultSettings.sol |
| ./contracts/core/flashloan/BalancerFlashLender.sol |
| ./contracts/core/governance/BKR.sol |
| ./contracts/core/governance/BakerFiGovernor.sol |
| ./contracts/core/governance/Timelock.sol |
| ./contracts/core/hooks/UseAAVEv3.sol |
| ./contracts/core/hooks/UseFlashLender.sol |
| ./contracts/core/hooks/UseIERC20.sol |
| ./contracts/core/hooks/UseIERC4626.sol |
| ./contracts/core/hooks/UseStETH.sol |
| ./contracts/core/hooks/UseStrategy.sol |
| ./contracts/core/hooks/UseUniQuoter.sol |
| ./contracts/core/hooks/UseWETH.sol |
| ./contracts/core/hooks/UseWstETH.sol |
| ./contracts/core/hooks/swappers/UseAeroSwapper.sol |
| ./contracts/core/hooks/swappers/UseCurveSwapper.sol |
| ./contracts/core/hooks/swappers/UseUniV2Swapper.sol |
| ./contracts/core/hooks/swappers/UseUniV3Swapper.sol |
| ./contracts/core/strategies/StrategyAeroSwapAnd.sol |
| ./contracts/core/strategies/StrategyCurveSwapAnd.sol |
| ./contracts/core/strategies/StrategyLeverage.sol |
| ./contracts/core/strategies/StrategyLeverageSettings.sol |
| ./contracts/core/strategies/StrategyPark.sol |
| ./contracts/core/strategies/StrategySettings.sol |
| ./contracts/core/strategies/StrategySwapAnd.sol |
| ./contracts/core/strategies/StrategyUniV2SwapAnd.sol |
| ./contracts/core/strategies/StrategyUniV3SwapAnd.sol |
| ./contracts/interfaces/aave/v3/DataTypes.sol |
| ./contracts/interfaces/aave/v3/IPoolAddressesProvider.sol |
| ./contracts/interfaces/aave/v3/IPoolV3.sol |
| ./contracts/interfaces/aerodrome/ISwapRouter.sol |
| ./contracts/interfaces/balancer/IFlashLoan.sol |
| ./contracts/interfaces/balancer/IProtocolFeesCollector.sol |
| ./contracts/interfaces/balancer/IVault.sol |
| ./contracts/interfaces/chainlink/IChainlinkAggregator.sol |
| ./contracts/interfaces/core/IOracle.sol |
| ./contracts/interfaces/core/IStrategy.sol |
| ./contracts/interfaces/core/IStrategyLeverage.sol |
| ./contracts/interfaces/core/IStrategySettings.sol |
| ./contracts/interfaces/core/ISwapHandler.sol |
| ./contracts/interfaces/core/IVault.sol |
| ./contracts/interfaces/core/IVaultRegistry.sol |
| ./contracts/interfaces/core/IVaultSettings.sol |
| ./contracts/interfaces/curve/ICurvePool.sol |
| ./contracts/interfaces/curve/ICurveRouterNG.sol |
| ./contracts/interfaces/lido/IStETH.sol |
| ./contracts/interfaces/lido/IWStETH.sol |
| ./contracts/interfaces/pyth/IPyth.sol |
| ./contracts/interfaces/pyth/IPythEvents.sol |
| ./contracts/interfaces/pyth/PythStructs.sol |
| ./contracts/interfaces/tokens/IWETH.sol |
| ./contracts/interfaces/uniswap/v2/IUniswapV2Router01.sol |
| ./contracts/interfaces/uniswap/v2/IUniswapV2Router02.sol |
| ./contracts/interfaces/uniswap/v3/IQuoterV2.sol |
| ./contracts/interfaces/uniswap/v3/IUniswapV3Pool.sol |
| ./contracts/interfaces/uniswap/v3/IV3SwapRouter.sol |
| ./contracts/libraries/AerodromeLibrary.sol |
| ./contracts/libraries/CurveFiLibrary.sol |
| ./contracts/libraries/MathLibrary.sol |
| ./contracts/libraries/RebaseLibrary.sol |
| ./contracts/libraries/UniV2Library.sol |
| ./contracts/libraries/UniV3Library.sol |
| ./contracts/mocks/AAVE3PoolMock.sol |
| ./contracts/mocks/BalancerVaultMock.sol |
| ./contracts/mocks/BorrowerAttacker.sol |
| ./contracts/mocks/ChainLinkAggregatorMock.sol |
| ./contracts/mocks/CommandMock.sol |
| ./contracts/mocks/ERC20Mock.sol |
| ./contracts/mocks/ERC3156FlashBorrowerMock.sol |
| ./contracts/mocks/ERC3156FlashLender.sol |
| ./contracts/mocks/ERC4626VaultMock.sol |
| ./contracts/mocks/MathLibraryWrapper.sol |
| ./contracts/mocks/OracleMock.sol |
| ./contracts/mocks/PythMock.sol |
| ./contracts/mocks/QuoterV2Mock.sol |
| ./contracts/mocks/StrategyLeverageSettingsMock.sol |
| ./contracts/mocks/StrategyMock.sol |
| ./contracts/mocks/UniV3RouterMock.sol |
| ./contracts/mocks/VaultRouterMock.sol |
| ./contracts/mocks/WETH.sol |
| ./contracts/mocks/WstETH.sol |
| ./contracts/oracles/ChainLinkExRateOracle.sol |
| ./contracts/oracles/ChainLinkOracle.sol |
| ./contracts/oracles/CustomExRateOracle.sol |
| ./contracts/oracles/ExRateOracle.sol |
| ./contracts/oracles/PythOracle.sol |
| ./contracts/oracles/RatioOracle.sol |
| ./contracts/proxy/BakerFiProxy.sol |
| ./contracts/proxy/BakerFiProxyAdmin.sol |
| ./contracts/tests/BoringRebaseTest.sol |
| ./contracts/tests/LeverageTest.sol |
| ./contracts/tests/RebaseLibraryTest.sol |
| Totals: 96 |


## Scoping Q &amp; A

### General questions

| Question                                | Answer                       |
| --------------------------------------- | ---------------------------- |
| ERC20 used by the protocol              |       Any (all possible ERC20s)             |
| Test coverage                           | 76.07                         |
| ERC721 used  by the protocol            |          N/A         |
| ERC777 used by the protocol             |          N/A          |
| ERC1155 used by the protocol            |          N/A         |
| Chains the protocol will be deployed on | Ethereum,Arbitrum,Base |

### ERC20 token behaviors in scope

| Question                                                                                                                                                   | Answer |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| [Missing return values](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#missing-return-values)                                                      |   In scope  |
| [Fee on transfer](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#fee-on-transfer)                                                                  |  Out of scope  |
| [Balance changes outside of transfers](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#balance-modifications-outside-of-transfers-rebasingairdrops) | In scope    |
| [Upgradeability](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#upgradable-tokens)                                                                 |   In scope  |
| [Flash minting](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#flash-mintable-tokens)                                                              | In scope    |
| [Pausability](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#pausable-tokens)                                                                      | In scope    |
| [Approval race protections](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#approval-race-protections)                                              | In scope    |
| [Revert on approval to zero address](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#revert-on-approval-to-zero-address)                            | In scope    |
| [Revert on zero value approvals](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#revert-on-zero-value-approvals)                                    | In scope    |
| [Revert on zero value transfers](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#revert-on-zero-value-transfers)                                    | In scope    |
| [Revert on transfer to the zero address](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#revert-on-transfer-to-the-zero-address)                    | In scope    |
| [Revert on large approvals and/or transfers](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#revert-on-large-approvals--transfers)                  | Out of scope    |
| [Doesn't revert on failure](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#no-revert-on-failure)                                                   |  In scope   |
| [Multiple token addresses](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#revert-on-zero-value-transfers)                                          | In scope    |
| [Low decimals ( < 6)](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#low-decimals)                                                                 |   In scope  |
| [High decimals ( > 18)](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#high-decimals)                                                              | In scope    |
| [Blocklists](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#tokens-with-blocklists)                                                                | In scope    |

### External integrations (e.g., Uniswap) behavior in scope:


| Question                                                  | Answer |
| --------------------------------------------------------- | ------ |
| Enabling/disabling fees (e.g. Blur disables/enables fees) | Yes   |
| Pausability (e.g. Uniswap pool gets paused)               |  Yes   |
| Upgradeability (e.g. Uniswap gets upgraded)               |   Yes  |


### EIP compliance checklist

| Question                                | Answer                       |
| --------------------------------------- | ---------------------------- |
| contracts/core/Vault.sol                           | ERC4626               |
| contracts/core/MultiStrategyVault.sol                           | ERC4626                     |


# Additional context

## Main invariants

NA


## Attack ideas (where to focus for bugs)
- Blocking of funds
- Assets Theif
- Malicious user actions
- Flash Loan Attacks
- Reentrancy Attacks
- Rebase Attacks
- Rounding Errors
- Slippage Attacks
- Denial of Service

## All trusted roles in the protocol

| Role                                | 
| --------------------------------------- |
| Minter                          | 
| Pauser                          | 
| VaultManager                             | 

## Describe any novel or unique curve logic or mathematical models implemented in the contracts:

N/A

## Running tests

```bash
git clone --recurse https://github.com/code-423n4/2024-12-bakerfi.git
cd 2024-12-bakerfi
npm install
npx hardhat compile
npx hardhat test
```

## Miscellaneous
Employees of BakerFi and employees' family members are ineligible to participate in this audit.

Code4rena's rules cannot be overridden by the contents of this README. In case of doubt, please check with C4 staff.


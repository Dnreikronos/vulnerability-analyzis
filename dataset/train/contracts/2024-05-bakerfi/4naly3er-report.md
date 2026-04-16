# Report


## Gas Optimizations


| |Issue|Instances|
|-|:-|:-:|
| [GAS-1](#GAS-1) | `a = a + b` is more gas effective than `a += b` for state variables (excluding arrays and mappings) | 1 |
| [GAS-2](#GAS-2) | For Operations that will not overflow, you could use unchecked | 253 |
| [GAS-3](#GAS-3) | Avoid contract existence checks by using low level calls | 5 |
| [GAS-4](#GAS-4) | Functions guaranteed to revert when called by normal users can be marked `payable` | 26 |
| [GAS-5](#GAS-5) | `++i` costs less gas compared to `i++` or `i += 1` (same for `--i` vs `i--` or `i -= 1`) | 2 |
| [GAS-6](#GAS-6) | Using `private` rather than `public` for constants, saves gas | 1 |
| [GAS-7](#GAS-7) | Use != 0 instead of > 0 for unsigned integer comparison | 8 |
| [GAS-8](#GAS-8) | WETH address definition can be use directly | 2 |
### <a name="GAS-1"></a>[GAS-1] `a = a + b` is more gas effective than `a += b` for state variables (excluding arrays and mappings)
This saves **16 gas per instance.**

*Instances (1)*:
```solidity
File: contracts/core/hooks/UseLeverage.sol

30:             leverage += inc;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseLeverage.sol)

### <a name="GAS-2"></a>[GAS-2] For Operations that will not overflow, you could use unchecked

*Instances (253)*:
```solidity
File: contracts/core/Constants.sol

15: uint256 constant MAX_LOAN_TO_VALUE = 1e9; // 100%

22: uint8 constant MAX_LOOPS = 20; // 100%

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Constants.sol)

```solidity
File: contracts/core/GovernableOwnable.sol

4: import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/GovernableOwnable.sol)

```solidity
File: contracts/core/ServiceRegistry.sol

4: import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

5: import {IServiceRegistry} from "../interfaces/core/IServiceRegistry.sol";

17: bytes32 constant WSTETH_USD_ORACLE_CONTRACT = keccak256(bytes("wstETH/USD Oracle"));

18: bytes32 constant CBETH_USD_ORACLE_CONTRACT = keccak256(bytes("cbETH/USD Oracle"));

19: bytes32 constant ETH_USD_ORACLE_CONTRACT = keccak256(bytes("ETH/USD Oracle"));

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/ServiceRegistry.sol)

```solidity
File: contracts/core/Settings.sol

4: import {Ownable2StepUpgradeable} from "@openzeppelin/contracts-upgradeable/access/Ownable2StepUpgradeable.sol";

5: import {PERCENTAGE_PRECISION } from "./Constants.sol";

6: import {ISettings} from "../interfaces/core/ISettings.sol";

7: import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

45:     uint256 private _withdrawalFee; // %

52:     uint256 private _performanceFee; // 1%

60:     address private _feeReceiver; // No Fee Receiver

99:         _withdrawalFee = 10 * 1e6; // 1%

100:         _performanceFee = 10 * 1e6; // 1%

101:         _feeReceiver = address(0); // No Fee Receiver

103:         _priceRebalanceMaxAge = 5 minutes; // 5 Minutes Prices

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Settings.sol)

```solidity
File: contracts/core/Vault.sol

4: import {Ownable2StepUpgradeable} from "@openzeppelin/contracts-upgradeable/access/Ownable2StepUpgradeable.sol";

5: import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

6: import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

7: import {Rebase, RebaseLibrary} from "../libraries/RebaseLibrary.sol";

8: import {ServiceRegistry} from "../core/ServiceRegistry.sol";

9: import {IVault} from "../interfaces/core/IVault.sol";

10: import {IStrategy} from "../interfaces/core/IStrategy.sol";

11: import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

12: import {PERCENTAGE_PRECISION} from "./Constants.sol";

13: import {ERC20PermitUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PermitUpgradeable.sol";

14: import {UseSettings} from "./hooks/UseSettings.sol";

15: import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

16: import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

153:                     uint256 feeInEthScaled = uint256(balanceChange) *

155:                     uint256 sharesToMint = (feeInEthScaled * totalSupply()) /

156:                         _totalAssets(maxPriceAge) /

213:             uint256 afterDeposit = msg.value +

214:                 ((balanceOf(msg.sender) * _tokenPerETH(maxPriceAge)) / 1e18);

254:         uint256 withdrawAmount = (shares * _totalAssets(settings().getPriceMaxAge())) /

262:             fee = (amount * settings().getWithdrawalFee()) / PERCENTAGE_PRECISION;

263:             payable(msg.sender).sendValue(amount - fee);

268:         emit Withdraw(msg.sender, amount - fee, shares); 

339:         return (totalSupply() * 1 ether) / position;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/flashloan/BalancerFlashLender.sol

4: import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

5: import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

6: import {IERC3156FlashLenderUpgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC3156FlashLenderUpgradeable.sol";

7: import {IFlashLoanRecipient} from "../../interfaces/balancer/IFlashLoan.sol";

8: import {IVault} from "../../interfaces/balancer/IVault.sol";

9: import {ServiceRegistry, BALANCER_VAULT_CONTRACT} from "../../core/ServiceRegistry.sol";

10: import {IERC3156FlashBorrowerUpgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC3156FlashBorrowerUpgradeable.sol";

37:     uint256 private constant _BALANCER_MAX_FEE_PERCENTAGE = 1e18; // 100%

63:         return (amount * perc) / _BALANCER_MAX_FEE_PERCENTAGE;

128:         if (IERC20(asset).allowance(address(borrower), address(this)) < fee + amount) {

132:         IERC20(asset).safeTransferFrom(address(borrower), address(_balancerVault), amount + fee);

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/flashloan/BalancerFlashLender.sol)

```solidity
File: contracts/core/governance/BKR.sol

4: import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

5: import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

6: import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

7: import {ERC20Votes} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

25:     uint256 private constant _MAXSUPPLY = 500_000_000 * 1e18; // 500M

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/governance/BKR.sol)

```solidity
File: contracts/core/governance/BakerFiGovernor.sol

4: import {Governor, IGovernor, IERC165} from "@openzeppelin/contracts/governance/Governor.sol";

5: import {GovernorCompatibilityBravo} from "@openzeppelin/contracts/governance/compatibility/GovernorCompatibilityBravo.sol";

6: import {GovernorVotes, IVotes} from "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";

7: import {GovernorVotesQuorumFraction} from "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";

8: import {GovernorTimelockControl, TimelockController} from "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";

17:     uint8 private constant _MIN_QUORUM = 10; // 4%

18:     uint256 private constant _VOTING_DELAY = 1 days; // 1 day

19:     uint256 private constant _VOTING_PERIOD = 1 weeks; // 1 day

32:         return _VOTING_DELAY; // 1 day

36:         return _VOTING_PERIOD; // 1 week

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/governance/BakerFiGovernor.sol)

```solidity
File: contracts/core/governance/Timelock.sol

4: import {TimelockController} from "@openzeppelin/contracts/governance/TimelockController.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/governance/Timelock.sol)

```solidity
File: contracts/core/hooks/UseAAVEv3.sol

5: import {ServiceRegistry, AAVE_V3_CONTRACT} from "../ServiceRegistry.sol";

6: import {IPoolV3} from "../../interfaces/aave/v3/IPoolV3.sol";

7: import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

8: import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

9: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseAAVEv3.sol)

```solidity
File: contracts/core/hooks/UseFlashLender.sol

5: import {ServiceRegistry, FLASH_LENDER_CONTRACT} from "../ServiceRegistry.sol";

6: import {IERC3156FlashLenderUpgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC3156FlashLenderUpgradeable.sol";

7: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseFlashLender.sol)

```solidity
File: contracts/core/hooks/UseIERC20.sol

5: import {ServiceRegistry} from "../ServiceRegistry.sol";

6: import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

7: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseIERC20.sol)

```solidity
File: contracts/core/hooks/UseLeverage.sol

3: import {PERCENTAGE_PRECISION, MAX_LOOPS} from "../Constants.sol";

29:             uint256 inc = (prev * loanToValue) / PERCENTAGE_PRECISION;

30:             leverage += inc;

33:                 ++i;

56:         deltaDebtInETH = (totalDebtBaseInEth * percentageToBurn) / PERCENTAGE_PRECISION;

58:         deltaCollateralInETH = (totalCollateralBaseInEth * percentageToBurn) / PERCENTAGE_PRECISION;

73:         uint256 colValue = ((targetLoanToValue * collateral) / PERCENTAGE_PRECISION);

75:         uint256 numerator = debt - colValue;

76:         uint256 divisor = (PERCENTAGE_PRECISION - targetLoanToValue);

78:         delta = (numerator * PERCENTAGE_PRECISION) / divisor;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseLeverage.sol)

```solidity
File: contracts/core/hooks/UseOracle.sol

5: import {ServiceRegistry} from "../ServiceRegistry.sol";

6: import {IOracle} from "../../interfaces/core/IOracle.sol";

7: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseOracle.sol)

```solidity
File: contracts/core/hooks/UseSettings.sol

5: import {ServiceRegistry, SETTINGS_CONTRACT} from "../ServiceRegistry.sol";

6: import {ISettings} from "../../interfaces/core/ISettings.sol";

7: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseSettings.sol)

```solidity
File: contracts/core/hooks/UseStETH.sol

5: import {ServiceRegistry, ST_ETH_CONTRACT} from "../ServiceRegistry.sol";

6: import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

7: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseStETH.sol)

```solidity
File: contracts/core/hooks/UseStrategy.sol

5: import {ServiceRegistry, STRATEGY_CONTRACT} from "../ServiceRegistry.sol";

6: import {IStrategy} from "../../interfaces/core/IStrategy.sol";

7: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseStrategy.sol)

```solidity
File: contracts/core/hooks/UseSwapper.sol

5: import {ServiceRegistry, UNISWAP_ROUTER_CONTRACT} from "../ServiceRegistry.sol";

6: import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

7: import {ISwapHandler} from "../../interfaces/core/ISwapHandler.sol";

8: import {IV3SwapRouter} from "../../interfaces/uniswap/v3/ISwapRouter.sol";

9: import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

10: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

96:                 IERC20(params.underlyingIn).safeTransfer(address(this), params.amountIn - amountIn);

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseSwapper.sol)

```solidity
File: contracts/core/hooks/UseUniQuoter.sol

5: import {ServiceRegistry, UNISWAP_QUOTER_CONTRACT} from "../ServiceRegistry.sol";

6: import {IQuoterV2} from "../../interfaces/uniswap/v3/IQuoterV2.sol";

7: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseUniQuoter.sol)

```solidity
File: contracts/core/hooks/UseWETH.sol

5: import {ServiceRegistry, WETH_CONTRACT} from "../ServiceRegistry.sol";

6: import {IWETH} from "../../interfaces/tokens/IWETH.sol";

7: import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

8: import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

9: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseWETH.sol)

```solidity
File: contracts/core/hooks/UseWstETH.sol

5: import {ServiceRegistry, WST_ETH_CONTRACT, ST_ETH_CONTRACT} from "../ServiceRegistry.sol";

6: import {IWStETH} from "../../interfaces/lido/IWStETH.sol";

7: import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

8: import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

9: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseWstETH.sol)

```solidity
File: contracts/core/strategies/StrategyAAVEv3.sol

4: import {StrategyLeverage} from "./StrategyLeverage.sol";

5: import {ServiceRegistry} from "../../core/ServiceRegistry.sol";

6: import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

7: import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

8: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

9: import {UseAAVEv3} from "../hooks/UseAAVEv3.sol";

10: import {DataTypes} from "../../interfaces/aave/v3/IPoolV3.sol";

11: import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyAAVEv3WSTETH.sol

4: import {StrategyAAVEv3} from "./StrategyAAVEv3.sol";

5: import {ServiceRegistry} from "../../core/ServiceRegistry.sol";

6: import {UseStETH} from "../hooks/UseStETH.sol";

7: import {UseWstETH} from "../hooks/UseWstETH.sol";

8: import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

9: import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

10: import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

11: import {ISwapHandler} from "../../interfaces/core/ISwapHandler.sol";

12: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

13: import {WST_ETH_CONTRACT, WSTETH_USD_ORACLE_CONTRACT} from "../ServiceRegistry.sol";

56:         if (!stETH().approve(uniRouterA(), 2 ** 256 - 1)) revert FailedToApproveAllowance();

76:         return wStEthBalanceAfter - wStEthBalanceBefore;

92:                     wstETHA(), // Asset In

93:                     wETHA(), // Asset Out

94:                     ISwapHandler.SwapType.EXACT_INPUT, // Swap Mode

95:                     amount, // Amount In

96:                     0, // Amount Out

97:                     _swapFeeTier, // Fee Pair Tier

98:                     bytes("") // User Payload

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyAAVEv3WSTETH.sol)

```solidity
File: contracts/core/strategies/StrategyLeverage.sol

4: import {IERC3156FlashBorrowerUpgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC3156FlashBorrowerUpgradeable.sol";

5: import {ServiceRegistry} from "../../core/ServiceRegistry.sol";

6: import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

7: import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

9: import {PERCENTAGE_PRECISION} from "../Constants.sol";

10: import {IOracle} from "../../interfaces/core/IOracle.sol";

11: import {ISwapHandler} from "../../interfaces/core/ISwapHandler.sol";

12: import {IStrategy} from "../../interfaces/core/IStrategy.sol";

13: import {UseLeverage} from "../hooks/UseLeverage.sol";

14: import {UseUniQuoter} from "../hooks/UseUniQuoter.sol";

15: import {UseSettings} from "../hooks/UseSettings.sol";

16: import {UseWETH} from "../hooks/UseWETH.sol";

17: import {UseFlashLender} from "../hooks/UseFlashLender.sol";

18: import {UseSwapper} from "../hooks/UseSwapper.sol";

19: import {UseIERC20} from "../hooks/UseIERC20.sol";

20: import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

21: import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

22: import {ETH_USD_ORACLE_CONTRACT} from "../ServiceRegistry.sol";

23: import {StrategyLeverageSettings} from "./StrategyLeverageSettings.sol";

24: import {IQuoterV2} from "../../interfaces/uniswap/v3/IQuoterV2.sol";

161:         if (!wETH().approve(uniRouterA(), 2 ** 256 - 1)) revert FailedToApproveAllowance();

162:         if (!ierc20().approve(uniRouterA(), 2 ** 256 - 1)) revert FailedToApproveAllowance();

199:             loanToValue = (totalDebtInEth * PERCENTAGE_PRECISION) / totalCollateralInEth;

218:             ? (totalCollateralInEth - totalDebtInEth)

246:         uint256 loanAmount = leverage - msg.value;

249:         if(!wETH().approve(flashLenderA(), loanAmount + fee)) revert FailedToApproveAllowance();

262:         _deployedAmount = _deployedAmount + deployedAmount;

344:         if (!wETH().approve(flashLenderA(), deltaDebt + fee)) revert FailedToApproveAllowance();

392:         uint256 ltv = (totalDebtBaseInEth * PERCENTAGE_PRECISION) / totalCollateralBaseInEth;

397:         uint256 newDeployedAmount = totalCollateralBaseInEth -

398:             deltaDebt -

399:             (totalDebtBaseInEth - deltaDebt);

409:             uint256 profit = newDeployedAmount - deployedAmount;

413:             uint256 loss = deployedAmount - newDeployedAmount;

415:             balanceChange = -int256(loss);

455:                     (priceMaxAge > 0 && (ethPrice.lastUpdate >= (block.timestamp - priceMaxAge))) ||

457:                         (collateralPrice.lastUpdate >= (block.timestamp - priceMaxAge))))

461:             totalCollateralInEth = (collateralBalance * collateralPrice.price) / ethPrice.price;

491:         uint256 percentageToBurn = (amount * PERCENTAGE_PRECISION) /

492:             (totalCollateralBaseInEth - totalDebtBaseInEth);

504:         if (!wETH().approve(flashLenderA(), deltaDebtInETH + fee))

521:             _deployedAmount = _deployedAmount - undeployedAmount;

546:             IQuoterV2.QuoteExactOutputSingleParams(ierc20A(), wETHA(), debtAmount + fee, 500, 0)

557:                 debtAmount + fee,

563:         uint256 wethLefts = output > (debtAmount + fee) ? output - (debtAmount + fee) : 0;

584:                     wETHA(), // Asset In

585:                     ierc20A(), // Asset Out

586:                     ISwapHandler.SwapType.EXACT_INPUT, // Swap Mode

587:                     amount, // Amount In

588:                     0, // Amount Out

589:                     _swapFeeTier, // Fee Pair Tier

590:                     bytes("") // User Payload

608:                     ierc20A(), // Asset In

609:                     wETHA(), // Asset Out

610:                     ISwapHandler.SwapType.EXACT_INPUT, // Swap Mode

611:                     amount, // Amount In

612:                     0, // Amount Out

613:                     _swapFeeTier, // Fee Pair Tier

614:                     bytes("") // User Payload

629:             (amountIn * _collateralOracle.getSafeLatestPrice(settings().getPriceMaxAge()).price) /

643:             (amountIn * _ethUSDOracle.getSafeLatestPrice(settings().getPriceMaxAge()).price) /

663:         uint256 collateralIn = _convertFromWETH(amount + loanAmount);

665:         _supplyAndBorrow(ierc20A(), collateralIn, wETHA(), loanAmount + fee);

667:         _pendingAmount = collateralInETH - loanAmount - fee;

706:         uint256 ethToWithdraw = wETHAmount - repayAmount - fee;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverage.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageSettings.sol

4: import {GovernableOwnable} from "../GovernableOwnable.sol";

5: import {PERCENTAGE_PRECISION, MAX_LOOPS} from "../Constants.sol";

47:     uint256 private _loanToValue; // 80%

54:     uint256 private _maxLoanToValue; // 85%

68:         _loanToValue = 800 * 1e6; // 80%

69:         _maxLoanToValue = 850 * 1e6; // 85%

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageSettings.sol)

```solidity
File: contracts/libraries/RebaseLibrary.sol

40:             base = (elastic * total.base) / total.elastic;

41:             if (roundUp && (base * total.elastic) / total.base < elastic) {

42:                 base++;

56:             elastic = (base * total.elastic) / total.base;

57:             if (roundUp && (elastic * total.base) / total.elastic < base) {

58:                 elastic++;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/libraries/RebaseLibrary.sol)

```solidity
File: contracts/oracles/EthOracle.sol

4: import {IOracle} from "../interfaces/core/IOracle.sol";

5: import {IChainlinkAggregator} from "../interfaces/chainlink/IChainlinkAggregator.sol";

16:     uint256 private constant _PRECISION = 10 ** 18;

41:         if(block.timestamp - price.lastUpdate > age) revert  PriceOutdated();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/EthOracle.sol)

```solidity
File: contracts/oracles/PythOracle.sol

4: import {IPyth} from "../interfaces/pyth/IPyth.sol";

5: import {PythStructs} from "../interfaces/pyth/PythStructs.sol";

6: import {IOracle} from "../interfaces/core/IOracle.sol";

45:                 uint64(price.price) *

46:                 uint256(10 ** (_PRECISION + uint32(price.expo)));

49:                 uint64(price.price) *

50:                 uint256(10 ** (_PRECISION - uint32(-price.expo)));

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/PythOracle.sol)

```solidity
File: contracts/oracles/WstETHToETHOracle.sol

4: import {IOracle} from "../interfaces/core/IOracle.sol";

5: import {IChainlinkAggregator} from "../interfaces/chainlink/IChainlinkAggregator.sol";

18:     uint256 internal constant _PRECISION = 10 ** 18;

43:         if((block.timestamp - price.lastUpdate) > age) revert  PriceOutdated();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/WstETHToETHOracle.sol)

```solidity
File: contracts/oracles/WstETHToETHOracleETH.sol

4: import {IOracle} from "../interfaces/core/IOracle.sol";

5: import {IWStETH} from "../interfaces/lido/IWStETH.sol";

6: import {IChainlinkAggregator} from "../interfaces/chainlink/IChainlinkAggregator.sol";

16:     uint256 internal constant _PRECISION = 10 ** 18;

38:         price.price = (wstETHToStETH * uint256(answer)) / _PRECISION;

44:         if((block.timestamp - price.lastUpdate) > age) revert  PriceOutdated();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/WstETHToETHOracleETH.sol)

```solidity
File: contracts/oracles/cbETHToETHOracle.sol

4: import {IOracle} from "../interfaces/core/IOracle.sol";

5: import {IChainlinkAggregator} from "../interfaces/chainlink/IChainlinkAggregator.sol";

16:     uint256 private constant _PRECISION = 10 ** 18;

42:         if((block.timestamp - price.lastUpdate) > age) revert  PriceOutdated();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/cbETHToETHOracle.sol)

```solidity
File: contracts/proxy/BakerFiProxy.sol

4: import {TransparentUpgradeableProxy} from "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/proxy/BakerFiProxy.sol)

```solidity
File: contracts/proxy/BakerFiProxyAdmin.sol

4: import {ProxyAdmin} from "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/proxy/BakerFiProxyAdmin.sol)

### <a name="GAS-3"></a>[GAS-3] Avoid contract existence checks by using low level calls
Prior to 0.8.10 the compiler inserted extra code, including `EXTCODESIZE` (**100 gas**), to check for contract existence for external function calls. In more recent solidity versions, the compiler will not insert these checks if the external call has a return value. Similar behavior can be achieved in earlier versions by using low-level calls, since low level calls never check for contract existence

*Instances (5)*:
```solidity
File: contracts/core/flashloan/BalancerFlashLender.sol

54:         return IERC20(token).balanceOf(address(_balancerVault));

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/flashloan/BalancerFlashLender.sol)

```solidity
File: contracts/core/strategies/StrategyAAVEv3.sol

74:         debtBalance = IERC20(wethReserve.variableDebtTokenAddress).balanceOf(address(this));

75:         collateralBalance = IERC20(colleteralReserve.aTokenAddress).balanceOf(

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyAAVEv3WSTETH.sol

70:         uint256 wStEthBalanceBefore = wstETH().balanceOf(address(this));

74:         uint256 wStEthBalanceAfter = wstETH().balanceOf(address(this));

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyAAVEv3WSTETH.sol)

### <a name="GAS-4"></a>[GAS-4] Functions guaranteed to revert when called by normal users can be marked `payable`
If a function modifier such as `onlyOwner` is used, the function will revert if a normal user tries to pay the function. Marking the function as `payable` will lower the gas cost for legitimate callers because the compiler will not include checks for whether a payment was provided.

*Instances (26)*:
```solidity
File: contracts/core/GovernableOwnable.sol

51:     function transferGovernorship(address _newGovernor) public virtual onlyGovernor {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/GovernableOwnable.sol)

```solidity
File: contracts/core/ServiceRegistry.sol

77:     function registerService(bytes32 serviceNameHash, address serviceAddress) external onlyOwner {

95:     function unregisterService(bytes32 serviceNameHash) external onlyOwner {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/ServiceRegistry.sol)

```solidity
File: contracts/core/Settings.sol

119:     function enableAccount(address account, bool enabled) external onlyOwner {

155:     function setWithdrawalFee(uint256 fee) external onlyOwner {

184:     function setPerformanceFee(uint256 fee) external onlyOwner {

212:     function setFeeReceiver(address receiver) external onlyOwner {

233:     function setMaxDepositInETH(uint256 value) external onlyOwner {

238:     function setRebalancePriceMaxAge(uint256 value) external onlyOwner {

247:     function setPriceMaxAge(uint256 value) external onlyOwner {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Settings.sol)

```solidity
File: contracts/core/Vault.sol

351:     function pause() external onlyOwner {

361:     function unpause() external onlyOwner {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/hooks/UseAAVEv3.sol

32:     function _initUseAAVEv3(ServiceRegistry registry) internal onlyInitializing {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseAAVEv3.sol)

```solidity
File: contracts/core/hooks/UseFlashLender.sol

14:     function _initUseFlashLender(ServiceRegistry registry) internal onlyInitializing {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseFlashLender.sol)

```solidity
File: contracts/core/hooks/UseIERC20.sol

14:     function _initUseIERC20(ServiceRegistry registry, bytes32 name) internal onlyInitializing {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseIERC20.sol)

```solidity
File: contracts/core/hooks/UseSettings.sol

14:     function _initUseSettings(ServiceRegistry registry) internal onlyInitializing {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseSettings.sol)

```solidity
File: contracts/core/hooks/UseStETH.sol

14:     function _initUseStETH(ServiceRegistry registry) internal onlyInitializing {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseStETH.sol)

```solidity
File: contracts/core/hooks/UseStrategy.sol

14:     function _initUseStrategy(ServiceRegistry registry) internal onlyInitializing {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseStrategy.sol)

```solidity
File: contracts/core/hooks/UseSwapper.sol

44:     function _initUseSwapper(ServiceRegistry registry) internal onlyInitializing {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseSwapper.sol)

```solidity
File: contracts/core/hooks/UseUniQuoter.sol

14:     function _initUseUniQuoter(ServiceRegistry registry) internal onlyInitializing {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseUniQuoter.sol)

```solidity
File: contracts/core/hooks/UseWETH.sol

31:     function _initUseWETH(ServiceRegistry registry) internal onlyInitializing {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseWETH.sol)

```solidity
File: contracts/core/hooks/UseWstETH.sol

37:     function _initUseWstETH(ServiceRegistry registry) internal onlyInitializing {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseWstETH.sol)

```solidity
File: contracts/core/strategies/StrategyLeverage.sol

377:     function harvest() external override onlyOwner nonReentrant returns (int256 balanceChange) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverage.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageSettings.sol

84:     function setMaxLoanToValue(uint256 maxLoanToValue) external onlyGovernor {

116:     function setLoanToValue(uint256 loanToValue) external onlyGovernor {

158:     function setNrLoops(uint8 nrLoops) external onlyGovernor {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageSettings.sol)

### <a name="GAS-5"></a>[GAS-5] `++i` costs less gas compared to `i++` or `i += 1` (same for `--i` vs `i--` or `i -= 1`)
Pre-increments and pre-decrements are cheaper.

For a `uint256 i` variable, the following is true with the Optimizer enabled at 10k:

**Increment:**

- `i += 1` is the most expensive form
- `i++` costs 6 gas less than `i += 1`
- `++i` costs 5 gas less than `i++` (11 gas less than `i += 1`)

**Decrement:**

- `i -= 1` is the most expensive form
- `i--` costs 11 gas less than `i -= 1`
- `--i` costs 5 gas less than `i--` (16 gas less than `i -= 1`)

Note that post-increments (or post-decrements) return the old value before incrementing or decrementing, hence the name *post-increment*:

```solidity
uint i = 1;  
uint j = 2;
require(j == i++, "This will be false as i is incremented after the comparison");
```
  
However, pre-increments (or pre-decrements) return the new value:
  
```solidity
uint i = 1;  
uint j = 2;
require(j == ++i, "This will be true as i is incremented before the comparison");
```

In the pre-increment case, the compiler has to create a temporary variable (when used) for returning `1` instead of `2`.

Consider using pre-increments and pre-decrements where they are relevant (meaning: not where post-increments/decrements logic are relevant).

*Saves 5 gas per instance*

*Instances (2)*:
```solidity
File: contracts/libraries/RebaseLibrary.sol

42:                 base++;

58:                 elastic++;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/libraries/RebaseLibrary.sol)

### <a name="GAS-6"></a>[GAS-6] Using `private` rather than `public` for constants, saves gas
If needed, the values can be read from the verified contract source code, or if there are multiple values there can be a single getter function that [returns a tuple](https://github.com/code-423n4/2022-08-frax/blob/90f55a9ce4e25bceed3a74290b854341d8de6afa/src/contracts/FraxlendPair.sol#L156-L178) of the values of all currently-public constants. Saves **3406-3606 gas** in deployment gas due to the compiler not having to create non-payable getter functions for deployment calldata, not having to store the bytes of the value outside of where it's used, and not adding another entry to the method ID table

*Instances (1)*:
```solidity
File: contracts/core/flashloan/BalancerFlashLender.sol

35:     bytes32 public constant CALLBACK_SUCCESS = keccak256("ERC3156FlashBorrower.onFlashLoan");

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/flashloan/BalancerFlashLender.sol)

### <a name="GAS-7"></a>[GAS-7] Use != 0 instead of > 0 for unsigned integer comparison

*Instances (8)*:
```solidity
File: contracts/core/Vault.sol

139:         if (currentPos > 0) {

141:             if (balanceChange > 0) {

145:                     settings().getPerformanceFee() > 0

208:                 (total.base > 0 && total.elastic > 0))

212:         if (maxDeposit > 0) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/strategies/StrategyLeverage.sol

455:                     (priceMaxAge > 0 && (ethPrice.lastUpdate >= (block.timestamp - priceMaxAge))) ||

456:                     (priceMaxAge > 0 &&

564:         if (wethLefts > 0) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverage.sol)

### <a name="GAS-8"></a>[GAS-8] WETH address definition can be use directly
WETH is a wrap Ether contract with a specific address in the Ethereum network, giving the option to define it may cause false recognition, it is healthier to define it directly.

    Advantages of defining a specific contract directly:
    
    It saves gas,
    Prevents incorrect argument definition,
    Prevents execution on a different chain and re-signature issues,
    WETH Address : 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2

*Instances (2)*:
```solidity
File: contracts/core/ServiceRegistry.sol

12: bytes32 constant WETH_CONTRACT = keccak256(bytes("WETH"));

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/ServiceRegistry.sol)

```solidity
File: contracts/core/hooks/UseWETH.sol

40:     function wETH() public view returns (IWETH) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseWETH.sol)


## Non Critical Issues


| |Issue|Instances|
|-|:-|:-:|
| [NC-1](#NC-1) | Replace `abi.encodeWithSignature` and `abi.encodeWithSelector` with `abi.encodeCall` which keeps the code typo/type safe | 2 |
| [NC-2](#NC-2) | Use `string.concat()` or `bytes.concat()` instead of `abi.encodePacked` | 2 |
| [NC-3](#NC-3) | `constant`s should be defined rather than using magic numbers | 13 |
| [NC-4](#NC-4) | Control structures do not follow the Solidity Style Guide | 102 |
| [NC-5](#NC-5) | Default Visibility for constants | 21 |
| [NC-6](#NC-6) | Consider disabling `renounceOwnership()` | 5 |
| [NC-7](#NC-7) | Functions should not be longer than 50 lines | 107 |
| [NC-8](#NC-8) | Change int to int256 | 1 |
| [NC-9](#NC-9) | `type(uint256).max` should be used instead of `2 ** 256 - 1` | 3 |
| [NC-10](#NC-10) | Use a `modifier` instead of a `require/if` statement for a special `msg.sender` actor | 8 |
| [NC-11](#NC-11) | Consider using named mappings | 1 |
| [NC-12](#NC-12) | `address`s shouldn't be hard-coded | 1 |
| [NC-13](#NC-13) | Owner can renounce while system is paused | 2 |
| [NC-14](#NC-14) | Take advantage of Custom Error's return value property | 103 |
| [NC-15](#NC-15) | Use scientific notation (e.g. `1e18`) rather than exponentiation (e.g. `10**18`) | 4 |
| [NC-16](#NC-16) | Avoid the use of sensitive terms | 12 |
| [NC-17](#NC-17) | Variables need not be initialized to zero | 4 |
### <a name="NC-1"></a>[NC-1] Replace `abi.encodeWithSignature` and `abi.encodeWithSelector` with `abi.encodeCall` which keeps the code typo/type safe
When using `abi.encodeWithSignature`, it is possible to include a typo for the correct function signature.
When using `abi.encodeWithSignature` or `abi.encodeWithSelector`, it is also possible to provide parameters that are not of the correct type for the function.

To avoid these pitfalls, it would be best to use [`abi.encodeCall`](https://solidity-by-example.org/abi-encode/) instead.

*Instances (2)*:
```solidity
File: contracts/core/Vault.sol

219:             abi.encodeWithSignature("deploy()"),

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/strategies/StrategyLeverage.sol

239:         address(wETHA()).functionCallWithValue(abi.encodeWithSignature("deposit()"), msg.value);

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverage.sol)

### <a name="NC-2"></a>[NC-2] Use `string.concat()` or `bytes.concat()` instead of `abi.encodePacked`
Solidity version 0.8.4 introduces `bytes.concat()` (vs `abi.encodePacked(<bytes>,<bytes>)`)

Solidity version 0.8.12 introduces `string.concat()` (vs `abi.encodePacked(<str>,<str>), which catches concatenation errors (in the event of a `bytes` data mixed in the concatenation)`)

*Instances (2)*:
```solidity
File: contracts/core/ServiceRegistry.sol

109:         return keccak256(abi.encodePacked(name));

121:         return _services[keccak256(abi.encodePacked(serviceName))];

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/ServiceRegistry.sol)

### <a name="NC-3"></a>[NC-3] `constant`s should be defined rather than using magic numbers
Even [assembly](https://github.com/code-423n4/2022-05-opensea-seaport/blob/9d7ce4d08bf3c3010304a0476a785c70c0e90ae7/contracts/lib/TokenTransferrer.sol#L35-L39) can benefit from using readable constants instead of hex/numeric literals

*Instances (13)*:
```solidity
File: contracts/core/Settings.sol

99:         _withdrawalFee = 10 * 1e6; // 1%

100:         _performanceFee = 10 * 1e6; // 1%

103:         _priceRebalanceMaxAge = 5 minutes; // 5 Minutes Prices

104:         _priceMaxAge = 60 minutes;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Settings.sol)

```solidity
File: contracts/core/strategies/StrategyAAVEv3.sol

107:         aaveV3().borrow(assetOut, borrowOut, 2, 0, address(this));

117:         if (aaveV3().repay(assetIn, amount, 2, address(this)) != amount) revert FailedToRepayDebt();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyAAVEv3WSTETH.sol

56:         if (!stETH().approve(uniRouterA(), 2 ** 256 - 1)) revert FailedToApproveAllowance();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyAAVEv3WSTETH.sol)

```solidity
File: contracts/core/strategies/StrategyLeverage.sol

161:         if (!wETH().approve(uniRouterA(), 2 ** 256 - 1)) revert FailedToApproveAllowance();

162:         if (!ierc20().approve(uniRouterA(), 2 ** 256 - 1)) revert FailedToApproveAllowance();

546:             IQuoterV2.QuoteExactOutputSingleParams(ierc20A(), wETHA(), debtAmount + fee, 500, 0)

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverage.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageSettings.sol

68:         _loanToValue = 800 * 1e6; // 80%

69:         _maxLoanToValue = 850 * 1e6; // 85%

70:         _nrLoops = 10;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageSettings.sol)

### <a name="NC-4"></a>[NC-4] Control structures do not follow the Solidity Style Guide
See the [control structures](https://docs.soliditylang.org/en/latest/style-guide.html#control-structures) section of the Solidity Style Guide

*Instances (102)*:
```solidity
File: contracts/core/GovernableOwnable.sol

36:         if(msg.sender != governor()) revert CallerNotTheGovernor();

52:         if(_newGovernor == address(0)) revert InvalidGovernorAddress();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/GovernableOwnable.sol)

```solidity
File: contracts/core/ServiceRegistry.sol

61:         if (ownerToSet == address(0)) revert InvalidOwner();

78:         if (_services[serviceNameHash] != address(0)) revert ServiceAlreadySet();

96:         if (_services[serviceNameHash] == address(0)) revert ServiceUnknown();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/ServiceRegistry.sol)

```solidity
File: contracts/core/Settings.sol

97:         if (initialOwner == address(0)) revert InvalidOwner();

121:             if (_enabledAccounts.contains(account)) revert WhiteListAlreadyEnabled();

122:             if (!_enabledAccounts.add(account)) revert WhiteListFailedToAdd();

124:             if (!_enabledAccounts.contains(account)) revert WhiteListNotEnabled();

125:             if (!_enabledAccounts.remove(account)) revert WhiteListFailedToRemove();

156:         if (fee >= PERCENTAGE_PRECISION) revert InvalidPercentage();

185:         if (fee >= PERCENTAGE_PRECISION) revert InvalidPercentage();

213:         if (receiver == address(0)) revert InvalidAddress();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Settings.sol)

```solidity
File: contracts/core/Vault.sol

81:         if (!settings().isAccountEnabled(msg.sender)) revert NoPermissions();

113:         if (initialOwner == address(0)) revert InvalidOwner();        

142:                 if (

176:         if (msg.sender != address(_strategy)) revert ETHTransferNotAllowed(msg.sender);

201:         if (msg.value == 0) revert InvalidDepositAmount();

204:         if (

215:             if (afterDeposit > maxDeposit) revert MaxDepositReached();

246:         if (balanceOf(msg.sender) < shares) revert NotEnoughBalanceToWithdraw();

247:         if (shares == 0) revert InvalidWithdrawAmount();

256:         if (withdrawAmount == 0) revert NoAssetsToWithdraw();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/flashloan/BalancerFlashLender.sol

7: import {IFlashLoanRecipient} from "../../interfaces/balancer/IFlashLoan.sol";

81:         if (msg.sender != address(borrower)) revert InvalidBorrower();

104:         if (msg.sender != address(_balancerVault)) revert InvalidFlashLoadLender();

105:         if (tokens.length != 1) revert InvalidTokenList();

106:         if (amounts.length != 1) revert InvalidAmountList();

107:         if (feeAmounts.length != 1) revert InvalidFeesAmount();

116:         if (

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/flashloan/BalancerFlashLender.sol)

```solidity
File: contracts/core/hooks/UseAAVEv3.sol

34:         if (address(_aavev3) == address(0)) revert InvalidAAVEv3Contract();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseAAVEv3.sol)

```solidity
File: contracts/core/hooks/UseFlashLender.sol

18:         if (address(_fLender) == address(0)) revert InvalidFlashLenderContract();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseFlashLender.sol)

```solidity
File: contracts/core/hooks/UseIERC20.sol

16:         if (address(_ierc20) == address(0)) revert InvalidIERC20Contract();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseIERC20.sol)

```solidity
File: contracts/core/hooks/UseLeverage.sol

24:         if (nrLoops > MAX_LOOPS) revert InvalidNumberOfLoops();

25:         if (loanToValue == 0 || loanToValue >= PERCENTAGE_PRECISION) revert InvalidLoanToValue();

74:         if (colValue >= debt) revert InvalidTargetValue();

77:         if (divisor == 0) revert InvalidDivisor();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseLeverage.sol)

```solidity
File: contracts/core/hooks/UseOracle.sol

19:         if (address(_oracle) == address(0)) revert InvalidOracleContract();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseOracle.sol)

```solidity
File: contracts/core/hooks/UseSettings.sol

16:         if (address(_settings) == address(0)) revert InvalidSettingsContract();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseSettings.sol)

```solidity
File: contracts/core/hooks/UseStETH.sol

16:         if (address(_stETH) == address(0)) revert UseStETHInvalidStETHContract();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseStETH.sol)

```solidity
File: contracts/core/hooks/UseStrategy.sol

16:         if (address(_strategy) == address(0)) revert InvalidStrategyContract();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseStrategy.sol)

```solidity
File: contracts/core/hooks/UseSwapper.sol

46:         if (address(_uniRouter) == address(0)) revert InvalidUniRouterContract();

60:         if (params.underlyingIn == address(0)) revert InvalidInputToken();

61:         if (params.underlyingOut == address(0)) revert InvalidOutputToken();

63:         if (fee == 0) revert InvalidFeeTier();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseSwapper.sol)

```solidity
File: contracts/core/hooks/UseUniQuoter.sol

16:         if (address(_quoter) == address(0)) revert InvalidUniQuoterContract();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseUniQuoter.sol)

```solidity
File: contracts/core/hooks/UseWETH.sol

33:         if (address(_wETH) == address(0)) revert InvalidWETHContract();

57:         if(!IERC20(address(_wETH)).approve(address(_wETH), wETHAmount)) revert FailedAllowance();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseWETH.sol)

```solidity
File: contracts/core/hooks/UseWstETH.sol

40:         if (address(_wstETH) == address(0)) revert InvalidWstETHContract();

41:         if (address(_stETHToken) == address(0)) revert InvalidStETHContract();

66:         if (!_stETHToken.approve(wstETHA(), amount)) revert FailedToApproveStAllowance();

76:         if (!IERC20(wstETHA()).approve(wstETHA(), amount)) revert FailedToApproveWstAllowance();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseWstETH.sol)

```solidity
File: contracts/core/strategies/StrategyAAVEv3.sol

61:         if (aaveV3().getUserEMode(address(this)) != eModeCategory) revert InvalidAAVEEMode();

88:         if (!IERC20(assetIn).approve(aaveV3A(), amountIn)) revert FailedToApproveAllowanceForAAVE();

116:         if (!IERC20(assetIn).approve(aaveV3A(), amount)) revert FailedToApproveAllowanceForAAVE();

117:         if (aaveV3().repay(assetIn, amount, 2, address(this)) != amount) revert FailedToRepayDebt();

127:         if (aaveV3().withdraw(assetOut, amount, to) != amount)

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyAAVEv3WSTETH.sol

56:         if (!stETH().approve(uniRouterA(), 2 ** 256 - 1)) revert FailedToApproveAllowance();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyAAVEv3WSTETH.sol)

```solidity
File: contracts/core/strategies/StrategyLeverage.sol

146:         if (initialOwner == address(0)) revert InvalidOwner();

158:         if (address(_ethUSDOracle) == address(0)) revert InvalidDebtOracle();

159:         if (address(_collateralOracle) == address(0)) revert InvalidCollateralOracle();       

161:         if (!wETH().approve(uniRouterA(), 2 ** 256 - 1)) revert FailedToApproveAllowance();

162:         if (!ierc20().approve(uniRouterA(), 2 ** 256 - 1)) revert FailedToApproveAllowance();

174:         if (msg.sender != wETHA()) revert ETHTransferNotAllowed(msg.sender);

237:         if (msg.value == 0) revert InvalidDeployAmount();

249:         if(!wETH().approve(flashLenderA(), loanAmount + fee)) revert FailedToApproveAllowance();

250:         if (

296:         if (msg.sender != flashLenderA()) revert InvalidFlashLoanSender();

297:         if (initiator != address(this)) revert InvalidLoanInitiator();

299:         if (token != wETHA()) revert InvalidFlashLoanAsset();

344:         if (!wETH().approve(flashLenderA(), deltaDebt + fee)) revert FailedToApproveAllowance();

345:         if (

385:         if (totalCollateralBaseInEth <= totalDebtBaseInEth) revert CollateralLowerThanDebt();

390:         if (deltaDebt >= totalDebtBaseInEth) revert InvalidDeltaDebt();

401:         if (deltaDebt >= totalCollateralBaseInEth) revert InvalidDeltaDebt();

453:             if (

490:         if (totalCollateralBaseInEth <= totalDebtBaseInEth) revert NoCollateralMarginToScale();

504:         if (!wETH().approve(flashLenderA(), deltaDebtInETH + fee))

506:         if (

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverage.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageSettings.sol

85:         if (maxLoanToValue == 0) revert InvalidValue();

86:         if (maxLoanToValue > PERCENTAGE_PRECISION) revert InvalidPercentage();

87:         if (maxLoanToValue < _loanToValue) revert InvalidMaxLoanToValue();

117:         if (loanToValue > _maxLoanToValue) revert InvalidValue();

118:         if (loanToValue > PERCENTAGE_PRECISION) revert InvalidPercentage();

119:         if (loanToValue == 0) revert InvalidValue();

159:         if (nrLoops > MAX_LOOPS) revert InvalidLoopCount();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageSettings.sol)

```solidity
File: contracts/oracles/EthOracle.sol

32:         if ( answer<= 0 ) revert InvalidPriceFromOracle();        

33:         if ( startedAt ==0 || updatedAt == 0 ) revert InvalidPriceUpdatedAt();    

41:         if(block.timestamp - price.lastUpdate > age) revert  PriceOutdated();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/EthOracle.sol)

```solidity
File: contracts/oracles/PythOracle.sol

62:         if ( priceUpdateData.length == 0 ) revert InvalidPriceUpdate();

66:         if (msg.value < fee) revert NoEnoughFee();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/PythOracle.sol)

```solidity
File: contracts/oracles/WstETHToETHOracle.sol

34:         if ( answer <= 0 ) revert InvalidPriceFromOracle();        

35:         if ( startedAt ==0 || updatedAt == 0 ) revert InvalidPriceUpdatedAt();    

43:         if((block.timestamp - price.lastUpdate) > age) revert  PriceOutdated();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/WstETHToETHOracle.sol)

```solidity
File: contracts/oracles/WstETHToETHOracleETH.sol

34:         if ( wstETHToStETH == 0) revert InvalidPriceFromStEth();

36:         if ( answer <= 0 ) revert InvalidPriceFromOracle();        

37:         if ( startedAt ==0 || updatedAt == 0 ) revert InvalidPriceUpdatedAt();    

44:         if((block.timestamp - price.lastUpdate) > age) revert  PriceOutdated();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/WstETHToETHOracleETH.sol)

```solidity
File: contracts/oracles/cbETHToETHOracle.sol

32:         if ( answer<= 0 ) revert InvalidPriceFromOracle();        

33:         if ( startedAt == 0 || updatedAt == 0 ) revert InvalidPriceUpdatedAt();    

42:         if((block.timestamp - price.lastUpdate) > age) revert  PriceOutdated();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/cbETHToETHOracle.sol)

```solidity
File: contracts/proxy/BakerFiProxyAdmin.sol

17:         if(initialOwner == address(0)) revert InvalidOwner();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/proxy/BakerFiProxyAdmin.sol)

### <a name="NC-5"></a>[NC-5] Default Visibility for constants
Some constants are using the default visibility. For readability, consider explicitly declaring them as `internal`.

*Instances (21)*:
```solidity
File: contracts/core/Constants.sol

15: uint256 constant MAX_LOAN_TO_VALUE = 1e9; // 100%

22: uint8 constant MAX_LOOPS = 20; // 100%

29: uint256 constant PERCENTAGE_PRECISION = 1e9;

30: address constant ETH = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Constants.sol)

```solidity
File: contracts/core/ServiceRegistry.sol

11: bytes32 constant FLASH_LENDER_CONTRACT = keccak256(bytes("FlashLender"));

12: bytes32 constant WETH_CONTRACT = keccak256(bytes("WETH"));

13: bytes32 constant ST_ETH_CONTRACT = keccak256(bytes("stETH"));

14: bytes32 constant WST_ETH_CONTRACT = keccak256(bytes("wstETH"));

15: bytes32 constant BKR_CONTRACT = keccak256(bytes("BKR"));

16: bytes32 constant AAVE_V3_CONTRACT = keccak256(bytes("AAVE_V3"));

17: bytes32 constant WSTETH_USD_ORACLE_CONTRACT = keccak256(bytes("wstETH/USD Oracle"));

18: bytes32 constant CBETH_USD_ORACLE_CONTRACT = keccak256(bytes("cbETH/USD Oracle"));

19: bytes32 constant ETH_USD_ORACLE_CONTRACT = keccak256(bytes("ETH/USD Oracle"));

20: bytes32 constant CBETH_ERC20_CONTRACT = keccak256(bytes("cbETH"));

21: bytes32 constant UNISWAP_ROUTER_CONTRACT = keccak256(bytes("Uniswap Router"));

22: bytes32 constant SWAPPER_HANDLER_CONTRACT = keccak256(bytes("Swapper Handler"));

23: bytes32 constant BALANCER_VAULT_CONTRACT = keccak256(bytes("Balancer Vault"));

24: bytes32 constant SETTINGS_CONTRACT = keccak256(bytes("Settings"));

25: bytes32 constant UNISWAP_QUOTER_CONTRACT = keccak256(bytes("Uniswap Quoter"));

26: bytes32 constant STRATEGY_CONTRACT = keccak256(bytes("Strategy"));

27: bytes32 constant PYTH_CONTRACT = keccak256(bytes("Pyth"));

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/ServiceRegistry.sol)

### <a name="NC-6"></a>[NC-6] Consider disabling `renounceOwnership()`
If the plan for your project does not include eventually giving up all ownership control, consider overwriting OpenZeppelin's `Ownable`'s `renounceOwnership()` function in order to disable it.

*Instances (5)*:
```solidity
File: contracts/core/GovernableOwnable.sol

18: contract GovernableOwnable is OwnableUpgradeable {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/GovernableOwnable.sol)

```solidity
File: contracts/core/ServiceRegistry.sol

41: contract ServiceRegistry is Ownable, IServiceRegistry {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/ServiceRegistry.sol)

```solidity
File: contracts/core/Settings.sol

24: contract Settings is Ownable2StepUpgradeable, ISettings {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Settings.sol)

```solidity
File: contracts/core/governance/BKR.sol

22: contract BKR is ERC20, Ownable, ERC20Permit, ERC20Votes {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/governance/BKR.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageSettings.sol

7: contract StrategyLeverageSettings is GovernableOwnable {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageSettings.sol)

### <a name="NC-7"></a>[NC-7] Functions should not be longer than 50 lines
Overly complex code can make understanding functionality more difficult, try to further modularize your code to ensure readability 

*Instances (107)*:
```solidity
File: contracts/core/GovernableOwnable.sol

27:     function _initializeGovernableOwnable(address initialOwner, address initialGovernor) internal initializer {

43:     function governor() public view virtual returns (address) {

51:     function transferGovernorship(address _newGovernor) public virtual onlyGovernor {

56:     function _transferGovernorship(address newGovernor) internal virtual {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/GovernableOwnable.sol)

```solidity
File: contracts/core/ServiceRegistry.sol

77:     function registerService(bytes32 serviceNameHash, address serviceAddress) external onlyOwner {

95:     function unregisterService(bytes32 serviceNameHash) external onlyOwner {

108:     function getServiceNameHash(string memory name) external pure returns (bytes32) {

120:     function getService(string memory serviceName) external view returns (address) {

132:     function getServiceFromHash(bytes32 serviceHash) external view returns (address) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/ServiceRegistry.sol)

```solidity
File: contracts/core/Settings.sol

96:     function initialize(address initialOwner) public initializer {

119:     function enableAccount(address account, bool enabled) external onlyOwner {

139:     function isAccountEnabled(address account) external view returns (bool) {

155:     function setWithdrawalFee(uint256 fee) external onlyOwner {

168:     function getWithdrawalFee() external view returns (uint256) {

184:     function setPerformanceFee(uint256 fee) external onlyOwner {

197:     function getPerformanceFee() external view returns (uint256) {

212:     function setFeeReceiver(address receiver) external onlyOwner {

225:     function getFeeReceiver() external view returns (address) {

229:     function getMaxDepositInETH() external view returns (uint256) {

233:     function setMaxDepositInETH(uint256 value) external onlyOwner {

238:     function setRebalancePriceMaxAge(uint256 value) external onlyOwner {

243:     function getRebalancePriceMaxAge() external view returns (uint256) {

247:     function setPriceMaxAge(uint256 value) external onlyOwner {

252:     function getPriceMaxAge() external view returns (uint256) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Settings.sol)

```solidity
File: contracts/core/Vault.sol

280:     function totalAssets() public view override returns (uint256 amount) {

289:     function _totalAssets(uint256 priceMaxAge) private view returns (uint256 amount) {

302:     function convertToShares(uint256 assets) external view override returns (uint256 shares) {

316:     function convertToAssets(uint256 shares) external view override returns (uint256 assets) {

330:     function tokenPerETH() external view override returns (uint256) {

334:     function _tokenPerETH(uint256 priceMaxAge) internal view returns (uint256) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/flashloan/BalancerFlashLender.sol

53:     function maxFlashLoan(address token) external view override returns (uint256) {

57:     function flashFee(address, uint256 amount) external view override returns (uint256) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/flashloan/BalancerFlashLender.sol)

```solidity
File: contracts/core/governance/BKR.sol

42:     function _mint(address to, uint256 amount) internal override(ERC20, ERC20Votes) {

46:     function _burn(address account, uint256 amount) internal override(ERC20, ERC20Votes) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/governance/BKR.sol)

```solidity
File: contracts/core/governance/BakerFiGovernor.sol

31:     function votingDelay() public pure override returns (uint256) {

35:     function votingPeriod() public pure override returns (uint256) {

39:     function proposalThreshold() public pure override returns (uint256) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/governance/BakerFiGovernor.sol)

```solidity
File: contracts/core/hooks/UseAAVEv3.sol

32:     function _initUseAAVEv3(ServiceRegistry registry) internal onlyInitializing {

50:     function aaveV3A() public view returns (address) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseAAVEv3.sol)

```solidity
File: contracts/core/hooks/UseFlashLender.sol

14:     function _initUseFlashLender(ServiceRegistry registry) internal onlyInitializing {

21:     function flashLender() public view returns (IERC3156FlashLenderUpgradeable) {

24:     function flashLenderA() public view returns (address) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseFlashLender.sol)

```solidity
File: contracts/core/hooks/UseIERC20.sol

14:     function _initUseIERC20(ServiceRegistry registry, bytes32 name) internal onlyInitializing {

23:     function ierc20A() public view returns (address) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseIERC20.sol)

```solidity
File: contracts/core/hooks/UseOracle.sol

26:     function getLastPrice() public view returns (IOracle.Price memory) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseOracle.sol)

```solidity
File: contracts/core/hooks/UseSettings.sol

14:     function _initUseSettings(ServiceRegistry registry) internal onlyInitializing {

19:     function settings() public view returns (ISettings) {

22:     function settingsA() public view returns (address) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseSettings.sol)

```solidity
File: contracts/core/hooks/UseStETH.sol

14:     function _initUseStETH(ServiceRegistry registry) internal onlyInitializing {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseStETH.sol)

```solidity
File: contracts/core/hooks/UseStrategy.sol

14:     function _initUseStrategy(ServiceRegistry registry) internal onlyInitializing {

19:     function strategy() public view returns (IStrategy) {

22:     function strategyA() public view returns (address) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseStrategy.sol)

```solidity
File: contracts/core/hooks/UseSwapper.sol

44:     function _initUseSwapper(ServiceRegistry registry) internal onlyInitializing {

49:     function uniRouter() public view returns (IV3SwapRouter) {

53:     function uniRouterA() public view returns (address) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseSwapper.sol)

```solidity
File: contracts/core/hooks/UseUniQuoter.sol

14:     function _initUseUniQuoter(ServiceRegistry registry) internal onlyInitializing {

19:     function uniQuoter() public view returns (IQuoterV2) {

23:     function uniQuoterA() public view returns (address) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseUniQuoter.sol)

```solidity
File: contracts/core/hooks/UseWETH.sol

31:     function _initUseWETH(ServiceRegistry registry) internal onlyInitializing {

56:     function _unwrapWETH(uint256 wETHAmount) internal {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseWETH.sol)

```solidity
File: contracts/core/hooks/UseWstETH.sol

37:     function _initUseWstETH(ServiceRegistry registry) internal onlyInitializing {

56:     function wstETHA() public view returns (address) {

65:     function _wrapWstETH(uint256 amount) internal returns (uint256 amountOut) {

75:     function _unwrapWstETH(uint256 amount) internal returns (uint256 stETHAmount) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseWstETH.sol)

```solidity
File: contracts/core/strategies/StrategyAAVEv3.sol

71:     function _getMMPosition() internal virtual override view returns ( uint256 collateralBalance, uint256 debtBalance ) {

115:     function _repay(address assetIn, uint256 amount) internal override virtual {

126:     function _withdraw(address assetOut, uint256 amount,  address to) internal override virtual{

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyAAVEv3WSTETH.sol

67:     function _convertFromWETH(uint256 amount) internal virtual override returns (uint256) {

87:     function _convertToWETH(uint256 amount) internal virtual override returns (uint256) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyAAVEv3WSTETH.sol)

```solidity
File: contracts/core/strategies/StrategyLeverage.sol

215:     function deployed(uint256 priceMaxAge) public view returns (uint256 totalOwnedAssets) {

236:     function deploy() external payable onlyOwner nonReentrant returns (uint256 deployedAmount) {

239:         address(wETHA()).functionCallWithValue(abi.encodeWithSignature("deposit()"), msg.value);

377:     function harvest() external override onlyOwner nonReentrant returns (int256 balanceChange) {

428:     function _getMMPosition() internal virtual view returns (uint256 collateralBalance, uint256 debtBalance )  ;

542:       function _payDebt(uint256 debtAmount, uint256 fee) internal {

579:     function _convertFromWETH(uint256 amount) internal virtual returns (uint256) {

603:     function _convertToWETH(uint256 amount) internal virtual returns (uint256) {

627:     function _toWETH(uint256 amountIn) internal view returns (uint256 amountOut) {

641:     function _fromWETH(uint256 amountIn) internal view returns (uint256 amountOut) {

662:     function _supplyBorrow(uint256 amount, uint256 loanAmount, uint256 fee) internal {

726:     function _supply( address assetIn, uint256 amountIn) internal virtual;

731:     function _supplyAndBorrow( address assetIn, uint256 amountIn, address assetOut, uint256 borrowOut) internal virtual;

736:     function _repay(address assetIn, uint256 amount) internal virtual;

745:     function _withdraw(address assetOut, uint256 amount,  address to) internal virtual;

750:     function renounceOwnership() public virtual override {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverage.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageSettings.sol

84:     function setMaxLoanToValue(uint256 maxLoanToValue) external onlyGovernor {

98:     function getMaxLoanToValue() public view returns (uint256) {

116:     function setLoanToValue(uint256 loanToValue) external onlyGovernor {

131:     function getLoanToValue() public view returns (uint256) {

142:     function getNrLoops() public view returns (uint8) {

158:     function setNrLoops(uint8 nrLoops) external onlyGovernor {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageSettings.sol)

```solidity
File: contracts/oracles/EthOracle.sol

25:     function getPrecision() public pure override returns (uint256) {

30:     function getLatestPrice() public view override returns (IOracle.Price memory price) {

39:     function getSafeLatestPrice(uint256 age) public view override returns (IOracle.Price memory price) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/EthOracle.sol)

```solidity
File: contracts/oracles/PythOracle.sol

31:     function getPrecision() public pure override returns (uint256) {

38:     function _getPriceInternal(uint256 age) private view returns (IOracle.Price memory outPrice) {

74:     function getLatestPrice() public view override returns (IOracle.Price memory) {

81:     function getSafeLatestPrice(uint256 maxAge) public view override returns (IOracle.Price memory price) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/PythOracle.sol)

```solidity
File: contracts/oracles/WstETHToETHOracle.sol

27:     function getPrecision() public pure override returns (uint256) {

32:     function getLatestPrice() public view override returns (IOracle.Price memory price) {

41:     function getSafeLatestPrice(uint256 age) public view override returns (IOracle.Price memory price) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/WstETHToETHOracle.sol)

```solidity
File: contracts/oracles/WstETHToETHOracleETH.sol

27:     function getPrecision() public pure override returns (uint256) {

32:     function getLatestPrice() public view override returns (IOracle.Price memory price) {

42:     function getSafeLatestPrice(uint256 age) public view override returns (IOracle.Price memory price) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/WstETHToETHOracleETH.sol)

```solidity
File: contracts/oracles/cbETHToETHOracle.sol

25:     function getPrecision() public pure override returns (uint256) {

30:     function getLatestPrice() public view override returns (IOracle.Price memory price) {

40:     function getSafeLatestPrice(uint256 age) public view override returns (IOracle.Price memory price) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/cbETHToETHOracle.sol)

### <a name="NC-8"></a>[NC-8] Change int to int256
Throughout the code base, some variables are declared as `int`. To favor explicitness, consider changing all instances of `int` to `int256`

*Instances (1)*:
```solidity
File: contracts/core/Vault.sol

155:                     uint256 sharesToMint = (feeInEthScaled * totalSupply()) /

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Vault.sol)

### <a name="NC-9"></a>[NC-9] `type(uint256).max` should be used instead of `2 ** 256 - 1`

*Instances (3)*:
```solidity
File: contracts/core/strategies/StrategyAAVEv3WSTETH.sol

56:         if (!stETH().approve(uniRouterA(), 2 ** 256 - 1)) revert FailedToApproveAllowance();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyAAVEv3WSTETH.sol)

```solidity
File: contracts/core/strategies/StrategyLeverage.sol

161:         if (!wETH().approve(uniRouterA(), 2 ** 256 - 1)) revert FailedToApproveAllowance();

162:         if (!ierc20().approve(uniRouterA(), 2 ** 256 - 1)) revert FailedToApproveAllowance();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverage.sol)

### <a name="NC-10"></a>[NC-10] Use a `modifier` instead of a `require/if` statement for a special `msg.sender` actor
If a function is supposed to be access-controlled, a `modifier` should be used instead of a `require/if` statement for more readability.

*Instances (8)*:
```solidity
File: contracts/core/GovernableOwnable.sol

36:         if(msg.sender != governor()) revert CallerNotTheGovernor();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/GovernableOwnable.sol)

```solidity
File: contracts/core/Vault.sol

81:         if (!settings().isAccountEnabled(msg.sender)) revert NoPermissions();

176:         if (msg.sender != address(_strategy)) revert ETHTransferNotAllowed(msg.sender);

246:         if (balanceOf(msg.sender) < shares) revert NotEnoughBalanceToWithdraw();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/flashloan/BalancerFlashLender.sol

81:         if (msg.sender != address(borrower)) revert InvalidBorrower();

104:         if (msg.sender != address(_balancerVault)) revert InvalidFlashLoadLender();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/flashloan/BalancerFlashLender.sol)

```solidity
File: contracts/core/strategies/StrategyLeverage.sol

174:         if (msg.sender != wETHA()) revert ETHTransferNotAllowed(msg.sender);

296:         if (msg.sender != flashLenderA()) revert InvalidFlashLoanSender();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverage.sol)

### <a name="NC-11"></a>[NC-11] Consider using named mappings
Consider moving to solidity version 0.8.18 or later, and using [named mappings](https://ethereum.stackexchange.com/questions/51629/how-to-name-the-arguments-in-mapping/145555#145555) to make it easier to understand the purpose of each mapping

*Instances (1)*:
```solidity
File: contracts/core/ServiceRegistry.sol

51:     mapping(bytes32 => address) private _services;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/ServiceRegistry.sol)

### <a name="NC-12"></a>[NC-12] `address`s shouldn't be hard-coded
It is often better to declare `address`es as `immutable`, and assign them via constructor arguments. This allows the code to remain the same across deployments on different networks, and avoids recompilation when addresses need to change.

*Instances (1)*:
```solidity
File: contracts/core/Constants.sol

30: address constant ETH = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Constants.sol)

### <a name="NC-13"></a>[NC-13] Owner can renounce while system is paused
The contract owner or single user with a role is not prevented from renouncing the role/ownership while the contract is paused, which would cause any user assets stored in the protocol, to be locked indefinitely.

*Instances (2)*:
```solidity
File: contracts/core/Vault.sol

351:     function pause() external onlyOwner {

361:     function unpause() external onlyOwner {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Vault.sol)

### <a name="NC-14"></a>[NC-14] Take advantage of Custom Error's return value property
An important feature of Custom Error is that values such as address, tokenID, msg.value can be written inside the () sign, this kind of approach provides a serious advantage in debugging and examining the revert details of dapps such as tenderly.

*Instances (103)*:
```solidity
File: contracts/core/GovernableOwnable.sol

36:         if(msg.sender != governor()) revert CallerNotTheGovernor();

52:         if(_newGovernor == address(0)) revert InvalidGovernorAddress();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/GovernableOwnable.sol)

```solidity
File: contracts/core/ServiceRegistry.sol

61:         if (ownerToSet == address(0)) revert InvalidOwner();

78:         if (_services[serviceNameHash] != address(0)) revert ServiceAlreadySet();

96:         if (_services[serviceNameHash] == address(0)) revert ServiceUnknown();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/ServiceRegistry.sol)

```solidity
File: contracts/core/Settings.sol

97:         if (initialOwner == address(0)) revert InvalidOwner();

121:             if (_enabledAccounts.contains(account)) revert WhiteListAlreadyEnabled();

122:             if (!_enabledAccounts.add(account)) revert WhiteListFailedToAdd();

124:             if (!_enabledAccounts.contains(account)) revert WhiteListNotEnabled();

125:             if (!_enabledAccounts.remove(account)) revert WhiteListFailedToRemove();

156:         if (fee >= PERCENTAGE_PRECISION) revert InvalidPercentage();

185:         if (fee >= PERCENTAGE_PRECISION) revert InvalidPercentage();

213:         if (receiver == address(0)) revert InvalidAddress();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Settings.sol)

```solidity
File: contracts/core/Vault.sol

81:         if (!settings().isAccountEnabled(msg.sender)) revert NoPermissions();

113:         if (initialOwner == address(0)) revert InvalidOwner();        

201:         if (msg.value == 0) revert InvalidDepositAmount();

209:         ) revert InvalidAssetsState();

215:             if (afterDeposit > maxDeposit) revert MaxDepositReached();

246:         if (balanceOf(msg.sender) < shares) revert NotEnoughBalanceToWithdraw();

247:         if (shares == 0) revert InvalidWithdrawAmount();

256:         if (withdrawAmount == 0) revert NoAssetsToWithdraw();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/flashloan/BalancerFlashLender.sol

44:             revert InvalidVaultAddress();

81:         if (msg.sender != address(borrower)) revert InvalidBorrower();

104:         if (msg.sender != address(_balancerVault)) revert InvalidFlashLoadLender();

105:         if (tokens.length != 1) revert InvalidTokenList();

106:         if (amounts.length != 1) revert InvalidAmountList();

107:         if (feeAmounts.length != 1) revert InvalidFeesAmount();

125:             revert BorrowerCallbackFailed();

129:             revert NoAllowanceToPayDebt();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/flashloan/BalancerFlashLender.sol)

```solidity
File: contracts/core/hooks/UseAAVEv3.sol

34:         if (address(_aavev3) == address(0)) revert InvalidAAVEv3Contract();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseAAVEv3.sol)

```solidity
File: contracts/core/hooks/UseFlashLender.sol

18:         if (address(_fLender) == address(0)) revert InvalidFlashLenderContract();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseFlashLender.sol)

```solidity
File: contracts/core/hooks/UseIERC20.sol

16:         if (address(_ierc20) == address(0)) revert InvalidIERC20Contract();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseIERC20.sol)

```solidity
File: contracts/core/hooks/UseLeverage.sol

24:         if (nrLoops > MAX_LOOPS) revert InvalidNumberOfLoops();

25:         if (loanToValue == 0 || loanToValue >= PERCENTAGE_PRECISION) revert InvalidLoanToValue();

53:             revert InvalidPercentageValue();

74:         if (colValue >= debt) revert InvalidTargetValue();

77:         if (divisor == 0) revert InvalidDivisor();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseLeverage.sol)

```solidity
File: contracts/core/hooks/UseOracle.sol

19:         if (address(_oracle) == address(0)) revert InvalidOracleContract();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseOracle.sol)

```solidity
File: contracts/core/hooks/UseSettings.sol

16:         if (address(_settings) == address(0)) revert InvalidSettingsContract();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseSettings.sol)

```solidity
File: contracts/core/hooks/UseStETH.sol

16:         if (address(_stETH) == address(0)) revert UseStETHInvalidStETHContract();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseStETH.sol)

```solidity
File: contracts/core/hooks/UseStrategy.sol

16:         if (address(_strategy) == address(0)) revert InvalidStrategyContract();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseStrategy.sol)

```solidity
File: contracts/core/hooks/UseSwapper.sol

46:         if (address(_uniRouter) == address(0)) revert InvalidUniRouterContract();

60:         if (params.underlyingIn == address(0)) revert InvalidInputToken();

61:         if (params.underlyingOut == address(0)) revert InvalidOutputToken();

63:         if (fee == 0) revert InvalidFeeTier();

79:                 revert SwapFailed();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseSwapper.sol)

```solidity
File: contracts/core/hooks/UseUniQuoter.sol

16:         if (address(_quoter) == address(0)) revert InvalidUniQuoterContract();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseUniQuoter.sol)

```solidity
File: contracts/core/hooks/UseWETH.sol

33:         if (address(_wETH) == address(0)) revert InvalidWETHContract();

57:         if(!IERC20(address(_wETH)).approve(address(_wETH), wETHAmount)) revert FailedAllowance();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseWETH.sol)

```solidity
File: contracts/core/hooks/UseWstETH.sol

40:         if (address(_wstETH) == address(0)) revert InvalidWstETHContract();

41:         if (address(_stETHToken) == address(0)) revert InvalidStETHContract();

66:         if (!_stETHToken.approve(wstETHA(), amount)) revert FailedToApproveStAllowance();

76:         if (!IERC20(wstETHA()).approve(wstETHA(), amount)) revert FailedToApproveWstAllowance();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseWstETH.sol)

```solidity
File: contracts/core/strategies/StrategyAAVEv3.sol

61:         if (aaveV3().getUserEMode(address(this)) != eModeCategory) revert InvalidAAVEEMode();

88:         if (!IERC20(assetIn).approve(aaveV3A(), amountIn)) revert FailedToApproveAllowanceForAAVE();

116:         if (!IERC20(assetIn).approve(aaveV3A(), amount)) revert FailedToApproveAllowanceForAAVE();

117:         if (aaveV3().repay(assetIn, amount, 2, address(this)) != amount) revert FailedToRepayDebt();

128:             revert InvalidWithdrawAmount();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyAAVEv3WSTETH.sol

56:         if (!stETH().approve(uniRouterA(), 2 ** 256 - 1)) revert FailedToApproveAllowance();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyAAVEv3WSTETH.sol)

```solidity
File: contracts/core/strategies/StrategyLeverage.sol

146:         if (initialOwner == address(0)) revert InvalidOwner();

158:         if (address(_ethUSDOracle) == address(0)) revert InvalidDebtOracle();

159:         if (address(_collateralOracle) == address(0)) revert InvalidCollateralOracle();       

161:         if (!wETH().approve(uniRouterA(), 2 ** 256 - 1)) revert FailedToApproveAllowance();

162:         if (!ierc20().approve(uniRouterA(), 2 ** 256 - 1)) revert FailedToApproveAllowance();

237:         if (msg.value == 0) revert InvalidDeployAmount();

249:         if(!wETH().approve(flashLenderA(), loanAmount + fee)) revert FailedToApproveAllowance();

258:             revert FailedToRunFlashLoan();

296:         if (msg.sender != flashLenderA()) revert InvalidFlashLoanSender();

297:         if (initiator != address(this)) revert InvalidLoanInitiator();

299:         if (token != wETHA()) revert InvalidFlashLoanAsset();

344:         if (!wETH().approve(flashLenderA(), deltaDebt + fee)) revert FailedToApproveAllowance();

353:             revert FailedToRunFlashLoan();

385:         if (totalCollateralBaseInEth <= totalDebtBaseInEth) revert CollateralLowerThanDebt();

390:         if (deltaDebt >= totalDebtBaseInEth) revert InvalidDeltaDebt();

401:         if (deltaDebt >= totalCollateralBaseInEth) revert InvalidDeltaDebt();

459:                 revert PriceOutdated();

490:         if (totalCollateralBaseInEth <= totalDebtBaseInEth) revert NoCollateralMarginToScale();

505:             revert FailedToApproveAllowance();

514:             revert FailedToRunFlashLoan();

751:         revert InvalidOwner(); 

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverage.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageSettings.sol

85:         if (maxLoanToValue == 0) revert InvalidValue();

86:         if (maxLoanToValue > PERCENTAGE_PRECISION) revert InvalidPercentage();

87:         if (maxLoanToValue < _loanToValue) revert InvalidMaxLoanToValue();

117:         if (loanToValue > _maxLoanToValue) revert InvalidValue();

118:         if (loanToValue > PERCENTAGE_PRECISION) revert InvalidPercentage();

119:         if (loanToValue == 0) revert InvalidValue();

159:         if (nrLoops > MAX_LOOPS) revert InvalidLoopCount();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageSettings.sol)

```solidity
File: contracts/oracles/EthOracle.sol

32:         if ( answer<= 0 ) revert InvalidPriceFromOracle();        

33:         if ( startedAt ==0 || updatedAt == 0 ) revert InvalidPriceUpdatedAt();    

41:         if(block.timestamp - price.lastUpdate > age) revert  PriceOutdated();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/EthOracle.sol)

```solidity
File: contracts/oracles/PythOracle.sol

62:         if ( priceUpdateData.length == 0 ) revert InvalidPriceUpdate();

66:         if (msg.value < fee) revert NoEnoughFee();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/PythOracle.sol)

```solidity
File: contracts/oracles/WstETHToETHOracle.sol

34:         if ( answer <= 0 ) revert InvalidPriceFromOracle();        

35:         if ( startedAt ==0 || updatedAt == 0 ) revert InvalidPriceUpdatedAt();    

43:         if((block.timestamp - price.lastUpdate) > age) revert  PriceOutdated();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/WstETHToETHOracle.sol)

```solidity
File: contracts/oracles/WstETHToETHOracleETH.sol

34:         if ( wstETHToStETH == 0) revert InvalidPriceFromStEth();

36:         if ( answer <= 0 ) revert InvalidPriceFromOracle();        

37:         if ( startedAt ==0 || updatedAt == 0 ) revert InvalidPriceUpdatedAt();    

44:         if((block.timestamp - price.lastUpdate) > age) revert  PriceOutdated();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/WstETHToETHOracleETH.sol)

```solidity
File: contracts/oracles/cbETHToETHOracle.sol

32:         if ( answer<= 0 ) revert InvalidPriceFromOracle();        

33:         if ( startedAt == 0 || updatedAt == 0 ) revert InvalidPriceUpdatedAt();    

42:         if((block.timestamp - price.lastUpdate) > age) revert  PriceOutdated();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/cbETHToETHOracle.sol)

```solidity
File: contracts/proxy/BakerFiProxyAdmin.sol

17:         if(initialOwner == address(0)) revert InvalidOwner();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/proxy/BakerFiProxyAdmin.sol)

### <a name="NC-15"></a>[NC-15] Use scientific notation (e.g. `1e18`) rather than exponentiation (e.g. `10**18`)
While this won't save gas in the recent solidity versions, this is shorter and more readable (this is especially true in calculations).

*Instances (4)*:
```solidity
File: contracts/oracles/EthOracle.sol

16:     uint256 private constant _PRECISION = 10 ** 18;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/EthOracle.sol)

```solidity
File: contracts/oracles/WstETHToETHOracle.sol

18:     uint256 internal constant _PRECISION = 10 ** 18;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/WstETHToETHOracle.sol)

```solidity
File: contracts/oracles/WstETHToETHOracleETH.sol

16:     uint256 internal constant _PRECISION = 10 ** 18;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/WstETHToETHOracleETH.sol)

```solidity
File: contracts/oracles/cbETHToETHOracle.sol

16:     uint256 private constant _PRECISION = 10 ** 18;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/cbETHToETHOracle.sol)

### <a name="NC-16"></a>[NC-16] Avoid the use of sensitive terms
Use [alternative variants](https://www.zdnet.com/article/mysql-drops-master-slave-and-blacklist-whitelist-terminology/), e.g. allowlist/denylist instead of whitelist/blacklist

*Instances (12)*:
```solidity
File: contracts/core/Settings.sol

26:     error WhiteListAlreadyEnabled();

27:     error WhiteListFailedToAdd();

28:     error WhiteListNotEnabled();

29:     error WhiteListFailedToRemove();

121:             if (_enabledAccounts.contains(account)) revert WhiteListAlreadyEnabled();

122:             if (!_enabledAccounts.add(account)) revert WhiteListFailedToAdd();

124:             if (!_enabledAccounts.contains(account)) revert WhiteListNotEnabled();

125:             if (!_enabledAccounts.remove(account)) revert WhiteListFailedToRemove();

127:         emit AccountWhiteList(account, enabled);

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Settings.sol)

```solidity
File: contracts/core/Vault.sol

80:     modifier onlyWhiteListed() {

198:         onlyWhiteListed

245:     ) external override nonReentrant onlyWhiteListed whenNotPaused returns (uint256 amount) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Vault.sol)

### <a name="NC-17"></a>[NC-17] Variables need not be initialized to zero
The default value for variables is zero, so initializing them to zero is superfluous.

*Instances (4)*:
```solidity
File: contracts/core/Vault.sol

258:         uint256 fee = 0;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/strategies/StrategyLeverage.sol

113:     uint256 internal _pendingAmount = 0;

114:     uint256 private _deployedAmount = 0;

387:         uint256 deltaDebt = 0;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverage.sol)


## Low Issues


| |Issue|Instances|
|-|:-|:-:|
| [L-1](#L-1) | `approve()`/`safeApprove()` may revert if the current approval is not zero | 11 |
| [L-2](#L-2) | Use a 2-step ownership transfer pattern | 4 |
| [L-3](#L-3) | Division by zero not prevented | 9 |
| [L-4](#L-4) | Initializers could be front-run | 11 |
| [L-5](#L-5) | Owner can renounce while system is paused | 2 |
| [L-6](#L-6) | Possible rounding issue | 7 |
| [L-7](#L-7) | `pragma experimental ABIEncoderV2` is deprecated | 12 |
| [L-8](#L-8) | Loss of precision | 13 |
| [L-9](#L-9) | Use `Ownable2Step.transferOwnership` instead of `Ownable.transferOwnership` | 10 |
| [L-10](#L-10) | Unsafe ERC20 operation(s) | 11 |
| [L-11](#L-11) | Upgradeable contract is missing a `__gap[50]` storage variable to allow for new storage variables in later versions | 64 |
| [L-12](#L-12) | Upgradeable contract not initialized | 83 |
### <a name="L-1"></a>[L-1] `approve()`/`safeApprove()` may revert if the current approval is not zero
- Some tokens (like the *very popular* USDT) do not work when changing the allowance from an existing non-zero allowance value (it will revert if the current approval is not zero to protect against front-running changes of approvals). These tokens must first be approved for zero and then the actual allowance can be approved.
- Furthermore, OZ's implementation of safeApprove would throw an error if an approve is attempted from a non-zero value (`"SafeERC20: approve from non-zero to non-zero allowance"`)

Set the allowance to zero immediately before each of the existing allowance calls

*Instances (11)*:
```solidity
File: contracts/core/hooks/UseWETH.sol

57:         if(!IERC20(address(_wETH)).approve(address(_wETH), wETHAmount)) revert FailedAllowance();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseWETH.sol)

```solidity
File: contracts/core/hooks/UseWstETH.sol

66:         if (!_stETHToken.approve(wstETHA(), amount)) revert FailedToApproveStAllowance();

76:         if (!IERC20(wstETHA()).approve(wstETHA(), amount)) revert FailedToApproveWstAllowance();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseWstETH.sol)

```solidity
File: contracts/core/strategies/StrategyAAVEv3.sol

88:         if (!IERC20(assetIn).approve(aaveV3A(), amountIn)) revert FailedToApproveAllowanceForAAVE();

116:         if (!IERC20(assetIn).approve(aaveV3A(), amount)) revert FailedToApproveAllowanceForAAVE();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyAAVEv3WSTETH.sol

56:         if (!stETH().approve(uniRouterA(), 2 ** 256 - 1)) revert FailedToApproveAllowance();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyAAVEv3WSTETH.sol)

```solidity
File: contracts/core/strategies/StrategyLeverage.sol

161:         if (!wETH().approve(uniRouterA(), 2 ** 256 - 1)) revert FailedToApproveAllowance();

162:         if (!ierc20().approve(uniRouterA(), 2 ** 256 - 1)) revert FailedToApproveAllowance();

249:         if(!wETH().approve(flashLenderA(), loanAmount + fee)) revert FailedToApproveAllowance();

344:         if (!wETH().approve(flashLenderA(), deltaDebt + fee)) revert FailedToApproveAllowance();

504:         if (!wETH().approve(flashLenderA(), deltaDebtInETH + fee))

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverage.sol)

### <a name="L-2"></a>[L-2] Use a 2-step ownership transfer pattern
Recommend considering implementing a two step process where the owner or admin nominates an account and the nominated account needs to call an `acceptOwnership()` function for the transfer of ownership to fully succeed. This ensures the nominated EOA account is a valid and active account. Lack of two-step procedure for critical operations leaves them error-prone. Consider adding two step procedure on the critical functions.

*Instances (4)*:
```solidity
File: contracts/core/GovernableOwnable.sol

18: contract GovernableOwnable is OwnableUpgradeable {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/GovernableOwnable.sol)

```solidity
File: contracts/core/ServiceRegistry.sol

41: contract ServiceRegistry is Ownable, IServiceRegistry {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/ServiceRegistry.sol)

```solidity
File: contracts/core/governance/BKR.sol

22: contract BKR is ERC20, Ownable, ERC20Permit, ERC20Votes {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/governance/BKR.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageSettings.sol

7: contract StrategyLeverageSettings is GovernableOwnable {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageSettings.sol)

### <a name="L-3"></a>[L-3] Division by zero not prevented
The divisions below take an input parameter which does not have any zero-value checks, which may lead to the functions reverting when zero is passed.

*Instances (9)*:
```solidity
File: contracts/core/Vault.sol

339:         return (totalSupply() * 1 ether) / position;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/flashloan/BalancerFlashLender.sol

63:         return (amount * perc) / _BALANCER_MAX_FEE_PERCENTAGE;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/flashloan/BalancerFlashLender.sol)

```solidity
File: contracts/core/hooks/UseLeverage.sol

78:         delta = (numerator * PERCENTAGE_PRECISION) / divisor;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseLeverage.sol)

```solidity
File: contracts/core/strategies/StrategyLeverage.sol

199:             loanToValue = (totalDebtInEth * PERCENTAGE_PRECISION) / totalCollateralInEth;

392:         uint256 ltv = (totalDebtBaseInEth * PERCENTAGE_PRECISION) / totalCollateralBaseInEth;

461:             totalCollateralInEth = (collateralBalance * collateralPrice.price) / ethPrice.price;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverage.sol)

```solidity
File: contracts/libraries/RebaseLibrary.sol

40:             base = (elastic * total.base) / total.elastic;

56:             elastic = (base * total.elastic) / total.base;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/libraries/RebaseLibrary.sol)

```solidity
File: contracts/oracles/WstETHToETHOracleETH.sol

38:         price.price = (wstETHToStETH * uint256(answer)) / _PRECISION;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/WstETHToETHOracleETH.sol)

### <a name="L-4"></a>[L-4] Initializers could be front-run
Initializers could be front-run, allowing an attacker to either set their own values, take ownership of the contract, and in the best case forcing a re-deployment

*Instances (11)*:
```solidity
File: contracts/core/GovernableOwnable.sol

27:     function _initializeGovernableOwnable(address initialOwner, address initialGovernor) internal initializer {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/GovernableOwnable.sol)

```solidity
File: contracts/core/Settings.sol

96:     function initialize(address initialOwner) public initializer {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Settings.sol)

```solidity
File: contracts/core/Vault.sol

104:     function initialize(

110:     ) public initializer {

111:         __ERC20Permit_init(tokenName);

112:         __ERC20_init(tokenName, tokenSymbol);

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/strategies/StrategyAAVEv3.sol

42:     function initialize(

50:     ) public initializer {        

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyAAVEv3WSTETH.sol

44:     ) public initializer {

45:         initialize(

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyAAVEv3WSTETH.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageSettings.sol

66:     ) internal initializer {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageSettings.sol)

### <a name="L-5"></a>[L-5] Owner can renounce while system is paused
The contract owner or single user with a role is not prevented from renouncing the role/ownership while the contract is paused, which would cause any user assets stored in the protocol, to be locked indefinitely.

*Instances (2)*:
```solidity
File: contracts/core/Vault.sol

351:     function pause() external onlyOwner {

361:     function unpause() external onlyOwner {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Vault.sol)

### <a name="L-6"></a>[L-6] Possible rounding issue
Division by large numbers may result in the result being zero, due to solidity not supporting fractions. Consider requiring a minimum amount for the numerator to ensure that it is always larger than the denominator. Also, there is indication of multiplication and division without the use of parenthesis which could result in issues.

*Instances (7)*:
```solidity
File: contracts/core/flashloan/BalancerFlashLender.sol

63:         return (amount * perc) / _BALANCER_MAX_FEE_PERCENTAGE;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/flashloan/BalancerFlashLender.sol)

```solidity
File: contracts/core/strategies/StrategyLeverage.sol

199:             loanToValue = (totalDebtInEth * PERCENTAGE_PRECISION) / totalCollateralInEth;

392:         uint256 ltv = (totalDebtBaseInEth * PERCENTAGE_PRECISION) / totalCollateralBaseInEth;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverage.sol)

```solidity
File: contracts/libraries/RebaseLibrary.sol

40:             base = (elastic * total.base) / total.elastic;

41:             if (roundUp && (base * total.elastic) / total.base < elastic) {

56:             elastic = (base * total.elastic) / total.base;

57:             if (roundUp && (elastic * total.base) / total.elastic < base) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/libraries/RebaseLibrary.sol)

### <a name="L-7"></a>[L-7] `pragma experimental ABIEncoderV2` is deprecated
Use `pragma abicoder v2` [instead](https://github.com/ethereum/solidity/blob/69411436139acf5dbcfc5828446f18b9fcfee32c/docs/080-breaking-changes.rst#silent-changes-of-the-semantics)

*Instances (12)*:
```solidity
File: contracts/core/Constants.sol

3: pragma experimental ABIEncoderV2;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Constants.sol)

```solidity
File: contracts/core/hooks/UseAAVEv3.sol

3: pragma experimental ABIEncoderV2;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseAAVEv3.sol)

```solidity
File: contracts/core/hooks/UseFlashLender.sol

3: pragma experimental ABIEncoderV2;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseFlashLender.sol)

```solidity
File: contracts/core/hooks/UseIERC20.sol

3: pragma experimental ABIEncoderV2;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseIERC20.sol)

```solidity
File: contracts/core/hooks/UseOracle.sol

3: pragma experimental ABIEncoderV2;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseOracle.sol)

```solidity
File: contracts/core/hooks/UseSettings.sol

3: pragma experimental ABIEncoderV2;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseSettings.sol)

```solidity
File: contracts/core/hooks/UseStETH.sol

3: pragma experimental ABIEncoderV2;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseStETH.sol)

```solidity
File: contracts/core/hooks/UseStrategy.sol

3: pragma experimental ABIEncoderV2;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseStrategy.sol)

```solidity
File: contracts/core/hooks/UseSwapper.sol

3: pragma experimental ABIEncoderV2;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseSwapper.sol)

```solidity
File: contracts/core/hooks/UseUniQuoter.sol

3: pragma experimental ABIEncoderV2;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseUniQuoter.sol)

```solidity
File: contracts/core/hooks/UseWETH.sol

3: pragma experimental ABIEncoderV2;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseWETH.sol)

```solidity
File: contracts/core/hooks/UseWstETH.sol

3: pragma experimental ABIEncoderV2;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseWstETH.sol)

### <a name="L-8"></a>[L-8] Loss of precision
Division by large numbers may result in the result being zero, due to solidity not supporting fractions. Consider requiring a minimum amount for the numerator to ensure that it is always larger than the denominator

*Instances (13)*:
```solidity
File: contracts/core/Vault.sol

262:             fee = (amount * settings().getWithdrawalFee()) / PERCENTAGE_PRECISION;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/flashloan/BalancerFlashLender.sol

63:         return (amount * perc) / _BALANCER_MAX_FEE_PERCENTAGE;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/flashloan/BalancerFlashLender.sol)

```solidity
File: contracts/core/hooks/UseLeverage.sol

29:             uint256 inc = (prev * loanToValue) / PERCENTAGE_PRECISION;

56:         deltaDebtInETH = (totalDebtBaseInEth * percentageToBurn) / PERCENTAGE_PRECISION;

58:         deltaCollateralInETH = (totalCollateralBaseInEth * percentageToBurn) / PERCENTAGE_PRECISION;

73:         uint256 colValue = ((targetLoanToValue * collateral) / PERCENTAGE_PRECISION);

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseLeverage.sol)

```solidity
File: contracts/core/strategies/StrategyLeverage.sol

199:             loanToValue = (totalDebtInEth * PERCENTAGE_PRECISION) / totalCollateralInEth;

392:         uint256 ltv = (totalDebtBaseInEth * PERCENTAGE_PRECISION) / totalCollateralBaseInEth;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverage.sol)

```solidity
File: contracts/libraries/RebaseLibrary.sol

40:             base = (elastic * total.base) / total.elastic;

41:             if (roundUp && (base * total.elastic) / total.base < elastic) {

56:             elastic = (base * total.elastic) / total.base;

57:             if (roundUp && (elastic * total.base) / total.elastic < base) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/libraries/RebaseLibrary.sol)

```solidity
File: contracts/oracles/WstETHToETHOracleETH.sol

38:         price.price = (wstETHToStETH * uint256(answer)) / _PRECISION;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/oracles/WstETHToETHOracleETH.sol)

### <a name="L-9"></a>[L-9] Use `Ownable2Step.transferOwnership` instead of `Ownable.transferOwnership`
Use [Ownable2Step.transferOwnership](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable2Step.sol) which is safer. Use it as it is more secure due to 2-stage ownership transfer.

**Recommended Mitigation Steps**

Use <a href="https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable2Step.sol">Ownable2Step.sol</a>
  
  ```solidity
      function acceptOwnership() external {
          address sender = _msgSender();
          require(pendingOwner() == sender, "Ownable2Step: caller is not the new owner");
          _transferOwnership(sender);
      }
```

*Instances (10)*:
```solidity
File: contracts/core/GovernableOwnable.sol

4: import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

28:         _transferOwnership(initialOwner);

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/GovernableOwnable.sol)

```solidity
File: contracts/core/ServiceRegistry.sol

4: import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

62:         _transferOwnership(ownerToSet);

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/ServiceRegistry.sol)

```solidity
File: contracts/core/Settings.sol

98:         _transferOwnership(initialOwner);

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Settings.sol)

```solidity
File: contracts/core/Vault.sol

114:         _transferOwnership(initialOwner);

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/governance/BKR.sol

5: import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

31:         transferOwnership(initialOwner);

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/governance/BKR.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageSettings.sol

4: import {GovernableOwnable} from "../GovernableOwnable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageSettings.sol)

```solidity
File: contracts/proxy/BakerFiProxyAdmin.sol

18:         _transferOwnership(initialOwner);

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/proxy/BakerFiProxyAdmin.sol)

### <a name="L-10"></a>[L-10] Unsafe ERC20 operation(s)

*Instances (11)*:
```solidity
File: contracts/core/hooks/UseWETH.sol

57:         if(!IERC20(address(_wETH)).approve(address(_wETH), wETHAmount)) revert FailedAllowance();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseWETH.sol)

```solidity
File: contracts/core/hooks/UseWstETH.sol

66:         if (!_stETHToken.approve(wstETHA(), amount)) revert FailedToApproveStAllowance();

76:         if (!IERC20(wstETHA()).approve(wstETHA(), amount)) revert FailedToApproveWstAllowance();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseWstETH.sol)

```solidity
File: contracts/core/strategies/StrategyAAVEv3.sol

88:         if (!IERC20(assetIn).approve(aaveV3A(), amountIn)) revert FailedToApproveAllowanceForAAVE();

116:         if (!IERC20(assetIn).approve(aaveV3A(), amount)) revert FailedToApproveAllowanceForAAVE();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyAAVEv3WSTETH.sol

56:         if (!stETH().approve(uniRouterA(), 2 ** 256 - 1)) revert FailedToApproveAllowance();

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyAAVEv3WSTETH.sol)

```solidity
File: contracts/core/strategies/StrategyLeverage.sol

161:         if (!wETH().approve(uniRouterA(), 2 ** 256 - 1)) revert FailedToApproveAllowance();

162:         if (!ierc20().approve(uniRouterA(), 2 ** 256 - 1)) revert FailedToApproveAllowance();

249:         if(!wETH().approve(flashLenderA(), loanAmount + fee)) revert FailedToApproveAllowance();

344:         if (!wETH().approve(flashLenderA(), deltaDebt + fee)) revert FailedToApproveAllowance();

504:         if (!wETH().approve(flashLenderA(), deltaDebtInETH + fee))

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverage.sol)

### <a name="L-11"></a>[L-11] Upgradeable contract is missing a `__gap[50]` storage variable to allow for new storage variables in later versions
See [this](https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps) link for a description of this storage variable. While some contracts may not currently be sub-classed, adding the variable now protects against forgetting to add it in the future.

*Instances (64)*:
```solidity
File: contracts/core/GovernableOwnable.sol

4: import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

18: contract GovernableOwnable is OwnableUpgradeable {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/GovernableOwnable.sol)

```solidity
File: contracts/core/Settings.sol

4: import {Ownable2StepUpgradeable} from "@openzeppelin/contracts-upgradeable/access/Ownable2StepUpgradeable.sol";

24: contract Settings is Ownable2StepUpgradeable, ISettings {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Settings.sol)

```solidity
File: contracts/core/Vault.sol

4: import {Ownable2StepUpgradeable} from "@openzeppelin/contracts-upgradeable/access/Ownable2StepUpgradeable.sol";

5: import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

6: import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

11: import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

13: import {ERC20PermitUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PermitUpgradeable.sol";

15: import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

16: import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

43:     Ownable2StepUpgradeable,

44:     PausableUpgradeable,

45:     ReentrancyGuardUpgradeable,

46:     ERC20PermitUpgradeable,

51:     using SafeERC20Upgradeable for ERC20Upgradeable;

52:     using AddressUpgradeable for address;

53:     using AddressUpgradeable for address payable;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/flashloan/BalancerFlashLender.sol

6: import {IERC3156FlashLenderUpgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC3156FlashLenderUpgradeable.sol";

10: import {IERC3156FlashBorrowerUpgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC3156FlashBorrowerUpgradeable.sol";

23: contract BalancerFlashLender is IERC3156FlashLenderUpgradeable, IFlashLoanRecipient {

76:         IERC3156FlashBorrowerUpgradeable borrower,

117:             IERC3156FlashBorrowerUpgradeable(borrower).onFlashLoan(

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/flashloan/BalancerFlashLender.sol)

```solidity
File: contracts/core/hooks/UseAAVEv3.sol

9: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseAAVEv3.sol)

```solidity
File: contracts/core/hooks/UseFlashLender.sol

6: import {IERC3156FlashLenderUpgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC3156FlashLenderUpgradeable.sol";

7: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

10:     IERC3156FlashLenderUpgradeable private _fLender;

15:         _fLender = IERC3156FlashLenderUpgradeable(

21:     function flashLender() public view returns (IERC3156FlashLenderUpgradeable) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseFlashLender.sol)

```solidity
File: contracts/core/hooks/UseIERC20.sol

7: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseIERC20.sol)

```solidity
File: contracts/core/hooks/UseOracle.sol

7: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseOracle.sol)

```solidity
File: contracts/core/hooks/UseSettings.sol

7: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseSettings.sol)

```solidity
File: contracts/core/hooks/UseStETH.sol

7: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseStETH.sol)

```solidity
File: contracts/core/hooks/UseStrategy.sol

7: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseStrategy.sol)

```solidity
File: contracts/core/hooks/UseSwapper.sol

10: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseSwapper.sol)

```solidity
File: contracts/core/hooks/UseUniQuoter.sol

7: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseUniQuoter.sol)

```solidity
File: contracts/core/hooks/UseWETH.sol

9: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseWETH.sol)

```solidity
File: contracts/core/hooks/UseWstETH.sol

9: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseWstETH.sol)

```solidity
File: contracts/core/strategies/StrategyAAVEv3.sol

8: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

11: import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

28:     using AddressUpgradeable for address;

29:     using AddressUpgradeable for address payable;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyAAVEv3WSTETH.sol

8: import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

9: import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

10: import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

12: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

29:     using SafeERC20Upgradeable for IERC20Upgradeable;

30:     using AddressUpgradeable for address payable;

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyAAVEv3WSTETH.sol)

```solidity
File: contracts/core/strategies/StrategyLeverage.sol

4: import {IERC3156FlashBorrowerUpgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC3156FlashBorrowerUpgradeable.sol";

6: import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

7: import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

20: import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

21: import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

69:     IERC3156FlashBorrowerUpgradeable,

75:     ReentrancyGuardUpgradeable,

93:     using SafeERC20Upgradeable for IERC20Upgradeable;

94:     using AddressUpgradeable for address;

95:     using AddressUpgradeable for address payable;

252:                 IERC3156FlashBorrowerUpgradeable(this),

347:                 IERC3156FlashBorrowerUpgradeable(this),

508:                 IERC3156FlashBorrowerUpgradeable(this),

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverage.sol)

```solidity
File: contracts/proxy/BakerFiProxy.sol

4: import {TransparentUpgradeableProxy} from "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

11: contract BakerFiProxy is TransparentUpgradeableProxy {

22:     ) TransparentUpgradeableProxy(_logic, admin_, _data) {}

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/proxy/BakerFiProxy.sol)

### <a name="L-12"></a>[L-12] Upgradeable contract not initialized
Upgradeable contracts are initialized via an initializer function rather than by a constructor. Leaving such a contract uninitialized may lead to it being taken over by a malicious user

*Instances (83)*:
```solidity
File: contracts/core/GovernableOwnable.sol

4: import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

18: contract GovernableOwnable is OwnableUpgradeable {

27:     function _initializeGovernableOwnable(address initialOwner, address initialGovernor) internal initializer {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/GovernableOwnable.sol)

```solidity
File: contracts/core/Settings.sol

4: import {Ownable2StepUpgradeable} from "@openzeppelin/contracts-upgradeable/access/Ownable2StepUpgradeable.sol";

24: contract Settings is Ownable2StepUpgradeable, ISettings {

82:         _disableInitializers();

96:     function initialize(address initialOwner) public initializer {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Settings.sol)

```solidity
File: contracts/core/Vault.sol

4: import {Ownable2StepUpgradeable} from "@openzeppelin/contracts-upgradeable/access/Ownable2StepUpgradeable.sol";

5: import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

6: import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

11: import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

13: import {ERC20PermitUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PermitUpgradeable.sol";

15: import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

16: import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

43:     Ownable2StepUpgradeable,

44:     PausableUpgradeable,

45:     ReentrancyGuardUpgradeable,

46:     ERC20PermitUpgradeable,

51:     using SafeERC20Upgradeable for ERC20Upgradeable;

52:     using AddressUpgradeable for address;

53:     using AddressUpgradeable for address payable;

86:         _disableInitializers();

104:     function initialize(

110:     ) public initializer {

111:         __ERC20Permit_init(tokenName);

112:         __ERC20_init(tokenName, tokenSymbol);

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/flashloan/BalancerFlashLender.sol

6: import {IERC3156FlashLenderUpgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC3156FlashLenderUpgradeable.sol";

10: import {IERC3156FlashBorrowerUpgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC3156FlashBorrowerUpgradeable.sol";

23: contract BalancerFlashLender is IERC3156FlashLenderUpgradeable, IFlashLoanRecipient {

76:         IERC3156FlashBorrowerUpgradeable borrower,

117:             IERC3156FlashBorrowerUpgradeable(borrower).onFlashLoan(

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/flashloan/BalancerFlashLender.sol)

```solidity
File: contracts/core/hooks/UseAAVEv3.sol

9: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseAAVEv3.sol)

```solidity
File: contracts/core/hooks/UseFlashLender.sol

6: import {IERC3156FlashLenderUpgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC3156FlashLenderUpgradeable.sol";

7: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

10:     IERC3156FlashLenderUpgradeable private _fLender;

15:         _fLender = IERC3156FlashLenderUpgradeable(

21:     function flashLender() public view returns (IERC3156FlashLenderUpgradeable) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseFlashLender.sol)

```solidity
File: contracts/core/hooks/UseIERC20.sol

7: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseIERC20.sol)

```solidity
File: contracts/core/hooks/UseOracle.sol

7: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseOracle.sol)

```solidity
File: contracts/core/hooks/UseSettings.sol

7: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseSettings.sol)

```solidity
File: contracts/core/hooks/UseStETH.sol

7: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseStETH.sol)

```solidity
File: contracts/core/hooks/UseStrategy.sol

7: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseStrategy.sol)

```solidity
File: contracts/core/hooks/UseSwapper.sol

10: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseSwapper.sol)

```solidity
File: contracts/core/hooks/UseUniQuoter.sol

7: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseUniQuoter.sol)

```solidity
File: contracts/core/hooks/UseWETH.sol

9: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseWETH.sol)

```solidity
File: contracts/core/hooks/UseWstETH.sol

9: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/hooks/UseWstETH.sol)

```solidity
File: contracts/core/strategies/StrategyAAVEv3.sol

8: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

11: import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

28:     using AddressUpgradeable for address;

29:     using AddressUpgradeable for address payable;

38:         _disableInitializers();

42:     function initialize(

50:     ) public initializer {        

51:         _initializeStrategyBase(

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyAAVEv3WSTETH.sol

8: import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

9: import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

10: import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

12: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

29:     using SafeERC20Upgradeable for IERC20Upgradeable;

30:     using AddressUpgradeable for address payable;

34:         _disableInitializers();

38:     function initializeWstETH(

44:     ) public initializer {

45:         initialize(

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyAAVEv3WSTETH.sol)

```solidity
File: contracts/core/strategies/StrategyLeverage.sol

4: import {IERC3156FlashBorrowerUpgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC3156FlashBorrowerUpgradeable.sol";

6: import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

7: import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

20: import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

21: import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

69:     IERC3156FlashBorrowerUpgradeable,

75:     ReentrancyGuardUpgradeable,

93:     using SafeERC20Upgradeable for IERC20Upgradeable;

94:     using AddressUpgradeable for address;

95:     using AddressUpgradeable for address payable;

138:     function _initializeStrategyBase(

252:                 IERC3156FlashBorrowerUpgradeable(this),

347:                 IERC3156FlashBorrowerUpgradeable(this),

508:                 IERC3156FlashBorrowerUpgradeable(this),

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverage.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageSettings.sol

66:     ) internal initializer {

67:         _initializeGovernableOwnable(initialOwner, initialGovernor);

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageSettings.sol)

```solidity
File: contracts/proxy/BakerFiProxy.sol

4: import {TransparentUpgradeableProxy} from "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

11: contract BakerFiProxy is TransparentUpgradeableProxy {

22:     ) TransparentUpgradeableProxy(_logic, admin_, _data) {}

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/proxy/BakerFiProxy.sol)


## Medium Issues


| |Issue|Instances|
|-|:-|:-:|
| [M-1](#M-1) | Centralization Risk for trusted owners | 20 |
| [M-2](#M-2) | Direct `supportsInterface()` calls may cause caller to revert | 1 |
### <a name="M-1"></a>[M-1] Centralization Risk for trusted owners

#### Impact:
Contracts have owners with privileged rights to perform admin tasks and need to be trusted to not perform malicious updates or drain funds.

*Instances (20)*:
```solidity
File: contracts/core/GovernableOwnable.sol

18: contract GovernableOwnable is OwnableUpgradeable {

27:     function _initializeGovernableOwnable(address initialOwner, address initialGovernor) internal initializer {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/GovernableOwnable.sol)

```solidity
File: contracts/core/ServiceRegistry.sol

41: contract ServiceRegistry is Ownable, IServiceRegistry {

77:     function registerService(bytes32 serviceNameHash, address serviceAddress) external onlyOwner {

95:     function unregisterService(bytes32 serviceNameHash) external onlyOwner {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/ServiceRegistry.sol)

```solidity
File: contracts/core/Settings.sol

119:     function enableAccount(address account, bool enabled) external onlyOwner {

155:     function setWithdrawalFee(uint256 fee) external onlyOwner {

184:     function setPerformanceFee(uint256 fee) external onlyOwner {

212:     function setFeeReceiver(address receiver) external onlyOwner {

233:     function setMaxDepositInETH(uint256 value) external onlyOwner {

238:     function setRebalancePriceMaxAge(uint256 value) external onlyOwner {

247:     function setPriceMaxAge(uint256 value) external onlyOwner {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Settings.sol)

```solidity
File: contracts/core/Vault.sol

351:     function pause() external onlyOwner {

361:     function unpause() external onlyOwner {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/governance/BKR.sol

22: contract BKR is ERC20, Ownable, ERC20Permit, ERC20Votes {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/governance/BKR.sol)

```solidity
File: contracts/core/strategies/StrategyLeverage.sol

236:     function deploy() external payable onlyOwner nonReentrant returns (uint256 deployedAmount) {

329:     ) external onlyOwner nonReentrant returns (uint256 undeployedAmount) {

377:     function harvest() external override onlyOwner nonReentrant returns (int256 balanceChange) {

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverage.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageSettings.sol

7: contract StrategyLeverageSettings is GovernableOwnable {

67:         _initializeGovernableOwnable(initialOwner, initialGovernor);

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageSettings.sol)

### <a name="M-2"></a>[M-2] Direct `supportsInterface()` calls may cause caller to revert
Calling `supportsInterface()` on a contract that doesn't implement the ERC-165 standard will result in the call reverting. Even if the caller does support the function, the contract may be malicious and consume all of the transaction's available gas. Call it via a low-level [staticcall()](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/f959d7e4e6ee0b022b41e5b644c79369869d8411/contracts/utils/introspection/ERC165Checker.sol#L119), with a fixed amount of gas, and check the return code, or use OpenZeppelin's [`ERC165Checker.supportsInterface()`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/f959d7e4e6ee0b022b41e5b644c79369869d8411/contracts/utils/introspection/ERC165Checker.sol#L36-L39).

*Instances (1)*:
```solidity
File: contracts/core/governance/BakerFiGovernor.sol

100:         return super.supportsInterface(interfaceId);

```
[Link to code](https://github.com/code-423n4/2024-05-bakerfi/blob/main/contracts/core/governance/BakerFiGovernor.sol)

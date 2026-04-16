# Report

- [Report](#report)
  - [Gas Optimizations](#gas-optimizations)
    - [\[GAS-1\] `a = a + b` is more gas effective than `a += b` for state variables (excluding arrays and mappings)](#gas-1-a--a--b-is-more-gas-effective-than-a--b-for-state-variables-excluding-arrays-and-mappings)
    - [\[GAS-2\] Use assembly to check for `address(0)`](#gas-2-use-assembly-to-check-for-address0)
    - [\[GAS-3\] Using bools for storage incurs overhead](#gas-3-using-bools-for-storage-incurs-overhead)
    - [\[GAS-4\] Cache array length outside of loop](#gas-4-cache-array-length-outside-of-loop)
    - [\[GAS-5\] State variables should be cached in stack variables rather than re-reading them from storage](#gas-5-state-variables-should-be-cached-in-stack-variables-rather-than-re-reading-them-from-storage)
    - [\[GAS-6\] Use calldata instead of memory for function arguments that do not get mutated](#gas-6-use-calldata-instead-of-memory-for-function-arguments-that-do-not-get-mutated)
    - [\[GAS-7\] For Operations that will not overflow, you could use unchecked](#gas-7-for-operations-that-will-not-overflow-you-could-use-unchecked)
    - [\[GAS-8\] Avoid contract existence checks by using low level calls](#gas-8-avoid-contract-existence-checks-by-using-low-level-calls)
    - [\[GAS-9\] State variables only set in the constructor should be declared `immutable`](#gas-9-state-variables-only-set-in-the-constructor-should-be-declared-immutable)
    - [\[GAS-10\] Functions guaranteed to revert when called by normal users can be marked `payable`](#gas-10-functions-guaranteed-to-revert-when-called-by-normal-users-can-be-marked-payable)
    - [\[GAS-11\] `++i` costs less gas compared to `i++` or `i += 1` (same for `--i` vs `i--` or `i -= 1`)](#gas-11-i-costs-less-gas-compared-to-i-or-i--1-same-for---i-vs-i---or-i---1)
    - [\[GAS-12\] Using `private` rather than `public` for constants, saves gas](#gas-12-using-private-rather-than-public-for-constants-saves-gas)
    - [\[GAS-13\] Use of `this` instead of marking as `public` an `external` function](#gas-13-use-of-this-instead-of-marking-as-public-an-external-function)
    - [\[GAS-14\] Increments/decrements can be unchecked in for-loops](#gas-14-incrementsdecrements-can-be-unchecked-in-for-loops)
    - [\[GAS-15\] Use != 0 instead of \> 0 for unsigned integer comparison](#gas-15-use--0-instead-of--0-for-unsigned-integer-comparison)
    - [\[GAS-16\] `internal` functions not called by the contract should be removed](#gas-16-internal-functions-not-called-by-the-contract-should-be-removed)
    - [\[GAS-17\] WETH address definition can be use directly](#gas-17-weth-address-definition-can-be-use-directly)
  - [Non Critical Issues](#non-critical-issues)
    - [\[NC-1\] Replace `abi.encodeWithSignature` and `abi.encodeWithSelector` with `abi.encodeCall` which keeps the code typo/type safe](#nc-1-replace-abiencodewithsignature-and-abiencodewithselector-with-abiencodecall-which-keeps-the-code-typotype-safe)
    - [\[NC-2\] Array indices should be referenced via `enum`s rather than via numeric literals](#nc-2-array-indices-should-be-referenced-via-enums-rather-than-via-numeric-literals)
    - [\[NC-3\] Use `string.concat()` or `bytes.concat()` instead of `abi.encodePacked`](#nc-3-use-stringconcat-or-bytesconcat-instead-of-abiencodepacked)
    - [\[NC-4\] `constant`s should be defined rather than using magic numbers](#nc-4-constants-should-be-defined-rather-than-using-magic-numbers)
    - [\[NC-5\] Control structures do not follow the Solidity Style Guide](#nc-5-control-structures-do-not-follow-the-solidity-style-guide)
    - [\[NC-6\] Default Visibility for constants](#nc-6-default-visibility-for-constants)
    - [\[NC-7\] Consider disabling `renounceOwnership()`](#nc-7-consider-disabling-renounceownership)
    - [\[NC-8\] Events that mark critical parameter changes should contain both the old and the new value](#nc-8-events-that-mark-critical-parameter-changes-should-contain-both-the-old-and-the-new-value)
    - [\[NC-9\] Function ordering does not follow the Solidity style guide](#nc-9-function-ordering-does-not-follow-the-solidity-style-guide)
    - [\[NC-10\] Functions should not be longer than 50 lines](#nc-10-functions-should-not-be-longer-than-50-lines)
    - [\[NC-11\] Change int to int256](#nc-11-change-int-to-int256)
    - [\[NC-12\] Lack of checks in setters](#nc-12-lack-of-checks-in-setters)
    - [\[NC-13\] NatSpec is completely non-existent on functions that should have them](#nc-13-natspec-is-completely-non-existent-on-functions-that-should-have-them)
    - [\[NC-14\] Use a `modifier` instead of a `require/if` statement for a special `msg.sender` actor](#nc-14-use-a-modifier-instead-of-a-requireif-statement-for-a-special-msgsender-actor)
    - [\[NC-15\] Constant state variables defined more than once](#nc-15-constant-state-variables-defined-more-than-once)
    - [\[NC-16\] Consider using named mappings](#nc-16-consider-using-named-mappings)
    - [\[NC-17\] Adding a `return` statement when the function defines a named return variable, is redundant](#nc-17-adding-a-return-statement-when-the-function-defines-a-named-return-variable-is-redundant)
    - [\[NC-18\] Take advantage of Custom Error's return value property](#nc-18-take-advantage-of-custom-errors-return-value-property)
    - [\[NC-19\] Avoid the use of sensitive terms](#nc-19-avoid-the-use-of-sensitive-terms)
    - [\[NC-20\] Contract does not follow the Solidity style guide's suggested layout ordering](#nc-20-contract-does-not-follow-the-solidity-style-guides-suggested-layout-ordering)
    - [\[NC-21\] Use Underscores for Number Literals (add an underscore every 3 digits)](#nc-21-use-underscores-for-number-literals-add-an-underscore-every-3-digits)
    - [\[NC-22\] Internal and private variables and functions names should begin with an underscore](#nc-22-internal-and-private-variables-and-functions-names-should-begin-with-an-underscore)
    - [\[NC-23\] `public` functions not called by the contract should be declared `external` instead](#nc-23-public-functions-not-called-by-the-contract-should-be-declared-external-instead)
    - [\[NC-24\] Variables need not be initialized to zero](#nc-24-variables-need-not-be-initialized-to-zero)
  - [Low Issues](#low-issues)
    - [\[L-1\] `approve()`/`safeApprove()` may revert if the current approval is not zero](#l-1-approvesafeapprove-may-revert-if-the-current-approval-is-not-zero)
    - [\[L-2\] Use a 2-step ownership transfer pattern](#l-2-use-a-2-step-ownership-transfer-pattern)
    - [\[L-3\] Some tokens may revert when zero value transfers are made](#l-3-some-tokens-may-revert-when-zero-value-transfers-are-made)
    - [\[L-4\] USDC stablecoin centralization risk](#l-4-usdc-stablecoin-centralization-risk)
    - [\[L-5\] `decimals()` is not a part of the ERC-20 standard](#l-5-decimals-is-not-a-part-of-the-erc-20-standard)
    - [\[L-6\] Deprecated approve() function](#l-6-deprecated-approve-function)
    - [\[L-7\] Do not use deprecated library functions](#l-7-do-not-use-deprecated-library-functions)
    - [\[L-8\] `safeApprove()` is deprecated](#l-8-safeapprove-is-deprecated)
    - [\[L-9\] Deprecated \_setupRole() function](#l-9-deprecated-_setuprole-function)
    - [\[L-10\] Division by zero not prevented](#l-10-division-by-zero-not-prevented)
    - [\[L-11\] Duplicate import statements](#l-11-duplicate-import-statements)
    - [\[L-12\] External calls in an un-bounded `for-`loop may result in a DOS](#l-12-external-calls-in-an-un-bounded-for-loop-may-result-in-a-dos)
    - [\[L-13\] Initializers could be front-run](#l-13-initializers-could-be-front-run)
    - [\[L-14\] Prevent accidentally burning tokens](#l-14-prevent-accidentally-burning-tokens)
    - [\[L-15\] Possible rounding issue](#l-15-possible-rounding-issue)
    - [\[L-16\] `pragma experimental ABIEncoderV2` is deprecated](#l-16-pragma-experimental-abiencoderv2-is-deprecated)
    - [\[L-17\] Loss of precision](#l-17-loss-of-precision)
    - [\[L-18\] Solidity version 0.8.20+ may not work on other chains due to `PUSH0`](#l-18-solidity-version-0820-may-not-work-on-other-chains-due-to-push0)
    - [\[L-19\] Use `Ownable2Step.transferOwnership` instead of `Ownable.transferOwnership`](#l-19-use-ownable2steptransferownership-instead-of-ownabletransferownership)
    - [\[L-20\] Sweeping may break accounting if tokens with multiple addresses are used](#l-20-sweeping-may-break-accounting-if-tokens-with-multiple-addresses-are-used)
    - [\[L-21\] Consider using OpenZeppelin's SafeCast library to prevent unexpected overflows when downcasting](#l-21-consider-using-openzeppelins-safecast-library-to-prevent-unexpected-overflows-when-downcasting)
    - [\[L-22\] Unsafe ERC20 operation(s)](#l-22-unsafe-erc20-operations)
    - [\[L-23\] Upgradeable contract is missing a `__gap[50]` storage variable to allow for new storage variables in later versions](#l-23-upgradeable-contract-is-missing-a-__gap50-storage-variable-to-allow-for-new-storage-variables-in-later-versions)
    - [\[L-24\] Upgradeable contract not initialized](#l-24-upgradeable-contract-not-initialized)
  - [Medium Issues](#medium-issues)
    - [\[M-1\] Contracts are vulnerable to fee-on-transfer accounting-related issues](#m-1-contracts-are-vulnerable-to-fee-on-transfer-accounting-related-issues)
    - [\[M-2\] Centralization Risk for trusted owners](#m-2-centralization-risk-for-trusted-owners)
      - [Impact](#impact)
    - [\[M-3\] Lack of EIP-712 compliance: using `keccak256()` directly on an array or struct variable](#m-3-lack-of-eip-712-compliance-using-keccak256-directly-on-an-array-or-struct-variable)
    - [\[M-4\] Return values of `transfer()`/`transferFrom()` not checked](#m-4-return-values-of-transfertransferfrom-not-checked)
    - [\[M-5\] Unsafe use of `transfer()`/`transferFrom()`/`approve()`/ with `IERC20`](#m-5-unsafe-use-of-transfertransferfromapprove-with-ierc20)
  - [High Issues](#high-issues)
    - [\[H-1\] IERC20.approve() will revert for USDT](#h-1-ierc20approve-will-revert-for-usdt)

## Gas Optimizations

| |Issue|Instances|
|-|:-|:-:|
| [GAS-1](#GAS-1) | `a = a + b` is more gas effective than `a += b` for state variables (excluding arrays and mappings) | 9 |
| [GAS-2](#GAS-2) | Use assembly to check for `address(0)` | 23 |
| [GAS-3](#GAS-3) | Using bools for storage incurs overhead | 1 |
| [GAS-4](#GAS-4) | Cache array length outside of loop | 6 |
| [GAS-5](#GAS-5) | State variables should be cached in stack variables rather than re-reading them from storage | 2 |
| [GAS-6](#GAS-6) | Use calldata instead of memory for function arguments that do not get mutated | 5 |
| [GAS-7](#GAS-7) | For Operations that will not overflow, you could use unchecked | 231 |
| [GAS-8](#GAS-8) | Avoid contract existence checks by using low level calls | 7 |
| [GAS-9](#GAS-9) | State variables only set in the constructor should be declared `immutable` | 5 |
| [GAS-10](#GAS-10) | Functions guaranteed to revert when called by normal users can be marked `payable` | 11 |
| [GAS-11](#GAS-11) | `++i` costs less gas compared to `i++` or `i += 1` (same for `--i` vs `i--` or `i -= 1`) | 13 |
| [GAS-12](#GAS-12) | Using `private` rather than `public` for constants, saves gas | 23 |
| [GAS-13](#GAS-13) | Use of `this` instead of marking as `public` an `external` function | 8 |
| [GAS-14](#GAS-14) | Increments/decrements can be unchecked in for-loops | 7 |
| [GAS-15](#GAS-15) | Use != 0 instead of > 0 for unsigned integer comparison | 11 |
| [GAS-16](#GAS-16) | `internal` functions not called by the contract should be removed | 8 |
| [GAS-17](#GAS-17) | WETH address definition can be use directly | 2 |

### <a name="GAS-1"></a>[GAS-1] `a = a + b` is more gas effective than `a += b` for state variables (excluding arrays and mappings)

This saves **16 gas per instance.**

*Instances (9)*:

```solidity
File: contracts/core/MultiStrategy.sol

75:             _totalWeight += iweights[i];

91:             _totalWeight += iweights[i];

148:                 totalDeployed += IStrategy(_strategies[i]).deploy(fractAmount);

168:             totalAssets += currentAssets[i];

173:             totalUndeployed += IStrategy(_strategies[i]).undeploy(fractAmount);

183:             assets += IStrategy(_strategies[i]).totalAssets();

194:             balanceChange += IStrategy(_strategies[i]).harvest();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/hooks/UseLeverage.sol

30:             leverage += inc;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseLeverage.sol)

```solidity
File: contracts/core/strategies/StrategySupplyBase.sol

78:         _deployedAmount += deployedAmount;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyBase.sol)

### <a name="GAS-2"></a>[GAS-2] Use assembly to check for `address(0)`

*Saves 6 gas per instance*

*Instances (23)*:

```solidity
File: contracts/core/MultiStrategy.sol

108:         if (address(strategy) == address(0)) revert InvalidStrategy();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/MultiStrategyVault.sol

91:         if (iAsset == address(0)) revert InvalidAsset();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

```solidity
File: contracts/core/Vault.sol

92:         if (iAsset == address(0)) revert InvalidAsset();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/VaultBase.sol

94:         if (initialOwner == address(0)) revert InvalidOwner();

143:             if (feeReceiver != address(this) && feeReceiver != address(0) && performanceFee > 0) {

238:         if (receiver == address(0)) revert InvalidReceiver();

380:         if (receiver == address(0)) revert InvalidReceiver();

405:         if (getWithdrawalFee() != 0 && getFeeReceiver() != address(0)) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/hooks/UseOracle.sol

15:         if (address(_oracle) == address(0)) revert InvalidOracleContract();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseOracle.sol)

```solidity
File: contracts/core/hooks/UseTokenActions.sol

41:         if (address(token) == address(0)) revert InvalidToken();

56:         if (address(token) == address(0)) revert InvalidToken();

71:         if (address(token) == address(0)) revert InvalidToken();

73:         if (address(to) == address(0)) revert InvalidRecipient();

87:         if (address(token) == address(0)) revert InvalidToken();

89:         if (address(to) == address(0)) revert InvalidRecipient();

103:         if (address(token) == address(0)) revert InvalidToken();

105:         if (address(to) == address(0)) revert InvalidRecipient();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseTokenActions.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageMorphoBlue.sol

95:         if (address(_morpho) == address(0)) revert InvalidMorphoBlueContract();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageMorphoBlue.sol)

```solidity
File: contracts/core/strategies/StrategySupplyAAVEv3.sol

32:         if (aavev3Address == address(0)) revert ZeroAddress();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategySupplyBase.sol

40:         if (initialOwner == address(0) || asset_ == address(0)) revert ZeroAddress();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyBase.sol)

```solidity
File: contracts/core/strategies/StrategySupplyERC4626.sol

31:         if (vault_ == address(0)) revert ZeroAddress();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyERC4626.sol)

```solidity
File: contracts/core/strategies/StrategySupplyMorpho.sol

46:         if (morphoBlue == address(0)) revert ZeroAddress();

50:         if (address(_morpho) == address(0)) revert InvalidMorphoBlueContract();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyMorpho.sol)

### <a name="GAS-3"></a>[GAS-3] Using bools for storage incurs overhead

Use uint256(1) and uint256(2) for true/false to avoid a Gwarmaccess (100 gas), and to avoid Gsset (20000 gas) when changing from ‘false’ to ‘true’, after having been ‘true’ in the past. See [source](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/58f635312aa21f947cae5f8578638a85aa2519f5/contracts/security/ReentrancyGuard.sol#L23-L27).

*Instances (1)*:

```solidity
File: contracts/core/VaultRouter.sol

37:     mapping(IERC20 => bool) private _approvedSwapTokens;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultRouter.sol)

### <a name="GAS-4"></a>[GAS-4] Cache array length outside of loop

If not cached, the solidity compiler will always read the length of the array during each iteration. That is, if it is a storage array, this is an extra sload operation (100 additional extra gas for each iteration except for the first) and if it is a memory array, this is an extra mload operation (3 additional gas for each iteration except for the first).

*Instances (6)*:

```solidity
File: contracts/core/MultiStrategy.sol

74:         for (uint256 i = 0; i < istrategies.length; i++) {

90:         for (uint256 i = 0; i < iweights.length; ) {

145:         for (uint256 i = 0; i < _strategies.length; ) {

182:         for (uint256 i = 0; i < _strategies.length; ) {

193:         for (uint256 i = 0; i < _strategies.length; i++) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/MultiStrategyVault.sol

94:         for (uint256 i = 0; i < istrategies.length; i++) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

### <a name="GAS-5"></a>[GAS-5] State variables should be cached in stack variables rather than re-reading them from storage

The instances below point to the second+ access of a state variable within a function. Caching of a state variable replaces each Gwarmaccess (100 gas) with a much cheaper stack read. Other less obvious fixes/optimizations include having local memory caches of state variable structs, or having local caches of state variable contracts/addresses.

*Saves 100 gas per instance*

*Instances (2)*:

```solidity
File: contracts/core/strategies/StrategyLeverageMorphoBlue.sol

178:         (uint256 assetsRepaid, ) = _morpho.repay(_marketParams, amountPaid, shares, onBehalf, hex"");

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageMorphoBlue.sol)

```solidity
File: contracts/core/strategies/StrategySupplyMorpho.sol

83:             (assetsWithdrawn, ) = _morpho.withdraw(_marketParams, amount, 0, address(this), address(this));

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyMorpho.sol)

### <a name="GAS-6"></a>[GAS-6] Use calldata instead of memory for function arguments that do not get mutated

When a function with a `memory` array is called externally, the `abi.decode()` step has to use a for-loop to copy each index of the `calldata` to the `memory` index. Each iteration of this for-loop costs at least 60 gas (i.e. `60 * <mem_array>.length`). Using `calldata` directly bypasses this loop.

If the array is passed to an `internal` function which passes the array to another internal function where the array is modified and therefore `memory` is used in the `external` call, it's still more gas-efficient to use `calldata` when the `external` function uses modifiers, since the modifiers may prevent the internal functions from being called. Structs have the same overhead as an array of length one.

 *Saves 60 gas per instance*

*Instances (5)*:

```solidity
File: contracts/core/MultiStrategy.sol

85:     function setWeights(uint16[] memory iweights) public onlyRole(VAULT_MANAGER_ROLE) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/MultiStrategyVault.sol

83:         IStrategy[] memory istrategies,

84:         uint16[] memory iweights,

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

```solidity
File: contracts/core/hooks/swappers/UseUnifiedSwapper.sol

66:     function enableRoute(address tokenIn, address tokenOut, RouteInfo memory routeInfo) external onlyGovernor {

153:     function test__swap(SwapParams memory params) external returns (uint256 amountIn, uint256 amountOut) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/swappers/UseUnifiedSwapper.sol)

### <a name="GAS-7"></a>[GAS-7] For Operations that will not overflow, you could use unchecked

*Instances (231)*:

```solidity
File: contracts/core/MultiCommand.sol

4: import {Commands} from "./router/Commands.sol";

84:                 commandIndex++;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiCommand.sol)

```solidity
File: contracts/core/MultiStrategy.sol

4: import {IStrategy} from "../interfaces/core/IStrategy.sol";

5: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

6: import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

7: import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

8: import {VAULT_MANAGER_ROLE} from "./Constants.sol";

40:     error InvalidStrategy(); // Thrown when an invalid strategy is provided (e.g., address is zero).

41:     error InvalidStrategyIndex(uint256 index); // Thrown when an invalid strategy index is accessed.

42:     error InvalidWeightsLength(); // Thrown when the weights array length is not equal to the strategies array length.

43:     error InvalidDeltasLength(); // Thrown when the deltas array length is not equal to the indexes array length.

44:     error InvalidStrategies(); // Thrown when the strategies array length is zero.

45:     error InvalidWeights(); // Thrown when the weights array length is zero.

52:     IStrategy[] private _strategies; // Array of strategies

56:     uint16[] private _weights; // Array of weights

74:         for (uint256 i = 0; i < istrategies.length; i++) {

75:             _totalWeight += iweights[i];

91:             _totalWeight += iweights[i];

93:                 i++;

146:             uint256 fractAmount = (amount * _weights[i]) / _totalWeight;

148:                 totalDeployed += IStrategy(_strategies[i]).deploy(fractAmount);

151:                 i++;

166:         for (uint256 i = 0; i < strategiesLength; i++) {

168:             totalAssets += currentAssets[i];

171:         for (uint256 i = 0; i < strategiesLength; i++) {

172:             uint256 fractAmount = (amount * currentAssets[i]) / totalAssets;

173:             totalUndeployed += IStrategy(_strategies[i]).undeploy(fractAmount);

183:             assets += IStrategy(_strategies[i]).totalAssets();

185:                 i++;

193:         for (uint256 i = 0; i < _strategies.length; i++) {

194:             balanceChange += IStrategy(_strategies[i]).harvest();

215:         for (uint256 i = 0; i < totalStrategies; i++) {

226:                 IStrategy(_strategies[indexes[i]]).undeploy(uint256(-deltas[i]));

234:             for (uint256 i = 0; i < totalStrategies; i++) {

259:         _totalWeight -= _weights[index];

269:         uint256 lastIndex = _strategies.length - 1;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/MultiStrategyVault.sol

4: import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

5: import {IStrategy} from "../interfaces/core/IStrategy.sol";

6: import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

7: import {MultiStrategy} from "./MultiStrategy.sol";

8: import {VaultBase} from "./VaultBase.sol";

9: import {IVault} from "../interfaces/core/IVault.sol";

10: import {VAULT_MANAGER_ROLE} from "./Constants.sol";

47:     uint8 public constant HARVEST_VAULT = 0x01; //

48:     uint8 public constant REBALANCE_STRATEGIES = 0x02; //

49:     uint8 public constant CHANGE_WEIGHTS = 0x03; //

55:         _disableInitializers(); // Prevents the contract from being initialized more than once

87:         _initializeBase(initialOwner, tokenName, tokenSymbol, weth); // Initializes the base contract with the provided parameters

88:         _initMultiStrategy(istrategies, iweights); // Initializes the multi-strategy with the provided strategies and weights

94:         for (uint256 i = 0; i < istrategies.length; i++) {

96:             if (istrategies[i].asset() != iAsset) revert InvalidAsset(); // Reverts if the strategy asset does not match the vault asset

98:             IERC20Upgradeable(iAsset).safeApprove(address(istrategies[i]), type(uint256).max); // Approves the strategy to spend the maximum amount of the asset

111:         balanceChange = _harvestStrategies(); // Calls the strategy harvest function and returns the balance change

124:         deployedAmount = _allocateAssets(assets); // Allocates assets to the strategies and returns the deployed amount

137:         undeployedAmount = _deallocateAssets(assets); // Deallocates assets from the strategies and returns the undeployed amount

149:         assets = MultiStrategy._totalAssets(); // Calls the totalAssets function from MultiStrategy to get the total assets

191:                 i++;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

```solidity
File: contracts/core/Vault.sol

4: import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

5: import {IStrategy} from "../interfaces/core/IStrategy.sol";

6: import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

7: import {VaultBase} from "./VaultBase.sol";

8: import {IVault} from "../interfaces/core/IVault.sol";

9: import {MathLibrary} from "../libraries/MathLibrary.sol";

10: import {VAULT_MANAGER_ROLE} from "./Constants.sol";

57:         _disableInitializers(); // Prevents the contract from being initialized again

60:     uint8 public constant HARVEST_VAULT = 0x01; //

91:         _initializeBase(initialOwner, tokenName, tokenSymbol, weth); // Initializes the base contract

94:         _strategy = strategy; // Sets the strategy for the vault

108:         return _strategy.harvest(); // Calls the harvest function of the strategy

126:         deployedAmount = _strategy.deploy(assets); // Calls the deploy function of the strategy

144:         retAmount = _strategy.undeploy(assets); // Calls the undeploy function of the strategy

157:         amount = _strategy.totalAssets(); // Calls the totalAssets function of the strategy

185:                 i++;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/VaultBase.sol

4: import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

5: import {Rebase, RebaseLibrary} from "../libraries/RebaseLibrary.sol";

6: import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

7: import {IVault} from "../interfaces/core/IVault.sol";

8: import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

9: import {PERCENTAGE_PRECISION} from "./Constants.sol";

10: import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PermitUpgradeable.sol";

11: import {UseWETH} from "./hooks/UseWETH.sol";

12: import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

13: import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

14: import {MathLibrary} from "../libraries/MathLibrary.sol";

15: import {VaultSettings} from "./VaultSettings.sol";

16: import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

17: import {ADMIN_ROLE, VAULT_MANAGER_ROLE, PAUSER_ROLE} from "./Constants.sol";

144:                 uint256 feeInEth = uint256(balanceChange) * performanceFee;

145:                 uint256 sharesToMint = feeInEth.mulDivUp(totalSupply(), currentPosition * PERCENTAGE_PRECISION);

251:             uint256 depositInAssets = (balanceOf(msg.sender) * _ONE) / tokenPerAsset();

252:             uint256 newBalance = assets + depositInAssets;

390:         uint256 withdrawAmount = (shares * totalAssets()) / totalSupply();

395:         uint256 remainingShares = totalSupply() - shares;

410:                 payable(receiver).sendValue(amount - fee);

413:                 IERC20Upgradeable(_asset()).transfer(receiver, amount - fee);

425:         emit Withdraw(msg.sender, receiver, holder, amount - fee, shares);

426:         retAmount = amount - fee;

476:         return (totalSupply() * _ONE) / totalAssetsValue;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/VaultRouter.sol

4: import {IERC4626} from "@openzeppelin/contracts/interfaces/IERC4626.sol";

5: import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

6: import {UseWETH} from "./hooks/UseWETH.sol";

7: import {UseIERC4626} from "./hooks/UseIERC4626.sol";

8: import {UseUnifiedSwapper} from "./hooks/swappers/UseUnifiedSwapper.sol";

9: import {IWETH} from "../interfaces/tokens/IWETH.sol";

10: import {ISwapHandler} from "../interfaces/core/ISwapHandler.sol";

11: import {UseTokenActions} from "./hooks/UseTokenActions.sol";

12: import {Commands} from "./router/Commands.sol";

13: import {MultiCommand} from "./MultiCommand.sol";

14: import {UsePermitTransfers} from "./hooks/UsePermitTransfers.sol";

15: import {IERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol";

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultRouter.sol)

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

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseLeverage.sol)

```solidity
File: contracts/core/hooks/UseOracle.sol

5: import {IOracle} from "../../interfaces/core/IOracle.sol";

6: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseOracle.sol)

```solidity
File: contracts/core/hooks/UsePermitTransfers.sol

4: import {IERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol";

5: import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

6: import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UsePermitTransfers.sol)

```solidity
File: contracts/core/hooks/UseTokenActions.sol

4: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

5: import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

6: import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseTokenActions.sol)

```solidity
File: contracts/core/hooks/swappers/UseUnifiedSwapper.sol

4: import {IUniswapV2Router02} from "../../../interfaces/uniswap/v2/IUniswapV2Router02.sol";

5: import {ISwapRouter} from "../../../interfaces/aerodrome/ISwapRouter.sol";

6: import {ISwapHandler} from "../../../interfaces/core/ISwapHandler.sol";

7: import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

8: import {IV3SwapRouter} from "../../../interfaces/uniswap/v3/IV3SwapRouter.sol";

9: import {UniV2Library} from "../../../libraries/UniV2Library.sol";

10: import {UniV3Library} from "../../../libraries/UniV3Library.sol";

11: import {GovernableOwnable} from "../../GovernableOwnable.sol";

12: import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

13: import {AerodromeLibrary} from "../../../libraries/AerodromeLibrary.sol";

49:         SwapProvider provider; // 1byte one, UniswapV3, UniswapV2, Aerodrome

50:         address router; // Protocol Router

51:         uint24 uniV3Tier; // 3 bytes UniswapV3 fee tier

52:         uint24 tickSpacing; // 3 bytes tick spacing

71:         if (!IERC20(tokenIn).approve(routeInfo.router, type(uint256).max - 1)) revert FailedToApproveAllowance();

73:         if (!IERC20(tokenOut).approve(routeInfo.router, type(uint256).max - 1)) revert FailedToApproveAllowance();

111:     -+

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/swappers/UseUnifiedSwapper.sol)

```solidity
File: contracts/core/router/Commands.sol

11:     uint8 public constant V3_UNISWAP_SWAP = 0x01; // Command to execute a swap on Uniswap V3.

14:     uint8 public constant PULL_TOKEN = 0x02; // Command to pull a specified token.

15:     uint8 public constant PULL_TOKEN_FROM = 0x03; // Command to pull a token from a specified address.

16:     uint8 public constant PUSH_TOKEN = 0x04; // Command to push a specified token.

17:     uint8 public constant PUSH_TOKEN_FROM = 0x05; // Command to push a token from a specified address.

18:     uint8 public constant SWEEP_TOKENS = 0x06; // Command to sweep tokens from the contract.

19:     uint8 public constant WRAP_ETH = 0x07; // Command to wrap ETH into WETH.

20:     uint8 public constant UNWRAP_ETH = 0x08; // Command to unwrap WETH back into ETH.

21:     uint8 public constant PULL_TOKEN_WITH_PERMIT = 0x09; // Command to pull a token using a permit.

24:     uint8 public constant ERC4626_VAULT_DEPOSIT = 0x10; // Command to deposit assets into an ERC4626 vault.

25:     uint8 public constant ERC4626_VAULT_MINT = 0x11; // Command to mint shares in an ERC4626 vault.

26:     uint8 public constant ERC4626_VAULT_REDEEM = 0x12; // Command to redeem shares from an ERC4626 vault.

27:     uint8 public constant ERC4626_VAULT_WITHDRAW = 0x13; // Command to withdraw assets from an ERC4626 vault.

28:     uint8 public constant ERC4626_VAULT_CONVERT_TO_SHARES = 0x14; // Command to convert assets to shares in an ERC4626 vault.

29:     uint8 public constant ERC4626_VAULT_CONVERT_TO_ASSETS = 0x15; // Command to convert shares to assets in an ERC4626 vault.

31:     uint8 public constant AERODROME_SWAP = 0x20; // Command to execute a swap on Aerodrome.

32:     uint8 public constant V2_UNISWAP_SWAP = 0x21; // Command to execute a swap on Aerodrome.

35:     uint32 public constant THIRTY_TWO_BITS_MASK = 0xFFFFFFFF; // Mask to extract 32 bits.

74:         uint8 inputIndex = uint8(((inputMapping >> (INDEX_SLOT_SIZE * (position - 1))) & INDEX_SLOT_MASK));

78:         result = inputIndex > 0 ? callStack[inputIndex - 1] : value;

106:         uint8 outputIndex = uint8(((outputMapping >> (INDEX_SLOT_SIZE * (position - 1))) & INDEX_SLOT_MASK));

111:             callStack[outputIndex - 1] = value;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/router/Commands.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageAAVEv3.sol

4: import {StrategyLeverage} from "./StrategyLeverage.sol";

5: import {SYSTEM_DECIMALS} from "../../core/Constants.sol";

6: import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

7: import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

8: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

9: import {UseAAVEv3} from "../hooks/UseAAVEv3.sol";

10: import {DataTypes} from "../../interfaces/aave/v3/IPoolV3.sol";

11: import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

12: import {MathLibrary} from "../../libraries/MathLibrary.sol";

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageMorphoBlue.sol

4: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

5: import {StrategyLeverage} from "./StrategyLeverage.sol";

6: import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

7: import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

8: import {IMorpho, MarketParams, Id} from "@morpho-org/morpho-blue/src/interfaces/IMorpho.sol";

9: import {MarketParamsLib} from "@morpho-org/morpho-blue/src/libraries/MarketParamsLib.sol";

10: import {MorphoLib} from "@morpho-org/morpho-blue/src/libraries/periphery/MorphoLib.sol";

11: import {MorphoBalancesLib} from "@morpho-org/morpho-blue/src/libraries/periphery/MorphoBalancesLib.sol";

12: import {SYSTEM_DECIMALS} from "../../core/Constants.sol";

13: import {MathLibrary} from "../../libraries/MathLibrary.sol";

14: import {SharesMathLib} from "@morpho-org/morpho-blue/src/libraries/SharesMathLib.sol";

45:         address collateralToken; ///< The token used as collateral in the strategy.

46:         address debtToken; ///< The token used as debt in the strategy.

47:         address oracle; ///< The oracle for the collateral token.

48:         address flashLender; ///< The flash lender address.

49:         address morphoBlue; ///< The oracle for Morpho protocol.

50:         address morphoOracle; ///< The oracle for Morpho protocol.

51:         address irm; ///< The interest rate model (IRM) address.

52:         uint256 lltv; ///< The liquidation loan-to-value ratio (LLTV).

55:     error InvalidMorphoBlueContract(); ///< Thrown when the Morpho contract address is invalid.

56:     error FailedToRepayDebt(); ///< Thrown when the debt repayment fails.

57:     error InvalidMorphoBlueMarket(); ///< Thrown when the debt repayment fails.

59:     MarketParams private _marketParams; ///< Parameters related to the market for the strategy.

60:     IMorpho private _morpho; ///< Instance of the Morpho protocol interface.

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageMorphoBlue.sol)

```solidity
File: contracts/core/strategies/StrategySupplyAAVEv3.sol

4: import {IPoolV3} from "../../interfaces/aave/v3/IPoolV3.sol";

5: import {DataTypes} from "../../interfaces/aave/v3/DataTypes.sol";

6: import {SYSTEM_DECIMALS} from "../../core/Constants.sol";

7: import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

8: import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

9: import {MathLibrary} from "../../libraries/MathLibrary.sol";

10: import {StrategySupplyBase} from "./StrategySupplyBase.sol";

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategySupplyBase.sol

4: import {IStrategy} from "../../interfaces/core/IStrategy.sol";

5: import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

6: import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

7: import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

8: import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

9: import {MathLibrary} from "../../libraries/MathLibrary.sol";

78:         _deployedAmount += deployedAmount;

94:         balanceChange = int256(newBalance) - int256(_deployedAmount);

99:             emit StrategyLoss(uint256(-balanceChange));

124:         balance -= amount;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyBase.sol)

```solidity
File: contracts/core/strategies/StrategySupplyERC4626.sol

4: import {StrategySupplyBase} from "./StrategySupplyBase.sol";

5: import {IERC4626} from "@openzeppelin/contracts/interfaces/IERC4626.sol";

6: import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

7: import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyERC4626.sol)

```solidity
File: contracts/core/strategies/StrategySupplyMorpho.sol

4: import {StrategySupplyBase} from "./StrategySupplyBase.sol";

5: import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

6: import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

7: import {MathLibrary} from "../../libraries/MathLibrary.sol";

8: import {IMorpho, MarketParams, Id} from "@morpho-org/morpho-blue/src/interfaces/IMorpho.sol";

9: import {MarketParamsLib} from "@morpho-org/morpho-blue/src/libraries/MarketParamsLib.sol";

10: import {MorphoLib} from "@morpho-org/morpho-blue/src/libraries/periphery/MorphoLib.sol";

11: import {MorphoBalancesLib} from "@morpho-org/morpho-blue/src/libraries/periphery/MorphoBalancesLib.sol";

12: import {SharesMathLib} from "@morpho-org/morpho-blue/src/libraries/SharesMathLib.sol";

31:     MarketParams private _marketParams; // Parameters related to the market for the strategy.

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyMorpho.sol)

### <a name="GAS-8"></a>[GAS-8] Avoid contract existence checks by using low level calls

Prior to 0.8.10 the compiler inserted extra code, including `EXTCODESIZE` (**100 gas**), to check for contract existence for external function calls. In more recent solidity versions, the compiler will not insert these checks if the external call has a return value. Similar behavior can be achieved in earlier versions by using low-level calls, since low level calls never check for contract existence

*Instances (7)*:

```solidity
File: contracts/core/MultiStrategy.sol

221:                 uint256 balanceOf = IERC20(_strategies[indexes[i]].asset()).balanceOf(address(this));

230:         uint256 dustBalance = IERC20(_strategies[0].asset()).balanceOf(address(this));

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/hooks/UseTokenActions.sol

107:         sweptAmount = IERC20(token).balanceOf(address(this));

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseTokenActions.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageAAVEv3.sol

72:         debtBalance = ERC20(debtReserve.variableDebtTokenAddress).balanceOf(address(this));

75:         collateralBalance = ERC20(collateralReserve.aTokenAddress).balanceOf(address(this));

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategySupplyAAVEv3.sol

60:         uint256 reserveBalance = ERC20(reserve.aTokenAddress).balanceOf(address(this));

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategySupplyERC4626.sol

58:         return _vault.balanceOf(address(this));

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyERC4626.sol)

### <a name="GAS-9"></a>[GAS-9] State variables only set in the constructor should be declared `immutable`

Variables only set in the constructor and never edited afterwards should be marked as immutable, as it would avoid the expensive storage-writing operation in the constructor (around **20 000 gas** per variable) and replace the expensive storage-reading operations (around **2100 gas** per reading) to a less expensive value reading (**3 gas**)

*Instances (5)*:

```solidity
File: contracts/core/strategies/StrategySupplyAAVEv3.sol

34:         _aavev3 = IPoolV3(aavev3Address);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategySupplyBase.sol

42:         _asset = asset_;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyBase.sol)

```solidity
File: contracts/core/strategies/StrategySupplyERC4626.sol

34:         _vault = IERC4626(vault_);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyERC4626.sol)

```solidity
File: contracts/core/strategies/StrategySupplyMorpho.sol

48:         _morpho = IMorpho(morphoBlue);

52:         _marketParams = _morpho.idToMarketParams(morphoMarketId);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyMorpho.sol)

### <a name="GAS-10"></a>[GAS-10] Functions guaranteed to revert when called by normal users can be marked `payable`

If a function modifier such as `onlyOwner` is used, the function will revert if a normal user tries to pay the function. Marking the function as `payable` will lower the gas cost for legitimate callers because the compiler will not include checks for whether a payment was provided.

*Instances (11)*:

```solidity
File: contracts/core/MultiStrategy.sol

67:     function _initMultiStrategy(IStrategy[] memory istrategies, uint16[] memory iweights) internal onlyInitializing {

85:     function setWeights(uint16[] memory iweights) public onlyRole(VAULT_MANAGER_ROLE) {

107:     function addStrategy(IStrategy strategy) external onlyRole(VAULT_MANAGER_ROLE) {

251:     function removeStrategy(uint256 index) external onlyRole(VAULT_MANAGER_ROLE) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/VaultBase.sol

484:     function pause() external onlyRole(PAUSER_ROLE) {

492:     function unpause() external onlyRole(PAUSER_ROLE) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/hooks/UseOracle.sol

13:     function _initUseOracle(address oracleAddress) internal onlyInitializing {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseOracle.sol)

```solidity
File: contracts/core/hooks/swappers/UseUnifiedSwapper.sol

66:     function enableRoute(address tokenIn, address tokenOut, RouteInfo memory routeInfo) external onlyGovernor {

83:     function disableRoute(address tokenIn, address tokenOut) external onlyGovernor {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/swappers/UseUnifiedSwapper.sol)

```solidity
File: contracts/core/strategies/StrategySupplyBase.sol

69:     function deploy(uint256 amount) external nonReentrant onlyOwner returns (uint256 deployedAmount) {

110:     function undeploy(uint256 amount) external nonReentrant onlyOwner returns (uint256 undeployedAmount) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyBase.sol)

### <a name="GAS-11"></a>[GAS-11] `++i` costs less gas compared to `i++` or `i += 1` (same for `--i` vs `i--` or `i -= 1`)

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

*Instances (13)*:

```solidity
File: contracts/core/MultiCommand.sol

84:                 commandIndex++;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiCommand.sol)

```solidity
File: contracts/core/MultiStrategy.sol

74:         for (uint256 i = 0; i < istrategies.length; i++) {

93:                 i++;

151:                 i++;

166:         for (uint256 i = 0; i < strategiesLength; i++) {

171:         for (uint256 i = 0; i < strategiesLength; i++) {

185:                 i++;

193:         for (uint256 i = 0; i < _strategies.length; i++) {

215:         for (uint256 i = 0; i < totalStrategies; i++) {

234:             for (uint256 i = 0; i < totalStrategies; i++) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/MultiStrategyVault.sol

94:         for (uint256 i = 0; i < istrategies.length; i++) {

191:                 i++;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

```solidity
File: contracts/core/Vault.sol

185:                 i++;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/Vault.sol)

### <a name="GAS-12"></a>[GAS-12] Using `private` rather than `public` for constants, saves gas

If needed, the values can be read from the verified contract source code, or if there are multiple values there can be a single getter function that [returns a tuple](https://github.com/code-423n4/2022-08-frax/blob/90f55a9ce4e25bceed3a74290b854341d8de6afa/src/contracts/FraxlendPair.sol#L156-L178) of the values of all currently-public constants. Saves **3406-3606 gas** in deployment gas due to the compiler not having to create non-payable getter functions for deployment calldata, not having to store the bytes of the value outside of where it's used, and not adding another entry to the method ID table

*Instances (23)*:

```solidity
File: contracts/core/MultiStrategy.sol

47:     uint16 public constant MAX_TOTAL_WEIGHT = 10000;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/MultiStrategyVault.sol

47:     uint8 public constant HARVEST_VAULT = 0x01; //

48:     uint8 public constant REBALANCE_STRATEGIES = 0x02; //

49:     uint8 public constant CHANGE_WEIGHTS = 0x03; //

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

```solidity
File: contracts/core/Vault.sol

60:     uint8 public constant HARVEST_VAULT = 0x01; //

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/router/Commands.sol

11:     uint8 public constant V3_UNISWAP_SWAP = 0x01; // Command to execute a swap on Uniswap V3.

14:     uint8 public constant PULL_TOKEN = 0x02; // Command to pull a specified token.

15:     uint8 public constant PULL_TOKEN_FROM = 0x03; // Command to pull a token from a specified address.

16:     uint8 public constant PUSH_TOKEN = 0x04; // Command to push a specified token.

17:     uint8 public constant PUSH_TOKEN_FROM = 0x05; // Command to push a token from a specified address.

18:     uint8 public constant SWEEP_TOKENS = 0x06; // Command to sweep tokens from the contract.

19:     uint8 public constant WRAP_ETH = 0x07; // Command to wrap ETH into WETH.

20:     uint8 public constant UNWRAP_ETH = 0x08; // Command to unwrap WETH back into ETH.

21:     uint8 public constant PULL_TOKEN_WITH_PERMIT = 0x09; // Command to pull a token using a permit.

24:     uint8 public constant ERC4626_VAULT_DEPOSIT = 0x10; // Command to deposit assets into an ERC4626 vault.

25:     uint8 public constant ERC4626_VAULT_MINT = 0x11; // Command to mint shares in an ERC4626 vault.

26:     uint8 public constant ERC4626_VAULT_REDEEM = 0x12; // Command to redeem shares from an ERC4626 vault.

27:     uint8 public constant ERC4626_VAULT_WITHDRAW = 0x13; // Command to withdraw assets from an ERC4626 vault.

28:     uint8 public constant ERC4626_VAULT_CONVERT_TO_SHARES = 0x14; // Command to convert assets to shares in an ERC4626 vault.

29:     uint8 public constant ERC4626_VAULT_CONVERT_TO_ASSETS = 0x15; // Command to convert shares to assets in an ERC4626 vault.

31:     uint8 public constant AERODROME_SWAP = 0x20; // Command to execute a swap on Aerodrome.

32:     uint8 public constant V2_UNISWAP_SWAP = 0x21; // Command to execute a swap on Aerodrome.

35:     uint32 public constant THIRTY_TWO_BITS_MASK = 0xFFFFFFFF; // Mask to extract 32 bits.

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/router/Commands.sol)

### <a name="GAS-13"></a>[GAS-13] Use of `this` instead of marking as `public` an `external` function

Using `this.` is like making an expensive external call. Consider marking the called function as public

*Saves around 2000 gas per instance*

*Instances (8)*:

```solidity
File: contracts/core/VaultBase.sol

165:         assets = this.convertToAssets(shares);

179:         assets = this.convertToAssets(shares);

198:         shares = this.convertToShares(assets);

279:         maxAssets = this.convertToAssets(balanceOf(shareHolder));

288:         shares = this.convertToShares(assets);

300:         shares = this.convertToShares(assets);

328:         shares = this.convertToShares(assets);

347:         assets = this.convertToAssets(shares);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

### <a name="GAS-14"></a>[GAS-14] Increments/decrements can be unchecked in for-loops

In Solidity 0.8+, there's a default overflow check on unsigned integers. It's possible to uncheck this in for-loops and save some gas at each iteration, but at the cost of some code readability, as this uncheck cannot be made inline.

[ethereum/solidity#10695](https://github.com/ethereum/solidity/issues/10695)

The change would be:

```diff
- for (uint256 i; i < numIterations; i++) {
+ for (uint256 i; i < numIterations;) {
 // ...  
+   unchecked { ++i; }
}  
```

These save around **25 gas saved** per instance.

The same can be applied with decrements (which should use `break` when `i == 0`).

The risk of overflow is non-existent for `uint256`.

*Instances (7)*:

```solidity
File: contracts/core/MultiStrategy.sol

74:         for (uint256 i = 0; i < istrategies.length; i++) {

166:         for (uint256 i = 0; i < strategiesLength; i++) {

171:         for (uint256 i = 0; i < strategiesLength; i++) {

193:         for (uint256 i = 0; i < _strategies.length; i++) {

215:         for (uint256 i = 0; i < totalStrategies; i++) {

234:             for (uint256 i = 0; i < totalStrategies; i++) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/MultiStrategyVault.sol

94:         for (uint256 i = 0; i < istrategies.length; i++) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

### <a name="GAS-15"></a>[GAS-15] Use != 0 instead of > 0 for unsigned integer comparison

*Instances (11)*:

```solidity
File: contracts/core/MultiStrategy.sol

147:             if (fractAmount > 0) {

220:             if (deltas[i] > 0) {

231:         if (dustBalance > 0) {

263:         if (strategyAssets > 0) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/VaultBase.sol

140:         if (balanceChange > 0) {

143:             if (feeReceiver != address(this) && feeReceiver != address(0) && performanceFee > 0) {

244:         if (!((total.elastic == 0 && total.base == 0) || (total.base > 0 && total.elastic > 0))) {

250:         if (maxDepositLocal > 0) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/router/Commands.sol

78:         result = inputIndex > 0 ? callStack[inputIndex - 1] : value;

110:         if (outputIndex > 0) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/router/Commands.sol)

```solidity
File: contracts/core/strategies/StrategySupplyBase.sol

96:         if (balanceChange > 0) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyBase.sol)

### <a name="GAS-16"></a>[GAS-16] `internal` functions not called by the contract should be removed

If the functions are required by an interface, the contract should inherit from that interface and use the `override` keyword

*Instances (8)*:

```solidity
File: contracts/core/hooks/UseLeverage.sol

19:     function _calculateLeverageRatio(

47:     function _calcDeltaPosition(

68:     function _calculateDebtToPay(

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseLeverage.sol)

```solidity
File: contracts/core/hooks/UseOracle.sol

13:     function _initUseOracle(address oracleAddress) internal onlyInitializing {

18:     function oracle() internal view returns (IOracle) {

22:     function getLastPrice() internal view returns (IOracle.Price memory) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseOracle.sol)

```solidity
File: contracts/core/router/Commands.sol

65:     function pullInputParam(

97:     function pushOutputParam(

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/router/Commands.sol)

### <a name="GAS-17"></a>[GAS-17] WETH address definition can be use directly

WETH is a wrap Ether contract with a specific address in the Ethereum network, giving the option to define it may cause false recognition, it is healthier to define it directly.

    Advantages of defining a specific contract directly:
    
    It saves gas,
    Prevents incorrect argument definition,
    Prevents execution on a different chain and re-signature issues,
    WETH Address : 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2

*Instances (2)*:

```solidity
File: contracts/core/router/Commands.sol

19:     uint8 public constant WRAP_ETH = 0x07; // Command to wrap ETH into WETH.

20:     uint8 public constant UNWRAP_ETH = 0x08; // Command to unwrap WETH back into ETH.

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/router/Commands.sol)

## Non Critical Issues

| |Issue|Instances|
|-|:-|:-:|
| [NC-1](#NC-1) | Replace `abi.encodeWithSignature` and `abi.encodeWithSelector` with `abi.encodeCall` which keeps the code typo/type safe | 1 |
| [NC-2](#NC-2) | Array indices should be referenced via `enum`s rather than via numeric literals | 1 |
| [NC-3](#NC-3) | Use `string.concat()` or `bytes.concat()` instead of `abi.encodePacked` | 8 |
| [NC-4](#NC-4) | `constant`s should be defined rather than using magic numbers | 7 |
| [NC-5](#NC-5) | Control structures do not follow the Solidity Style Guide | 81 |
| [NC-6](#NC-6) | Default Visibility for constants | 3 |
| [NC-7](#NC-7) | Consider disabling `renounceOwnership()` | 2 |
| [NC-8](#NC-8) | Events that mark critical parameter changes should contain both the old and the new value | 1 |
| [NC-9](#NC-9) | Function ordering does not follow the Solidity style guide | 9 |
| [NC-10](#NC-10) | Functions should not be longer than 50 lines | 93 |
| [NC-11](#NC-11) | Change int to int256 | 2 |
| [NC-12](#NC-12) | Lack of checks in setters | 1 |
| [NC-13](#NC-13) | NatSpec is completely non-existent on functions that should have them | 11 |
| [NC-14](#NC-14) | Use a `modifier` instead of a `require/if` statement for a special `msg.sender` actor | 5 |
| [NC-15](#NC-15) | Constant state variables defined more than once | 2 |
| [NC-16](#NC-16) | Consider using named mappings | 2 |
| [NC-17](#NC-17) | Adding a `return` statement when the function defines a named return variable, is redundant | 15 |
| [NC-18](#NC-18) | Take advantage of Custom Error's return value property | 77 |
| [NC-19](#NC-19) | Avoid the use of sensitive terms | 8 |
| [NC-20](#NC-20) | Contract does not follow the Solidity style guide's suggested layout ordering | 12 |
| [NC-21](#NC-21) | Use Underscores for Number Literals (add an underscore every 3 digits) | 3 |
| [NC-22](#NC-22) | Internal and private variables and functions names should begin with an underscore | 13 |
| [NC-23](#NC-23) | `public` functions not called by the contract should be declared `external` instead | 14 |
| [NC-24](#NC-24) | Variables need not be initialized to zero | 20 |

### <a name="NC-1"></a>[NC-1] Replace `abi.encodeWithSignature` and `abi.encodeWithSelector` with `abi.encodeCall` which keeps the code typo/type safe

When using `abi.encodeWithSignature`, it is possible to include a typo for the correct function signature.
When using `abi.encodeWithSignature` or `abi.encodeWithSelector`, it is also possible to provide parameters that are not of the correct type for the function.

To avoid these pitfalls, it would be best to use [`abi.encodeCall`](https://solidity-by-example.org/abi-encode/) instead.

*Instances (1)*:

```solidity
File: contracts/core/VaultBase.sol

212:         wETHA().functionCallWithValue(abi.encodeWithSignature("deposit()"), msg.value);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

### <a name="NC-2"></a>[NC-2] Array indices should be referenced via `enum`s rather than via numeric literals

*Instances (1)*:

```solidity
File: contracts/core/MultiStrategy.sol

230:         uint256 dustBalance = IERC20(_strategies[0].asset()).balanceOf(address(this));

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

### <a name="NC-3"></a>[NC-3] Use `string.concat()` or `bytes.concat()` instead of `abi.encodePacked`

Solidity version 0.8.4 introduces `bytes.concat()` (vs `abi.encodePacked(<bytes>,<bytes>)`)

Solidity version 0.8.12 introduces `string.concat()` (vs `abi.encodePacked(<str>,<str>), which catches concatenation errors (in the event of a`bytes`data mixed in the concatenation)`)

*Instances (8)*:

```solidity
File: contracts/core/VaultRouter.sol

155:         return abi.encodePacked(amountIn, amountOut);

273:         return abi.encodePacked(sweptAmount);

372:         return abi.encodePacked(shares);

399:         return abi.encodePacked(assets);

428:         return abi.encodePacked(assets);

457:         return abi.encodePacked(shares);

482:         return abi.encodePacked(amount);

507:         return abi.encodePacked(amount);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultRouter.sol)

### <a name="NC-4"></a>[NC-4] `constant`s should be defined rather than using magic numbers

Even [assembly](https://github.com/code-423n4/2022-05-opensea-seaport/blob/9d7ce4d08bf3c3010304a0476a785c70c0e90ae7/contracts/lib/TokenTransferrer.sol#L35-L39) can benefit from using readable constants instead of hex/numeric literals

*Instances (7)*:

```solidity
File: contracts/core/MultiStrategy.sol

78:         if (_totalWeight > 10000) revert InvalidWeights();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/VaultRouter.sol

88:         uint32 inputMapping = uint16((action >> 32) & Commands.THIRTY_TWO_BITS_MASK);

91:         uint32 outputMapping = uint16(((action >> 64) & Commands.THIRTY_TWO_BITS_MASK));

148:         params.amountOut = Commands.pullInputParam(callStack, params.amountOut, inputMapping, 2);

153:         Commands.pushOutputParam(callStack, amountOut, outputMapping, 2);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultRouter.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageAAVEv3.sol

98:         aaveV3().borrow(_debtToken, debt, 2, 0, address(this));

107:         if (aaveV3().repay(_debtToken, amount, 2, address(this)) != amount) revert FailedToRepayDebt();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageAAVEv3.sol)

### <a name="NC-5"></a>[NC-5] Control structures do not follow the Solidity Style Guide

See the [control structures](https://docs.soliditylang.org/en/latest/style-guide.html#control-structures) section of the Solidity Style Guide

*Instances (81)*:

```solidity
File: contracts/core/MultiStrategy.sol

38:     event MaxDifferenceUpdated(uint256 indexed maxDifference);

68:         if (istrategies.length == 0) revert InvalidStrategies();

69:         if (iweights.length == 0) revert InvalidWeights();

70:         if (istrategies.length != iweights.length) revert InvalidWeightsLength();

77:         if (_totalWeight == 0) revert InvalidWeights();

78:         if (_totalWeight > 10000) revert InvalidWeights();

86:         if (iweights.length != _strategies.length) revert InvalidWeightsLength();

97:         if (_totalWeight == 0 || _totalWeight > MAX_TOTAL_WEIGHT) revert InvalidWeights();

108:         if (address(strategy) == address(0)) revert InvalidStrategy();

211:         if (deltas.length != indexes.length) revert InvalidDeltasLength();

212:         if (deltas.length != _strategies.length) revert InvalidDeltasLength();

217:             if (deltas[i] == 0) continue;

253:         if (index >= _strategies.length) revert InvalidStrategyIndex(index);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/MultiStrategyVault.sol

91:         if (iAsset == address(0)) revert InvalidAsset();

96:             if (istrategies[i].asset() != iAsset) revert InvalidAsset(); // Reverts if the strategy asset does not match the vault asset

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

```solidity
File: contracts/core/Vault.sol

92:         if (iAsset == address(0)) revert InvalidAsset();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/VaultBase.sol

63:         if (!isAccountEnabled(msg.sender)) revert NoPermissions();

77:         if (msg.sender != wETHA()) revert ETHTransferNotAllowed(msg.sender);

94:         if (initialOwner == address(0)) revert InvalidOwner();

178:         if (shares == 0) revert InvalidAmount();

209:         if (msg.value == 0) revert InvalidAmount();

210:         if (_asset() != wETHA()) revert InvalidAsset();

226:         if (assets == 0) revert InvalidAmount();

238:         if (receiver == address(0)) revert InvalidReceiver();

253:             if (newBalance > maxDepositLocal) revert MaxDepositReached();

299:         if (_asset() != wETHA()) revert InvalidAsset();

312:         if (_asset() != wETHA()) revert InvalidAsset();

379:         if (shares == 0) revert InvalidAmount();

380:         if (receiver == address(0)) revert InvalidReceiver();

381:         if (balanceOf(holder) < shares) revert NotEnoughBalanceToWithdraw();

385:             if (allowance(holder, msg.sender) < shares) revert NoAllowance();

391:         if (withdrawAmount == 0) revert NoAssetsToWithdraw();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/VaultRouter.sol

8: import {UseUnifiedSwapper} from "./hooks/swappers/UseUnifiedSwapper.sol";

93:         if (

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultRouter.sol)

```solidity
File: contracts/core/hooks/UseLeverage.sol

24:         if (nrLoops > MAX_LOOPS) revert InvalidNumberOfLoops();

25:         if (loanToValue == 0 || loanToValue > PERCENTAGE_PRECISION) revert InvalidLoanToValue();

74:         if (colValue >= debt) revert InvalidTargetValue();

77:         if (divisor == 0) revert InvalidDivisor();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseLeverage.sol)

```solidity
File: contracts/core/hooks/UseOracle.sol

15:         if (address(_oracle) == address(0)) revert InvalidOracleContract();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseOracle.sol)

```solidity
File: contracts/core/hooks/UseTokenActions.sol

41:         if (address(token) == address(0)) revert InvalidToken();

43:         if (token.allowance(msg.sender, address(this)) < amount) revert NotEnoughAllowance();

56:         if (address(token) == address(0)) revert InvalidToken();

58:         if (token.allowance(from, address(this)) < amount) revert NotEnoughAllowance();

71:         if (address(token) == address(0)) revert InvalidToken();

73:         if (address(to) == address(0)) revert InvalidRecipient();

87:         if (address(token) == address(0)) revert InvalidToken();

89:         if (address(to) == address(0)) revert InvalidRecipient();

91:         if (token.allowance(from, address(this)) < amount) revert NotEnoughAllowance();

103:         if (address(token) == address(0)) revert InvalidToken();

105:         if (address(to) == address(0)) revert InvalidRecipient();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseTokenActions.sol)

```solidity
File: contracts/core/hooks/swappers/UseUnifiedSwapper.sol

69:         if (_routes[key].provider != SwapProvider.NONE) revert RouteAlreadyAuthorized();

71:         if (!IERC20(tokenIn).approve(routeInfo.router, type(uint256).max - 1)) revert FailedToApproveAllowance();

73:         if (!IERC20(tokenOut).approve(routeInfo.router, type(uint256).max - 1)) revert FailedToApproveAllowance();

87:         if (_routes[key].provider == SwapProvider.NONE) revert RouteNotAuthorized();

89:         if (!IERC20(tokenIn).approve(_routes[key].router, 0)) revert FailedToApproveAllowance();

90:         if (!IERC20(tokenOut).approve(_routes[key].router, 0)) revert FailedToApproveAllowance();

120:         if (routeInfo.provider == SwapProvider.NONE) revert RouteNotAuthorized();

154:         return UseUnifiedSwapper.swap(params);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/swappers/UseUnifiedSwapper.sol)

```solidity
File: contracts/core/router/Commands.sol

14:     uint8 public constant PULL_TOKEN = 0x02; // Command to pull a specified token.

15:     uint8 public constant PULL_TOKEN_FROM = 0x03; // Command to pull a token from a specified address.

16:     uint8 public constant PUSH_TOKEN = 0x04; // Command to push a specified token.

17:     uint8 public constant PUSH_TOKEN_FROM = 0x05; // Command to push a token from a specified address.

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/router/Commands.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageAAVEv3.sol

58:         if (aaveV3().getUserEMode(address(this)) != eModeCategory) revert InvalidAAVEEMode();

86:         if (!ERC20(_collateralToken).approve(aaveV3A(), amountIn)) revert FailedToApproveAllowanceForAAVE();

106:         if (!ERC20(_debtToken).approve(aaveV3A(), amount)) revert FailedToApproveAllowanceForAAVE();

107:         if (aaveV3().repay(_debtToken, amount, 2, address(this)) != amount) revert FailedToRepayDebt();

116:         if (aaveV3().withdraw(_collateralToken, amount, to) != amount) revert InvalidWithdrawAmount();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageMorphoBlue.sol

95:         if (address(_morpho) == address(0)) revert InvalidMorphoBlueContract();

106:         if (lParams.lltv == 0) revert InvalidMorphoBlueMarket();

135:         if (!ERC20(_collateralToken).approve(address(_morpho), amountIn)) revert FailedToApproveAllowance();

160:         if (!ERC20(_debtToken).approve(address(_morpho), amount)) revert FailedToApproveAllowance();

179:         if (assetsRepaid < amount) revert FailedToRepayDebt();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageMorphoBlue.sol)

```solidity
File: contracts/core/strategies/StrategySupplyAAVEv3.sol

32:         if (aavev3Address == address(0)) revert ZeroAddress();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategySupplyBase.sol

40:         if (initialOwner == address(0) || asset_ == address(0)) revert ZeroAddress();

70:         if (amount == 0) revert ZeroAmount();

111:         if (amount == 0) revert ZeroAmount();

115:         if (amount > balance) revert InsufficientBalance();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyBase.sol)

```solidity
File: contracts/core/strategies/StrategySupplyERC4626.sol

31:         if (vault_ == address(0)) revert ZeroAddress();

32:         if (IERC4626(vault_).asset() != asset_) revert InvalidVault();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyERC4626.sol)

```solidity
File: contracts/core/strategies/StrategySupplyMorpho.sol

46:         if (morphoBlue == address(0)) revert ZeroAddress();

50:         if (address(_morpho) == address(0)) revert InvalidMorphoBlueContract();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyMorpho.sol)

### <a name="NC-6"></a>[NC-6] Default Visibility for constants

Some constants are using the default visibility. For readability, consider explicitly declaring them as `internal`.

*Instances (3)*:

```solidity
File: contracts/core/router/Commands.sol

42:     uint8 constant INDEX_SLOT_SIZE = 8;

44:     uint256 constant CALL_STACK_SIZE = 8;

46:     uint8 constant INDEX_SLOT_MASK = 0xFF;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/router/Commands.sol)

### <a name="NC-7"></a>[NC-7] Consider disabling `renounceOwnership()`

If the plan for your project does not include eventually giving up all ownership control, consider overwriting OpenZeppelin's `Ownable`'s `renounceOwnership()` function in order to disable it.

*Instances (2)*:

```solidity
File: contracts/core/hooks/swappers/UseUnifiedSwapper.sol

29: abstract contract UseUnifiedSwapper is ISwapHandler, GovernableOwnable {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/swappers/UseUnifiedSwapper.sol)

```solidity
File: contracts/core/strategies/StrategySupplyBase.sol

20: abstract contract StrategySupplyBase is IStrategy, ReentrancyGuard, Ownable {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyBase.sol)

### <a name="NC-8"></a>[NC-8] Events that mark critical parameter changes should contain both the old and the new value

This should especially be done if the new value is not required to be different from the old value

*Instances (1)*:

```solidity
File: contracts/core/MultiStrategy.sol

85:     function setWeights(uint16[] memory iweights) public onlyRole(VAULT_MANAGER_ROLE) {
            if (iweights.length != _strategies.length) revert InvalidWeightsLength();
            _weights = iweights;
            _totalWeight = 0;
    
            for (uint256 i = 0; i < iweights.length; ) {
                _totalWeight += iweights[i];
                unchecked {
                    i++;
                }
            }
    
            if (_totalWeight == 0 || _totalWeight > MAX_TOTAL_WEIGHT) revert InvalidWeights();
    
            emit WeightsUpdated(iweights);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

### <a name="NC-9"></a>[NC-9] Function ordering does not follow the Solidity style guide

According to the [Solidity style guide](https://docs.soliditylang.org/en/v0.8.17/style-guide.html#order-of-functions), functions should be laid out in the following order :`constructor()`, `receive()`, `fallback()`, `external`, `public`, `internal`, `private`, but the cases below do not follow this pattern

*Instances (9)*:

```solidity
File: contracts/core/MultiCommand.sol

1: 
   Current order:
   internal dispatch
   external execute
   
   Suggested order:
   external execute
   internal dispatch

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiCommand.sol)

```solidity
File: contracts/core/MultiStrategy.sol

1: 
   Current order:
   internal _initMultiStrategy
   public setWeights
   external addStrategy
   external strategies
   external weights
   public totalWeight
   internal _allocateAssets
   internal _deallocateAssets
   internal _totalAssets
   internal _harvestStrategies
   internal _rebalanceStrategies
   external removeStrategy
   
   Suggested order:
   external addStrategy
   external strategies
   external weights
   external removeStrategy
   public setWeights
   public totalWeight
   internal _initMultiStrategy
   internal _allocateAssets
   internal _deallocateAssets
   internal _totalAssets
   internal _harvestStrategies
   internal _rebalanceStrategies

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/MultiStrategyVault.sol

1: 
   Current order:
   public initialize
   internal _harvest
   internal _deploy
   internal _undeploy
   internal _totalAssets
   internal _asset
   external rebalance
   
   Suggested order:
   external rebalance
   public initialize
   internal _harvest
   internal _deploy
   internal _undeploy
   internal _totalAssets
   internal _asset

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

```solidity
File: contracts/core/Vault.sol

1: 
   Current order:
   public initialize
   internal _harvest
   internal _deploy
   internal _undeploy
   internal _totalAssets
   internal _asset
   external rebalance
   
   Suggested order:
   external rebalance
   public initialize
   internal _harvest
   internal _deploy
   internal _undeploy
   internal _totalAssets
   internal _asset

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/VaultBase.sol

1: 
   Current order:
   internal _initializeBase
   internal _asset
   internal _totalAssets
   internal _harvest
   internal _deploy
   internal _undeploy
   internal _harvestAndMintFees
   external maxMint
   external previewMint
   external mint
   external maxDeposit
   external previewDeposit
   external depositNative
   external deposit
   private _depositInternal
   external maxWithdraw
   external previewWithdraw
   external withdrawNative
   external redeemNative
   external withdraw
   external maxRedeem
   external previewRedeem
   external redeem
   private _redeemInternal
   public totalAssets
   external convertToShares
   external convertToAssets
   external asset
   public tokenPerAsset
   external pause
   external unpause
   
   Suggested order:
   external maxMint
   external previewMint
   external mint
   external maxDeposit
   external previewDeposit
   external depositNative
   external deposit
   external maxWithdraw
   external previewWithdraw
   external withdrawNative
   external redeemNative
   external withdraw
   external maxRedeem
   external previewRedeem
   external redeem
   external convertToShares
   external convertToAssets
   external asset
   external pause
   external unpause
   public totalAssets
   public tokenPerAsset
   internal _initializeBase
   internal _asset
   internal _totalAssets
   internal _harvest
   internal _deploy
   internal _undeploy
   internal _harvestAndMintFees
   private _depositInternal
   private _redeemInternal

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/hooks/UsePermitTransfers.sol

1: 
   Current order:
   internal pullTokensWithPermit
   public test__pullTokensWithPermit
   
   Suggested order:
   public test__pullTokensWithPermit
   internal pullTokensWithPermit

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UsePermitTransfers.sol)

```solidity
File: contracts/core/hooks/UseTokenActions.sol

1: 
   Current order:
   internal pullToken
   internal pullTokenFrom
   internal pushToken
   internal pushTokenFrom
   internal sweepTokens
   public test__pullToken
   public test__pullTokenFrom
   public test__pushToken
   public test__pushTokenFrom
   public test__sweepTokens
   
   Suggested order:
   public test__pullToken
   public test__pullTokenFrom
   public test__pushToken
   public test__pushTokenFrom
   public test__sweepTokens
   internal pullToken
   internal pullTokenFrom
   internal pushToken
   internal pushTokenFrom
   internal sweepTokens

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseTokenActions.sol)

```solidity
File: contracts/core/hooks/swappers/UseUnifiedSwapper.sol

1: 
   Current order:
   internal _key
   external enableRoute
   external disableRoute
   public isRouteEnabled
   internal swap
   external test__swap
   
   Suggested order:
   external enableRoute
   external disableRoute
   external test__swap
   public isRouteEnabled
   internal _key
   internal swap

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/swappers/UseUnifiedSwapper.sol)

```solidity
File: contracts/core/strategies/StrategySupplyBase.sol

1: 
   Current order:
   internal _deploy
   internal _undeploy
   internal _getBalance
   external deploy
   external harvest
   external undeploy
   external totalAssets
   external asset
   public getBalance
   
   Suggested order:
   external deploy
   external harvest
   external undeploy
   external totalAssets
   external asset
   public getBalance
   internal _deploy
   internal _undeploy
   internal _getBalance

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyBase.sol)

### <a name="NC-10"></a>[NC-10] Functions should not be longer than 50 lines

Overly complex code can make understanding functionality more difficult, try to further modularize your code to ensure readability

*Instances (93)*:

```solidity
File: contracts/core/MultiCommand.sol

72:     function execute(Command[] calldata commands) external payable {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiCommand.sol)

```solidity
File: contracts/core/MultiStrategy.sol

67:     function _initMultiStrategy(IStrategy[] memory istrategies, uint16[] memory iweights) internal onlyInitializing {

85:     function setWeights(uint16[] memory iweights) public onlyRole(VAULT_MANAGER_ROLE) {

107:     function addStrategy(IStrategy strategy) external onlyRole(VAULT_MANAGER_ROLE) {

118:     function strategies() external view returns (IStrategy[] memory) {

126:     function weights() external view returns (uint16[] memory) {

134:     function totalWeight() public view returns (uint16) {

143:     function _allocateAssets(uint256 amount) internal returns (uint256 totalDeployed) {

160:     function _deallocateAssets(uint256 amount) internal returns (uint256 totalUndeployed) {

181:     function _totalAssets() internal view virtual returns (uint256 assets) {

191:     function _harvestStrategies() internal returns (int256 balanceChange) {

209:     function _rebalanceStrategies(uint256[] memory indexes, int256[] memory deltas) internal {

251:     function removeStrategy(uint256 index) external onlyRole(VAULT_MANAGER_ROLE) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/MultiStrategyVault.sol

110:     function _harvest() internal virtual override returns (int256 balanceChange) {

123:     function _deploy(uint256 assets) internal virtual override returns (uint256 deployedAmount) {

136:     function _undeploy(uint256 assets) internal virtual override returns (uint256 undeployedAmount) {

148:     function _totalAssets() internal view virtual override(VaultBase, MultiStrategy) returns (uint256 assets) {

149:         assets = MultiStrategy._totalAssets(); // Calls the totalAssets function from MultiStrategy to get the total assets

152:     function _asset() internal view virtual override returns (address) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

```solidity
File: contracts/core/Vault.sol

107:     function _harvest() internal virtual override returns (int256 balanceChange) {

122:     function _deploy(uint256 assets) internal virtual override returns (uint256 deployedAmount) {

143:     function _undeploy(uint256 assets) internal virtual override returns (uint256 retAmount) {

156:     function _totalAssets() internal view virtual override returns (uint256 amount) {

160:     function _asset() internal view virtual override returns (address) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/VaultBase.sol

106:     function _asset() internal view virtual returns (address);

112:     function _totalAssets() internal view virtual returns (uint256 amount);

118:     function _harvest() internal virtual returns (int256 balanceChange);

125:     function _deploy(uint256 assets) internal virtual returns (uint256);

132:     function _undeploy(uint256 assets) internal virtual returns (uint256);

155:     function maxMint(address) external pure override returns (uint256 maxShares) {

164:     function previewMint(uint256 shares) external view override returns (uint256 assets) {

188:     function maxDeposit(address) external pure override returns (uint256 maxAssets) {

197:     function previewDeposit(uint256 assets) external view override returns (uint256 shares) {

212:         wETHA().functionCallWithValue(abi.encodeWithSignature("deposit()"), msg.value);

237:     function _depositInternal(uint256 assets, address receiver) private returns (uint256 shares) {

278:     function maxWithdraw(address shareHolder) external view override returns (uint256 maxAssets) {

287:     function previewWithdraw(uint256 assets) external view override returns (uint256 shares) {

337:     function maxRedeem(address shareHolder) external view override returns (uint256 maxShares) {

346:     function previewRedeem(uint256 shares) external view override returns (uint256 assets) {

433:     function totalAssets() public view override returns (uint256 amount) {

442:     function convertToShares(uint256 assets) external view override returns (uint256 shares) {

452:     function convertToAssets(uint256 shares) external view override returns (uint256 assets) {

461:     function asset() external view override returns (address) {

469:     function tokenPerAsset() public view returns (uint256) {

492:     function unpause() external onlyRole(PAUSER_ROLE) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/VaultRouter.sol

49:     function initialize(address initialOwner, IWETH weth) public initializer {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultRouter.sol)

```solidity
File: contracts/core/hooks/UseOracle.sol

13:     function _initUseOracle(address oracleAddress) internal onlyInitializing {

18:     function oracle() internal view returns (IOracle) {

22:     function getLastPrice() internal view returns (IOracle.Price memory) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseOracle.sol)

```solidity
File: contracts/core/hooks/UseTokenActions.sol

39:     function pullToken(IERC20 token, uint256 amount) internal virtual {

54:     function pullTokenFrom(IERC20 token, address from, uint256 amount) internal virtual {

69:     function pushToken(IERC20 token, address to, uint256 amount) internal virtual {

85:     function pushTokenFrom(IERC20 token, address from, address to, uint256 amount) internal virtual {

101:     function sweepTokens(IERC20 token, address to) internal virtual returns (uint256 sweptAmount) {

114:     function test__pullToken(IERC20 token, uint256 amount) public {

118:     function test__pullTokenFrom(IERC20 token, address from, uint256 amount) public {

122:     function test__pushToken(IERC20 token, address to, uint256 amount) public {

126:     function test__pushTokenFrom(IERC20 token, address from, address to, uint256 amount) public {

130:     function test__sweepTokens(IERC20 token, address to) public returns (uint256) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseTokenActions.sol)

```solidity
File: contracts/core/hooks/swappers/UseUnifiedSwapper.sol

57:     function _key(address tokenA, address tokenB) internal pure returns (bytes32) {

66:     function enableRoute(address tokenIn, address tokenOut, RouteInfo memory routeInfo) external onlyGovernor {

83:     function disableRoute(address tokenIn, address tokenOut) external onlyGovernor {

101:     function isRouteEnabled(address tokenIn, address tokenOut) public view returns (bool) {

115:     function swap(SwapParams memory params) internal virtual override returns (uint256 amountIn, uint256 amountOut) {

153:     function test__swap(SwapParams memory params) external returns (uint256 amountIn, uint256 amountOut) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/swappers/UseUnifiedSwapper.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageAAVEv3.sol

69:     function getBalances() public view virtual override returns (uint256 collateralBalance, uint256 debtBalance) {

85:     function _supply(uint256 amountIn) internal virtual override {

95:     function _supplyAndBorrow(uint256 collateral, uint256 debt) internal virtual override {

105:     function _repay(uint256 amount) internal virtual override {

115:     function _withdraw(uint256 amount, address to) internal virtual override {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageMorphoBlue.sol

115:     function getBalances() public view virtual override returns (uint256 collateralBalance, uint256 debtBalance) {

134:     function _supply(uint256 amountIn) internal virtual override {

146:     function _supplyAndBorrow(uint256 collateralAmount, uint256 debtAmount) internal virtual override {

159:     function _repay(uint256 amount) internal virtual override {

188:     function _withdraw(uint256 amount, address to) internal virtual override {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageMorphoBlue.sol)

```solidity
File: contracts/core/strategies/StrategySupplyAAVEv3.sol

42:     function _deploy(uint256 amount) internal virtual override returns (uint256) {

47:     function _undeploy(uint256 amount) internal virtual override returns (uint256 undeployedAmount) {

57:     function _getBalance() internal view virtual override returns (uint256) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategySupplyBase.sol

50:     function _deploy(uint256 amount) internal virtual returns (uint256);

57:     function _undeploy(uint256 amount) internal virtual returns (uint256);

64:     function _getBalance() internal view virtual returns (uint256);

69:     function deploy(uint256 amount) external nonReentrant onlyOwner returns (uint256 deployedAmount) {

90:     function harvest() external returns (int256 balanceChange) {

110:     function undeploy(uint256 amount) external nonReentrant onlyOwner returns (uint256 undeployedAmount) {

134:     function totalAssets() external view returns (uint256) {

141:     function asset() external view returns (address) {

150:     function getBalance() public view virtual returns (uint256) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyBase.sol)

```solidity
File: contracts/core/strategies/StrategySupplyERC4626.sol

43:     function _deploy(uint256 amount) internal override returns (uint256) {

50:     function _undeploy(uint256 amount) internal override returns (uint256) {

57:     function _getBalance() internal view override returns (uint256) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyERC4626.sol)

```solidity
File: contracts/core/strategies/StrategySupplyMorpho.sol

63:     function _deploy(uint256 amount) internal override returns (uint256) {

71:     function _undeploy(uint256 amount) internal override returns (uint256) {

91:     function _getBalance() internal view override returns (uint256) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyMorpho.sol)

### <a name="NC-11"></a>[NC-11] Change int to int256

Throughout the code base, some variables are declared as `int`. To favor explicitness, consider changing all instances of `int` to `int256`

*Instances (2)*:

```solidity
File: contracts/core/VaultBase.sol

145:                 uint256 sharesToMint = feeInEth.mulDivUp(totalSupply(), currentPosition * PERCENTAGE_PRECISION);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/router/Commands.sol

25:     uint8 public constant ERC4626_VAULT_MINT = 0x11; // Command to mint shares in an ERC4626 vault.

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/router/Commands.sol)

### <a name="NC-12"></a>[NC-12] Lack of checks in setters

Be it sanity checks (like checks against `0`-values) or initial setting checks: it's best for Setter functions to have them

*Instances (1)*:

```solidity
File: contracts/core/MultiStrategy.sol

160:     function _deallocateAssets(uint256 amount) internal returns (uint256 totalUndeployed) {
             uint256[] memory currentAssets = new uint256[](_strategies.length);
     
             uint256 totalAssets = 0;
             uint256 strategiesLength = _strategies.length;
     
             for (uint256 i = 0; i < strategiesLength; i++) {
                 currentAssets[i] = IStrategy(_strategies[i]).totalAssets();
                 totalAssets += currentAssets[i];
             }
             totalUndeployed = 0;
             for (uint256 i = 0; i < strategiesLength; i++) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

### <a name="NC-13"></a>[NC-13] NatSpec is completely non-existent on functions that should have them

Public and external functions that aren't view or pure should have NatSpec comments

*Instances (11)*:

```solidity
File: contracts/core/hooks/UseTokenActions.sol

114:     function test__pullToken(IERC20 token, uint256 amount) public {

114:     function test__pullToken(IERC20 token, uint256 amount) public {

118:     function test__pullTokenFrom(IERC20 token, address from, uint256 amount) public {

118:     function test__pullTokenFrom(IERC20 token, address from, uint256 amount) public {

122:     function test__pushToken(IERC20 token, address to, uint256 amount) public {

122:     function test__pushToken(IERC20 token, address to, uint256 amount) public {

126:     function test__pushTokenFrom(IERC20 token, address from, address to, uint256 amount) public {

126:     function test__pushTokenFrom(IERC20 token, address from, address to, uint256 amount) public {

130:     function test__sweepTokens(IERC20 token, address to) public returns (uint256) {

130:     function test__sweepTokens(IERC20 token, address to) public returns (uint256) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseTokenActions.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageAAVEv3.sol

45:     function initialize(

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageAAVEv3.sol)

### <a name="NC-14"></a>[NC-14] Use a `modifier` instead of a `require/if` statement for a special `msg.sender` actor

If a function is supposed to be access-controlled, a `modifier` should be used instead of a `require/if` statement for more readability.

*Instances (5)*:

```solidity
File: contracts/core/VaultBase.sol

63:         if (!isAccountEnabled(msg.sender)) revert NoPermissions();

77:         if (msg.sender != wETHA()) revert ETHTransferNotAllowed(msg.sender);

384:         if (msg.sender != holder) {

385:             if (allowance(holder, msg.sender) < shares) revert NoAllowance();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/hooks/UseTokenActions.sol

43:         if (token.allowance(msg.sender, address(this)) < amount) revert NotEnoughAllowance();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseTokenActions.sol)

### <a name="NC-15"></a>[NC-15] Constant state variables defined more than once

Rather than redefining state variable constant, consider using a library to store all constants as this will prevent data redundancy

*Instances (2)*:

```solidity
File: contracts/core/MultiStrategyVault.sol

47:     uint8 public constant HARVEST_VAULT = 0x01; //

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

```solidity
File: contracts/core/Vault.sol

60:     uint8 public constant HARVEST_VAULT = 0x01; //

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/Vault.sol)

### <a name="NC-16"></a>[NC-16] Consider using named mappings

Consider moving to solidity version 0.8.18 or later, and using [named mappings](https://ethereum.stackexchange.com/questions/51629/how-to-name-the-arguments-in-mapping/145555#145555) to make it easier to understand the purpose of each mapping

*Instances (2)*:

```solidity
File: contracts/core/VaultRouter.sol

37:     mapping(IERC20 => bool) private _approvedSwapTokens;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultRouter.sol)

```solidity
File: contracts/core/hooks/swappers/UseUnifiedSwapper.sol

55:     mapping(bytes32 => RouteInfo) private _routes;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/swappers/UseUnifiedSwapper.sol)

### <a name="NC-17"></a>[NC-17] Adding a `return` statement when the function defines a named return variable, is redundant

*Instances (15)*:

```solidity
File: contracts/core/MultiStrategy.sol

177:     /**
          * @notice Calculates the total assets managed by all strategies.
          * @return assets The total assets as a uint256.
          */
         function _totalAssets() internal view virtual returns (uint256 assets) {
             for (uint256 i = 0; i < _strategies.length; ) {
                 assets += IStrategy(_strategies[i]).totalAssets();
                 unchecked {
                     i++;
                 }
             }
             return assets;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/Vault.sol

98:      * @dev Function to rebalance the strategy, prevent a liquidation and pay fees
         * to the protocol by minting shares to the fee receiver.
         *
         * This function is externally callable and is marked as non-reentrant.
         * It triggers the harvest operation on the strategy, calculates the balance change,
         * and applies performance fees if applicable.
         *
         * @return balanceChange The change in balance after the rebalance operation.
         */
        function _harvest() internal virtual override returns (int256 balanceChange) {
            return _strategy.harvest(); // Calls the harvest function of the strategy

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/VaultBase.sol

152:      * @dev Returns the maximum number of shares that can be minted.
          * @return maxShares The maximum number of shares.
          */
         function maxMint(address) external pure override returns (uint256 maxShares) {
             return type(uint256).max;

185:      * @dev Returns the maximum amount of assets that can be deposited.
          * @return maxAssets The maximum amount of assets.
          */
         function maxDeposit(address) external pure override returns (uint256 maxAssets) {
             return type(uint256).max;

202:      * @dev Deposits native ETH into the vault, wrapping it in WETH.
          * @param receiver The address of the receiver.
          * @return shares The number of shares minted for the deposit.
          */
         function depositNative(
             address receiver
         ) external payable nonReentrant whenNotPaused onlyWhiteListed returns (uint256 shares) {
             if (msg.value == 0) revert InvalidAmount();
             if (_asset() != wETHA()) revert InvalidAsset();
             //  Wrap ETH
             wETHA().functionCallWithValue(abi.encodeWithSignature("deposit()"), msg.value);
             return _depositInternal(msg.value, receiver);

217:      * @dev Deposits the specified amount of assets into the vault.
          * @param assets The amount of assets to deposit.
          * @param receiver The address of the receiver.
          * @return shares The number of shares minted for the deposit.
          */
         function deposit(
             uint256 assets,
             address receiver
         ) external override nonReentrant whenNotPaused onlyWhiteListed returns (uint256 shares) {
             if (assets == 0) revert InvalidAmount();
             IERC20Upgradeable(_asset()).safeTransferFrom(msg.sender, address(this), assets);
             return _depositInternal(assets, receiver);

317:      * @dev Withdraws the specified amount of assets from the vault.
          * @param assets The amount of assets to withdraw.
          * @param receiver The address of the receiver.
          * @param holder The owner of the assets to withdraw.
          * @return shares The number of shares burned for the withdrawal.
          */
         function withdraw(
             uint256 assets,
             address receiver,
             address holder
         ) external override nonReentrant whenNotPaused onlyWhiteListed returns (uint256 shares) {
             shares = this.convertToShares(assets);
             return _redeemInternal(shares, receiver, holder, false);

351:      * @dev Redeems the specified number of shares for assets.
          * @param shares The number of shares to redeem.
          * @param receiver The address of the receiver.
          * @param holder The owner of the shares to redeem.
          * @return retAmount The amount of assets received after redemption.
          */
         function redeem(
             uint256 shares,
             address receiver,
             address holder
         ) external override nonReentrant onlyWhiteListed whenNotPaused returns (uint256 retAmount) {
             return _redeemInternal(shares, receiver, holder, false);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/hooks/swappers/UseUnifiedSwapper.sol

106:     /**
         * @inheritdoc ISwapHandler
         * @notice The swap function is responsible for executing token swaps based on the authorized routes.
         * It retrieves the route information, checks if the route is authorized, and then determines
         * the appropriate swap pro
         -+
         vider to execute the swap. The function handles swaps for Uniswap V2,
         * Uniswap V3, and Curve, encoding the necessary parameters for the Curve swap.
        */
         function swap(SwapParams memory params) internal virtual override returns (uint256 amountIn, uint256 amountOut) {
             bytes32 key = _key(params.underlyingIn, params.underlyingOut);
             // Retrieve the route information using the storage getter
             RouteInfo memory routeInfo = _routes[key];
             // Check if the route is authorized; if not, revert the transaction with an error
             if (routeInfo.provider == SwapProvider.NONE) revert RouteNotAuthorized();
             // Determine the swap provider based on the route information
             if (routeInfo.provider == SwapProvider.UNIV3) {
                 // If the provider is Uniswap V3, set the fee tier for the swap parameters
                 params.payload = abi.encode(routeInfo.uniV3Tier);
                 // Execute the swap using the Uniswap V3 swapper and return the result
                 return UniV3Library.swapUniV3(IV3SwapRouter(routeInfo.router), params);

106:     /**
         * @inheritdoc ISwapHandler
         * @notice The swap function is responsible for executing token swaps based on the authorized routes.
         * It retrieves the route information, checks if the route is authorized, and then determines
         * the appropriate swap pro
         -+
         vider to execute the swap. The function handles swaps for Uniswap V2,
         * Uniswap V3, and Curve, encoding the necessary parameters for the Curve swap.
        */
         function swap(SwapParams memory params) internal virtual override returns (uint256 amountIn, uint256 amountOut) {
             bytes32 key = _key(params.underlyingIn, params.underlyingOut);
             // Retrieve the route information using the storage getter
             RouteInfo memory routeInfo = _routes[key];
             // Check if the route is authorized; if not, revert the transaction with an error
             if (routeInfo.provider == SwapProvider.NONE) revert RouteNotAuthorized();
             // Determine the swap provider based on the route information
             if (routeInfo.provider == SwapProvider.UNIV3) {
                 // If the provider is Uniswap V3, set the fee tier for the swap parameters
                 params.payload = abi.encode(routeInfo.uniV3Tier);
                 // Execute the swap using the Uniswap V3 swapper and return the result
                 return UniV3Library.swapUniV3(IV3SwapRouter(routeInfo.router), params);
             } else if (routeInfo.provider == SwapProvider.UNIV2) {
                 // If the provider is Uniswap V2, execute the swap using the Uniswap V2 swapper and return the result
                 return UniV2Library.swapUniV2(IUniswapV2Router02(routeInfo.router), params);

106:     /**
         * @inheritdoc ISwapHandler
         * @notice The swap function is responsible for executing token swaps based on the authorized routes.
         * It retrieves the route information, checks if the route is authorized, and then determines
         * the appropriate swap pro
         -+
         vider to execute the swap. The function handles swaps for Uniswap V2,
         * Uniswap V3, and Curve, encoding the necessary parameters for the Curve swap.
        */
         function swap(SwapParams memory params) internal virtual override returns (uint256 amountIn, uint256 amountOut) {
             bytes32 key = _key(params.underlyingIn, params.underlyingOut);
             // Retrieve the route information using the storage getter
             RouteInfo memory routeInfo = _routes[key];
             // Check if the route is authorized; if not, revert the transaction with an error
             if (routeInfo.provider == SwapProvider.NONE) revert RouteNotAuthorized();
             // Determine the swap provider based on the route information
             if (routeInfo.provider == SwapProvider.UNIV3) {
                 // If the provider is Uniswap V3, set the fee tier for the swap parameters
                 params.payload = abi.encode(routeInfo.uniV3Tier);
                 // Execute the swap using the Uniswap V3 swapper and return the result
                 return UniV3Library.swapUniV3(IV3SwapRouter(routeInfo.router), params);
             } else if (routeInfo.provider == SwapProvider.UNIV2) {
                 // If the provider is Uniswap V2, execute the swap using the Uniswap V2 swapper and return the result
                 return UniV2Library.swapUniV2(IUniswapV2Router02(routeInfo.router), params);
             } else if (routeInfo.provider == SwapProvider.AERODROME) {
                 params.payload = abi.encode(routeInfo.tickSpacing);
                 return AerodromeLibrary.swapAerodrome(ISwapRouter(routeInfo.router), params);

147:     /**
          * @notice Tests the swap function
          * @param params The swap parameters
          * @return amountIn The amount of input tokens used in the swap
          * @return amountOut The amount of output tokens received from the swap
          */
         function test__swap(SwapParams memory params) external returns (uint256 amountIn, uint256 amountOut) {
             return UseUnifiedSwapper.swap(params);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/swappers/UseUnifiedSwapper.sol)

```solidity
File: contracts/core/strategies/StrategySupplyAAVEv3.sol

47:     function _undeploy(uint256 amount) internal virtual override returns (uint256 undeployedAmount) {
            // Transfer assets back to caller
            undeployedAmount = _aavev3.withdraw(_asset, amount, address(this));
            return undeployedAmount;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategySupplyBase.sol

66:     /**
         * @inheritdoc IStrategy
         */
        function deploy(uint256 amount) external nonReentrant onlyOwner returns (uint256 deployedAmount) {
            if (amount == 0) revert ZeroAmount();
    
            // Transfer assets from user
            ERC20(_asset).safeTransferFrom(msg.sender, address(this), amount);
    
            // Transfer assets from caller to strategy
            deployedAmount = _deploy(amount);
    
            _deployedAmount += deployedAmount;
    
            emit StrategyDeploy(msg.sender, deployedAmount);
    
            emit StrategyAmountUpdate(_deployedAmount);
    
            return deployedAmount;

107:     /**
          * @inheritdoc IStrategy
          */
         function undeploy(uint256 amount) external nonReentrant onlyOwner returns (uint256 undeployedAmount) {
             if (amount == 0) revert ZeroAmount();
     
             // Get Balance
             uint256 balance = getBalance();
             if (amount > balance) revert InsufficientBalance();
     
             // Transfer assets back to caller
             uint256 withdrawalValue = _undeploy(amount);
     
             // Check withdrawal value matches the initial amount
             // Transfer assets to user
             ERC20(_asset).safeTransfer(msg.sender, withdrawalValue);
     
             balance -= amount;
             emit StrategyUndeploy(msg.sender, withdrawalValue);
             emit StrategyAmountUpdate(balance);
     
             return amount;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyBase.sol)

### <a name="NC-18"></a>[NC-18] Take advantage of Custom Error's return value property

An important feature of Custom Error is that values such as address, tokenID, msg.value can be written inside the () sign, this kind of approach provides a serious advantage in debugging and examining the revert details of dapps such as tenderly.

*Instances (77)*:

```solidity
File: contracts/core/MultiStrategy.sol

68:         if (istrategies.length == 0) revert InvalidStrategies();

69:         if (iweights.length == 0) revert InvalidWeights();

70:         if (istrategies.length != iweights.length) revert InvalidWeightsLength();

77:         if (_totalWeight == 0) revert InvalidWeights();

78:         if (_totalWeight > 10000) revert InvalidWeights();

86:         if (iweights.length != _strategies.length) revert InvalidWeightsLength();

97:         if (_totalWeight == 0 || _totalWeight > MAX_TOTAL_WEIGHT) revert InvalidWeights();

108:         if (address(strategy) == address(0)) revert InvalidStrategy();

211:         if (deltas.length != indexes.length) revert InvalidDeltasLength();

212:         if (deltas.length != _strategies.length) revert InvalidDeltasLength();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/MultiStrategyVault.sol

91:         if (iAsset == address(0)) revert InvalidAsset();

96:             if (istrategies[i].asset() != iAsset) revert InvalidAsset(); // Reverts if the strategy asset does not match the vault asset

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

```solidity
File: contracts/core/Vault.sol

92:         if (iAsset == address(0)) revert InvalidAsset();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/VaultBase.sol

63:         if (!isAccountEnabled(msg.sender)) revert NoPermissions();

94:         if (initialOwner == address(0)) revert InvalidOwner();

178:         if (shares == 0) revert InvalidAmount();

209:         if (msg.value == 0) revert InvalidAmount();

210:         if (_asset() != wETHA()) revert InvalidAsset();

226:         if (assets == 0) revert InvalidAmount();

238:         if (receiver == address(0)) revert InvalidReceiver();

245:             revert InvalidAssetsState();

253:             if (newBalance > maxDepositLocal) revert MaxDepositReached();

263:             revert InvalidShareBalance();

299:         if (_asset() != wETHA()) revert InvalidAsset();

312:         if (_asset() != wETHA()) revert InvalidAsset();

379:         if (shares == 0) revert InvalidAmount();

380:         if (receiver == address(0)) revert InvalidReceiver();

381:         if (balanceOf(holder) < shares) revert NotEnoughBalanceToWithdraw();

385:             if (allowance(holder, msg.sender) < shares) revert NoAllowance();

391:         if (withdrawAmount == 0) revert NoAssetsToWithdraw();

399:             revert InvalidShareBalance();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/hooks/UseLeverage.sol

24:         if (nrLoops > MAX_LOOPS) revert InvalidNumberOfLoops();

25:         if (loanToValue == 0 || loanToValue > PERCENTAGE_PRECISION) revert InvalidLoanToValue();

53:             revert InvalidPercentageValue();

74:         if (colValue >= debt) revert InvalidTargetValue();

77:         if (divisor == 0) revert InvalidDivisor();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseLeverage.sol)

```solidity
File: contracts/core/hooks/UseOracle.sol

15:         if (address(_oracle) == address(0)) revert InvalidOracleContract();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseOracle.sol)

```solidity
File: contracts/core/hooks/UseTokenActions.sol

41:         if (address(token) == address(0)) revert InvalidToken();

43:         if (token.allowance(msg.sender, address(this)) < amount) revert NotEnoughAllowance();

56:         if (address(token) == address(0)) revert InvalidToken();

58:         if (token.allowance(from, address(this)) < amount) revert NotEnoughAllowance();

71:         if (address(token) == address(0)) revert InvalidToken();

73:         if (address(to) == address(0)) revert InvalidRecipient();

87:         if (address(token) == address(0)) revert InvalidToken();

89:         if (address(to) == address(0)) revert InvalidRecipient();

91:         if (token.allowance(from, address(this)) < amount) revert NotEnoughAllowance();

103:         if (address(token) == address(0)) revert InvalidToken();

105:         if (address(to) == address(0)) revert InvalidRecipient();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseTokenActions.sol)

```solidity
File: contracts/core/hooks/swappers/UseUnifiedSwapper.sol

69:         if (_routes[key].provider != SwapProvider.NONE) revert RouteAlreadyAuthorized();

71:         if (!IERC20(tokenIn).approve(routeInfo.router, type(uint256).max - 1)) revert FailedToApproveAllowance();

73:         if (!IERC20(tokenOut).approve(routeInfo.router, type(uint256).max - 1)) revert FailedToApproveAllowance();

87:         if (_routes[key].provider == SwapProvider.NONE) revert RouteNotAuthorized();

89:         if (!IERC20(tokenIn).approve(_routes[key].router, 0)) revert FailedToApproveAllowance();

90:         if (!IERC20(tokenOut).approve(_routes[key].router, 0)) revert FailedToApproveAllowance();

120:         if (routeInfo.provider == SwapProvider.NONE) revert RouteNotAuthorized();

134:             revert InvalidProvider();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/swappers/UseUnifiedSwapper.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageAAVEv3.sol

58:         if (aaveV3().getUserEMode(address(this)) != eModeCategory) revert InvalidAAVEEMode();

86:         if (!ERC20(_collateralToken).approve(aaveV3A(), amountIn)) revert FailedToApproveAllowanceForAAVE();

106:         if (!ERC20(_debtToken).approve(aaveV3A(), amount)) revert FailedToApproveAllowanceForAAVE();

107:         if (aaveV3().repay(_debtToken, amount, 2, address(this)) != amount) revert FailedToRepayDebt();

116:         if (aaveV3().withdraw(_collateralToken, amount, to) != amount) revert InvalidWithdrawAmount();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageMorphoBlue.sol

95:         if (address(_morpho) == address(0)) revert InvalidMorphoBlueContract();

106:         if (lParams.lltv == 0) revert InvalidMorphoBlueMarket();

135:         if (!ERC20(_collateralToken).approve(address(_morpho), amountIn)) revert FailedToApproveAllowance();

160:         if (!ERC20(_debtToken).approve(address(_morpho), amount)) revert FailedToApproveAllowance();

179:         if (assetsRepaid < amount) revert FailedToRepayDebt();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageMorphoBlue.sol)

```solidity
File: contracts/core/strategies/StrategySupplyAAVEv3.sol

32:         if (aavev3Address == address(0)) revert ZeroAddress();

38:             revert FailedToApproveAllowanceForAAVE();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategySupplyBase.sol

40:         if (initialOwner == address(0) || asset_ == address(0)) revert ZeroAddress();

70:         if (amount == 0) revert ZeroAmount();

111:         if (amount == 0) revert ZeroAmount();

115:         if (amount > balance) revert InsufficientBalance();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyBase.sol)

```solidity
File: contracts/core/strategies/StrategySupplyERC4626.sol

31:         if (vault_ == address(0)) revert ZeroAddress();

32:         if (IERC4626(vault_).asset() != asset_) revert InvalidVault();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyERC4626.sol)

```solidity
File: contracts/core/strategies/StrategySupplyMorpho.sol

46:         if (morphoBlue == address(0)) revert ZeroAddress();

50:         if (address(_morpho) == address(0)) revert InvalidMorphoBlueContract();

56:             revert FailedToApproveAllowanceForMorpho();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyMorpho.sol)

### <a name="NC-19"></a>[NC-19] Avoid the use of sensitive terms

Use [alternative variants](https://www.zdnet.com/article/mysql-drops-master-slave-and-blacklist-whitelist-terminology/), e.g. allowlist/denylist instead of whitelist/blacklist

*Instances (8)*:

```solidity
File: contracts/core/VaultBase.sol

62:     modifier onlyWhiteListed() {

177:     ) external override nonReentrant whenNotPaused onlyWhiteListed returns (uint256 assets) {

208:     ) external payable nonReentrant whenNotPaused onlyWhiteListed returns (uint256 shares) {

225:     ) external override nonReentrant whenNotPaused onlyWhiteListed returns (uint256 shares) {

298:     ) external override nonReentrant whenNotPaused onlyWhiteListed returns (uint256 shares) {

311:     ) external override nonReentrant whenNotPaused onlyWhiteListed returns (uint256 assets) {

327:     ) external override nonReentrant whenNotPaused onlyWhiteListed returns (uint256 shares) {

361:     ) external override nonReentrant onlyWhiteListed whenNotPaused returns (uint256 retAmount) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

### <a name="NC-20"></a>[NC-20] Contract does not follow the Solidity style guide's suggested layout ordering

The [style guide](https://docs.soliditylang.org/en/v0.8.16/style-guide.html#order-of-layout) says that, within a contract, the ordering should be:

1) Type declarations
2) State variables
3) Events
4) Modifiers
5) Functions

However, the contract(s) below do not follow this ordering

*Instances (12)*:

```solidity
File: contracts/core/MultiStrategy.sol

1: 
   Current order:
   EventDefinition.AddStrategy
   EventDefinition.RemoveStrategy
   EventDefinition.WeightsUpdated
   EventDefinition.MaxDifferenceUpdated
   ErrorDefinition.InvalidStrategy
   ErrorDefinition.InvalidStrategyIndex
   ErrorDefinition.InvalidWeightsLength
   ErrorDefinition.InvalidDeltasLength
   ErrorDefinition.InvalidStrategies
   ErrorDefinition.InvalidWeights
   VariableDeclaration.MAX_TOTAL_WEIGHT
   VariableDeclaration._strategies
   VariableDeclaration._weights
   VariableDeclaration._totalWeight
   FunctionDefinition._initMultiStrategy
   FunctionDefinition.setWeights
   FunctionDefinition.addStrategy
   FunctionDefinition.strategies
   FunctionDefinition.weights
   FunctionDefinition.totalWeight
   FunctionDefinition._allocateAssets
   FunctionDefinition._deallocateAssets
   FunctionDefinition._totalAssets
   FunctionDefinition._harvestStrategies
   FunctionDefinition._rebalanceStrategies
   FunctionDefinition.removeStrategy
   
   Suggested order:
   VariableDeclaration.MAX_TOTAL_WEIGHT
   VariableDeclaration._strategies
   VariableDeclaration._weights
   VariableDeclaration._totalWeight
   ErrorDefinition.InvalidStrategy
   ErrorDefinition.InvalidStrategyIndex
   ErrorDefinition.InvalidWeightsLength
   ErrorDefinition.InvalidDeltasLength
   ErrorDefinition.InvalidStrategies
   ErrorDefinition.InvalidWeights
   EventDefinition.AddStrategy
   EventDefinition.RemoveStrategy
   EventDefinition.WeightsUpdated
   EventDefinition.MaxDifferenceUpdated
   FunctionDefinition._initMultiStrategy
   FunctionDefinition.setWeights
   FunctionDefinition.addStrategy
   FunctionDefinition.strategies
   FunctionDefinition.weights
   FunctionDefinition.totalWeight
   FunctionDefinition._allocateAssets
   FunctionDefinition._deallocateAssets
   FunctionDefinition._totalAssets
   FunctionDefinition._harvestStrategies
   FunctionDefinition._rebalanceStrategies
   FunctionDefinition.removeStrategy

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/MultiStrategyVault.sol

1: 
   Current order:
   UsingForDirective.IERC20Upgradeable
   VariableDeclaration.HARVEST_VAULT
   VariableDeclaration.REBALANCE_STRATEGIES
   VariableDeclaration.CHANGE_WEIGHTS
   VariableDeclaration._strategyAsset
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition._harvest
   FunctionDefinition._deploy
   FunctionDefinition._undeploy
   FunctionDefinition._totalAssets
   FunctionDefinition._asset
   FunctionDefinition.rebalance
   VariableDeclaration.__gap
   
   Suggested order:
   UsingForDirective.IERC20Upgradeable
   VariableDeclaration.HARVEST_VAULT
   VariableDeclaration.REBALANCE_STRATEGIES
   VariableDeclaration.CHANGE_WEIGHTS
   VariableDeclaration._strategyAsset
   VariableDeclaration.__gap
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition._harvest
   FunctionDefinition._deploy
   FunctionDefinition._undeploy
   FunctionDefinition._totalAssets
   FunctionDefinition._asset
   FunctionDefinition.rebalance

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

```solidity
File: contracts/core/Vault.sol

1: 
   Current order:
   VariableDeclaration._strategy
   VariableDeclaration._strategyAsset
   VariableDeclaration._VAULT_VERSION
   UsingForDirective.MathLibrary
   FunctionDefinition.constructor
   VariableDeclaration.HARVEST_VAULT
   UsingForDirective.IERC20Upgradeable
   FunctionDefinition.initialize
   FunctionDefinition._harvest
   FunctionDefinition._deploy
   FunctionDefinition._undeploy
   FunctionDefinition._totalAssets
   FunctionDefinition._asset
   FunctionDefinition.rebalance
   VariableDeclaration.__gap
   
   Suggested order:
   UsingForDirective.MathLibrary
   UsingForDirective.IERC20Upgradeable
   VariableDeclaration._strategy
   VariableDeclaration._strategyAsset
   VariableDeclaration._VAULT_VERSION
   VariableDeclaration.HARVEST_VAULT
   VariableDeclaration.__gap
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition._harvest
   FunctionDefinition._deploy
   FunctionDefinition._undeploy
   FunctionDefinition._totalAssets
   FunctionDefinition._asset
   FunctionDefinition.rebalance

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/VaultBase.sol

1: 
   Current order:
   UsingForDirective.Rebase
   UsingForDirective.IERC20Upgradeable
   UsingForDirective.AddressUpgradeable
   UsingForDirective.AddressUpgradeable
   UsingForDirective.MathLibrary
   ErrorDefinition.InvalidAmount
   ErrorDefinition.InvalidAssetsState
   ErrorDefinition.InvalidAsset
   ErrorDefinition.MaxDepositReached
   ErrorDefinition.NotEnoughBalanceToWithdraw
   ErrorDefinition.NoAssetsToWithdraw
   ErrorDefinition.NoPermissions
   ErrorDefinition.InvalidShareBalance
   ErrorDefinition.InvalidReceiver
   ErrorDefinition.NoAllowance
   VariableDeclaration._MINIMUM_SHARE_BALANCE
   VariableDeclaration._ONE
   ModifierDefinition.onlyWhiteListed
   FunctionDefinition.constructor
   FunctionDefinition.receive
   FunctionDefinition._initializeBase
   FunctionDefinition._asset
   FunctionDefinition._totalAssets
   FunctionDefinition._harvest
   FunctionDefinition._deploy
   FunctionDefinition._undeploy
   FunctionDefinition._harvestAndMintFees
   FunctionDefinition.maxMint
   FunctionDefinition.previewMint
   FunctionDefinition.mint
   FunctionDefinition.maxDeposit
   FunctionDefinition.previewDeposit
   FunctionDefinition.depositNative
   FunctionDefinition.deposit
   FunctionDefinition._depositInternal
   FunctionDefinition.maxWithdraw
   FunctionDefinition.previewWithdraw
   FunctionDefinition.withdrawNative
   FunctionDefinition.redeemNative
   FunctionDefinition.withdraw
   FunctionDefinition.maxRedeem
   FunctionDefinition.previewRedeem
   FunctionDefinition.redeem
   FunctionDefinition._redeemInternal
   FunctionDefinition.totalAssets
   FunctionDefinition.convertToShares
   FunctionDefinition.convertToAssets
   FunctionDefinition.asset
   FunctionDefinition.tokenPerAsset
   FunctionDefinition.pause
   FunctionDefinition.unpause
   VariableDeclaration.__gap
   
   Suggested order:
   UsingForDirective.Rebase
   UsingForDirective.IERC20Upgradeable
   UsingForDirective.AddressUpgradeable
   UsingForDirective.AddressUpgradeable
   UsingForDirective.MathLibrary
   VariableDeclaration._MINIMUM_SHARE_BALANCE
   VariableDeclaration._ONE
   VariableDeclaration.__gap
   ErrorDefinition.InvalidAmount
   ErrorDefinition.InvalidAssetsState
   ErrorDefinition.InvalidAsset
   ErrorDefinition.MaxDepositReached
   ErrorDefinition.NotEnoughBalanceToWithdraw
   ErrorDefinition.NoAssetsToWithdraw
   ErrorDefinition.NoPermissions
   ErrorDefinition.InvalidShareBalance
   ErrorDefinition.InvalidReceiver
   ErrorDefinition.NoAllowance
   ModifierDefinition.onlyWhiteListed
   FunctionDefinition.constructor
   FunctionDefinition.receive
   FunctionDefinition._initializeBase
   FunctionDefinition._asset
   FunctionDefinition._totalAssets
   FunctionDefinition._harvest
   FunctionDefinition._deploy
   FunctionDefinition._undeploy
   FunctionDefinition._harvestAndMintFees
   FunctionDefinition.maxMint
   FunctionDefinition.previewMint
   FunctionDefinition.mint
   FunctionDefinition.maxDeposit
   FunctionDefinition.previewDeposit
   FunctionDefinition.depositNative
   FunctionDefinition.deposit
   FunctionDefinition._depositInternal
   FunctionDefinition.maxWithdraw
   FunctionDefinition.previewWithdraw
   FunctionDefinition.withdrawNative
   FunctionDefinition.redeemNative
   FunctionDefinition.withdraw
   FunctionDefinition.maxRedeem
   FunctionDefinition.previewRedeem
   FunctionDefinition.redeem
   FunctionDefinition._redeemInternal
   FunctionDefinition.totalAssets
   FunctionDefinition.convertToShares
   FunctionDefinition.convertToAssets
   FunctionDefinition.asset
   FunctionDefinition.tokenPerAsset
   FunctionDefinition.pause
   FunctionDefinition.unpause

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/VaultRouter.sol

1: 
   Current order:
   VariableDeclaration._approvedSwapTokens
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition.dispatch
   FunctionDefinition._handleSwap
   FunctionDefinition._handlePullToken
   FunctionDefinition._handlePullTokenFrom
   FunctionDefinition._handlePushToken
   FunctionDefinition._handlePushTokenFrom
   FunctionDefinition._handleSweepTokens
   FunctionDefinition._handleWrapETH
   FunctionDefinition._handleUnwrapETH
   FunctionDefinition._handlePullTokenWithPermit
   FunctionDefinition._handleVaultDeposit
   FunctionDefinition._handleVaultMint
   FunctionDefinition._handleVaultRedeem
   FunctionDefinition._handleVaultWithdraw
   FunctionDefinition._handleVaultConvertToShares
   FunctionDefinition._handleVaultConvertToAssets
   VariableDeclaration.__gap
   
   Suggested order:
   VariableDeclaration._approvedSwapTokens
   VariableDeclaration.__gap
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition.dispatch
   FunctionDefinition._handleSwap
   FunctionDefinition._handlePullToken
   FunctionDefinition._handlePullTokenFrom
   FunctionDefinition._handlePushToken
   FunctionDefinition._handlePushTokenFrom
   FunctionDefinition._handleSweepTokens
   FunctionDefinition._handleWrapETH
   FunctionDefinition._handleUnwrapETH
   FunctionDefinition._handlePullTokenWithPermit
   FunctionDefinition._handleVaultDeposit
   FunctionDefinition._handleVaultMint
   FunctionDefinition._handleVaultRedeem
   FunctionDefinition._handleVaultWithdraw
   FunctionDefinition._handleVaultConvertToShares
   FunctionDefinition._handleVaultConvertToAssets

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultRouter.sol)

```solidity
File: contracts/core/hooks/swappers/UseUnifiedSwapper.sol

1: 
   Current order:
   UsingForDirective.IERC20
   ErrorDefinition.InvalidRouter
   ErrorDefinition.RouteAlreadyAuthorized
   ErrorDefinition.RouteNotAuthorized
   ErrorDefinition.FailedToApproveAllowance
   ErrorDefinition.InvalidProvider
   EnumDefinition.SwapProvider
   StructDefinition.RouteInfo
   VariableDeclaration._routes
   FunctionDefinition._key
   FunctionDefinition.enableRoute
   FunctionDefinition.disableRoute
   FunctionDefinition.isRouteEnabled
   FunctionDefinition.swap
   FunctionDefinition.constructor
   FunctionDefinition.test__swap
   
   Suggested order:
   UsingForDirective.IERC20
   VariableDeclaration._routes
   EnumDefinition.SwapProvider
   StructDefinition.RouteInfo
   ErrorDefinition.InvalidRouter
   ErrorDefinition.RouteAlreadyAuthorized
   ErrorDefinition.RouteNotAuthorized
   ErrorDefinition.FailedToApproveAllowance
   ErrorDefinition.InvalidProvider
   FunctionDefinition._key
   FunctionDefinition.enableRoute
   FunctionDefinition.disableRoute
   FunctionDefinition.isRouteEnabled
   FunctionDefinition.swap
   FunctionDefinition.constructor
   FunctionDefinition.test__swap

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/swappers/UseUnifiedSwapper.sol)

```solidity
File: contracts/core/router/Commands.sol

1: 
   Current order:
   VariableDeclaration.V3_UNISWAP_SWAP
   VariableDeclaration.PULL_TOKEN
   VariableDeclaration.PULL_TOKEN_FROM
   VariableDeclaration.PUSH_TOKEN
   VariableDeclaration.PUSH_TOKEN_FROM
   VariableDeclaration.SWEEP_TOKENS
   VariableDeclaration.WRAP_ETH
   VariableDeclaration.UNWRAP_ETH
   VariableDeclaration.PULL_TOKEN_WITH_PERMIT
   VariableDeclaration.ERC4626_VAULT_DEPOSIT
   VariableDeclaration.ERC4626_VAULT_MINT
   VariableDeclaration.ERC4626_VAULT_REDEEM
   VariableDeclaration.ERC4626_VAULT_WITHDRAW
   VariableDeclaration.ERC4626_VAULT_CONVERT_TO_SHARES
   VariableDeclaration.ERC4626_VAULT_CONVERT_TO_ASSETS
   VariableDeclaration.AERODROME_SWAP
   VariableDeclaration.V2_UNISWAP_SWAP
   VariableDeclaration.THIRTY_TWO_BITS_MASK
   ErrorDefinition.InvalidMappingIndex
   ErrorDefinition.InvalidPosition
   VariableDeclaration.INDEX_SLOT_SIZE
   VariableDeclaration.CALL_STACK_SIZE
   VariableDeclaration.INDEX_SLOT_MASK
   FunctionDefinition.pullInputParam
   FunctionDefinition.pushOutputParam
   
   Suggested order:
   VariableDeclaration.V3_UNISWAP_SWAP
   VariableDeclaration.PULL_TOKEN
   VariableDeclaration.PULL_TOKEN_FROM
   VariableDeclaration.PUSH_TOKEN
   VariableDeclaration.PUSH_TOKEN_FROM
   VariableDeclaration.SWEEP_TOKENS
   VariableDeclaration.WRAP_ETH
   VariableDeclaration.UNWRAP_ETH
   VariableDeclaration.PULL_TOKEN_WITH_PERMIT
   VariableDeclaration.ERC4626_VAULT_DEPOSIT
   VariableDeclaration.ERC4626_VAULT_MINT
   VariableDeclaration.ERC4626_VAULT_REDEEM
   VariableDeclaration.ERC4626_VAULT_WITHDRAW
   VariableDeclaration.ERC4626_VAULT_CONVERT_TO_SHARES
   VariableDeclaration.ERC4626_VAULT_CONVERT_TO_ASSETS
   VariableDeclaration.AERODROME_SWAP
   VariableDeclaration.V2_UNISWAP_SWAP
   VariableDeclaration.THIRTY_TWO_BITS_MASK
   VariableDeclaration.INDEX_SLOT_SIZE
   VariableDeclaration.CALL_STACK_SIZE
   VariableDeclaration.INDEX_SLOT_MASK
   ErrorDefinition.InvalidMappingIndex
   ErrorDefinition.InvalidPosition
   FunctionDefinition.pullInputParam
   FunctionDefinition.pushOutputParam

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/router/Commands.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageAAVEv3.sol

1: 
   Current order:
   UsingForDirective.ERC20
   UsingForDirective.AddressUpgradeable
   UsingForDirective.AddressUpgradeable
   ErrorDefinition.FailedToApproveAllowanceForAAVE
   ErrorDefinition.InvalidAAVEEMode
   ErrorDefinition.FailedToRepayDebt
   ErrorDefinition.InvalidWithdrawAmount
   UsingForDirective.MathLibrary
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition.getBalances
   FunctionDefinition._supply
   FunctionDefinition._supplyAndBorrow
   FunctionDefinition._repay
   FunctionDefinition._withdraw
   
   Suggested order:
   UsingForDirective.ERC20
   UsingForDirective.AddressUpgradeable
   UsingForDirective.AddressUpgradeable
   UsingForDirective.MathLibrary
   ErrorDefinition.FailedToApproveAllowanceForAAVE
   ErrorDefinition.InvalidAAVEEMode
   ErrorDefinition.FailedToRepayDebt
   ErrorDefinition.InvalidWithdrawAmount
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition.getBalances
   FunctionDefinition._supply
   FunctionDefinition._supplyAndBorrow
   FunctionDefinition._repay
   FunctionDefinition._withdraw

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageMorphoBlue.sol

1: 
   Current order:
   UsingForDirective.ERC20
   UsingForDirective.IMorpho
   UsingForDirective.IMorpho
   UsingForDirective.MarketParams
   UsingForDirective.MathLibrary
   UsingForDirective.SharesMathLib
   StructDefinition.StrategyLeverageMorphoParams
   ErrorDefinition.InvalidMorphoBlueContract
   ErrorDefinition.FailedToRepayDebt
   ErrorDefinition.InvalidMorphoBlueMarket
   VariableDeclaration._marketParams
   VariableDeclaration._morpho
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition.getBalances
   FunctionDefinition._supply
   FunctionDefinition._supplyAndBorrow
   FunctionDefinition._repay
   FunctionDefinition._withdraw
   
   Suggested order:
   UsingForDirective.ERC20
   UsingForDirective.IMorpho
   UsingForDirective.IMorpho
   UsingForDirective.MarketParams
   UsingForDirective.MathLibrary
   UsingForDirective.SharesMathLib
   VariableDeclaration._marketParams
   VariableDeclaration._morpho
   StructDefinition.StrategyLeverageMorphoParams
   ErrorDefinition.InvalidMorphoBlueContract
   ErrorDefinition.FailedToRepayDebt
   ErrorDefinition.InvalidMorphoBlueMarket
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition.getBalances
   FunctionDefinition._supply
   FunctionDefinition._supplyAndBorrow
   FunctionDefinition._repay
   FunctionDefinition._withdraw

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageMorphoBlue.sol)

```solidity
File: contracts/core/strategies/StrategySupplyBase.sol

1: 
   Current order:
   UsingForDirective.ERC20
   UsingForDirective.MathLibrary
   ErrorDefinition.FailedToApproveAllowanceForAAVE
   ErrorDefinition.ZeroAddress
   ErrorDefinition.ZeroAmount
   ErrorDefinition.InsufficientBalance
   ErrorDefinition.WithdrawalValueMismatch
   VariableDeclaration._asset
   VariableDeclaration._deployedAmount
   FunctionDefinition.constructor
   FunctionDefinition._deploy
   FunctionDefinition._undeploy
   FunctionDefinition._getBalance
   FunctionDefinition.deploy
   FunctionDefinition.harvest
   FunctionDefinition.undeploy
   FunctionDefinition.totalAssets
   FunctionDefinition.asset
   FunctionDefinition.getBalance
   
   Suggested order:
   UsingForDirective.ERC20
   UsingForDirective.MathLibrary
   VariableDeclaration._asset
   VariableDeclaration._deployedAmount
   ErrorDefinition.FailedToApproveAllowanceForAAVE
   ErrorDefinition.ZeroAddress
   ErrorDefinition.ZeroAmount
   ErrorDefinition.InsufficientBalance
   ErrorDefinition.WithdrawalValueMismatch
   FunctionDefinition.constructor
   FunctionDefinition._deploy
   FunctionDefinition._undeploy
   FunctionDefinition._getBalance
   FunctionDefinition.deploy
   FunctionDefinition.harvest
   FunctionDefinition.undeploy
   FunctionDefinition.totalAssets
   FunctionDefinition.asset
   FunctionDefinition.getBalance

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyBase.sol)

```solidity
File: contracts/core/strategies/StrategySupplyERC4626.sol

1: 
   Current order:
   UsingForDirective.ERC20
   ErrorDefinition.InvalidVault
   VariableDeclaration._vault
   FunctionDefinition.constructor
   FunctionDefinition._deploy
   FunctionDefinition._undeploy
   FunctionDefinition._getBalance
   
   Suggested order:
   UsingForDirective.ERC20
   VariableDeclaration._vault
   ErrorDefinition.InvalidVault
   FunctionDefinition.constructor
   FunctionDefinition._deploy
   FunctionDefinition._undeploy
   FunctionDefinition._getBalance

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyERC4626.sol)

```solidity
File: contracts/core/strategies/StrategySupplyMorpho.sol

1: 
   Current order:
   UsingForDirective.ERC20
   UsingForDirective.SharesMathLib
   UsingForDirective.MarketParams
   UsingForDirective.IMorpho
   UsingForDirective.IMorpho
   ErrorDefinition.FailedToApproveAllowanceForMorpho
   ErrorDefinition.InvalidMorphoBlueContract
   VariableDeclaration._marketParams
   VariableDeclaration._morpho
   FunctionDefinition.constructor
   FunctionDefinition._deploy
   FunctionDefinition._undeploy
   FunctionDefinition._getBalance
   
   Suggested order:
   UsingForDirective.ERC20
   UsingForDirective.SharesMathLib
   UsingForDirective.MarketParams
   UsingForDirective.IMorpho
   UsingForDirective.IMorpho
   VariableDeclaration._marketParams
   VariableDeclaration._morpho
   ErrorDefinition.FailedToApproveAllowanceForMorpho
   ErrorDefinition.InvalidMorphoBlueContract
   FunctionDefinition.constructor
   FunctionDefinition._deploy
   FunctionDefinition._undeploy
   FunctionDefinition._getBalance

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyMorpho.sol)

### <a name="NC-21"></a>[NC-21] Use Underscores for Number Literals (add an underscore every 3 digits)

*Instances (3)*:

```solidity
File: contracts/core/MultiStrategy.sol

47:     uint16 public constant MAX_TOTAL_WEIGHT = 10000;

78:         if (_totalWeight > 10000) revert InvalidWeights();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/VaultBase.sol

56:     uint256 private constant _MINIMUM_SHARE_BALANCE = 1000;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

### <a name="NC-22"></a>[NC-22] Internal and private variables and functions names should begin with an underscore

According to the Solidity Style Guide, Non-`external` variable and function names should begin with an [underscore](https://docs.soliditylang.org/en/latest/style-guide.html#underscore-prefix-for-non-external-functions-and-variables)

*Instances (13)*:

```solidity
File: contracts/core/MultiCommand.sol

56:     function dispatch(

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiCommand.sol)

```solidity
File: contracts/core/VaultRouter.sol

78:     function dispatch(

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultRouter.sol)

```solidity
File: contracts/core/hooks/UseOracle.sol

18:     function oracle() internal view returns (IOracle) {

22:     function getLastPrice() internal view returns (IOracle.Price memory) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseOracle.sol)

```solidity
File: contracts/core/hooks/UsePermitTransfers.sol

21:     function pullTokensWithPermit(

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UsePermitTransfers.sol)

```solidity
File: contracts/core/hooks/UseTokenActions.sol

39:     function pullToken(IERC20 token, uint256 amount) internal virtual {

54:     function pullTokenFrom(IERC20 token, address from, uint256 amount) internal virtual {

69:     function pushToken(IERC20 token, address to, uint256 amount) internal virtual {

85:     function pushTokenFrom(IERC20 token, address from, address to, uint256 amount) internal virtual {

101:     function sweepTokens(IERC20 token, address to) internal virtual returns (uint256 sweptAmount) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseTokenActions.sol)

```solidity
File: contracts/core/hooks/swappers/UseUnifiedSwapper.sol

115:     function swap(SwapParams memory params) internal virtual override returns (uint256 amountIn, uint256 amountOut) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/swappers/UseUnifiedSwapper.sol)

```solidity
File: contracts/core/router/Commands.sol

65:     function pullInputParam(

97:     function pushOutputParam(

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/router/Commands.sol)

### <a name="NC-23"></a>[NC-23] `public` functions not called by the contract should be declared `external` instead

*Instances (14)*:

```solidity
File: contracts/core/MultiStrategy.sol

85:     function setWeights(uint16[] memory iweights) public onlyRole(VAULT_MANAGER_ROLE) {

134:     function totalWeight() public view returns (uint16) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/MultiStrategyVault.sol

78:     function initialize(

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

```solidity
File: contracts/core/Vault.sol

83:     function initialize(

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/VaultRouter.sol

49:     function initialize(address initialOwner, IWETH weth) public initializer {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultRouter.sol)

```solidity
File: contracts/core/hooks/UsePermitTransfers.sol

51:     function test__pullTokensWithPermit(

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UsePermitTransfers.sol)

```solidity
File: contracts/core/hooks/UseTokenActions.sol

114:     function test__pullToken(IERC20 token, uint256 amount) public {

118:     function test__pullTokenFrom(IERC20 token, address from, uint256 amount) public {

122:     function test__pushToken(IERC20 token, address to, uint256 amount) public {

126:     function test__pushTokenFrom(IERC20 token, address from, address to, uint256 amount) public {

130:     function test__sweepTokens(IERC20 token, address to) public returns (uint256) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseTokenActions.sol)

```solidity
File: contracts/core/hooks/swappers/UseUnifiedSwapper.sol

101:     function isRouteEnabled(address tokenIn, address tokenOut) public view returns (bool) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/swappers/UseUnifiedSwapper.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageAAVEv3.sol

45:     function initialize(

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageMorphoBlue.sol

78:     function initialize(

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageMorphoBlue.sol)

### <a name="NC-24"></a>[NC-24] Variables need not be initialized to zero

The default value for variables is zero, so initializing them to zero is superfluous.

*Instances (20)*:

```solidity
File: contracts/core/MultiCommand.sol

78:         for (uint256 commandIndex = 0; commandIndex < numCommands; ) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiCommand.sol)

```solidity
File: contracts/core/MultiStrategy.sol

74:         for (uint256 i = 0; i < istrategies.length; i++) {

90:         for (uint256 i = 0; i < iweights.length; ) {

145:         for (uint256 i = 0; i < _strategies.length; ) {

163:         uint256 totalAssets = 0;

166:         for (uint256 i = 0; i < strategiesLength; i++) {

171:         for (uint256 i = 0; i < strategiesLength; i++) {

182:         for (uint256 i = 0; i < _strategies.length; ) {

193:         for (uint256 i = 0; i < _strategies.length; i++) {

215:         for (uint256 i = 0; i < totalStrategies; i++) {

232:             uint256 highestWeightIndex = 0;

233:             uint16 highestWeight = 0;

234:             for (uint256 i = 0; i < totalStrategies; i++) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/MultiStrategyVault.sol

94:         for (uint256 i = 0; i < istrategies.length; i++) {

177:         for (uint256 i = 0; i < numCommands; ) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

```solidity
File: contracts/core/Vault.sol

180:         for (uint256 i = 0; i < numCommands; ) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/VaultBase.sol

394:         uint256 fee = 0;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageMorphoBlue.sol

164:         uint256 shares = 0;

165:         uint256 amountPaid = 0;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageMorphoBlue.sol)

```solidity
File: contracts/core/strategies/StrategySupplyMorpho.sol

73:         uint256 assetsWithdrawn = 0;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyMorpho.sol)

## Low Issues

| |Issue|Instances|
|-|:-|:-:|
| [L-1](#L-1) | `approve()`/`safeApprove()` may revert if the current approval is not zero | 13 |
| [L-2](#L-2) | Use a 2-step ownership transfer pattern | 2 |
| [L-3](#L-3) | Some tokens may revert when zero value transfers are made | 13 |
| [L-4](#L-4) | USDC stablecoin centralization risk | 6 |
| [L-5](#L-5) | `decimals()` is not a part of the ERC-20 standard | 5 |
| [L-6](#L-6) | Deprecated approve() function | 8 |
| [L-7](#L-7) | Do not use deprecated library functions | 6 |
| [L-8](#L-8) | `safeApprove()` is deprecated | 3 |
| [L-9](#L-9) | Deprecated _setupRole() function | 3 |
| [L-10](#L-10) | Division by zero not prevented | 6 |
| [L-11](#L-11) | Duplicate import statements | 2 |
| [L-12](#L-12) | External calls in an un-bounded `for-`loop may result in a DOS | 2 |
| [L-13](#L-13) | Initializers could be front-run | 11 |
| [L-14](#L-14) | Prevent accidentally burning tokens | 4 |
| [L-15](#L-15) | Possible rounding issue | 4 |
| [L-16](#L-16) | `pragma experimental ABIEncoderV2` is deprecated | 1 |
| [L-17](#L-17) | Loss of precision | 8 |
| [L-18](#L-18) | Solidity version 0.8.20+ may not work on other chains due to `PUSH0` | 10 |
| [L-19](#L-19) | Use `Ownable2Step.transferOwnership` instead of `Ownable.transferOwnership` | 4 |
| [L-20](#L-20) | Sweeping may break accounting if tokens with multiple addresses are used | 8 |
| [L-21](#L-21) | Consider using OpenZeppelin's SafeCast library to prevent unexpected overflows when downcasting | 3 |
| [L-22](#L-22) | Unsafe ERC20 operation(s) | 13 |
| [L-23](#L-23) | Upgradeable contract is missing a `__gap[50]` storage variable to allow for new storage variables in later versions | 37 |
| [L-24](#L-24) | Upgradeable contract not initialized | 62 |

### <a name="L-1"></a>[L-1] `approve()`/`safeApprove()` may revert if the current approval is not zero

- Some tokens (like the *very popular* USDT) do not work when changing the allowance from an existing non-zero allowance value (it will revert if the current approval is not zero to protect against front-running changes of approvals). These tokens must first be approved for zero and then the actual allowance can be approved.
- Furthermore, OZ's implementation of safeApprove would throw an error if an approve is attempted from a non-zero value (`"SafeERC20: approve from non-zero to non-zero allowance"`)

Set the allowance to zero immediately before each of the existing allowance calls

*Instances (13)*:

```solidity
File: contracts/core/MultiStrategyVault.sol

98:             IERC20Upgradeable(iAsset).safeApprove(address(istrategies[i]), type(uint256).max); // Approves the strategy to spend the maximum amount of the asset

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

```solidity
File: contracts/core/Vault.sol

124:         IERC20Upgradeable(_strategyAsset).safeApprove(address(_strategy), assets);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/hooks/swappers/UseUnifiedSwapper.sol

71:         if (!IERC20(tokenIn).approve(routeInfo.router, type(uint256).max - 1)) revert FailedToApproveAllowance();

73:         if (!IERC20(tokenOut).approve(routeInfo.router, type(uint256).max - 1)) revert FailedToApproveAllowance();

89:         if (!IERC20(tokenIn).approve(_routes[key].router, 0)) revert FailedToApproveAllowance();

90:         if (!IERC20(tokenOut).approve(_routes[key].router, 0)) revert FailedToApproveAllowance();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/swappers/UseUnifiedSwapper.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageAAVEv3.sol

86:         if (!ERC20(_collateralToken).approve(aaveV3A(), amountIn)) revert FailedToApproveAllowanceForAAVE();

106:         if (!ERC20(_debtToken).approve(aaveV3A(), amount)) revert FailedToApproveAllowanceForAAVE();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageMorphoBlue.sol

135:         if (!ERC20(_collateralToken).approve(address(_morpho), amountIn)) revert FailedToApproveAllowance();

160:         if (!ERC20(_debtToken).approve(address(_morpho), amount)) revert FailedToApproveAllowance();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageMorphoBlue.sol)

```solidity
File: contracts/core/strategies/StrategySupplyAAVEv3.sol

37:         if (!ERC20(asset_).approve(aavev3Address, type(uint256).max)) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategySupplyERC4626.sol

37:         ERC20(asset_).safeApprove(vault_, type(uint256).max);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyERC4626.sol)

```solidity
File: contracts/core/strategies/StrategySupplyMorpho.sol

55:         if (!ERC20(asset_).approve(morphoBlue, type(uint256).max)) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyMorpho.sol)

### <a name="L-2"></a>[L-2] Use a 2-step ownership transfer pattern

Recommend considering implementing a two step process where the owner or admin nominates an account and the nominated account needs to call an `acceptOwnership()` function for the transfer of ownership to fully succeed. This ensures the nominated EOA account is a valid and active account. Lack of two-step procedure for critical operations leaves them error-prone. Consider adding two step procedure on the critical functions.

*Instances (2)*:

```solidity
File: contracts/core/hooks/swappers/UseUnifiedSwapper.sol

29: abstract contract UseUnifiedSwapper is ISwapHandler, GovernableOwnable {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/swappers/UseUnifiedSwapper.sol)

```solidity
File: contracts/core/strategies/StrategySupplyBase.sol

20: abstract contract StrategySupplyBase is IStrategy, ReentrancyGuard, Ownable {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyBase.sol)

### <a name="L-3"></a>[L-3] Some tokens may revert when zero value transfers are made

Example: <https://github.com/d-xo/weird-erc20#revert-on-zero-value-transfers>.

In spite of the fact that EIP-20 [states](https://github.com/ethereum/EIPs/blob/46b9b698815abbfa628cd1097311deee77dd45c5/EIPS/eip-20.md?plain=1#L116) that zero-valued transfers must be accepted, some tokens, such as LEND will revert if this is attempted, which may cause transactions that involve other tokens (such as batch operations) to fully revert. Consider skipping the transfer if the amount is zero, which will also save gas.

*Instances (13)*:

```solidity
File: contracts/core/VaultBase.sol

180:         IERC20Upgradeable(_asset()).safeTransferFrom(msg.sender, address(this), assets);

227:         IERC20Upgradeable(_asset()).safeTransferFrom(msg.sender, address(this), assets);

413:                 IERC20Upgradeable(_asset()).transfer(receiver, amount - fee);

414:                 IERC20Upgradeable(_asset()).transfer(getFeeReceiver(), fee);

421:                 IERC20Upgradeable(_asset()).transfer(receiver, amount);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/hooks/UsePermitTransfers.sol

34:         IERC20(address(token)).safeTransferFrom(owner, address(this), amount);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UsePermitTransfers.sol)

```solidity
File: contracts/core/hooks/UseTokenActions.sol

45:         IERC20(token).safeTransferFrom(msg.sender, address(this), amount);

60:         IERC20(token).safeTransferFrom(from, address(this), amount);

75:         IERC20(token).safeTransfer(to, amount);

93:         IERC20(token).safeTransferFrom(from, to, amount);

109:         IERC20(token).safeTransfer(to, sweptAmount);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseTokenActions.sol)

```solidity
File: contracts/core/strategies/StrategySupplyBase.sol

73:         ERC20(_asset).safeTransferFrom(msg.sender, address(this), amount);

122:         ERC20(_asset).safeTransfer(msg.sender, withdrawalValue);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyBase.sol)

### <a name="L-4"></a>[L-4] USDC stablecoin centralization risk

USDC is a centralized stablecoin that can be controlled by operators outside of the protocol. For example, the USDC operator can call the blacklist function with the protocol's Proxy contract address or a user's address.

**Recommendation**
If possible, use a decentralized stablecoin as the lending token.

*Instances (6)*:

```solidity
File: contracts/core/MultiStrategyVault.sol

98:             IERC20Upgradeable(iAsset).safeApprove(address(istrategies[i]), type(uint256).max); // Approves the strategy to spend the maximum amount of the asset

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

```solidity
File: contracts/core/Vault.sol

124:         IERC20Upgradeable(_strategyAsset).safeApprove(address(_strategy), assets);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/VaultBase.sol

97:         _setupRole(ADMIN_ROLE, initialOwner);

98:         _setupRole(VAULT_MANAGER_ROLE, initialOwner);

99:         _setupRole(PAUSER_ROLE, initialOwner);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/strategies/StrategySupplyERC4626.sol

37:         ERC20(asset_).safeApprove(vault_, type(uint256).max);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyERC4626.sol)

### <a name="L-5"></a>[L-5] `decimals()` is not a part of the ERC-20 standard

The `decimals()` function is not a part of the [ERC-20 standard](https://eips.ethereum.org/EIPS/eip-20), and was added later as an [optional extension](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/IERC20Metadata.sol). As such, some valid ERC20 tokens do not support this interface, so it is unsafe to blindly cast all tokens to this interface, and then call this function.

*Instances (5)*:

```solidity
File: contracts/core/strategies/StrategyLeverageAAVEv3.sol

73:         uint8 debtDecimals = ERC20(debtReserve.variableDebtTokenAddress).decimals();

74:         uint8 collateralDecimals = ERC20(collateralReserve.aTokenAddress).decimals();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageMorphoBlue.sol

122:         uint8 debtDecimals = ERC20(_marketParams.loanToken).decimals();

123:         uint8 collateralDecimals = ERC20(_marketParams.collateralToken).decimals();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageMorphoBlue.sol)

```solidity
File: contracts/core/strategies/StrategySupplyAAVEv3.sol

59:         uint8 reserveDecimals = ERC20(reserve.aTokenAddress).decimals();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyAAVEv3.sol)

### <a name="L-6"></a>[L-6] Deprecated approve() function

Due to the inheritance of ERC20's approve function, there's a vulnerability to the ERC20 approve and double spend front running attack. Briefly, an authorized spender could spend both allowances by front running an allowance-changing transaction. Consider implementing OpenZeppelin's `.safeApprove()` function to help mitigate this.

*Instances (8)*:

```solidity
File: contracts/core/hooks/swappers/UseUnifiedSwapper.sol

71:         if (!IERC20(tokenIn).approve(routeInfo.router, type(uint256).max - 1)) revert FailedToApproveAllowance();

73:         if (!IERC20(tokenOut).approve(routeInfo.router, type(uint256).max - 1)) revert FailedToApproveAllowance();

89:         if (!IERC20(tokenIn).approve(_routes[key].router, 0)) revert FailedToApproveAllowance();

90:         if (!IERC20(tokenOut).approve(_routes[key].router, 0)) revert FailedToApproveAllowance();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/swappers/UseUnifiedSwapper.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageAAVEv3.sol

86:         if (!ERC20(_collateralToken).approve(aaveV3A(), amountIn)) revert FailedToApproveAllowanceForAAVE();

106:         if (!ERC20(_debtToken).approve(aaveV3A(), amount)) revert FailedToApproveAllowanceForAAVE();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageMorphoBlue.sol

135:         if (!ERC20(_collateralToken).approve(address(_morpho), amountIn)) revert FailedToApproveAllowance();

160:         if (!ERC20(_debtToken).approve(address(_morpho), amount)) revert FailedToApproveAllowance();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageMorphoBlue.sol)

### <a name="L-7"></a>[L-7] Do not use deprecated library functions

*Instances (6)*:

```solidity
File: contracts/core/MultiStrategyVault.sol

98:             IERC20Upgradeable(iAsset).safeApprove(address(istrategies[i]), type(uint256).max); // Approves the strategy to spend the maximum amount of the asset

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

```solidity
File: contracts/core/Vault.sol

124:         IERC20Upgradeable(_strategyAsset).safeApprove(address(_strategy), assets);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/VaultBase.sol

97:         _setupRole(ADMIN_ROLE, initialOwner);

98:         _setupRole(VAULT_MANAGER_ROLE, initialOwner);

99:         _setupRole(PAUSER_ROLE, initialOwner);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/strategies/StrategySupplyERC4626.sol

37:         ERC20(asset_).safeApprove(vault_, type(uint256).max);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyERC4626.sol)

### <a name="L-8"></a>[L-8] `safeApprove()` is deprecated

[Deprecated](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/bfff03c0d2a59bcd8e2ead1da9aed9edf0080d05/contracts/token/ERC20/utils/SafeERC20.sol#L38-L45) in favor of `safeIncreaseAllowance()` and `safeDecreaseAllowance()`. If only setting the initial allowance to the value that means infinite, `safeIncreaseAllowance()` can be used instead. The function may currently work, but if a bug is found in this version of OpenZeppelin, and the version that you're forced to upgrade to no longer has this function, you'll encounter unnecessary delays in porting and testing replacement contracts.

*Instances (3)*:

```solidity
File: contracts/core/MultiStrategyVault.sol

98:             IERC20Upgradeable(iAsset).safeApprove(address(istrategies[i]), type(uint256).max); // Approves the strategy to spend the maximum amount of the asset

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

```solidity
File: contracts/core/Vault.sol

124:         IERC20Upgradeable(_strategyAsset).safeApprove(address(_strategy), assets);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/strategies/StrategySupplyERC4626.sol

37:         ERC20(asset_).safeApprove(vault_, type(uint256).max);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyERC4626.sol)

### <a name="L-9"></a>[L-9] Deprecated _setupRole() function

*Instances (3)*:

```solidity
File: contracts/core/VaultBase.sol

97:         _setupRole(ADMIN_ROLE, initialOwner);

98:         _setupRole(VAULT_MANAGER_ROLE, initialOwner);

99:         _setupRole(PAUSER_ROLE, initialOwner);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

### <a name="L-10"></a>[L-10] Division by zero not prevented

The divisions below take an input parameter which does not have any zero-value checks, which may lead to the functions reverting when zero is passed.

*Instances (6)*:

```solidity
File: contracts/core/MultiStrategy.sol

146:             uint256 fractAmount = (amount * _weights[i]) / _totalWeight;

172:             uint256 fractAmount = (amount * currentAssets[i]) / totalAssets;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/VaultBase.sol

251:             uint256 depositInAssets = (balanceOf(msg.sender) * _ONE) / tokenPerAsset();

390:         uint256 withdrawAmount = (shares * totalAssets()) / totalSupply();

476:         return (totalSupply() * _ONE) / totalAssetsValue;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/hooks/UseLeverage.sol

78:         delta = (numerator * PERCENTAGE_PRECISION) / divisor;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseLeverage.sol)

### <a name="L-11"></a>[L-11] Duplicate import statements

*Instances (2)*:

```solidity
File: contracts/core/VaultBase.sol

9: import {PERCENTAGE_PRECISION} from "./Constants.sol";

17: import {ADMIN_ROLE, VAULT_MANAGER_ROLE, PAUSER_ROLE} from "./Constants.sol";

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

### <a name="L-12"></a>[L-12] External calls in an un-bounded `for-`loop may result in a DOS

Consider limiting the number of iterations in for-loops that make external calls

*Instances (2)*:

```solidity
File: contracts/core/MultiStrategy.sol

221:                 uint256 balanceOf = IERC20(_strategies[indexes[i]].asset()).balanceOf(address(this));

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/MultiStrategyVault.sol

96:             if (istrategies[i].asset() != iAsset) revert InvalidAsset(); // Reverts if the strategy asset does not match the vault asset

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

### <a name="L-13"></a>[L-13] Initializers could be front-run

Initializers could be front-run, allowing an attacker to either set their own values, take ownership of the contract, and in the best case forcing a re-deployment

*Instances (11)*:

```solidity
File: contracts/core/MultiStrategyVault.sol

78:     function initialize(

86:     ) public initializer {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

```solidity
File: contracts/core/Vault.sol

83:     function initialize(

90:     ) public initializer {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/VaultBase.sol

92:         __ERC20_init(tokenName, tokenSymbol);

96:         __AccessControl_init();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/VaultRouter.sol

49:     function initialize(address initialOwner, IWETH weth) public initializer {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultRouter.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageAAVEv3.sol

45:     function initialize(

54:     ) public initializer {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageMorphoBlue.sol

78:     function initialize(

82:     ) public initializer {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageMorphoBlue.sol)

### <a name="L-14"></a>[L-14] Prevent accidentally burning tokens

Minting and burning tokens to address(0) prevention

*Instances (4)*:

```solidity
File: contracts/core/VaultBase.sol

146:                 _mint(feeReceiver, sharesToMint);

267:         _mint(receiver, shares);

402:         _burn(msg.sender, shares);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/VaultRouter.sol

397:         uint256 assets = mintVault(vault, shares, receiver);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultRouter.sol)

### <a name="L-15"></a>[L-15] Possible rounding issue

Division by large numbers may result in the result being zero, due to solidity not supporting fractions. Consider requiring a minimum amount for the numerator to ensure that it is always larger than the denominator. Also, there is indication of multiplication and division without the use of parenthesis which could result in issues.

*Instances (4)*:

```solidity
File: contracts/core/MultiStrategy.sol

146:             uint256 fractAmount = (amount * _weights[i]) / _totalWeight;

172:             uint256 fractAmount = (amount * currentAssets[i]) / totalAssets;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/VaultBase.sol

390:         uint256 withdrawAmount = (shares * totalAssets()) / totalSupply();

476:         return (totalSupply() * _ONE) / totalAssetsValue;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

### <a name="L-16"></a>[L-16] `pragma experimental ABIEncoderV2` is deprecated

Use `pragma abicoder v2` [instead](https://github.com/ethereum/solidity/blob/69411436139acf5dbcfc5828446f18b9fcfee32c/docs/080-breaking-changes.rst#silent-changes-of-the-semantics)

*Instances (1)*:

```solidity
File: contracts/core/hooks/UseOracle.sol

3: pragma experimental ABIEncoderV2;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseOracle.sol)

### <a name="L-17"></a>[L-17] Loss of precision

Division by large numbers may result in the result being zero, due to solidity not supporting fractions. Consider requiring a minimum amount for the numerator to ensure that it is always larger than the denominator

*Instances (8)*:

```solidity
File: contracts/core/MultiStrategy.sol

146:             uint256 fractAmount = (amount * _weights[i]) / _totalWeight;

172:             uint256 fractAmount = (amount * currentAssets[i]) / totalAssets;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/VaultBase.sol

390:         uint256 withdrawAmount = (shares * totalAssets()) / totalSupply();

476:         return (totalSupply() * _ONE) / totalAssetsValue;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/hooks/UseLeverage.sol

29:             uint256 inc = (prev * loanToValue) / PERCENTAGE_PRECISION;

56:         deltaDebtInETH = (totalDebtBaseInEth * percentageToBurn) / PERCENTAGE_PRECISION;

58:         deltaCollateralInETH = (totalCollateralBaseInEth * percentageToBurn) / PERCENTAGE_PRECISION;

73:         uint256 colValue = ((targetLoanToValue * collateral) / PERCENTAGE_PRECISION);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseLeverage.sol)

### <a name="L-18"></a>[L-18] Solidity version 0.8.20+ may not work on other chains due to `PUSH0`

The compiler for Solidity 0.8.20 switches the default target EVM version to [Shanghai](https://blog.soliditylang.org/2023/05/10/solidity-0.8.20-release-announcement/#important-note), which includes the new `PUSH0` op code. This op code may not yet be implemented on all L2s, so deployment on these chains will fail. To work around this issue, use an earlier [EVM](https://docs.soliditylang.org/en/v0.8.20/using-the-compiler.html?ref=zaryabs.com#setting-the-evm-version-to-target) [version](https://book.getfoundry.sh/reference/config/solidity-compiler#evm_version). While the project itself may or may not compile with 0.8.20, other projects with which it integrates, or which extend this project may, and those projects will have problems deploying these contracts/libraries.

*Instances (10)*:

```solidity
File: contracts/core/MultiStrategyVault.sol

2: pragma solidity ^0.8.24;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

```solidity
File: contracts/core/Vault.sol

2: pragma solidity ^0.8.24;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/VaultRouter.sol

2: pragma solidity ^0.8.24;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultRouter.sol)

```solidity
File: contracts/core/hooks/UseLeverage.sol

2: pragma solidity ^0.8.24;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseLeverage.sol)

```solidity
File: contracts/core/router/Commands.sol

2: pragma solidity ^0.8.24;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/router/Commands.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageAAVEv3.sol

2: pragma solidity ^0.8.24;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageMorphoBlue.sol

2: pragma solidity ^0.8.24;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageMorphoBlue.sol)

```solidity
File: contracts/core/strategies/StrategySupplyAAVEv3.sol

2: pragma solidity ^0.8.24;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategySupplyERC4626.sol

2: pragma solidity ^0.8.24;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyERC4626.sol)

```solidity
File: contracts/core/strategies/StrategySupplyMorpho.sol

2: pragma solidity ^0.8.24;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyMorpho.sol)

### <a name="L-19"></a>[L-19] Use `Ownable2Step.transferOwnership` instead of `Ownable.transferOwnership`

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

*Instances (4)*:

```solidity
File: contracts/core/hooks/swappers/UseUnifiedSwapper.sol

11: import {GovernableOwnable} from "../../GovernableOwnable.sol";

144:         _transferOwnership(msg.sender);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/swappers/UseUnifiedSwapper.sol)

```solidity
File: contracts/core/strategies/StrategySupplyBase.sol

8: import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

43:         _transferOwnership(initialOwner);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyBase.sol)

### <a name="L-20"></a>[L-20] Sweeping may break accounting if tokens with multiple addresses are used

There have been [cases](https://blog.openzeppelin.com/compound-tusd-integration-issue-retrospective/) in the past where a token mistakenly had two addresses that could control its balance, and transfers using one address impacted the balance of the other. To protect against this potential scenario, sweep functions should ensure that the balance of the non-sweepable token does not change after the transfer of the swept tokens.

*Instances (8)*:

```solidity
File: contracts/core/VaultRouter.sol

107:         } else if (actionToExecute == Commands.SWEEP_TOKENS) {

108:             output = _handleSweepTokens(data, callStack, outputMapping);

260:     function _handleSweepTokens(

271:         uint256 sweptAmount = sweepTokens(token, to);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultRouter.sol)

```solidity
File: contracts/core/hooks/UseTokenActions.sol

101:     function sweepTokens(IERC20 token, address to) internal virtual returns (uint256 sweptAmount) {

130:     function test__sweepTokens(IERC20 token, address to) public returns (uint256) {

131:         return sweepTokens(token, to);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseTokenActions.sol)

```solidity
File: contracts/core/router/Commands.sol

18:     uint8 public constant SWEEP_TOKENS = 0x06; // Command to sweep tokens from the contract.

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/router/Commands.sol)

### <a name="L-21"></a>[L-21] Consider using OpenZeppelin's SafeCast library to prevent unexpected overflows when downcasting

Downcasting from `uint256`/`int256` in Solidity does not revert on overflow. This can result in undesired exploitation or bugs, since developers usually assume that overflows raise errors. [OpenZeppelin's SafeCast library](https://docs.openzeppelin.com/contracts/3.x/api/utils#SafeCast) restores this intuition by reverting the transaction when such an operation overflows. Using this library eliminates an entire class of bugs, so it's recommended to use it always. Some exceptions are acceptable like with the classic `uint256(uint160(address(variable)))`

*Instances (3)*:

```solidity
File: contracts/core/VaultRouter.sol

85:         uint32 actionToExecute = uint32(action & Commands.THIRTY_TWO_BITS_MASK);

88:         uint32 inputMapping = uint16((action >> 32) & Commands.THIRTY_TWO_BITS_MASK);

91:         uint32 outputMapping = uint16(((action >> 64) & Commands.THIRTY_TWO_BITS_MASK));

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultRouter.sol)

### <a name="L-22"></a>[L-22] Unsafe ERC20 operation(s)

*Instances (13)*:

```solidity
File: contracts/core/VaultBase.sol

413:                 IERC20Upgradeable(_asset()).transfer(receiver, amount - fee);

414:                 IERC20Upgradeable(_asset()).transfer(getFeeReceiver(), fee);

421:                 IERC20Upgradeable(_asset()).transfer(receiver, amount);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/hooks/swappers/UseUnifiedSwapper.sol

71:         if (!IERC20(tokenIn).approve(routeInfo.router, type(uint256).max - 1)) revert FailedToApproveAllowance();

73:         if (!IERC20(tokenOut).approve(routeInfo.router, type(uint256).max - 1)) revert FailedToApproveAllowance();

89:         if (!IERC20(tokenIn).approve(_routes[key].router, 0)) revert FailedToApproveAllowance();

90:         if (!IERC20(tokenOut).approve(_routes[key].router, 0)) revert FailedToApproveAllowance();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/swappers/UseUnifiedSwapper.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageAAVEv3.sol

86:         if (!ERC20(_collateralToken).approve(aaveV3A(), amountIn)) revert FailedToApproveAllowanceForAAVE();

106:         if (!ERC20(_debtToken).approve(aaveV3A(), amount)) revert FailedToApproveAllowanceForAAVE();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageMorphoBlue.sol

135:         if (!ERC20(_collateralToken).approve(address(_morpho), amountIn)) revert FailedToApproveAllowance();

160:         if (!ERC20(_debtToken).approve(address(_morpho), amount)) revert FailedToApproveAllowance();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageMorphoBlue.sol)

```solidity
File: contracts/core/strategies/StrategySupplyAAVEv3.sol

37:         if (!ERC20(asset_).approve(aavev3Address, type(uint256).max)) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategySupplyMorpho.sol

55:         if (!ERC20(asset_).approve(morphoBlue, type(uint256).max)) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyMorpho.sol)

### <a name="L-23"></a>[L-23] Upgradeable contract is missing a `__gap[50]` storage variable to allow for new storage variables in later versions

See [this](https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps) link for a description of this storage variable. While some contracts may not currently be sub-classed, adding the variable now protects against forgetting to add it in the future.

*Instances (37)*:

```solidity
File: contracts/core/MultiStrategy.sol

5: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

7: import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

18: abstract contract MultiStrategy is Initializable, AccessControlUpgradeable {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/MultiStrategyVault.sol

4: import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

6: import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

44:     using SafeERC20Upgradeable for IERC20Upgradeable;

98:             IERC20Upgradeable(iAsset).safeApprove(address(istrategies[i]), type(uint256).max); // Approves the strategy to spend the maximum amount of the asset

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

```solidity
File: contracts/core/Vault.sol

4: import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

6: import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

62:     using SafeERC20Upgradeable for IERC20Upgradeable;

124:         IERC20Upgradeable(_strategyAsset).safeApprove(address(_strategy), assets);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/VaultBase.sol

4: import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

6: import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

8: import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

10: import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PermitUpgradeable.sol";

12: import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

13: import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

16: import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

30:     AccessControlUpgradeable,

31:     PausableUpgradeable,

32:     ReentrancyGuardUpgradeable,

33:     ERC20Upgradeable,

39:     using SafeERC20Upgradeable for IERC20Upgradeable;

40:     using AddressUpgradeable for address;

41:     using AddressUpgradeable for address payable;

180:         IERC20Upgradeable(_asset()).safeTransferFrom(msg.sender, address(this), assets);

227:         IERC20Upgradeable(_asset()).safeTransferFrom(msg.sender, address(this), assets);

413:                 IERC20Upgradeable(_asset()).transfer(receiver, amount - fee);

414:                 IERC20Upgradeable(_asset()).transfer(getFeeReceiver(), fee);

421:                 IERC20Upgradeable(_asset()).transfer(receiver, amount);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/hooks/UseOracle.sol

6: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseOracle.sol)

```solidity
File: contracts/core/hooks/UseTokenActions.sol

4: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseTokenActions.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageAAVEv3.sol

8: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

11: import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

30:     using AddressUpgradeable for address;

31:     using AddressUpgradeable for address payable;

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageMorphoBlue.sol

4: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageMorphoBlue.sol)

### <a name="L-24"></a>[L-24] Upgradeable contract not initialized

Upgradeable contracts are initialized via an initializer function rather than by a constructor. Leaving such a contract uninitialized may lead to it being taken over by a malicious user

*Instances (62)*:

```solidity
File: contracts/core/MultiStrategy.sol

5: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

7: import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

18: abstract contract MultiStrategy is Initializable, AccessControlUpgradeable {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/MultiStrategyVault.sol

4: import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

6: import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

44:     using SafeERC20Upgradeable for IERC20Upgradeable;

55:         _disableInitializers(); // Prevents the contract from being initialized more than once

78:     function initialize(

86:     ) public initializer {

87:         _initializeBase(initialOwner, tokenName, tokenSymbol, weth); // Initializes the base contract with the provided parameters

88:         _initMultiStrategy(istrategies, iweights); // Initializes the multi-strategy with the provided strategies and weights

98:             IERC20Upgradeable(iAsset).safeApprove(address(istrategies[i]), type(uint256).max); // Approves the strategy to spend the maximum amount of the asset

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

```solidity
File: contracts/core/Vault.sol

4: import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

6: import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

57:         _disableInitializers(); // Prevents the contract from being initialized again

62:     using SafeERC20Upgradeable for IERC20Upgradeable;

83:     function initialize(

90:     ) public initializer {

91:         _initializeBase(initialOwner, tokenName, tokenSymbol, weth); // Initializes the base contract

124:         IERC20Upgradeable(_strategyAsset).safeApprove(address(_strategy), assets);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/VaultBase.sol

4: import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

6: import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

8: import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

10: import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PermitUpgradeable.sol";

12: import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

13: import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

16: import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

30:     AccessControlUpgradeable,

31:     PausableUpgradeable,

32:     ReentrancyGuardUpgradeable,

33:     ERC20Upgradeable,

39:     using SafeERC20Upgradeable for IERC20Upgradeable;

40:     using AddressUpgradeable for address;

41:     using AddressUpgradeable for address payable;

69:         _disableInitializers();

86:     function _initializeBase(

92:         __ERC20_init(tokenName, tokenSymbol);

95:         _initializeVaultSettings();

96:         __AccessControl_init();

180:         IERC20Upgradeable(_asset()).safeTransferFrom(msg.sender, address(this), assets);

227:         IERC20Upgradeable(_asset()).safeTransferFrom(msg.sender, address(this), assets);

413:                 IERC20Upgradeable(_asset()).transfer(receiver, amount - fee);

414:                 IERC20Upgradeable(_asset()).transfer(getFeeReceiver(), fee);

421:                 IERC20Upgradeable(_asset()).transfer(receiver, amount);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/VaultRouter.sol

41:         _disableInitializers();

49:     function initialize(address initialOwner, IWETH weth) public initializer {

50:         initializeUseIERC4626(initialOwner);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultRouter.sol)

```solidity
File: contracts/core/hooks/UseOracle.sol

6: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseOracle.sol)

```solidity
File: contracts/core/hooks/UseTokenActions.sol

4: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseTokenActions.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageAAVEv3.sol

8: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

11: import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

30:     using AddressUpgradeable for address;

31:     using AddressUpgradeable for address payable;

41:         _disableInitializers();

45:     function initialize(

54:     ) public initializer {

55:         _initializeStrategyLeverage(initialOwner, initialGovernor, collateralToken, debtToken, oracle, flashLender);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageMorphoBlue.sol

4: import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

67:         _disableInitializers();

78:     function initialize(

82:     ) public initializer {

84:         _initializeStrategyLeverage(

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageMorphoBlue.sol)

## Medium Issues

| |Issue|Instances|
|-|:-|:-:|
| [M-1](#M-1) | Contracts are vulnerable to fee-on-transfer accounting-related issues | 6 |
| [M-2](#M-2) | Centralization Risk for trusted owners | 12 |
| [M-3](#M-3) | Lack of EIP-712 compliance: using `keccak256()` directly on an array or struct variable | 1 |
| [M-4](#M-4) | Return values of `transfer()`/`transferFrom()` not checked | 3 |
| [M-5](#M-5) | Unsafe use of `transfer()`/`transferFrom()`/`approve()`/ with `IERC20` | 13 |

### <a name="M-1"></a>[M-1] Contracts are vulnerable to fee-on-transfer accounting-related issues

Consistently check account balance before and after transfers for Fee-On-Transfer discrepancies. As arbitrary ERC20 tokens can be used, the amount here should be calculated every time to take into consideration a possible fee-on-transfer or deflation.
Also, it's a good practice for the future of the solution.

Use the balance before and after the transfer to calculate the received amount instead of assuming that it would be equal to the amount passed as a parameter. Or explicitly document that such tokens shouldn't be used and won't be supported

*Instances (6)*:

```solidity
File: contracts/core/VaultBase.sol

180:         IERC20Upgradeable(_asset()).safeTransferFrom(msg.sender, address(this), assets);

227:         IERC20Upgradeable(_asset()).safeTransferFrom(msg.sender, address(this), assets);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/hooks/UsePermitTransfers.sol

34:         IERC20(address(token)).safeTransferFrom(owner, address(this), amount);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UsePermitTransfers.sol)

```solidity
File: contracts/core/hooks/UseTokenActions.sol

45:         IERC20(token).safeTransferFrom(msg.sender, address(this), amount);

60:         IERC20(token).safeTransferFrom(from, address(this), amount);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/UseTokenActions.sol)

```solidity
File: contracts/core/strategies/StrategySupplyBase.sol

73:         ERC20(_asset).safeTransferFrom(msg.sender, address(this), amount);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyBase.sol)

### <a name="M-2"></a>[M-2] Centralization Risk for trusted owners

#### Impact

Contracts have owners with privileged rights to perform admin tasks and need to be trusted to not perform malicious updates or drain funds.

*Instances (12)*:

```solidity
File: contracts/core/MultiStrategy.sol

85:     function setWeights(uint16[] memory iweights) public onlyRole(VAULT_MANAGER_ROLE) {

107:     function addStrategy(IStrategy strategy) external onlyRole(VAULT_MANAGER_ROLE) {

251:     function removeStrategy(uint256 index) external onlyRole(VAULT_MANAGER_ROLE) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategy.sol)

```solidity
File: contracts/core/MultiStrategyVault.sol

174:     ) external override nonReentrant onlyRole(VAULT_MANAGER_ROLE) returns (bool success) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/MultiStrategyVault.sol)

```solidity
File: contracts/core/Vault.sol

177:     ) external override nonReentrant onlyRole(VAULT_MANAGER_ROLE) returns (bool success) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/Vault.sol)

```solidity
File: contracts/core/VaultBase.sol

484:     function pause() external onlyRole(PAUSER_ROLE) {

492:     function unpause() external onlyRole(PAUSER_ROLE) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/hooks/swappers/UseUnifiedSwapper.sol

29: abstract contract UseUnifiedSwapper is ISwapHandler, GovernableOwnable {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/swappers/UseUnifiedSwapper.sol)

```solidity
File: contracts/core/strategies/StrategySupplyBase.sol

20: abstract contract StrategySupplyBase is IStrategy, ReentrancyGuard, Ownable {

39:     constructor(address initialOwner, address asset_) ReentrancyGuard() Ownable() {

69:     function deploy(uint256 amount) external nonReentrant onlyOwner returns (uint256 deployedAmount) {

110:     function undeploy(uint256 amount) external nonReentrant onlyOwner returns (uint256 undeployedAmount) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyBase.sol)

### <a name="M-3"></a>[M-3] Lack of EIP-712 compliance: using `keccak256()` directly on an array or struct variable

Directly using the actual variable instead of encoding the array values goes against the EIP-712 specification <https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md#definition-of-encodedata>.
**Note**: OpenSea's [Seaport's example with offerHashes and considerationHashes](https://github.com/ProjectOpenSea/seaport/blob/a62c2f8f484784735025d7b03ccb37865bc39e5a/reference/lib/ReferenceGettersAndDerivers.sol#L130-L131) can be used as a reference to understand how array of structs should be encoded.

*Instances (1)*:

```solidity
File: contracts/core/hooks/swappers/UseUnifiedSwapper.sol

58:         return keccak256(abi.encode(tokenA < tokenB ? [tokenA, tokenB] : [tokenB, tokenA]));

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/swappers/UseUnifiedSwapper.sol)

### <a name="M-4"></a>[M-4] Return values of `transfer()`/`transferFrom()` not checked

Not all `IERC20` implementations `revert()` when there's a failure in `transfer()`/`transferFrom()`. The function signature has a `boolean` return value and they indicate errors that way instead. By not checking the return value, operations that should have marked as failed, may potentially go through without actually making a payment

*Instances (3)*:

```solidity
File: contracts/core/VaultBase.sol

413:                 IERC20Upgradeable(_asset()).transfer(receiver, amount - fee);

414:                 IERC20Upgradeable(_asset()).transfer(getFeeReceiver(), fee);

421:                 IERC20Upgradeable(_asset()).transfer(receiver, amount);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

### <a name="M-5"></a>[M-5] Unsafe use of `transfer()`/`transferFrom()`/`approve()`/ with `IERC20`

Some tokens do not implement the ERC20 standard properly but are still accepted by most code that accepts ERC20 tokens.  For example Tether (USDT)'s `transfer()` and `transferFrom()` functions on L1 do not return booleans as the specification requires, and instead have no return value. When these sorts of tokens are cast to `IERC20`, their [function signatures](https://medium.com/coinmonks/missing-return-value-bug-at-least-130-tokens-affected-d67bf08521ca) do not match and therefore the calls made, revert (see [this](https://gist.github.com/IllIllI000/2b00a32e8f0559e8f386ea4f1800abc5) link for a test case). Use OpenZeppelin's `SafeERC20`'s `safeTransfer()`/`safeTransferFrom()` instead

*Instances (13)*:

```solidity
File: contracts/core/VaultBase.sol

413:                 IERC20Upgradeable(_asset()).transfer(receiver, amount - fee);

414:                 IERC20Upgradeable(_asset()).transfer(getFeeReceiver(), fee);

421:                 IERC20Upgradeable(_asset()).transfer(receiver, amount);

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/VaultBase.sol)

```solidity
File: contracts/core/hooks/swappers/UseUnifiedSwapper.sol

71:         if (!IERC20(tokenIn).approve(routeInfo.router, type(uint256).max - 1)) revert FailedToApproveAllowance();

73:         if (!IERC20(tokenOut).approve(routeInfo.router, type(uint256).max - 1)) revert FailedToApproveAllowance();

89:         if (!IERC20(tokenIn).approve(_routes[key].router, 0)) revert FailedToApproveAllowance();

90:         if (!IERC20(tokenOut).approve(_routes[key].router, 0)) revert FailedToApproveAllowance();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/swappers/UseUnifiedSwapper.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageAAVEv3.sol

86:         if (!ERC20(_collateralToken).approve(aaveV3A(), amountIn)) revert FailedToApproveAllowanceForAAVE();

106:         if (!ERC20(_debtToken).approve(aaveV3A(), amount)) revert FailedToApproveAllowanceForAAVE();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageMorphoBlue.sol

135:         if (!ERC20(_collateralToken).approve(address(_morpho), amountIn)) revert FailedToApproveAllowance();

160:         if (!ERC20(_debtToken).approve(address(_morpho), amount)) revert FailedToApproveAllowance();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageMorphoBlue.sol)

```solidity
File: contracts/core/strategies/StrategySupplyAAVEv3.sol

37:         if (!ERC20(asset_).approve(aavev3Address, type(uint256).max)) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategySupplyMorpho.sol

55:         if (!ERC20(asset_).approve(morphoBlue, type(uint256).max)) {

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategySupplyMorpho.sol)

## High Issues

| |Issue|Instances|
|-|:-|:-:|
| [H-1](#H-1) | IERC20.approve() will revert for USDT | 8 |

### <a name="H-1"></a>[H-1] IERC20.approve() will revert for USDT

Use forceApprove() from SafeERC20

*Instances (8)*:

```solidity
File: contracts/core/hooks/swappers/UseUnifiedSwapper.sol

71:         if (!IERC20(tokenIn).approve(routeInfo.router, type(uint256).max - 1)) revert FailedToApproveAllowance();

73:         if (!IERC20(tokenOut).approve(routeInfo.router, type(uint256).max - 1)) revert FailedToApproveAllowance();

89:         if (!IERC20(tokenIn).approve(_routes[key].router, 0)) revert FailedToApproveAllowance();

90:         if (!IERC20(tokenOut).approve(_routes[key].router, 0)) revert FailedToApproveAllowance();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/hooks/swappers/UseUnifiedSwapper.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageAAVEv3.sol

86:         if (!ERC20(_collateralToken).approve(aaveV3A(), amountIn)) revert FailedToApproveAllowanceForAAVE();

106:         if (!ERC20(_debtToken).approve(aaveV3A(), amount)) revert FailedToApproveAllowanceForAAVE();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageAAVEv3.sol)

```solidity
File: contracts/core/strategies/StrategyLeverageMorphoBlue.sol

135:         if (!ERC20(_collateralToken).approve(address(_morpho), amountIn)) revert FailedToApproveAllowance();

160:         if (!ERC20(_debtToken).approve(address(_morpho), amount)) revert FailedToApproveAllowance();

```

[Link to code](https://github.com/code-423n4/2024-12-bakerfi/blob/main/contracts/core/strategies/StrategyLeverageMorphoBlue.sol)

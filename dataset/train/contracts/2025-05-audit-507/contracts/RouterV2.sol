/**
 *Submitted for verification at FtmScan.com on 2022-02-20
*/

// SPDX-License-Identifier: MIT
// ftm.guru's extension of Solidly's periphery (Router)
// https://github.com/andrecronje/solidly/blob/master/contracts/BaseV1-periphery.sol
// BaseV1Router02.sol : Supporting Fee-on-transfer Tokens
// https://github.com/ftm1337/solidly-with-FoT/blob/master/contracts/BaseV1-periphery.sol

pragma solidity 0.8.13;

import './interfaces/IAlgebraCLFactory.sol';
import './interfaces/IAlgebraPoolAPIStorage.sol';

import '@cryptoalgebra/integral-periphery/contracts/interfaces/IQuoterV2.sol';
import '@cryptoalgebra/integral-periphery/contracts/interfaces/ISwapRouter.sol';

import {BlackTimeLibrary} from "./libraries/BlackTimeLibrary.sol";

import './interfaces/IERC20.sol';
import './interfaces/IPair.sol';

interface IBaseV1Factory {
    function allPairsLength() external view returns (uint);
    function isPair(address pair) external view returns (bool);
    function getPair(address tokenA, address token, bool stable) external view returns (address);
    function createPair(address tokenA, address tokenB, bool stable) external returns (address pair);
    function isGenesis(address pair) external view returns (bool);
}

interface IBaseV1Pair {
    function transferFrom(address src, address dst, uint amount) external returns (bool);
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;
    function burn(address to) external returns (uint amount0, uint amount1);
    function mint(address to) external returns (uint liquidity);
    function getReserves() external view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast);
    function getAmountOut(uint, address) external view returns (uint);
    function totalSupply() external view returns (uint);
}

interface erc20 {
    function totalSupply() external view returns (uint256);
    function transfer(address recipient, uint amount) external returns (bool);
    function decimals() external view returns (uint8);
    function symbol() external view returns (string memory);
    function balanceOf(address) external view returns (uint);
    function transferFrom(address sender, address recipient, uint amount) external returns (bool);
    function approve(address spender, uint value) external returns (bool);
}

interface IPairFactory {
    function getFee(address _pairAddress, bool _stable) external view returns(uint256);
    function getPair(address tokenA, address token, bool stable) external view returns (address);
    function MAX_REFERRAL_FEE() external view returns(uint256);
}


library Math {
    function min(uint a, uint b) internal pure returns (uint) {
        return a < b ? a : b;
    }
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }
    function sub(uint x, uint y) internal pure returns (uint z) {
        require((z = x - y) <= x);
    }
}

interface IWETH {
    function deposit() external payable;
    function transfer(address to, uint value) external returns (bool);
    function withdraw(uint) external;
}

// Experimental Extension [ftm.guru/solidly/BaseV1Router02]
// contract BaseV1Router02 is BaseV1Router01
// with Support for Fee-on-Transfer Tokens
contract RouterV2 {

	using Math for uint;

    struct route {
        address pair;
        address from;
        address to;
        bool stable;
        bool concentrated;
        address receiver;
    }

    struct PairSwapMetadata {
        uint decimals0;
        uint decimals1;
        uint reserve0;
        uint reserve1;
        bool stable;
        address token0;
        address token1;
        uint balanceA;
        uint balanceB;
        uint reserveA;
        uint reserveB;
        uint decimalsA;
        uint decimalsB;
    }

    address public immutable factory;
    IWETH public immutable wETH;
    uint internal constant MINIMUM_LIQUIDITY = 10**3;

    address public swapRouter;
    address public owner;
    IAlgebraCLFactory public algebraFactory;
    IQuoterV2 public quoterV2;
    IAlgebraPoolAPIStorage public algebraPoolAPIStorage;

    // swap event for the referral system
    event Swap(address indexed sender,uint amount0In,address _tokenIn, address indexed to, bool stable);

    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'EXP');
        _;
    }

    constructor(address _factory, address _wETH, address _swapRouter, address _algebraFactory, address _quoterV2, address _algebraPoolAPIStorage) {
        owner = msg.sender;
        factory = _factory;
        wETH = IWETH(_wETH);
        swapRouter = _swapRouter;
        algebraPoolAPIStorage = IAlgebraPoolAPIStorage(_algebraPoolAPIStorage);
        algebraFactory = IAlgebraCLFactory(_algebraFactory);
        quoterV2 = IQuoterV2(_quoterV2);
    }

    receive() external payable {
        assert(msg.sender == address(wETH)); // only accept ETH via fallback from the WETH contract
    }

    function _k(uint x, uint y, uint decimals0, uint decimals1, bool stable) internal pure returns (uint) {
        if (stable) {
            uint _x = x * 1e18 / decimals0;
            uint _y = y * 1e18 / decimals1;
            uint _a = (_x * _y) / 1e18;
            uint _b = ((_x * _x) / 1e18 + (_y * _y) / 1e18);
            return _a * _b / 1e18;  // x3y+y3x >= k
        } else {
            return x * y; // xy >= k
        }
    }

    function sortTokens(address tokenA, address tokenB) public pure returns (address token0, address token1) {
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0) && token0 != token1, 'IA');
    }

    // calculates the CREATE2 address for a pair without making any external calls
    function pairFor(address tokenA, address tokenB, bool stable) public view returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        return IPairFactory(factory).getPair(token0, token1, stable);
    }

    // given some amount of an asset and pair reserves, returns an equivalent amount of the other asset
    function quoteLiquidity(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0 && reserveA > 0 && reserveB > 0, 'INL');
        amountB = amountA * reserveB / reserveA;
    }

    // fetches and sorts the reserves for a pair
    function getReserves(address tokenA, address tokenB, bool stable) public view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IBaseV1Pair(pairFor(tokenA, tokenB, stable)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }

    // performs chained getAmountOut calculations on any number of pairs
    function getAmountOut(uint amountIn, address tokenIn, address tokenOut) public view returns (uint amount, bool stable) {
        address pairStable = pairFor(tokenIn, tokenOut, true);
        address pairVolatile = pairFor(tokenIn, tokenOut, false);
        address pair;
        uint amountStable;
        uint amountVolatile;
        uint amountOut;

        if (IBaseV1Factory(factory).isPair(pairStable) && !IBaseV1Factory(factory).isGenesis(pairStable)) {
            amountStable = IBaseV1Pair(pairStable).getAmountOut(amountIn, tokenIn);
        }

        if (IBaseV1Factory(factory).isPair(pairVolatile) && !IBaseV1Factory(factory).isGenesis(pairVolatile)) {
            amountVolatile = IBaseV1Pair(pairVolatile).getAmountOut(amountIn, tokenIn);
        }

        (amountOut, stable, pair) = amountStable > amountVolatile ? (amountStable, true, pairStable) : (amountVolatile, false, pairVolatile);

        if (pair == address(0)) {
            return (0, true);
        }

        
        bool swapPossible = _swapRatio(amountIn, tokenIn, pair, amountOut);

        if(swapPossible){
            return (amountOut, stable);
        }

        return (0, true);
    }

    function getPoolAmountOut(uint amountIn, address tokenIn, address pair) public view returns (uint amount) {
        
        uint amountOut = IBaseV1Pair(pair).getAmountOut(amountIn, tokenIn);
        
        bool swapPossible = _swapRatio(amountIn, tokenIn, pair, amountOut);

        if(swapPossible){
            return amountOut;
        }

        return 0;
    }

    function _swapRatio(uint amountIn, address tokenIn, address pair, uint amountOut) internal view returns (bool){

        PairSwapMetadata memory pairSwapMetaData;
    
        (pairSwapMetaData.decimals0, pairSwapMetaData.decimals1, pairSwapMetaData.reserve0, 
        pairSwapMetaData.reserve1, pairSwapMetaData.stable, pairSwapMetaData.token0, pairSwapMetaData.token1)
         = IPair(pair).metadata();
        uint _balance0 = IERC20(pairSwapMetaData.token0).balanceOf(address(pair));
        uint _balance1 = IERC20(pairSwapMetaData.token1).balanceOf(address(pair));

        (pairSwapMetaData.balanceA, pairSwapMetaData.balanceB) = tokenIn == pairSwapMetaData.token0 ? (_balance0, _balance1) : (_balance1, _balance0);
        (pairSwapMetaData.reserveA, pairSwapMetaData.reserveB) = tokenIn == pairSwapMetaData.token0 ? (pairSwapMetaData.reserve0, pairSwapMetaData.reserve1) : (pairSwapMetaData.reserve1, pairSwapMetaData.reserve0);
        (pairSwapMetaData.decimalsA, pairSwapMetaData.decimalsB) = tokenIn == pairSwapMetaData.token0 ? (pairSwapMetaData.decimals0, pairSwapMetaData.decimals1) : (pairSwapMetaData.decimals1, pairSwapMetaData.decimals0);

        pairSwapMetaData.balanceA += (amountIn - (amountIn * IPairFactory(factory).getFee(pair, pairSwapMetaData.stable) / 10000));
        pairSwapMetaData.balanceB -= amountOut;

        if(_k(pairSwapMetaData.balanceA, pairSwapMetaData.balanceB, pairSwapMetaData.decimalsA, pairSwapMetaData.decimalsB, pairSwapMetaData.stable) >= _k(pairSwapMetaData.reserveA, pairSwapMetaData.reserveB, pairSwapMetaData.decimalsA, pairSwapMetaData.decimalsB, pairSwapMetaData.stable)){
            return true;
        }

        return false;
    }

    // performs chained getAmountOut calculations on any number of pairs
    function getAmountsOut(uint amountIn, route[] memory routes) public returns (uint[] memory amounts) {
        require(routes.length >= 1, 'INP');
        amounts = new uint[](routes.length+1);
        amounts[0] = amountIn;

        IQuoterV2.QuoteExactInputSingleParams memory clInputParams;

        for (uint i = 0; i < routes.length; i++) {

            if(routes[i].concentrated){
                clInputParams = IQuoterV2.QuoteExactInputSingleParams ({
                    tokenIn: routes[i].from,
                    tokenOut: routes[i].to,
                    deployer: IAlgebraPoolAPIStorage(algebraPoolAPIStorage).pairToDeployer(routes[i].pair),
                    amountIn: amounts[i],
                    limitSqrtPrice: 0
                });

                (amounts[i+1], , , , , )
                    = IQuoterV2(quoterV2).quoteExactInputSingle(clInputParams);
            }
            else{
                if (IBaseV1Factory(factory).isPair(routes[i].pair)) {
                    amounts[i+1] = IBaseV1Pair(routes[i].pair).getAmountOut(amounts[i], routes[i].from);
                }
            }
        }
    }
    function quoteAddLiquidity(
        address tokenA,
        address tokenB,
        bool stable,
        uint amountADesired,
        uint amountBDesired
    ) external view returns (uint amountA, uint amountB, uint liquidity) {
        // create the pair if it doesn't exist yet
        address _pair = IBaseV1Factory(factory).getPair(tokenA, tokenB, stable);
        (uint reserveA, uint reserveB) = (0,0);
        uint _totalSupply = 0;
        if (_pair != address(0)) {
            _totalSupply = erc20(_pair).totalSupply();
            (reserveA, reserveB) = getReserves(tokenA, tokenB, stable);
        }
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
            liquidity = Math.sqrt(amountA * amountB) - MINIMUM_LIQUIDITY;
        } else {

            uint amountBOptimal = quoteLiquidity(amountADesired, reserveA, reserveB);
            if (amountBOptimal <= amountBDesired) {
                (amountA, amountB) = (amountADesired, amountBOptimal);
                liquidity = Math.min(amountA * _totalSupply / reserveA, amountB * _totalSupply / reserveB);
            } else {
                uint amountAOptimal = quoteLiquidity(amountBDesired, reserveB, reserveA);
                (amountA, amountB) = (amountAOptimal, amountBDesired);
                liquidity = Math.min(amountA * _totalSupply / reserveA, amountB * _totalSupply / reserveB);
            }
        }
    }

    function quoteRemoveLiquidity(
        address tokenA,
        address tokenB,
        bool stable,
        uint liquidity
    ) external view returns (uint amountA, uint amountB) {
        // create the pair if it doesn't exist yet
        address _pair = IBaseV1Factory(factory).getPair(tokenA, tokenB, stable);

        if (_pair == address(0)) {
            return (0,0);
        }

        (uint reserveA, uint reserveB) = getReserves(tokenA, tokenB, stable);
        uint _totalSupply = erc20(_pair).totalSupply();

        amountA = liquidity * reserveA / _totalSupply; // using balances ensures pro-rata distribution
        amountB = liquidity * reserveB / _totalSupply; // using balances ensures pro-rata distribution

    }

    function _addLiquidity(
        address tokenA,
        address tokenB,
        bool stable,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin
    ) internal returns (uint amountA, uint amountB) {
        require(amountADesired >= amountAMin && amountBDesired >= amountBMin, "DLMA");
        // create the pair if it doesn't exist yet
        address _pair = IBaseV1Factory(factory).getPair(tokenA, tokenB, stable);
        if (_pair == address(0)) {
            _pair = IBaseV1Factory(factory).createPair(tokenA, tokenB, stable);
        }
        (uint reserveA, uint reserveB) = getReserves(tokenA, tokenB, stable);
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
        } else {
            uint amountBOptimal = quoteLiquidity(amountADesired, reserveA, reserveB);
            if (amountBOptimal <= amountBDesired) {
                (amountA, amountB) = (amountADesired, amountBOptimal);
            } else {
                uint amountAOptimal = quoteLiquidity(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                (amountA, amountB) = (amountAOptimal, amountBDesired);
            }
        }
        require(amountA >= amountAMin && amountB >= amountBMin, "IAA");
    }

    function addLiquidity(
        address tokenA,
        address tokenB,
        bool stable,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, stable, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = pairFor(tokenA, tokenB, stable);

        require(!(IBaseV1Factory(factory).isGenesis(pair) && IBaseV1Pair(pair).totalSupply() == 0), "NA");

        _safeTransferFrom(tokenA, msg.sender, pair, amountA);
        _safeTransferFrom(tokenB, msg.sender, pair, amountB);
        liquidity = IBaseV1Pair(pair).mint(to);
    }

    function addLiquidityETH(
        address token,
        bool stable,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable ensure(deadline) returns (uint amountToken, uint amountETH, uint liquidity) {
        (amountToken, amountETH) = _addLiquidity(
            token,
            address(wETH),
            stable,
            amountTokenDesired,
            msg.value,
            amountTokenMin,
            amountETHMin
        );
        address pair = pairFor(token, address(wETH), stable);
        _safeTransferFrom(token, msg.sender, pair, amountToken);
        wETH.deposit{value: amountETH}();
        assert(wETH.transfer(pair, amountETH));
        liquidity = IBaseV1Pair(pair).mint(to);
        // refund dust ETH, if any
        if (msg.value > amountETH) _safeTransferETH(msg.sender, msg.value - amountETH);
    }

    // **** REMOVE LIQUIDITY ****
    function removeLiquidity(
        address tokenA,
        address tokenB,
        bool stable,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) public ensure(deadline) returns (uint amountA, uint amountB) {
        address pair = pairFor(tokenA, tokenB, stable);
        require(IBaseV1Pair(pair).transferFrom(msg.sender, pair, liquidity), "ITFM"); // send liquidity to pair
        (uint amount0, uint amount1) = IBaseV1Pair(pair).burn(to);
        (address token0,) = sortTokens(tokenA, tokenB);
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
        require(amountA >= amountAMin && amountB >= amountBMin, 'IAA');
    }

    function removeLiquidityETH(
        address token,
        bool stable,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public ensure(deadline) returns (uint amountToken, uint amountETH) {
        (amountToken, amountETH) = removeLiquidity(
            token,
            address(wETH),
            stable,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        _safeTransfer(token, to, amountToken);
        wETH.withdraw(amountETH);
        _safeTransferETH(to, amountETH);
    }

    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        bool stable,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountA, uint amountB) {
        address pair = pairFor(tokenA, tokenB, stable);
        {
            uint value = approveMax ? type(uint).max : liquidity;
            IBaseV1Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        }

        (amountA, amountB) = removeLiquidity(tokenA, tokenB, stable, liquidity, amountAMin, amountBMin, to, deadline);
    }

    function removeLiquidityETHWithPermit(
        address token,
        bool stable,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountToken, uint amountETH) {
        address pair = pairFor(token, address(wETH), stable);
        uint value = approveMax ? type(uint).max : liquidity;
        IBaseV1Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountToken, amountETH) = removeLiquidityETH(token, stable, liquidity, amountTokenMin, amountETHMin, to, deadline);
    }

    // **** SWAP ****
    // requires the initial amount to have already been sent to the first pair
    function _swap(uint[] memory amounts, route[] memory routes, address _to) internal virtual {
        for (uint i = 0; i < routes.length; i++) {
            if(routes[i].concentrated){
                if (IERC20(routes[i].from).allowance(address(this), swapRouter) < amounts[i]) {
                    IERC20(routes[i].from).approve(swapRouter, amounts[i]);
                }
                ISwapRouter.ExactInputSingleParams memory inputParams;
                inputParams = ISwapRouter.ExactInputSingleParams ({
                    tokenIn: routes[i].from,
                    tokenOut: routes[i].to,
                    deployer: IAlgebraPoolAPIStorage(algebraPoolAPIStorage).pairToDeployer(routes[i].pair),
                    recipient: routes[i].receiver,
                    deadline: block.timestamp + 600,
                    amountIn: amounts[i],
                    amountOutMinimum: 0,
                    limitSqrtPrice: 0
                });

                amounts[i+1] = ISwapRouter(swapRouter).exactInputSingle(inputParams);
            }
            else{
                (address token0,) = sortTokens(routes[i].from, routes[i].to);
                uint amountOut = amounts[i + 1];
                (uint amount0Out, uint amount1Out) = routes[i].from == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
                IBaseV1Pair(pairFor(routes[i].from, routes[i].to, routes[i].stable)).swap(
                    amount0Out, amount1Out, routes[i].receiver, new bytes(0)
                );
            }

            emit Swap(msg.sender, amounts[i], routes[i].from, routes[i].receiver, routes[i].stable); 
        }
    }

    function swapExactTokensForTokensSimple(
        uint amountIn,
        uint amountOutMin,
        address tokenFrom,
        address tokenTo,
        bool stable,
        address to,
        bool concentrated,
        uint deadline
    ) external ensure(deadline) returns (uint[] memory amounts) {
        route[] memory routes = new route[](1);
        routes[0].from = tokenFrom;
        routes[0].to = tokenTo;
        routes[0].stable = stable;
        routes[0].concentrated = concentrated;
        amounts = getAmountsOut(amountIn, routes);
        require(amounts[amounts.length - 1] >= amountOutMin, 'IOA');
        if(!routes[0].concentrated) {
        _safeTransferFrom(
            routes[0].from, msg.sender, pairFor(routes[0].from, routes[0].to, routes[0].stable), amounts[0]
        );
        }
        else{
            IERC20(routes[0].from).transferFrom(msg.sender, address(this), amounts[0]);
            if (IERC20(routes[0].from).allowance(address(this), swapRouter) < amounts[0]) {
                IERC20(routes[0].from).approve(swapRouter, amounts[0]);
            }
        }
        _swap(amounts, routes, to);
    }

    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        route[] calldata routes,
        address to,
        uint deadline
    ) external ensure(deadline) returns (uint[] memory amounts) {
        amounts = getAmountsOut(amountIn, routes);
        require(amounts[amounts.length - 1] >= amountOutMin, 'IOA');
        if(!routes[0].concentrated)
        {
            _safeTransferFrom(
                routes[0].from, msg.sender, routes[0].pair, amounts[0]
            );
        }
        else{
            IERC20(routes[0].from).transferFrom(msg.sender, address(this), amounts[0]);
            if (IERC20(routes[0].from).allowance(address(this), swapRouter) < amounts[0]) {
                IERC20(routes[0].from).approve(swapRouter, amounts[0]);
            }
        }
        _swap(amounts, routes, to);
    }

    function swapExactETHForTokens(uint amountOutMin, route[] calldata routes, address to, uint deadline) external payable ensure(deadline) returns (uint[] memory amounts) {
        require(routes[0].from == address(wETH), 'INP');
        amounts = getAmountsOut(msg.value, routes);
        require(amounts[amounts.length - 1] >= amountOutMin, 'IOA');
        wETH.deposit{value: amounts[0]}();

        if (!routes[0].concentrated) {
            assert(wETH.transfer(pairFor(routes[0].from, routes[0].to, routes[0].stable),amounts[0]));
        } else {
            if (IERC20(address(wETH)).allowance(address(this), swapRouter) < amounts[0]) {
                IERC20(address(wETH)).approve(swapRouter, amounts[0]);
            }
        }
        _swap(amounts, routes, to);
    }

    function swapExactTokensForETH(uint amountIn, uint amountOutMin, route[] calldata routes, address to, uint deadline)
    external
    ensure(deadline)
    returns (uint[] memory amounts)
    {
        require(routes[routes.length - 1].to == address(wETH), 'INP');
        amounts = getAmountsOut(amountIn, routes);
        require(amounts[amounts.length - 1] >= amountOutMin, 'IOA');

        if(!routes[0].concentrated)
        {
            _safeTransferFrom(
                routes[0].from, msg.sender, pairFor(routes[0].from, routes[0].to, routes[0].stable), amounts[0]
            );
        }
        else{
            IERC20(routes[0].from).transferFrom(msg.sender, address(this), amounts[0]);
            if (IERC20(routes[0].from).allowance(address(this), swapRouter) < amounts[0]) {
                IERC20(routes[0].from).approve(swapRouter, amounts[0]);
            }
        }
        _swap(amounts, routes, address(this));
        wETH.withdraw(amounts[amounts.length - 1]);
        _safeTransferETH(to, amounts[amounts.length - 1]);
    }

    function UNSAFE_swapExactTokensForTokens(
        uint[] memory amounts,
        route[] calldata routes,
        address to,
        uint deadline
    ) external ensure(deadline) returns (uint[] memory) {
        _safeTransferFrom(routes[0].from, msg.sender, pairFor(routes[0].from, routes[0].to, routes[0].stable), amounts[0]);
        _swap(amounts, routes, to);
        return amounts;
    }

    function _safeTransferETH(address to, uint value) internal {
        (bool success,) = to.call{value:value}(new bytes(0));
        require(success, 'ETF');
    }

    function _safeTransfer(address token, address to, uint256 value) internal {
        require(token.code.length > 0, "CODELEN");
        (bool success, bytes memory data) =
        token.call(abi.encodeWithSelector(erc20.transfer.selector, to, value));
        require(success && (data.length == 0 || abi.decode(data, (bool))), "IST");
    }

    function _safeTransferFrom(address token, address from, address to, uint256 value) internal {
        require(token.code.length > 0, "CODELEN");
        (bool success, bytes memory data) =
        token.call(abi.encodeWithSelector(erc20.transferFrom.selector, from, to, value));
        require(success && (data.length == 0 || abi.decode(data, (bool))), "ISTF");
    }

    // Experimental Extension [ETH.guru/solidly/BaseV1Router02]

    // **** REMOVE LIQUIDITY (supporting fee-on-transfer tokens)****
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        bool stable,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public ensure(deadline) returns (uint amountToken, uint amountETH) {
        (amountToken, amountETH) = removeLiquidity(
            token,
            address(wETH),
            stable,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        _safeTransfer(token, to, erc20(token).balanceOf(address(this)));
        wETH.withdraw(amountETH);
        _safeTransferETH(to, amountETH);
    }
    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        bool stable,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountToken, uint amountETH) {
        address pair = pairFor(token, address(wETH), stable);
        uint value = approveMax ? type(uint).max : liquidity;
        IBaseV1Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountToken, amountETH) = removeLiquidityETHSupportingFeeOnTransferTokens(
            token, stable, liquidity, amountTokenMin, amountETHMin, to, deadline
        );
    }
    
    // **** SWAP (supporting fee-on-transfer tokens) ****
    // requires the initial amount to have already been sent to the first pair
    function _swapSupportingFeeOnTransferTokens(route[] calldata routes, address _to) internal virtual {
        for (uint i; i < routes.length; i++) {
        	(address input, address output) = (routes[i].from, routes[i].to);
            (address token0,) = sortTokens(input, output);
            IBaseV1Pair pair = IBaseV1Pair(pairFor(routes[i].from, routes[i].to, routes[i].stable));
            uint amountInput;
            uint amountOutput;
            { // scope to avoid stack too deep errors
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput,) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = erc20(input).balanceOf(address(pair)).sub(reserveInput);
            (amountOutput,) = getAmountOut(amountInput, input, output);
            }
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOutput) : (amountOutput, uint(0));
            address to = i < routes.length - 1 ? pairFor(routes[i+1].from, routes[i+1].to, routes[i+1].stable) : _to;
            pair.swap(amount0Out, amount1Out, to, new bytes(0));

            bool _stable = routes[i].stable;
            emit Swap(msg.sender,amountInput,input,_to,_stable);  
        }
    }
    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        route[] calldata routes,
        address to,
        uint deadline
    ) external ensure(deadline) {
        _safeTransferFrom(
        	routes[0].from,
        	msg.sender,
        	pairFor(routes[0].from, routes[0].to, routes[0].stable),
        	amountIn
        );
        uint balanceBefore = erc20(routes[routes.length - 1].to).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(routes, to);
        require(
            erc20(routes[routes.length - 1].to).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'IOA'
        );
    }
    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        route[] calldata routes,
        address to,
        uint deadline
    )
        external
        payable
        ensure(deadline)
    {
        require(routes[0].from == address(wETH), 'INP');
        uint amountIn = msg.value;
        wETH.deposit{value: amountIn}();
        assert(wETH.transfer(pairFor(routes[0].from, routes[0].to, routes[0].stable), amountIn));
        uint balanceBefore = erc20(routes[routes.length - 1].to).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(routes, to);
        require(
            erc20(routes[routes.length - 1].to).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'IOA'
        );
    }

    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        route[] calldata routes,
        address to,
        uint deadline
    )
        external
        ensure(deadline)
    {
        require(routes[routes.length - 1].to == address(wETH), 'INP');
        _safeTransferFrom(
            routes[0].from, msg.sender, pairFor(routes[0].from, routes[0].to, routes[0].stable), amountIn
        );
        _swapSupportingFeeOnTransferTokens(routes, address(this));
        uint amountOut = erc20(address(wETH)).balanceOf(address(this));
        require(amountOut >= amountOutMin, 'IOA');
        wETH.withdraw(amountOut);
        _safeTransferETH(to, amountOut);
    }

    function setSwapRouter(address _swapRouter) external {
        require(msg.sender == owner);
        swapRouter = _swapRouter;
    }

    function setAlgebraFactory(address _algebraFactory) external {
        require(msg.sender == owner);
        algebraFactory = IAlgebraCLFactory(_algebraFactory);
    }

    function setQuoterV2(address _quoterV2) external {
        require(msg.sender == owner);
        quoterV2 = IQuoterV2(_quoterV2);
    }

    function setAlgebraPoolAPI(address _algebraPoolAPIStorage) external {
        require(msg.sender == owner);
        algebraPoolAPIStorage = IAlgebraPoolAPIStorage(_algebraPoolAPIStorage);
    }
}

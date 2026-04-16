// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

import "./interfaces/IGenesisPoolManager.sol";
import "./interfaces/IGaugeManager.sol";
import "./interfaces/IGenesisPoolBase.sol";
import "./interfaces/IGauge.sol";

import "./interfaces/ITokenHandler.sol";
import "./interfaces/IPermissionsRegistry.sol";
import "./interfaces/IGenesisPoolFactory.sol";
import './interfaces/IGenesisPool.sol';
import './interfaces/IAuctionFactory.sol';
import {BlackTimeLibrary} from "./libraries/BlackTimeLibrary.sol";

interface IBaseV1Factory {
    function isPair(address pair) external view returns (bool);
    function getPair(address tokenA, address token, bool stable) external view returns (address);
    function createPair(address tokenA, address tokenB, bool stable) external returns (address pair);
    function setGenesisPool(address _genesisPool) external;
    function setGenesisStatus(address _pair, bool status) external;
}

contract GenesisPoolManager is IGenesisPoolBase, IGenesisPoolManager, OwnableUpgradeable, ReentrancyGuardUpgradeable {

    uint256 public MIN_DURATION;
    uint256 public MIN_THRESHOLD;
    uint256 public MATURITY_TIME;

    address public epochController;
    address public permissionRegistory;
    address public router;
    IBaseV1Factory public pairFactory;

    IGaugeManager public gaugeManager;
    ITokenHandler public tokenHandler;

    IGenesisPoolFactory public genesisFactory;
    IAuctionFactory public auctionFactory;

    uint public WEEK;
    uint public pre_epoch_period; // 2 : 30 of every thursday

    using SafeERC20 for IERC20;

    mapping(address => mapping(address => bool)) public whiteListedTokensToUser; 
    address[] public nativeTokens;
    address[] public liveNativeTokens;
    mapping(address => uint256) internal liveNativeTokensIndex;
    mapping(address => bool) internal isNativeToken;
    
    event WhiteListedTokenToUser(address proposedToken, address tokenOwner);
    event DespositedToken(address genesisPool, address sender, uint256 amount);
    modifier Governance() {
        require(IPermissionsRegistry(permissionRegistory).hasRole("GOVERNANCE",msg.sender), 'GOVERNANCE');
        _;
    }

    function _checkGovernance() internal view returns (bool) {
        return IPermissionsRegistry(permissionRegistory).hasRole("GOVERNANCE",msg.sender);
    }

    constructor() {}

    function initialize(address _epochController, address _router, address _permissionRegistory, address _gaugeManager, address _pairFactory, address _genesisFactory, address _auctionFactory, address _tokenHandler) initializer  public {
        __Ownable_init();
        __ReentrancyGuard_init();

        epochController = _epochController;
        router = _router;
        permissionRegistory = _permissionRegistory;
        gaugeManager = IGaugeManager(_gaugeManager);
        pairFactory = IBaseV1Factory(_pairFactory);
        genesisFactory = IGenesisPoolFactory(_genesisFactory);
        auctionFactory = IAuctionFactory(_auctionFactory);
        tokenHandler = ITokenHandler(_tokenHandler);
        WEEK = BlackTimeLibrary.WEEK;
        MIN_DURATION = 2 * BlackTimeLibrary.WEEK;
        MIN_THRESHOLD = 50 * 10 ** 2; 
        MATURITY_TIME = BlackTimeLibrary.GENESIS_STAKING_MATURITY_TIME;

        pre_epoch_period = BlackTimeLibrary.prevPreEpoch(block.timestamp);
    }

    function check() external view returns (bool) {
        uint _period = pre_epoch_period;
        return block.timestamp >= _period + WEEK;
    }

    function whiteListUserAndToken(address tokenOwner, address proposedToken) external Governance {
        whiteListedTokensToUser[proposedToken][tokenOwner] = true;
        emit WhiteListedTokenToUser(proposedToken, tokenOwner);
    }

    function depositNativeToken(address nativeToken, uint auctionIndex, GenesisInfo calldata genesisPoolInfo, TokenAllocation calldata allocationInfo) external nonReentrant returns(address genesisPool) {
        address _sender = msg.sender;
        require(whiteListedTokensToUser[nativeToken][_sender] || _checkGovernance(), "!WHITELIST");
        require(nativeToken == genesisPoolInfo.nativeToken, "IA");
        require(_sender == genesisPoolInfo.tokenOwner, "NA");
        require(allocationInfo.proposedNativeAmount > 0, "ZV");
        require(allocationInfo.proposedFundingAmount > 0, "ZV");

        address _fundingToken = genesisPoolInfo.fundingToken;
        require(tokenHandler.isConnector(_fundingToken), "!CONN");
        bool _stable = genesisPoolInfo.stable;
        
        address pairAddress = pairFactory.getPair(nativeToken, _fundingToken, _stable);
        if (pairAddress != address(0)) {
            require(IERC20(nativeToken).balanceOf(pairAddress) == 0, "!ZV");
            require(IERC20(_fundingToken).balanceOf(pairAddress) == 0, "!ZV");
        }

        require(genesisPoolInfo.duration >= MIN_DURATION && genesisPoolInfo.threshold >= MIN_THRESHOLD && genesisPoolInfo.startPrice > 0, "INV_GENESIS");
        require(genesisPoolInfo.supplyPercent > 0 && genesisPoolInfo.supplyPercent <= 10000, "INV"); 
        
        require(genesisPoolInfo.nativeToken == nativeToken, "MISMATCH");
        
        genesisPool = genesisFactory.getGenesisPool(nativeToken);
        if(genesisPool == address(0))
            genesisPool = genesisFactory.createGenesisPool(_sender, nativeToken, _fundingToken);

        require(genesisPool != address(0), "ZA");
        IERC20(nativeToken).safeTransferFrom(_sender, genesisPool, allocationInfo.proposedNativeAmount);

        address auction = auctionFactory.auctions(auctionIndex);
        auction = auction == address(0) ? auctionFactory.auctions(0) : auction;
        if(!isNativeToken[nativeToken]){
            nativeTokens.push(nativeToken); 
            isNativeToken[nativeToken] = true;
        }
        IGenesisPool(genesisPool).setGenesisPoolInfo(genesisPoolInfo, allocationInfo, auction);
    }

    function rejectGenesisPool(address nativeToken) external Governance {
        require(nativeToken != address(0), "ZA");
        address genesisPool = genesisFactory.getGenesisPool(nativeToken);
        require(genesisPool != address(0), 'ZA');

        IGenesisPool(genesisPool).rejectPool();
        _removeLiveToken(nativeToken);
    }

    function approveGenesisPool(address nativeToken) external Governance {
        require(nativeToken != address(0), "ZA");
        address genesisPool = genesisFactory.getGenesisPool(nativeToken);
        require(genesisPool != address(0), 'ZA');

        GenesisInfo memory genesisInfo =  IGenesisPool(genesisPool).getGenesisInfo();
        require(genesisInfo.startTime + genesisInfo.duration - BlackTimeLibrary.NO_GENESIS_DEPOSIT_WINDOW > block.timestamp, "TIME");

        address pairAddress = pairFactory.getPair(nativeToken, genesisInfo.fundingToken, genesisInfo.stable);
        if (pairAddress == address(0)) {
            pairAddress = pairFactory.createPair(nativeToken, genesisInfo.fundingToken, genesisInfo.stable);
        } else {
            require(IERC20(nativeToken).balanceOf(pairAddress) == 0, "!ZV");
            require(IERC20(genesisInfo.fundingToken).balanceOf(pairAddress) == 0, "!ZV");
        }
        pairFactory.setGenesisStatus(pairAddress, true);

        liveNativeTokens.push(nativeToken);
        liveNativeTokensIndex[nativeToken] = liveNativeTokens.length; // becuase default valie is 0, so starting with 1

        IGenesisPool(genesisPool).approvePool(pairAddress);
    }

    function depositToken(address genesisPool, uint256 amount) external nonReentrant{
        require(amount > 0, "ZV");
        require(genesisPool != address(0), "ZA");

        bool preLaunchPool = IGenesisPool(genesisPool).depositToken(msg.sender, amount);

        if(preLaunchPool){
            tokenHandler.whitelistToken(IGenesisPool(genesisPool).getGenesisInfo().nativeToken);
            _preLaunchPool(genesisPool);
        }

        emit DespositedToken(genesisPool, msg.sender, amount);
    }


    // at epoch flip, PRE_LISTING -> PRE_LAUNCH (condition met) , PRE_LAUNCH_DDEPOSIT_DISBALED -> LAUNCH or PARTIALLY_LAUNCH
    function checkAtEpochFlip() external {
        require(epochController == msg.sender, "NA");

        uint256 _proposedTokensCnt = liveNativeTokens.length;
        uint256 i;
        address _genesisPool;
        PoolStatus _poolStatus;
        address nativeToken;

        for(i = _proposedTokensCnt; i > 0; i--){
            nativeToken = liveNativeTokens[i-1];
            _genesisPool = genesisFactory.getGenesisPool(nativeToken);
            _poolStatus = IGenesisPool(_genesisPool).poolStatus();

            if(_poolStatus == PoolStatus.PRE_LISTING && IGenesisPool(_genesisPool).eligbleForPreLaunchPool()){
                tokenHandler.whitelistToken(nativeToken);
                _preLaunchPool(_genesisPool);
            }else if(_poolStatus == PoolStatus.PRE_LAUNCH_DEPOSIT_DISABLED){
                _launchPool(nativeToken, _genesisPool);
            }
        }
    }


    function _preLaunchPool(address genesisPool) internal {
        address _poolAddress = IGenesisPool(genesisPool).getLiquidityPoolInfo().pairAddress;
        (address _gauge, address _internal_bribe, address _external_bribe) = gaugeManager.createGauge(_poolAddress, 0);

        IGenesisPool(genesisPool).transferIncentives(_gauge, _external_bribe, _internal_bribe);
    }

    function _launchPool(address _nativeToken, address _genesisPool) internal {
        LiquidityPool memory liquidityPool = IGenesisPool(_genesisPool).getLiquidityPoolInfo();
        pairFactory.setGenesisStatus(liquidityPool.pairAddress, false);
        IGauge(liquidityPool.gaugeAddress).setGenesisPool(_genesisPool);
        IGenesisPool(_genesisPool).launch(router, MATURITY_TIME);
        _removeLiveToken(_nativeToken);
    }
    
    // before 3 hrs
    function checkBeforeEpochFlip() external {
        require(epochController == msg.sender, "NA");

        uint _period = pre_epoch_period;
        if (block.timestamp >= _period + WEEK) { 
            
            uint256 _proposedTokensCnt = liveNativeTokens.length;
            uint256 i;
            address _genesisPool;
            PoolStatus _poolStatus;
            address nativeToken;
            
            for(i = _proposedTokensCnt; i > 0; i--){
                nativeToken = liveNativeTokens[i-1];
                _genesisPool = genesisFactory.getGenesisPool(nativeToken);
                _poolStatus = IGenesisPool(_genesisPool).poolStatus();

                if(_poolStatus == PoolStatus.PRE_LISTING && IGenesisPool(_genesisPool).eligbleForDisqualify()){
                    pairFactory.setGenesisStatus(IGenesisPool(_genesisPool).getLiquidityPoolInfo().pairAddress, false);
                    IGenesisPool(_genesisPool).setPoolStatus(PoolStatus.NOT_QUALIFIED);
                    _removeLiveToken(nativeToken);
                }
                else if(_poolStatus == PoolStatus.PRE_LAUNCH){
                    IGenesisPool(_genesisPool).setPoolStatus(PoolStatus.PRE_LAUNCH_DEPOSIT_DISABLED);
                }
            }
            pre_epoch_period = BlackTimeLibrary.currPreEpoch(block.timestamp);
        }
    }

    function _removeLiveToken(address nativeToken) internal {
        uint index = liveNativeTokensIndex[nativeToken];
        uint length = liveNativeTokens.length;
        if(length > 0 && index >= 1 && index <= length)
        {
            address replacingAddress = liveNativeTokens[length - 1];
            liveNativeTokens[index - 1] = replacingAddress;
            liveNativeTokens.pop();
            liveNativeTokensIndex[replacingAddress] = index;
        }
    }

    function setAuction(address _genesisPool, address _auction) external Governance {
        require(_genesisPool != address(0), "ZA");
        IGenesisPool(_genesisPool).setAuction(_auction);
    }

    function getAllNaitveTokens() external view returns (address[] memory) {
        return nativeTokens;
    }

    function getLiveNaitveTokens() external view returns (address[] memory) {
        return liveNativeTokens;
    }

    function setEpochController(address _epochController) external Governance {
        require(_epochController != address(0), "ZA");
        epochController = _epochController;
    }

    function setMinimumDuration(uint256 _duration) external Governance {
        MIN_DURATION = _duration;
    }

    function setMinimumThreshold(uint256 _threshold) external Governance {
        MIN_THRESHOLD = _threshold;
    }

    function setMaturityTime(uint256 _maturityTime) external Governance {
        MATURITY_TIME = _maturityTime;
    }

    function setMaturityTime(address _nativeToken, uint256 _maturityTime) external Governance {
        require(_nativeToken != address(0), "ZA");
        address genesisPool = genesisFactory.getGenesisPool(_nativeToken);
        require(genesisPool != address(0), "ZA");
        IGenesisPool(genesisPool).setMaturityTime(_maturityTime);
    }

    function setGenesisStartTime(address _nativeToken, uint256 _startTime) external Governance {
        require(_nativeToken != address(0), "ZA");
        address genesisPool = genesisFactory.getGenesisPool(_nativeToken);
        require(genesisPool != address(0), "ZA");
        IGenesisPool(genesisPool).setStartTime(_startTime);
    }

    function setRouter (address _router) external onlyOwner {
        require(_router == address(0), "ZA");
        router = _router;
    }
}
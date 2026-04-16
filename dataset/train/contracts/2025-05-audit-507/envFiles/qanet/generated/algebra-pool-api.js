const algebraPoolAPIVersion = "v222";

const algebraPoolAPIAddress = "0xD4748799ad983e27a1654226bb9E016147d31345";

const algebraPoolAPIAbi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "oldFactory",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newFactory",
        "type": "address"
      }
    ],
    "name": "FactoryChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "version",
        "type": "uint8"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "oldManager",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newManager",
        "type": "address"
      }
    ],
    "name": "NonfungiblePositionManagerChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "oldOwner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "Owner",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "algebraFactory",
    "outputs": [
      {
        "internalType": "contract IAlgebraCLFactory",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "gaugeManager",
    "outputs": [
      {
        "internalType": "contract IGaugeManager",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "_pools",
        "type": "address[]"
      }
    ],
    "name": "getAllPoolInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "pair_address",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "symbol",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "decimals",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "stable",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "total_supply",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "token0",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "token1",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "token0_symbol",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "token1_symbol",
            "type": "string"
          },
          {
            "internalType": "uint8",
            "name": "token0_decimals",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "token1_decimals",
            "type": "uint8"
          },
          {
            "internalType": "int24",
            "name": "tickSpacing",
            "type": "int24"
          },
          {
            "internalType": "uint160",
            "name": "sqrtPriceX96",
            "type": "uint160"
          },
          {
            "internalType": "int24",
            "name": "tick",
            "type": "int24"
          },
          {
            "internalType": "uint128",
            "name": "liquidity",
            "type": "uint128"
          },
          {
            "internalType": "uint16",
            "name": "fee",
            "type": "uint16"
          },
          {
            "internalType": "uint256",
            "name": "feeGrowthGlobal0X128",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "feeGrowthGlobal1X128",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "gauge",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "gauge_total_supply",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "emissions",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "total_emissions",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "emissions_token",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "emissions_token_decimals",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "votes",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "staked_token0_fees",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "staked_token1_fees",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "bribeAddress",
                "type": "address"
              },
              {
                "internalType": "address[]",
                "name": "tokens",
                "type": "address[]"
              },
              {
                "internalType": "string[]",
                "name": "symbols",
                "type": "string[]"
              },
              {
                "internalType": "uint256[]",
                "name": "decimals",
                "type": "uint256[]"
              },
              {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
              }
            ],
            "internalType": "struct AlgebraPoolAPI.Bribes",
            "name": "internal_bribes",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "bribeAddress",
                "type": "address"
              },
              {
                "internalType": "address[]",
                "name": "tokens",
                "type": "address[]"
              },
              {
                "internalType": "string[]",
                "name": "symbols",
                "type": "string[]"
              },
              {
                "internalType": "uint256[]",
                "name": "decimals",
                "type": "uint256[]"
              },
              {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
              }
            ],
            "internalType": "struct AlgebraPoolAPI.Bribes",
            "name": "external_bribes",
            "type": "tuple"
          }
        ],
        "internalType": "struct AlgebraPoolAPI.PoolInfo[]",
        "name": "infos",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_tokenIds",
        "type": "uint256[]"
      },
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getAllPositionsInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "token0",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "token1",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "deployer",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "pair",
            "type": "address"
          },
          {
            "internalType": "int24",
            "name": "tickLower",
            "type": "int24"
          },
          {
            "internalType": "int24",
            "name": "tickUpper",
            "type": "int24"
          },
          {
            "internalType": "uint128",
            "name": "liquidity",
            "type": "uint128"
          },
          {
            "internalType": "uint256",
            "name": "feeGrowthInside0LastX128",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "feeGrowthInside1LastX128",
            "type": "uint256"
          },
          {
            "internalType": "uint128",
            "name": "tokensOwed0",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "tokensOwed1",
            "type": "uint128"
          },
          {
            "internalType": "uint256",
            "name": "claimableFee0",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "claimableFee1",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "token0_symbol",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "token1_symbol",
            "type": "string"
          },
          {
            "internalType": "uint8",
            "name": "token0_decimals",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "token1_decimals",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "account_token0_balance",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "account_token1_balance",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "gauge",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "emissions_token",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "emissions_token_decimals",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "account_gauge_balance",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "account_gauge_earned",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isStaked",
            "type": "bool"
          }
        ],
        "internalType": "struct AlgebraPoolAPI.PositionInfo[]",
        "name": "positionsInfo",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_pool",
        "type": "address"
      }
    ],
    "name": "getPoolInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "pair_address",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "symbol",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "decimals",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "stable",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "total_supply",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "token0",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "token1",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "token0_symbol",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "token1_symbol",
            "type": "string"
          },
          {
            "internalType": "uint8",
            "name": "token0_decimals",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "token1_decimals",
            "type": "uint8"
          },
          {
            "internalType": "int24",
            "name": "tickSpacing",
            "type": "int24"
          },
          {
            "internalType": "uint160",
            "name": "sqrtPriceX96",
            "type": "uint160"
          },
          {
            "internalType": "int24",
            "name": "tick",
            "type": "int24"
          },
          {
            "internalType": "uint128",
            "name": "liquidity",
            "type": "uint128"
          },
          {
            "internalType": "uint16",
            "name": "fee",
            "type": "uint16"
          },
          {
            "internalType": "uint256",
            "name": "feeGrowthGlobal0X128",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "feeGrowthGlobal1X128",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "gauge",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "gauge_total_supply",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "emissions",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "total_emissions",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "emissions_token",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "emissions_token_decimals",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "votes",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "staked_token0_fees",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "staked_token1_fees",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "bribeAddress",
                "type": "address"
              },
              {
                "internalType": "address[]",
                "name": "tokens",
                "type": "address[]"
              },
              {
                "internalType": "string[]",
                "name": "symbols",
                "type": "string[]"
              },
              {
                "internalType": "uint256[]",
                "name": "decimals",
                "type": "uint256[]"
              },
              {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
              }
            ],
            "internalType": "struct AlgebraPoolAPI.Bribes",
            "name": "internal_bribes",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "bribeAddress",
                "type": "address"
              },
              {
                "internalType": "address[]",
                "name": "tokens",
                "type": "address[]"
              },
              {
                "internalType": "string[]",
                "name": "symbols",
                "type": "string[]"
              },
              {
                "internalType": "uint256[]",
                "name": "decimals",
                "type": "uint256[]"
              },
              {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
              }
            ],
            "internalType": "struct AlgebraPoolAPI.Bribes",
            "name": "external_bribes",
            "type": "tuple"
          }
        ],
        "internalType": "struct AlgebraPoolAPI.PoolInfo",
        "name": "info",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_voter",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_factory",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_nonfungiblePositionManager",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_gaugeManager",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nonfungiblePositionManager",
    "outputs": [
      {
        "internalType": "contract INonfungiblePositionManager",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "pairToDeployer",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_pair",
        "type": "address"
      }
    ],
    "name": "setDeployerForPair",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_pair",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_deployer",
        "type": "address"
      }
    ],
    "name": "setDeployerForPair",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newFactory",
        "type": "address"
      }
    ],
    "name": "setFactory",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_gaugeManager",
        "type": "address"
      }
    ],
    "name": "setGaugeManager",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newManager",
        "type": "address"
      }
    ],
    "name": "setNonfungiblePositionManager",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "setOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_voter",
        "type": "address"
      }
    ],
    "name": "setVoter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "underlyingToken",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "voter",
    "outputs": [
      {
        "internalType": "contract IVoter",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

module.exports = {algebraPoolAPIAddress, algebraPoolAPIAbi, algebraPoolAPIVersion};
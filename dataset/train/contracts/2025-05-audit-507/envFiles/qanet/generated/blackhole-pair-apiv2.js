const blackholePairAPIV2Version = "v222";

const blackholePairAPIV2Address = "0x707B96Ef4e93303e6bA780323eb9A2e34e007D39";

const blackholePairAPIV2Abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "oldGaugeManager",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newGaugeManager",
        "type": "address"
      }
    ],
    "name": "GaugeManager",
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
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "oldVoter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newVoter",
        "type": "address"
      }
    ],
    "name": "Voter",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "oldWBF",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newWBF",
        "type": "address"
      }
    ],
    "name": "WBF",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MAX_EPOCHS",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_PAIRS",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_REWARDS",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
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
    "name": "algebraPoolApi",
    "outputs": [
      {
        "internalType": "contract IAlgebraPoolAPI",
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
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amounts",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_offset",
        "type": "uint256"
      }
    ],
    "name": "getAllPair",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "totPairs",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "hasNext",
        "type": "bool"
      },
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
            "internalType": "string",
            "name": "token0_symbol",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "token0_decimals",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "reserve0",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "claimable0",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "token1",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "token1_symbol",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "token1_decimals",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "reserve1",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "claimable1",
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
            "name": "account_lp_balance",
            "type": "uint256"
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
            "internalType": "uint256",
            "name": "account_staked_unlock",
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
            "internalType": "struct BlackholePairAPIV2.Bribes",
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
            "internalType": "struct BlackholePairAPIV2.Bribes",
            "name": "external_bribes",
            "type": "tuple"
          },
          {
            "internalType": "bool",
            "name": "isGenesisRunning",
            "type": "bool"
          }
        ],
        "internalType": "struct BlackholePairAPIV2.pairInfo[]",
        "name": "pairs",
        "type": "tuple[]"
      },
      {
        "internalType": "uint256",
        "name": "epochDuration",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "tokenIn",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenOut",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_userAddress",
        "type": "address"
      }
    ],
    "name": "getAmountOut",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "amountOut",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "hops",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "pair",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "bool",
                "name": "stable",
                "type": "bool"
              },
              {
                "internalType": "bool",
                "name": "concentrated",
                "type": "bool"
              },
              {
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
              }
            ],
            "internalType": "struct BlackholePairAPIV2.route[]",
            "name": "routes",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct BlackholePairAPIV2.swapRoute",
        "name": "swapRoutes",
        "type": "tuple"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getNextEpochStart",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
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
      },
      {
        "internalType": "address",
        "name": "_account",
        "type": "address"
      }
    ],
    "name": "getPair",
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
            "internalType": "string",
            "name": "token0_symbol",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "token0_decimals",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "reserve0",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "claimable0",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "token1",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "token1_symbol",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "token1_decimals",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "reserve1",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "claimable1",
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
            "name": "account_lp_balance",
            "type": "uint256"
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
            "internalType": "uint256",
            "name": "account_staked_unlock",
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
            "internalType": "struct BlackholePairAPIV2.Bribes",
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
            "internalType": "struct BlackholePairAPIV2.Bribes",
            "name": "external_bribes",
            "type": "tuple"
          },
          {
            "internalType": "bool",
            "name": "isGenesisRunning",
            "type": "bool"
          }
        ],
        "internalType": "struct BlackholePairAPIV2.pairInfo",
        "name": "_pairInfo",
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
        "name": "_router",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_gaugeManager",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_pairFactory",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_algebraFactory",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_quoterV2",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_algebraPoolApi",
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
    "inputs": [],
    "name": "pairFactory",
    "outputs": [
      {
        "internalType": "contract IPairFactory",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "quoterV2",
    "outputs": [
      {
        "internalType": "contract IQuoterV2",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "routerV2",
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
        "name": "_algebraFactory",
        "type": "address"
      }
    ],
    "name": "setAlgebraFactory",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_algebraPoolApi",
        "type": "address"
      }
    ],
    "name": "setAlgebraPoolAPI",
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
        "name": "_pairFactory",
        "type": "address"
      }
    ],
    "name": "setPairFactory",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_quoterV2",
        "type": "address"
      }
    ],
    "name": "setQuoterV2",
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

module.exports = {blackholePairAPIV2Address, blackholePairAPIV2Abi, blackholePairAPIV2Version};
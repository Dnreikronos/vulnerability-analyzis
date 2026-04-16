const genesisPoolAPIVersion = "v444";

const genesisPoolAPIAddress = "0x91cA64F7FD9B97652bd66c821e8a370ea15a2187";

const genesisPoolAPIAbi = [
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
        "internalType": "uint8",
        "name": "version",
        "type": "uint8"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MAX_POOLS",
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
    "name": "genesisManager",
    "outputs": [
      {
        "internalType": "contract IGenesisPoolManager",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "genesisPoolFactory",
    "outputs": [
      {
        "internalType": "contract IGenesisPoolFactory",
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
    "name": "getAllGenesisPools",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "totalPools",
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
            "name": "genesisPool",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "nativeToken",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "nativeTokensDecimal",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "fundingTokensDecimal",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "userDeposit",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "estimatedNativeAmount",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "proposedNativeAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "proposedFundingAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "allocatedNativeAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "allocatedFundingAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "refundableNativeAmount",
                "type": "uint256"
              }
            ],
            "internalType": "struct IGenesisPoolBase.TokenAllocation",
            "name": "tokenAllocation",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "address[]",
                "name": "incentivesToken",
                "type": "address[]"
              },
              {
                "internalType": "uint256[]",
                "name": "incentivesAmount",
                "type": "uint256[]"
              }
            ],
            "internalType": "struct IGenesisPoolBase.TokenIncentiveInfo",
            "name": "incentiveInfo",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "tokenOwner",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "nativeToken",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "fundingToken",
                "type": "address"
              },
              {
                "internalType": "bool",
                "name": "stable",
                "type": "bool"
              },
              {
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "threshold",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "supplyPercent",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "startPrice",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "startTime",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "maturityTime",
                "type": "uint256"
              }
            ],
            "internalType": "struct IGenesisPoolBase.GenesisInfo",
            "name": "genesisInfo",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "pairAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "gaugeAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "internal_bribe",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "external_bribe",
                "type": "address"
              }
            ],
            "internalType": "struct IGenesisPoolBase.LiquidityPool",
            "name": "liquidityPool",
            "type": "tuple"
          },
          {
            "internalType": "enum IGenesisPoolBase.PoolStatus",
            "name": "poolStatus",
            "type": "uint8"
          }
        ],
        "internalType": "struct GenesisPoolAPI.GenesisData[]",
        "name": "genesisPools",
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
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getAllUserRelatedGenesisPools",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "totalTokens",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "genesisPool",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "nativeToken",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "nativeTokensDecimal",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "fundingTokensDecimal",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "userDeposit",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "estimatedNativeAmount",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "proposedNativeAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "proposedFundingAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "allocatedNativeAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "allocatedFundingAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "refundableNativeAmount",
                "type": "uint256"
              }
            ],
            "internalType": "struct IGenesisPoolBase.TokenAllocation",
            "name": "tokenAllocation",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "address[]",
                "name": "incentivesToken",
                "type": "address[]"
              },
              {
                "internalType": "uint256[]",
                "name": "incentivesAmount",
                "type": "uint256[]"
              }
            ],
            "internalType": "struct IGenesisPoolBase.TokenIncentiveInfo",
            "name": "incentiveInfo",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "tokenOwner",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "nativeToken",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "fundingToken",
                "type": "address"
              },
              {
                "internalType": "bool",
                "name": "stable",
                "type": "bool"
              },
              {
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "threshold",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "supplyPercent",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "startPrice",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "startTime",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "maturityTime",
                "type": "uint256"
              }
            ],
            "internalType": "struct IGenesisPoolBase.GenesisInfo",
            "name": "genesisInfo",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "pairAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "gaugeAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "internal_bribe",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "external_bribe",
                "type": "address"
              }
            ],
            "internalType": "struct IGenesisPoolBase.LiquidityPool",
            "name": "liquidityPool",
            "type": "tuple"
          },
          {
            "internalType": "enum IGenesisPoolBase.PoolStatus",
            "name": "poolStatus",
            "type": "uint8"
          }
        ],
        "internalType": "struct GenesisPoolAPI.GenesisData[]",
        "name": "genesisPools",
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
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "genesisPool",
        "type": "address"
      }
    ],
    "name": "getGenesisPool",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "genesisPool",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "nativeToken",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "nativeTokensDecimal",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "fundingTokensDecimal",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "userDeposit",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "estimatedNativeAmount",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "proposedNativeAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "proposedFundingAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "allocatedNativeAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "allocatedFundingAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "refundableNativeAmount",
                "type": "uint256"
              }
            ],
            "internalType": "struct IGenesisPoolBase.TokenAllocation",
            "name": "tokenAllocation",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "address[]",
                "name": "incentivesToken",
                "type": "address[]"
              },
              {
                "internalType": "uint256[]",
                "name": "incentivesAmount",
                "type": "uint256[]"
              }
            ],
            "internalType": "struct IGenesisPoolBase.TokenIncentiveInfo",
            "name": "incentiveInfo",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "tokenOwner",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "nativeToken",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "fundingToken",
                "type": "address"
              },
              {
                "internalType": "bool",
                "name": "stable",
                "type": "bool"
              },
              {
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "threshold",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "supplyPercent",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "startPrice",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "startTime",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "maturityTime",
                "type": "uint256"
              }
            ],
            "internalType": "struct IGenesisPoolBase.GenesisInfo",
            "name": "genesisInfo",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "pairAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "gaugeAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "internal_bribe",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "external_bribe",
                "type": "address"
              }
            ],
            "internalType": "struct IGenesisPoolBase.LiquidityPool",
            "name": "liquidityPool",
            "type": "tuple"
          },
          {
            "internalType": "enum IGenesisPoolBase.PoolStatus",
            "name": "poolStatus",
            "type": "uint8"
          }
        ],
        "internalType": "struct GenesisPoolAPI.GenesisData",
        "name": "genesisData",
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
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "nativeToken",
        "type": "address"
      }
    ],
    "name": "getGenesisPoolFromNative",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "genesisPool",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "nativeToken",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "nativeTokensDecimal",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "fundingTokensDecimal",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "userDeposit",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "estimatedNativeAmount",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "proposedNativeAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "proposedFundingAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "allocatedNativeAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "allocatedFundingAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "refundableNativeAmount",
                "type": "uint256"
              }
            ],
            "internalType": "struct IGenesisPoolBase.TokenAllocation",
            "name": "tokenAllocation",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "address[]",
                "name": "incentivesToken",
                "type": "address[]"
              },
              {
                "internalType": "uint256[]",
                "name": "incentivesAmount",
                "type": "uint256[]"
              }
            ],
            "internalType": "struct IGenesisPoolBase.TokenIncentiveInfo",
            "name": "incentiveInfo",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "tokenOwner",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "nativeToken",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "fundingToken",
                "type": "address"
              },
              {
                "internalType": "bool",
                "name": "stable",
                "type": "bool"
              },
              {
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "threshold",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "supplyPercent",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "startPrice",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "startTime",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "maturityTime",
                "type": "uint256"
              }
            ],
            "internalType": "struct IGenesisPoolBase.GenesisInfo",
            "name": "genesisInfo",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "pairAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "gaugeAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "internal_bribe",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "external_bribe",
                "type": "address"
              }
            ],
            "internalType": "struct IGenesisPoolBase.LiquidityPool",
            "name": "liquidityPool",
            "type": "tuple"
          },
          {
            "internalType": "enum IGenesisPoolBase.PoolStatus",
            "name": "poolStatus",
            "type": "uint8"
          }
        ],
        "internalType": "struct GenesisPoolAPI.GenesisData",
        "name": "genesisData",
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
        "name": "_genesisManager",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_genesisPoolFactory",
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
  }
];

module.exports = {genesisPoolAPIAddress, genesisPoolAPIAbi, genesisPoolAPIVersion};
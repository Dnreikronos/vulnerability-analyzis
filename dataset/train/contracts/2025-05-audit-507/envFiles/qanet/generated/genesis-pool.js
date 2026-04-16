const genesisPoolVersion = "v222";

const genesisPoolAddress = "";

const genesisPoolAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_genesisManager",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_tokenHandler",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_tokenOwner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_nativeToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_fundingToken",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "native",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address[]",
        "name": "incentivesToken",
        "type": "address[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "incentivesAmount",
        "type": "uint256[]"
      }
    ],
    "name": "AddedIncentives",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "proposedToken",
        "type": "address"
      }
    ],
    "name": "ApprovedGenesisPool",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "native",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "genesisPool",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "proposedNativeAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "proposedFundingAmount",
        "type": "uint256"
      }
    ],
    "name": "DepositedNativeToken",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "native",
        "type": "address"
      }
    ],
    "name": "RejectedGenesisPool",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "_incentivesToken",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_incentivesAmount",
        "type": "uint256[]"
      }
    ],
    "name": "addIncentives",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "allocationInfo",
    "outputs": [
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
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_pairAddress",
        "type": "address"
      }
    ],
    "name": "approvePool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
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
    "name": "claimDeposits",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimIncentives",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimNative",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimableDeposits",
    "outputs": [
      {
        "internalType": "enum IGenesisPoolBase.PoolStatus",
        "name": "",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimableIncentives",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "tokens",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimableNative",
    "outputs": [
      {
        "internalType": "enum IGenesisPoolBase.PoolStatus",
        "name": "",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
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
        "name": "account",
        "type": "address"
      }
    ],
    "name": "deductAllAmount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "gaugeTokenAmount",
        "type": "uint256"
      }
    ],
    "name": "deductAmount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "depositToken",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "depositers",
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
    "name": "eligbleForDisqualify",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "eligbleForPreLaunchPool",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "genesisInfo",
    "outputs": [
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
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllocationInfo",
    "outputs": [
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
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "nativeAmount",
        "type": "uint256"
      }
    ],
    "name": "getFundingTokenAmount",
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
    "name": "getGenesisInfo",
    "outputs": [
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
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getIncentivesInfo",
    "outputs": [
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
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getLiquidityPoolInfo",
    "outputs": [
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
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "depositAmount",
        "type": "uint256"
      }
    ],
    "name": "getNativeTokenAmount",
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
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "incentiveTokens",
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
    "name": "incentives",
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
        "name": "router",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "maturityTime",
        "type": "uint256"
      }
    ],
    "name": "launch",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "liquidityPoolInfo",
    "outputs": [
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
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "poolStatus",
    "outputs": [
      {
        "internalType": "enum IGenesisPoolBase.PoolStatus",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "rejectPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_auction",
        "type": "address"
      }
    ],
    "name": "setAuction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
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
        "name": "_genesisInfo",
        "type": "tuple"
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
        "name": "_allocationInfo",
        "type": "tuple"
      },
      {
        "internalType": "address",
        "name": "_auction",
        "type": "address"
      }
    ],
    "name": "setGenesisPoolInfo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_maturityTime",
        "type": "uint256"
      }
    ],
    "name": "setMaturityTime",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum IGenesisPoolBase.PoolStatus",
        "name": "status",
        "type": "uint8"
      }
    ],
    "name": "setPoolStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_startTime",
        "type": "uint256"
      }
    ],
    "name": "setStartTime",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "gauge",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "external_bribe",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "internal_bribe",
        "type": "address"
      }
    ],
    "name": "transferIncentives",
    "outputs": [],
    "stateMutability": "nonpayable",
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
    "name": "userDeposits",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

module.exports = {genesisPoolAddress, genesisPoolAbi, genesisPoolVersion};
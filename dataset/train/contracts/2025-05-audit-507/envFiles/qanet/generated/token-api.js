const tokenAPIVersion = "v222";

const tokenAPIAddress = "0x64FC33F9Fb0eb69F4695b8E029a30eD2c13cB20A";

const tokenAPIAbi = [
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
    "name": "getConnectorTokens",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "tokenAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "ticker",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "decimal",
            "type": "uint256"
          }
        ],
        "internalType": "struct TokenAPI.Token[]",
        "name": "tokens",
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
        "internalType": "address[]",
        "name": "tokenAddresses",
        "type": "address[]"
      }
    ],
    "name": "getTokenBalances",
    "outputs": [
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
    "name": "getWhiteListedTokens",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "tokenAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "ticker",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "decimal",
            "type": "uint256"
          }
        ],
        "internalType": "struct TokenAPI.Token[]",
        "name": "tokens",
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
        "name": "_tokenHandler",
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
    "name": "tokenHandler",
    "outputs": [
      {
        "internalType": "contract ITokenHandler",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

module.exports = {tokenAPIAddress, tokenAPIAbi, tokenAPIVersion};
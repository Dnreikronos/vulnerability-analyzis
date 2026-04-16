require("@nomiclabs/hardhat-waffle");
require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-web3");
require("dotenv").config(); 

module.exports = {
  // Latest Solidity version
  solidity: {
    compilers: [
      {
        version: "0.8.13",
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
          metadata: {
              useLiteralContent: true
          }
        },
      },
    ],
  },

  networks: {
    avalanche: {
      url: "https://api.avax.network/ext/bc/C/rpc", // Mainnet RPC
      chainId: 43114,
      accounts: [`0x${process.env.PRIVATEKEY}`],
      gas: 8000000,
    },
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc", // Fuji Testnet RPC
      chainId: 43113,
      accounts: [`0x${process.env.PRIVATEKEY}`],
      gas: 8000000,
      gasLimit: 15000000
    },
  },

  etherscan: {
    apiKey: `${process.env.APIKEY}`,
  },

  mocha: {
    timeout: 100000000,
  },
};

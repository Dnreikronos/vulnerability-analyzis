const voterFactoryLibVersion = "v444";

const voterFactoryLibAddress = "0x8ff3Fd421BA56e0C0fD0B252D9c7Db87c9C270E1";

const voterFactoryLibAbi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "gaugefactory",
        "type": "address"
      }
    ],
    "name": "AddGaugeFactories",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "pairfactory",
        "type": "address"
      }
    ],
    "name": "AddPairFactories",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "old",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "latest",
        "type": "address"
      }
    ],
    "name": "SetGaugeFactory",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "old",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "latest",
        "type": "address"
      }
    ],
    "name": "SetPairFactory",
    "type": "event"
  }
];

module.exports = {voterFactoryLibAddress, voterFactoryLibAbi, voterFactoryLibVersion};
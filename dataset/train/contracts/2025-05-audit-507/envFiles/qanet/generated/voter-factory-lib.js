const voterFactoryLibVersion = "v222";

const voterFactoryLibAddress = "0x8A017c9005D2b9BA070962f517223d9Dd15Cffb7";

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
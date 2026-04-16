const voterFactoryLibVersion = "140520251136";

const voterFactoryLibAddress = "0x2a4ea8E8CA4425BA0e6A4B68441a6A14ADbafaB0";

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
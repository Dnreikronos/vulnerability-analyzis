const { autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress } = require("../../generated/auto-voting-escrow-manager");
const { blackAddress } = require("../../generated/black");
const { blackholePairAPIV2Abi, blackholePairAPIV2Address } = require("../../generated/blackhole-pair-apiv2");
const { epochControllerAbi, epochControllerAddress } = require("../../generated/epoch-controller");
const { gaugeManagerAddress, gaugeManagerAbi } = require("../../generated/gauge-manager");
const { gaugeV2Abi } = require("../../generated/gauge-v2");
const { setterTopNPoolsStrategyAbi, setterTopNPoolsStrategyAddress } = require("../../generated/setter-top-npools-strategy");
const { voterV3Abi, voterV3Address } = require("../../generated/voter-v3");
const { bribeAbi } = require("./gaugeConstants/bribe");

async function main () {
    const pairAddresses =  [
"0x37EE15aF2BAcBF8E9DcBdB19C2580F16d3f3A389"
      ]
      const voter = await ethers.getContractAt(voterV3Abi, voterV3Address);
      const epoch = await ethers.getContractAt(epochControllerAbi, epochControllerAddress);
      const avm = await ethers.getContractAt(autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress);
    //   console.log("voter from av: ", await avm.voter())
    //   console.log("voter: ", await epoch.voter(), " minteR: ", await epoch.minter())
    for(let i=0; i<pairAddresses.length; i++) {
        console.log("gauge address: ", await voter.weights(pairAddresses[i]));
    }

    const topNPools = await ethers.getContractAt(setterTopNPoolsStrategyAbi, setterTopNPoolsStrategyAddress);
    console.log("Values of top n pools: ", await topNPools.getTopNPools())

    // const voter = await ethers.getContractAt(voterV3Abi, voterV3Address);
    const pairApiContract = await ethers.getContractAt(blackholePairAPIV2Abi, blackholePairAPIV2Address);
    const allPairs = await pairApiContract.getAllPair("0x8ec18CcA7E8d40861dc07C217a6426f60005A661", "5", "0");
    const allPairsInfo = allPairs[2];
    const gaugeManager = await ethers.getContractAt(gaugeManagerAbi, gaugeManagerAddress);
    // console.log("allPairsInfo: ", allPairsInfo)
    for(let i=0; i<pairAddresses.length; i++) {
        console.log("pair address: ", pairAddresses[i])
        const gaugeAddress = await gaugeManager.gauges(pairAddresses[i]);
        const internalBribes = await gaugeManager.internal_bribes(gaugeAddress);
        const externalBribes = await gaugeManager.external_bribes(gaugeAddress);
        console.log("found gauge for pair address: ", pairAddresses[i], " where internalBribes is: ", internalBribes, " where externalBribes is: ", externalBribes);

        const externalBribeContract = await ethers.getContractAt(bribeAbi, externalBribes);
        const internalBribeContract = await ethers.getContractAt(bribeAbi, internalBribes);
        console.log("user: ", "0x8ec18CcA7E8d40861dc07C217a6426f60005A661", " has earned : ", await externalBribeContract.earned("8", blackAddress), " and ", await internalBribeContract.earned("18", blackAddress));
    }

    // let count = 0;

    // while(true) {
    //     const pairAddress
    // }
}

main().then(() => console.log("Done!"))
.catch(err => console.error(err))



// 2399993959416162195
// 240007544205881969130
const { blackAddress } = require("../../generated/black");
const { blackholePairAPIV2Abi, blackholePairAPIV2Address } = require("../../generated/blackhole-pair-apiv2");
const { gaugeV2Abi } = require("../../generated/gauge-v2");
const { voterV3Abi, voterV3Address } = require("../../generated/voter-v3");
const { bribeAbi } = require("./gaugeConstants/bribe");

async function main () {
    const pairAddresses = [
        '0x3D834461471f79B2f8fE7Ce3e776Ef5036221c17',
        '0x1Bc0093C2a428E92F330D7430Fde1762bD9A2771',
        '0xE62cE16FFb899e975d1aC5960DA9dB9bF1c08E82',
        '0x3aECA163AEC1a8B616A2C3050f62Bc63CeA6c8b2'
      ]

    const voter = await ethers.getContractAt(voterV3Abi, voterV3Address);
    const pairApiContract = await ethers.getContractAt(blackholePairAPIV2Abi, blackholePairAPIV2Address);
    const allPairs = await pairApiContract.getAllPair("0x8ec18CcA7E8d40861dc07C217a6426f60005A661", "5", "0");
    const allPairsInfo = allPairs[2];
    // console.log("allPairsInfo: ", allPairsInfo)
    for(let i=0; i<pairAddresses.length; i++) {
        const prevVotesForCurrentPair = await voter.votes("2", pairAddresses[i]);
        console.log("prevVotesForCurrentPair: ", prevVotesForCurrentPair);
    }
    let count = 0;
    console.log("poolv ote lenggth: ", await voter.poolVoteLength("1"));
    while(true) {
        try {
        console.log("poolvote: ", await voter.poolVote("1", count));
        count++;
        } catch(Err) {
            break;
        }

    }
}

main().then(() => console.log("Done!"))
.catch(err => console.error(err))


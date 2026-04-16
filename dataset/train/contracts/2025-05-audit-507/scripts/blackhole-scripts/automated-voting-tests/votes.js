const { ethers } = require("hardhat");
const { autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress } = require("../../../generated/auto-voting-escrow-manager");
const { voterV3Abi, voterV3Address } = require("../../../generated/voter-v3");
const { setterVoteWeightStrategyAbi, setterVoteWeightStrategyAddress } = require("../../../generated/setter-vote-weight-strategy");

async function main () {
    const voter = await ethers.getContractAt(voterV3Abi, voterV3Address);
    const voteWgt = await ethers.getContractAt(setterVoteWeightStrategyAbi, setterVoteWeightStrategyAddress);
    console.log("vote wgts: ", await voteWgt.getVoteWeights());
    const pairAddresses =  [
        '0x1aFd06F63a00c116Fdb561D58DEc2E504b4448DB',
        '0x266Cc7FF5aEc0209cd688EDaEdAb63073E9FC55e',
        '0xD28765DDf9fFdc2247b9e02C3017DEc0CFcB4100',
        '0x91b224cA95223720355e982e0fC8Ff549f319F43',
        '0xF48D8121af56a39f1866d0Ea49f5fd831df97317'
    ]

    for(let i=0; i<pairAddresses.length; i++) {
        const votes = await voter.votes("21", pairAddresses[i])
        console.log("votes: ", votes)
    }

}

main().then(() => console.log("Done!"))
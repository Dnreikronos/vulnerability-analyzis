const { automatedVotingManagerAbi, automatedVotingManagerAddress } = require("../../generated/automated-voting-manager");

async function main () {
    const avm = await ethers.getContractAt(automatedVotingManagerAbi, automatedVotingManagerAddress);
    const length = await avm.tokenIdsLength();
    console.log("length ", length);
    for(let i=0; i<length; i++) {
        const tokenIdCurr = await avm.tokenIds(i);
        console.log("tokenid curr: ", tokenIdCurr);
    }
}

main().then(() => console.log("Doen"))
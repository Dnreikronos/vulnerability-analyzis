const { automatedVotingManagerAbi, automatedVotingManagerAddress } = require("../../generated/automated-voting-manager")

async function main () {
    const avmContract = await ethers.getContractAt(automatedVotingManagerAbi, automatedVotingManagerAddress);
    const tokenIdsLength = await avmContract.tokenIdsLength();
    console.log("tokenIdsLength: ", tokenIdsLength)
}

main().then(() => console.log("Done!"))
.catch(err => console.error("error here: ", err))

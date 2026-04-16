const { generateConstantFile } = require("../../../blackhole-scripts/postDeployment/generator");

async function main () {
    generateConstantFile("AutoVotingEscrow", "");
}

main().then(() => console.log("Done!"))

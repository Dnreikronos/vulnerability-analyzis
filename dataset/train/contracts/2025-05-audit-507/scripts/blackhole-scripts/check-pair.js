const { blackAddress } = require("../../generated/black");
const { pairFactoryAbi } = require("../../generated/pair-factory");

async function main() {
    const pairFactory = await ethers.getContractAt(pairFactoryAbi, pairFactoryAddress);
    // const pair = await pairFactory.getPair(blackAddress, )
}

main().then(() => console.log("Done!"))
.catch((err) => console.error("error: ", err))

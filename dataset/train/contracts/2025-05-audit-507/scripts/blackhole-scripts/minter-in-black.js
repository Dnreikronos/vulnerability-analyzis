const { blackAbi, blackAddress } = require("../../generated/black");

async function main () {
    const black = await ethers.getContractAt(blackAbi, blackAddress);
    console.log("minter:", await black.minter());
}

main().then(() => console.log("done!"))

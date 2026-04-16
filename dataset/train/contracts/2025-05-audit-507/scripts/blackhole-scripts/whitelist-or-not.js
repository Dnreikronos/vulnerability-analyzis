const { tokenHandlerAbi } = require("../../generated/token-handler");

async function main () {
    const tokenHandler = await ethers.getContractAt(tokenHandlerAbi, "0x716c4508bA49ED34B948fF41b438528c8b3FF685");
    console.log("tokens: ", await tokenHandler.whiteListedTokens());

}

main()

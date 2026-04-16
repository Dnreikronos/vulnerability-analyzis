const { blackAddress } = require("../../generated/black");
const { tokenHandlerAbi, tokenHandlerAddress } = require("../../generated/token-handler");
const deployedTokens = require("../deployment-flows/token-constants/deploying-tokens.json")
const deployedTokens1 = require("../deployment-flows/token-constants/deployed-tokens.json")
console.log("deployed tokens: ", deployedTokens)
async function main () {
    const tokenHandler = await ethers.getContractAt(tokenHandlerAbi, tokenHandlerAddress);
    const allTokens1 = deployedTokens.map(elm => elm.address);
    const allTokens2 = deployedTokens1.map(elm => elm.address);
    const allTokens = [...allTokens1,...allTokens2];
    // const allTokens = ["0xCDB39e851E76f501D47e2D489343828626c5e462", "0xB32cB5BeE5b0D80c221eBbC3FaA4cDC789953aCD"]
    console.log("all tokens:", allTokens)
    const whitelistedTokens = await tokenHandler.whiteListedTokens();
    console.log("whitelisted tokens: ", whitelistedTokens);
    const wTokens = whitelistedTokens.map((t) => t.toLowerCase());
    for(let i=0; i<allTokens.length; i++) {
        if(!wTokens.includes(allTokens[i].toLowerCase())) {
            console.log("whitelisted tokens: ", allTokens[i]);
            const whitelistTx = await tokenHandler.whitelistToken(allTokens[i]);
            await whitelistTx.wait();
            console.log("done whitelisting! for token addresS: ", allTokens.address)
        }
    }
    
    const connectors = [blackAddress, "0x0Ea98bF8ff474639f6Cbeb4c4bDd1bA74aA9A4a4", "0xdDC18bF5f716742C746F156333f86E9c5bFbeC36", "0xb3B3CbEd8243682845C2ff23Ea1FD48e6144E34F"]
    for(let i=0; i<connectors.length; i++) {
        try {
            const whitelistTx = await tokenHandler.whitelistConnector(connectors[i]);
            await whitelistTx.wait();
            console.log("done whitelisting! for token addresS: ", allTokens.address)
        }
        catch (e) {

        }
    }
    console.log("all tokens: ", allTokens)
}

main().then(() => console.log("Done!"))

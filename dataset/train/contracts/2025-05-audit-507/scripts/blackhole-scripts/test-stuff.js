const { pairAbi } = require("./dexAbi");

async function main () {
     
    const pairAddress = "0x40865892cfdf310363ace58cca4e813a80dfb17a";
    const pairContract = await ethers.getContractAt(pairAbi, pairAddress);
    console.log("pairContract reserves: ", await pairContract.reserve0(), " reserve 1 : ", await pairContract.reserve1())
    const syncTx = await pairContract.sync();
    await syncTx.wait();
}

main().then(() => console.log("Done!"))

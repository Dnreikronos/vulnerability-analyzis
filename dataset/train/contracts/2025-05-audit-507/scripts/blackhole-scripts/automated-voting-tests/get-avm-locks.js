const { veNFTAPIAbi, veNFTAPIAddress } = require("../../../generated/ve-nftapi");

async function main () {
    const ve = await ethers.getContractAt(veNFTAPIAbi, veNFTAPIAddress);
    const locks = await ve.getAVMNFTFromAddress("0x7FE287762bd8149c4A2C87eCCf2C5D34B76B9B21");
    console.log(";locks: ", locks);
}

main().then(() => console.log("Done!"))

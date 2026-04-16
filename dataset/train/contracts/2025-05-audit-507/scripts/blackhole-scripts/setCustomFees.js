const { ethers } = require("hardhat");
const { pairFactoryAbi, pairFactoryAddress } = require("../../generated/pair-factory");

async function main () {
    const owner = await ethers.getSigners();
    const PairFactoryContract = await ethers.getContractAt(pairFactoryAbi, pairFactoryAddress);
    const tx0 = await PairFactoryContract.setCustomFees('0x81AB623969CDE8601d15aE22b6CC766CF50D64DB', 5);
    await tx0.wait();
    console.log("DONE tx0");
    const tx1 = await PairFactoryContract.setCustomFees('0x4A5b539D015aa7ED3fb4D34FaEc2A196B218C5b5', 6);
    await tx1.wait();
    console.log("DONE tx1");
    const tx2 = await PairFactoryContract.setCustomFees('0x339073b764246eD512Ff88De5aE84cEe387A1829', 18);
    await tx2.wait();
    console.log("DONE tx2");
    const tx3 = await PairFactoryContract.setCustomFees('0x9D1c2cD449D4Aa0cAa2b525Dd3B07230e94f6197', 4);
    await tx3.wait();
    console.log("DONE tx3");
    const tx4 = await PairFactoryContract.setCustomFees('0x1B93fdB0640bC8064737e98E86bEC5d45348B192', 4);
    await tx4.wait();
    console.log("DONE tx4");
    const tx5 = await PairFactoryContract.setCustomFees('0x7075436e2D59bb87539A198BADffB2D5009412ea', 10);
    await tx5.wait();
    console.log("DONE tx5");
    const tx6 = await PairFactoryContract.setCustomFees('0xD15F38A76f49a5f5E0Cd863270931B836D0d6045', 4);
    await tx6.wait();
    console.log("DONE tx6");
    const tx7 = await PairFactoryContract.setCustomFees('0x994a1102aA74826e79eA7B63014dFda3A195C3b3', 4);
    await tx7.wait();
    console.log("DONE tx7");
    const tx8 = await PairFactoryContract.setCustomFees('0x4B0BA054428D4AEf510371092852B675C570518e', 4);
    await tx8.wait();
    console.log("DONE tx8");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});

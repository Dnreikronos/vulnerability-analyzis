const { BigNumber } = require("ethers");
const { epochControllerAbi, epochControllerAddress } = require("../../generated/epoch-controller");
const { minterUpgradeableAbi, minterUpgradeableAddress } = require("../../generated/minter-upgradeable");
const deployedTokens = require("../deployment-flows/token-constants/deploying-tokens.json");

console.log("deployed tokens: ", deployedTokens);

const GAS_LIMIT = process.env.GAS_LIMIT || 15_000_000;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

console.log("GAS_LIMIT: ", GAS_LIMIT);

const initializeMinter = async (minterUpgradableAddress) => {
    try {
        const minterContract = await ethers.getContractAt(minterUpgradeableAbi, minterUpgradableAddress);
        const mintAmount = BigNumber.from("100000").mul(BigNumber.from("1000000000000000000"));
        console.log("mintAmount ", mintAmount)
        const initializingTx = await minterContract._initialize(
            [],
            [],
            mintAmount
        );
        await initializingTx.wait();
        console.log("Done initializing minter post deployment\n");
    } catch (error) {
        console.log("error in initializing black value ", error);
        process.exit(1);
    }
}

async function main () {
    const epoch = await ethers.getContractAt(epochControllerAbi, epochControllerAddress);
    // const tx1 = await epoch.performPreUpkeep("0x", {
    //     gasLimit: GAS_LIMIT,
    // });
    const minter = await ethers.getContractAt(minterUpgradeableAbi, minterUpgradeableAddress);
    
    console.log("check: ", await minter.check(), " active_period is: ", await minter.WEEK(), " _initializer: ", await epoch.minter());
    // await initializeMinter(minterUpgradeableAddress);
    const tx2 = await epoch.performUpkeep("0x", {
        gasLimit: GAS_LIMIT,
    });
    await tx2.wait();
    console.log("tx done!");
}

main().then(() => console.log("Done!"));

const { autoVotingEscrowManagerAddress, autoVotingEscrowManagerAbi } = require("../../generated/auto-voting-escrow-manager");
const { bribeAbi } = require("../../generated/bribe");
const { gaugeFactoryAddress, gaugeFactoryAbi } = require("../../generated/gauge-factory");
const { gaugeManagerAddress, gaugeManagerAbi } = require("../../generated/gauge-manager");
const { rewardsDistributorAddress } = require("../../generated/rewards-distributor");
const { veNFTAPIAbi } = require("../../generated/ve-nftapi");
const { voterV3Address } = require("../../generated/voter-v3");

const deployveNFT = async (voterV3Address, rewardsDistributorAddress, gaugeFactoryAddress, gaugeManagerAddress, retries) => {
    try {
        const deployveNFTContract = await ethers.getContractFactory("veNFTAPIV1");
        input = [voterV3Address, rewardsDistributorAddress, gaugeFactoryAddress, gaugeManagerAddress];
        const veNFTAPI = await upgrades.deployProxy(deployveNFTContract, input, {initializer: 'initialize', timeout: 180000, pollingInterval: 3000});
        txDeployed = await veNFTAPI.deployed();
        console.log('deployed venftapi address: ', veNFTAPI.address);
        // generateConstantFile("veNFTAPI", veNFTAPI.address);
        return veNFTAPI.address;
    } catch (error) {
        if (retries > 1) {
            return await deployveNFT(voterV3Address, rewardsDistributorAddress, gaugeFactoryAddress, gaugeManagerAddress, retries-1);
        }
        throw error;
    }
}

async function main () {
    // 0x60f7Bce000a472B8D6896D68a5C0d00162b3Ca3C
    try{
        const retries = 3;
        const deployedveNFTAddress = await deployveNFT(voterV3Address, rewardsDistributorAddress, gaugeFactoryAddress, gaugeManagerAddress, retries)
        console.log("deployedveNFTAddress: ", deployedveNFTAddress)
        const veNFT = await ethers.getContractAt(veNFTAPIAbi, deployedveNFTAddress);
        console.log("ve: ", await veNFT.ve());
        console.log("gaugemanager: ", await veNFT.gaugeManager());
        const setterAVMTx = await veNFT.setAVM(autoVotingEscrowManagerAddress);
        await setterAVMTx.wait()
        console.log("Gauge length: ", await gaugeFactoryAbi)
        // console.log("getAVMNFTFromAddress: ", await veNFT.getAVMNFTFromAddress("0x7FE287762bd8149c4A2C87eCCf2C5D34B76B9B21"))
        const tx = await veNFT.getAllPairRewards("0x7FE287762bd8149c4A2C87eCCf2C5D34B76B9B21", "1", "0", {
            gasLimit: 15_000_000
        });
        // const response = await tx.wait();
        console.log("getAllPairRewards: ", tx)
        console.log("arr: ", await veNFT.getArr());
        // console.log("getLocalGauges: ", await veNFT.getLocalGauges())
    } catch (err) {
        throw err;
    }
}

// const disableFive = async () => {
//     const retries = 3;
//     const deployedveNFTAddress = await deployveNFT(voterV3Address, rewardsDistributorAddress, gaugeFactoryAddress, gaugeManagerAddress, retries)
//     console.log("deployedveNFTAddress: ", deployedveNFTAddress)
//     const veNFT = await ethers.getContractAt(veNFTAPIAbi, deployedveNFTAddress);
//     console.log("ve: ", await veNFT.ve());
//     console.log("gaugemanager: ", await veNFT.gaugeManager());
//     const setterAVMTx = await veNFT.setAVM(autoVotingEscrowManagerAddress);
//     await setterAVMTx.wait()
//     console.log("getAVMNFTFromAddress: ", await veNFT.getAVMNFTFromAddress("0x8ec18CcA7E8d40861dc07C217a6426f60005A661"))
//     const avm = await ethers.getContractAt(autoVotingEscrowManagerAbi, autoVotingEscrowManagerAddress);
//     const tx = await avm.disableAutoVoting("5");
//     await tx.wait();
// }

// async function  main() {
// //     const gauges = [
// //         '0x60f7Bce000a472B8D6896D68a5C0d00162b3Ca3C',
// //         '0x08Dbd5325136d146cb29D0fdFb59d8566EaCb34b',
// //         '0xD61e628fB4dfE73C76dA3669dCe4eE7283C8587A',
// //         '0x9dc78815168b099eCF34695D8307415c04DfABEd',
// //         '0x212CED70E3576736e60dDdF0252185f1502eb29C',
// //         '0x28eAbC624DEF163B3f95Cff7255a7c42c1BC5d6b',
// //         '0xA60896E72dCBd6EddB57FC8efa9032b91D0Ed56C',
// //         '0xF262008A052C772A30Ad73DA98CE6d838A735f69',
// //         '0x032E6e8EbA6c8dDA9381172D028481355C25c08D',
// //         '0xaAAa8c10E799222fC69918a180FfFb88e55BEA2c',
// //         '0x4D3e18Ca382aD0cbAFB20afF22B1e94313AF938E',
// //         '0x0eB35E2b29586109a9c3Ec8d2f0206de5e1De8dF',
// //         '0x5A142C8649F7a7b41Efc84245ac9cf3Ba78BFCa5',
// //         '0x4397e6e7DAb7D716A7fCAAf699D8FBDED47e7a1C'
// //       ]
//         const gaugeFactory = await ethers.getContractAt(gaugeFactoryAbi, gaugeFactoryAddress);
//         const gaugeLen = await gaugeFactory.length();
//         const gauges = [];
//         for(let i=0; i<gaugeLen; i++) {
//             const currGauge = await gaugeFactory.gauges(i);
//             gauges.push(currGauge);
//         }
//         console.log("gauges: ", gauges)
//       const gaugeManager = await ethers.getContractAt(gaugeManagerAbi, gaugeManagerAddress);
//       for(let i=0; i<gauges.length; i++) {
//         console.log("intenrla bribes: ", await gaugeManager.internal_bribes(gauges[i]))
//       }

//       const veNFT = await ethers.getContractAt(veNFTAPIAbi, veNFTAPIAddress);
//       console.log("gauge manageR: ", await veNFT.gaugeFactory());
// }


// async function main () {
//     const bribeAddress = "0x52151AE1160Bf1C04C91D2fb8f1351f8c611C0E7";
//     const bribe = await ethers.getContractAt(bribeAbi, bribeAddress);
//     const dai = "0xBb0aB77Cf6E08f03e4cceABbA163860Cd1848df7";
//     const value = await bribe.earned("1", dai);
//     console.log("Value: ", value)
// }


main()
    .then(() => console.log("Done1"))
    .catch((err) => console.error("Err: ", err))

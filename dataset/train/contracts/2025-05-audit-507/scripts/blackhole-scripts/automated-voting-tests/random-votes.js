const { blackAddress } = require("../../../generated/black");
const { veNFTAPIAbi, veNFTAPIAddress } = require("../../../generated/ve-nftapi");
const { veNFTAPIV1Abi, veNFTAPIV1Address } = require("../../../generated/ve-nftapiv1");
const { voterV3Abi, voterV3Address } = require("../../../generated/voter-v3");
const { votingEscrowAbi, votingEscrowAddress } = require("../../../generated/voting-escrow");
const { blackAbi } = require("../gaugeConstants/black");

async function main () {
  const owner = await ethers.getSigners()
  const ownerAddress = owner[0].address;
  console.log("owneaddress: ", ownerAddress);
    const votingEscrow = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress);
    // const black = await ethers.getContractAt(blackAbi, blackAddress);
    // const approveTx = await black.approve(votingEscrowAddress, "10000000000000000000")
    // await approveTx.wait();
    // const createLockTx = await votingEscrow.create_lock("10000000000000000000", 86400, false);
    // await createLockTx.wait();
    const pools = [
      '0x0087441c20128c66138178A183aa125fcA059610',  // usdc black
      '0x266Cc7FF5aEc0209cd688EDaEdAb63073E9FC55e',  // usdc dai
      '0x1aFd06F63a00c116Fdb561D58DEc2E504b4448DB',  // usdc super
      '0x3F531C63b84854819B6C7845A5A1dD5825914A99'
    ]

    //   const veNFT = await ethers.getContractAt(veNFTAPIV1Abi, veNFTAPIV1Address);
    //   const locks = await veNFT.getNFTFromAddress("0x8ec18CcA7E8d40861dc07C217a6426f60005A661");
    //   console.log("locks: ", locks)

    const voter = await ethers.getContractAt(voterV3Abi, voterV3Address);
    const veNFTAPIV1 = await ethers.getContractAt(veNFTAPIV1Abi, veNFTAPIV1Address);
    const ve = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress)
    const balance = await ve.balanceOf(ownerAddress);
    console.log("balance: ", balance)
let nfts = [];

// for (let i = 5; i < balance; i++) {
//   console.log("iteration")
//     const tokenId = await ve.tokenOfOwnerByIndex(ownerAddress, BigInt(i));
//     const nft = await veNFTAPIV1.getNFTFromId(tokenId);
//     console.log("nft: ", nft)
//     nfts.push(nft);
// }
// const tx = await veNFTAPIV1.getNFTFromAddress(ownerAddress);
// console.log("NFTs owned:", nfts);
//     // console.log("nfts owned by this address: ", tx)
//     const tx = await ve.setVoter(voterV3Address);
//     await tx.wait();
//     console.log("voted: ", )
  const voteTx = await voter.vote("31", pools, [1,1,1,1]);
    // await voteTx.wait();
}

main().then(() => console.log("Done!"))

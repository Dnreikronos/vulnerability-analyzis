const { blackAbi, blackAddress } = require("../../generated/black");
const { votingEscrowAbi, votingEscrowAddress } = require("../../generated/voting-escrow");

async function main () {
    const ve  = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress);
    const black = await ethers.getContractAt(blackAbi, blackAddress);
    const amount = "10000"
    for(let i=0; i<1025; i++) {
        try {
            // create lock
            const approveTx = await black.approve(votingEscrowAddress, amount);
            await approveTx.wait();
            const createLockTX = await ve.create_lock(amount, 10*4000, false);
            await createLockTX.wait();
        } catch (err) {
            // for iteration: i
            console.error("error in creating lock for ith iteration: ", i, "with error: ", err);
        }
    }
} 

main()

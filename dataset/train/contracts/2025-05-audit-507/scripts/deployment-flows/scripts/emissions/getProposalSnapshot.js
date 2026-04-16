const { votingEscrowAbi, votingEscrowAddress } = require('../../../../generated/voting-escrow');
const { blackGovernorAbi, blackGovernorAddress } = require('../../../../generated/black-governor');


async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0];
    const ownerAddress = owner.address;
    
    const blackGovernorContract = await ethers.getContractAt(blackGovernorAbi, blackGovernorAddress);
    const votingEscrowContract = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress);
    // const pid = await blackGovernorContract.proposalVotes("494099073442461112096891230999994993929747967796522132747510522691287043031"); //assign pid
    // const snapshot = await blackGovernorContract.proposalSnapshot("494099073442461112096891230999994993929747967796522132747510522691287043031"); //assign pid
    // const quorum = await blackGovernorContract.quorum("1740420202"); //assign pid
    // console.log("statue of pid ", snapshot, quorum);
    const totalSupply = await votingEscrowContract.totalSupplyAtT("1740420202");
    // const xx = await votingEscrowContract.point_history(26);

    console.log("statue of pid ", totalSupply);
}

main()
  .then(
    () => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
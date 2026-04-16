const { votingEscrowAbi, votingEscrowAddress } = require('../../../../generated/voting-escrow');
const { blackGovernorAbi, blackGovernorAddress } = require('../../../../generated/black-governor');
const { minterUpgradeableAbi, minterUpgradeableAddress } = require('../../../../generated/minter-upgradeable');
const { BigNumber } = require("ethers");
const { blackAbi } = require('../../../../generated/black');
// const { blackAddress } = require('../../token-constants/deployed-tokens.json');
const deployedTokens = require('../../../deployment-flows/token-constants/deployed-tokens.json')
const blackAddress = deployedTokens[0].address;

async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0];
    const ownerAddress = owner.address;
    
    //Epoch 0: create locks for user 1
    const votingEscrowContract = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress, accounts[0]);
    const lockAmount1 = BigNumber.from(2000).mul(BigNumber.from("1000000000000000000"));
    // try {
    //   const black = await ethers.getContractAt(blackAbi, blackAddress, accounts[0]);
    //   const approvaltx = await black.approve(votingEscrowAddress, "2000000000000000000000");
    //   await approvaltx.wait();
    //   const createLocktx = await votingEscrowContract.create_lock("2000000000000000000000", "126144000", false);
    //   await createLocktx.wait();
    // } catch (error) {
    //   console.log("error in voting", error)
    // }

    const minterContract = await ethers.getContractAt(minterUpgradeableAbi, minterUpgradeableAddress, owner);
    const blackGovernorContract = await ethers.getContractAt(blackGovernorAbi, blackGovernorAddress, owner);

  //   function hashProposal(
  //     address[] memory targets,
  //     uint256[] memory values,
  //     bytes[] memory calldatas,
  //     bytes32 epochTimeHash
  // ) public pure virtual override returns (uint256) {

    try {
      const calldata = minterContract.interface.encodeFunctionData("nudge");
      // const pid = await blackGovernorContract.propose([minterUpgradeableAddress], [0], [calldata], "");
      // await pid.wait();
      // console.log("pid ", pid);
    } catch (error) {
      console.log("error in blackGovernorContract ", error)
    }
    const proposalId = await blackGovernorContract.getProposalId();
    console.log("proposalId: ", proposalId)
    // const votingTx = await blackGovernorContract.castVote(proposalId, 1);
    // await votingTx.wait();

    // const status = await blackGovernorContract.state(proposalId);
    // console.log("status: ", status)
    const deadline = await blackGovernorContract.proposalSnapshot(proposalId);
    console.log("Deadline: ", deadline)

    console.log("Deadilne of proposal: ", await blackGovernorContract.proposalDeadline(proposalId))
    // const quorum = await blackGovernorContract.quorom(deadline)
    // console.log("quorom: ", quorum);
    const calldata = minterContract.interface.encodeFunctionData("nudge");
    // //Epoch 1: execute
    const epochHash = await blackGovernorContract.epochStarts();
    const executeTx = await blackGovernorContract.execute([minterUpgradeableAddress], [0], [calldata], epochHash);    
    await executeTx.wait();
}

main()
  .then(
    () => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
const { ethers } = require("hardhat")
const { votingEscrowAbi, votingEscrowAddress } = require('../../../../generated/voting-escrow');
const { blackGovernorAbi, blackGovernorAddress } = require('../../../../generated/black-governor');
const { minterUpgradeableAbi, minterUpgradeableAddress } = require('../../../../generated/minter-upgradeable');
const { blackAbi } = require('../../../../generated/black');
const { BigNumber } = require("ethers");
// const { blackAddress } = require('../../token-constants/deployed-tokens.json');
const deployedTokens = require('../../../deployment-flows/token-constants/deployed-tokens.json')
const blackAddress = deployedTokens[0].address;

async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[1];
    const ownerAddress = owner.address;
    
    const blackZero = await ethers.getContractAt(blackAbi, blackAddress, accounts[0])
    const transfer = await blackZero.transfer(accounts[1].address, "1500000000000000000000")
    await transfer.wait();
    //* Epoch 0: Step 1 create locks for user 2
    const votingEscrowContract = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress, owner);
    const black = await ethers.getContractAt(blackAbi, blackAddress, owner);
    const approveTx = await black.approve(votingEscrowAddress, "1500000000000000000000");
    await approveTx.wait();
    const lockAmount2 = BigNumber.from(1500).mul(BigNumber.from("1000000000000000000"));
    const lockTx = await votingEscrowContract.create_lock(lockAmount2, 126144000, false);
    await lockTx.wait(); 

    //* Epoch 0: Step 2 create locks for user 2
    // const minterContract = await ethers.getContractAt(minterUpgradeableAbi, minterUpgradeableAddress);
    const blackGovernorContract = await ethers.getContractAt(blackGovernorAbi, blackGovernorAddress, owner);
    // const pid = "16134786894693074512526881837070247251028559825807118338989515965967069897879";

    // try {
      const proposalId = await blackGovernorContract.getProposalId();
      console.log("proposalId: ", proposalId)
      await blackGovernorContract.castVote(proposalId, 0); //need to pass pid after creating proposal
    // } catch (error) {
    //   console.log("error in blackGovernorContract ", error)
    // }

    // const getProposalVotes = await blackGovernorContract.proposalVotes(pid); 
    // console.log("getProposalVotes: ", getProposalVotes);

    // //Epoch 1
    // const getStatePid = await blackGovernorContract.state(pid); 
    // console.log("getStatePid: ", getStatePid);
}

main()
  .then(
    () => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
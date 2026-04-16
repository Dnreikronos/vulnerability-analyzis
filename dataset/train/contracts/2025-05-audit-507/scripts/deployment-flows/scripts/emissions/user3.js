const { votingEscrowAbi, votingEscrowAddress } = require('../../../../generated/voting-escrow');
const { blackGovernorAbi, blackGovernorAddress } = require('../../../../generated/black-governor');
const { minterUpgradeableAbi, minterUpgradeableAddress } = require('../../../../generated/minter-upgradeable');
const { BigNumber } = require("ethers");
const deployedTokens = require('../../../deployment-flows/token-constants/deployed-tokens.json')
const blackAddress = deployedTokens[0].address;
const { blackAbi } = require('../../../../generated/black');

async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[2];
    const ownerAddress = owner.address;

    const blackZero = await ethers.getContractAt(blackAbi, blackAddress, accounts[0])
    const transfer = await blackZero.transfer(accounts[2].address, "1500000000000000000000")
    await transfer.wait();
    
    //create locks
    const votingEscrowContract = await ethers.getContractAt(votingEscrowAbi, votingEscrowAddress, owner);
    const black = await ethers.getContractAt(blackAbi, blackAddress, owner);
    const amt = "1000000000000000000000"
    const approveTx = await black.approve(votingEscrowAddress, amt);
    await approveTx.wait();
    const lockAmount2 = BigNumber.from(1000).mul(BigNumber.from("1000000000000000000"));
    const lockTx = await votingEscrowContract.create_lock(amt, 126144000, false);
    await lockTx.wait();
    const blackGovernorContract = await ethers.getContractAt(blackGovernorAbi, blackGovernorAddress, owner);
    const proposalId = await blackGovernorContract.getProposalId();
      console.log("proposalId: ", proposalId)
      await blackGovernorContract.castVote(proposalId, 0); //need to pass pid after creating proposal

    //Epoch 2
    //delegate votes of user3 to user 2
    // votingEscrowContract.delegates("0xa7243fc6FB83b0490eBe957941a339be4Db11c29");
}

main()
  .then(
    () => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});

const { blackGovernorAbi, blackGovernorAddress } = require('../../../../generated/black-governor');



async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0];
    const ownerAddress = owner.address;
    
    const blackGovernorContract = await ethers.getContractAt(blackGovernorAbi, blackGovernorAddress);
    const pid = await blackGovernorContract.getProposalId(); //assign pid
    console.log("pid ", pid)
}

main()
  .then(
    () => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
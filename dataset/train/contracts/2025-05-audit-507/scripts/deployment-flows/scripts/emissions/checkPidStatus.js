
const { blackGovernorAbi, blackGovernorAddress } = require('../../../../generated/black-governor');



async function main () {
    accounts = await ethers.getSigners();
    owner = accounts[0];
    const ownerAddress = owner.address;
    
    const blackGovernorContract = await ethers.getContractAt(blackGovernorAbi, blackGovernorAddress);
    const statusPid = await blackGovernorContract.state("494099073442461112096891230999994993929747967796522132747510522691287043031"); //assign pid
    console.log("statue of pid ", statusPid)
}

main()
  .then(
    () => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
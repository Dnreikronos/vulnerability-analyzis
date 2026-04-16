const { bribeAbi } = require("../../generated/bribe");

const ar = [
    {
      id: "2",
      bribe_address: "0x52151AE1160Bf1C04C91D2fb8f1351f8c611C0E7",
      t0: "0x0Ea98bF8ff474639f6Cbeb4c4bDd1bA74aA9A4a4",
      t1: "0xBb0aB77Cf6E08f03e4cceABbA163860Cd1848df7",
      pair: "0x37EE15aF2BAcBF8E9DcBdB19C2580F16d3f3A389"
    },
    {
      id: "2",
      bribe_address: "0x2b64b33458c18821f82a8F219b3a14bB7925E9a8",
      t0: "0x0Ea98bF8ff474639f6Cbeb4c4bDd1bA74aA9A4a4",
      t1: "0xe79eb21cFcBe2F7DC1Ad7D908635493Dc8301C6f",
      pair: "0x19fCfE6B946aD4c4E4defcBaf4BAbaab9477480F"
    },
    {
      id: "2",
      bribe_address: "0x798C543Ea0f0E7d59733105E53fb09250123e176",
      t0: "0xBb0aB77Cf6E08f03e4cceABbA163860Cd1848df7",
      t1: "0xe79eb21cFcBe2F7DC1Ad7D908635493Dc8301C6f",
      pair: "0x9cA30f4e3323EF0910fC9c951Dc1A343340509ac"
    },
    {
      id: "2",
      bribe_address: "0x157306345611f9A89fa8453893cEEdF87E27B9A5",
      t0: "0xdDC18bF5f716742C746F156333f86E9c5bFbeC36",
      t1: "0xe79eb21cFcBe2F7DC1Ad7D908635493Dc8301C6f",
      pair: "0x1B2488E9F1A3727638d4975a04FC17b208159916"
    },
    {
      id: "2",
      bribe_address: "0x182c829B3A8baDD22e778673f6Cf1d54ED894D44",
      t0: "0x0Ea98bF8ff474639f6Cbeb4c4bDd1bA74aA9A4a4",
      t1: "0x7017d1489ba5902D7b5a9e74BBA8a3eA5addcE88",
      pair: "0xB79e751a24C90391D67E3acEC8a7E3CcBda02066"
    },
    {
      id: "2",
      bribe_address: "0x531ee5515A1c22dE00D398Be80f708ec4D56BeeA",
      t0: "0x0Ea98bF8ff474639f6Cbeb4c4bDd1bA74aA9A4a4",
      t1: "0x78dC6A039dDd938F70d8c50C2EF3C522BA0FB1e5",
      pair: "0x97526aFc651E372C0476D404aB1201bb203f23A7"
    },
    {
      id: "2",
      bribe_address: "0x1ECE39E87C06d0bc1D34a13d71e9F154D9F72723",
      t0: "0x0Ea98bF8ff474639f6Cbeb4c4bDd1bA74aA9A4a4",
      t1: "0xaf59662042247281E08f100Ce43bf647D39A2FA5",
      pair: "0xc8f77876Aef94AAE20726c2a44D70DCaE4Fa7adf"
    },
    {
      id: "2",
      bribe_address: "0xd321BE3F33ac640EdC7Ef5a242468f7Bfb139875",
      t0: "0x0Ea98bF8ff474639f6Cbeb4c4bDd1bA74aA9A4a4",
      t1: "0x41B3601B0e6becE4D14595979E041Ec6878777FC",
      pair: "0x38B77a67B5f45F05159754A4960e0E87A2cadF03"
    },
    {
      id: "2",
      bribe_address: "0x345c8Efd2332093566676e9C3D186528Ce8FFD78",
      t0: "0x0Ea98bF8ff474639f6Cbeb4c4bDd1bA74aA9A4a4",
      t1: "0xdDC18bF5f716742C746F156333f86E9c5bFbeC36",
      pair: "0xf30F5949F72b89d0AF02F3B9feCe96aC4C187509"
    },
    {
      id: "2",
      bribe_address: "0x755418d083B6BC3f182B0cd3b0f1E7a7A1cfd24d",
      t0: "0x0Ea98bF8ff474639f6Cbeb4c4bDd1bA74aA9A4a4",
      t1: "0xdDC18bF5f716742C746F156333f86E9c5bFbeC36",
      pair: "0x337E65E169E4492c39fA791435cd5Bdb0Dab5d45"
    },
    {
      id: "2",
      bribe_address: "0xC469CdC85555B93107C4BC1766C064168F6B8F7a",
      t0: "0x41B3601B0e6becE4D14595979E041Ec6878777FC",
      t1: "0xdDC18bF5f716742C746F156333f86E9c5bFbeC36",
      pair: "0x15dADA5e8907bdA9eFDDEA86278A459AD7C5E9eb"
    },
    {
      id: "2",
      bribe_address: "0x2B9609B60260eAf24b48392c8B87F79fAD56f471",
      t0: "0xBb0aB77Cf6E08f03e4cceABbA163860Cd1848df7",
      t1: "0xe79eb21cFcBe2F7DC1Ad7D908635493Dc8301C6f",
      pair: "0x4F4f8251111a4f302118Da1B99b36829Cc2B05Dd"
    },
    {
      id: "2",
      bribe_address: "0xe8ff7cC6212ECB2b3281Db4a2a1724f9bc1A4456",
      t0: "0x0Ea98bF8ff474639f6Cbeb4c4bDd1bA74aA9A4a4",
      t1: "0xC1E0C8Df13c0474a3ACecF80E0AB3d3d9dbBB0A0",
      pair: "0xcAb23D3B96d50F2A62164092172f3973Cf3902D5"
    },
    {
      id: "2",
      bribe_address: "0x3BbAfB0f5069b209efAb8566CAC9F553026e5881",
      t0: "0x0Ea98bF8ff474639f6Cbeb4c4bDd1bA74aA9A4a4",
      t1: "0xBb0aB77Cf6E08f03e4cceABbA163860Cd1848df7",
      pair: "0x59E1f39b34a784BDd8E70e0004C0067935D19145"
    }
  ];
  
async function main () {
    let bribe;
    for(let i=0; i<ar.length; i++) {
        bribe = await ethers.getContractAt(bribeAbi, ar[i].bribe_address);
        console.log("eraned t0: ", await bribe.earned(ar[i].id, ar[i].t0));
        console.log("eraned t1: ", await bribe.earned(ar[i].id, ar[i].t1));
    }
}

main().then(() => console.log("Done!"))
.catch((err) => console.error("Error in: ", err))
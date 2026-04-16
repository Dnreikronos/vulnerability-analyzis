const axios = require('axios');
const fs = require('fs');
const { tokenHandlerAbi, tokenHandlerAddress } = require("../../generated/token-handler");
const { genesisPoolManagerAddress, genesisPoolManagerAbi } = require('../../generated/genesis-pool-manager');
const {ethers} = require("hardhat");

async function main () {
    const tokenHandler = await ethers.getContractAt(tokenHandlerAbi, tokenHandlerAddress);
    const whitelistedTokens = await tokenHandler.whiteListedTokens();
    console.log("whitelisted tokens: ", whitelistedTokens.join(","));
    const whitelistSet = new Set(whitelistedTokens.map(addr => addr.toLowerCase()));

    accounts = await ethers.getSigners();
    owner = accounts[0];
    const ownerAddress = owner.address;
    console.log("ownerAddress 1 : ", ownerAddress)


    const GENESIS_URL = process.env.GENESIS_URL??'https://blackhole-assets.s3.us-east-1.amazonaws.com/genesis-info/genesis.json';
    const TOKEN_DETAILS_URL = process.env.TOKEN_DETAILS_URL??'https://blackhole-testnet-tokens.s3.us-east-1.amazonaws.com/static-token-details.json';

    console.log("URLS", GENESIS_URL, TOKEN_DETAILS_URL);

    const genesisResp = await axios.get(GENESIS_URL);
    const tokensResp = await axios.get(TOKEN_DETAILS_URL);

    const genesis = genesisResp.data;
    const tokens = tokensResp.data;

    const GenesisManagerContract = await ethers.getContractAt(genesisPoolManagerAbi, genesisPoolManagerAddress);

    const output = {};

    for (const entry of genesis) {
        const native = entry.nativeToken;
        const addrLower = native.address.toLowerCase();
        try {
            const val = await GenesisManagerContract.whiteListedTokensToUser(native.address, entry.ownerAddress);
            if (!val){
                console.log("whitelisting token:", native.address, entry.ownerAddress);
                await GenesisManagerContract.whiteListUserAndToken(entry.ownerAddress, native.address);
            }
            if (entry.ownerAddress.toLowerCase() !== ownerAddress.toLowerCase()) {
                const val1 = await GenesisManagerContract.whiteListedTokensToUser(native.address, ownerAddress);
                if (!val1) {
                    console.log("whitelisting token:", native.address, ownerAddress);
                    await GenesisManagerContract.whiteListUserAndToken(ownerAddress, native.address);
                }
            }
        }
        catch (e) {
            console.log("Error", e);
            //DO NOTHING
        }

        if (whitelistSet.has(addrLower) && !tokens.hasOwnProperty(addrLower)) {
            output[addrLower] = {
                name: native.name,
                address: native.address,
                logo: native.logo,
                decimal: parseInt(native.decimal),
                ticker: native.ticker,
                category: 1,
                cmc_id: '',
                existing_pair: '',
                usd_pricing: 0
            };
        }
    }

    const mergedTokens = {
        ...tokens,
        ...output
    };

    fs.writeFileSync('merged_tokens.json', JSON.stringify(mergedTokens, null, 2));
}

main().then(() => console.log("Done!"))

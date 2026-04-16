const { fetchAbi } = require('./abi-fetcher.js')
const fs = require('fs');
const path = require('path');

const dirPath = './generated'

const generateConstantFile = (contract, address) => {

    try {
        const abi = fetchAbi(contract);

        const contractCamelCase = contract.charAt(0).toLowerCase() + contract.slice(1);
        const contractCamelCaseVersion  = process.env.DEPLOYMENT_VERSION ?? '0';
        const contractData = 
        `const ${contractCamelCase}Version = "${contractCamelCaseVersion}";\n\nconst ${contractCamelCase}Address = "${address}";\n\nconst ${contractCamelCase}Abi = ${JSON.stringify(abi, null, 2)};\n\nmodule.exports = {${contractCamelCase}Address, ${contractCamelCase}Abi, ${contractCamelCase}Version};`;

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        const filename = contract.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        const pathname = `${dirPath}/${filename}.js`
        fs.writeFileSync(pathname, contractData);
        console.log(`Data written to ${pathname}\n`);

    } catch (error) {
        console.error("Error fetching pairs data: ", error);
    }

}

module.exports = { generateConstantFile };
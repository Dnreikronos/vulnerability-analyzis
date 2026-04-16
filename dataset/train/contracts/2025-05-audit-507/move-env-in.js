const fs = require("fs");
const path = require("path");

function moveGeneratedIn(env) {
    const envGeneratedDir = path.resolve(__dirname, 'envFiles',env, "generated");
    const targetGeneratedDir = path.resolve(__dirname, "generated");
    const sourceBlackTimeFile = path.resolve(__dirname, 'envFiles',env, "BlackTimeLibrary.sol");
    const targetBlackTimeLibraryDir = path.resolve(__dirname, "contracts", "libraries");
    const targetBlackTimeLibraryFile = path.join(targetBlackTimeLibraryDir, "BlackTimeLibrary.sol");


    const sourceDeployedTokensFile = path.resolve(__dirname, 'envFiles',env, "deployed-tokens.json");
    const targetDeployedTokensDir = path.resolve(__dirname, "scripts", "deployment-flows","token-constants");
    const targetDeployedTokensFile = path.join(targetDeployedTokensDir, "deployed-tokens.json");

    // Move "generated" directory
    if (fs.existsSync(envGeneratedDir)) {
        if (fs.existsSync(targetGeneratedDir)) {
            fs.rmSync(targetGeneratedDir, { recursive: true, force: true });
        }
        fs.cpSync(envGeneratedDir, targetGeneratedDir, { recursive: true });
        console.log(`🔁 Moved ${env}/generated → generated`);
    } else {
        console.error(`❌ ${env}/generated not found!`);
    }

    if (fs.existsSync(sourceBlackTimeFile)) {
        fs.mkdirSync(targetBlackTimeLibraryDir, { recursive: true });
        fs.copyFileSync(sourceBlackTimeFile, targetBlackTimeLibraryFile);
        console.log(`📄 Moved ${sourceBlackTimeFile} → ${targetBlackTimeLibraryFile}`);
    } else {
        console.error(`❌ ${env}/example.txt not found!`);
    }

    if (fs.existsSync(sourceDeployedTokensFile)) {
        fs.mkdirSync(targetDeployedTokensDir, { recursive: true });
        fs.copyFileSync(sourceDeployedTokensFile, targetDeployedTokensFile);
        console.log(`📄 Moved ${sourceDeployedTokensFile} → ${targetDeployedTokensFile}`);
    }
}

module.exports = moveGeneratedIn;

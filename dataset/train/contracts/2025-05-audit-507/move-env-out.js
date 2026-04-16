const fs = require("fs");
const path = require("path");

function moveGeneratedOut(env) {
    const envGeneratedDir = path.resolve(__dirname, 'envFiles',env, "generated");
    const targetGeneratedDir = path.resolve(__dirname, "generated");

    if (fs.existsSync(envGeneratedDir)) {
        // Remove the target folder "generated" from the main directory
        fs.rmSync(envGeneratedDir, { recursive: true, force: true });

        // Move the "generated" folder back to the environment folder
        fs.cpSync(targetGeneratedDir, envGeneratedDir, { recursive: true });
        console.log(`🔁 Moved generated → ${env}/generated`);

    } else {
        console.error(`❌ generated folder not found!`);
    }

    const sourceDeployedTokensFile = path.resolve(__dirname, 'envFiles',env, "deployed-tokens.json");
    const targetDeployedTokensDir = path.resolve(__dirname, "scripts", "deployment-flows","token-constants");
    const targetDeployedTokensFile = path.join(targetDeployedTokensDir, "deployed-tokens.json");

    if (fs.existsSync(targetDeployedTokensFile)) {
        fs.copyFileSync(targetDeployedTokensFile, sourceDeployedTokensFile);
        console.log(`📄 Moved ${targetDeployedTokensFile} → ${sourceDeployedTokensFile}`);
    }
}

module.exports = moveGeneratedOut;

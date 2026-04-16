const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const moveGeneratedIn = require("./move-env-in");
const moveGeneratedOut = require("./move-env-out");

const args = process.argv.slice(2);


function getFormattedDateTime() {
    const now = new Date();

    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const yyyy = now.getFullYear();

    const hh = String(now.getHours()).padStart(2, '0');
    const MM = String(now.getMinutes()).padStart(2, '0');

    return `${dd}${mm}${yyyy}${hh}${MM}`;
}

let scriptPath;
let env = "devnet";
let network = "fuji";
let version = getFormattedDateTime();
console.log("version: ", version);

args.forEach((arg, index) => {
    if (arg === "--env" && args[index + 1]) env = args[index + 1];
    if (arg === "--network" && args[index + 1]) network = args[index + 1];
    if (arg === "--version" && args[index + 1]) version = args[index + 1];
    if (!scriptPath && (arg.endsWith(".js") || arg.endsWith(".ts"))) {
        scriptPath = arg;
    }
});


process.env.DEPLOYMENT_VERSION = version;

let exitCode = 0;
let interrupted = false;

// Signal handlers
const handleSignal = (signal) => {
    console.log(`\n🛑 Caught signal ${signal}. Cleaning up...`);
    interrupted = true;
    exitCode = 130; // Common code for SIGINT
};

process.on("SIGINT", () => handleSignal("SIGINT"));
process.on("SIGTERM", () => handleSignal("SIGTERM"));

moveGeneratedIn(env);

try {
    execSync(`npx hardhat compile`, { stdio: "inherit" });
} catch (error) {
    console.error(`❌ Script error: ${error.message}`);
    exitCode = error.status || 1;
} finally {
    moveGeneratedOut(env);
    if (interrupted || exitCode !== 0) {
        process.exit(exitCode);
    }
}

const { ethers } = require("hardhat")
const { run } = require("hardhat");
const execSync = require('child_process').execSync;


const deploymentVersion = process.env.DEPLOYMENT_VERSION;
const env = process.env.ENV_NET;
const network = process.env.NETWORK;

console.log("deployment version: ", deploymentVersion, " env ", env, " network ", network)

const deployCLPoolDependency = async() => {
    execSync(
        `node run.js scripts/deployment-flows/scripts/cl/deploy-custom-pools.js --network ${network} --env ${env} --version ${deploymentVersion}`,
        { stdio: 'inherit' }
    );
    execSync(
    `node run.js scripts/deployment-flows/scripts/cl/setAlgebraPoolApiInGauge.js --network ${network} --env ${env} --version ${deploymentVersion}`,
    { stdio: 'inherit' }
    );
    execSync(
    `node run.js scripts/deployment-flows/scripts/cl/setCommunityFeeWithdrawer.js --network ${network} --env ${env} --version ${deploymentVersion}`,
    { stdio: 'inherit' }
    );
    execSync(
    `node run.js scripts/deployment-flows/scripts/cl/setFarmingParamGaugeManager.js --network ${network} --env ${env} --version ${deploymentVersion}`,
    { stdio: 'inherit' }
    );
    execSync(
    `node run.js scripts/deployment-flows/scripts/cl/setIncentiveMarkerRole.js --network ${network} --env ${env} --version ${deploymentVersion}`,
    { stdio: 'inherit' }
    );
    execSync(
    `node run.js scripts/deployment-flows/scripts/cl/setReferralFeeInGaugeFactory.js --network ${network} --env ${env} --version ${deploymentVersion}`,
    { stdio: 'inherit' }
    );

    execSync(
    `node run.js scripts/deployment-flows/scripts/cl/add_custom_deployer_apistorage.js --network ${network} --env ${env} --version ${deploymentVersion}`,
    { stdio: 'inherit' }
    );
}

async function main () {
    await deployCLPoolDependency();
}

main()
    .then(() => console.log("✅ Done"))
    .catch(err => {
    console.error(err);
    process.exit(1);
});
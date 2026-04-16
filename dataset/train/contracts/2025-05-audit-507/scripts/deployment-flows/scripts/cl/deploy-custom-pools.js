const { ethers, network } = require("hardhat");
const fs = require("fs");
const path = require("path");
const { generateConstantFile } = require("../../../blackhole-scripts/postDeployment/generator");
const {
  entryPoint: ENTRY_POINT_ADDRESS,
  algebraFactory,
  pluginFactory,
  algebraFarmingProxyPluginFactory,
} = require("../contract-deployments/algebra-addresses");
const { algebraPoolAPIStorageAddress } = require("../../../../generated/algebra-pool-apistorage");

const PLUGIN_ADDRESS = "0x0000000000000000000000000000000000000000";
const ALGEBRA_FEE_RECIPIENT = "0x99767d366a143793C8F28190Bc1b85896Cfe5188";
const ALGEBRA_FEE_MANAGER = "0x476461e6d5cAf709Fe2455f881721853Ce0433A5";
// Denomimator while computing communityFee is 1e3 so updating fee from 200 to 20. 
const ALGEBRA_FEE_SHARE = 20;

async function deployCustomPoolDeployer(tickSpacing, config) {
  try {
    const CustomPoolDeployerFactory = await ethers.getContractFactory("CustomPoolDeployer");
    const customPoolDeployer = await CustomPoolDeployerFactory.deploy(
      ENTRY_POINT_ADDRESS,
      PLUGIN_ADDRESS,
      tickSpacing,
      algebraPoolAPIStorageAddress,
      config.algebraFeeRecipient,
      config.algebraFeeManager,
      config.algebraFeeShare,
      algebraFarmingProxyPluginFactory,
      algebraFactory,
      pluginFactory
    );
    await customPoolDeployer.deployed();
    console.log(`CustomPoolDeployer with tickSpacing ${tickSpacing} deployed at: ${customPoolDeployer.address}`);
    return customPoolDeployer.address;
  } catch (error) {
    console.error(`Error deploying CustomPoolDeployer with tickSpacing ${tickSpacing}:`, error);
    process.exit(1);
  }
}

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const config = {
    algebraFeeRecipient: ALGEBRA_FEE_RECIPIENT,
    algebraFeeManager: ALGEBRA_FEE_MANAGER,
    algebraFeeShare: ALGEBRA_FEE_SHARE,
  };

  console.log("Deployment configuration:");
  console.log(`- Entry Point Address: ${ENTRY_POINT_ADDRESS}`);
  console.log(`- Plugin Address: ${PLUGIN_ADDRESS}`);
  console.log(`- Algebra Pool API Storage Address: ${algebraPoolAPIStorageAddress}`);
  console.log(`- Algebra Fee Recipient: ${config.algebraFeeRecipient}`);
  console.log(`- Algebra Fee Manager: ${config.algebraFeeManager}`);
  console.log(`- Algebra Fee Share: ${config.algebraFeeShare}`);
  console.log(`- Algebra farming proxy factory: ${algebraFarmingProxyPluginFactory}`);

  const tickSpacings = [1, 20, 100, 1000];
  const deployedContracts = {};

  for (const tickSpacing of tickSpacings) {
    console.log(`\nDeploying CustomPoolDeployer for tickSpacing: ${tickSpacing}`);
    const contractAddress = await deployCustomPoolDeployer(tickSpacing, config);
    deployedContracts[`tickSpacing_${tickSpacing}`] = contractAddress;
  }

  console.log("\nAll CustomPoolDeployer contracts deployed successfully:");
  console.log(JSON.stringify(deployedContracts, null, 2));

  // Write deployed contracts to a JSON file
  const deploymentData = {
    timestamp: new Date().toISOString(),
    network: network.name,
    deployer: deployer.address,
    entryPoint: ENTRY_POINT_ADDRESS,
    plugin: PLUGIN_ADDRESS,
    algebraPoolAPIStorage: algebraPoolAPIStorageAddress,
    algebraFeeRecipient: config.algebraFeeRecipient,
    algebraFeeManager: config.algebraFeeManager,
    algebraFeeShare: config.algebraFeeShare,
    algebraFactory,
    pluginFactory,
    algebraFarmingProxyPluginFactory,
    contracts: deployedContracts,
  };

  const deploymentsDir = path.join(__dirname, "../../../../generated");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const filePath = path.join(deploymentsDir, `custom-pool-deployers.json`);
  fs.writeFileSync(filePath, JSON.stringify(deploymentData, null, 2));
  console.log(`\nDeployment data written to: ${filePath}`);

  //Only writing first abi, since all are same
  for (const key in deployedContracts) {
    generateConstantFile(`CustomPoolDeployer`, deployedContracts[key]);
    break;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

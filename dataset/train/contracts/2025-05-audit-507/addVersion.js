const fs = require("fs");
const path = require("path");

// Folder path where your contract files are located
const contractsFolderPath = path.join(__dirname, "devnet/generated"); // Change this to the actual folder path

// Function to convert hyphenated filenames to camelCase
function toCamelCase(str) {
    return str.replace(/-./g, match => match.charAt(1).toUpperCase());
}

// Function to modify files in the folder
function modifyContractFiles() {
    fs.readdirSync(contractsFolderPath).forEach((file) => {
        const filePath = path.join(contractsFolderPath, file);

        // Only process .js files
        if (path.extname(file) === ".js") {
            console.log(`Processing file: ${file}`);

            // Get the filename without extension (e.g., "abc-def" for "abc-def.js")
            const fileNameWithoutExtension = path.basename(file, ".js");

            // Convert the filename (e.g., "abc-def" to "abcDef")
            let versionVariableName = `${toCamelCase(fileNameWithoutExtension)}Version`;

            // Read the content of the file
            let content = fs.readFileSync(filePath, 'utf8');

            // Regex to match lines defining a constant with Address
            const addressRegex = /const\s+(\w+Address)\s*=\s*["'\w]+;\s*/g;
            let match;

            // Replace Address with Version in variable names
            while ((match = addressRegex.exec(content)) !== null) {
                const addressVariable = match[1];  // e.g., algebraPoolAPIAddress
                versionVariableName = addressVariable.replace('Address', 'Version');  // e.g., algebraPoolAPIVersion

                // Replace all occurrences of the address variable with the corresponding version variable
            }

            // Insert the version variable into the module.exports
            const modifiedContent = content.replace(
                "module.exports = {",
                `const ${versionVariableName} = "0";\nmodule.exports = {${versionVariableName},`
            );

            // Write the modified content back to the file
            fs.writeFileSync(filePath, modifiedContent, 'utf8');
            console.log(`Updated ${file}`);
        }
    });
}

// Call the function to modify files
modifyContractFiles();

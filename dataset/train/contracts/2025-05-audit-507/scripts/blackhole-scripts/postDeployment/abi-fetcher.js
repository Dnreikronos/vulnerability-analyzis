const fs = require('fs');
const path = require('path');

const listAllFiles = (dirPath, contract) => {
    let result = ''; 
    const files = fs.readdirSync(dirPath);
  
    for (const file of files){
      if(result != '') 
        break;

      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
  
      if (stats.isDirectory()) {
        result = listAllFiles(filePath, contract);
      } else if(filePath.includes(`/${contract}.json`)) {
        result = filePath;
      }
    };

    return result;
}

const fetchAbiFromPath = (path) => {
    const fileContent = fs.readFileSync(path, 'utf8');
    const jsonContent = JSON.parse(fileContent);
    return jsonContent.abi;
}

const fetchAbi  = (contract) =>  {
    const folderPath = './artifacts/contracts'; 
    const filePath = listAllFiles(folderPath, contract); 
    if(filePath == '')
       return;

    const abi = fetchAbiFromPath(filePath);
    if(abi == undefined)
      return;

    return abi;
    // console.log("data : ", filePath, abi);
}

module.exports = { fetchAbi };
const fs = require('fs');

const contractPath = `artifacts/contracts/cutepoop.sol/CutePoopNFT.json`
const obj = JSON.parse(fs.readFileSync(contractPath));
const size = Buffer.byteLength(obj.deployedBytecode, 'utf8') / 2

console.log("size : ", size)
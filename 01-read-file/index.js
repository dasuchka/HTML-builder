const fs = require("fs");
const path = require("path");
const streamRead=fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

let data='';

streamRead.on('data', chunk=> data+=chunk);
streamRead.on('end', () => console.log(data));


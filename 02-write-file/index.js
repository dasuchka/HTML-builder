const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "text.txt");

fs.writeFile(file, "i'm here", err => {
    if (err) {
        throw err
    }
})
const fs = require("fs");
const path = require("path");
const textFile = path.join(__dirname, "text.txt");

const readline = require('readline');
const intf =readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

fs.writeFile(textFile, '', err => {
    if (err) {
        throw err
    }
})

intf.question('Please, enter something:\n', (input) =>{
    if (input === "") return console.log ("You write nothing! Please, write again");
    fs.appendFile(textFile, input+'\n', err => {
        if (err) {
            throw err
        }
    })
})

intf.on('line', (input) => {
    if (input === "exit"){
        intf.on('close', () => {
            console.log('Thank you, goodbye!')
        });
        return intf.close();
    }
    fs.appendFile(textFile, input+'\n', err => {
        if (err) {
            throw err
        }
    })
})

intf.on('SIGINT', () => {
    console.log('Thank you, goodbye!');
    return intf.close();
})


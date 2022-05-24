const readfiles = require('fs/promises');
const path = require("path");
const textFile = path.join(__dirname, "secret-folder");

async function getFiles(){
    const files= await(readfiles.readdir(textFile));
    files.forEach((file) => {
        let fileDisc=file+' - '+ path.extname(file)+' - ';
        async function getFileSize (fileN){
            const filePath=path.join(__dirname, "secret-folder", fileN);
            const fileSize = await(readfiles.stat(filePath));
            if (fileSize.size!==0){
                fileDisc+=fileSize.size+' byte';
                console.log(fileDisc);
            }
        }
        getFileSize(file);
    })

}

getFiles();



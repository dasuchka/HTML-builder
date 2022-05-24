const fs = require ('fs');
const path = require ('path');
const fs_promises = require ('fs/promises');
const directoryFiles = path.join(__dirname, "files");



fs.mkdir(path.join(__dirname, "files-copy"), { recursive: true }, err => {
    if (err) {
        throw err;
    }
})

async function clearDirectory (){
    const filesInFiles = await(fs_promises.readdir(path.join(__dirname, "files-copy")));
    filesInFiles.forEach((file) => {
        const fileNewDirPath = path.join(__dirname, "files-copy", file);
        fs.unlink(fileNewDirPath, err =>{
            if (err) {
                throw err;
            }
        })
    })
}


async function copyFiles () {
    clearDirectory();
    const filesInFiles = await(fs_promises.readdir(directoryFiles));
    filesInFiles.forEach((file) => {
        const filePath = path.join(__dirname, "files", file);
        const newDirectoryPath = path.join(__dirname, "files-copy", file);
        fs.copyFile(filePath, newDirectoryPath, err => {
            if (err) {
                throw err;
            }
        })
    })
}

copyFiles();

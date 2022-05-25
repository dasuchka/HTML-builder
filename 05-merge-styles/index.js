const fs = require ('fs');
const path = require ('path');
const fs_promises = require ('fs/promises');
const { fileURLToPath } = require('url');

const stylesPath=path.join(__dirname, "styles");
const projectDistPath=path.join(__dirname, "project-dist");

fs.writeFile(path.join(projectDistPath, "bundle.css"), '', err => {
    if (err) {
        throw err
    }
})


async function CopyStyles () {
    let copiedStyles = await(fs_promises.readdir(stylesPath));
    for (let i=0; i<copiedStyles.length; i++){
        if (path.extname(copiedStyles[i])!==".css"){
            copiedStyles.splice(i, 1);
        }else{
            let data='';
            const streamRead=fs.createReadStream(path.join(stylesPath, copiedStyles[i]), 'utf-8');
            streamRead.on('data', chunk=> data+=chunk);
            streamRead.on('end', () => {
                fs.appendFile(path.join(projectDistPath, "bundle.css"), data+'\n', err => {
                if (err) {
                    throw err
                }}
                )});

        }
        
    }
    
}

CopyStyles();

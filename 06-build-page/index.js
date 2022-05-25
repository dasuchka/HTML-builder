const fs = require ('fs');
const fs_promises = require ('fs/promises');
const path = require ('path');

//Make new directory

fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true }, err => {
    if (err){
        throw err;
    }
})

//Make assets in new directory

fs.mkdir(path.join(__dirname, "project-dist", "assets"), { recursive: true }, err => {
    if (err) {
        throw err;
    }
})

//Create directories in assets and copy files inside, update

clearDirsAssets();

addDirectories();

async function clearDirsAssets (){
    const filesInFiles = await(fs_promises.readdir(path.join(__dirname, "project-dist", "assets")));
    filesInFiles.forEach((dir) => {
       async function getAssetsFiles(dir){
        const filesInDirsAssets=await(fs_promises.readdir(path.join(__dirname, "project-dist", "assets", dir)));
        filesInDirsAssets.forEach((file) => {
            const fileDirPath = path.join(__dirname, "project-dist", "assets", dir, file);
            fs.unlink(fileDirPath, err =>{
                if (err) {
                    throw err;
                 }
             })
        })
       }
       getAssetsFiles(dir);
    })
}


async function copyFiles (dir) {
    //clearDirsAssets(dir);
    const filesInFiles = await(fs_promises.readdir(path.join(__dirname, "assets", dir)));
    filesInFiles.forEach((file) => {
        const filePath = path.join(__dirname, "assets", dir, file);
        const newDirectoryPath = path.join(__dirname, "project-dist", "assets", dir, file);
        fs.copyFile(filePath, newDirectoryPath, err => {
            if (err) {
                throw err;
            }
        })
    })
}

async function addDirectories (){
    const dirInAssets = await(fs_promises.readdir(path.join(__dirname, "assets")));
    dirInAssets.forEach((dir)=>{
        fs.mkdir(path.join(__dirname, "project-dist", "assets", dir), { recursive: true }, err => {
            if (err){
                throw err;
            }
        })
        copyFiles(dir);
    })
}



//Build index.html file in project-dist

let htmlTemplateCopy='';

const templateRead=fs.createReadStream(path.join(__dirname, "template.html"), "utf-8");
templateRead.on("data", chunk => htmlTemplateCopy+=chunk);
templateRead.on("end", err => {
    if (err){
        throw err;
    }
})


async function readComponents (){
    const components=await(fs_promises.readdir(path.join(__dirname, "components"), "utf-8"));
    for (let i=0; i<components.length; i++){
        components[i]=components[i].slice(0, -5);
    }

    let newHtml='';

    for (let i=0; i< components.length; i++){
        let component ='';
        const componentRead=fs.createReadStream(path.join(__dirname, "components", components[i]+".html"), "utf-8");
        componentRead.on("data", chunk => component+=chunk);
        componentRead.on("end", err => {
            if (err){
                throw err;
            }
            newHtml=htmlTemplateCopy.replace(`{{${components[i]}}}`, component);
            htmlTemplateCopy=newHtml;
            fs.writeFile(path.join(__dirname, "project-dist", "index.html"), htmlTemplateCopy, err => {
                if (err){
                    throw err;
                }
            })
        }) 
    }
}

readComponents();


//Copy all styles into style.css


fs.writeFile(path.join(__dirname, "project-dist", "style.css"), '', err => {
    if (err) {
        throw err
    }
})

const stylesPath=path.join(__dirname, "styles");

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
                fs.appendFile(path.join(__dirname, "project-dist", "style.css"), data+'\n', err => {
                if (err) {
                    throw err
                }}
                )});

        }
        
    }
    
}

CopyStyles();




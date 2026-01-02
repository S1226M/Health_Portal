const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

// Target the new location
const componentsDir = "d:/Health_Portal/app/admin/components";
const files = getAllFiles(componentsDir);

let count = 0;
files.forEach(filePath => {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('/admin/modules/')) {
            console.log(`Updating paths in ${filePath}`);
            content = content.replace(/\/admin\/modules\//g, '/admin/components/');
            fs.writeFileSync(filePath, content, 'utf8');
            count++;
        }
    }
});
console.log(`Updated paths in ${count} files.`);

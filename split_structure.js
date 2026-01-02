const fs = require('fs');
const path = require('path');

const componentsDir = "d:/Health_Portal/app/admin/components";
const modulesDir = "d:/Health_Portal/modules";

const modules = ['hop', 'lab', 'loc', 'pay', 'phm', 'sur'];

function moveFolder(src, dest) {
    if (fs.existsSync(src)) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        // Move contents
        const files = fs.readdirSync(src);
        files.forEach(file => {
            const srcFile = path.join(src, file);
            const destFile = path.join(dest, file);
            console.log(`Moving ${srcFile} -> ${destFile}`);
            fs.renameSync(srcFile, destFile);
        });
        // Remove empty src dir
        fs.rmdirSync(src);
    }
}

modules.forEach(mod => {
    const modPath = path.join(componentsDir, mod);
    if (fs.existsSync(modPath)) {
        const features = fs.readdirSync(modPath);
        features.forEach(feat => {
            const featPath = path.join(modPath, feat);
            if (fs.statSync(featPath).isDirectory()) {
                // Check for ui and action
                moveFolder(path.join(featPath, 'ui'), path.join(modulesDir, mod, feat, 'ui'));
                moveFolder(path.join(featPath, 'action'), path.join(modulesDir, mod, feat, 'action'));
            }
        });
    }
});
console.log("Split complete.");

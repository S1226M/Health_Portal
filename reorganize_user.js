const fs = require('fs');
const path = require('path');

const userDir = "d:/Health_Portal/app/user";

// Define absolute paths for directories that will be moving
const moves = [
    { src: path.join(userDir, 'components/findDoctors'), dest: path.join(userDir, 'modules/hop/findDoctors') },
    { src: path.join(userDir, 'components/hop/appointment'), dest: path.join(userDir, 'modules/hop/appointment') },
    { src: path.join(userDir, 'components/hop/findDoctor'), dest: path.join(userDir, 'modules/hop/findDoctor') },
    { src: path.join(userDir, 'components/hop/specialization'), dest: path.join(userDir, 'modules/hop/specialization') },
    { src: path.join(userDir, 'components/phm/medicines'), dest: path.join(userDir, 'modules/phm/medicines') },
    { src: path.join(userDir, 'components/userProfile'), dest: path.join(userDir, 'modules/sec/userProfile') },
    { src: path.join(userDir, 'modules/appointments'), dest: path.join(userDir, 'modules/hop/appointment') },
    { src: path.join(userDir, 'modules/pharmacy'), dest: path.join(userDir, 'modules/phm/medicines') }
];

// Map of string replacements to run on all .tsx and .ts files inside app/user
// Need to replace the imports and Next.js internal link paths
// We use regex or simple string replace globally
const replacements = [
    { search: /\/user\/components\/findDoctors/g, replace: '/user/modules/hop/findDoctors' },
    { search: /\/user\/components\/hop\/appointment/g, replace: '/user/modules/hop/appointment' },
    { search: /\/user\/components\/hop\/findDoctor/g, replace: '/user/modules/hop/findDoctor' },
    { search: /\/user\/components\/hop\/specialization/g, replace: '/user/modules/hop/specialization' },
    { search: /\/user\/components\/phm\/medicines/g, replace: '/user/modules/phm/medicines' },
    { search: /\/user\/components\/userProfile/g, replace: '/user/modules/sec/userProfile' },
    { search: /\/user\/modules\/appointments/g, replace: '/user/modules/hop/appointment' },
    { search: /\/user\/modules\/pharmacy/g, replace: '/user/modules/phm/medicines' }
];

function moveRecursively(src, dest) {
    if (!fs.existsSync(src)) return;

    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const files = fs.readdirSync(src);
    files.forEach(file => {
        const srcFile = path.join(src, file);
        const destFile = path.join(dest, file);

        if (fs.statSync(srcFile).isDirectory()) {
            moveRecursively(srcFile, destFile);
        } else {
            // Because appointments mapped to hop/appointment, and hop/appointment mapped to hop/appointment, 
            // these files merge into the same directory.
            if (fs.existsSync(destFile)) {
                console.log(`Warning: File already exists at ${destFile}, overwriting or skipping? Skip for safety.`);
            } else {
                fs.renameSync(srcFile, destFile);
            }
        }
    });

    // Cleanup empty dirs
    try {
        fs.rmdirSync(src);
    } catch (e) { /* ignore */ }
}

console.log("Starting directory moves...");
moves.forEach(({ src, dest }) => {
    moveRecursively(src, dest);
});
console.log("Directory moves completed.");

function getAllFiles(dirPath, arrayOfFiles) {
    if (!fs.existsSync(dirPath)) return arrayOfFiles || [];
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
            arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, file));
        }
    });

    return arrayOfFiles;
}

console.log("Starting path replacements...");
const allUserFiles = getAllFiles(userDir);

let count = 0;
allUserFiles.forEach(filePath => {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        replacements.forEach(({ search, replace }) => {
            content = content.replace(search, replace);
        });

        if (content !== originalContent) {
            console.log(`Updating paths in ${filePath}`);
            fs.writeFileSync(filePath, content, 'utf8');
            count++;
        }
    }
});
console.log(`Updated paths in ${count} files.`);

// Cleanup old empty folders in components
try {
    fs.rmdirSync(path.join(userDir, 'components/hop'));
    fs.rmdirSync(path.join(userDir, 'components/phm'));
    fs.rmdirSync(path.join(userDir, 'components/userProfile'));
} catch (e) {
    // ignore
}

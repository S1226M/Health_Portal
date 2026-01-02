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

const files = getAllFiles("d:/Health_Portal/app/admin/modules");
const idPages = files.filter(f => f.includes('[id]') && f.endsWith('page.tsx'));

idPages.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace the params definition
    // Old: { params }: { params: { id: string } }
    // New: { params }: { params: Promise<{ id: string }> }

    // Also need to make the function async if we want to await (Next.js handles async components fine)

    const regex = /export default function (\w+)\s*\(\{\s*params\s*\}\s*:\s*\{\s*params\s*:\s*\{\s*id\s*:\s*string\s*\}\s*\}\)/;

    // Check if it matches
    if (regex.test(content)) {
        console.log(`Fixing ${filePath}`);
        // We will replace it with: export default async function Name({ params }: { params: Promise<{ id: string }> })
        // And we might need to `(await params).id` inside if we used `params.id`.
        // In my code I didn't actually use `params.id` in the logic much, aside from maybe receiving it.
        // Wait, I didn't use it in the body in most cases, or just didn't use it at all.
        // Actually I mostly just accepted it.
        // Let's just update the type signature to satisfy the build.

        content = content.replace(
            /(export default function )(\w+)(\s*\(\{\s*params\s*\}\s*:\s*\{\s*params\s*:\s*\{\s*id\s*:\s*string\s*\}\s*\}\))/g,
            'export default async function $2({ params }: { params: Promise<{ id: string }> })'
        );

        fs.writeFileSync(filePath, content, 'utf8');
    }
});
console.log("Done fixing params types.");


const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const projectRoot = __dirname;
const nodeBin = path.join(projectRoot, 'node_runtime/bin/node');
const npmCli = path.join(projectRoot, 'node_runtime/bin/npm');

// Add system paths to env
const env = { ...process.env };
const systemPaths = ['/usr/local/sbin', '/usr/local/bin', '/usr/sbin', '/usr/bin', '/sbin', '/bin'];
env.PATH = `${path.dirname(nodeBin)}:${env.PATH}:${systemPaths.join(':')}`;

function run(cmd, args, cwd = projectRoot) {
    console.log(`> ${cmd} ${args.join(' ')}`);
    const res = spawnSync(cmd, args, { cwd, env, stdio: 'inherit' });
    if (res.status !== 0) {
        console.error(`Failed with status ${res.status}`);
        process.exit(res.status || 1);
    }
}

// 1. Icon Overhaul logic
console.log('Fixing Icons with Safe Zone Padding...');
const resDir = path.join(projectRoot, 'android/app/src/main/res');
// Transparent glyph (centered, 50% relative size)
const fgGlyphSrc = '/home/oki/.gemini/antigravity/brain/31fbd8b1-e438-43ee-bc83-868d3c8dfa31/adaptive_foreground_glyph_1767877539522.png';
// Solid legacy icon
const solidIconSrc = path.join(projectRoot, 'public/logo.png');

if (fs.existsSync(fgGlyphSrc)) {
    const folders = fs.readdirSync(resDir);
    folders.forEach(folder => {
        const folderPath = path.join(resDir, folder);
        if (!fs.statSync(folderPath).isDirectory()) return;

        // Adaptive Foreground - Uses transparent glyph
        const fgTargets = ['ic_launcher_foreground.png'];
        fgTargets.forEach(target => {
            const targetPath = path.join(folderPath, target);
            if (folder.startsWith('mipmap-') || folder.startsWith('drawable-')) {
                fs.copyFileSync(fgGlyphSrc, targetPath);
            }
        });

        // Legacy icons - Uses solid logo
        const legacyTargets = ['ic_launcher.png', 'ic_launcher_round.png'];
        legacyTargets.forEach(target => {
            if (folder.includes('anydpi')) return;
            const targetPath = path.join(folderPath, target);
            if (folder.startsWith('mipmap-') || folder.startsWith('drawable-')) {
                fs.copyFileSync(solidIconSrc, targetPath);
            }
        });
    });
}

// 2. Build Web
console.log('Building Application...');
run(nodeBin, [npmCli, 'run', 'build']);

// 3. Cap Sync
run(nodeBin, [npmCli, 'exec', 'cap', 'sync', 'android']);

// 4. Gradle Build
const gradlew = path.join(projectRoot, 'android/gradlew');
run('bash', [gradlew, 'assembleDebug'], path.join(projectRoot, 'android'));

console.log('Build Complete.');

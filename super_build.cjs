
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

// 1. Fix Logo Resources
console.log('Fixing Logo Resources...');
const resDir = path.join(projectRoot, 'android/app/src/main/res');
const logoSrc = path.join(projectRoot, 'public/logo.png');

if (fs.existsSync(logoSrc)) {
    const folders = fs.readdirSync(resDir);
    folders.forEach(folder => {
        const folderPath = path.join(resDir, folder);
        if (!fs.statSync(folderPath).isDirectory()) return;

        // Cleanup anydpi PNGs to stop Duplicate Resource errors
        if (folder.includes('anydpi')) {
            ['ic_launcher.png', 'ic_launcher_round.png'].forEach(f => {
                const p = path.join(folderPath, f);
                if (fs.existsSync(p)) fs.unlinkSync(p);
            });
        }

        const targets = ['ic_launcher.png', 'ic_launcher_round.png', 'ic_launcher_foreground.png'];
        targets.forEach(target => {
            if (folder.includes('anydpi') && target.endsWith('.png')) return;
            const targetPath = path.join(folderPath, target);
            if (folder.startsWith('mipmap-') || folder.startsWith('drawable-')) {
                fs.copyFileSync(logoSrc, targetPath);
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

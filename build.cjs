
const { spawnSync } = require('child_process');
const path = require('path');

const projectRoot = __dirname;
const nodeBin = path.join(projectRoot, 'node_runtime/bin/node');
const npmCli = path.join(projectRoot, 'node_runtime/bin/npm');

const env = { ...process.env };
const systemPaths = ['/usr/local/sbin', '/usr/local/bin', '/usr/sbin', '/usr/bin', '/sbin', '/bin'];
env.PATH = `${path.dirname(nodeBin)}:${env.PATH}:${systemPaths.join(':')}`;

function run(cmd, args, cwd = projectRoot) {
    console.log(`> ${cmd} ${args.join(' ')}`);
    const res = spawnSync(cmd, args, { cwd, env, stdio: 'inherit' });
    if (res.status !== 0) {
        process.exit(res.status || 1);
    }
}

console.log('Building v3.7.0 - The Multipart Backup Update...');
run(nodeBin, [npmCli, 'run', 'build']);
run(nodeBin, [npmCli, 'exec', 'cap', 'sync', 'android']);
run('bash', [path.join(projectRoot, 'android/gradlew'), 'assembleDebug'], path.join(projectRoot, 'android'));
console.log('Build Complete.');

const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
const resDir = path.join(projectRoot, 'android/app/src/main/res');

// New high-quality foreground glyph (transparent background)
const fgGlyphSrc = '/home/oki/.gemini/antigravity/brain/31fbd8b1-e438-43ee-bc83-868d3c8dfa31/adaptive_foreground_glyph_1767877539522.png';

// Legacy/Solid icon (solid background)
const solidIconSrc = '/home/oki/Downloads/noteee/public/logo.png';

const folders = fs.readdirSync(resDir);

folders.forEach(folder => {
    const folderPath = path.join(resDir, folder);
    if (!fs.statSync(folderPath).isDirectory()) return;

    // 1. Update ic_launcher_foreground.png (Adaptive Foreground)
    // This MUST be the transparent glyph.
    const fgTargets = ['ic_launcher_foreground.png'];
    fgTargets.forEach(target => {
        const targetPath = path.join(folderPath, target);
        if (folder.startsWith('mipmap-') || folder.startsWith('drawable-')) {
            if (fs.existsSync(fgGlyphSrc)) {
                fs.copyFileSync(fgGlyphSrc, targetPath);
            }
        }
    });

    // 2. Update Legacy Icons (ic_launcher.png and ic_launcher_round.png)
    // These should be solid (background + glyph) for non-adaptive launchers.
    const legacyTargets = ['ic_launcher.png', 'ic_launcher_round.png'];
    legacyTargets.forEach(target => {
        // Skip anydpi folders for PNGs
        if (folder.includes('anydpi')) return;

        const targetPath = path.join(folderPath, target);
        if (folder.startsWith('mipmap-') || folder.startsWith('drawable-')) {
            if (fs.existsSync(solidIconSrc)) {
                fs.copyFileSync(solidIconSrc, targetPath);
            }
        }
    });
});

console.log('Icon layers updated successfully.');

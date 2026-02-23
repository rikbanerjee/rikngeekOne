#!/usr/bin/env node

/**
 * Image Upload Agent
 * ------------------
 * Usage:
 *   node scripts/add-image.js                      ← pick from images/ inbox
 *   node scripts/add-image.js my-chart.png          ← bare filename → images/my-chart.png
 *   node scripts/add-image.js path/to/photo.png     ← explicit path used as-is
 *
 * Copies the image into public/images/, then prints:
 *   - The public Vercel CDN URL
 *   - Markdown embed syntax  ![alt](/images/file.png)
 *   - HTML <img> tag
 */

const fs = require('fs');
const path = require('path');
const rl = require('readline');

// ─── Config ───────────────────────────────────────────────────────────────────
const ROOT = path.join(__dirname, '..');
const IMAGES_INBOX = path.join(ROOT, 'images');         // ← drop images here
const IMAGES_DIR = path.join(ROOT, 'public/images'); // ← served by Vercel
const VERCEL_URL = process.env.VERCEL_URL || 'https://rikngeek.com';

const ALLOWED_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.avif'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ask(iface, question) {
    return new Promise(resolve => iface.question(question, a => resolve(a.trim())));
}

/** Sanitise filename: lowercase, spaces→hyphens, keep only safe chars */
function sanitiseFilename(filename) {
    const ext = path.extname(filename).toLowerCase();
    const base = path.basename(filename, ext)
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9._-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    return `${base}${ext}`;
}

/** Format file size for display */
function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Resolve the source image from CLI arg or inbox folder.
 * Case 1: path with / or \  → use as-is
 * Case 2: bare filename     → look in images/ inbox
 * Case 3: no argument       → list inbox files and let user pick
 */
async function resolveSourceImage(iface) {
    const arg = process.argv[2];

    // Case 1: explicit path
    if (arg && (arg.includes('/') || arg.includes('\\'))) {
        const p = path.resolve(arg);
        if (!fs.existsSync(p)) {
            console.error(`\n  ❌  File not found: ${p}\n`);
            process.exit(1);
        }
        return p;
    }

    // Case 2: bare filename → look in images/ inbox
    if (arg) {
        const p = path.join(IMAGES_INBOX, arg);
        if (!fs.existsSync(p)) {
            console.error(`\n  ❌  '${arg}' not found in images/ folder.`);
            console.error(`      Drop it into the images/ folder first, then re-run.\n`);
            process.exit(1);
        }
        return p;
    }

    // Case 3: no argument → list inbox and let user pick
    if (!fs.existsSync(IMAGES_INBOX)) {
        console.error(`\n  ❌  images/ inbox folder not found.\n`);
        process.exit(1);
    }

    const files = fs.readdirSync(IMAGES_INBOX)
        .filter(f => ALLOWED_EXTS.includes(path.extname(f).toLowerCase()));

    if (!files.length) {
        console.error(`\n  ❌  No images found in images/ folder.`);
        console.error(`      Drop an image there first, then re-run.\n`);
        process.exit(1);
    }

    console.log('  📂  Images in images/ inbox:\n');
    files.forEach((f, i) => console.log(`      ${i + 1})  ${f}`));

    let pick = await ask(iface, `\n  Choose a file (1–${files.length}): `);
    let idx = parseInt(pick) - 1;
    while (isNaN(idx) || idx < 0 || idx >= files.length) {
        pick = await ask(iface, `  ⚠️  Enter a number between 1 and ${files.length}: `);
        idx = parseInt(pick) - 1;
    }
    return path.join(IMAGES_INBOX, files[idx]);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
    const iface = rl.createInterface({ input: process.stdin, output: process.stdout });

    console.log('\n╔══════════════════════════════════════════╗');
    console.log('║      🖼️   Image Upload Agent             ║');
    console.log('╚══════════════════════════════════════════╝\n');

    // ── Resolve source ────────────────────────────────────────────────────────
    const sourcePath = await resolveSourceImage(iface);

    const ext = path.extname(sourcePath).toLowerCase();
    if (!ALLOWED_EXTS.includes(ext)) {
        console.error(`\n  ❌  Unsupported file type: ${ext}`);
        console.error(`      Allowed: ${ALLOWED_EXTS.join(', ')}\n`);
        iface.close(); process.exit(1);
    }

    const originalName = path.basename(sourcePath);
    const fileSize = formatSize(fs.statSync(sourcePath).size);

    console.log(`\n  📄  File : ${originalName}`);
    console.log(`  📦  Size : ${fileSize}`);
    console.log(`  📐  Type : ${ext.slice(1).toUpperCase()}\n`);

    // ── Confirm / rename output filename ─────────────────────────────────────
    const suggested = sanitiseFilename(originalName);
    const nameInput = await ask(iface, `  💾  Save as (Enter to keep "${suggested}"): `);
    let finalName = sanitiseFilename(nameInput || suggested);
    if (!path.extname(finalName)) finalName += ext;

    const destPath = path.join(IMAGES_DIR, finalName);

    // ── Overwrite check ───────────────────────────────────────────────────────
    if (fs.existsSync(destPath)) {
        const overwrite = await ask(iface,
            `  ⚠️  "${finalName}" already exists. Overwrite? (yes/no): `
        );
        if (overwrite.toLowerCase() !== 'yes') {
            console.log('\n  ↩️  Cancelled. No changes made.\n');
            iface.close(); return;
        }
    }

    iface.close();

    // ── Copy to public/images/ ────────────────────────────────────────────────
    if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });
    fs.copyFileSync(sourcePath, destPath);

    // ── Build output strings ──────────────────────────────────────────────────
    const relativePath = `/images/${finalName}`;
    const publicUrl = `${VERCEL_URL}${relativePath}`;
    const markdownImg = `![${path.basename(finalName, ext)}](${relativePath})`;
    const htmlImg = `<img src="${relativePath}" alt="${path.basename(finalName, ext)}" />`;

    // ── Print results ─────────────────────────────────────────────────────────
    console.log('\n╔══════════════════════════════════════════╗');
    console.log('║   ✅  Image ready!                       ║');
    console.log('╚══════════════════════════════════════════╝\n');

    console.log(`  📁  Saved to   : public/images/${finalName}`);
    console.log(`  🔗  Path URL   : ${relativePath}`);
    console.log(`  🌐  Public URL : ${publicUrl}\n`);
    console.log('  ─────────────────────────────────────────');
    console.log('  📝  Paste into your .md post body:');
    console.log(`      ${markdownImg}\n`);
    console.log('  🏷️   HTML img tag:');
    console.log(`      ${htmlImg}\n`);
    console.log('  🎯  Use as cover image (when agent asks for image → option 2):');
    console.log(`      ${relativePath}`);
    console.log('  ─────────────────────────────────────────\n');
    console.log('  ⚡  Run `npm run deploy` to push to Vercel and make it live.\n');
}

main().catch(err => {
    console.error('\n❌  Unexpected error:', err.message);
    process.exit(1);
});

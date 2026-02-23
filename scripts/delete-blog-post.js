#!/usr/bin/env node

/**
 * Blog Post Delete Agent — rikngeekOne
 * --------------------------------------
 * Usage: node scripts/delete-blog-post.js
 * Lists posts in content/posts/, confirms, backs up, then deletes the .md file.
 */

const fs = require('fs');
const path = require('path');
const rl = require('readline');

const ROOT = path.join(__dirname, '..');
const CONTENT_POSTS = path.join(ROOT, 'content/posts');
const BACKUP_DIR = path.join(ROOT, 'scripts/.backups');

function ask(iface, q) {
    return new Promise(resolve => iface.question(q, a => resolve(a.trim())));
}

function listPosts() {
    if (!fs.existsSync(CONTENT_POSTS)) return [];
    return fs.readdirSync(CONTENT_POSTS)
        .filter(f => f.endsWith('.md'))
        .map(f => {
            const slug = f.replace(/\.md$/, '');
            const raw = fs.readFileSync(path.join(CONTENT_POSTS, f), 'utf8');
            const titleM = raw.match(/^title:\s*"(.+)"/m);
            const dateM = raw.match(/^date:\s*"(.+)"/m);
            const catM = raw.match(/^category:\s*"(.+)"/m);
            return {
                slug,
                title: titleM ? titleM[1] : slug,
                date: dateM ? dateM[1] : '',
                category: catM ? catM[1] : '',
                filePath: path.join(CONTENT_POSTS, f),
            };
        })
        .sort((a, b) => (a.date < b.date ? 1 : -1));
}

async function main() {
    const iface = rl.createInterface({ input: process.stdin, output: process.stdout });

    console.log('\n╔══════════════════════════════════════════╗');
    console.log('║      🗑️   Blog Post Delete Agent         ║');
    console.log('╚══════════════════════════════════════════╝\n');

    const posts = listPosts();
    if (!posts.length) {
        console.log('  No posts found in content/posts/.\n');
        iface.close(); return;
    }

    console.log('📋  Existing posts:\n');
    posts.forEach((p, i) => {
        console.log(`    ${String(i + 1).padStart(2)})  ${p.title}`);
        console.log(`         📅 ${p.date}  |  📂 ${p.category}  |  🔗 /blog/${p.slug}\n`);
    });

    let choiceIdx = parseInt(await ask(iface, `  Select post to delete (1–${posts.length}), or 0 to cancel: `)) - 1;
    if (choiceIdx === -1) { console.log('\n  ↩️  Cancelled.\n'); iface.close(); return; }
    while (isNaN(choiceIdx) || choiceIdx < 0 || choiceIdx >= posts.length) {
        choiceIdx = parseInt(await ask(iface, `  ⚠️  Enter 0 to cancel or 1–${posts.length}: `)) - 1;
        if (choiceIdx === -1) { console.log('\n  ↩️  Cancelled.\n'); iface.close(); return; }
    }

    const post = posts[choiceIdx];

    console.log(`\n  📌  Title   : ${post.title}`);
    console.log(`  📅  Date    : ${post.date}`);
    console.log(`  📂  Category: ${post.category}`);
    console.log(`  🔗  Slug    : ${post.slug}`);
    console.log('\n  ⚠️   This will delete content/posts/' + path.basename(post.filePath));
    console.log('  📦  A backup will be saved to scripts/.backups/ first.\n');

    const confirm = await ask(iface, '  Type "yes" to confirm: ');
    iface.close();

    if (confirm.toLowerCase() !== 'yes') {
        console.log('\n  ↩️  Cancelled. No changes made.\n');
        return;
    }

    // Backup
    if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    const backup = path.join(BACKUP_DIR, `${post.slug}.${ts}.bak.md`);
    fs.copyFileSync(post.filePath, backup);
    console.log(`\n  💾  Backed up to: scripts/.backups/${path.basename(backup)}`);

    fs.unlinkSync(post.filePath);

    console.log(`  🗑️   Deleted: content/posts/${path.basename(post.filePath)}`);
    console.log('\n╔══════════════════════════════════════════╗');
    console.log('║   🗑️   Post deleted!                     ║');
    console.log('╚══════════════════════════════════════════╝');
    console.log('\n  💡  To undo: restore from scripts/.backups/');
    console.log('  ⚡  Run `npm run deploy` to push changes.\n');
}

main().catch(err => {
    console.error('\n❌  Unexpected error:', err.message);
    process.exit(1);
});

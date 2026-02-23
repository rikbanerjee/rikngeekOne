#!/usr/bin/env node

/**
 * Blog Post Editor Agent — rikngeekOne
 * -------------------------------------
 * Usage: node scripts/edit-blog-post.js
 * Lists all posts in content/posts/, lets you pick one,
 * then edit individual frontmatter fields or replace content from a new .md file.
 */

const fs = require('fs');
const path = require('path');
const rl = require('readline');

const ROOT = path.join(__dirname, '..');
const CONTENT_POSTS = path.join(ROOT, 'content/posts');

const CATEGORIES = [
    { label: 'AI & Machine Learning', value: 'AI', slug: 'ai', color: 'bg-purple-100 text-purple-800' },
    { label: 'Retail IT', value: 'Retail IT', slug: 'retail-it', color: 'bg-blue-100 text-blue-800' },
    { label: 'Enterprise Trends', value: 'Enterprise Trends', slug: 'enterprise-trends', color: 'bg-green-100 text-green-800' },
    { label: 'Tech Observations', value: 'Tech Observations', slug: 'tech-observations', color: 'bg-orange-100 text-orange-800' },
    { label: 'Kids STEM', value: 'Kids STEM', slug: 'kids-stem', color: 'bg-indigo-100 text-indigo-800' },
];

function ask(iface, q) {
    return new Promise(resolve => iface.question(q, a => resolve(a.trim())));
}

/** Parse and update a single YAML frontmatter field */
function updateFrontmatterField(content, field, value) {
    const escaped = value.replace(/"/g, '\\"');
    const re = new RegExp(`^(${field}:\\s*).*$`, 'm');
    if (re.test(content)) return content.replace(re, `$1"${escaped}"`);
    // If field not found, insert before closing ---
    return content.replace(/^---\n([\s\S]*?)^---/m, `---\n$1${field}: "${escaped}"\n---`);
}

/** Read all posts from content/posts/ */
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
    console.log('║      ✏️   Blog Post Editor               ║');
    console.log('╚══════════════════════════════════════════╝\n');

    const posts = listPosts();
    if (!posts.length) {
        console.log('  No posts found in content/posts/. Publish one first with npm run post.\n');
        iface.close(); return;
    }

    console.log('📋  Existing blog posts:\n');
    posts.forEach((p, i) => {
        console.log(`    ${String(i + 1).padStart(2)})  ${p.title}`);
        console.log(`         📅 ${p.date}  |  📂 ${p.category}  |  🔗 /blog/${p.slug}\n`);
    });

    let choiceIdx = parseInt(await ask(iface, `  Select post (1–${posts.length}), or 0 to cancel: `)) - 1;
    if (choiceIdx === -1) { console.log('\n  ↩️  Cancelled.\n'); iface.close(); return; }
    while (isNaN(choiceIdx) || choiceIdx < 0 || choiceIdx >= posts.length) {
        choiceIdx = parseInt(await ask(iface, `  ⚠️  Enter 0 to cancel or 1–${posts.length}: `)) - 1;
        if (choiceIdx === -1) { console.log('\n  ↩️  Cancelled.\n'); iface.close(); return; }
    }

    const post = posts[choiceIdx];
    let content = fs.readFileSync(post.filePath, 'utf8');

    console.log(`\n  📌  Editing: ${post.title}\n`);
    console.log('  What would you like to edit?\n');
    console.log('    1)  Title');
    console.log('    2)  Excerpt');
    console.log('    3)  Content  (replace from a new .md file)');
    console.log('    4)  Category');
    console.log('    5)  Tags');
    console.log('    6)  Date');
    console.log('    7)  Read time');
    console.log('    8)  Image URL / path');
    console.log('    9)  Everything  (full re-import from a new .md file)\n');

    const opt = await ask(iface, '  Choose option (1–9): ');

    if (opt === '1') {
        const val = await ask(iface, '  New title: ');
        if (val) content = updateFrontmatterField(content, 'title', val);

    } else if (opt === '2') {
        const val = await ask(iface, '  New excerpt: ');
        if (val) content = updateFrontmatterField(content, 'excerpt', val);

    } else if (opt === '3') {
        const mdPath = await ask(iface, '  Path to new .md content file: ');
        const p = path.resolve(mdPath);
        if (!fs.existsSync(p)) { console.error('\n  ❌  File not found.'); iface.close(); return; }
        const newBody = fs.readFileSync(p, 'utf8').replace(/^---[\s\S]*?---\n?/, '').replace(/^# .+\n?/, '').trim();
        content = content.replace(/^---[\s\S]*?---\n?/m, match => match).replace(/(?<=---\n[\s\S]*?---\n)[\s\S]*/, '\n' + newBody + '\n');

    } else if (opt === '4') {
        CATEGORIES.forEach((c, i) => console.log(`      ${i + 1})  ${c.label}`));
        const catIdx = parseInt(await ask(iface, '  Category (1–5): ')) - 1;
        if (!isNaN(catIdx) && catIdx >= 0 && catIdx < CATEGORIES.length) {
            const cat = CATEGORIES[catIdx];
            content = updateFrontmatterField(content, 'category', cat.value);
            content = updateFrontmatterField(content, 'categorySlug', cat.slug);
            content = updateFrontmatterField(content, 'categoryColor', cat.color);
        }

    } else if (opt === '5') {
        const tagsRaw = await ask(iface, '  Tags (comma-separated): ');
        const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);
        const tagsYaml = tags.map(t => `  - "${t}"`).join('\n');
        content = content.replace(/^tags:\n(  - ".*"\n)*/m, `tags:\n${tagsYaml}\n`);

    } else if (opt === '6') {
        const val = await ask(iface, '  Date (YYYY-MM-DD): ');
        if (val) content = updateFrontmatterField(content, 'date', val);

    } else if (opt === '7') {
        const val = await ask(iface, '  Read time (e.g. "7 min read"): ');
        if (val) content = updateFrontmatterField(content, 'readTime', val);

    } else if (opt === '8') {
        const val = await ask(iface, '  Image URL or /images/filename: ');
        if (val) content = updateFrontmatterField(content, 'image', val);

    } else if (opt === '9') {
        const mdPath = await ask(iface, '  Path to new .md file (full re-import): ');
        const p = path.resolve(mdPath);
        if (!fs.existsSync(p)) { console.error('\n  ❌  File not found.'); iface.close(); return; }
        // Re-run add-blog-post logic is out of scope here; just update content body
        const newBody = fs.readFileSync(p, 'utf8').replace(/^---[\s\S]*?---\n?/, '').replace(/^# .+\n?/, '').trim();
        content = content.replace(/(?<=^---[\s\S]*?---\n)[\s\S]*/m, '\n' + newBody + '\n');
        console.log('  ✓  Content replaced. Frontmatter unchanged — edit fields 1-8 to update metadata.');
    }

    iface.close();
    fs.writeFileSync(post.filePath, content, 'utf8');

    console.log('\n  ✅  Saved to content/posts/' + path.basename(post.filePath));
    console.log(`  🌐  Live URL: https://rikngeek.com/blog/${post.slug}`);
    console.log('  ⚡  Run `npm run deploy` to push changes.\n');
}

main().catch(err => {
    console.error('\n❌  Unexpected error:', err.message);
    process.exit(1);
});

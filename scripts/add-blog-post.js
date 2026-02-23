#!/usr/bin/env node

/**
 * Blog Post Agent — rikngeekOne (Next.js / Markdown-first)
 * ---------------------------------------------------------
 * Usage:
 *   node scripts/add-blog-post.js                  ← pick from posts/ inbox
 *   node scripts/add-blog-post.js my-post.md        ← bare filename → posts/my-post.md
 *   node scripts/add-blog-post.js path/to/post.md   ← explicit path used as-is
 *
 * Reads a Markdown file, asks you a few questions, adds YAML frontmatter,
 * and saves the result to content/posts/<slug>.md — Next.js reads it at build time.
 */

const fs = require('fs');
const path = require('path');
const rl = require('readline');

// ─── Paths ───────────────────────────────────────────────────────────────────
const ROOT = path.join(__dirname, '..');
const POSTS_INBOX = path.join(ROOT, 'posts');           // ← drop .md files here
const CONTENT_POSTS = path.join(ROOT, 'content/posts'); // ← Next.js reads from here

// ─── Categories ──────────────────────────────────────────────────────────────
const CATEGORIES = [
    { label: 'AI & Machine Learning', value: 'AI', slug: 'ai', color: 'bg-purple-100 text-purple-800' },
    { label: 'Retail IT', value: 'Retail IT', slug: 'retail-it', color: 'bg-blue-100 text-blue-800' },
    { label: 'Enterprise Trends', value: 'Enterprise Trends', slug: 'enterprise-trends', color: 'bg-green-100 text-green-800' },
    { label: 'Tech Observations', value: 'Tech Observations', slug: 'tech-observations', color: 'bg-orange-100 text-orange-800' },
    { label: 'Kids STEM', value: 'Kids STEM', slug: 'kids-stem', color: 'bg-indigo-100 text-indigo-800' },
];

const DEFAULT_IMAGES = {
    'ai': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop',
    'retail-it': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
    'enterprise-trends': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop',
    'tech-observations': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop',
    'kids-stem': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function ask(iface, question) {
    return new Promise(resolve => iface.question(question, a => resolve(a.trim())));
}

function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

function estimateReadTime(md) {
    const words = md.split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

/** Strip the YAML frontmatter block if the source .md already has one */
function stripFrontmatter(md) {
    return md.replace(/^---[\s\S]*?---\n?/, '').trim();
}

// ─── Resolve the source .md file ─────────────────────────────────────────────

async function resolveMarkdownFile(iface) {
    const arg = process.argv[2];

    // Case 1: explicit path with separator → use as-is
    if (arg && (arg.includes('/') || arg.includes('\\'))) {
        const p = path.resolve(arg);
        if (!fs.existsSync(p)) { console.error(`\n❌  File not found: ${p}\n`); process.exit(1); }
        return p;
    }

    // Case 2: bare filename → look in posts/ inbox
    if (arg) {
        const name = arg.endsWith('.md') ? arg : `${arg}.md`;
        const p = path.join(POSTS_INBOX, name);
        if (!fs.existsSync(p)) {
            console.error(`\n❌  '${name}' not found in posts/ folder.\n`);
            process.exit(1);
        }
        return p;
    }

    // Case 3: no argument → list inbox and let user pick
    if (!fs.existsSync(POSTS_INBOX)) {
        console.error(`\n❌  posts/ inbox not found.\n`); process.exit(1);
    }
    const files = fs.readdirSync(POSTS_INBOX).filter(f => f.endsWith('.md'));
    if (!files.length) {
        console.error(`\n❌  No .md files in posts/. Drop your post there first.\n`); process.exit(1);
    }

    console.log('\n📂  Markdown files in posts/:\n');
    files.forEach((f, i) => console.log(`    ${i + 1})  ${f}`));
    let pick = await ask(iface, `\n  Choose a file (1–${files.length}): `);
    let idx = parseInt(pick) - 1;
    while (isNaN(idx) || idx < 0 || idx >= files.length) {
        pick = await ask(iface, `  ⚠️  Enter a number between 1 and ${files.length}: `);
        idx = parseInt(pick) - 1;
    }
    return path.join(POSTS_INBOX, files[idx]);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
    const iface = rl.createInterface({ input: process.stdin, output: process.stdout });

    const sourcePath = await resolveMarkdownFile(iface);
    const rawContent = fs.readFileSync(sourcePath, 'utf8');
    const cleanContent = stripFrontmatter(rawContent);

    // Extract title from first H1
    const titleMatch = cleanContent.match(/^# (.+)/m);
    const title = titleMatch ? titleMatch[1].trim() : path.basename(sourcePath, '.md');

    // Auto-extract excerpt (first non-heading paragraph)
    const bodyAfterH1 = cleanContent.replace(/^# .+\n?/, '');
    const excerptMatch = bodyAfterH1.match(/^(?![#\-*\d`>])(.+)/m);
    const autoExcerpt = excerptMatch ? excerptMatch[1].trim() : '';

    const slug = slugify(title);
    const estimatedRT = estimateReadTime(cleanContent);
    const today = new Date().toISOString().split('T')[0];

    // ── Interactive prompts ─────────────────────────────────────────────────
    console.log('\n╔══════════════════════════════════════════╗');
    console.log('║        🤖  Blog Post Agent               ║');
    console.log('╚══════════════════════════════════════════╝\n');
    console.log(`📄  File   : ${path.basename(sourcePath)}`);
    console.log(`📝  Title  : ${title}`);
    console.log(`🔗  Slug   : ${slug}`);
    console.log(`⏱   Est RT : ${estimatedRT}\n`);

    // Category
    console.log('📂  Choose a category:\n');
    CATEGORIES.forEach((c, i) => console.log(`    ${i + 1})  ${c.label}`));
    let catIdx = parseInt(await ask(iface, '\n  Enter number (1–5): ')) - 1;
    while (isNaN(catIdx) || catIdx < 0 || catIdx >= CATEGORIES.length) {
        catIdx = parseInt(await ask(iface, '  ⚠️  Invalid. Enter number (1–5): ')) - 1;
    }
    const category = CATEGORIES[catIdx];
    console.log(`  ✓  ${category.label}\n`);

    // Excerpt
    const excerptPrompt = autoExcerpt
        ? `🗒️  Excerpt [auto: "${autoExcerpt.slice(0, 60)}…"]\n  Press Enter to keep, or type custom: `
        : '🗒️  Excerpt (one sentence): ';
    const excerptInput = await ask(iface, excerptPrompt);
    const excerpt = excerptInput || autoExcerpt;

    // Tags
    const tagsRaw = await ask(iface, '\n🏷️  Tags (comma-separated, e.g. "AI, Docker, Ubuntu"): ');
    const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);
    if (!tags.length) tags.push(category.value);

    // Read time
    const rtInput = await ask(iface, `\n⏱️  Read time [${estimatedRT}]: `);
    const readTime = rtInput || estimatedRT;

    // Image
    const IMAGES_DIR = path.join(ROOT, 'public/images');
    const localImages = fs.existsSync(IMAGES_DIR)
        ? fs.readdirSync(IMAGES_DIR).filter(f => /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(f))
        : [];
    const defaultImg = DEFAULT_IMAGES[category.slug];

    console.log('\n🖼️  Cover image — choose a source:\n');
    console.log('    1)  File from public/images/  (Vercel CDN)');
    console.log('    2)  Paste a URL (Unsplash or custom)');
    console.log('    3)  Category default (Unsplash)');
    const imgChoice = await ask(iface, '\n  Enter choice (1–3): ');

    let image;
    if (imgChoice === '1') {
        if (!localImages.length) {
            console.log('  ⚠️  No images in public/images/ — using default.');
            image = defaultImg;
        } else {
            console.log('\n  📁  Images in public/images/:\n');
            localImages.forEach((f, i) => console.log(`      ${i + 1})  ${f}`));
            let filePick = await ask(iface, `\n  Choose a file (1–${localImages.length}): `);
            let fileIdx = parseInt(filePick) - 1;
            while (isNaN(fileIdx) || fileIdx < 0 || fileIdx >= localImages.length) {
                filePick = await ask(iface, `  ⚠️  Number between 1 and ${localImages.length}: `);
                fileIdx = parseInt(filePick) - 1;
            }
            image = `/images/${localImages[fileIdx]}`;
            console.log(`  ✓  ${image}`);
        }
    } else if (imgChoice === '2') {
        const urlInput = await ask(iface, '  Paste URL: ');
        image = urlInput || defaultImg;
    } else {
        image = defaultImg;
        console.log(`  ✓  Using default.`);
    }

    iface.close();

    // ── Build the final .md with frontmatter ──────────────────────────────
    if (!fs.existsSync(CONTENT_POSTS)) fs.mkdirSync(CONTENT_POSTS, { recursive: true });

    const destPath = path.join(CONTENT_POSTS, `${slug}.md`);
    if (fs.existsSync(destPath)) {
        console.log(`\n⚠️  content/posts/${slug}.md already exists — overwriting.`);
    }

    const tagsYaml = tags.map(t => `  - "${t}"`).join('\n');
    const output = `---
title: "${title.replace(/"/g, '\\"')}"
excerpt: "${excerpt.replace(/"/g, '\\"')}"
date: "${today}"
readTime: "${readTime}"
category: "${category.value}"
categorySlug: "${category.slug}"
categoryColor: "${category.color}"
image: "${image}"
tags:
${tagsYaml}
author: "RikNGeek"
---

${cleanContent}
`;

    fs.writeFileSync(destPath, output, 'utf8');

    // ── Done ───────────────────────────────────────────────────────────────
    console.log('\n╔══════════════════════════════════════════╗');
    console.log('║   🎉  Blog post published successfully!  ║');
    console.log('╚══════════════════════════════════════════╝');
    console.log(`\n  📌  Slug      : ${slug}`);
    console.log(`  📁  Saved to  : content/posts/${slug}.md`);
    console.log(`  🔗  Local     : http://localhost:3000/blog/${slug}`);
    console.log(`  🌐  Live URL  : https://rikngeek.com/blog/${slug}`);
    console.log(`  📂  Category  : ${category.label} → https://rikngeek.com/blog/category/${category.slug}`);
    console.log('\n  ✅  Run `npm run deploy` to push live, then share on LinkedIn!\n');
}

main().catch(err => {
    console.error('\n❌  Unexpected error:', err.message);
    process.exit(1);
});

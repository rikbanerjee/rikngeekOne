const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');

const parser = new Parser();
const FEED_URL = 'https://rikngeek.substack.com/feed';
const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts');

// Default category for Substack posts
const DEFAULT_CATEGORY = {
    label: 'Tech Observations',
    value: 'Tech Observations',
    slug: 'tech-observations',
    color: 'bg-orange-100 text-orange-800'
};

function generateSlug(title, link) {
    // Try to extract slug from Substack URL first (e.g., https://.../p/the-slug)
    const match = link.match(/\/p\/([^\/\?]+)/);
    if (match && match[1]) {
        return match[1];
    }
    // Fallback to title slugification
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

function extractReadTime(content) {
    if (!content) return '5 min read';
    const words = content.split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
}

// When a post has no cover image, Substack's feed falls back to the small
// publication logo (e.g. ..._144x144.png). Treat anything that small as
// "no image" so the site renders generated swatch art instead.
function isRealCoverImage(url) {
    if (!url) return false;
    const dims = decodeURIComponent(url).match(/_(\d+)x(\d+)\.\w+$/);
    return !(dims && Number(dims[1]) < 400);
}

// Cover image: the feed enclosure, else the first <img> in the post body.
function extractImage(item) {
    const candidates = [];
    if (item.enclosure && item.enclosure.url) {
        candidates.push(item.enclosure.url);
    }
    const body = item['content:encoded'] || item.content || '';
    const imgMatch = body.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch) {
        candidates.push(imgMatch[1].replace(/&amp;/g, '&'));
    }
    return candidates.find(isRealCoverImage) || '';
}

// ── Tags ──────────────────────────────────────────────────────
// The RSS feed has no tags, so they come from Substack's per-post API.
const POST_API = 'https://rikngeek.substack.com/api/v1/posts/';
const SUBSTACK_TAG = 'Substack';

async function fetchSubstackTags(slug) {
    try {
        const res = await fetch(POST_API + encodeURIComponent(slug));
        if (!res.ok) return null;
        const post = await res.json();
        return (post.postTags || [])
            .map(t => String(t.name || '').replace(/^#/, '').trim())
            .filter(Boolean);
    } catch {
        return null;   // network hiccup: leave this post's tags untouched
    }
}

function readTags(raw) {
    const block = raw.match(/^tags:\n((?:  - .*\n)*)/m);
    if (!block) return [];
    return block[1].split('\n').filter(Boolean).map(l => l.replace(/^  - "?(.*?)"?$/, '$1'));
}

// Substack tags first, then any local-only tags, then "Substack" last
// (cards only show the first 3). Nothing local is ever dropped.
function mergeTags(substackTags, localTags) {
    const seen = new Set();
    const out = [];
    for (const t of [...substackTags, ...localTags.filter(t => t !== SUBSTACK_TAG), SUBSTACK_TAG]) {
        const key = t.toLowerCase();
        if (!seen.has(key)) {
            seen.add(key);
            out.push(t);
        }
    }
    return out;
}

function writeTags(raw, tags) {
    const yaml = 'tags:\n' + tags.map(t => `  - "${t.replace(/"/g, '\\"')}"`).join('\n') + '\n';
    return raw.replace(/^tags:(?: \[\])?\n(?:  - .*\n)*/m, yaml);
}

async function syncTags() {
    console.log('\nSyncing tags from Substack...');
    let updated = 0;
    for (const f of fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))) {
        const filePath = path.join(POSTS_DIR, f);
        const raw = fs.readFileSync(filePath, 'utf8');
        const link = (raw.match(/^externalLink: "(.*)"$/m) || [])[1] || '';
        const slug = (link.match(/rikngeek\.substack\.com\/p\/([^\/\?]+)/) || [])[1];
        if (!slug) continue;   // not a Substack post

        const substackTags = await fetchSubstackTags(slug);
        if (substackTags === null) {
            console.log(`[WARN] Could not fetch tags: ${slug}`);
            continue;
        }
        const local = readTags(raw);
        const merged = mergeTags(substackTags, local);
        if (merged.join('\n') !== local.join('\n')) {
            fs.writeFileSync(filePath, writeTags(raw, merged), 'utf8');
            console.log(`[TAGS] ${slug}: ${merged.join(', ')}`);
            updated++;
        }
    }
    return updated;
}

function cleanExcerpt(contentSnippet) {
    if (!contentSnippet) return '';
    // Take first sentence or up to 150 characters
    let excerpt = contentSnippet.split('\n')[0].trim();
    if (excerpt.length > 150) {
        excerpt = excerpt.substring(0, 147) + '...';
    }
    return excerpt.replace(/"/g, '\\"'); // escape quotes for YAML
}

async function syncSubstack() {
    console.log(`Fetching RSS feed from ${FEED_URL}...`);
    let feed;
    try {
        // Cache-buster: Substack's CDN can serve a feed that's several minutes stale.
        feed = await parser.parseURL(`${FEED_URL}?t=${Date.now()}`);
    } catch (err) {
        console.error('Error fetching RSS feed:', err.message);
        process.exit(1);
    }

    console.log(`Found ${feed.items.length} posts in feed.`);

    if (!fs.existsSync(POSTS_DIR)) {
        fs.mkdirSync(POSTS_DIR, { recursive: true });
    }

    let newCount = 0;
    let imageCount = 0;

    for (const item of feed.items) {
        const slug = generateSlug(item.title, item.link);
        const filePath = path.join(POSTS_DIR, `${slug}.md`);
        const image = extractImage(item);

        if (fs.existsSync(filePath)) {
            // Existing post: only refresh the cover image if it changed on
            // Substack. Every other field is left alone so local edits survive.
            const raw = fs.readFileSync(filePath, 'utf8');
            const current = (raw.match(/^image: "(.*)"$/m) || [])[1];
            if (image && current !== undefined && current !== image) {
                fs.writeFileSync(filePath, raw.replace(/^image: ".*"$/m, `image: "${image}"`), 'utf8');
                console.log(`[IMAGE] ${slug}`);
                imageCount++;
            } else {
                console.log(`[SKIP] Post already exists: ${slug}`);
            }
            continue;
        }

        // Parse date
        const dateObj = new Date(item.pubDate);
        const dateStr = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD

        const excerpt = cleanExcerpt(item.contentSnippet || item.content || '');
        const readTime = extractReadTime(item.content);

        // Build Markdown frontmatter
        const markdown = `---
title: "${item.title.replace(/"/g, '\\"')}"
excerpt: "${excerpt}"
date: "${dateStr}"
readTime: "${readTime}"
category: "${DEFAULT_CATEGORY.value}"
categorySlug: "${DEFAULT_CATEGORY.slug}"
categoryColor: "${DEFAULT_CATEGORY.color}"
image: "${image}"
tags:
  - "Substack"
author: "${item.creator || 'RikNGeek'}"
externalLink: "${item.link}"
---

This post was originally published on Substack. 

[Read the full article here](${item.link})
`;

        fs.writeFileSync(filePath, markdown, 'utf8');
        console.log(`[ADDED] ${slug}`);
        newCount++;
    }

    const tagCount = await syncTags();

    console.log(`\nSync complete! Added ${newCount} new posts, updated ${imageCount} cover images, updated tags on ${tagCount} posts.`);
}

syncSubstack();

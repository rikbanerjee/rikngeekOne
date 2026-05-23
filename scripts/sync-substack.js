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
        feed = await parser.parseURL(FEED_URL);
    } catch (err) {
        console.error('Error fetching RSS feed:', err.message);
        process.exit(1);
    }

    console.log(`Found ${feed.items.length} posts in feed.`);

    if (!fs.existsSync(POSTS_DIR)) {
        fs.mkdirSync(POSTS_DIR, { recursive: true });
    }

    let newCount = 0;

    for (const item of feed.items) {
        const slug = generateSlug(item.title, item.link);
        const filePath = path.join(POSTS_DIR, `${slug}.md`);

        if (fs.existsSync(filePath)) {
            console.log(`[SKIP] Post already exists: ${slug}`);
            continue;
        }

        // Parse date
        const dateObj = new Date(item.pubDate);
        const dateStr = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD

        const excerpt = cleanExcerpt(item.contentSnippet || item.content || '');
        const readTime = extractReadTime(item.content);

        // Try to find image in enclosure or content
        let image = '';
        if (item.enclosure && item.enclosure.url) {
            image = item.enclosure.url;
        } else {
            const imgMatch = item.content && item.content.match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch) {
                image = imgMatch[1];
            }
        }

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

    console.log(`\nSync complete! Added ${newCount} new posts.`);
}

syncSubstack();

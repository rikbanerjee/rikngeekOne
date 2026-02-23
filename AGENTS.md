# Blog System — Agent Context & Architecture

> **Read this first** before modifying anything blog-related in this project.
> This file documents every architectural decision, file location, and workflow
> added to `rikngeekOne` during the blog system migration (February 2026).

---

## What Was Added

This project originally had a single-page portfolio with a hardcoded `Blog.tsx` section. A full **Markdown-first blog system** was added on top of the existing Next.js app without touching any existing component or page (except `Blog.tsx` and `Navigation.tsx`).

### New pages:
| Route                       | File                                    | Purpose                                |
| --------------------------- | --------------------------------------- | -------------------------------------- |
| `/blog`                     | `app/blog/page.tsx`                     | All posts listing with category filter |
| `/blog/[slug]`              | `app/blog/[slug]/page.tsx`              | Individual post (static generated)     |
| `/blog/category/[category]` | `app/blog/category/[category]/page.tsx` | Per-category listing                   |

### New library:
| File           | Purpose                                                                                                                |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `lib/posts.ts` | Reads `.md` files from `content/posts/`, parses frontmatter with `gray-matter`, renders Markdown to HTML with `marked` |

### New agent scripts:
| Script                        | npm command           | What it does                                                   |
| ----------------------------- | --------------------- | -------------------------------------------------------------- |
| `scripts/add-blog-post.js`    | `npm run post`        | Adds YAML frontmatter to a `.md` and saves to `content/posts/` |
| `scripts/edit-blog-post.js`   | `npm run edit-post`   | Edits frontmatter fields in `content/posts/*.md`               |
| `scripts/delete-blog-post.js` | `npm run delete-post` | Backs up then deletes a post from `content/posts/`             |
| `scripts/add-image.js`        | `npm run image`       | Copies an image to `public/images/` and prints the CDN URL     |

### Modified files:
| File                        | Change                                                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `components/Blog.tsx`       | Now accepts `posts: PostMeta[]` prop from server; renders real posts with images and links to `/blog/[slug]`       |
| `components/Navigation.tsx` | `Blog` nav item now links to `/blog` (page route) instead of `#blog` (anchor)                                      |
| `app/page.tsx`              | Converted from `'use client'` to server component; calls `getAllPosts().slice(0, 3)` to feed homepage Blog section |
| `tailwind.config.ts`        | Added `@tailwindcss/typography` plugin (needed for `prose-*` classes on post pages)                                |
| `package.json`              | Added `gray-matter`, `marked`, `@tailwindcss/typography` dependencies + all `npm run` script aliases               |

### New folders:
| Folder              | Purpose                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------- |
| `content/posts/`    | **Source of truth** — published `.md` files with YAML frontmatter. Next.js reads these at build time. |
| `posts/`            | **Inbox** — drop new `.md` drafts here, then run `npm run post filename.md`                           |
| `images/`           | **Inbox** — drop new images here, then run `npm run image filename.png`                               |
| `public/images/`    | Vercel CDN — images are copied here by the agent and served at `https://rikngeek.com/images/<file>`   |
| `scripts/`          | All agent scripts (Node.js, zero external deps except the blog agent uses fs/path/readline)           |
| `scripts/.backups/` | Auto-created by delete agent — timestamped `.bak.md` files for recovery                               |

---

## How the Blog Works (Architecture)

```
posts/my-post.md              ← user drops draft here
       ↓  npm run post
content/posts/my-slug.md      ← agent adds frontmatter, saves here
       ↓  npm run build (Next.js)
lib/posts.ts                  ← getAllPosts() reads content/posts/ at build time
       ↓
app/blog/page.tsx             ← static HTML: /blog listing
app/blog/[slug]/page.tsx      ← static HTML: /blog/my-slug
app/blog/category/[cat]/page.tsx ← static HTML: /blog/category/ai
       ↓  npm run deploy (git push)
Vercel                        ← auto-detects push, rebuilds, deploys to rikngeek.com
```

**Key principle — Option B / Markdown-first:** The agents do NOT inject JavaScript strings into React source files. Every post is a `.md` file with YAML frontmatter. Next.js reads and statically generates all blog pages at build time. This means:
- No brittle file injection
- Posts are version-controlled as plain text
- The blog works even if agents are never run again (just edit the `.md` directly)

---

## Post Frontmatter Schema

Every file in `content/posts/` must have this YAML frontmatter:

```yaml
---
title: "Your Post Title"
excerpt: "One sentence describing the post."
date: "2026-02-22"
readTime: "7 min read"
category: "AI"
categorySlug: "ai"
categoryColor: "bg-purple-100 text-purple-800"
image: "/images/my-cover.jpg"
tags:
  - "AI"
  - "Docker"
  - "Ubuntu"
author: "RikNGeek"
---

# Your Post Title

Post content in standard Markdown...
```

The `lib/posts.ts` `getPost()` and `getAllPosts()` functions parse this schema. If a field is missing, sensible defaults are applied.

---

## Categories

The category system is defined in **two places** that must stay in sync:

1. `lib/posts.ts` — `export const CATEGORIES` array (used by Next.js pages)
2. `scripts/add-blog-post.js` — `const CATEGORIES` array (used by the CLI agent)

| #   | label                 | value               | slug                | categoryColor                   |
| --- | --------------------- | ------------------- | ------------------- | ------------------------------- |
| 1   | AI & Machine Learning | `AI`                | `ai`                | `bg-purple-100 text-purple-800` |
| 2   | Retail IT             | `Retail IT`         | `retail-it`         | `bg-blue-100 text-blue-800`     |
| 3   | Enterprise Trends     | `Enterprise Trends` | `enterprise-trends` | `bg-green-100 text-green-800`   |
| 4   | Tech Observations     | `Tech Observations` | `tech-observations` | `bg-orange-100 text-orange-800` |
| 5   | Kids STEM             | `Kids STEM`         | `kids-stem`         | `bg-indigo-100 text-indigo-800` |

**To add a new category:** update both `lib/posts.ts` AND `scripts/add-blog-post.js` and create the static param in `app/blog/category/[category]/page.tsx` (`generateStaticParams`).

---

## Image Hosting

Images are served directly by **Vercel's CDN** — no external image hosting service needed.

| Folder                       | Accessed at                                |
| ---------------------------- | ------------------------------------------ |
| `public/images/my-photo.png` | `https://rikngeek.com/images/my-photo.png` |

### Workflow:
```bash
# 1. Drop image into images/ inbox
# 2. Run:
npm run image my-photo.png
# → copies to public/images/my-photo.png
# → prints:  /images/my-photo.png  (use this in posts)

# 3. Reference in .md body:
![Alt text](/images/my-photo.png)

# 4. Or use as cover image via frontmatter:
image: "/images/my-photo.png"
```

---

## npm Scripts Reference

```bash
npm run post my-post.md       # Publish new post (reads from posts/ inbox)
npm run post                  # Pick from list of .md files in posts/
npm run edit-post             # Edit any field of an existing post
npm run delete-post           # Delete a post (backs up first)
npm run image my-photo.png    # Upload image (reads from images/ inbox)
npm run image                 # Pick from list of images in images/ inbox
npm run deploy                # git add + commit + push → Vercel auto-deploys
npm run dev                   # Local dev server at localhost:3000
npm run build                 # Production build (same as Vercel runs)
```

---

## Dependencies Added

```json
"dependencies": {
  "gray-matter": "^4.0.3",   // YAML frontmatter parser
  "marked": "^12.0.0"        // Markdown → HTML renderer
},
"devDependencies": {
  "@tailwindcss/typography": "^0.5.10"  // prose-* classes for post body styling
}
```

Install after cloning or after permissions are fixed:
```bash
sudo chown -R $(whoami) node_modules package-lock.json   # if root-owned
npm install
```

---

## Deployment

**Live site:** https://rikngeek.com  
**Git remote:** https://github.com/rikbanerjee/rikngeekOne  
**Vercel project:** auto-deploys from `main` branch push

Every `npm run deploy` triggers:
```
git add .
git commit -m 'chore: update blog content'
git push   →   Vercel picks up push   →   npm run build   →   live in ~30s
```

The blog is **statically generated** (`generateStaticParams` + server components), so Vercel's build outputs pure HTML/CSS for all blog routes — fast and SEO-friendly.

---

## Full End-to-End Publish Workflow

```bash
# 1. Write your post in posts/my-new-post.md

# 2. (Optional) Upload a cover image
npm run image my-cover.png
#    → prints: /images/my-cover.png  (paste in post frontmatter or when agent asks)

# 3. Publish the post (agent adds frontmatter + saves to content/posts/)
npm run post my-new-post.md
#    → prompts: category, excerpt, tags, read time, image
#    → saves:   content/posts/my-new-post.md

# 4. Preview locally
npm run dev
#    → http://localhost:3000/blog/my-new-post

# 5. Deploy
npm run deploy
#    → live at https://rikngeek.com/blog/my-new-post
```

---

## What Was NOT Changed

The following files and components are **unchanged** from the original `rikngeekOne`:

- `components/Hero.tsx`
- `components/Projects.tsx`
- `components/Resume.tsx`
- `components/STEMEducation.tsx`
- `components/Footer.tsx`
- `app/globals.css`
- `app/layout.tsx`
- `vercel.json`
- `next.config.js`
- `tsconfig.json`
- `postcss.config.js`

The blog system is fully additive — it was layered on top without breaking anything existing.

# Rik Banerjee - Portfolio Website

A modern, professional portfolio website showcasing AI projects, research publications, blog posts, and STEM education resources.

## 🚀 Features

- **Modern UI/UX Design**: Built with UX best practices, featuring smooth animations and responsive design
- **AI Projects Showcase**: Dedicated section highlighting AI/ML projects with interactive cards
- **Blog & Articles**: Platform for sharing insights on AI, technology, and innovation
- **Research Publications**: Showcase of peer-reviewed research papers and academic contributions
- **STEM Education**: Resources and content for inspiring young learners in science and technology
- **Professional Resume**: Interactive resume section with downloadable CV
- **Fully Responsive**: Optimized for all devices from mobile to desktop
- **Dark Theme**: Modern dark theme with gradient accents (no orange color scheme)
- **Smooth Animations**: Powered by Framer Motion for delightful user interactions

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Production-ready animation library
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful & consistent icon toolkit

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/rik-banerjee/portfolio.git
cd rikngeekOne
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the website.

## 🏗️ Project Structure

```
rikngeekOne/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Main page component
├── components/
│   ├── Navigation.tsx        # Sticky navigation bar
│   ├── Hero.tsx              # Hero section with CTA
│   ├── Projects.tsx          # AI projects showcase
│   ├── Blog.tsx              # Blog posts section
│   ├── Research.tsx          # Research publications
│   ├── STEMEducation.tsx     # STEM education resources
│   ├── Resume.tsx            # Resume & experience
│   └── Footer.tsx            # Footer with links
├── public/                   # Static assets
├── package.json              # Dependencies
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── next.config.js            # Next.js configuration
```

## 🎨 Customization

### Colors

The website uses a blue/purple/pink gradient color scheme. To customize colors, edit `tailwind.config.ts`:

```typescript
colors: {
  primary: { /* Your primary colors */ },
  accent: { /* Your accent colors */ },
}
```

### Content

Update the content in each component file:
- **Projects**: Edit `components/Projects.tsx` - Add your projects
- **Blog**: Edit `components/Blog.tsx` - Add your blog posts
- **Research**: Edit `components/Research.tsx` - Add your publications
- **STEM**: Edit `components/STEMEducation.tsx` - Add educational resources
- **Resume**: Edit `components/Resume.tsx` - Update your experience and education

### Metadata

Update SEO metadata in `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Your Name - Your Title',
  description: 'Your description',
  // ... other metadata
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

The site can be deployed on any platform that supports Next.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- Cloudflare Pages

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤖 Blog Agent CLI

Instead of manually editing React source files, use the three agent scripts in the `scripts/` folder. They handle everything — parsing your Markdown, asking you questions, and updating all three source files at once.

### ➕ Add a New Blog Post

1. Drop your `.md` file into the `posts/` folder (project root). Then use any of these:

```bash
# Just the filename — agent looks in posts/ automatically
npm run post my-ai-project.md

# No argument — agent lists all .md files in posts/ and lets you pick
npm run post

# Full or relative path — also works
node scripts/add-blog-post.js ~/Desktop/my-post.md
```

The agent will:

- Extract the title from your `# H1` heading and auto-generate a URL slug
- Detect the first paragraph as the excerpt (you can override it)
- Ask you **5 short questions** interactively:

| Prompt                                    | Example answer              |
| ----------------------------------------- | --------------------------- |
| Category (numbered menu)                  | `1` (AI & Machine Learning) |
| Excerpt — accept auto or type custom      | *(press Enter)*             |
| Tags (comma-separated)                    | `AI, Python, Monte Carlo`   |
| Read time — accept estimate or override   | `7 min read`                |
| Unsplash image URL — or Enter for default | *(press Enter)*             |

- Inject the post into `PostPage.js`, `BlogPage.js`, and `CategoryPage.js` automatically
- Print your live LinkedIn-ready URL:

```
🔗  URL: http://localhost:3000/post/your-post-slug
```

> 💡 **Tip:** Copy `posts/sample-post.md` as a starting template for your new post.

**Markdown features supported:** `# H1–H4`, `**bold**`, `*italic*`, `` `inline code` ``, ` ```code blocks``` `, `- ul lists`, `1. ol lists`, `> blockquotes`, `[links](url)`, `--- dividers`

**Available categories:**

| #   | Category              | Color badge |
| --- | --------------------- | ----------- |
| 1   | AI & Machine Learning | Purple      |
| 2   | Retail IT             | Blue        |
| 3   | Enterprise Trends     | Green       |
| 4   | Tech Observations     | Orange      |
| 5   | Kids STEM             | Indigo      |

**Cover image — 3 options** (the agent asks you to pick):

| #   | Option                             | Best for                                      |
| --- | ---------------------------------- | --------------------------------------------- |
| 1   | Local file from `public/images/` ⭐ | Your own screenshots, diagrams, custom photos |
| 2   | Unsplash or custom URL             | Stock photos, external images                 |
| 3   | Category default                   | Quick publish, don't care about the image     |

**Using your own images (option 1):**

1. Drop your image into `public/images/` — e.g. `public/images/stock-analyzer-dashboard.png`
2. Run `npm run post my-post.md`
3. Choose option 1 for image → the agent lists all files in `public/images/` and you pick by number
4. Vercel automatically serves it at `https://yoursite.com/images/stock-analyzer-dashboard.png`

> 💡 No external image hosting needed — Vercel's CDN serves everything in `public/` for free.

---

### ✏️ Edit an Existing Blog Post

```bash
node scripts/edit-blog-post.js
# or shorthand:
npm run edit-post
```

The agent will:

- List all your posts with title, date, category, and URL
- Ask you to pick a post by number
- Ask what to edit from a menu:

| #   | Option     | Notes                                                                             |
| --- | ---------- | --------------------------------------------------------------------------------- |
| 1   | Title      | Updated in all 3 files                                                            |
| 2   | Excerpt    | Updated in all 3 files                                                            |
| 3   | Content    | Re-import from a new `.md` file                                                   |
| 4   | Category   | Updates color badge automatically                                                 |
| 5   | Tags       | Comma-separated list                                                              |
| 6   | Date       | Format: `YYYY-MM-DD`                                                              |
| 7   | Read time  | e.g. `8 min read`                                                                 |
| 8   | Image URL  | Unsplash URL — resizes automatically for cards vs post header                     |
| 9   | Everything | Full re-import from a `.md` file (title, content, excerpt, tags, read time, date) |

All three source files stay in sync after every edit.

---

### 🗑️ Delete a Blog Post

```bash
node scripts/delete-blog-post.js
# or shorthand:
npm run delete-post
```

The agent will:

- List all your posts — same numbered list as the editor
- Ask you to pick a post (enter `0` to cancel safely at any time)
- Show a confirmation card with the post's title, date, category, and slug
- **Auto-backup** all three source files to `scripts/.backups/` with a timestamp — before touching anything
- Remove the post entry from `PostPage.js`, `BlogPage.js`, and `CategoryPage.js`

> 💡 **To undo a delete:** restore the `.bak.js` files from `scripts/.backups/` — they are named with the exact timestamp shown after deletion.

---

### 📋 Blog Agent Quick Reference

```bash
# 1. Drop your .md file into posts/  (e.g. posts/my-ai-project.md)

# Publish a new post — just the filename, no path needed
npm run post my-ai-project.md

# Publish — pick from a list of .md files in posts/
npm run post

# Edit any field of an existing post interactively
npm run edit-post

# Delete a post (safe — auto-backup + confirmation required)
npm run delete-post

# Preview locally before publishing
npm start

# Fetch and sync posts from your Substack RSS feed
npm run sync-substack

# Push to git → triggers Vercel auto-deploy
npm run deploy
```

---

## 🎯 Performance

- Lighthouse Score: 95+
- Fully responsive design
- Optimized images and assets
- Lazy loading for smooth performance
- Server-side rendering with Next.js

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📧 Contact

Rik Banerjee
- LinkedIn: [https://www.linkedin.com/in/rik-banerjee/](https://www.linkedin.com/in/rik-banerjee/)
- Email: contact@rikbanerjee.com
- GitHub: [github.com/rik-banerjee](https://github.com/rik-banerjee)

---

Built with ❤️ using Next.js and Tailwind CSS


# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, React, Tailwind CSS, Framer Motion, and more.

### Step 2: Run Development Server

```bash
npm run dev
```

Your site will be available at: **http://localhost:3000**

### Step 3: Customize Your Content

Open the project in your code editor and customize:

1. **Personal Information** (`components/Hero.tsx`)
   - Update your name, title, and description
   - Add your social media links
   - Update LinkedIn profile URL

2. **Projects** (`components/Projects.tsx`)
   - Replace placeholder projects with your actual AI projects
   - Add project descriptions, links, and technologies
   - Update demo and GitHub links

3. **Blog Posts** (`components/Blog.tsx`)
   - Add your actual blog posts
   - Update titles, excerpts, and dates
   - Link to your blog platform

4. **Research** (`components/Research.tsx`)
   - Add your research papers and publications
   - Update authors, venues, and links
   - Add actual citation counts

5. **STEM Education** (`components/STEMEducation.tsx`)
   - Add your educational resources
   - Update course descriptions and links

6. **Resume** (`components/Resume.tsx`)
   - Update work experience
   - Add education details
   - Update skills and certifications
   - Link to your actual resume PDF

7. **Contact Info** (`components/Footer.tsx`)
   - Update social media links
   - Add your email address

## 🎨 Customize Design

### Colors

Edit `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  primary: { 500: '#your-color' },
  accent: { 500: '#your-color' },
}
```

### Fonts

Update fonts in `app/layout.tsx`:

```typescript
import { YourFont } from 'next/font/google'
```

## 📦 Build for Production

```bash
npm run build
npm run start
```

## 🚀 Deploy

### Deploy to Vercel (Easiest)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Click "Deploy"

Your site will be live in minutes!

## 💡 Tips

- Use high-quality images for better visual appeal
- Keep content updated regularly
- Optimize images before adding them
- Test on mobile devices
- Update meta tags for better SEO

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Dependencies not installing?**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors?**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

Need help? Check the main README.md or create an issue on GitHub!


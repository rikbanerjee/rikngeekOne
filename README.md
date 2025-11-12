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


# 🚀 Deployment Guide - Free Hosting Options

## Quick Comparison

| Platform | Free Tier | Best For | Setup Time | Custom Domain |
|----------|-----------|----------|------------|---------------|
| **Vercel** | Unlimited | Next.js apps | 2 min | ✅ Yes |
| **Netlify** | 100GB bandwidth/month | Static sites | 3 min | ✅ Yes |
| **GitHub Pages** | Unlimited (public repos) | Static sites | 5 min | ✅ Yes |
| **Google Cloud Run** | 2M requests/month | Containers | 10 min | ✅ Yes |
| **Cloudflare Pages** | Unlimited | Static/SSR | 3 min | ✅ Yes |

---

## 🥇 RECOMMENDED: Vercel (Easiest & Best for Next.js)

### Why Vercel?
- Made by Next.js creators
- Zero configuration
- Automatic HTTPS
- Global CDN
- Serverless functions included
- Free forever for personal projects

### Steps:

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/rikngeekone.git
git push -u origin main
```

2. **Deploy:**
   - Visit [vercel.com](https://vercel.com)
   - Click "Sign Up with GitHub"
   - Click "New Project"
   - Select your `rikngeekone` repository
   - Click "Deploy" (no configuration needed!)

3. **Done!** Your site is live at: `https://your-project.vercel.app`

### Custom Domain:
- Go to Project Settings → Domains
- Add your domain
- Update DNS records as shown
- SSL certificate is automatic

---

## 🌐 Option 2: Netlify

### Steps:

1. **Push to GitHub** (same as above)

2. **Deploy:**
   - Visit [netlify.com](https://netlify.com)
   - Sign up with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your repository
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Click "Deploy"

---

## 🐙 Option 3: GitHub Pages

### Setup:

1. **Update `package.json`:**
```json
{
  "scripts": {
    "build": "next build"
  }
}
```

2. **The GitHub Actions workflow is already created** in `.github/workflows/deploy.yml`

3. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/rikngeekone.git
git push -u origin main
```

4. **Enable GitHub Pages:**
   - Go to your repo on GitHub
   - Settings → Pages
   - Source: Select "GitHub Actions"
   - Wait ~2 minutes for deployment

5. **Your site will be at:** `https://YOUR_USERNAME.github.io/rikngeekone`

### Note:
GitHub Pages deploys as a static site. Some dynamic features may not work. For full Next.js features, use Vercel or Cloud Run.

---

## ☁️ Option 4: Google Cloud Run

### Prerequisites:
- Google Cloud account (free tier: $300 credit + always free tier)
- [Install gcloud CLI](https://cloud.google.com/sdk/docs/install)

### Steps:

1. **Create Google Cloud Project:**
```bash
# Login to Google Cloud
gcloud auth login

# Create new project
gcloud projects create rikngeekone-portfolio --name="Portfolio"

# Set as active project
gcloud config set project rikngeekone-portfolio

# Enable required services
gcloud services enable cloudbuild.googleapis.com run.googleapis.com
```

2. **Deploy:**

**Option A - Using gcloud CLI:**
```bash
cd /Users/rikbanerjee/work/projects/rikngeekOne

# Build and deploy in one command
gcloud run deploy rikngeekone \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated
```

**Option B - Using Cloud Build (from GitHub):**
```bash
# Connect GitHub repo
gcloud builds submit --config cloudbuild.yaml
```

3. **Your site will be at:** `https://rikngeekone-[hash].run.app`

### Free Tier Limits:
- 2 million requests/month
- 360,000 GB-seconds of memory
- 180,000 vCPU-seconds of compute time

---

## 🔥 Option 5: Cloudflare Pages

### Steps:

1. **Push to GitHub** (same as above)

2. **Deploy:**
   - Visit [pages.cloudflare.com](https://pages.cloudflare.com)
   - Sign up
   - Click "Create a project"
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Click "Save and Deploy"

---

## 📝 Post-Deployment Checklist

After deploying to any platform:

- [ ] Test all pages and links
- [ ] Verify animations work
- [ ] Test on mobile devices
- [ ] Check console for errors
- [ ] Set up custom domain (optional)
- [ ] Configure environment variables if needed
- [ ] Set up analytics (Google Analytics, Plausible, etc.)
- [ ] Submit to Google Search Console

---

## 🎯 Recommended Choice by Use Case

### Personal Portfolio (You!)
**→ Use Vercel** - Best for Next.js, zero config, automatic deployments

### Static Site Only
**→ Use GitHub Pages or Cloudflare Pages** - Simple and free

### Need Google Cloud Integration
**→ Use Google Cloud Run** - More control, container-based

### Maximum Performance
**→ Use Cloudflare Pages** - Best global CDN

---

## 🔧 Troubleshooting

### Build Fails?
```bash
# Test build locally first
npm run build
```

### Need Environment Variables?
Add them in your hosting platform's dashboard:
- Vercel: Settings → Environment Variables
- Netlify: Site settings → Environment variables
- Cloud Run: Use `--set-env-vars` flag

### Custom Domain Not Working?
1. Wait 24-48 hours for DNS propagation
2. Check DNS settings with: `dig your-domain.com`
3. Ensure SSL certificate is issued

---

## 💡 Tips

1. **Use Vercel** if you're unsure - it's the easiest
2. **GitHub Actions** deploy automatically on every push
3. **Custom domains** are free on all platforms
4. **HTTPS** is automatic on all platforms
5. Monitor usage to stay within free tiers

Need help? Check the platform's documentation or create an issue!


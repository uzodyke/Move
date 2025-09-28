# Deployment Guide for Tigrex Move Website

This repository includes automated deployment workflows to make deploying your website easy.

## 🚀 Deployment Options

### 1. GitHub Pages (Free & Automatic)

**Setup:**
1. Go to your repository: https://github.com/uzodyke/Move
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Your website will be available at: `https://uzodyke.github.io/Move`

**Benefits:**
- ✅ Free hosting
- ✅ Automatic deployment on every push
- ✅ HTTPS included
- ✅ Custom domain support

### 2. Namecheap FTP Deployment (Automatic)

**Setup:**
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add these repository secrets:
   - `FTP_SERVER` - Your Namecheap FTP server (e.g., `ftp.tigrexmove.co.uk`)
   - `FTP_USERNAME` - Your FTP username
   - `FTP_PASSWORD` - Your FTP password

3. Uncomment the FTP deployment section in `.github/workflows/deploy.yml`

4. Push to main branch - your site will auto-deploy to Namecheap!

**Benefits:**
- ✅ Automatic deployment to your domain
- ✅ No manual file uploads needed
- ✅ Deploys on every push to main

### 3. Manual Deployment

**For immediate deployment:**
1. Run: `npm run build`
2. Upload `dist/` folder contents to your hosting
3. Your website is live!

## 🔄 How Auto-Deployment Works

Every time you push changes to the `main` branch:

1. **GitHub Actions triggers** the deployment workflow
2. **Builds your website** with all optimizations
3. **Deploys automatically** to your chosen platform(s)
4. **Your website updates** within 2-5 minutes

## 📁 What Gets Deployed

- ✅ 25 optimized HTML pages
- ✅ 18 location pages (UK cities + Hampshire)
- ✅ Professional moving imagery backgrounds
- ✅ Working quote forms with Formspree
- ✅ SEO-optimized content and structured data
- ✅ .htaccess for clean URLs
- ✅ Compressed assets for fast loading

## 🛠️ Deployment Workflow Features

- **Automatic building** on every push
- **Node.js 18** with npm caching for speed
- **Error handling** if builds fail
- **Artifact uploads** for debugging
- **Concurrent deployment protection**
- **Manual trigger option** from GitHub Actions tab

## 🌐 Custom Domain Setup

### For GitHub Pages:
1. Add your domain in **Settings** → **Pages** → **Custom domain**
2. Add CNAME record: `uzodyke.github.io`

### For Namecheap:
1. Point your domain to Namecheap hosting
2. FTP deployment will handle the rest

## 🔧 Troubleshooting

**Build fails?**
- Check GitHub Actions tab for error details
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

**FTP deployment not working?**
- Verify FTP credentials in repository secrets
- Check server path (usually `/public_html/`)
- Ensure FTP access is enabled in hosting control panel

**Images not showing?**
- Upload professional moving images to `/images/` folder
- Or update image paths to use placeholder URLs

## 📞 Need Help?

The deployment is configured for:
- **Tigrex Move** professional moving company
- **UK market** with Hampshire focus
- **SEO optimization** for local search
- **Professional design** with moving imagery

Your website is ready for production with automated deployment! 🚚✨
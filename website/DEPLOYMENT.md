# Deployment Guide for KaziKE Website

This guide will help you deploy the KaziKE website to various hosting platforms.

## 🚀 Quick Start

The website is ready to deploy immediately. Simply upload all files in the `website/` directory to your hosting provider.

## 📁 Files to Upload

Ensure you upload all these files:

- `index.html`
- `styles.css`
- `script.js`
- `favicon.svg`
- `manifest.json`
- `README.md`

## 🌐 Hosting Options

### 1. Netlify (Recommended)

#### Free hosting with automatic deployments

1. **Sign up** at [netlify.com](https://netlify.com)
2. **Drag and drop** the `website/` folder to Netlify's deploy area
3. **Custom domain** (optional): Add your domain in site settings
4. **Automatic HTTPS** is enabled by default

**Deploy with Git:**

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Connect to Netlify
# Follow Netlify's git integration guide
```

### 2. Vercel

#### Fast deployment with edge functions

1. **Sign up** at [vercel.com](https://vercel.com)
2. **Import project** from GitHub/GitLab
3. **Deploy** automatically on every push

**CLI deployment:**

```bash
npm i -g vercel
vercel
```

### 3. GitHub Pages

#### Free hosting for public repositories

1. **Create repository** on GitHub
2. **Upload files** to repository
3. **Enable Pages** in repository settings
4. **Select source** branch (usually `main`)

**Deploy command:**

```bash
git add .
git commit -m "Deploy website"
git push origin main
```

### 4. Firebase Hosting

#### Google's hosting platform

1. **Install Firebase CLI:**

   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize project:**

   ```bash
   firebase login
   firebase init hosting
   ```

3. **Deploy:**

```bash
firebase deploy
```

### 5. Traditional Web Hosting

#### Upload via FTP/SFTP

1. **Connect** to your hosting via FTP client
2. **Upload** all files to `public_html/` or `www/` directory
3. **Set permissions** (usually 644 for files, 755 for directories)

## 🔧 Configuration

### Custom Domain

1. **Purchase domain** from domain registrar
2. **Point DNS** to your hosting provider
3. **Configure** in hosting platform settings

### SSL Certificate

Most modern hosting platforms provide free SSL certificates:

- **Netlify**: Automatic
- **Vercel**: Automatic
- **GitHub Pages**: Automatic
- **Firebase**: Automatic
- **Traditional hosting**: Let's Encrypt or hosting provider

### Environment Variables

If you need to configure different settings for different environments:

```bash
# Production
NODE_ENV=production

# Development
NODE_ENV=development
```

## 📊 Performance Optimization

### Before Deployment

1. **Minify CSS and JS** (optional):

   ```bash
   # Install minification tools
   npm install -g clean-css-cli uglify-js

   # Minify CSS
   cleancss -o styles.min.css styles.css

   # Minify JS
   uglifyjs script.js -o script.min.js
   ```

2. **Optimize images** (if adding custom images):
   - Use WebP format when possible
   - Compress images
   - Use appropriate sizes

3. **Enable compression** on your hosting provider

### CDN Integration

For better performance, consider using a CDN:

- **Cloudflare**: Free CDN with security features
- **AWS CloudFront**: Amazon's CDN service
- **Google Cloud CDN**: Google's CDN service

## 🔍 SEO Optimization

### Meta Tags

The website includes basic SEO meta tags. Consider adding:

```html
<!-- Open Graph -->
<meta property="og:title" content="KaziKE - Find Your Next Opportunity">
<meta property="og:description" content="Connect with great employers and find your dream job">
<meta property="og:image" content="https://yourdomain.com/og-image.jpg">
<meta property="og:url" content="https://yourdomain.com">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="KaziKE - Find Your Next Opportunity">
<meta name="twitter:description" content="Connect with great employers and find your dream job">
```

### Google Analytics

Add Google Analytics tracking:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚨 Troubleshooting

### Common Issues

1. **404 Errors**: Ensure all file paths are correct
2. **CSS not loading**: Check file permissions and paths
3. **JavaScript errors**: Check browser console for errors
4. **Mobile issues**: Test on actual devices, not just browser dev tools

### Debug Steps

1. **Check browser console** for JavaScript errors
2. **Validate HTML** using W3C validator
3. **Test on multiple browsers** and devices
4. **Check file permissions** on server
5. **Verify DNS settings** if using custom domain

## 📱 PWA Features

The website includes PWA features:

- **Manifest file** for app-like experience
- **Service worker** ready for offline functionality
- **Responsive design** for all screen sizes
- **Fast loading** with optimized assets

## 🔄 Continuous Deployment

Set up automatic deployments:

### GitHub Actions (for GitHub Pages)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./website
```

### Netlify

Connect your Git repository to Netlify for automatic deployments on every push.

## 📞 Support

If you encounter issues during deployment:

1. **Check hosting provider documentation**
2. **Review error logs** in hosting dashboard
3. **Test locally** before deploying
4. **Contact hosting support** if needed

---

## Happy deploying! 🚀

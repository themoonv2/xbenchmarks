# Cloudflare Pages Deployment Checklist

## Pre-Deployment ✅
- [x] All code changes committed to dev branch
- [x] Dev branch pushed to GitHub
- [x] Dev merged to main branch
- [x] Main branch pushed to GitHub
- [x] All domain URLs updated to benchmarks.thelaptops.shop
- [x] DNS records configured in Cloudflare
  - [x] CNAME: benchmarks → thelaptops.shop (Proxied)
  - [x] A record: thelaptops.shop → 162.0.209.240 (Proxied)
  - [x] TXT verification record in place

## Phase 1: Connect to Cloudflare Pages
- [ ] Log in to Cloudflare Dashboard
- [ ] Click Workers & Pages → Pages
- [ ] Click "Connect to Git"
- [ ] Authorize GitHub (one-time)
- [ ] Select "xbenchmarks" repository
- [ ] Click "Begin setup"

## Phase 2: Configure Build Settings
- [ ] Production branch: `main`
- [ ] Framework preset: `Astro`
- [ ] Build command: `npm run build`
- [ ] Build output directory: `dist`
- [ ] Node.js version: 18+ (default)
- [ ] Click "Save and Deploy"

## Phase 3: Wait for Initial Deployment
- [ ] Monitor build progress in Cloudflare dashboard
- [ ] Wait for build to complete (2-5 minutes)
- [ ] Verify build shows as "Success"
- [ ] Note the assigned `*.pages.dev` URL

## Phase 4: Configure Custom Domain
- [ ] Scroll to "Custom domains" section
- [ ] Click "Add custom domain"
- [ ] Enter: `benchmarks.thelaptops.shop`
- [ ] Click "Continue"
- [ ] Verify DNS records (should auto-detect CNAME)
- [ ] Wait for SSL certificate (1-5 minutes)
- [ ] Verify domain shows as "Active"

## Phase 5: Verify Deployment
- [ ] Visit https://benchmarks.thelaptops.shop
- [ ] Homepage loads without errors
- [ ] Navigation works
- [ ] Comparison pages display correctly
- [ ] CSS/images load properly

## Phase 6: Verify SEO Infrastructure
- [ ] robots.txt accessible at /robots.txt
- [ ] sitemap-index.xml shows 12 sitemaps
- [ ] Laptop models sitemap has entries
- [ ] CPU models sitemap has entries
- [ ] GPU models sitemap has entries
- [ ] Canonical tags present on product pages
- [ ] All URLs use benchmarks.thelaptops.shop domain

## Post-Deployment
- [ ] Test comparison pages (laptop/CPU/GPU)
- [ ] Verify internal product links work
- [ ] Check related comparisons display
- [ ] Test search functionality (if applicable)
- [ ] Monitor Cloudflare Analytics for traffic
- [ ] Set up Google Search Console submission
- [ ] Set up Bing Webmaster Tools submission

## Monitoring Setup
- [ ] Enable build notifications (optional)
- [ ] Save Cloudflare Pages project URL
- [ ] Bookmark deployment logs page
- [ ] Set up team member access if needed

## Troubleshooting Contact Points
- Cloudflare Status: https://www.cloudflarestatus.com/
- Check build logs: Deployments tab in Pages
- Verify DNS: Cloudflare DNS settings
- Test domain: https://www.whatsmydns.net/

---

## Key Information

**GitHub Repository:** https://github.com/themoonv2/xbenchmarks  
**Main Branch:** All deployments from this branch  
**Production Domain:** https://benchmarks.thelaptops.shop  
**Build Time:** ~2-3 minutes per deployment  
**Auto-Deploy:** Enabled on all main branch pushes  

---

## Dates
- **Changes Committed:** $(date)
- **Pushed to Main:** $(date)
- **Deployment Started:** [To be filled]
- **Domain Live:** [To be filled]

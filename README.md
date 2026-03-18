# Fresh Leads Marketing - Website

A modern, fast-loading Next.js website for Fresh Leads Marketing — the #1 laundromat marketing agency.

## Pages

- `/` — Homepage
- `/about` — About page
- `/contact` — Contact page (with GHL calendar embed)
- `/blog` — Blog listing with category filters
- `/blog/geo-fencing-strategies` — Sample blog post
- `/services` — Services overview
- `/services/geo-fencing-ads` — Geo-Fencing Ads service page
- `/services/email-sms` — Email & SMS Marketing service page
- `/services/ai-chatbot` — AI Chatbot & Voice Bot service page
- `/services/crm` — Custom CRM service page
- `/services/b2b-outreach` — B2B Cold Outreach service page
- `/services/google-reviews` — Google Reviews service page

## Deploy to Vercel

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign up / log in
3. Click "New Project" → Import your GitHub repo
4. Vercel auto-detects Next.js — click "Deploy"
5. Your site will be live at a `.vercel.app` URL in ~60 seconds

### Connect your domain

1. In Vercel dashboard → Settings → Domains
2. Add `freshleadsmarketing.com`
3. Update your DNS records as instructed by Vercel
4. SSL is automatic

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Next.js 14** — React framework with App Router
- **DM Sans** — Google Font
- **Inline styles** — No external CSS libraries needed
- **Vercel** — Deployment platform

## Customization

- Colors are defined at the top of each page (`B = "#2B7FFF"`)
- Content (testimonials, case studies, FAQ) is in arrays at the top of each component
- Calendar embed URL is in `/app/contact/page.js`
- To add blog posts, create new folders in `/app/blog/[slug]/page.js`

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Service pages — old GHL flat URLs → new nested /services/ paths
      { source: "/geo-fencing-ads-for-laundromats", destination: "/services/geo-fencing-ads", permanent: true },
      { source: "/email-sms-marketing-for-laundromats", destination: "/services/email-sms", permanent: true },
      { source: "/crm-for-laundromats", destination: "/services/crm", permanent: true },
      { source: "/ai-chatbot-for-laundromats", destination: "/services/ai-chatbot", permanent: true },
      { source: "/google-reviews-laundromats", destination: "/services/google-reviews", permanent: true },
      { source: "/laundromat-marketing-services", destination: "/services", permanent: true },

      // Pages that don't exist on new site (no equivalent) — redirect to closest match
      { source: "/customer-surveys-for-laundromats", destination: "/services", permanent: true },
      { source: "/custom-qr-codes-for-laundromats", destination: "/services", permanent: true },
      { source: "/custom-link-landing-page", destination: "/services", permanent: true },
      { source: "/laundromat-graphic-design", destination: "/services", permanent: true },

      // Core pages with different slugs
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/frequently-asked-questions", destination: "/faq", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },

      // Blog — old GHL structure → new blog paths
      { source: "/laundromat-marketing-blog", destination: "/blog", permanent: true },
      { source: "/post/why-geo-fencing-ads-are-essential-for-laundromat-marketing-success", destination: "/blog/geo-fencing-strategies", permanent: true },
      { source: "/post/how-to-set-up-and-optimize-google-my-business-for-your-laundromat", destination: "/blog/google-reviews-vs-ad-budget", permanent: true },

      // Catch-all for old blog category/author pages
      { source: "/laundromat-marketing-blog/category/:slug", destination: "/blog", permanent: true },
      { source: "/laundromat-marketing-blog/author/:slug", destination: "/blog", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://beta.leadconnectorhq.com https://widgets.leadconnectorhq.com https://link.freshleadsmarketing.com https://cdnjs.cloudflare.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://beta.leadconnectorhq.com https://widgets.leadconnectorhq.com https://services.leadconnectorhq.com https://formsubmit.co",
              "frame-src 'self' https://api.leadconnectorhq.com https://beta.leadconnectorhq.com https://link.leadconnectorhq.com https://link.freshleadsmarketing.com",
              "media-src 'self' https:",
            ].join("; "),
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig

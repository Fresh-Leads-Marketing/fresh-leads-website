/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://link.freshleadsmarketing.com https://*.gohighlevel.com https://*.leadconnectorhq.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "frame-src 'self' https://link.freshleadsmarketing.com https://*.gohighlevel.com https://*.leadconnectorhq.com",
              "connect-src 'self' https://link.freshleadsmarketing.com https://*.gohighlevel.com https://*.leadconnectorhq.com",
              "img-src 'self' data: https: blob:",
            ].join('; '),
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig

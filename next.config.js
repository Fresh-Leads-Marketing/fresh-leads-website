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
            value: "frame-src 'self' https://link.freshleadsmarketing.com https://*.gohighlevel.com https://*.leadconnectorhq.com;",
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig

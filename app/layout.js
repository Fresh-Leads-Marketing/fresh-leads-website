import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://freshleadsmarketing.com"),
  title: {
    default: "Fresh Leads Marketing | Laundromat Marketing Agency",
    template: "%s | Fresh Leads Marketing",
  },
  description: "We help laundromats across the U.S. grow with geo-fenced ads, AI chatbots, email & SMS marketing, commercial outreach, and more. Over 100 laundromats served.",
  keywords: ["laundromat marketing", "laundromat advertising", "laundromat SEO", "geo-fencing ads laundromat", "laundromat growth", "laundry marketing agency"],
  authors: [{ name: "Fresh Leads Marketing" }],
  creator: "Fresh Leads Marketing",
  openGraph: {
    title: "Fresh Leads Marketing | Laundromat Marketing Agency",
    description: "We help laundromats across the U.S. grow with geo-fenced ads, AI chatbots, email & SMS marketing, commercial outreach, and more. Over 100 laundromats served.",
    type: "website",
    url: "https://freshleadsmarketing.com",
    siteName: "Fresh Leads Marketing",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fresh Leads Marketing | Laundromat Marketing Agency",
    description: "We help laundromats across the U.S. grow with geo-fenced ads, AI chatbots, email & SMS marketing, commercial outreach, and more.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: {
    canonical: "https://freshleadsmarketing.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#07090D",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://freshleadsmarketing.com/#organization",
      name: "Fresh Leads Marketing",
      url: "https://freshleadsmarketing.com",
      logo: "https://freshleadsmarketing.com/logo.png",
      description: "Full-service marketing agency built exclusively for laundromats. Geo-fencing ads, AI chatbots, email & SMS, CRM, B2B outreach, and review generation.",
      areaServed: "US",
      sameAs: [
        "https://www.facebook.com/freshleadsmarketing",
        "https://www.instagram.com/freshleadsmarketing"
      ]
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://freshleadsmarketing.com/#localbusiness",
      name: "Fresh Leads Marketing",
      url: "https://freshleadsmarketing.com",
      telephone: "808-736-1539",
      email: "info@freshleadsmarketing.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Honolulu",
        addressRegion: "HI",
        addressCountry: "US"
      },
      priceRange: "$$",
      image: "https://freshleadsmarketing.com/logo.png"
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KHJ57FX2');` }} />
      </head>
      <body>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KHJ57FX2" height="0" width="0" style={{ display: "none", visibility: "hidden" }} /></noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

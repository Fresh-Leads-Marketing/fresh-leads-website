export const metadata = {
  title: "Pricing | All-In-One Laundromat Marketing Package | Fresh Leads",
  description: "Get the full Fresh Leads Marketing package for $1,000/month. Google Ads, Facebook Ads, CRM, AI chatbots, email & SMS, review management, and B2B outreach. All included.",
  canonical: "https://freshleadsmarketing.com/pricing",
  openGraph: {
    title: "Simple, Transparent Pricing | Fresh Leads Marketing",
    description: "One plan. Everything included. No hidden fees. $1,000/month for your first laundromat location, $199 for each additional.",
    url: "https://freshleadsmarketing.com/pricing",
    type: "website",
    images: [
      {
        url: "https://freshleadsmarketing.com/og-pricing.png",
        width: 1200,
        height: 630,
        alt: "Fresh Leads Marketing Pricing"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Simple, Transparent Pricing | Fresh Leads Marketing",
    description: "One plan. Everything included. No hidden fees.",
    images: ["https://freshleadsmarketing.com/og-pricing.png"]
  }
};

export default function PricingLayout({ children }) {
  return children;
}

export const metadata = {
  title: "Laundromat Marketing Services | Geo-Fencing, AI, CRM & More | Fresh Leads",
  description: "Full-service laundromat marketing: geo-fencing ads, AI chatbots, email & SMS, CRM, B2B outreach, and review generation. All managed.",
  alternates: {
    canonical: "https://freshleadsmarketing.com/services",
  },
  openGraph: {
    title: "Laundromat Marketing Services | Geo-Fencing, AI, CRM & More | Fresh Leads",
    description: "Full-service laundromat marketing: geo-fencing ads, AI chatbots, email & SMS, CRM, B2B outreach, and review generation. All managed.",
    url: "https://freshleadsmarketing.com/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laundromat Marketing Services | Geo-Fencing, AI, CRM & More | Fresh Leads",
    description: "Full-service laundromat marketing: geo-fencing ads, AI chatbots, email & SMS, CRM, B2B outreach, and review generation. All managed.",
  },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://freshleadsmarketing.com/services",
  name: "Laundromat Marketing Services",
  description: "Full-service marketing agency built exclusively for laundromats. Our complete system includes geo-fencing ads, AI chatbots, email and SMS automation, CRM integration, B2B outreach, and Google review generation.",
  provider: {
    "@type": "Organization",
    "@id": "https://freshleadsmarketing.com/#organization",
    name: "Fresh Leads Marketing",
    url: "https://freshleadsmarketing.com",
    telephone: "808-736-1539",
    email: "info@freshleadsmarketing.com"
  },
  areaServed: "US",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Laundromat Marketing Services",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Geo-Fencing Ads",
        description: "Hyper-targeted ad campaigns on Facebook and Google reaching customers near your laundromat and competitors."
      },
      {
        "@type": "Offer",
        name: "Email & SMS Marketing",
        description: "Automated email and SMS sequences for new customer onboarding and customer re-engagement."
      },
      {
        "@type": "Offer",
        name: "AI Chatbot & Voice Bot",
        description: "24/7 AI-powered chatbots on website, social media, and voice bots for phone calls."
      },
      {
        "@type": "Offer",
        name: "Custom CRM",
        description: "Customer relationship management system synced to your POS for tracking and automation."
      },
      {
        "@type": "Offer",
        name: "B2B Cold Outreach",
        description: "Email outreach campaigns targeting commercial accounts like hotels, gyms, and salons."
      },
      {
        "@type": "Offer",
        name: "Google Reviews Management",
        description: "Systematic review generation and reputation management via SMS requests."
      }
    ]
  }
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      {children}
    </>
  );
}

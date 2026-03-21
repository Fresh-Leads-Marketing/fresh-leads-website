export const metadata = {
  title: "About Us | Fresh Leads Marketing | Laundromat Marketing Agency",
  description: "Fresh Leads Marketing is a full-service marketing agency built exclusively for laundromats. Based in Honolulu, serving 100+ laundromat clients nationwide.",
  alternates: {
    canonical: "https://freshleadsmarketing.com/about",
  },
  openGraph: {
    title: "About Us | Fresh Leads Marketing | Laundromat Marketing Agency",
    description: "Fresh Leads Marketing is a full-service marketing agency built exclusively for laundromats. Based in Honolulu, serving 100+ laundromat clients nationwide.",
    url: "https://freshleadsmarketing.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Fresh Leads Marketing | Laundromat Marketing Agency",
    description: "Fresh Leads Marketing is a full-service marketing agency built exclusively for laundromats. Based in Honolulu, serving 100+ laundromat clients nationwide.",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://freshleadsmarketing.com/about",
  name: "Fresh Leads Marketing",
  description: "Full-service marketing agency built exclusively for laundromats. We provide geo-fencing ads, AI chatbots, email & SMS marketing, CRM integration, B2B outreach, and Google review generation.",
  url: "https://freshleadsmarketing.com",
  telephone: "808-736-1539",
  email: "info@freshleadsmarketing.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "",
    addressLocality: "Honolulu",
    addressRegion: "HI",
    postalCode: "",
    addressCountry: "US"
  },
  areaServed: "US",
  knowsAbout: ["laundromat marketing", "geo-fencing ads", "email marketing", "SMS marketing", "AI chatbots", "CRM", "B2B outreach", "Google reviews"],
  numberOfEmployees: "5-10",
  foundingDate: "2020",
  sameAs: [
    "https://www.facebook.com/freshleadsmarketing",
    "https://www.instagram.com/freshleadsmarketing"
  ]
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {children}
    </>
  );
}

export const metadata = {
  title: "Build a Customer Database | New Laundromat Guide",
  description: "Complete guide for new laundromats: connect POS, use QR codes, leverage AI chatbots, request reviews, and launch campaigns to build a customer database from scratch.",
  alternates: {
    canonical: "https://freshleadsmarketing.com/blog/building-customer-database-new-laundromat",
  },
  openGraph: {
    title: "Build a Customer Database | New Laundromat Guide",
    description: "Complete guide for new laundromats: connect POS, use QR codes, leverage AI chatbots, request reviews, and launch campaigns to build a customer database from scratch.",
    url: "https://freshleadsmarketing.com/blog/building-customer-database-new-laundromat",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Build a Customer Database | New Laundromat Guide",
    description: "Complete guide for new laundromats: connect POS, use QR codes, leverage AI chatbots, request reviews, and launch campaigns to build a customer database from scratch.",
  },
};


const blogSchema_building_customer_database_new_laundromat = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Building a Customer Database for Your New Laundromat",
  description: "Complete guide for new laundromats: connect POS, use QR codes, leverage AI chatbots, request reviews, and launch campaigns to build a customer database from scratch.",
  url: "https://freshleadsmarketing.com/blog/building-customer-database-new-laundromat",
  datePublished: "2025-08-01",
  dateModified: "2025-08-01",
  author: {
    "@type": "Organization",
    name: "Fresh Leads Marketing",
    url: "https://freshleadsmarketing.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Fresh Leads Marketing",
    logo: {
      "@type": "ImageObject",
      url: "https://freshleadsmarketing.com/logo.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://freshleadsmarketing.com/blog/building-customer-database-new-laundromat",
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema_building_customer_database_new_laundromat) }}
      />
      {children}
    </>
  );
}

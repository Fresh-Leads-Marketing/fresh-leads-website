export const metadata = {
  title: "Land Your First Commercial Laundry Contract",
  description: "How to land commercial laundry contracts from hotels, gyms, Airbnbs, spas: identify prospects, personalized outreach, book meetings, close deals worth $1.5K-$10K monthly.",
  alternates: {
    canonical: "https://freshleadsmarketing.com/blog/first-commercial-laundry-contract",
  },
  openGraph: {
    title: "Land Your First Commercial Laundry Contract",
    description: "How to land commercial laundry contracts from hotels, gyms, Airbnbs, spas: identify prospects, personalized outreach, book meetings, close deals worth $1.5K-$10K monthly.",
    url: "https://freshleadsmarketing.com/blog/first-commercial-laundry-contract",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Land Your First Commercial Laundry Contract",
    description: "How to land commercial laundry contracts from hotels, gyms, Airbnbs, spas: identify prospects, personalized outreach, book meetings, close deals worth $1.5K-$10K monthly.",
  },
};


const blogSchema_first_commercial_laundry_contract = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How to Land Your First Commercial Laundry Contract",
  description: "How to land commercial laundry contracts from hotels, gyms, Airbnbs, spas: identify prospects, personalized outreach, book meetings, close deals worth $1.5K-$10K monthly.",
  url: "https://freshleadsmarketing.com/blog/first-commercial-laundry-contract",
  datePublished: "2025-09-15",
  dateModified: "2025-09-15",
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
    "@id": "https://freshleadsmarketing.com/blog/first-commercial-laundry-contract",
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema_first_commercial_laundry_contract) }}
      />
      {children}
    </>
  );
}

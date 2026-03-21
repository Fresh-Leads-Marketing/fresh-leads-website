export const metadata = {
  title: "Why Google Reviews Matter More Than Ad Budget | Laundromat SEO | Fresh Leads",
  description: "Google reviews impact laundromat rankings more than ads: 250 reviews beats small budgets, reviews compound forever, systematic generation yields 15-30 monthly reviews.",
  alternates: {
    canonical: "https://freshleadsmarketing.com/blog/google-reviews-vs-ad-budget",
  },
  openGraph: {
    title: "Why Google Reviews Matter More Than Ad Budget | Laundromat SEO | Fresh Leads",
    description: "Google reviews impact laundromat rankings more than ads: 250 reviews beats small budgets, reviews compound forever, systematic generation yields 15-30 monthly reviews.",
    url: "https://freshleadsmarketing.com/blog/google-reviews-vs-ad-budget",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Google Reviews Matter More Than Ad Budget | Laundromat SEO | Fresh Leads",
    description: "Google reviews impact laundromat rankings more than ads: 250 reviews beats small budgets, reviews compound forever, systematic generation yields 15-30 monthly reviews.",
  },
};


const blogSchema_google_reviews_vs_ad_budget = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Google Reviews vs Ad Budget for Laundromats",
  description: "Google reviews impact laundromat rankings more than ads: 250 reviews beats small budgets, reviews compound forever, systematic generation yields 15-30 monthly reviews.",
  url: "https://freshleadsmarketing.com/blog/google-reviews-vs-ad-budget",
  datePublished: "2025-10-01",
  dateModified: "2025-10-01",
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
    "@id": "https://freshleadsmarketing.com/blog/google-reviews-vs-ad-budget",
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema_google_reviews_vs_ad_budget) }}
      />
      {children}
    </>
  );
}

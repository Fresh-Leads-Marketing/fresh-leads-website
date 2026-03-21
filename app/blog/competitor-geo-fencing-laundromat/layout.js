export const metadata = {
  title: "Geo-Fencing Around Competitors | Fresh Leads",
  description: "Learn competitor geo-fencing for laundromats: target rival locations with ads, choose which competitors to fence, create compelling offers, and expect 2-4x ROI.",
  alternates: {
    canonical: "https://freshleadsmarketing.com/blog/competitor-geo-fencing-laundromat",
  },
  openGraph: {
    title: "Geo-Fencing Around Competitors | Fresh Leads",
    description: "Learn competitor geo-fencing for laundromats: target rival locations with ads, choose which competitors to fence, create compelling offers, and expect 2-4x ROI.",
    url: "https://freshleadsmarketing.com/blog/competitor-geo-fencing-laundromat",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Geo-Fencing Around Competitors | Fresh Leads",
    description: "Learn competitor geo-fencing for laundromats: target rival locations with ads, choose which competitors to fence, create compelling offers, and expect 2-4x ROI.",
  },
};


const blogSchema_competitor_geo_fencing_laundromat = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Competitor Geo-Fencing for Laundromats",
  description: "Learn competitor geo-fencing for laundromats: target rival locations with ads, choose which competitors to fence, create compelling offers, and expect 2-4x ROI.",
  url: "https://freshleadsmarketing.com/blog/competitor-geo-fencing-laundromat",
  datePublished: "2025-08-15",
  dateModified: "2025-08-15",
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
    "@id": "https://freshleadsmarketing.com/blog/competitor-geo-fencing-laundromat",
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema_competitor_geo_fencing_laundromat) }}
      />
      {children}
    </>
  );
}

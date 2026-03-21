export const metadata = {
  title: "7 Geo-Fencing Strategies That Drive Foot Traffic to Laundromats | Fresh Leads",
  description: "Advanced geo-fencing strategies: fence your location, competitors, apartments, colleges, retail zones, use retargeting, time-of-day targeting. Drive 2-4x foot traffic.",
  alternates: {
    canonical: "https://freshleadsmarketing.com/blog/geo-fencing-strategies",
  },
  openGraph: {
    title: "7 Geo-Fencing Strategies That Drive Foot Traffic to Laundromats | Fresh Leads",
    description: "Advanced geo-fencing strategies: fence your location, competitors, apartments, colleges, retail zones, use retargeting, time-of-day targeting. Drive 2-4x foot traffic.",
    url: "https://freshleadsmarketing.com/blog/geo-fencing-strategies",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "7 Geo-Fencing Strategies That Drive Foot Traffic to Laundromats | Fresh Leads",
    description: "Advanced geo-fencing strategies: fence your location, competitors, apartments, colleges, retail zones, use retargeting, time-of-day targeting. Drive 2-4x foot traffic.",
  },
};


const blogSchema_geo_fencing_strategies = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "7 Geo-Fencing Strategies That Drive Foot Traffic to Laundromats",
  description: "Advanced geo-fencing strategies: fence your location, competitors, apartments, colleges, retail zones, use retargeting, time-of-day targeting. Drive 2-4x foot traffic.",
  url: "https://freshleadsmarketing.com/blog/geo-fencing-strategies",
  datePublished: "2025-06-15",
  dateModified: "2025-06-15",
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
    "@id": "https://freshleadsmarketing.com/blog/geo-fencing-strategies",
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema_geo_fencing_strategies) }}
      />
      {children}
    </>
  );
}

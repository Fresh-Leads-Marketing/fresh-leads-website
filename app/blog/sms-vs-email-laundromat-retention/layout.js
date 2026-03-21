export const metadata = {
  title: "SMS vs Email for Laundromat Retention",
  description: "SMS vs email for laundromat retention: SMS for urgency (98% open rate), email for nurture (20-35% open). Use both strategically. Increase repeat visits 40-60%.",
  alternates: {
    canonical: "https://freshleadsmarketing.com/blog/sms-vs-email-laundromat-retention",
  },
  openGraph: {
    title: "SMS vs Email for Laundromat Retention",
    description: "SMS vs email for laundromat retention: SMS for urgency (98% open rate), email for nurture (20-35% open). Use both strategically. Increase repeat visits 40-60%.",
    url: "https://freshleadsmarketing.com/blog/sms-vs-email-laundromat-retention",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "SMS vs Email for Laundromat Retention",
    description: "SMS vs email for laundromat retention: SMS for urgency (98% open rate), email for nurture (20-35% open). Use both strategically. Increase repeat visits 40-60%.",
  },
};


const blogSchema_sms_vs_email_laundromat_retention = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "SMS vs Email for Laundromat Customer Retention",
  description: "SMS vs email for laundromat retention: SMS for urgency (98% open rate), email for nurture (20-35% open). Use both strategically. Increase repeat visits 40-60%.",
  url: "https://freshleadsmarketing.com/blog/sms-vs-email-laundromat-retention",
  datePublished: "2025-10-15",
  dateModified: "2025-10-15",
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
    "@id": "https://freshleadsmarketing.com/blog/sms-vs-email-laundromat-retention",
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema_sms_vs_email_laundromat_retention) }}
      />
      {children}
    </>
  );
}

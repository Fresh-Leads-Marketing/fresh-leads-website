export const metadata = {
  title: "5 Biggest Laundromat Marketing Mistakes & How to Fix Them | Fresh Leads",
  description: "Discover the top laundromat marketing mistakes owners make: bad targeting, ignoring customer lists, generic ads, poor reviews, wrong mindset. Learn how to fix each one.",
  alternates: {
    canonical: "https://freshleadsmarketing.com/blog/biggest-laundromat-marketing-mistakes",
  },
  openGraph: {
    title: "5 Biggest Laundromat Marketing Mistakes & How to Fix Them | Fresh Leads",
    description: "Discover the top laundromat marketing mistakes owners make: bad targeting, ignoring customer lists, generic ads, poor reviews, wrong mindset. Learn how to fix each one.",
    url: "https://freshleadsmarketing.com/blog/biggest-laundromat-marketing-mistakes",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "5 Biggest Laundromat Marketing Mistakes & How to Fix Them | Fresh Leads",
    description: "Discover the top laundromat marketing mistakes owners make: bad targeting, ignoring customer lists, generic ads, poor reviews, wrong mindset. Learn how to fix each one.",
  },
};


const blogSchema_biggest_laundromat_marketing_mistakes = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "The Biggest Laundromat Marketing Mistakes",
  description: "Discover the top laundromat marketing mistakes owners make: bad targeting, ignoring customer lists, generic ads, poor reviews, wrong mindset. Learn how to fix each one.",
  url: "https://freshleadsmarketing.com/blog/biggest-laundromat-marketing-mistakes",
  datePublished: "2025-07-15",
  dateModified: "2025-07-15",
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
    "@id": "https://freshleadsmarketing.com/blog/biggest-laundromat-marketing-mistakes",
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema_biggest_laundromat_marketing_mistakes) }}
      />
      {children}
    </>
  );
}

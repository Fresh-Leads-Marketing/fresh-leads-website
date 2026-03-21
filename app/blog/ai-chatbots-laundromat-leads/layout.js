export const metadata = {
  title: "How AI Chatbots Capture 3x More Laundromat Leads | Fresh Leads",
  description: "Learn how AI chatbots and voice bots help laundromats capture leads 24/7, convert website visitors, answer calls automatically, and boost conversions by 3-4x.",
  alternates: {
    canonical: "https://freshleadsmarketing.com/blog/ai-chatbots-laundromat-leads",
  },
  openGraph: {
    title: "How AI Chatbots Capture 3x More Laundromat Leads | Fresh Leads",
    description: "Learn how AI chatbots and voice bots help laundromats capture leads 24/7, convert website visitors, answer calls automatically, and boost conversions by 3-4x.",
    url: "https://freshleadsmarketing.com/blog/ai-chatbots-laundromat-leads",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How AI Chatbots Capture 3x More Laundromat Leads | Fresh Leads",
    description: "Learn how AI chatbots and voice bots help laundromats capture leads 24/7, convert website visitors, answer calls automatically, and boost conversions by 3-4x.",
  },
};


const blogSchema_ai_chatbots_laundromat_leads = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How AI Chatbots Help Laundromats Capture More Leads",
  description: "Learn how AI chatbots and voice bots help laundromats capture leads 24/7, convert website visitors, answer calls automatically, and boost conversions by 3-4x.",
  url: "https://freshleadsmarketing.com/blog/ai-chatbots-laundromat-leads",
  datePublished: "2025-07-01",
  dateModified: "2025-07-01",
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
    "@id": "https://freshleadsmarketing.com/blog/ai-chatbots-laundromat-leads",
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema_ai_chatbots_laundromat_leads) }}
      />
      {children}
    </>
  );
}

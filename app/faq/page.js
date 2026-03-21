"use client";
import { useState, useEffect, useRef } from "react";

const B = "#2B7FFF";
const B2 = "#5A9EFF";
const BG = "#07090D";
const BG2 = "#0C1017";
const BG3 = "#101520";

function useV(t = 0.1) {
  const r = useRef(null);
  const [v, s] = useState(false);
  useEffect(() => {
    const e = r.current;
    if (!e) return;
    const o = new IntersectionObserver(
      ([x]) => { if (x.isIntersecting) { s(true); o.disconnect(); } },
      { threshold: t }
    );
    o.observe(e);
    return () => o.disconnect();
  }, [t]);
  return [r, v];
}

function FI({ children, delay = 0, className = "" }) {
  const [r, v] = useV();
  return (
    <div ref={r} className={className} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(24px)",
      transition: `opacity .6s ease ${delay}s, transform .6s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function Logo(){return(<img src="/logo.png" alt="Fresh Leads Marketing" style={{height:32,width:"auto",display:"block"}}/>)}

function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const show = () => { clearTimeout(timer.current); setOpen(true); };
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 150); };
  const items = [
    ["Geo-Fencing Ads", "/services/geo-fencing-ads"],
    ["Email & SMS", "/services/email-sms"],
    ["CRM Integration", "/services/crm"],
    ["AI Chatbot & Voice AI", "/services/ai-chatbot"],
    ["Google Reviews", "/services/google-reviews"],
    ["B2B Outreach", "/services/b2b-outreach"],
  ];
  return (
    <div style={{ position: "relative" }} onMouseEnter={show} onMouseLeave={hide}>
      <a href="/services" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13, fontWeight: 550, display: "flex", alignItems: "center", gap: 4 }}>
        Services <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </a>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", paddingTop: 10 }}>
          <div style={{ background: "rgba(12,16,23,0.98)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "8px 0", minWidth: 200, boxShadow: "0 8px 32px rgba(0,0,0,0.5)", backdropFilter: "blur(20px)" }}>
            {items.map(([label, href]) => (
              <a key={href} href={href} style={{ display: "block", padding: "9px 18px", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13, fontWeight: 500, transition: "background .15s" }} onMouseEnter={e => { e.target.style.background = "rgba(43,127,255,0.08)"; e.target.style.color = "#fff"; }} onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "rgba(255,255,255,0.6)"; }}>{label}</a>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", margin: "6px 0" }} />
            <a href="/services" style={{ display: "block", padding: "9px 18px", color: B, textDecoration: "none", fontSize: 13, fontWeight: 650 }}>All Services →</a>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileMenu({ open, onClose }) {
  if (!open) return null;
  const links = [
    ["Home", "/"],
    ["Services", "/services"],
    ["Geo-Fencing Ads", "/services/geo-fencing-ads"],
    ["Email & SMS", "/services/email-sms"],
    ["CRM Integration", "/services/crm"],
    ["AI Chatbot & Voice AI", "/services/ai-chatbot"],
    ["Google Reviews", "/services/google-reviews"],
    ["B2B Outreach", "/services/b2b-outreach"],
    ["About", "/about"],
    ["Pricing", "/pricing"],
    ["Blog", "/blog"],
    ["FAQ", "/faq"],
    ["Contact", "/contact"],
  ];
  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ flex: 1 }}>
        <div style={{ position: "absolute", top: 20, right: 24 }}>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", fontSize: 28, cursor: "pointer", padding: 8 }}>✕</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {links.map(([label, href]) => {
            const isSub = ["Geo-Fencing Ads","AI Chatbot & Voice AI","Email & SMS","CRM Integration","B2B Outreach","Google Reviews"].includes(label);
            return (
              <a key={href+label} href={href} onClick={onClose} style={{
                color: isSub ? "rgba(255,255,255,0.4)" : "#fff",
                textDecoration: "none",
                fontSize: isSub ? 15 : 20,
                fontWeight: isSub ? 500 : 700,
                padding: isSub ? "6px 0 6px 20px" : "10px 0",
                borderBottom: label === "Google Reviews" || label === "Contact" ? "none" : label === "Services" ? "none" : "1px solid rgba(255,255,255,0.05)",
              }}>{label}</a>
            );
          })}
        </div>
        <a href="/contact" style={{ display: "block", background: B, color: "#fff", padding: "16px 0", borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: "none", textAlign: "center", marginTop: 28 }}>Free Marketing Audit</a>
      </div>
    </div>
  );
}

function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);
  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(7,9,13,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <Logo />
          <div className="dn" style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <a href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13, fontWeight: 550 }}>Home</a>
            <ServicesDropdown />
            {["About", "Pricing", "Blog", "FAQ", "Contact"].map(l => (
              <a key={l} href={l==="About"?"/about":l==="Pricing"?"/pricing":l==="Blog"?"/blog":l==="FAQ"?"/faq":"/contact"} style={{ color: l === "FAQ" ? "#fff" : "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13, fontWeight: l === "FAQ" ? 650 : 550 }}>{l}</a>
            ))}
            <a href="/contact" style={{ background: B, color: "#fff", padding: "9px 20px", borderRadius: 9, fontWeight: 650, fontSize: 13, textDecoration: "none" }}>Free Marketing Audit</a>
          </div>
          <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none", alignItems: "center", justifyContent: "center" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </nav>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

const CATEGORIES = [
  {
    title: "General",
    icon: "💡",
    faqs: [
      ["What is the Laundromat Growth System?", "The Laundromat Growth System is our all-in-one marketing package built specifically for laundromats. It includes everything you need to grow: geo-fencing ads on Facebook and Google, email and SMS automation, an AI chatbot and voice bot, a custom CRM synced to your POS, B2B commercial outreach, and Google review generation. Everything works together as one system so your marketing compounds instead of operating in silos."],
      ["Why can't I just pick individual services?", "We don't offer a la carte services because isolated tactics don't work. Running ads without email follow-up means you're paying for leads that never come back. Getting reviews without a CRM means you can't track who's responding. The Laundromat Growth System is designed so every piece feeds the others. Ads bring in new customers, the CRM segments them, email and SMS bring them back, the chatbot captures leads 24/7, and reviews build your reputation. That's how you get compounding growth instead of one-off results."],
      ["Do you only work with laundromats?", "Yes. We work exclusively with laundromats, including self-service laundromats, wash-and-fold operations, laundry pickup and delivery services, and commercial laundry businesses. This specialization means every strategy, ad template, and automation sequence has been tested and refined across over 100 laundromat clients. We understand the industry inside and out."],
      ["What if I've tried marketing before and it didn't work?", "This is the most common thing we hear. Almost every time, the issue is the same: the previous agency ran generic campaigns that weren't built for laundromats. They targeted too broad, used stock creative, and had no understanding of the laundry industry. We're different because we only work with laundromats. Every ad template, email sequence, and targeting strategy has been tested across over 100 laundromat clients. We already know what works."],
    ]
  },
  {
    title: "Getting Started",
    icon: "🚀",
    faqs: [
      ["How do I get started?", "The first step is booking a free discovery call. During that 30 to 60 minute call, we'll learn about your business, research your market, review your competition, and outline a custom growth plan. There's no commitment required. You can book a call at freshleadsmarketing.com/contact or reach out to us directly."],
      ["What happens during the discovery call?", "The discovery call is a free 30 to 60 minute consultation where we learn about your laundromat, your goals, and your market. Before the call, we research your area so we come prepared with insights about your competition and opportunities. By the end of the call, you'll have a clear picture of what we'd do for your business and what results to expect."],
      ["What do I need to provide to get started?", "We'll need access to your Meta Business Suite account, your Google Ads account, your domain DNS so we can set up email sending, and your POS system credentials for the API integration. If you don't have ad accounts set up yet, we'll help you create them. We walk you through everything on the kickoff call."],
      ["Can this work for a brand new laundromat?", "Absolutely. New laundromats are actually some of our best success stories because there's zero competition for your brand name, no bad habits to undo, and everything is set up correctly from day one. We'll focus on building awareness through geo-fencing ads, capturing every lead with the chatbot, and generating reviews fast to build your Google presence."],
      ["Do I need to be tech-savvy to use this?", "Not at all. We handle everything: ad creation, campaign management, email copywriting, chatbot training, CRM setup, review automation, and reporting. You'll get a dashboard where you can see your results anytime, but you don't need to touch anything. We send you clear, simple reports and hop on calls to walk through performance whenever you want."],
    ]
  },
  {
    title: "Results & Performance",
    icon: "📈",
    faqs: [
      ["How fast will I see results?", "Most clients see their first leads within 1-2 weeks of launching ads. By month 2-3, we've gathered enough data to deeply optimize your campaigns. That's when ROI typically hits 2-4x. Email and SMS campaigns can generate revenue within days if you have an existing customer list. Review generation starts showing Google Maps ranking improvements within 60-90 days. The full system builds momentum over time, with months 4-6 being where most clients see the biggest jumps."],
      ["What kind of ROI can I expect?", "Our average client generates 3x or more return on their total marketing investment. Some of our top-performing clients see 5-8x returns, especially those with wash-and-fold or pickup/delivery services where customer lifetime value is higher. Results depend on your market, competition, and services offered, but we set clear benchmarks during onboarding and hold ourselves accountable to them."],
      ["How do you track and report results?", "You get a real-time dashboard plus detailed monthly reports covering every channel: ad performance, email open rates, SMS engagement, review growth, lead counts, and revenue attribution. We tie everything back to actual dollars so you know exactly what your marketing investment is generating. No vanity metrics, no fluff. Just the numbers that matter to your bottom line."],
      ["What if I'm not seeing results?", "We monitor campaigns daily and optimize continuously. If something isn't performing, we catch it fast and adjust. We also have bi-weekly check-in calls where we review performance together. If after 90 days the system isn't delivering, we'll have a transparent conversation about what's happening and what changes need to be made. We only succeed when you succeed, so we're highly motivated to make it work."],
    ]
  },
  {
    title: "Services & Technology",
    icon: "⚙️",
    faqs: [
      ["How do geo-fencing ads work for laundromats?", "We draw virtual boundaries around your laundromat, your competitors' locations, apartment complexes, and high-traffic areas. When someone enters that zone with their phone, they become eligible to see your ads on Facebook, Instagram, and Google. This means you're reaching people who are physically near your business, not blasting ads to an entire city. Our clients typically see a 3-4x return on ad spend with cost per lead between $4-8."],
      ["How do your AI chatbots work for laundromats?", "Our AI chatbots are available on your website, via SMS texting, and on Facebook Messenger. They handle customer questions 24/7, including hours of operation, services offered, pricing, directions, and more. The chatbot is trained specifically on your business, your services, and your FAQs so it gives accurate, helpful answers every time. The chatbot does not handle booking or scheduling—it directs customers to contact you for anything that requires a conversation with your team."],
      ["What POS systems do you integrate with?", "Our CRM integrates directly with Cents, LaundroWorks, and CCI. Customer data syncs automatically so you never need to manually enter contacts. If you use a different system, we'll work with you to find an integration path or set up manual imports that keep your data flowing."],
      ["How does B2B outreach work?", "We identify hotels, gyms, spas, Airbnbs, and other commercial accounts in your area that need laundry services. Then we run targeted outreach campaigns through warmed-up email channels to book meetings. This is a high-value service because commercial contracts are recurring revenue with predictable volume. Most laundromat owners don't have the time or system to do this consistently, so we handle it end to end."],
      ["Can you help us increase our online reviews?", "Yes. We set up automated review request sequences that go out to customers after they visit your laundromat. The requests are sent via email and SMS at the right time to maximize the chance of getting a response. More 5-star reviews means a higher Google Maps ranking, which means more people find you when they search 'laundromat near me.' We also respond to all your Google reviews with professional, personalized responses using AI, so every customer feedback gets acknowledged."],
    ]
  },
  {
    title: "Pricing & Contracts",
    icon: "💰",
    faqs: [
      ["How much does Fresh Leads Marketing cost?", "Our All-In-One Growth Package is $1,000 per month for your first location. If you have multiple locations, each additional location is $199 per month. That price includes everything: Google Ads management, Facebook and Instagram Ads management, email and SMS marketing, CRM, AI chatbots, Google review management with AI auto-responses, and B2B cold email outreach. There are no hidden fees."],
      ["Do I need to sign a long-term contract?", "No. We offer month-to-month agreements. There are no long-term commitments required. We believe our results should earn your business every month, not a contract. That said, marketing works best with consistency, and most clients who stay for 3+ months see significantly better results as campaigns optimize over time."],
      ["How much should I budget for ad spend?", "Most laundromats start with $300 to $1,000 per month in ad spend on top of our management fee. After we analyze the initial data, we increase the budget from there based on what's working. We'll recommend a starting budget during your discovery call based on your area and competition."],
      ["How long does it take to get set up?", "Our setup process is fast. After we complete the kickoff call, your ads are live within 48 hours if it falls during Monday through Friday business hours. The rest of the system (CRM, chatbots, email and SMS automations, review management) is configured during the first week."],
    ]
  },
];

function AccordionItem({ q, a, isOpen, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: isOpen ? "rgba(43,127,255,0.04)" : "rgba(255,255,255,0.03)",
      border: "1px solid " + (isOpen ? "rgba(43,127,255,0.15)" : "rgba(255,255,255,0.07)"),
      borderRadius: 12, cursor: "pointer", transition: "all .2s", marginBottom: 8,
    }}>
      <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 15, fontWeight: 640, color: "#fff", lineHeight: 1.4 }}>{q}</span>
        <span style={{
          width: 28, height: 28, borderRadius: 7, flexShrink: 0,
          background: isOpen ? B : "rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: isOpen ? "#fff" : "rgba(255,255,255,0.3)",
          fontSize: 16, transition: "all .2s"
        }}>
          <span style={{ transform: isOpen ? "rotate(45deg)" : "none", transition: "transform .2s", display: "block" }}>+</span>
        </span>
      </div>
      {isOpen && (
        <div style={{ padding: "0 20px 16px" }}>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (catIdx, faqIdx) => {
    const key = `${catIdx}-${faqIdx}`;
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allFaqs = CATEGORIES.flatMap(cat => cat.faqs);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.map(([q, a]) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a }
    }))
  };

  return (
    <div style={{ background: BG, minHeight: "100vh", color: "#fff" }}>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section style={{ background: BG, padding: "130px 24px 60px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 50% 30%, rgba(43,127,255,0.06) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <FI>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(43,127,255,0.08)", border: "1px solid rgba(43,127,255,0.15)", borderRadius: 50, padding: "5px 14px 5px 10px", marginBottom: 22 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: B }} />
              <span style={{ color: B2, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>Everything you need to know</span>
            </div>
          </FI>
          <FI delay={0.05}>
            <h1 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, color: "#fff", lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 16 }}>
              Frequently Asked <span style={{ color: B }}>Questions</span>
            </h1>
          </FI>
          <FI delay={0.1}>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 560, margin: "0 auto", lineHeight: 1.65 }}>
              Get answers about how Fresh Leads Marketing helps laundromats grow with our all-in-one marketing system.
            </p>
          </FI>
        </div>
      </section>

      {/* Quick Nav */}
      <section style={{ padding: "0 24px 50px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }} className="cat-pills">
          {CATEGORIES.map((cat, i) => (
            <FI key={i} delay={i * 0.04}>
              <a href={`#cat-${i}`} style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 50, padding: "8px 18px", textDecoration: "none",
                fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)",
                transition: "all .2s"
              }} onMouseEnter={e => { e.target.style.borderColor = "rgba(43,127,255,0.3)"; e.target.style.color = "#fff"; }} onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.color = "rgba(255,255,255,0.6)"; }}>
                <span>{cat.icon}</span> {cat.title}
              </a>
            </FI>
          ))}
        </div>
      </section>

      {/* FAQ Categories */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {CATEGORIES.map((cat, catIdx) => (
            <FI key={catIdx} delay={catIdx * 0.05}>
              <div id={`cat-${catIdx}`} style={{ marginBottom: 50, scrollMarginTop: 100 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <span style={{ fontSize: 24 }}>{cat.icon}</span>
                  <h2 style={{ fontSize: 22, fontWeight: 750, color: "#fff", margin: 0 }}>{cat.title}</h2>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                </div>
                {cat.faqs.map(([q, a], faqIdx) => (
                  <AccordionItem
                    key={faqIdx}
                    q={q}
                    a={a}
                    isOpen={!!openItems[`${catIdx}-${faqIdx}`]}
                    onClick={() => toggleItem(catIdx, faqIdx)}
                  />
                ))}
              </div>
            </FI>
          ))}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section style={{ background: BG2, padding: "80px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <FI>
            <div style={{ background: "linear-gradient(135deg, rgba(43,127,255,0.1), rgba(43,127,255,0.03))", border: "1px solid rgba(43,127,255,0.15)", borderRadius: 20, padding: "clamp(36px,5vw,60px) clamp(24px,4vw,44px)", textAlign: "center" }}>
              <h2 style={{ fontSize: "clamp(24px,3.5vw,34px)", fontWeight: 800, color: "#fff", marginBottom: 12 }}>Still have questions?</h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.6 }}>
                Book a free marketing audit and we'll walk you through everything. No pressure, no obligations. Just a clear picture of how we can help your laundromat grow.
              </p>
              <a href="/contact" style={{ display: "inline-block", background: B, color: "#fff", padding: "14px 30px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 20px rgba(43,127,255,0.3)" }}>Book Your Free Marketing Audit →</a>
            </div>
          </FI>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: BG, padding: "60px 24px 32px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="footer-inner" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40, marginBottom: 40 }}>
          <div>
            <Logo />
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, marginTop: 12, marginBottom: 16 }}>Marketing built exclusively for laundromats.</p>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>
              <div style={{ marginBottom: 6 }}>📞 <a href="tel:808-736-1539" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>808-736-1539</a></div>
              <div>📧 <a href={"mailto:"+"info"+"@"+"freshleadsmarketing.com"} style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>{['info','@','freshleadsmarketing','.com'].join('')}</a></div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Quick Links</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[["Home", "/"],["Services", "/services"],["About", "/about"],["Pricing", "/pricing"],["Blog", "/blog"],["FAQ", "/faq"],["Contact", "/contact"]].map(([label, href]) => (
                <a key={href} href={href} style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color .2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}>{label}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Services</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[["Geo-Fencing Ads", "/services/geo-fencing-ads"],["Email & SMS", "/services/email-sms"],["CRM Integration", "/services/crm"],["AI Chatbot & Voice AI", "/services/ai-chatbot"],["Google Reviews", "/services/google-reviews"],["B2B Outreach", "/services/b2b-outreach"]].map(([label, href]) => (
                <a key={href} href={href} style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color .2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}>{label}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Legal</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[["Privacy Policy", "/privacy"],["Terms of Service", "/terms"]].map(([label, href]) => (
                <a key={href} href={href} style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color .2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}>{label}</a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 24, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", margin: 0 }}>© 2026 Fresh Leads Marketing. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

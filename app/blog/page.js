"use client";
import { useState, useEffect, useRef } from "react";

const B = "#2B7FFF";
const B2 = "#5A9EFF";
const BG = "#07090D";
const BG2 = "#0C1017";

function useV(t = 0.1) {
  const r = useRef(null), [v, s] = useState(false);
  useEffect(() => { const e = r.current; if (!e) return; const o = new IntersectionObserver(([x]) => { if (x.isIntersecting) { s(true); o.disconnect(); } }, { threshold: t }); o.observe(e); return () => o.disconnect(); }, [t]);
  return [r, v];
}
function FI({ children, delay = 0, className = "" }) {
  const [r, v] = useV();
  return <div ref={r} className={className} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transition: `opacity .6s ease ${delay}s, transform .6s ease ${delay}s` }}>{children}</div>;
}
function Logo(){return(<img src="/logo.png" alt="Fresh Leads Marketing" style={{height:32,width:"auto",display:"block"}}/>)}

function ServicesDropdown({ active }) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const show = () => { clearTimeout(timer.current); setOpen(true); };
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 150); };
  const items = [
    ["Geo-Fencing Ads", "/services/geo-fencing-ads"],
    ["AI Chatbot", "/services/ai-chatbot"],
    ["Email & SMS", "/services/email-sms"],
    ["CRM Integration", "/services/crm"],
    ["B2B Outreach", "/services/b2b-outreach"],
    ["Google Reviews", "/services/google-reviews"],
  ];
  return (
    <div style={{ position: "relative" }} onMouseEnter={show} onMouseLeave={hide}>
      <a href="/services" style={{ color: active ? "#fff" : "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13, fontWeight: active ? 650 : 550, display: "flex", alignItems: "center", gap: 4 }}>
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
    ["AI Chatbot", "/services/ai-chatbot"],
    ["Email & SMS", "/services/email-sms"],
    ["CRM Integration", "/services/crm"],
    ["B2B Outreach", "/services/b2b-outreach"],
    ["Google Reviews", "/services/google-reviews"],
    ["About", "/about"],
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
            const isSub = ["Geo-Fencing Ads","AI Chatbot","Email & SMS","CRM Integration","B2B Outreach","Google Reviews"].includes(label);
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
            <ServicesDropdown active={false} />
            {["About", "Blog", "FAQ", "Contact"].map(l => <a key={l} href={l==="About"?"/about":l==="Blog"?"/blog":l==="FAQ"?"/faq":"/contact"} style={{ color: l === "Blog" ? "#fff" : "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13, fontWeight: l === "Blog" ? 650 : 550 }}>{l}</a>)}
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

const CATS = ["All", "Advertising", "Email & SMS", "AI Tools", "Reviews", "Strategy", "Commercial"];

const POSTS = [
  { title: "7 Geo-Fencing Strategies That Drive Foot Traffic to Your Laundromat", slug: "geo-fencing-strategies", cat: "Advertising", date: "Mar 10, 2026", read: "5 min", preview: "Geo-fencing is one of the most powerful tools in a laundromat owner's marketing arsenal. By creating virtual boundaries around your location and competitors, you can serve ads to the exact people most likely to walk through your door. Here are 7 strategies our clients use to consistently drive new foot traffic.", featured: true },
  { title: "How AI Chatbots Are Helping Laundromats Capture 3x More Leads", slug: "ai-chatbots-laundromat-leads", cat: "AI Tools", date: "Mar 3, 2026", read: "4 min", preview: "Most laundromat websites lose 90% of their visitors because nobody's available to answer questions. An AI chatbot changes that — handling inquiries, booking appointments, and capturing contact info 24/7. We break down the setup, training, and results." },
  { title: "Email Marketing for Laundromats: The Complete 2026 Playbook", slug: "email-marketing-laundromats-2026", cat: "Email & SMS", date: "Feb 24, 2026", read: "8 min", preview: "Email has the highest ROI of any marketing channel at $36 per $1 spent. But most laundromats either skip it entirely or do it wrong. This guide covers list building, segmentation, automation sequences, and the exact emails that bring customers back." },
  { title: "How to Land Your First Commercial Laundry Contract", slug: "first-commercial-laundry-contract", cat: "Commercial", date: "Feb 17, 2026", read: "6 min", preview: "Hotels, gyms, and spas need reliable laundry services — and they pay well for it. Here's our step-by-step system for finding, reaching out to, and closing commercial accounts in your area." },
  { title: "Why Your Google Reviews Matter More Than Your Ad Budget", slug: "google-reviews-vs-ad-budget", cat: "Reviews", date: "Feb 10, 2026", read: "4 min", preview: "A laundromat with 200 reviews and a 4.7 rating will consistently outrank a competitor spending 3x more on ads. We explain the connection between reviews, Maps ranking, and customer trust — plus how to systematically grow your review count." },
  { title: "The 5 Biggest Marketing Mistakes Laundromat Owners Make", slug: "biggest-laundromat-marketing-mistakes", cat: "Strategy", date: "Feb 3, 2026", read: "5 min", preview: "After working with 125+ laundromats, we've seen the same mistakes over and over: no retargeting, ignoring email, generic ad creative, missing review opportunities, and treating marketing as an expense instead of an investment." },
  { title: "SMS vs Email: Which Works Better for Laundromat Customer Retention?", slug: "sms-vs-email-laundromat-retention", cat: "Email & SMS", date: "Jan 27, 2026", read: "5 min", preview: "The short answer: both, but for different things. SMS has a 98% open rate and works for time-sensitive offers. Email is better for longer content and nurture sequences. Here's how to use each one strategically." },
  { title: "How to Set Up Geo-Fencing Around Your Competitors", slug: "competitor-geo-fencing-laundromat", cat: "Advertising", date: "Jan 20, 2026", read: "4 min", preview: "Competitor geo-fencing lets you show ads to people who visit rival laundromats. It's legal, it's effective, and it's one of the fastest ways to steal market share. Here's how we set it up for our clients." },
  { title: "Building a Customer Database From Zero: A Guide for New Laundromats", slug: "building-customer-database-new-laundromat", cat: "Strategy", date: "Jan 13, 2026", read: "7 min", preview: "Every marketing strategy depends on having customer data. If you're starting from scratch, here's exactly how to build a CRM database using your POS system, QR codes, review flows, and lead magnets." },
];

function PageHero() {
  return <section style={{ background: BG, padding: "130px 24px 60px", position: "relative" }}>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(43,127,255,0.07) 0%, transparent 60%)" }} />
    <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative" }}>
      <FI>
        <p style={{ color: B, fontWeight: 700, fontSize: 13, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 12 }}>Blog</p>
        <h1 style={{ fontSize: "clamp(32px,5vw,50px)", fontWeight: 800, color: "#fff", lineHeight: 1.08, letterSpacing: "-.035em", marginBottom: 16 }}>
          Laundromat marketing <span style={{ color: B }}>tips & strategies</span>
        </h1>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
          Proven strategies, real examples, and actionable advice to help you grow your laundromat. No fluff — just what works.
        </p>
      </FI>
    </div>
  </section>;
}

function FeaturedPost({ post }) {
  return <section style={{ background: BG, padding: "0 24px 60px" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <FI>
        <a href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
        <div style={{ background: "linear-gradient(135deg, rgba(43,127,255,0.06), rgba(43,127,255,0.02))", border: "1px solid rgba(43,127,255,0.15)", borderRadius: 20, overflow: "hidden", cursor: "pointer", transition: "border-color .2s" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(43,127,255,0.3)"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(43,127,255,0.15)"}>
          <div className="fg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            <div style={{ padding: "44px 40px" }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                <span style={{ background: "rgba(43,127,255,0.1)", color: B, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 6 }}>Featured</span>
                <span style={{ background: "rgba(43,127,255,0.1)", color: B, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 6 }}>{post.cat}</span>
              </div>
              <h2 style={{ fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 800, color: "#fff", lineHeight: 1.25, marginBottom: 14 }}>{post.title}</h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, marginBottom: 20 }}>{post.preview}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ color: B, fontSize: 14, fontWeight: 650 }}>Read article →</span>
                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}>{post.date} · {post.read} read</span>
              </div>
            </div>
            <div style={{ background: "rgba(43,127,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
              <svg width="100%" viewBox="0 0 320 220" fill="none" style={{ maxWidth: 320 }}>
                <rect x="10" y="10" width="300" height="200" rx="14" fill="rgba(7,9,13,0.6)" stroke="rgba(255,255,255,0.06)" />
                <circle cx="160" cy="90" r="55" fill="rgba(43,127,255,0.04)" stroke="rgba(43,127,255,0.1)" strokeDasharray="4 4" />
                <circle cx="160" cy="90" r="30" fill="rgba(43,127,255,0.06)" stroke="rgba(43,127,255,0.15)" />
                <circle cx="160" cy="90" r="6" fill={B} />
                <circle cx="185" cy="70" r="3.5" fill="#EF4444" opacity=".6" />
                <circle cx="135" cy="110" r="3.5" fill="#EF4444" opacity=".6" />
                <circle cx="195" cy="105" r="2.5" fill={B} opacity=".3" />
                <rect x="30" y="170" width="80" height="24" rx="6" fill="rgba(43,127,255,0.08)" />
                <text x="70" y="186" textAnchor="middle" fill={B} fontSize="10" fontWeight="700" fontFamily="sans-serif">3x ROI</text>
                <rect x="120" y="170" width="80" height="24" rx="6" fill="rgba(43,127,255,0.08)" />
                <text x="160" y="186" textAnchor="middle" fill={B} fontSize="10" fontWeight="700" fontFamily="sans-serif">5 mi</text>
                <rect x="210" y="170" width="80" height="24" rx="6" fill="rgba(43,127,255,0.08)" />
                <text x="250" y="186" textAnchor="middle" fill={B} fontSize="10" fontWeight="700" fontFamily="sans-serif">7 tips</text>
              </svg>
            </div>
          </div>
        </div>
        </a>
      </FI>
    </div>
  </section>;
}

function BlogGrid() {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? POSTS.filter(p => !p.featured) : POSTS.filter(p => !p.featured && p.cat === cat);

  return <section style={{ background: BG2, padding: "70px 24px" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <FI>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              background: cat === c ? B : "rgba(255,255,255,0.04)",
              border: `1px solid ${cat === c ? B : "rgba(255,255,255,0.08)"}`,
              color: cat === c ? "#fff" : "rgba(255,255,255,0.5)",
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all .2s",
            }}>
              {c}
            </button>
          ))}
        </div>
      </FI>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 18 }}>
        {filtered.map((post, i) => (
          <FI key={post.title} delay={i * 0.04}>
            <a href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16,
              overflow: "hidden",
              cursor: "pointer",
              transition: "border-color .2s",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(43,127,255,0.2)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}>
              <div style={{ height: 6, background: `linear-gradient(90deg, ${B}, rgba(43,127,255,0.2))` }} />
              <div style={{ padding: "24px 24px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                  <span style={{ background: "rgba(43,127,255,0.08)", color: B, fontSize: 10.5, fontWeight: 700, padding: "4px 10px", borderRadius: 5 }}>{post.cat}</span>
                  <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 10.5, fontWeight: 550, padding: "4px 0" }}>{post.read} read</span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 740, color: "#fff", lineHeight: 1.3, marginBottom: 12 }}>{post.title}</h3>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, flex: 1, marginBottom: 16 }}>{post.preview}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: B, fontSize: 13, fontWeight: 650 }}>Read article →</span>
                  <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 11 }}>{post.date}</span>
                </div>
              </div>
            </div>
            </a>
          </FI>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 15 }}>No posts in this category yet. Check back soon!</p>
        </div>
      )}
    </div>
  </section>;
}

function Newsletter() {
  return <section style={{ background: BG, padding: "80px 24px" }}>
    <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
      <FI>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "40px 36px" }}>
          <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>📬</span>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Get laundromat marketing tips in your inbox</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: 24, maxWidth: 420, margin: "0 auto 24px" }}>
            Join 500+ laundromat owners getting weekly tips on ads, AI tools, customer retention, and growth strategies. No spam — just real advice that works.
          </p>
          <div style={{ display: "flex", gap: 10, maxWidth: 420, margin: "0 auto" }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 9,
                padding: "12px 16px",
                color: "#fff",
                fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
              }}
            />
            <button style={{
              background: B,
              color: "#fff",
              border: "none",
              borderRadius: 9,
              padding: "12px 20px",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              whiteSpace: "nowrap",
              boxShadow: "0 2px 12px rgba(43,127,255,0.25)",
            }}>
              Subscribe
            </button>
          </div>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 12 }}>Free · Weekly · Unsubscribe anytime</p>
        </div>
      </FI>
    </div>
  </section>;
}

function Footer() {
  return <footer style={{ background: BG, padding: "36px 24px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 28 }} className="footer-inner">
      <div><Logo /><p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", maxWidth: 220, lineHeight: 1.5, marginTop: 10 }}>Built exclusively for laundromats.</p></div>
      <div style={{ display: "flex", gap: 36 }}>
        <div><p style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>Pages</p>{["Home", "Services", "About", "Blog", "Contact"].map(s => <a key={s} href={s==="Home"?"/":s==="Services"?"/services":s==="About"?"/about":s==="Blog"?"/blog":s==="Contact"?"/contact":"#"} style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none", marginBottom: 5 }}>{s}</a>)}</div>
        <div><p style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>Topics</p>{["Advertising", "Email & SMS", "AI Tools", "Reviews", "Strategy"].map(s => <a key={s} href={s==="Home"?"/":s==="Services"?"/services":s==="About"?"/about":s==="Blog"?"/blog":s==="Contact"?"/contact":"#"} style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none", marginBottom: 5 }}>{s}</a>)}</div>
      </div>
    </div>
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", marginTop: 20, paddingTop: 14, fontSize: 11, color: "rgba(255,255,255,0.2)" }}>© 2026 Fresh Leads Marketing</div>
  </footer>;
}

export default function BlogPage() {
  return <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: BG, minHeight: "100vh" }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
      *{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}body{background:#07090D;overflow-x:hidden}
      ::selection{background:rgba(43,127,255,0.25)}
      input::placeholder{color:rgba(255,255,255,0.2)}
      @media(max-width:768px){.dn{display:none!important}.fg{grid-template-columns:1fr!important}}
    `}</style>
    <Nav />
    <PageHero />
    <FeaturedPost post={POSTS[0]} />
    <BlogGrid />
    <Newsletter />
    <Footer />
  </div>;
}

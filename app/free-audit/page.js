"use client";
import { useState, useEffect, useRef } from "react";
import Script from "next/script";

const B = "#2B7FFF";
const B2 = "#5A9EFF";
const BG = "#07090D";
const BG2 = "#0C1017";
const BG3 = "#101520";

function useV(t = 0.1) {
  const r = useRef(null);
  const [v, s] = useState(false);
  useEffect(() => { const e = r.current; if (!e) return; const o = new IntersectionObserver(([x]) => { if (x.isIntersecting) { s(true); o.disconnect(); } }, { threshold: t }); o.observe(e); return () => o.disconnect(); }, [t]);
  return [r, v];
}
function FI({ children, delay = 0 }) {
  const [r, v] = useV();
  return (<div ref={r} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transition: `opacity .6s ease ${delay}s, transform .6s ease ${delay}s` }}>{children}</div>);
}
function Logo() { return (<a href="/"><img src="/logo.png" alt="Fresh Leads Marketing" style={{ height: 32, width: "auto", display: "block" }} /></a>); }

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
        Services <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </a>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", paddingTop: 10 }}>
          <div style={{ background: "rgba(30,35,48,0.98)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "8px 0", minWidth: 200, boxShadow: "0 8px 32px rgba(0,0,0,0.5)", backdropFilter: "blur(20px)" }}>
            {items.map(([label, href]) => (
              <a key={href} href={href} style={{ display: "block", padding: "9px 18px", color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: 13, fontWeight: 500, transition: "background .15s" }} onMouseEnter={e => { e.target.style.background = "rgba(43,127,255,0.15)"; e.target.style.color = "#fff"; }} onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "rgba(255,255,255,0.75)"; }}>{label}</a>
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
            const isSub = ["Geo-Fencing Ads", "AI Chatbot & Voice AI", "Email & SMS", "CRM Integration", "B2B Outreach", "Google Reviews"].includes(label);
            return (
              <a key={href + label} href={href} onClick={onClose} style={{
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
        <a href="#calendar-section" onClick={onClose} style={{ display: "block", background: B, color: "#fff", padding: "16px 0", borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: "none", textAlign: "center", marginTop: 28 }}>Get Your Free Audit</a>
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
            {["About", "Pricing", "Blog", "FAQ", "Contact"].map(l => <a key={l} href={l === "About" ? "/about" : l === "Pricing" ? "/pricing" : l === "Blog" ? "/blog" : l === "FAQ" ? "/faq" : "/contact"} style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13, fontWeight: 550 }}>{l}</a>)}
            <a href="#calendar-section" style={{ background: B, color: "#fff", padding: "9px 20px", borderRadius: 9, fontWeight: 650, fontSize: 13, textDecoration: "none" }}>Get Your Free Audit</a>
          </div>
          <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none", alignItems: "center", justifyContent: "center" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
        </div>
      </nav>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

/* ===== SECTION 1: HERO ===== */
function Hero() {
  return (
    <section style={{ background: BG, padding: "140px 24px 60px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(43,127,255,0.08) 0%, transparent 60%)" }} />
      <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", textAlign: "center" }}>
        <FI>
          <div style={{ display: "inline-block", background: "rgba(43,127,255,0.08)", border: "1px solid rgba(43,127,255,0.2)", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
            <span style={{ color: B, fontSize: 13, fontWeight: 600 }}>Laundromat Marketing Agency</span>
          </div>
        </FI>
        <FI delay={0.05}>
          <h1 style={{ fontSize: "clamp(32px, 5.5vw, 52px)", fontWeight: 800, color: "#fff", lineHeight: 1.08, letterSpacing: "-.03em", marginBottom: 18 }}>
            The Marketing System Built Exclusively for Laundromats
          </h1>
        </FI>
        <FI delay={0.1}>
          <p style={{ fontSize: "clamp(16px, 2vw, 19px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: 600, margin: "0 auto 32px" }}>
            We&apos;ll analyze your market, review your competition, and build a custom growth plan — completely free. No contracts, no commitment.
          </p>
        </FI>
        <FI delay={0.15}>
          <a href="#calendar-section" id="cta-hero" style={{ display: "inline-block", background: B, color: "#fff", padding: "16px 36px", borderRadius: 11, fontWeight: 700, fontSize: 16, textDecoration: "none", boxShadow: "0 4px 24px rgba(43,127,255,0.35)", transition: "transform .2s, box-shadow .2s" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 30px rgba(43,127,255,0.45)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(43,127,255,0.35)"; }}>
            Get Your Free Marketing Audit →
          </a>
        </FI>
        <FI delay={0.2}>
          <div className="lp-trust-bar" style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 48, flexWrap: "wrap" }}>
            {[["100+", "Laundromats Served"], ["Full", "Service Agency"], ["No", "Contracts Ever"]].map(([num, label], i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: B }}>{num}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 600, letterSpacing: ".03em", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </FI>
      </div>
    </section>
  );
}

/* ===== SECTION 2: PAIN POINTS ===== */
function PainPoints() {
  const pains = [
    { icon: "💸", title: "Wasting money on ads that don't work", desc: "You've tried boosting posts or running Google Ads, but the leads aren't coming in. You're spending money without knowing what's actually working." },
    { icon: "📉", title: "Competitors are showing up above you", desc: "Other laundromats in your area are getting the clicks, the calls, and the foot traffic — while your business stays invisible online." },
    { icon: "👋", title: "Losing customers you already had", desc: "People visited once or twice and never came back. You have no system to re-engage lapsed customers and bring them through the door again." },
    { icon: "🔁", title: "Answering the same questions all day", desc: "Hours, pricing, pickup availability — you or your staff are fielding repetitive calls and messages instead of running the business." },
  ];
  return (
    <section style={{ background: BG2, padding: "80px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FI>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <p style={{ color: B, fontWeight: 700, fontSize: 13, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 12 }}>Sound familiar?</p>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, color: "#fff" }}>The problems every laundromat owner faces</h2>
          </div>
        </FI>
        <div className="lp-pain-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {pains.map((p, i) => (
            <FI key={i} delay={i * 0.06}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 24px", height: "100%" }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{p.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8, lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
              </div>
            </FI>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== SECTION 3: SERVICES (THE GROWTH SYSTEM) ===== */
function GrowthSystem() {
  const services = [
    { icon: "📍", title: "Geo-Fencing Ads", desc: "Targeted Facebook & Google ad campaigns reaching customers near your laundromat and your competitors." },
    { icon: "📱", title: "Email & SMS Marketing", desc: "Automated re-engagement campaigns that bring back lapsed customers with the right offer at the right time." },
    { icon: "🤖", title: "AI Chatbot & Voice Bot", desc: "24/7 automated customer support on your website and phone — answers FAQs, captures leads, never misses a call." },
    { icon: "📊", title: "Custom CRM", desc: "Your POS data syncs automatically. See every customer, their visit history, and trigger campaigns by behavior." },
    { icon: "📧", title: "B2B Cold Outreach", desc: "We find hotels, gyms, and Airbnbs that need commercial laundry and reach out on your behalf." },
    { icon: "⭐", title: "Google Reviews", desc: "Automated review requests after every visit. More reviews means higher Maps ranking and more trust." },
  ];
  return (
    <section style={{ background: BG, padding: "80px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <FI>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <p style={{ color: B, fontWeight: 700, fontSize: 13, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 12 }}>Everything you need</p>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, color: "#fff", marginBottom: 12 }}>The Laundromat Growth System</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", maxWidth: 560, margin: "0 auto", lineHeight: 1.6 }}>Six proven marketing channels, fully managed. You focus on running your business — we handle the rest.</p>
          </div>
        </FI>
        <div className="lp-svc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {services.map((s, i) => (
            <FI key={i} delay={i * 0.05}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 24px", height: "100%", transition: "border-color .2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(43,127,255,0.25)"} onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            </FI>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== SECTION 4: PRICING ===== */
function Pricing() {
  const included = [
    "Geo-fencing ad campaigns (Facebook & Google)",
    "Email & SMS re-engagement automation",
    "AI chatbot & voice bot setup + management",
    "Custom CRM with POS integration",
    "B2B commercial outreach campaigns",
    "Google review automation",
    "Monthly performance reports",
    "Dedicated account manager",
  ];
  return (
    <section style={{ background: BG2, padding: "80px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <FI>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p style={{ color: B, fontWeight: 700, fontSize: 13, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 12 }}>Simple pricing</p>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, color: "#fff" }}>One plan. Everything included.</h2>
          </div>
        </FI>
        <FI delay={0.08}>
          <div style={{ background: "linear-gradient(135deg, rgba(43,127,255,0.06), rgba(43,127,255,0.02))", border: "1px solid rgba(43,127,255,0.2)", borderRadius: 20, padding: "clamp(32px,5vw,48px)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, background: B, color: "#fff", fontSize: 11, fontWeight: 700, padding: "6px 18px", borderBottomLeftRadius: 12, letterSpacing: ".04em" }}>MOST POPULAR</div>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 8 }}>All-in-One Growth Package</h3>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4 }}>
                <span style={{ fontSize: "clamp(40px,6vw,56px)", fontWeight: 800, color: "#fff" }}>$1,000</span>
                <span style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>/month</span>
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>$199/month per additional location · Ad spend separate ($300–$1,000/mo recommended)</p>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, marginBottom: 28 }}>
              <div className="lp-included-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" }}>
                {included.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ color: "#22C55E", fontSize: 14, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <a href="#calendar-section" id="cta-pricing" style={{ display: "inline-block", background: B, color: "#fff", padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 20px rgba(43,127,255,0.3)" }}>Get Your Free Audit →</a>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 12, fontStyle: "italic" }}>No contracts. Cancel anytime.</p>
            </div>
          </div>
        </FI>
      </div>
    </section>
  );
}

/* ===== SECTION 5: SOCIAL PROOF ===== */
function SocialProof() {
  const testimonials = [
    { quote: "Fresh Leads completely transformed how we get customers. Our Google Ads are finally working, and the AI chatbot handles most of our after-hours inquiries automatically.", name: "Laundromat Owner", location: "Atlanta, GA" },
    { quote: "Within 60 days we landed our first commercial contract with a hotel. The B2B outreach alone paid for the entire service. I wish I found these guys sooner.", name: "Laundromat Owner", location: "Tampa, FL" },
    { quote: "We went from barely getting any online leads to getting 40+ new customer inquiries per month. The geo-fencing ads are incredibly effective for our neighborhood.", name: "Laundromat Owner", location: "Phoenix, AZ" },
  ];
  return (
    <section style={{ background: BG, padding: "80px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <FI>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ color: B, fontWeight: 700, fontSize: 13, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 12 }}>Real results</p>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, color: "#fff", marginBottom: 10 }}>100+ Laundromats Trust Fresh Leads</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", maxWidth: 500, margin: "0 auto" }}>We don&apos;t work with restaurants, dentists, or gyms. Laundromats are all we do.</p>
          </div>
        </FI>
        <div className="lp-testimonial-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {testimonials.map((t, i) => (
            <FI key={i} delay={i * 0.06}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 24px", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                  {[...Array(5)].map((_, j) => <span key={j} style={{ color: "#FBBF24", fontSize: 14 }}>★</span>)}
                </div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, flex: 1, marginBottom: 16 }}>&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{t.location}</div>
                </div>
              </div>
            </FI>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== SECTION 6: HOW IT WORKS ===== */
function HowItWorks() {
  const steps = [
    { num: "01", title: "Book your free audit", desc: "Schedule a call below. Before we talk, we'll research your market, review your competitors, and prepare a custom analysis." },
    { num: "02", title: "Get a free marketing audit", desc: "On the call, we'll walk through a full audit of your current marketing, analyze your competition, and discuss how we can help grow your business." },
    { num: "03", title: "We launch & manage everything", desc: "Once you're on board, we set up all six marketing channels and manage them end to end. You focus on your business." },
    { num: "04", title: "See results & scale", desc: "Monthly reports show exactly what's working. As leads grow, we optimize and scale — adding locations when you're ready." },
  ];
  return (
    <section style={{ background: BG2, padding: "80px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FI>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <p style={{ color: B, fontWeight: 700, fontSize: 13, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 12 }}>Simple process</p>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, color: "#fff" }}>How it works</h2>
          </div>
        </FI>
        <div className="lp-steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {steps.map((s, i) => (
            <FI key={i} delay={i * 0.06}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 22px", height: "100%", position: "relative" }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: "rgba(43,127,255,0.15)", marginBottom: 12, fontFamily: "monospace" }}>{s.num}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8, lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            </FI>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== SECTION 7: FAQ ===== */
function FAQ() {
  const [open, setOpen] = useState(null);
  const Q = [
    ["What is the Laundromat Growth System?", "It's our all-in-one marketing package built exclusively for laundromats. It includes geo-fencing ads on Facebook and Google, email and SMS re-engagement, AI chatbot and voice bot, CRM integration with your POS, B2B cold outreach for commercial accounts, and Google review automation — all managed for you."],
    ["How much does it cost?", "$1,000 per month for the full package, with $199/month for each additional location. Ad spend is separate and we typically recommend $300 to $1,000 per month depending on your market. There are no setup fees and no long-term contracts."],
    ["Is ad spend included in the $1,000/month?", "No, ad spend is separate. The $1,000 covers full management of all six marketing channels. Your ad budget goes directly to Facebook and Google — we recommend starting with $300 to $1,000/month based on your market size and competition."],
    ["Do I need to sign a long-term contract?", "No. We work on a month-to-month basis. We believe in earning your business every month, not locking you in. That said, marketing is a long game — most clients see the best results after 60-90 days."],
    ["How fast will I see results?", "Most clients see their first leads within the first week of ads going live. Meaningful traction typically happens within 30 days. B2B commercial contracts usually come within 60 days. We provide monthly reports so you can track everything."],
    ["What POS systems do you integrate with?", "We integrate directly with Cents, LaundroWorks, and CCI. Customer data syncs automatically into your CRM. If you use a different system, we'll work with you to find an integration path."],
    ["What if I've tried marketing before and it didn't work?", "Most laundromat owners who come to us have tried generic marketing agencies or DIY ads that didn't deliver. The difference is we specialize exclusively in laundromats — we know the industry, the customer behavior, and the strategies that work for this specific business. That focus makes all the difference."],
  ];
  return (
    <section style={{ background: BG, padding: "80px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <FI>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 800, color: "#fff", marginBottom: 32, textAlign: "center" }}>Frequently asked questions</h2>
        </FI>
        {Q.map(([q, a], i) => (
          <FI key={i} delay={i * 0.03}>
            <div onClick={() => setOpen(open === i ? null : i)} style={{ background: open === i ? "rgba(43,127,255,0.04)" : "rgba(255,255,255,0.03)", border: `1px solid ${open === i ? "rgba(43,127,255,0.2)" : "rgba(255,255,255,0.06)"}`, borderRadius: 12, marginBottom: 8, cursor: "pointer" }}>
              <div style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14 }}>
                <h3 style={{ fontSize: 14, fontWeight: 640, color: "#fff", margin: 0 }}>{q}</h3>
                <span style={{ width: 24, height: 24, borderRadius: 6, background: open === i ? B : "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: open === i ? "#fff" : "rgba(255,255,255,0.3)", fontSize: 15 }}>
                  <span style={{ transform: open === i ? "rotate(45deg)" : "none", transition: "transform .2s", display: "block" }}>+</span>
                </span>
              </div>
              {open === i && <div style={{ padding: "0 18px 14px" }}><p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: 0 }}>{a}</p></div>}
            </div>
          </FI>
        ))}
      </div>
    </section>
  );
}

/* ===== SECTION 8: FINAL CTA + CALENDAR ===== */
function CalendarCTA() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return (
    <section id="calendar-section" style={{ background: BG2, padding: "80px 24px 60px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <FI>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "#fff", marginBottom: 12 }}>Ready to grow your laundromat?</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>Book your free marketing audit below. We&apos;ll research your market before the call so we can hit the ground running.</p>
          </div>
        </FI>
        <FI delay={0.08}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "4px", overflow: "hidden", minHeight: 700 }}>
            {mounted ? (
              <iframe
                src="https://link.freshleadsmarketing.com/widget/booking/fTHzSQY7rRoHcQPNC9NV"
                style={{ width: "100%", minHeight: 700, border: "none", overflow: "hidden", borderRadius: 12, background: "#fff" }}
                scrolling="no"
                id="fTHzSQY7rRoHcQPNC9NV_1774829605777"
                title="Book Your Free Marketing Audit"
              />
            ) : (
              <div style={{ width: "100%", minHeight: 700, borderRadius: 12, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ color: "#999", fontSize: 14 }}>Loading calendar...</div>
              </div>
            )}
          </div>
        </FI>
        <FI delay={0.12}>
          <div style={{ textAlign: "center", marginTop: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)" }}>Prefer to reach out directly?</p>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
              <a href="tel:808-736-1539" id="phone-cta" style={{ color: B, textDecoration: "none", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>📞 (808) 736-1539</a>
              <a href="mailto:info@freshleadsmarketing.com" style={{ color: B, textDecoration: "none", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>📧 info@freshleadsmarketing.com</a>
            </div>
          </div>
        </FI>
      </div>
      {mounted && (
        <Script
          src="https://link.freshleadsmarketing.com/js/form_embed.js"
          strategy="afterInteractive"
        />
      )}
    </section>
  );
}

/* ===== STICKY MOBILE CTA ===== */
function StickyMobileCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => { setShow(window.scrollY > 400); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="lp-sticky-cta" style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 90,
      background: "rgba(7,9,13,0.95)", backdropFilter: "blur(12px)",
      borderTop: "1px solid rgba(255,255,255,0.08)", padding: "12px 20px",
      transform: show ? "translateY(0)" : "translateY(100%)",
      transition: "transform .3s ease",
      display: "none",
    }}>
      <a href="#calendar-section" style={{ display: "block", background: B, color: "#fff", padding: "14px 0", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", textAlign: "center", boxShadow: "0 2px 16px rgba(43,127,255,0.3)" }}>Get Your Free Audit →</a>
    </div>
  );
}

/* ===== FOOTER (MINIMAL) ===== */
function Footer() {
  return (
    <footer style={{ background: BG, padding: "32px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <div style={{ marginBottom: 12 }}>
          <img src="/logo.png" alt="Fresh Leads Marketing" style={{ height: 24, width: "auto", display: "inline-block", opacity: 0.5 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 12 }}>
          <a href="/privacy" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", fontSize: 12 }}>Privacy Policy</a>
          <a href="/terms" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", fontSize: 12 }}>Terms of Service</a>
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.15)", margin: 0 }}>© 2026 Fresh Leads Marketing. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ===== PAGE EXPORT ===== */
export default function FreeAuditPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: BG, minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <PainPoints />
      <GrowthSystem />
      <Pricing />
      <HowItWorks />
      <FAQ />
      <CalendarCTA />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

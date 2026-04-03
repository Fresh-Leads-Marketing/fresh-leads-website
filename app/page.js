"use client";
import { useState, useEffect, useRef } from "react";

const B = "#2B7FFF";
const B2 = "#5A9EFF";
const BG = "#07090D";
const BG2 = "#0C1017";
const BG3 = "#101520";

function useV(t = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: t }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [t]);
  return [ref, vis];
}

function Fade({ children, delay = 0, className = "" }) {
  const [ref, vis] = useV();
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(20px)",
      transition: `opacity .5s ease ${delay}s, transform .5s ease ${delay}s`
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
          {links.map(([label, href]) => (
            <a key={href+label} href={href} onClick={onClose} style={{
              color: label.startsWith("Geo") || label.startsWith("AI C") || label.startsWith("Email") || label.startsWith("CRM") || label.startsWith("B2B") || label.startsWith("Google R") ? "rgba(255,255,255,0.4)" : "#fff",
              textDecoration: "none",
              fontSize: label.startsWith("Geo") || label.startsWith("AI C") || label.startsWith("Email") || label.startsWith("CRM") || label.startsWith("B2B") || label.startsWith("Google R") ? 15 : 20,
              fontWeight: label.startsWith("Geo") || label.startsWith("AI C") || label.startsWith("Email") || label.startsWith("CRM") || label.startsWith("B2B") || label.startsWith("Google R") ? 500 : 700,
              padding: label.startsWith("Geo") || label.startsWith("AI C") || label.startsWith("Email") || label.startsWith("CRM") || label.startsWith("B2B") || label.startsWith("Google R") ? "6px 0 6px 20px" : "10px 0",
              borderBottom: label === "Google Reviews" || label === "Contact" ? "none" : label === "Services" ? "none" : "1px solid rgba(255,255,255,0.05)",
            }}>{label}</a>
          ))}
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
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(7,9,13,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.08)"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <Logo />
          <div style={{ display: "flex", alignItems: "center", gap: 24 }} className="dn">
            <a href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13, fontWeight: 550 }}>Home</a>
            <ServicesDropdown />
            {["About", "Pricing", "Blog", "FAQ", "Contact"].map(l => (
              <a key={l} href={l==="About"?"/about":l==="Pricing"?"/pricing":l==="Blog"?"/blog":l==="FAQ"?"/faq":"/contact"} style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13, fontWeight: 550 }}>{l}</a>
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

function Hero() {
  return (
    <section style={{ background: BG, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 65% 30%, rgba(43,127,255,0.07) 0%, transparent 60%)" }} />
      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "120px 24px 70px" }}>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
          <div>
            <Fade>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(43,127,255,0.08)", border: "1px solid rgba(43,127,255,0.15)", borderRadius: 50, padding: "5px 14px 5px 10px", marginBottom: 22 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: B }} />
                <span style={{ color: B2, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>Laundromat marketing agency</span>
              </div>
            </Fade>
            <Fade delay={.05}>
              <h1 style={{ fontSize: "clamp(34px,5vw,58px)", fontWeight: 800, color: "#fff", lineHeight: 1.06, letterSpacing: "-0.035em", marginBottom: 18 }}>
                Dominate your local <span style={{ color: B }}>laundry market.</span>
              </h1>
            </Fade>
            <Fade delay={.1}>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 460, lineHeight: 1.65, marginBottom: 28 }}>
                We help laundromats across the U.S. Grow with geo-fenced ads, AI-powered tools, email & SMS marketing, and commercial outreach. Everything is managed for you.
              </p>
            </Fade>
            <Fade delay={.15}>
              <div className="hero-cta" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="/contact" style={{ background: B, color: "#fff", padding: "14px 26px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 2px 20px rgba(43,127,255,0.3)" }}>Get a Free Marketing Audit →</a>
                <a href="/services" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", padding: "13px 22px", borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>See Our Services</a>
              </div>
            </Fade>
            <Fade delay={.2}>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 20 }}>
                {["Laundromats only","No contracts","Ads live in 48hrs","100+ laundromats served"].map((t,i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: "#22C55E", fontWeight: 700, fontSize: 13 }}>✓</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 550 }}>{t}</span>
                  </div>
                ))}
              </div>
            </Fade>
          </div>
          <Fade delay={.12} className="hero-graphic">
            <div style={{ position: "relative" }}>
              <div style={{ background: BG3, border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "28px 24px", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(43,127,255,0.08)", border: "1px solid rgba(43,127,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🧺</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Sunshine Laundry — Dashboard</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Google Ads + Facebook Ads + CRM</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
                  {[["247","New Leads"],["3.4x","ROI"],["$4.12","Cost/Lead"]].map(([v,l],i) => (
                    <div key={i} style={{ background: "rgba(43,127,255,0.05)", border: "1px solid rgba(43,127,255,0.1)", borderRadius: 10, padding: "14px 12px", textAlign: "center" }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: B }}>{v}</div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2, fontWeight: 550 }}>{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[["🔍","Google Ads","+38% leads"],["📱","Facebook & Instagram","+52% reach"],["📍","Geo-Fencing","1,840 visits"],["🤖","AI Chatbot","89 captured"]].map(([icon,name,stat],i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "10px 14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 16 }}>{icon}</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>{name}</span>
                      </div>
                      <span style={{ fontSize: 13, color: "#22C55E", fontWeight: 700 }}>{stat}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Floating badges */}
              <div className="hero-float-badge" style={{ position: "absolute", top: -10, right: -20, background: BG3, border: "1px solid rgba(43,127,255,0.15)", borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
                <span style={{ fontSize: 16 }}>⭐</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>4.9 Google Rating</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>+32 new reviews</div>
                </div>
              </div>
              <div className="hero-float-badge" style={{ position: "absolute", bottom: 10, left: -30, background: BG3, border: "1px solid rgba(43,127,255,0.15)", borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
                <span style={{ fontSize: 16 }}>📧</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>12 B2B Leads</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>Hotels & Airbnbs</div>
                </div>
              </div>
            </div>
          </Fade>
        </div>
        <Fade delay={.25}>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, marginTop: 50, background: "rgba(255,255,255,0.06)", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
            {[["100+","Laundromats served"],["3x","Avg. Client ROI"],["6","Integrated services"],["24/7","AI-powered support"]].map(([n,l],i) => (
              <div key={i} style={{ background: BG, padding: "18px 14px", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: B }}>{n}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 550, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}

function NicheProof() {
  const cards = [
    { icon: "🧺", title: "Laundromat-Only Expertise", desc: "Every ad template, email sequence, and targeting strategy has been tested across 100+ laundromat clients. We already know what works for your industry." },
    { icon: "📍", title: "Geo-Fence Your Competitors", desc: "We draw virtual boundaries around competitor laundromats, apartment complexes, and high-traffic zones to capture customers in your area — not the whole city." },
    { icon: "🔄", title: "Re-Engage Lapsed Customers", desc: "Your POS data syncs to our CRM. We automatically identify customers who stopped coming and bring them back with targeted email and SMS campaigns." },
    { icon: "🤖", title: "AI Trained on Laundry", desc: "Our chatbots and voice AI are trained specifically on laundromat FAQs — pricing, hours, machine availability, wash-dry-fold services, and commercial accounts." },
    { icon: "🏨", title: "Commercial Account Outreach", desc: "We prospect hotels, gyms, Airbnbs, and salons in your area through cold email outreach — opening up high-volume B2B revenue streams for your laundromat." },
    { icon: "⭐", title: "Dominate Google Maps", desc: "Automated review requests after every visit plus AI-powered review responses. More reviews means higher Google Maps rankings and more walk-in traffic." },
  ];
  return (
    <section style={{ background: BG2, padding: "90px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Fade>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ color: B, fontWeight: 700, fontSize: 12, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8 }}>Built for laundromats. Nothing else.</p>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: 12 }}>Why laundromat owners choose Fresh Leads</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>We don't do restaurants, dentists, or plumbers. Every strategy, template, and AI tool we build is designed for one industry — yours.</p>
          </div>
        </Fade>
        <div className="niche-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {cards.map((c, i) => (
            <Fade key={i} delay={i * 0.04}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "28px 24px", textAlign: "center", transition: "border-color 0.2s" }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, margin: "0 auto 16px", background: "rgba(43,127,255,0.06)", border: "1px solid rgba(43,127,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{c.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 720, color: "#fff", marginBottom: 8 }}>{c.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

const SVC = [
  ["📍","Geo-Fencing Ads","Facebook & Google","Hyper-targeted ad campaigns reaching customers near your laundromat and competitors. Full management of design, copy, targeting, A/B testing, and conversion tracking."],
  ["📱","Email & SMS Marketing","Re-engagement","Automated sequences for new customers, lapsed visitors, and promotional offers. All managed for you."],
  ["🤖","AI Chatbot & Voice Bot","24/7 support","Custom AI chatbot on your website and social plus an AI voice agent answering calls. Capture leads, handle FAQs, and answer customer questions around the clock."],
  ["📊","Custom CRM","Customer intelligence","Your POS customer data syncs automatically into one dashboard via API. See who's visiting, who's lapsed, and trigger re-engagement campaigns that bring customers back."],
  ["📧","B2B Cold Outreach","Commercial leads","We build prospect lists, write sequences, and send emails targeting hotels, gyms, and salons. Replies go straight to your inbox. Clients get 5-15 qualified commercial leads per month."],
  ["⭐","Google Reviews","Reputation","Systematic review generation via automated SMS requests. Higher review counts mean higher Maps rankings and more walk-ins without extra ad spend."],
];

function Services() {
  return (
    <section id="services" style={{ background: BG, padding: "90px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Fade>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ color: B, fontWeight: 700, fontSize: 12, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8 }}>What we do</p>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: 12 }}>Everything your laundromat needs to grow</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 560, margin: "0 auto", lineHeight: 1.6 }}>A complete marketing stack purpose-built for laundromats.</p>
          </div>
        </Fade>
        <div className="svc-grid" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {SVC.map(([icon,title,sub,desc], i) => (
            <Fade key={i} delay={i * .04}>
              <div style={{ display: "flex", alignItems: "center", gap: 28, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "28px 28px", flexDirection: i % 2 === 0 ? "row" : "row-reverse" }}>
                <div style={{ flexShrink: 0, width: 72, height: 72, borderRadius: 16, background: "rgba(43,127,255,0.06)", border: "1px solid rgba(43,127,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 32 }}>{icon}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 720, color: "#fff", margin: 0 }}>{title}</h3>
                    <span style={{ fontSize: 11, color: B2, fontWeight: 600, background: "rgba(43,127,255,0.08)", padding: "2px 10px", borderRadius: 20 }}>{sub}</span>
                  </div>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: "6px 0 0" }}>{desc}</p>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const features = [
    { category: "Paid Ads (Done-For-You)", items: ["Google Ads management", "Facebook & Instagram Ads management", "Campaign strategy, setup, and optimization", "Ad creative design and copywriting"] },
    { category: "Lead Follow-Up & CRM", items: ["Instant email & SMS follow-up for new leads", "Centralized lead tracking", "No missed leads, no manual follow-ups"] },
    { category: "Customer Re-Engagement", items: ["Automated identification of lapsed customers", "Email + SMS re-engagement campaigns to drive repeat visits", "Requires POS API integration"] },
    { category: "New Customer Welcome Automation", items: ["Automatic customer capture via POS API", "Welcome email & SMS sequence", "Automated Google review requests"] },
    { category: "AI Automation & Chatbots", items: ["Website, SMS, and Facebook Messenger chatbots", "AI-powered Google review responses", "Trained on your business"] },
    { category: "B2B Cold Email Outreach", items: ["Dedicated sending domain setup", "Email warming and deliverability", "Lead replies go to your inbox"] }
  ];

  return (
    <section id="pricing" style={{ background: BG2, padding: "90px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Fade>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: 12 }}>One plan. Everything included.</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>No hidden fees. No long-term contracts. Just a complete marketing system that grows your laundromat.</p>
          </div>
        </Fade>

        <Fade delay={0.05}>
          <div style={{ maxWidth: 600, margin: "0 auto 50px", background: BG, border: "1.5px solid rgba(43,127,255,0.3)", borderRadius: 18, padding: "40px 36px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(43,127,255,0.1) 0%, rgba(43,127,255,0.02) 100%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h3 style={{ fontSize: 22, fontWeight: 750, color: "#fff", marginBottom: 16 }}>All-In-One Growth Package</h3>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: "clamp(42px,6vw,54px)", fontWeight: 900, color: B, lineHeight: 1 }}>$1,000</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>/month</div>
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 20, fontWeight: 550 }}>+$199/month per additional location</div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 24 }}>Done-for-you marketing designed to bring in new customers, re-engage past customers, and automate follow-up.</p>
              <a href="/contact" style={{ display: "inline-block", background: B, color: "#fff", padding: "13px 26px", borderRadius: 9, fontWeight: 700, fontSize: 14, textDecoration: "none", boxShadow: "0 4px 20px rgba(43,127,255,0.3)" }}>Free Marketing Audit →</a>
            </div>
          </div>
        </Fade>

        <Fade delay={0.1}>
          <div style={{ marginBottom: 40 }}>
            <div className="pricing-features" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
              {features.map((f, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "20px 18px" }}>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{f.category}</h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {f.items.map((item, j) => (
                      <li key={j} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: j < f.items.length - 1 ? 8 : 0, display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <span style={{ color: B, flexShrink: 0, marginTop: 2 }}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Fade>

        <Fade delay={0.15}>
          <div style={{ background: "rgba(43,127,255,0.06)", border: "1px solid rgba(43,127,255,0.12)", borderRadius: 12, padding: "24px 20px", textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6 }}>
              <span style={{ fontWeight: 600, color: "#fff" }}>$1,000/month</span> first location. <span style={{ fontWeight: 600, color: "#fff" }}>$199/month</span> each additional. All managed in one system.
            </p>
          </div>
        </Fade>
      </div>
    </section>
  );
}

function Process() {
  const steps = [["01","Discovery Call","We hop on a free 30-minute call to learn about your laundromat, your market, and your goals. No sales pitch. We'll research your area beforehand so we come prepared with insights about your competition and opportunities."],["02","Custom Strategy","Based on your market, competition, and budget, we build a tailored growth plan. You'll know exactly which services will have the biggest impact and what results to expect in months 1, 3, and 6."],["03","Launch & Optimize","We handle everything from ad creative to email copy to chatbot setup. Campaigns go live, and we optimize weekly based on real performance data. You don't lift a finger."],["04","Report & Scale","You get clear monthly reports showing exactly what's working. No vanity metrics. As we find winning strategies, we scale them to maximize your ROI and keep growing your customer base."]];
  return (
    <section style={{ background: BG, padding: "90px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Fade><div style={{ textAlign: "center", marginBottom: 44 }}>
          <p style={{ color: B, fontWeight: 700, fontSize: 12, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8 }}>How it works</p>
          <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: "#fff" }}>From first call to more customers</h2>
        </div></Fade>
        <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {steps.map(([n,t,d],i) => (
            <Fade key={i} delay={i*.06}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "24px 20px", position: "relative", overflow: "hidden", height: "100%" }}>
                <div style={{ position: "absolute", top: -4, right: 4, fontSize: 52, fontWeight: 900, color: B, opacity: .04 }}>{n}</div>
                <div style={{ width: 32, height: 32, borderRadius: 8, marginBottom: 12, background: "rgba(43,127,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: B, fontWeight: 800, fontSize: 12 }}>{n}</div>
                <h3 style={{ fontSize: 15, fontWeight: 720, color: "#fff", marginBottom: 6 }}>{t}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{d}</p>
              </div>
            </Fade>
          ))}
        </div>
        <div style={{ marginTop: 44, textAlign: "center" }}>
          <Fade delay={0.24}>
            <a href="/contact" style={{ display: "inline-block", background: B, color: "#fff", padding: "14px 26px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 2px 20px rgba(43,127,255,0.3)" }}>Free Marketing Audit →</a>
          </Fade>
        </div>
      </div>
    </section>
  );
}


function About() {
  return (
    <section id="about" style={{ background: BG, padding: "90px 24px" }}>
      <div className="about-section-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48, alignItems: "center" }}>
        <Fade>
          <div>
            <p style={{ color: B, fontWeight: 700, fontSize: 12, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8 }}>About Fresh Leads</p>
            <h2 style={{ fontSize: "clamp(26px,3.5vw,36px)", fontWeight: 800, color: "#fff", marginBottom: 14, lineHeight: 1.15 }}>Exclusively for laundromats. Nothing else.</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 12 }}>We built Fresh Leads to serve laundromats and only laundromats. Every strategy, every AI tool, every template is designed specifically for the laundry business. No generic playbooks. No one-size-fits-all nonsense.</p>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 22 }}>Across 100+ laundromat clients, we've learned what actually works to drive growth, build loyalty, and maximize revenue for your business.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 28 }}>
              {["Laundromat-only focus","Full-service agency","AI-powered tools","Real results"].map((t,i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: B, fontSize: 14 }}>✓</span>
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 580 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </Fade>
        <Fade delay={.1}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "32px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 18 }}>📍</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 750, color: "#fff" }}>Honolulu, Hawaii</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Island-based, nationwide service</div>
              </div>
            </div>
            <div style={{ background: "rgba(43,127,255,0.04)", border: "1px solid rgba(43,127,255,0.08)", borderRadius: 10, padding: "16px 18px", marginBottom: 20 }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, margin: 0 }}>Based out of Honolulu, Hawaii. If you ever visit, let's connect in person and you can write off the trip. Just saying.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, textAlign: "center" }}>
              {[["100+","Laundromats served"],["100%","Laundromat focus"],["3x","Avg. Client ROI"]].map(([n,l],i) => (
                <div key={i}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: B }}>{n}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </Fade>
      </div>
      <div style={{ marginTop: 50, textAlign: "center" }}>
        <Fade delay={0.2}>
          <a href="/about" style={{ display: "inline-block", background: B, color: "#fff", padding: "14px 26px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 2px 20px rgba(43,127,255,0.3)" }}>Learn More About Us →</a>
        </Fade>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  const qs = [
    ["What is the Laundromat Growth System?","The Laundromat Growth System is our all-in-one marketing package built specifically for laundromats. It includes everything you need to grow: geo-fencing ads on Facebook and Google, email and SMS automation, an AI chatbot and voice bot, a custom CRM synced to your POS, B2B commercial outreach, and Google review generation. Everything works together as one system so your marketing compounds instead of operating in silos."],
    ["Why can't I just pick individual services?","We don't offer à la carte services because isolated tactics don't work. Running ads without email follow-up means you're paying for leads that never come back. Getting reviews without a CRM means you can't track who's responding. The Laundromat Growth System is designed so every piece feeds the others. Ads bring in new customers, the CRM segments them, email and SMS bring them back, the chatbot captures leads 24/7, and reviews build your reputation. That's how you get compounding growth instead of one-off results."],
    ["How do geo-fencing ads work for laundromats?","We draw virtual boundaries around your laundromat, your competitors' locations, apartment complexes, and high-traffic areas. When someone enters that zone with their phone, they become eligible to see your ads on Facebook, Instagram, and Google. This means you're reaching people who are physically near your business, not blasting ads to an entire city. Our clients typically see a 3-4x return on ad spend with cost per lead between $4-8."],
    ["How fast will I see results?","Most clients see their first leads within the first 1 to 2 weeks of launching ads. Google Ads can generate calls and direction requests within days since you're targeting people actively searching for a laundromat. Facebook and Instagram typically take 2 to 4 weeks to build momentum. By month 2 to 3, campaigns are fully optimized and that's when ROI really starts to compound."],
    ["How much does Fresh Leads Marketing cost?","Our All-In-One Growth Package is $1,000 per month for your first location. If you have multiple locations, each additional location is $199 per month. That price includes everything: Google Ads management, Facebook and Instagram Ads management, email and SMS marketing, CRM, AI chatbots, Google review management with AI auto-responses, and B2B cold email outreach. There are no hidden fees."],
    ["Do I need to be tech-savvy to use this?","Not at all. We handle everything: ad creation, campaign management, email copywriting, chatbot training, CRM setup, review automation, and reporting. You'll get a dashboard where you can see your results anytime, but you don't need to touch anything. We send you clear, simple reports and hop on calls to walk through performance whenever you want."],
    ["What if I've tried marketing before and it didn't work?","This is the most common thing we hear. Almost every time, the issue is the same: the previous agency ran generic campaigns that weren't built for laundromats. They targeted too broad, used stock creative, and had no understanding of the laundry industry. We're different because we only work with laundromats. Every ad template, email sequence, and targeting strategy has been tested across 100+ laundromat clients. We already know what works."],
    ["How do you track and report results?","You get a real-time dashboard plus detailed monthly reports covering every channel: ad performance, email open rates, SMS engagement, review growth, lead counts, and revenue attribution. We tie everything back to actual dollars so you know exactly what your marketing investment is generating. No vanity metrics, no fluff. Just the numbers that matter to your bottom line."],
    ["What POS systems do you integrate with?","Our CRM integrates directly with Cents, LaundroWorks, and CCI. Customer data syncs automatically so you never need to manually enter contacts. If you use a different system, we'll work with you to find an integration path or set up manual imports."],
    ["Can this work for a brand new laundromat?","Absolutely. New laundromats are actually some of our best success stories because there's zero competition for your brand name, no bad habits to undo, and everything is set up correctly from day one. We'll focus on building awareness through geo-fencing ads, capturing every lead with the chatbot, and generating reviews fast to build your Google presence."],
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": qs.map(([q, a]) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": a
      }
    }))
  };

  return (
    <section id="faq" style={{ background: BG2, padding: "90px 24px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Fade><div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ color: B, fontWeight: 700, fontSize: 12, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8 }}>FAQ</p>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,36px)", fontWeight: 800, color: "#fff" }}>Your questions, answered</h2>
        </div></Fade>
        <div className="faqg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {qs.map(([q,a],i) => (
            <Fade key={i} delay={i*.03}>
              <div onClick={() => setOpen(open === i ? null : i)} style={{
                background: open === i ? "rgba(43,127,255,0.04)" : "rgba(255,255,255,0.03)",
                border: "1px solid " + (open === i ? "rgba(43,127,255,0.15)" : "rgba(255,255,255,0.07)"),
                borderRadius: 12, marginBottom: 6, cursor: "pointer", transition: "all .2s"
              }}>
                <div style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 640, color: "#fff" }}>{q}</span>
                  <span style={{
                    width: 24, height: 24, borderRadius: 6,
                    background: open === i ? B : "rgba(255,255,255,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: open === i ? "#fff" : "rgba(255,255,255,0.3)",
                    fontSize: 14, flexShrink: 0, transition: "all .2s"
                  }}>
                    <span style={{ transform: open === i ? "rotate(45deg)" : "none", transition: "transform .2s", display: "block" }}>+</span>
                  </span>
                </div>
                {open === i && (
                  <div style={{ padding: "0 18px 14px" }}>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, margin: 0 }}>{a}</p>
                  </div>
                )}
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" style={{ background: BG, padding: "90px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <Fade>
          <div style={{ background: "linear-gradient(135deg, rgba(43,127,255,0.1), rgba(43,127,255,0.03))", border: "1px solid rgba(43,127,255,0.15)", borderRadius: 20, padding: "clamp(36px,5vw,60px) clamp(24px,4vw,44px)", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 800, color: "#fff", marginBottom: 12 }}>Ready to grow your laundromat?</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", maxWidth: 420, margin: "0 auto 22px", lineHeight: 1.6 }}>Free discovery call. We'll audit your market and build a custom growth plan.</p>
            <a href="/contact" style={{ display: "inline-block", background: B, color: "#fff", padding: "14px 30px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 20px rgba(43,127,255,0.3)" }}>Free Marketing Audit →</a>
          </div>
        </Fade>
      </div>
    </section>
  );
}

function Footer() {
  return (
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
  );
}

export default function App() {
  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: BG, minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <NicheProof />
      <Services />

      <Process />
      <About />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

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
              borderBottom: label === "Contact" ? "none" : label === "Services" ? "none" : "1px solid rgba(255,255,255,0.05)",
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
        <Fade>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <h1 style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.035em", marginBottom: 12, lineHeight: 1.1 }}>
              Simple, transparent pricing
            </h1>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", maxWidth: 600, margin: "0 auto 12px", lineHeight: 1.6 }}>
              Choose the plan that fits your laundromat. No hidden fees.
            </p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginBottom: 0 }}>
              Marketing built exclusively for laundromats.
            </p>
          </div>
        </Fade>
      </div>
    </section>
  );
}

function PricingCards() {
  const googleAdsFeatures = [
    "Full Google Ads account management",
    "Campaign strategy, setup & optimization",
    "Ad creative design and copywriting",
    "Geo-fencing ad campaigns",
    "Ongoing account optimizations",
    "Detailed analytics dashboard",
    "Monthly strategy call",
    "Dedicated account manager",
  ];
  const allInOneFeatures = [
    "Everything in Google Ads Package",
    "Facebook & Instagram Ads management",
    "CRM setup with automated lead follow-up",
    "Email & SMS marketing automation",
    "Customer re-engagement campaigns",
    "AI chatbot & review automation",
    "Client portal for team communication & updates",
    "B2B cold email outreach",
    "Monthly strategy call",
    "Dedicated account manager",
  ];
  return (
    <section style={{ background: BG2, padding: "70px 24px" }}>
      <div className="pricing-cards" style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "stretch" }}>
        {/* Google Ads Package */}
        <Fade delay={0}>
          <div style={{ background: BG, border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: "44px 36px", display: "flex", flexDirection: "column", height: "100%", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 100%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column" }}>
              <h2 style={{ fontSize: 21, fontWeight: 750, color: "#fff", marginBottom: 20 }}>Google Ads Package</h2>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: "clamp(40px,6vw,52px)", fontWeight: 900, color: B, lineHeight: 1 }}>$500</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>/month</div>
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 20, fontWeight: 550 }}>+$99/mo per additional location</div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 24 }}>Professional Google Ads management with full reporting and a dedicated strategist to grow your laundromat.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                {googleAdsFeatures.map((f, i) => (
                  <li key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 10, display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <span style={{ color: "#22C55E", flexShrink: 0, marginTop: 1, fontWeight: 700 }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="/contact" style={{ display: "block", textAlign: "center", background: "transparent", color: B, padding: "13px 24px", borderRadius: 9, fontWeight: 700, fontSize: 14, textDecoration: "none", border: "1.5px solid " + B, transition: "all .2s" }} onMouseEnter={e => { e.currentTarget.style.background = B; e.currentTarget.style.color = "#fff"; }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = B; }}>Get Started →</a>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: "10px 0 0", textAlign: "center" }}>No contracts. Cancel anytime.</p>
            </div>
          </div>
        </Fade>

        {/* All-In-One Growth Package */}
        <Fade delay={0.08}>
          <div style={{ background: BG, border: "1.5px solid rgba(43,127,255,0.35)", borderRadius: 18, padding: "44px 36px", display: "flex", flexDirection: "column", height: "100%", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(43,127,255,0.1) 0%, rgba(43,127,255,0.02) 100%)", pointerEvents: "none" }} />
            {/* Popular badge */}
            <div style={{ position: "absolute", top: 16, right: 16, background: B, color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, letterSpacing: "0.02em", zIndex: 2 }}>MOST POPULAR</div>
            <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column" }}>
              <h2 style={{ fontSize: 21, fontWeight: 750, color: "#fff", marginBottom: 20 }}>All-In-One Growth Package</h2>
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: "clamp(40px,6vw,52px)", fontWeight: 900, color: B, lineHeight: 1 }}>$1,000</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>/month</div>
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 20, fontWeight: 550 }}>+$199/mo per additional location</div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 24 }}>Done-for-you marketing designed to bring in new customers, re-engage past customers, and automate follow-up.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                {allInOneFeatures.map((f, i) => (
                  <li key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 10, display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <span style={{ color: "#22C55E", flexShrink: 0, marginTop: 1, fontWeight: 700 }}>✓</span>
                    <span style={{ fontWeight: i === 0 ? 600 : 400, color: i === 0 ? "rgba(255,255,255,0.7)" : undefined }}>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="/contact" style={{ display: "block", textAlign: "center", background: B, color: "#fff", padding: "14px 24px", borderRadius: 9, fontWeight: 700, fontSize: 14, textDecoration: "none", boxShadow: "0 4px 20px rgba(43,127,255,0.3)" }}>Free Marketing Audit →</a>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: "10px 0 0", textAlign: "center" }}>No contracts. Cancel anytime.</p>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

function WhyGoAllInOne() {
  const benefits = [
    {
      icon: "🔄",
      title: "Turn One-Time Visitors Into Regulars",
      desc: "Email & SMS automation and re-engagement campaigns keep your customers coming back — not just showing up once from an ad."
    },
    {
      icon: "🤖",
      title: "Never Miss a Lead Again",
      desc: "AI chatbots respond instantly on your website, SMS, and Facebook. Your CRM follows up automatically so no lead slips through the cracks."
    },
    {
      icon: "📱",
      title: "Ads on Every Platform",
      desc: "Google Ads brings in high-intent searchers. Facebook & Instagram build awareness and reach new audiences. Together, they cover all your bases."
    },
    {
      icon: "⭐",
      title: "Build a 5-Star Reputation on Autopilot",
      desc: "Automated review requests after every visit. AI-powered review responses. Your Google profile stays active without you lifting a finger."
    },
    {
      icon: "📧",
      title: "Reach Commercial Clients Directly",
      desc: "B2B cold email outreach targets hotels, gyms, Airbnbs, and salons in your area — opening up high-volume commercial accounts."
    },
    {
      icon: "📊",
      title: "One Team, One Dashboard, Full Visibility",
      desc: "Your dedicated client portal gives you real-time access to performance data, team communication, and campaign updates — all in one place."
    }
  ];

  return (
    <section style={{ background: BG, padding: "90px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Fade>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ display: "inline-block", background: "rgba(43,127,255,0.1)", border: "1px solid rgba(43,127,255,0.2)", borderRadius: 20, padding: "6px 16px", fontSize: 12, fontWeight: 650, color: B, marginBottom: 16, letterSpacing: "0.03em" }}>WHY UPGRADE?</div>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: 12 }}>Google Ads Is Just the Beginning</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 640, margin: "0 auto", lineHeight: 1.7 }}>
              Ads bring people in — but the All-In-One Growth Package turns them into loyal, repeat customers. Here's what you unlock when you go full-service.
            </p>
          </div>
        </Fade>

        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 40 }}>
          {benefits.map((b, i) => (
            <Fade key={i} delay={i * 0.04}>
              <div style={{ background: "rgba(43,127,255,0.04)", border: "1px solid rgba(43,127,255,0.1)", borderRadius: 14, padding: "28px 24px", display: "flex", flexDirection: "column", height: "100%" }}>
                <span style={{ fontSize: 28, marginBottom: 12 }}>{b.icon}</span>
                <h3 style={{ fontSize: 16, fontWeight: 720, color: "#fff", marginBottom: 10 }}>{b.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>{b.desc}</p>
              </div>
            </Fade>
          ))}
        </div>

        <Fade delay={0.3}>
          <div style={{ textAlign: "center", marginTop: 44 }}>
            <a href="/contact" style={{ display: "inline-block", background: B, color: "#fff", padding: "14px 30px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 20px rgba(43,127,255,0.3)" }}>Get the Full Package →</a>
          </div>
        </Fade>
      </div>
    </section>
  );
}

function MultiLocation() {
  return (
    <section style={{ background: BG2, padding: "70px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Fade>
          <div style={{ background: "rgba(43,127,255,0.06)", border: "1px solid rgba(43,127,255,0.12)", borderRadius: 14, padding: "36px 32px", textAlign: "center" }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Multiple Locations?</h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 0, lineHeight: 1.7 }}>
              <span style={{ fontWeight: 600, color: "#fff" }}>Google Ads Package:</span> $500/mo first location, <span style={{ fontWeight: 600, color: "#fff" }}>+$99/mo</span> per additional location.<br />
              <span style={{ fontWeight: 600, color: "#fff" }}>All-In-One Growth:</span> $1,000/mo first location, <span style={{ fontWeight: 600, color: "#fff" }}>+$199/mo</span> per additional location.
            </p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginTop: 12, marginBottom: 0 }}>All locations managed in one centralized system for reporting, automation, and support.</p>
          </div>
        </Fade>
      </div>
    </section>
  );
}

function PricingFAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    {
      q: "Is ad spend included?",
      a: "No. Our management fees ($500 or $1,000/month) are separate from ad spend. Ad spend goes directly to Google, Facebook, and Instagram. Most laundromats start with $300 to $1,000 per month in ad spend, and we increase from there based on data."
    },
    {
      q: "Do I need to sign a long-term contract?",
      a: "No. Month-to-month. No long-term commitments. We believe our results should earn your business every month."
    },
    {
      q: "What do I need to get started?",
      a: "Access to your Meta Business Suite, Google Ads account, domain DNS for email setup, and POS credentials. If you don't have ad accounts, we'll help set them up."
    },
    {
      q: "How fast can you get my ads running?",
      a: "After the kickoff call, your ads are live within 48 hours during Monday through Friday business hours."
    },
    {
      q: "What's the difference between the two plans?",
      a: "The Google Ads Package ($500/mo) covers Google Ads management and geo-fencing with full reporting and strategy calls. The All-In-One Growth Package ($1,000/mo) includes everything in the Google Ads Package plus Facebook & Instagram Ads, CRM with automated follow-up, email & SMS automation, customer re-engagement, AI chatbot, B2B outreach, and your client portal."
    },
    {
      q: "Can I upgrade from Google Ads to the All-In-One package later?",
      a: "Absolutely. You can start with Google Ads and upgrade anytime. We'll seamlessly add the additional services to your account."
    }
  ];

  return (
    <section style={{ background: BG, padding: "90px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Fade>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: 12 }}>Pricing FAQ</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 600, margin: "0 auto" }}>Got questions? We've got answers.</p>
          </div>
        </Fade>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {faqs.map((faq, i) => (
            <Fade key={i} delay={i * 0.05}>
              <div
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  background: open === i ? "rgba(43,127,255,0.04)" : "rgba(255,255,255,0.03)",
                  border: "1px solid " + (open === i ? "rgba(43,127,255,0.15)" : "rgba(255,255,255,0.07)"),
                  borderRadius: 12,
                  cursor: "pointer",
                  transition: "all .2s"
                }}
              >
                <div style={{ padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 640, color: "#fff", textAlign: "left" }}>{faq.q}</span>
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
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
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

function BottomCTA() {
  return (
    <section style={{ background: BG2, padding: "90px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <Fade>
          <div style={{ background: "linear-gradient(135deg, rgba(43,127,255,0.1), rgba(43,127,255,0.03))", border: "1px solid rgba(43,127,255,0.15)", borderRadius: 20, padding: "clamp(36px,5vw,60px) clamp(24px,4vw,44px)", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 800, color: "#fff", marginBottom: 12 }}>Ready to grow your laundromat?</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", maxWidth: 420, margin: "0 auto 22px", lineHeight: 1.6 }}>Book a free discovery call. We'll analyze your market, review your competition, and build a custom plan.</p>
            <a href="/contact" style={{ display: "inline-block", background: B, color: "#fff", padding: "14px 30px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 20px rgba(43,127,255,0.3)", marginBottom: 10 }}>Free Marketing Audit →</a>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: 0 }}>No commitment required.</p>
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

export default function PricingPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: BG, minHeight: "100vh" }}>
      <style>{`
        .dn { display: none; }
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(7, 9, 13, 0.95);
          backdrop-filter: blur(20px);
          z-index: 99;
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 768px) {
          .dn { display: flex; }
          .mobile-menu-btn { display: flex !important; }
          .pricing-cards {
            grid-template-columns: 1fr !important;
            max-width: 500px !important;
          }
          .features-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-inner {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
      <Nav />
      <Hero />
      <PricingCards />
      <WhyGoAllInOne />
      <MultiLocation />
      <PricingFAQ />
      <BottomCTA />
      <Footer />
    </div>
  );
}

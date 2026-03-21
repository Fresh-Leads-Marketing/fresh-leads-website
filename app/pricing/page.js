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
              One plan. Everything included. No hidden fees.
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

function PricingCard() {
  return (
    <section style={{ background: BG2, padding: "70px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Fade>
          <div style={{ maxWidth: 700, margin: "0 auto", background: BG, border: "1.5px solid rgba(43,127,255,0.3)", borderRadius: 18, padding: "50px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(43,127,255,0.1) 0%, rgba(43,127,255,0.02) 100%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ fontSize: 24, fontWeight: 750, color: "#fff", marginBottom: 20 }}>All-In-One Growth Package</h2>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: "clamp(48px,7vw,64px)", fontWeight: 900, color: B, lineHeight: 1 }}>$1,000</div>
                <div style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>/month</div>
              </div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 24, fontWeight: 550 }}>+$199/month per additional location</div>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 28 }}>Done-for-you marketing designed to bring in new customers, re-engage past customers, and automate follow-up.</p>
              <a href="/contact" style={{ display: "inline-block", background: B, color: "#fff", padding: "14px 28px", borderRadius: 9, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 20px rgba(43,127,255,0.3)", marginBottom: 12 }}>Free Marketing Audit →</a>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>No contracts. Cancel anytime.</p>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

function WhatIsIncluded() {
  const features = [
    {
      title: "Paid Ads Management (Done-For-You)",
      icon: "📢",
      items: ["Google & Facebook Ads management", "Geo-fencing ad campaigns", "Campaign strategy, setup, and optimization", "Ad creative design and copywriting", "Ongoing performance monitoring"]
    },
    {
      title: "Lead Follow-Up & CRM",
      icon: "📊",
      items: ["Instant email & SMS follow-up for new leads", "Centralized lead tracking and organization", "POS API integration for automatic data sync", "No missed leads, no manual follow-ups"]
    },
    {
      title: "Customer Re-Engagement",
      icon: "🔄",
      items: ["Automated identification of lapsed customers", "Email & SMS campaigns to drive repeat visits", "Continuous targeting across your entire customer base", "POS API integration required"]
    },
    {
      title: "New Customer Welcome Automation",
      icon: "👋",
      items: ["Automatic customer capture via POS API", "Welcome email & SMS sequence", "Automated Google review requests", "Follow-up messages for retention"]
    },
    {
      title: "AI Automation & Chatbots",
      icon: "🤖",
      items: ["Website, SMS, and Facebook Messenger chatbots", "AI-powered Google review responses", "Trained specifically on your business", "Available 24/7"]
    },
    {
      title: "B2B Cold Email Outreach",
      icon: "📧",
      items: ["Dedicated sending domain and email setup", "Email warming and deliverability management", "Personalized outreach to hotels, gyms, Airbnbs, salons", "Lead replies go straight to your inbox"]
    }
  ];

  return (
    <section style={{ background: BG, padding: "90px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Fade>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: 12 }}>What's Included</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>Everything you need to grow your laundromat in one package.</p>
          </div>
        </Fade>

        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {features.map((feature, i) => (
            <Fade key={i} delay={i * 0.04}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "28px 24px", display: "flex", flexDirection: "column", height: "100%" }}>
                <span style={{ fontSize: 28, marginBottom: 12 }}>{feature.icon}</span>
                <h3 style={{ fontSize: 16, fontWeight: 720, color: "#fff", marginBottom: 14 }}>{feature.title}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {feature.items.map((item, j) => (
                    <li key={j} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: j < feature.items.length - 1 ? 10 : 0, display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ color: "#22C55E", flexShrink: 0, marginTop: 2, fontWeight: 700 }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Fade>
          ))}
        </div>
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
              <span style={{ fontWeight: 600, color: "#fff" }}>$1,000/month</span> for your first location. <span style={{ fontWeight: 600, color: "#fff" }}>$199/month</span> for each additional location.
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
      a: "No. The $1,000/month covers our management fee. Ad spend goes directly to Google, Facebook, and Instagram. Most laundromats start with $300 to $1,000 per month in ad spend, and we increase from there based on data."
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
      q: "Can I choose specific services instead of the full package?",
      a: "Our package includes everything because the services work best together. Your ads drive leads, the CRM captures them, email and SMS follow up automatically, and the AI chatbot handles questions 24/7."
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
      <PricingCard />
      <WhatIsIncluded />
      <MultiLocation />
      <PricingFAQ />
      <BottomCTA />
      <Footer />
    </div>
  );
}

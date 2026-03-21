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
function FI({ children, delay = 0 }) {
  const [r, v] = useV();
  return <div ref={r} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transition: `opacity .6s ease ${delay}s, transform .6s ease ${delay}s` }}>{children}</div>;
}
function Logo(){return(<img src="/logo.png" alt="Fresh Leads Marketing" style={{height:32,width:"auto",display:"block"}}/>)}

function ServicesDropdown({ active }) {
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
            <ServicesDropdown active={false} />
            {["About", "Pricing", "Blog", "FAQ", "Contact"].map(l => <a key={l} href={l==="About"?"/about":l==="Pricing"?"/pricing":l==="Blog"?"/blog":l==="FAQ"?"/faq":"/contact"} style={{ color: l === "About" ? "#fff" : "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13, fontWeight: l === "About" ? 650 : 550 }}>{l}</a>)}
            <a href="#cta" style={{ background: B, color: "#fff", padding: "9px 20px", borderRadius: 9, fontWeight: 650, fontSize: 13, textDecoration: "none" }}>Free Marketing Audit</a>
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
  return <section style={{ background: BG, padding: "130px 24px 70px", position: "relative" }}>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(43,127,255,0.07) 0%, transparent 60%)" }} />
    <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative" }}>
      <FI>
        <p style={{ color: B, fontWeight: 700, fontSize: 13, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 12 }}>About Us</p>
        <h1 style={{ fontSize: "clamp(32px,5vw,50px)", fontWeight: 800, color: "#fff", lineHeight: 1.08, letterSpacing: "-.035em", marginBottom: 18 }}>
          A marketing agency <span style={{ color: B }}>built for laundromats</span>
        </h1>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 540, margin: "0 auto", lineHeight: 1.6 }}>
          100+ laundromats served across the United States.
        </p>
      </FI>
    </div>
  </section>;
}

function Stats() {
  return <section style={{ background: BG2, padding: "60px 24px" }}>
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <FI>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }} className="stats-grid">
          {[["100+", "Laundromats served"], ["3x", "Avg. Client ROI"], ["6", "Integrated services"], ["24/7", "AI-powered support"]].map(([n, l], i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "28px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: B }}>{n}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontWeight: 550, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </FI>
    </div>
  </section>;
}

function Story() {
  return <section style={{ background: BG, padding: "80px 24px" }}>
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <div className="about-section-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
        <FI>
          <div>
            <p style={{ color: B, fontWeight: 700, fontSize: 13, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 10 }}>Why we exist</p>
            <h2 style={{ fontSize: "clamp(24px,3vw,34px)", fontWeight: 800, color: "#fff", marginBottom: 16, lineHeight: 1.15 }}>We saw laundromat owners getting bad marketing advice.</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 14 }}>
              Most marketing agencies treat laundromats like any other local business. They run the same generic ads, use the same cookie-cutter funnels, and copy-paste strategies from restaurants and retail. It doesn't work. Laundromats have unique customer behavior, different revenue models, and specific competitive dynamics.
            </p>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
              We built Fresh Leads to fix that. Every strategy we use, every AI tool we deploy, and every campaign we run was developed specifically for the laundry industry. Tested across 125+ laundromats in markets ranging from dense urban neighborhoods to suburban strip malls.
            </p>
          </div>
        </FI>
        <FI delay={0.1}>
          <div>
            <p style={{ color: B, fontWeight: 700, fontSize: 13, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 10 }}>What makes us different</p>
            <h2 style={{ fontSize: "clamp(24px,3vw,34px)", fontWeight: 800, color: "#fff", marginBottom: 16, lineHeight: 1.15 }}>We only work with laundromats</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 14 }}>
              This isn't a side offering. We don't do restaurants on Monday and laundromats on Tuesday. 100% of our focus, research, and innovation goes into helping laundromat owners grow. That means we understand your POS systems, your customer lifecycle, your seasonal patterns, and your competition better than any generalist agency could.
            </p>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
              When you work with us, you get a team that already knows your industry inside and out. So we can skip the learning curve and start driving results from week one.
            </p>
          </div>
        </FI>
      </div>
    </div>
  </section>;
}

function Expertise() {
  const items = [
    ["📍", "Geo-fencing & paid ads", "Deep expertise in Facebook, Instagram, and Google ad platforms with geo-targeting specifically optimized for local laundromat markets."],
    ["🤖", "AI & automation", "We build and deploy custom AI chatbots, voice bots, and automated marketing workflows that save you time and capture more leads."],
    ["📊", "Data & CRM", "We integrate with your laundry software to build a single source of truth for customer data, enabling smarter marketing decisions."],
    ["📱", "Customer retention", "Automated email and SMS sequences that keep customers coming back. The most cost-effective way to grow revenue."],
    ["📧", "B2B sales", "Systematic outreach to commercial accounts (hotels, gyms, salons) that generates a steady pipeline of high-value contracts."],
    ["⭐", "Reputation management", "Review generation systems that boost your Google Maps ranking and build the trust new customers need to choose you."],
  ];

  return <section style={{ background: BG2, padding: "80px 24px" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <FI>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ color: B, fontWeight: 700, fontSize: 13, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 10 }}>Our expertise</p>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,36px)", fontWeight: 800, color: "#fff" }}>Built for every part of laundromat growth</h2>
        </div>
      </FI>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} className="expertise-grid">
        {items.map(([icon, title, desc], i) => (
          <FI key={i} delay={i * 0.04}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "24px 22px", display: "flex", flexDirection: "column", minHeight: 150, height: "100%" }}>
              <span style={{ fontSize: 22 }}>{icon}</span>
              <h3 style={{ fontSize: 15, fontWeight: 720, color: "#fff", marginTop: 10, marginBottom: 6 }}>{title}</h3>
              <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, flex: 1 }}>{desc}</p>
            </div>
          </FI>
        ))}
      </div>
    </div>
  </section>;
}

function Approach() {
  return <section style={{ background: BG, padding: "80px 24px" }}>
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <FI>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ color: B, fontWeight: 700, fontSize: 13, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 10 }}>How we work</p>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,36px)", fontWeight: 800, color: "#fff" }}>Our approach to your success</h2>
        </div>
      </FI>
      {[
        ["We manage everything", "You don't need to become a marketing expert. We handle strategy, execution, optimization, and reporting. You focus on running your laundromat while we focus on filling it with customers."],
        ["Data drives every decision", "No guesswork, no hunches. Every campaign adjustment, every budget allocation, and every new strategy is backed by real performance data from your market."],
        ["We think long-term", "Quick wins are great, but we build systems that compound over time. Your CRM database grows, your review count climbs, your email list expands. This creates a marketing engine that gets stronger every month."],
        ["Full transparency, always", "Monthly reports with clear metrics. A real-time dashboard you can check anytime. And a team that picks up the phone when you call. No black boxes, no vanity metrics. Just honest results."],
      ].map(([title, desc], i) => (
        <FI key={i} delay={i * 0.06}>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "24px 28px", marginBottom: 12, display: "flex", gap: 18, alignItems: "flex-start" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(43,127,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: B, fontWeight: 800, fontSize: 13 }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 720, color: "#fff", marginBottom: 6 }}>{title}</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{desc}</p>
            </div>
          </div>
        </FI>
      ))}
    </div>
  </section>;
}

function MeetTheFounder() {
  return <section style={{ background: BG, padding: "80px 24px" }}>
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="founder-section">
        <FI>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <p style={{ color: B, fontWeight: 700, fontSize: 13, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 10 }}>Founder</p>
              <h2 style={{ fontSize: "clamp(24px,3vw,34px)", fontWeight: 800, color: "#fff", marginBottom: 8, lineHeight: 1.15 }}>Ryan</h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>Founder, Fresh Leads Marketing</p>
            </div>
            <p style={{ fontSize: 15.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.75 }}>
              I spent over 10 years in the tourism industry marketing and advertising for hotels, restaurants, and activities across Hawaii. When a friend who owned laundromats came to me needing marketing help, I didn't expect what would happen next. Within a few months, the results spoke for themselves. Referrals started coming in consistently.
            </p>
            <p style={{ fontSize: 15.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.75 }}>
              That's when I made the decision to dedicate my entire focus to the laundry industry. I saw firsthand how underserved laundromat owners were when it came to real, effective marketing. Most agencies treat laundromats as an afterthought. We built Fresh Leads Marketing to change that.
            </p>
          </div>
        </FI>
        <FI delay={0.1}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: 280, height: 280, borderRadius: 16, background: "rgba(43,127,255,0.08)", border: "1px solid rgba(43,127,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
              <div style={{ width: 120, height: 120, borderRadius: 12, background: "rgba(43,127,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 56, fontWeight: 800, color: B }}>R</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textAlign: "center" }}>Headshot</p>
            </div>
          </div>
        </FI>
      </div>
    </div>
  </section>;
}

function Location() {
  return <section style={{ background: BG2, padding: "60px 24px" }}>
    <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
      <FI>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2C8 2 4 5 4 9c0 5 8 13 8 13s8-8 8-13c0-4-4-7-8-7z" fill={B} opacity=".2" stroke={B} strokeWidth="1.5" /><circle cx="12" cy="9" r="2.5" fill={B} /></svg>
          <span style={{ fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>Headquartered in Honolulu, Hawaii · Serving laundromats across the U.S.</span>
        </div>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>
          We're a remote-first team available in your timezone. Whether you're in New York or Los Angeles, you get the same dedicated support and fast response times.
        </p>
      </FI>
    </div>
  </section>;
}

function CTA() {
  return <section id="cta" style={{ background: BG, padding: "90px 24px" }}>
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <FI><div style={{ background: "linear-gradient(135deg, rgba(43,127,255,0.1), rgba(43,127,255,0.03))", border: "1px solid rgba(43,127,255,0.18)", borderRadius: 20, padding: "clamp(36px,6vw,60px) clamp(24px,5vw,44px)", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, color: "#fff", marginBottom: 12, lineHeight: 1.15 }}>Want to work with us?</h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", maxWidth: 420, margin: "0 auto 24px", lineHeight: 1.6 }}>Schedule a free discovery call. No commitment, no pressure. Just a conversation about growing your laundromat.</p>
        <a href="/contact" style={{ display: "inline-block", background: B, color: "#fff", padding: "14px 30px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 20px rgba(43,127,255,0.3)" }}>Schedule a Call →</a>
      </div></FI>
    </div>
  </section>;
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

export default function AboutPage() {
  return <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: BG, minHeight: "100vh" }}>
    <Nav />
    <Hero />
    <Stats />
    <Story />
    <Expertise />
    <Approach />
    <MeetTheFounder />
    <Location />
    <CTA />
    <Footer />
  </div>;
}

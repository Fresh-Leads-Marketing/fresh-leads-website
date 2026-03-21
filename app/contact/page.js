"use client";
import { useState, useEffect, useRef } from "react";
import Script from "next/script";

const B = "#2B7FFF";
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
            {["About", "Pricing", "Blog", "FAQ", "Contact"].map(l => <a key={l} href={l==="About"?"/about":l==="Pricing"?"/pricing":l==="Blog"?"/blog":l==="FAQ"?"/faq":"/contact"} style={{ color: l === "Contact" ? "#fff" : "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13, fontWeight: l === "Contact" ? 650 : 550 }}>{l}</a>)}
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
  return <section style={{ background: BG, padding: "130px 24px 60px", position: "relative" }}>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(43,127,255,0.07) 0%, transparent 60%)" }} />
    <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>
      <FI>
        <p style={{ color: B, fontWeight: 700, fontSize: 13, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 12 }}>Contact Us</p>
        <h1 style={{ fontSize: "clamp(32px,5vw,48px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-.03em", marginBottom: 16 }}>
          Let&apos;s grow your <span style={{ color: B }}>laundromat</span>
        </h1>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>
          Schedule a free discovery call or send us a message. We respond within 24 hours.
        </p>
      </FI>
    </div>
  </section>;
}

function CalendarSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <section style={{ background: BG2, padding: "70px 24px" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <FI>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Book your free discovery call</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, maxWidth: 500, margin: "0 auto" }}>
            Pick a time that works for you. In 30 minutes, we&apos;ll audit your market, review your competition, and outline a custom growth plan.
          </p>
        </div>
      </FI>

      <FI delay={0.1}>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "4px", overflow: "hidden", minHeight: 700 }}>
          {mounted ? (
            <iframe
              src="https://link.freshleadsmarketing.com/widget/booking/fTHzSQY7rRoHcQPNC9NV"
              style={{ width: "100%", minHeight: 700, border: "none", overflow: "hidden", borderRadius: 12, background: "#fff" }}
              scrolling="no"
              id="fTHzSQY7rRoHcQPNC9NV_1773990578915"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
              title="Book a Discovery Call"
            />
          ) : (
            <div style={{ width: "100%", minHeight: 700, borderRadius: 12, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ color: "#999", fontSize: 14 }}>Loading calendar...</div>
            </div>
          )}
        </div>
      </FI>
    </div>

    {mounted && (
      <Script
        src="https://link.freshleadsmarketing.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    )}
  </section>;
}

function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", email: "", laundromat: "", locations: "", services: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/ryan@freshleadsmarketing.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          laundromat: form.laundromat,
          locations: form.locations,
          services: form.services,
          _subject: "New lead from Fresh Leads website",
          _template: "table",
        }),
      });
      if (res.ok) { setStatus("sent"); setForm({ name: "", email: "", laundromat: "", locations: "", services: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  const inputStyle = {
    width: "100%", background: "#fff", border: "1px solid #ddd",
    borderRadius: 9, padding: "11px 14px", color: "#1a1a1a", fontSize: 14,
    fontFamily: "'DM Sans', sans-serif", outline: "none",
  };

  return <section style={{ background: BG, padding: "70px 24px" }}>
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <FI>
        <div style={{ background: "#f5f5f5", borderRadius: 16, padding: "36px 32px" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111", marginBottom: 8 }}>Prefer to send a message?</h2>
            <p style={{ fontSize: 14, color: "#666" }}>Fill out the form and we&apos;ll get back to you within 24 hours.</p>
          </div>

          {status === "sent" ? (
            <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 12, padding: "28px 24px", textAlign: "center" }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#22C55E", marginBottom: 6 }}>Message sent!</p>
              <p style={{ fontSize: 14, color: "#555" }}>We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {[
                ["Full name", "text", "John Smith", "name"],
                ["Email", "email", "john@mylaundromat.com", "email"],
                ["Laundromat name", "text", "Smith's Cleaners", "laundromat"],
                ["How many locations?", "text", "1", "locations"],
              ].map(([label, type, placeholder, key], i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <label htmlFor={`field-${key}`} style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 5 }}>{label}</label>
                  <input id={`field-${key}`} name={key} type={type} placeholder={placeholder} required={i < 2} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} style={inputStyle} />
                </div>
              ))}

              <div style={{ marginBottom: 14 }}>
                <label htmlFor="field-services" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 5 }}>What services are you interested in?</label>
                <textarea id="field-services" name="services" placeholder="Tell us about your goals..." value={form.services} onChange={e => setForm({ ...form, services: e.target.value })} style={{ ...inputStyle, minHeight: 100, resize: "vertical" }} />
              </div>

              <button type="submit" disabled={status === "sending"} style={{
                width: "100%", background: status === "sending" ? "rgba(43,127,255,0.5)" : B, color: "#fff", padding: "13px", borderRadius: 10,
                border: "none", fontWeight: 700, fontSize: 15, cursor: status === "sending" ? "not-allowed" : "pointer",
                fontFamily: "'DM Sans', sans-serif", boxShadow: "0 2px 16px rgba(43,127,255,0.3)",
              }}>{status === "sending" ? "Sending..." : "Send Message \u2192"}</button>

              {status === "error" && <p style={{ color: "#EF4444", fontSize: 13, marginTop: 10, textAlign: "center" }}>Something went wrong. Please try again or email us directly.</p>}
            </form>
          )}
        </div>
      </FI>
    </div>
  </section>;
}

function Info() {
  return <section style={{ background: BG2, padding: "60px 24px" }}>
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <FI>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
          {[
            ["\uD83D\uDCCD", "Location", "Honolulu, HI (serving nationwide)"],
            ["\uD83D\uDCE7", "Email", "info"+"@"+"freshleadsmarketing.com"],
            ["\u23F0", "Response time", "Within 24 hours"],
          ].map(([icon, label, value], i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "20px 18px", textAlign: "center" }}>
              <span style={{ fontSize: 20, display: "block", marginBottom: 8 }}>{icon}</span>
              <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.65)", marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>{value}</div>
            </div>
          ))}
        </div>
      </FI>
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

export default function ContactPage() {
  return <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: BG, minHeight: "100vh" }}>
    <Nav />
    <Hero />
    <CalendarSection />
    <ContactForm />
    <Info />
    <Footer />
  </div>;
}

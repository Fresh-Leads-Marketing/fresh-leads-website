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

function Logo(){return(<img src="/logo.png" alt="Fresh Leads Marketing" style={{height:40,width:"auto",display:"block"}}/>)}

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

export default function PrivacyPolicyPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: "#fff", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <Nav />

      {/* Hero */}
      <section style={{ background: BG, padding: "130px 24px 60px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 50% 30%, rgba(43,127,255,0.06) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <FI>
            <h1 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, color: "#fff", lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 16 }}>
              Privacy <span style={{ color: B }}>Policy</span>
            </h1>
          </FI>
          <FI delay={0.05}>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", maxWidth: 560, margin: "0 auto", lineHeight: 1.65 }}>
              Last updated: March 2026
            </p>
          </FI>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "60px 24px 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FI>
            <div style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, fontSize: 15 }}>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>1. Introduction</h2>
              <p style={{ marginBottom: 16 }}>
                Fresh Leads Marketing ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
              <p style={{ marginBottom: 24 }}>
                Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our services.
              </p>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>2. Information We Collect</h2>
              <p style={{ marginBottom: 12 }}>
                <strong>Information You Provide Directly:</strong>
              </p>
              <ul style={{ marginBottom: 24, paddingLeft: 20 }}>
                <li style={{ marginBottom: 8 }}>Contact information (name, email, phone number, business address)</li>
                <li style={{ marginBottom: 8 }}>Form submissions on our website</li>
                <li style={{ marginBottom: 8 }}>Communications with our team via email or chat</li>
                <li style={{ marginBottom: 8 }}>Business information and marketing preferences</li>
                <li style={{ marginBottom: 8 }}>Payment and billing information</li>
              </ul>
              <p style={{ marginBottom: 12 }}>
                <strong>Information Collected Automatically:</strong>
              </p>
              <ul style={{ marginBottom: 24, paddingLeft: 20 }}>
                <li style={{ marginBottom: 8 }}>Cookies and similar tracking technologies</li>
                <li style={{ marginBottom: 8 }}>Log data (IP address, browser type, pages visited)</li>
                <li style={{ marginBottom: 8 }}>Device information and usage analytics</li>
                <li style={{ marginBottom: 8 }}>Geographic location data</li>
              </ul>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>3. How We Use Your Information</h2>
              <p style={{ marginBottom: 12 }}>We use collected information for:</p>
              <ul style={{ marginBottom: 24, paddingLeft: 20 }}>
                <li style={{ marginBottom: 8 }}>Providing and improving our marketing services</li>
                <li style={{ marginBottom: 8 }}>Processing payments and managing billing</li>
                <li style={{ marginBottom: 8 }}>Communicating with you about services and updates</li>
                <li style={{ marginBottom: 8 }}>Personalizing your experience and marketing campaigns</li>
                <li style={{ marginBottom: 8 }}>Analyzing trends and improving our website</li>
                <li style={{ marginBottom: 8 }}>Complying with legal obligations</li>
                <li style={{ marginBottom: 8 }}>Fraud detection and security purposes</li>
              </ul>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>4. Third-Party Services</h2>
              <p style={{ marginBottom: 12 }}>We work with trusted third-party services to deliver our solutions:</p>
              <ul style={{ marginBottom: 24, paddingLeft: 20 }}>
                <li style={{ marginBottom: 8 }}><strong>Google Ads & Analytics:</strong> For advertising campaigns and website analytics</li>
                <li style={{ marginBottom: 8 }}><strong>Facebook Ads:</strong> For social media marketing and audience targeting</li>
                <li style={{ marginBottom: 8 }}><strong>Email & SMS Platforms:</strong> For customer communication and automation</li>
                <li style={{ marginBottom: 8 }}><strong>CRM Systems:</strong> For customer relationship management and data integration</li>
                <li style={{ marginBottom: 8 }}><strong>Payment Processors:</strong> For secure payment processing</li>
              </ul>
              <p style={{ marginBottom: 24 }}>
                These services may collect and process your data according to their own privacy policies. We encourage you to review their privacy practices.
              </p>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>5. Data Security</h2>
              <p style={{ marginBottom: 24 }}>
                We implement comprehensive security measures to protect your information, including encryption, secure servers, and access controls. However, no method of transmission over the Internet is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.
              </p>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>6. Your Rights and Choices</h2>
              <p style={{ marginBottom: 12 }}>You have the right to:</p>
              <ul style={{ marginBottom: 24, paddingLeft: 20 }}>
                <li style={{ marginBottom: 8 }}>Access the personal information we hold about you</li>
                <li style={{ marginBottom: 8 }}>Request correction of inaccurate information</li>
                <li style={{ marginBottom: 8 }}>Request deletion of your information</li>
                <li style={{ marginBottom: 8 }}>Opt-out of marketing communications</li>
                <li style={{ marginBottom: 8 }}>Request a data portability report</li>
              </ul>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>7. CCPA Compliance</h2>
              <p style={{ marginBottom: 24 }}>
                If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA). We comply with all CCPA requirements regarding your personal information. For more information about your CCPA rights, please contact us at info [at] freshleadsmarketing.com.
              </p>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>8. Cookies and Tracking</h2>
              <p style={{ marginBottom: 24 }}>
                We use cookies to enhance your experience on our website. Most web browsers are set to accept cookies by default. You can typically remove or reject cookies through your browser settings, but this may affect your ability to use certain features of our website.
              </p>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>9. Data Retention</h2>
              <p style={{ marginBottom: 24 }}>
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your data at any time, subject to certain legal and business requirements.
              </p>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>10. Changes to This Policy</h2>
              <p style={{ marginBottom: 24 }}>
                We may update this Privacy Policy periodically to reflect changes in our practices or applicable laws. We will notify you of significant changes by updating the "Last Updated" date. Your continued use of our services constitutes your acceptance of the updated Privacy Policy.
              </p>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>11. Contact Us</h2>
              <p style={{ marginBottom: 8 }}>
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div style={{ background: "rgba(43,127,255,0.08)", border: "1px solid rgba(43,127,255,0.15)", borderRadius: 12, padding: 20, marginTop: 16, marginBottom: 40 }}>
                <p style={{ margin: "0 0 8px 0", fontWeight: 600 }}>Fresh Leads Marketing</p>
                <p style={{ margin: "0 0 4px 0" }}>Email: {"info"+"@"+"freshleadsmarketing.com"}</p>
                <p style={{ margin: "0 0 4px 0" }}>Phone: 808-736-1539</p>
                <p style={{ margin: 0 }}>Location: Honolulu, Hawaii</p>
              </div>

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

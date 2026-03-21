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

export default function TermsOfServicePage() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: "#fff", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <Nav />

      {/* Hero */}
      <section style={{ background: BG, padding: "130px 24px 60px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 50% 30%, rgba(43,127,255,0.06) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <FI>
            <h1 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, color: "#fff", lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 16 }}>
              Terms of <span style={{ color: B }}>Service</span>
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

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>1. Agreement to Terms</h2>
              <p style={{ marginBottom: 24 }}>
                By accessing and using Fresh Leads Marketing's website and services, you agree to be bound by these Terms of Service. If you do not agree to abide by the above, please do not use this service. These terms apply to all users and visitors of our website and services.
              </p>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>2. Service Description</h2>
              <p style={{ marginBottom: 24 }}>
                Fresh Leads Marketing provides all-in-one marketing services specifically designed for laundromats. Our services include, but are not limited to: geo-fencing advertisements, email and SMS marketing, CRM integration, AI chatbots and voice bots, Google review generation, and B2B commercial outreach. We work exclusively with laundromat businesses in the United States.
              </p>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>3. Pricing and Payment Terms</h2>
              <p style={{ marginBottom: 12 }}>
                <strong>Service Fees:</strong> Pricing depends on your market size, number of locations, and specific goals. Detailed pricing will be provided during your free marketing audit and finalized in your service agreement.
              </p>
              <p style={{ marginBottom: 12 }}>
                <strong>Payment Schedule:</strong> Invoices are due within 30 days of invoice date unless otherwise specified in your agreement. Payments can be made via credit card, ACH transfer, or other approved methods.
              </p>
              <p style={{ marginBottom: 12 }}>
                <strong>Ad Spend:</strong> Advertising costs are separate from our management fees. We typically recommend a minimum of $1,000/month in ad spend across Google and Facebook to achieve meaningful results. You authorize us to charge ad spend directly to your preferred payment method.
              </p>
              <p style={{ marginBottom: 24 }}>
                <strong>Setup Fee:</strong> A one-time onboarding fee applies and covers campaign buildout, CRM configuration, chatbot training, and initial setup. This fee is non-refundable once setup work has begun.
              </p>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>4. Client Responsibilities</h2>
              <p style={{ marginBottom: 12 }}>
                You agree to:
              </p>
              <ul style={{ marginBottom: 24, paddingLeft: 20 }}>
                <li style={{ marginBottom: 8 }}>Provide accurate business information and access to required accounts (Google Business, Facebook, POS systems)</li>
                <li style={{ marginBottom: 8 }}>Maintain accurate contact information and respond to communication from our team</li>
                <li style={{ marginBottom: 8 }}>Maintain all necessary legal compliance and licensing for your laundromat business</li>
                <li style={{ marginBottom: 8 }}>Comply with all platform policies (Google Ads, Facebook Ads, email platforms, etc.)</li>
                <li style={{ marginBottom: 8 }}>Not engage in any illegal or unethical marketing practices</li>
                <li style={{ marginBottom: 8 }}>Allow our team access to your accounts for campaign management and optimization</li>
              </ul>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>5. Intellectual Property Rights</h2>
              <p style={{ marginBottom: 24 }}>
                All marketing materials, campaigns, copy, strategies, and designs created by Fresh Leads Marketing remain our intellectual property unless otherwise specified in your service agreement. You may use these materials solely for your business operations during the service period. Upon termination, rights to use our proprietary materials cease unless otherwise agreed in writing. Your company name, branding, and content you provide remain your intellectual property.
              </p>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>6. Limitation of Liability</h2>
              <p style={{ marginBottom: 24 }}>
                To the fullest extent permitted by law, Fresh Leads Marketing shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, even if we have been advised of the possibility of such damages. Our total liability under these terms shall not exceed the amount you have paid us in the 12 months preceding the claim. Some jurisdictions do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, so the above limitations may not apply to you.
              </p>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>7. Performance and Results</h2>
              <p style={{ marginBottom: 24 }}>
                While we implement industry-leading strategies based on proven results across 100+ laundromat clients, we cannot guarantee specific results or return on investment. Results depend on many factors including market conditions, competition, your location, service offerings, and implementation of our recommendations. We commit to continuous optimization and transparent reporting on all metrics within your control.
              </p>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>8. Contract Term and Termination</h2>
              <p style={{ marginBottom: 12 }}>
                <strong>Initial Commitment:</strong> All new clients are subject to a 90-day initial commitment. This allows sufficient time for campaign setup, launch, optimization, and demonstration of initial results.
              </p>
              <p style={{ marginBottom: 12 }}>
                <strong>After Initial Period:</strong> Following the 90-day period, services continue on a month-to-month basis. Either party may terminate with 30 days' written notice.
              </p>
              <p style={{ marginBottom: 24 }}>
                <strong>Early Termination:</strong> If you terminate before the end of the initial 90-day period, you remain responsible for all fees incurred through the termination date. Upon termination, we will cease campaign management and transition information as required by law.
              </p>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>9. Governing Law and Jurisdiction</h2>
              <p style={{ marginBottom: 24 }}>
                These Terms of Service shall be governed by and construed in accordance with the laws of the State of Hawaii, without regard to its conflict of law principles. You agree that any legal proceedings or arbitration shall take place in Hawaii County, Hawaii, and you consent to the exclusive jurisdiction of the state and federal courts located there.
              </p>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>10. Dispute Resolution</h2>
              <p style={{ marginBottom: 12 }}>
                <strong>Informal Resolution:</strong> Before pursuing formal legal action, both parties agree to attempt to resolve disputes informally through good-faith negotiation.
              </p>
              <p style={{ marginBottom: 24 }}>
                <strong>Arbitration:</strong> If informal negotiation does not resolve the dispute within 60 days, both parties agree to binding arbitration before a single arbitrator in accordance with Hawaii law, rather than court proceedings. The arbitration shall be conducted under the rules of the American Arbitration Association.
              </p>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>11. Modifications to Terms</h2>
              <p style={{ marginBottom: 24 }}>
                We reserve the right to modify these Terms of Service at any time. Changes will be effective when posted to our website. Your continued use of our services after such modifications constitutes your acceptance of the updated terms. We encourage you to review these terms periodically to stay informed of any changes.
              </p>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>12. Warranty Disclaimer</h2>
              <p style={{ marginBottom: 24 }}>
                Our services are provided on an "as-is" and "as-available" basis. We disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that our services will be uninterrupted or error-free, or that defects will be corrected.
              </p>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>13. Entire Agreement</h2>
              <p style={{ marginBottom: 24 }}>
                These Terms of Service, along with your signed service agreement and privacy policy, constitute the entire agreement between you and Fresh Leads Marketing regarding our services and supersede all prior negotiations, representations, and agreements.
              </p>

              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>14. Contact Information</h2>
              <p style={{ marginBottom: 8 }}>
                If you have questions about these Terms of Service or need to provide notice, please contact us:
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

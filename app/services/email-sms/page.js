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
  useEffect(() => { const e = r.current; if (!e) return; const o = new IntersectionObserver(([x]) => { if (x.isIntersecting) { s(true); o.disconnect(); } }, { threshold: t }); o.observe(e); return () => o.disconnect(); }, [t]);
  return [r, v];
}

function FI({ children, delay = 0 }) {
  const [r, v] = useV();
  return (<div ref={r} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transition: `opacity .6s ease ${delay}s, transform .6s ease ${delay}s` }}>{children}</div>);
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
      <a href="/services" style={{ color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 650, display: "flex", alignItems: "center", gap: 4 }}>
        Services <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </a>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", paddingTop: 10 }}>
          <div style={{ background: "rgba(12,16,23,0.98)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "8px 0", minWidth: 200, boxShadow: "0 8px 32px rgba(0,0,0,0.5)", backdropFilter: "blur(20px)" }}>
            {items.map(([label, href]) => (
              <a key={href} href={href} style={{ display: "block", padding: "9px 18px", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13, fontWeight: 500, transition: "background .15s" }} onMouseEnter={e => { e.target.style.background = "rgba(43,127,255,0.08)"; e.target.style.color = "#fff"; }} onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "rgba(255,255,255,0.6)"; }}>{label}</a>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", margin: "6px 0" }} />
            <a href="/services" style={{ display: "block", padding: "9px 18px", color: "#2B7FFF", textDecoration: "none", fontSize: 13, fontWeight: 650 }}>All Services →</a>
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
        <a href="/contact" style={{ display: "block", background: "#2B7FFF", color: "#fff", padding: "16px 0", borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: "none", textAlign: "center", marginTop: 28 }}>Free Marketing Audit</a>
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
            {["About", "Pricing", "Blog", "FAQ", "Contact"].map(l => <a key={l} href={l==="About"?"/about":l==="Pricing"?"/pricing":l==="Blog"?"/blog":l==="FAQ"?"/faq":"/contact"} style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13, fontWeight: 550 }}>{l}</a>)}
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
  return (<section style={{ background: BG, padding: "130px 24px 70px", position: "relative" }}>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(43,127,255,0.07) 0%, transparent 60%)" }} />
    <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
      <div className="hg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 44, alignItems: "center" }}>
        <FI>
          <div>
            <a href="/services" style={{ color: B, fontSize: 13, fontWeight: 600, textDecoration: "none", display: "inline-block", marginBottom: 16 }}>← All Services</a>
            <span style={{ fontSize: 32, display: "block", marginBottom: 12 }}>📱</span>
            <h1 style={{ fontSize: "clamp(30px,4.5vw,46px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-.03em", marginBottom: 16 }}>
              Email & SMS Marketing for <span style={{ color: B }}>Laundromats</span>
            </h1>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, marginBottom: 28 }}>
              Automated campaigns that bring lapsed customers back, welcome new ones, and keep your laundromat top of mind. All running 24/7 while you focus on your business.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#cta" style={{ background: B, color: "#fff", padding: "14px 26px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 2px 16px rgba(43,127,255,0.3)" }}>Get Started →</a>
              <a href="#how" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", padding: "13px 22px", borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>See How It Works</a>
            </div>
          </div>
        </FI>
        <FI delay={0.1}>
          <svg width="100%" viewBox="0 0 400 300" fill="none">
            <rect x="0" y="0" width="400" height="300" rx="16" fill={BG3} stroke="rgba(255,255,255,0.07)" />
            <rect x="20" y="20" width="230" height="52" rx="10" fill="rgba(43,127,255,0.05)" stroke="rgba(43,127,255,0.1)" />
            <text x="36" y="42" fill="rgba(255,255,255,0.5)" fontSize="9" fontWeight="600" fontFamily="sans-serif">We miss you! Here's 20% off</text>
            <text x="36" y="58" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="sans-serif">SMS · Sent to 847 customers</text>
            <rect x="20" y="82" width="230" height="52" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
            <text x="36" y="104" fill="rgba(255,255,255,0.5)" fontSize="9" fontWeight="600" fontFamily="sans-serif">Welcome! Your first fold is free</text>
            <text x="36" y="120" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="sans-serif">Email · New customer welcome</text>
            <rect x="20" y="144" width="230" height="52" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
            <text x="36" y="166" fill="rgba(255,255,255,0.5)" fontSize="9" fontWeight="600" fontFamily="sans-serif">Holiday special: Free pickup today!</text>
            <text x="36" y="182" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="sans-serif">SMS · Promo blast · 2,100 sent</text>
            <rect x="280" y="30" width="100" height="65" rx="10" fill="rgba(43,127,255,0.06)" stroke="rgba(43,127,255,0.12)" />
            <text x="330" y="58" textAnchor="middle" fill={B} fontSize="22" fontWeight="800" fontFamily="sans-serif">42%</text>
            <text x="330" y="78" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="sans-serif">Open rate</text>
            <rect x="280" y="105" width="100" height="65" rx="10" fill="rgba(43,127,255,0.06)" stroke="rgba(43,127,255,0.12)" />
            <text x="330" y="133" textAnchor="middle" fill={B} fontSize="22" fontWeight="800" fontFamily="sans-serif">$36</text>
            <text x="330" y="153" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="sans-serif">Return per $1</text>
            <rect x="20" y="216" width="360" height="8" rx="4" fill="rgba(255,255,255,0.04)" />
            <rect x="20" y="216" width="250" height="8" rx="4" fill={B} opacity=".35" />
            <text x="20" y="244" fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="sans-serif">847 / 1,200 customers re-engaged this month</text>
            <rect x="20" y="260" width="100" height="24" rx="7" fill="rgba(43,127,255,0.08)" />
            <text x="70" y="276" textAnchor="middle" fill={B} fontSize="9" fontWeight="700" fontFamily="sans-serif">Automated</text>
            <rect x="130" y="260" width="100" height="24" rx="7" fill="rgba(43,127,255,0.08)" />
            <text x="180" y="276" textAnchor="middle" fill={B} fontSize="9" fontWeight="700" fontFamily="sans-serif">Segmented</text>
            <rect x="240" y="260" width="100" height="24" rx="7" fill="rgba(43,127,255,0.08)" />
            <text x="290" y="276" textAnchor="middle" fill={B} fontSize="9" fontWeight="700" fontFamily="sans-serif">Personalized</text>
          </svg>
        </FI>
      </div>
    </div>
  </section>);
}

function CaseStudy() {
  return (<section style={{ background: BG2, padding: "70px 24px" }}>
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <FI><p style={{ color: B, fontWeight: 700, fontSize: 13, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 24, textAlign: "center" }}>Why email & SMS</p></FI>
      <div className="csg detail-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        <FI>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 26px" }}>
            <div style={{ fontSize: 24, marginBottom: 14 }}>🔄</div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Re-activate lapsed customers</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
              Automatically find customers who haven't visited in 30, 60, or 90 days and bring them back with personalized offers.
            </p>
          </div>
        </FI>
        <FI delay={0.05}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 26px" }}>
            <div style={{ fontSize: 24, marginBottom: 14 }}>👋</div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Automate welcome sequences</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
              New customers get a 3-5 message sequence introducing your services and offering an incentive for their next visit.
            </p>
          </div>
        </FI>
        <FI delay={0.1}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 26px" }}>
            <div style={{ fontSize: 24, marginBottom: 14 }}>🎉</div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Promote specials and offers</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
              Holiday specials, seasonal offers, and flash sales to your full list or targeted segments at the perfect time.
            </p>
          </div>
        </FI>
        <FI delay={0.15}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 26px" }}>
            <div style={{ fontSize: 24, marginBottom: 14 }}>📊</div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Track opens, clicks, and conversions</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
              Every campaign includes metrics so you see what's working, what isn't, and where the revenue is coming from.
            </p>
          </div>
        </FI>
      </div>
    </div>
  </section>);
}

function Campaigns() {
  return (<section id="how" style={{ background: BG, padding: "80px 24px" }}>
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <FI><h2 style={{ fontSize: "clamp(24px,3vw,34px)", fontWeight: 800, color: "#fff", marginBottom: 36, textAlign: "center" }}>Campaigns we run for you</h2></FI>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
        {[
          ["🔄", "Win-back campaigns", "Automatically find customers who haven't visited in 30, 60, or 90 days and send a personalized offer to bring them back."],
          ["👋", "Welcome sequences", "New customers get a 3-5 message sequence introducing your services and offering an incentive for their next visit."],
          ["🎉", "Promotional blasts", "Holiday specials, seasonal offers, and flash sales to your full list or targeted segments at the perfect time."],
          ["📅", "Recurring reminders", "Weekly or bi-weekly touchpoints that keep your laundromat top of mind. Useful tips plus soft offers."],
          ["⭐", "Review requests", "After visits, customers automatically get an SMS asking for a Google review. Building your reputation on autopilot."],
          ["📊", "Performance tracking", "Every campaign includes open rates, click rates, conversions, and revenue generated. So you see what's working."],
        ].map(([icon, title, desc], i) => (
          <FI key={i} delay={i * 0.05}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "24px 22px" }}>
              <span style={{ fontSize: 22 }}>{icon}</span>
              <h3 style={{ fontSize: 15, fontWeight: 720, color: "#fff", marginTop: 10, marginBottom: 6 }}>{title}</h3>
              <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{desc}</p>
            </div>
          </FI>
        ))}
      </div>
    </div>
  </section>);
}

function WhoThisIsFor() {
  return (<section style={{ background: BG2, padding: "80px 24px" }}>
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <FI>
        <h2 style={{ fontSize: "clamp(24px,3vw,32px)", fontWeight: 800, color: "#fff", marginBottom: 14, textAlign: "center" }}>Who this works best for</h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", textAlign: "center", maxWidth: 520, margin: "0 auto 32px" }}>Email & SMS delivers the strongest ROI for these laundromats:</p>
      </FI>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        {[
          ["📋", "Existing customer base", "If your POS has 500+ contacts, you're sitting on a goldmine. We turn that list into repeat revenue."],
          ["🚚", "Pickup & delivery", "Welcome sequences + re-engagement texts keep your P&D pipeline full month after month."],
          ["🏪", "High-traffic self-service", "Hundreds of customers walk through monthly but you have no way to reach them. We fix that."],
          ["📈", "Retention-focused owners", "Getting new customers is great. Keeping them is 5x cheaper. Email & SMS is the retention engine."],
        ].map(([icon, title, desc], i) => (
          <FI key={i} delay={i * 0.04}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px 18px" }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <h3 style={{ fontSize: 14, fontWeight: 720, color: "#fff", marginTop: 8, marginBottom: 4 }}>{title}</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.55 }}>{desc}</p>
            </div>
          </FI>
        ))}
      </div>
    </div>
  </section>);
}

function MidCTA() {
  return (<section style={{ background: BG, padding: "60px 24px" }}>
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <FI>
        <div style={{ background: "rgba(43,127,255,0.04)", border: "1px solid rgba(43,127,255,0.12)", borderRadius: 18, padding: "32px 28px", display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }} className="mcta">
          <div style={{ flex: 1, minWidth: 260 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Your POS data is a goldmine</h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: 0 }}>
              We connect to your existing system, identify lapsed customers, and bring them back with automated campaigns. No manual work required.
            </p>
          </div>
          <a href="#cta" style={{ background: B, color: "#fff", padding: "14px 24px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none", boxShadow: "0 2px 14px rgba(43,127,255,0.25)", whiteSpace: "nowrap" }}>Free Marketing Audit →</a>
        </div>
      </FI>
    </div>
  </section>);
}

function Objections() {
  return (<section style={{ background: BG2, padding: "80px 24px" }}>
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <FI>
        <h2 style={{ fontSize: "clamp(24px,3vw,32px)", fontWeight: 800, color: "#fff", marginBottom: 20, textAlign: "center" }}>
          "My customers already get too many texts and emails"
        </h2>
      </FI>
      <FI delay={0.05}>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 20 }}>
          This is the most common concern we hear. And it makes sense. Nobody wants to be annoying. But here's the difference: a random promotional blast to everyone IS annoying. A personalized "we miss you" text to someone who hasn't visited in 30 days with a specific offer? That feels like a personal invitation.
        </p>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 20 }}>
          The key is segmentation and timing. We don't blast your entire list with the same message. We send the right message to the right person at the right time. A new customer gets a welcome sequence. A lapsed customer gets a win-back offer. A VIP gets early access to a promotion. Each message feels relevant because it IS relevant.
        </p>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
          The proof is in the numbers: our unsubscribe rates average 0.4%. Well below the 1-2% industry standard. Customers don't leave because the messages add value to their lives.
        </p>
      </FI>
    </div>
  </section>);
}

function FAQ() {
  const [open, setOpen] = useState(null);
  const Q = [
    ["How do you build my list?", "We integrate with your POS to capture data automatically. We also set up QR codes, review flows, and lead magnets that grow your list organically."],
    ["What kind of results should I expect?", "Our clients see 30-45% open rates on SMS, 25-35% on email, and a measurable increase in repeat visits within the first month. Email ROI averages $36 per $1 spent."],
    ["Do I have to write the messages?", "No. We write all copy, design emails, and set up automation. You approve campaigns before they go live."],
    ["Can I use my existing customer list?", "Absolutely. We'll import your POS data, clean it up, and start campaigns immediately."],
    ["How is this different from Mailchimp or Constant Contact?", "Those tools give you a platform. We give you a strategy, custom copy, segmentation, automation, and ongoing optimization. All managed for you. You don't have to learn or run anything."],
  ];
  return (<section style={{ background: BG, padding: "80px 24px" }}>
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <FI><h2 style={{ fontSize: "clamp(24px,3vw,32px)", fontWeight: 800, color: "#fff", marginBottom: 36, textAlign: "center" }}>Your questions, answered</h2></FI>
      {Q.map(([q, a], i) => (
        <FI key={i} delay={i * 0.03}>
          <div onClick={() => setOpen(open === i ? null : i)} style={{ background: open === i ? "rgba(43,127,255,0.04)" : "rgba(255,255,255,0.03)", border: `1px solid ${open === i ? "rgba(43,127,255,0.2)" : "rgba(255,255,255,0.06)"}`, borderRadius: 12, marginBottom: 8, cursor: "pointer", transition: "all .25s" }}>
            <div style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14 }}>
              <h3 style={{ fontSize: 14, fontWeight: 640, color: "#fff", margin: 0 }}>{q}</h3>
              <span style={{ width: 24, height: 24, borderRadius: 6, background: open === i ? B : "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: open === i ? "#fff" : "rgba(255,255,255,0.3)", fontSize: 15, transition: "all .2s" }}>
                <span style={{ transform: open === i ? "rotate(45deg)" : "none", transition: "transform .2s", display: "block" }}>+</span>
              </span>
            </div>
            {open === i && <div style={{ padding: "0 18px 14px" }}><p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: 0 }}>{a}</p></div>}
          </div>
        </FI>
      ))}
    </div>
  </section>);
}

function CTA() {
  return (<section id="cta" style={{ background: BG2, padding: "90px 24px" }}>
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <FI>
        <div style={{ background: "linear-gradient(135deg, rgba(43,127,255,0.1), rgba(43,127,255,0.03))", border: "1px solid rgba(43,127,255,0.18)", borderRadius: 20, padding: "clamp(36px,6vw,56px) clamp(24px,5vw,44px)", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(24px,4vw,34px)", fontWeight: 800, color: "#fff", marginBottom: 12 }}>Ready to re-engage your customers?</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", maxWidth: 440, margin: "0 auto 20px", lineHeight: 1.6 }}>Book a free call and we'll map out an email & SMS strategy tailored to your laundromat.</p>
          <a href="/contact" style={{ display: "inline-block", background: B, color: "#fff", padding: "14px 30px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 20px rgba(43,127,255,0.3)" }}>Free Marketing Audit →</a>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 14, fontStyle: "italic" }}>No contracts. No commitment. Just a clear plan for your email & SMS strategy.</p>
        </div>
      </FI>
    </div>
  </section>);
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

export default function EmailSMSPage() {
  return (<div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: BG, minHeight: "100vh" }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}body{background:#07090D;overflow-x:hidden}
      ::selection{background:rgba(43,127,255,0.25)}
      .mobile-menu-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(7,9,13,0.95);backdrop-filter:blur(10px);z-index:200;display:flex;align-items:flex-start}
      .mobile-menu-overlay>div{width:100%;max-width:90%;padding:100px 24px 40px;color:#fff;font-size:16px;line-height:1.5;overflow-y:auto}
      @media(max-width:768px){.dn{display:none!important}.hg,.csg{grid-template-columns:1fr!important}.mcta{flex-direction:column;text-align:center}.mobile-menu-btn{display:flex!important}}
    `}</style>
    <Nav /><Hero /><CaseStudy /><Campaigns /><WhoThisIsFor /><MidCTA /><Objections /><FAQ /><CTA /><Footer />
  </div>);
}

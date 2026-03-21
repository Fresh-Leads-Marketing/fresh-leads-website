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

const P = (t, mb = 16) => ({ fontSize: 15.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: mb });
const H2 = { fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 14, marginTop: 40, lineHeight: 1.2 };
const H3 = { fontSize: 19, fontWeight: 740, color: "#fff", marginBottom: 10, marginTop: 28, lineHeight: 1.25 };
const TIP = { background: "rgba(43,127,255,0.04)", border: "1px solid rgba(43,127,255,0.12)", borderRadius: 12, padding: "20px 22px", marginBottom: 20, marginTop: 20 };

function Article() {
  return <section style={{ background: BG, padding: "130px 24px 40px" }}>
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <FI>
        <a href="/blog" style={{ color: B, fontSize: 13, fontWeight: 600, textDecoration: "none", marginBottom: 20, display: "inline-block" }}>← Back to blog</a>

        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          <span style={{ background: "rgba(43,127,255,0.08)", color: B, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 6 }}>Advertising</span>
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, fontWeight: 550, padding: "4px 0" }}>5 min read</span>
        </div>

        <h1 style={{ fontSize: "clamp(28px,4.5vw,42px)", fontWeight: 800, color: "#fff", lineHeight: 1.12, letterSpacing: "-.03em", marginBottom: 16 }}>
          7 Geo-Fencing Strategies That Drive Foot Traffic to Your Laundromat
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(43,127,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: B }}>F</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>Fresh Leads Marketing</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Mar 10, 2026</div>
          </div>
        </div>
      </FI>

      <FI delay={0.05}>
        <p style={P("", 20)}>
          Geo-fencing is one of the most powerful. And underused. tools in a laundromat owner's marketing arsenal. By creating virtual boundaries around specific locations, you can serve targeted ads to people who are physically near your business, your competitors, or high-traffic areas in your neighborhood.
        </p>
        <p style={P("")}>
          We've used these strategies across 125+ laundromats and consistently see 2-4x return on ad spend. Here are the 7 that work best.
        </p>

        <div style={TIP}>
          <p style={{ fontSize: 13, fontWeight: 700, color: B, marginBottom: 6 }}>💡 What is geo-fencing?</p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, margin: 0 }}>
            Geo-fencing creates a virtual perimeter around a real-world location. When someone with a mobile device enters that zone, they become eligible to see your ads on Facebook, Instagram, and Google. You only pay when they actually engage.
          </p>
        </div>

        <h2 style={H2}>1. Fence your own location (the basics)</h2>
        <p style={P("")}>
          Start with a 1-3 mile radius around your laundromat. This catches people who live, work, or commute near your location. The people most likely to become regular customers. Run a simple offer: "First wash free" or "20% off wash & fold this week."
        </p>
        <p style={P("")}>
          This is table stakes, but most laundromats still don't do it. If you're not running location-targeted ads around your own business, you're leaving money on the table.
        </p>

        <h2 style={H2}>2. Fence your competitors</h2>
        <p style={P("")}>
          This is where it gets interesting. You can target a zone around every competing laundromat within 5-10 miles. When someone visits a competitor, they start seeing your ads. Often with a better offer or a highlight of something you do that they don't (like pickup & delivery).
        </p>
        <p style={P("")}>
          It's legal, it's ethical, and it works. We've seen clients gain 15-20% of their new customers this way.
        </p>

        <h2 style={H2}>3. Target apartment complexes</h2>
        <p style={P("")}>
          Large apartment buildings. Especially ones without in-unit laundry. are goldmines. Draw a fence around complexes within 3 miles of your store and run ads highlighting convenience, extended hours, or free WiFi while they wait.
        </p>

        <h2 style={H2}>4. Fence colleges and universities</h2>
        <p style={P("")}>
          Students are a massive, underserved market. Most have no car, limited time, and zero interest in doing laundry. Target campus housing with wash & fold and pickup/delivery offers. The student demographic responds especially well to SMS and Instagram ads.
        </p>

        <h2 style={H2}>5. Hit high-traffic retail zones</h2>
        <p style={P("")}>
          Shopping centers, grocery stores, and big-box retailers within your radius bring thousands of people through every day. A fence around these areas catches people who are already out running errands and might add a laundry stop to their trip.
        </p>

        <h2 style={H2}>6. Layer with retargeting</h2>
        <p style={P("")}>
          Someone entered your geo-fence and saw your ad but didn't come in? Retarget them for the next 7-14 days with a follow-up offer. This second touch converts at 2-3x the rate of the first impression because they already know your name.
        </p>

        <div style={TIP}>
          <p style={{ fontSize: 13, fontWeight: 700, color: B, marginBottom: 6 }}>📊 Real result</p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, margin: 0 }}>
            One of our clients in Phoenix added retargeting to their geo-fence campaigns and saw cost per lead drop from $8.40 to $3.20. A 62% reduction. in the first 30 days.
          </p>
        </div>

        <h2 style={H2}>7. Use time-of-day targeting</h2>
        <p style={P("")}>
          Not all hours are equal. If your laundromat is busiest on Saturday mornings and slowest on Tuesday afternoons, shift your ad budget to push traffic during slow periods. "Tuesday special: 25% off all services" fills seats when you need it most.
        </p>
        <p style={P("")}>
          Combine this with geo-fencing and you're showing the right offer, to the right person, at the right time, in the right place. That's when ROI goes through the roof.
        </p>

        <h2 style={H2}>Getting started</h2>
        <p style={P("", 24)}>
          You can run basic geo-fencing ads yourself through Facebook and Google Ads, but the real power comes from layering multiple strategies together. Competitor fencing + retargeting + time-of-day optimization + apartment targeting. That's what turns a good campaign into a great one.
        </p>
        <p style={P("", 32)}>
          If you'd rather have experts handle it, that's literally what we do. We manage geo-fencing ad campaigns for 125+ laundromats across the country and we'd love to show you what's possible in your market.
        </p>
      </FI>

      <FI delay={0.1}>
        <div style={{ background: "linear-gradient(135deg, rgba(43,127,255,0.08), rgba(43,127,255,0.03))", border: "1px solid rgba(43,127,255,0.15)", borderRadius: 16, padding: "28px 28px", textAlign: "center", marginBottom: 40 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Want us to run geo-fencing ads for your laundromat?</h3>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginBottom: 18 }}>Book a free discovery call and we'll audit your market.</p>
          <a href="/contact" style={{ display: "inline-block", background: B, color: "#fff", padding: "12px 24px", borderRadius: 9, fontWeight: 700, fontSize: 14, textDecoration: "none", boxShadow: "0 2px 14px rgba(43,127,255,0.25)" }}>Schedule a Call →</a>
        </div>
      </FI>
    </div>
  </section>;
}

function RelatedPosts() {
  const posts = [
    { title: "How to Set Up Geo-Fencing Around Your Competitors", cat: "Advertising", read: "4 min" },
    { title: "The 5 Biggest Marketing Mistakes Laundromat Owners Make", cat: "Strategy", read: "5 min" },
    { title: "Email Marketing for Laundromats: The Complete 2026 Playbook", cat: "Email & SMS", read: "8 min" },
  ];
  return <section style={{ background: BG2, padding: "60px 24px" }}>
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <FI>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 20 }}>Related articles</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {posts.map((p, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "18px 20px", cursor: "pointer", transition: "border-color .2s", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(43,127,255,0.2)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}>
              <div>
                <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                  <span style={{ background: "rgba(43,127,255,0.08)", color: B, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>{p.cat}</span>
                  <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 10 }}>{p.read}</span>
                </div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: 0 }}>{p.title}</h4>
              </div>
              <span style={{ color: B, fontSize: 16, flexShrink: 0 }}>→</span>
            </div>
          ))}
        </div>
      </FI>
    </div>
  </section>;
}

function Newsletter() {
  return <section style={{ background: BG, padding: "60px 24px" }}>
    <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
      <FI>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Get tips like this in your inbox</h3>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 18 }}>Weekly laundromat marketing strategies. No spam.</p>
        <div style={{ display: "flex", gap: 8 }}>
          <input type="email" placeholder="your@email.com" style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9, padding: "11px 14px", color: "#fff", fontSize: 13, fontFamily: "'DM Sans', sans-serif", outline: "none" }} />
          <button style={{ background: B, color: "#fff", border: "none", borderRadius: 9, padding: "11px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Subscribe</button>
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
            <div>📧 <a href="mailto:info@freshleadsmarketing.com" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>info@freshleadsmarketing.com</a></div>
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

export default function BlogPost() {
  return <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: BG, minHeight: "100vh" }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
      *{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}body{background:#07090D;overflow-x:hidden}
      ::selection{background:rgba(43,127,255,0.25)}
      input::placeholder{color:rgba(255,255,255,0.2)}
      @media(max-width:768px){.dn{display:none!important}.mobile-menu-btn{display:flex!important}}
    `}</style>
    <Nav />
    <Article />
    <RelatedPosts />
    <Newsletter />
    <Footer />
  </div>;
}

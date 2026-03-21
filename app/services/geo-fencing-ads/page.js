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

function FI({ children, delay = 0 }) {
  const [r, v] = useV();
  return (
    <div ref={r} style={{
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
  return (
    <section style={{ background: BG, padding: "130px 24px 70px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(43,127,255,0.07) 0%, transparent 60%)" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <div className="hg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 44, alignItems: "center" }}>
          <FI>
            <div>
              <a href="/services" style={{ color: B, fontSize: 13, fontWeight: 600, textDecoration: "none", display: "inline-block", marginBottom: 16 }}>← All Services</a>
              <span style={{ fontSize: 32, display: "block", marginBottom: 12 }}>📍</span>
              <h1 style={{ fontSize: "clamp(30px,4.5vw,46px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-.03em", marginBottom: 16 }}>
                Google & Facebook Ads for <span style={{ color: B }}>Laundromats</span>
              </h1>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, marginBottom: 28 }}>
                We run hyper-targeted ad campaigns across Google, Facebook, and Instagram using geo-fencing technology. Each platform plays a different role in driving foot traffic, building awareness, and converting customers for your laundromat.
              </p>
              <div className="hero-cta" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="#cta" style={{ background: B, color: "#fff", padding: "14px 26px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 2px 16px rgba(43,127,255,0.3)" }}>
                  Get a Free Ad Strategy →
                </a>
                <a href="#platforms" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", padding: "13px 22px", borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
                  Compare Platforms
                </a>
              </div>
            </div>
          </FI>

          <FI delay={0.1}>
            <svg width="100%" viewBox="0 0 400 300" fill="none">
              <rect x="0" y="0" width="400" height="300" rx="16" fill={BG3} stroke="rgba(255,255,255,0.07)" />
              <circle cx="200" cy="130" r="90" fill="rgba(43,127,255,0.03)" stroke="rgba(43,127,255,0.08)" strokeDasharray="4 4" />
              <circle cx="200" cy="130" r="55" fill="rgba(43,127,255,0.05)" stroke="rgba(43,127,255,0.14)" />
              <circle cx="200" cy="130" r="10" fill={B} />
              <text x="200" y="134" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="sans-serif">YOU</text>
              <circle cx="240" cy="95" r="5" fill="#EF4444" opacity=".6" />
              <text x="252" y="98" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="sans-serif">Rival</text>
              <circle cx="160" cy="160" r="5" fill="#EF4444" opacity=".6" />
              <text x="128" y="163" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="sans-serif">Rival</text>
              <circle cx="230" cy="165" r="3" fill={B} opacity=".3" />
              <circle cx="170" cy="100" r="3" fill={B} opacity=".3" />
              <rect x="30" y="240" width="105" height="42" rx="10" fill="rgba(43,127,255,0.06)" stroke="rgba(43,127,255,0.12)" />
              <text x="82" y="258" textAnchor="middle" fill={B} fontSize="16" fontWeight="800" fontFamily="sans-serif">3x</text>
              <text x="82" y="274" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="sans-serif">Avg. ROI</text>
              <rect x="148" y="240" width="105" height="42" rx="10" fill="rgba(43,127,255,0.06)" stroke="rgba(43,127,255,0.12)" />
              <text x="200" y="258" textAnchor="middle" fill={B} fontSize="16" fontWeight="800" fontFamily="sans-serif">$4-8</text>
              <text x="200" y="274" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="sans-serif">Cost per lead</text>
              <rect x="266" y="240" width="105" height="42" rx="10" fill="rgba(43,127,255,0.06)" stroke="rgba(43,127,255,0.12)" />
              <text x="318" y="258" textAnchor="middle" fill={B} fontSize="16" fontWeight="800" fontFamily="sans-serif">30 days</text>
              <text x="318" y="274" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="sans-serif">To see results</text>
            </svg>
          </FI>
        </div>
      </div>
    </section>
  );
}

function PlatformOverview() {
  return (
    <section id="platforms" style={{ background: BG2, padding: "80px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FI>
          <p style={{ color: B, fontWeight: 700, fontSize: 13, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 12, textAlign: "center" }}>Two platforms, one strategy</p>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 800, color: "#fff", marginBottom: 14, textAlign: "center" }}>
            Why your laundromat needs <span style={{ color: B }}>both</span> Google and Facebook ads
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", textAlign: "center", maxWidth: 560, margin: "0 auto 36px", lineHeight: 1.65 }}>
            Google captures people actively searching for a laundromat. Facebook and Instagram build awareness with people who live nearby but haven't thought about your business yet. Together, they cover every stage of the customer journey.
          </p>
        </FI>
        <div className="csg detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <FI>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 26px", height: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(66,133,244,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🔍</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>Google Ads</h3>
              </div>
              <p style={{ fontSize: 14, color: B, fontWeight: 600, marginBottom: 10 }}>Best for: Capturing high-intent customers</p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, marginBottom: 18 }}>
                When someone searches "laundromat near me" or "wash and fold service," they're ready to visit. Google Ads puts your business at the top of those searches so you're the first option they see, not your competitor down the street.
              </p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 10 }}>Google Ads strengths</p>
                {["Captures people actively searching for laundry services", "Shows your business on Google Maps and local results", "Targets by zip code, radius, and neighborhood", "Pay only when someone clicks or calls", "Drives immediate phone calls and direction requests"].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
                    <span style={{ color: "#22C55E", fontSize: 11, marginTop: 2, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FI>

          <FI delay={0.08}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 26px", height: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(59,89,152,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📱</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>Facebook & Instagram Ads</h3>
              </div>
              <p style={{ fontSize: 14, color: B, fontWeight: 600, marginBottom: 10 }}>Best for: Building awareness and stealing competitor traffic</p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, marginBottom: 18 }}>
                Most people don't search for a laundromat until they need one. Facebook and Instagram let you reach nearby residents before that moment, so when they do need laundry service, your name is already top of mind. Paired with geo-fencing, you can target people who visit competitor locations.
              </p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 10 }}>Facebook & Instagram strengths</p>
                {["Geo-fence competitor locations and nearby apartments", "Eye-catching photo and video ads in the feed and stories", "Target by location, age, interests, and behaviors", "Retarget people who visited your website but didn't convert", "Build brand recognition in your neighborhood over time"].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
                    <span style={{ color: "#22C55E", fontSize: 11, marginTop: 2, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FI>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" style={{ background: BG, padding: "80px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FI>
          <h2 style={{ fontSize: "clamp(24px,3vw,34px)", fontWeight: 800, color: "#fff", marginBottom: 14, textAlign: "center" }}>
            How we run ads for your laundromat
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", textAlign: "center", maxWidth: 540, margin: "0 auto 36px", lineHeight: 1.6 }}>
            We build a complete advertising strategy across Google, Facebook, and Instagram. Each platform plays a specific role in driving new customers to your door.
          </p>
        </FI>
        <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
          {[
            ["🔍", "Google Search & Maps", "We target high-intent keywords like 'laundromat near me' and 'wash and fold service' so your business appears first when customers are actively searching."],
            ["📐", "Geo-fencing setup", "We draw virtual boundaries around competitor locations, apartment complexes, and high-traffic areas. Anyone who enters those zones becomes eligible to see your ads on Facebook and Instagram."],
            ["📱", "Social media ads", "Scroll-stopping creative on Facebook and Instagram that builds awareness in your neighborhood. We test multiple ad formats including feed posts, stories, reels, and lead forms."],
            ["🔄", "Retargeting & optimization", "We retarget website visitors who didn't convert and continuously optimize every campaign based on real performance data. Your ads get smarter every week."],
          ].map(([icon, title, desc], i) => (
            <FI key={i} delay={i * 0.06}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "24px 20px", textAlign: "center" }}>
                <span style={{ fontSize: 24 }}>{icon}</span>
                <h3 style={{ fontSize: 14, fontWeight: 720, color: "#fff", marginTop: 10, marginBottom: 6 }}>{title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.55 }}>{desc}</p>
              </div>
            </FI>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhichPlatformForWhat() {
  return (
    <section style={{ background: BG2, padding: "80px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <FI>
          <h2 style={{ fontSize: "clamp(24px,3vw,32px)", fontWeight: 800, color: "#fff", marginBottom: 14, textAlign: "center" }}>
            Which platform is right for your goals?
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", textAlign: "center", maxWidth: 540, margin: "0 auto 36px", lineHeight: 1.6 }}>
            Different goals call for different platforms. Here's how we match each platform to what your laundromat needs most.
          </p>
        </FI>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }} className="svc-grid">
          {[
            ["🔍", "More phone calls and visits", "Google Ads", "People searching 'laundromat near me' are ready to visit right now. Google puts you at the top of those results so you capture customers at the moment of intent."],
            ["📍", "Steal competitor customers", "Facebook + Geo-fencing", "We geo-fence your competitors so their visitors see your ads on Facebook and Instagram. They walked into the wrong laundromat, and now they know about yours."],
            ["🏠", "Reach nearby residents", "Facebook & Instagram", "Target people within a few miles of your location based on where they live, their age, and their interests. Build awareness before they even need laundry service."],
            ["🚚", "Fill your pickup & delivery", "Google + Facebook", "Google captures people searching for pickup and delivery. Facebook targets apartment complexes and busy professionals who would love the convenience."],
            ["🔄", "Bring back website visitors", "Retargeting ads", "Someone visited your site but didn't call? We show them follow-up ads on both Google and Facebook to bring them back and convert."],
            ["📊", "Maximize every dollar", "Full platform strategy", "We allocate your budget across platforms based on real data. If Google is driving calls at $5 each and Facebook at $8, we shift spend accordingly."],
          ].map(([icon, goal, platform, desc], i) => (
            <FI key={i} delay={i * 0.04}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px 18px" }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <h3 style={{ fontSize: 14, fontWeight: 720, color: "#fff", marginTop: 8, marginBottom: 2 }}>{goal}</h3>
                <p style={{ fontSize: 12, color: B, fontWeight: 600, marginBottom: 6 }}>{platform}</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.55 }}>{desc}</p>
              </div>
            </FI>
          ))}
        </div>
      </div>
    </section>
  );
}

function MidCTA() {
  return (
    <section style={{ background: BG, padding: "60px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <FI>
          <div style={{ background: "rgba(43,127,255,0.04)", border: "1px solid rgba(43,127,255,0.12)", borderRadius: 18, padding: "32px 28px", display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }} className="mcta">
            <div style={{ flex: 1, minWidth: 260 }}>
              <p style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
                Not sure which platform is right for you?
              </p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                We'll analyze your market, your competition, and your goals to build a custom ad strategy across Google and Facebook. No commitment required.
              </p>
            </div>
            <a href="/contact" style={{ background: B, color: "#fff", padding: "14px 24px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none", boxShadow: "0 2px 14px rgba(43,127,255,0.25)", whiteSpace: "nowrap" }}>
              Free Marketing Audit →
            </a>
          </div>
        </FI>
      </div>
    </section>
  );
}

function Objections() {
  return (
    <section style={{ background: BG2, padding: "80px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <FI>
          <h2 style={{ fontSize: "clamp(24px,3vw,32px)", fontWeight: 800, color: "#fff", marginBottom: 36, textAlign: "center" }}>
            "I've tried ads before and they didn't work"
          </h2>
        </FI>
        <FI delay={0.05}>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 20, maxWidth: 650, margin: "0 auto 20px" }}>
            We hear this a lot. And almost every time, the issue is the same: the previous agency ran generic campaigns that weren't built for laundromats. They targeted "everyone in the city," used stock photos, and wrote ad copy that could apply to any local business.
          </p>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 20, maxWidth: 650, margin: "0 auto 20px" }}>
            That's not what we do. On Google, we target the exact keywords laundromat customers search for and optimize your listing so you show up in Maps. On Facebook and Instagram, we use geo-fencing to reach people near your location and competitors with creative designed specifically for the laundry industry.
          </p>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 650, margin: "0 auto" }}>
            The difference between "boosting a post" and running a professional multi-platform campaign is like the difference between putting a flyer on a windshield and having a salesperson hand-deliver the right offer to the right person at the right time.
          </p>
        </FI>

        <FI delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 36, maxWidth: 650, margin: "36px auto 0" }} className="og">
            <div style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)", borderRadius: 14, padding: "22px 20px" }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "#EF4444", marginBottom: 10 }}>What generic agencies do</h4>
              {["Target entire city on one platform", "Stock photo ads", "Generic ad copy", "Set it and forget it", "No platform-specific strategy"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                  <span style={{ color: "#EF4444", fontSize: 11 }}>✕</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.12)", borderRadius: 14, padding: "22px 20px" }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "#22C55E", marginBottom: 10 }}>What Fresh Leads does</h4>
              {["Google + Facebook + Instagram together", "Laundromat-specific creative", "Geo-fencing on competitors and apartments", "Weekly optimization on every platform", "Transparent cross-platform reporting"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                  <span style={{ color: "#22C55E", fontSize: 11 }}>✓</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </FI>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  const questions = [
    ["How much should I budget for ad spend?", "We recommend starting with $300-1,000/month in ad spend on top of our management fee, with the ability to increase your budget after analyzing your market data and initial results. We'll recommend a specific budget split across Google and Facebook based on your market size and goals. Even $300/month generates meaningful results in most markets."],
    ["How quickly will I see results?", "Google Ads can generate calls and visits within the first week since you're targeting people actively searching. Facebook and Instagram typically take 2-4 weeks to build momentum as the algorithm learns your audience. By month 2-3, both platforms are fully optimized."],
    ["Do I need to be on both Google and Facebook?", "We strongly recommend it. Google captures people who are ready to visit a laundromat right now. Facebook builds awareness and reaches people before they start searching. Together they create a complete marketing system."],
    ["What is geo-fencing and is it legal?", "Geo-fencing draws a virtual boundary around a location, like a competitor's laundromat or an apartment complex. When someone enters that zone, they become eligible to see your ads on Facebook and Instagram. It's completely legal and one of our most effective strategies."],
    ["Do I need to provide ad creative?", "No. We handle everything across both platforms: ad design, copywriting, keyword research, audience targeting, and testing multiple variations to find what performs best in your market."],
    ["How do you decide where to spend my budget?", "We start with a recommended split based on your goals, then adjust weekly based on real data. If Google is driving calls at $5 each and Facebook at $8, we shift more budget to Google. Every dollar goes where it performs best."],
  ];

  return (
    <section style={{ background: BG, padding: "80px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <FI>
          <h2 style={{ fontSize: "clamp(24px,3vw,32px)", fontWeight: 800, color: "#fff", marginBottom: 36, textAlign: "center" }}>
            Your questions, answered
          </h2>
        </FI>
        {questions.map(([q, a], i) => (
          <FI key={i} delay={i * 0.03}>
            <div
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                background: open === i ? "rgba(43,127,255,0.04)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${open === i ? "rgba(43,127,255,0.2)" : "rgba(255,255,255,0.06)"}`,
                borderRadius: 12, marginBottom: 8, cursor: "pointer", transition: "all .25s",
              }}
            >
              <div style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14 }}>
                <h3 style={{ fontSize: 14, fontWeight: 640, color: "#fff", margin: 0 }}>{q}</h3>
                <span style={{
                  width: 24, height: 24, borderRadius: 6,
                  background: open === i ? B : "rgba(255,255,255,0.07)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, color: open === i ? "#fff" : "rgba(255,255,255,0.3)",
                  fontSize: 15, transition: "all .2s",
                }}>
                  <span style={{ transform: open === i ? "rotate(45deg)" : "none", transition: "transform .2s", display: "block" }}>+</span>
                </span>
              </div>
              {open === i && (
                <div style={{ padding: "0 18px 14px" }}>
                  <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: 0 }}>{a}</p>
                </div>
              )}
            </div>
          </FI>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" style={{ background: BG2, padding: "90px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <FI>
          <div style={{ background: "linear-gradient(135deg, rgba(43,127,255,0.1), rgba(43,127,255,0.03))", border: "1px solid rgba(43,127,255,0.18)", borderRadius: 20, padding: "clamp(36px,6vw,56px) clamp(24px,5vw,44px)", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(24px,4vw,34px)", fontWeight: 800, color: "#fff", marginBottom: 12 }}>
              Ready to grow your laundromat with ads?
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", maxWidth: 440, margin: "0 auto 20px", lineHeight: 1.6 }}>
              Book a free strategy call and we'll analyze your market, your competitors, and build a custom Google + Facebook ad plan for your laundromat.
            </p>
            <a href="/contact" style={{ display: "inline-block", background: B, color: "#fff", padding: "14px 30px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 20px rgba(43,127,255,0.3)" }}>
              Free Marketing Audit →
            </a>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 14 }}>
              No contracts. No commitment. Just a clear plan for your market.
            </p>
          </div>
        </FI>
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

export default function GeoFencingPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: BG, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #07090D; overflow-x: hidden; }
        ::selection { background: rgba(43,127,255,0.25); }
        @media (max-width: 768px) {
          .dn { display: none !important; }
          .hg, .csg, .og { grid-template-columns: 1fr !important; }
          .mcta { flex-direction: column; text-align: center; }
        }
      `}</style>
      <Nav />
      <Hero />
      <PlatformOverview />
      <HowItWorks />
      <WhichPlatformForWhat />
      <MidCTA />
      <Objections />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

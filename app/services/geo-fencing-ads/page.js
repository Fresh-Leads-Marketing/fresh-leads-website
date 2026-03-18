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

function Nav() {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(7,9,13,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <Logo />
        <div className="dn" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {["Home", "Services", "About", "Blog", "Contact"].map((l) => (
            <a key={l} href={l==="Home"?"/":l==="Services"?"/services":l==="About"?"/about":l==="Blog"?"/blog":"/contact"} style={{ color: l === "Services" ? "#fff" : "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13, fontWeight: l === "Services" ? 650 : 550 }}>{l}</a>
          ))}
          <a href="#cta" style={{ background: B, color: "#fff", padding: "9px 20px", borderRadius: 9, fontWeight: 650, fontSize: 13, textDecoration: "none" }}>Free Audit</a>
        </div>
      </div>
    </nav>
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
                Geo-Fencing Ads for <span style={{ color: B }}>Laundromats</span>
              </h1>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, marginBottom: 28 }}>
                We draw a virtual fence around your laundromat — and your competitors — then show targeted ads to everyone inside that zone on Facebook, Instagram, and Google. When someone drives past a competitor or enters your neighborhood, they see your offer.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="#cta" style={{ background: B, color: "#fff", padding: "14px 26px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 2px 16px rgba(43,127,255,0.3)" }}>
                  Get Started →
                </a>
                <a href="#how" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", padding: "13px 22px", borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
                  See How It Works
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

function CaseStudy() {
  return (
    <section style={{ background: BG2, padding: "70px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FI>
          <p style={{ color: B, fontWeight: 700, fontSize: 13, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 24, textAlign: "center" }}>Client results</p>
        </FI>
        <div className="csg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <FI>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 26px" }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
                {[1,2,3,4,5].map(s => <span key={s} style={{ color: "#F59E0B", fontSize: 12 }}>★</span>)}
              </div>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, marginBottom: 16 }}>
                "We were spending $2,000/month on ads with a generic agency and getting maybe 15 leads. Fresh Leads took the same budget, added geo-fencing around our 3 closest competitors, and we hit <span style={{ color: B, fontWeight: 700 }}>47 leads in month one</span>. By month three we were averaging 60+ leads at $4.80 each."
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(43,127,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: B }}>M</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Marcus T.</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>SpinCycle Laundromat · Houston, TX</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Before</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "rgba(255,255,255,0.4)" }}>15</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>leads/mo</div>
                </div>
                <div style={{ width: 1, background: "rgba(255,255,255,0.06)" }} />
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>After</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: B }}>60+</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>leads/mo</div>
                </div>
                <div style={{ width: 1, background: "rgba(255,255,255,0.06)" }} />
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Cost/lead</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#22C55E" }}>$4.80</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>from $12+</div>
                </div>
              </div>
            </div>
          </FI>

          <FI delay={0.08}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 26px" }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
                {[1,2,3,4,5].map(s => <span key={s} style={{ color: "#F59E0B", fontSize: 12 }}>★</span>)}
              </div>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, marginBottom: 16 }}>
                "The competitor geo-fencing was a game-changer. There's a laundromat two blocks away that had been stealing our customers for years. Within <span style={{ color: B, fontWeight: 700 }}>6 weeks of fencing their location</span>, we saw a noticeable increase in new faces coming through the door."
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(43,127,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: B }}>J</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Jennifer K.</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>CleanWave Laundry · Phoenix, AZ</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>New customers</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: B }}>+38%</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>in 90 days</div>
                </div>
                <div style={{ width: 1, background: "rgba(255,255,255,0.06)" }} />
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Ad spend</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#22C55E" }}>$800</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>/month</div>
                </div>
                <div style={{ width: 1, background: "rgba(255,255,255,0.06)" }} />
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>ROI</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: B }}>4.2x</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>return</div>
                </div>
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
          <h2 style={{ fontSize: "clamp(24px,3vw,34px)", fontWeight: 800, color: "#fff", marginBottom: 36, textAlign: "center" }}>
            How geo-fencing works for your laundromat
          </h2>
        </FI>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
          {[
            ["📐", "We draw boundaries", "Virtual fences around your laundromat, competitors, apartment complexes, and high-traffic areas."],
            ["📱", "Customers enter", "When someone with a phone enters your zone, they become eligible to see your ads."],
            ["🎯", "They see your ad", "A targeted offer on Facebook, Instagram, or Google — tested and optimized for laundromats."],
            ["🚶", "They walk in", "The right offer at the right time in the right place drives real foot traffic."],
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

function WhoThisIsFor() {
  return (
    <section style={{ background: BG2, padding: "80px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <FI>
          <h2 style={{ fontSize: "clamp(24px,3vw,32px)", fontWeight: 800, color: "#fff", marginBottom: 14, textAlign: "center" }}>
            Who geo-fencing works best for
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", textAlign: "center", maxWidth: 520, margin: "0 auto 32px" }}>
            Geo-fencing delivers the strongest results for these types of laundromats:
          </p>
        </FI>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {[
            ["🏙️", "Urban laundromats", "Multiple competitors within 5 miles. Competitor fencing steals market share fast."],
            ["🚚", "Pickup & delivery", "Geo-fence apartment complexes, offices, and neighborhoods to fill your P&D pipeline."],
            ["🏢", "Multi-location owners", "Run coordinated campaigns across all locations with market-specific targeting for each."],
            ["📈", "Growth-stage owners", "You've got a good laundromat but need a steady stream of new customers to hit the next level."],
            ["🏪", "Newly opened", "No existing customer base yet? Geo-fencing is the fastest way to build awareness and foot traffic."],
            ["🎓", "Near colleges", "Students are a massive, underserved market for wash & fold. Campus targeting works incredibly well."],
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
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: 4, fontStyle: "italic" }}>
                "I was skeptical about geo-fencing — it sounded too good to be true. Three months in, it's our best-performing marketing channel by far."
              </p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>— David R., FreshPress Laundry, Atlanta GA</p>
            </div>
            <a href="#cta" style={{ background: B, color: "#fff", padding: "14px 24px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none", boxShadow: "0 2px 14px rgba(43,127,255,0.25)", whiteSpace: "nowrap" }}>
              Get Your Free Audit →
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
            We hear this a lot. And almost every time, the issue is the same: the previous agency ran generic campaigns that weren't built for laundromats. They targeted "everyone in the city," used stock photo creative, and wrote ad copy that could apply to any business.
          </p>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 20, maxWidth: 650, margin: "0 auto 20px" }}>
            That's not what we do. Our campaigns are hyper-local (down to specific buildings and intersections), use creative designed specifically for the laundry industry, and are tested across 125+ laundromats so we already know what messaging converts.
          </p>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 650, margin: "0 auto" }}>
            The difference between "boosting a post" and running a real geo-fencing campaign is like the difference between putting a flyer on a windshield and having a salesperson hand-deliver an offer to the exact right person. Same budget, completely different results.
          </p>
        </FI>

        <FI delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 36, maxWidth: 650, margin: "36px auto 0" }} className="og">
            <div style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)", borderRadius: 14, padding: "22px 20px" }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "#EF4444", marginBottom: 10 }}>What generic agencies do</h4>
              {["Target entire city", "Stock photo ads", "Generic ad copy", "Set it and forget it", "Vague monthly reports"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                  <span style={{ color: "#EF4444", fontSize: 11 }}>✕</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.12)", borderRadius: 14, padding: "22px 20px" }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "#22C55E", marginBottom: 10 }}>What Fresh Leads does</h4>
              {["Geo-fence specific locations", "Laundromat-specific creative", "Tested copy from 125+ clients", "Weekly optimization", "Transparent ROI reporting"].map((item, i) => (
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
    ["How much should I budget for ad spend?", "Most clients start with $500-1,500/month in ad spend on top of our management fee. We recommend a specific budget based on your market size and competition. Even $500/month generates meaningful results in most markets."],
    ["How quickly will I see results?", "Most laundromats see first leads within 1-2 weeks. By month 2-3, we've gathered enough data to deeply optimize — that's when ROI typically hits 2-4x."],
    ["Can you really target people near my competitors?", "Yes. Competitor geo-fencing is completely legal and one of our most effective strategies. We draw fences around rival locations and serve your ads to their visitors."],
    ["What platforms do you run ads on?", "Primarily Facebook, Instagram, and Google. We choose the mix based on where your audience is most active and where cost per lead is lowest."],
    ["Do I need to provide ad creative?", "No — we handle everything: design, copywriting, and testing multiple variations to find what performs best in your market."],
    ["What if my area has very few competitors?", "That's actually easier. Less competition means cheaper ad costs and faster results. We'll focus on apartment targeting, college campuses, and high-traffic retail zones instead."],
  ];

  return (
    <section style={{ background: BG, padding: "80px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <FI>
          <h2 style={{ fontSize: "clamp(24px,3vw,32px)", fontWeight: 800, color: "#fff", marginBottom: 36, textAlign: "center" }}>
            Common questions about geo-fencing
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
              Ready to start geo-fencing?
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", maxWidth: 440, margin: "0 auto 20px", lineHeight: 1.6 }}>
              Book a free call and we'll show you exactly how it would work in your market — including a competitor analysis and projected results.
            </p>
            <a href="/contact" style={{ display: "inline-block", background: B, color: "#fff", padding: "14px 30px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 20px rgba(43,127,255,0.3)" }}>
              Schedule Your Free Audit →
            </a>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 14, fontStyle: "italic" }}>
              "Best marketing decision I've made for my laundromat." — Sarah M., Metro Wash Co.
            </p>
          </div>
        </FI>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: BG, padding: "32px 24px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <Logo />
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>© 2026 Fresh Leads Marketing</span>
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
      <CaseStudy />
      <HowItWorks />
      <WhoThisIsFor />
      <MidCTA />
      <Objections />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

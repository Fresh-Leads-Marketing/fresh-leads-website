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

function Nav() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(7,9,13,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.08)"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <Logo />
        <div style={{ display: "flex", alignItems: "center", gap: 24 }} className="dn">
          {["Home","Services", "About", "Blog", "Contact"].map(l => (
            <a key={l} href={l==="Home"?"/":l==="Services"?"/services":l==="About"?"/about":l==="Blog"?"/blog":"/contact"} style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13, fontWeight: 550 }}>{l}</a>
          ))}
          <a href="/contact" style={{ background: B, color: "#fff", padding: "9px 20px", borderRadius: 9, fontWeight: 650, fontSize: 13, textDecoration: "none" }}>Free Audit</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{ background: BG, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 65% 30%, rgba(43,127,255,0.07) 0%, transparent 60%)" }} />
      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "120px 24px 70px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
          <div>
            <Fade>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(43,127,255,0.08)", border: "1px solid rgba(43,127,255,0.15)", borderRadius: 50, padding: "5px 14px 5px 10px", marginBottom: 22 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: B }} />
                <span style={{ color: B2, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>Built exclusively for laundromats</span>
              </div>
            </Fade>
            <Fade delay={.05}>
              <h1 style={{ fontSize: "clamp(34px,5vw,58px)", fontWeight: 800, color: "#fff", lineHeight: 1.06, letterSpacing: "-0.035em", marginBottom: 18 }}>
                More customers. <span style={{ color: B }}>More revenue.</span><br />For your laundromat.
              </h1>
            </Fade>
            <Fade delay={.1}>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 460, lineHeight: 1.65, marginBottom: 28 }}>
                We help laundromats across the U.S. grow with geo-fenced ads, AI-powered tools, email & SMS marketing, and commercial outreach. Everything is managed for you.
              </p>
            </Fade>
            <Fade delay={.15}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="/contact" style={{ background: B, color: "#fff", padding: "14px 26px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 2px 20px rgba(43,127,255,0.3)" }}>Get a Free Marketing Audit →</a>
                <a href="/services" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", padding: "13px 22px", borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>See Our Services</a>
              </div>
            </Fade>
          </div>
          <Fade delay={.12}>
            <svg width="100%" viewBox="0 0 440 340" fill="none">
              <rect x="10" y="20" width="250" height="155" rx="10" fill={BG3} stroke="rgba(255,255,255,0.06)" />
              <rect x="10" y="20" width="250" height="26" rx="10" fill="rgba(43,127,255,0.05)" />
              <circle cx="24" cy="33" r="3" fill="#FF5F57" /><circle cx="34" cy="33" r="3" fill="#FEBC2E" /><circle cx="44" cy="33" r="3" fill="#28C840" />
              <rect x="24" y="58" width="85" height="6" rx="3" fill={B} opacity=".4" />
              <rect x="24" y="72" width="130" height="4" rx="2" fill="rgba(255,255,255,0.06)" />
              <rect x="24" y="82" width="110" height="4" rx="2" fill="rgba(255,255,255,0.06)" />
              <rect x="24" y="100" width="55" height="18" rx="5" fill={B} />
              <text x="51" y="112" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="600" fontFamily="sans-serif">Get Started</text>
              <rect x="190" y="58" width="52" height="44" rx="6" fill="rgba(43,127,255,0.07)" stroke="rgba(43,127,255,0.12)" />
              <text x="216" y="80" textAnchor="middle" fill={B} fontSize="15" fontWeight="800" fontFamily="sans-serif">3x</text>
              <text x="216" y="93" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="sans-serif">ROI</text>
              <rect x="150" y="200" width="250" height="120" rx="10" fill={BG3} stroke="rgba(255,255,255,0.06)" />
              {[0,1,2,3,4,5,6].map(i => {
                const h = [32,50,38,65,45,75,58][i];
                return <rect key={i} x={164+i*30} y={298-h} width="18" height={h} rx="3" fill={i===5 ? B : "rgba(43,127,255,0.1)"} />;
              })}
              <rect x="40" y="150" width="170" height="78" rx="9" fill={BG3} stroke="rgba(43,127,255,0.15)" />
              <circle cx="64" cy="184" r="14" fill="rgba(43,127,255,0.08)" stroke={B} strokeWidth="1" />
              <text x="64" y="188" textAnchor="middle" fill={B} fontSize="9">📍</text>
              <rect x="88" y="176" width="48" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
              <rect x="88" y="186" width="76" height="3" rx="1" fill="rgba(255,255,255,0.06)" />
              <rect x="88" y="200" width="38" height="12" rx="4" fill={B} opacity=".7" />
              <circle cx="350" cy="95" r="45" fill="rgba(43,127,255,0.02)" stroke="rgba(43,127,255,0.07)" strokeDasharray="3 3" />
              <circle cx="350" cy="95" r="25" fill="rgba(43,127,255,0.04)" stroke="rgba(43,127,255,0.1)" />
              <circle cx="350" cy="95" r="5" fill={B} />
            </svg>
          </Fade>
        </div>
        <Fade delay={.25}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, marginTop: 50, background: "rgba(255,255,255,0.06)", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
            {[["150+","Laundromats served"],["3x","Avg. client ROI"],["6","Integrated services"],["24/7","AI-powered support"]].map(([n,l],i) => (
              <div key={i} style={{ background: BG, padding: "18px 14px", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: B }}>{n}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 550, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}

const SVC = [
  ["📍","Geo-Fencing Ads","Facebook & Google","Hyper-targeted ad campaigns reaching customers near your laundromat and competitors. Full management of design, copy, targeting, A/B testing, and conversion tracking."],
  ["📱","Email & SMS Marketing","Re-engagement","Automated campaigns bringing lapsed customers back with personalized offers. Welcome sequences, domain setup, segmentation, and deliverability handled for you."],
  ["🤖","AI Chatbot & Voice Bot","24/7 support","Custom AI chatbot on your website and social plus an AI voice agent answering calls. Capture leads, book appointments, and handle questions around the clock."],
  ["📊","Custom CRM","Customer data","POS and laundry software contacts sync into one dashboard. Track interactions, segment by behavior, and trigger automated campaigns with full visibility."],
  ["📧","B2B Cold Outreach","Commercial leads","We build prospect lists, write sequences, and manage replies targeting hotels, gyms, and salons. Clients get 5-15 qualified commercial leads per month."],
  ["⭐","Google Reviews","Reputation","Systematic review generation via automated SMS requests. Higher review counts mean higher Maps rankings and more walk-ins without extra ad spend."],
];

function Services() {
  return (
    <section id="services" style={{ background: BG2, padding: "90px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Fade>
          <p style={{ color: B, fontWeight: 700, fontSize: 12, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8 }}>What we do</p>
          <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: 12 }}>Everything your laundromat needs to grow</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 560, marginBottom: 44, lineHeight: 1.6 }}>A complete marketing stack purpose-built for laundromats.</p>
        </Fade>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {SVC.map(([icon,title,sub,desc], i) => (
            <Fade key={i} delay={i * .04}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "26px 24px", display: "flex", flexDirection: "column", height: "100%" }}>
                <span style={{ fontSize: 26 }}>{icon}</span>
                <h3 style={{ fontSize: 16, fontWeight: 720, color: "#fff", marginTop: 12, marginBottom: 2 }}>{title}</h3>
                <p style={{ fontSize: 12, color: B2, fontWeight: 600, marginBottom: 12 }}>{sub}</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.55, flex: 1 }}>{desc}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [["01","Discovery Call","We hop on a free 30-minute call to learn about your laundromat, your market, and your goals. No sales pitch. We'll research your area beforehand so we come prepared with insights about your competition and opportunities."],["02","Custom Strategy","Based on your market, competition, and budget, we build a tailored growth plan. You'll know exactly which services will have the biggest impact and what results to expect in months 1, 3, and 6."],["03","Launch & Optimize","We handle everything from ad creative to email copy to chatbot setup. Campaigns go live, and we optimize weekly based on real performance data. You don't lift a finger."],["04","Report & Scale","You get clear monthly reports showing exactly what's working. No vanity metrics. As we find winning strategies, we scale them to maximize your ROI and keep growing your customer base."]];
  return (
    <section style={{ background: BG, padding: "90px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Fade><div style={{ textAlign: "center", marginBottom: 44 }}>
          <p style={{ color: B, fontWeight: 700, fontSize: 12, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8 }}>How it works</p>
          <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: "#fff" }}>From first call to more customers</h2>
        </div></Fade>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {steps.map(([n,t,d],i) => (
            <Fade key={i} delay={i*.06}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "24px 20px", position: "relative", overflow: "hidden", height: "100%" }}>
                <div style={{ position: "absolute", top: -4, right: 4, fontSize: 52, fontWeight: 900, color: B, opacity: .04 }}>{n}</div>
                <div style={{ width: 32, height: 32, borderRadius: 8, marginBottom: 12, background: "rgba(43,127,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: B, fontWeight: 800, fontSize: 12 }}>{n}</div>
                <h3 style={{ fontSize: 15, fontWeight: 720, color: "#fff", marginBottom: 6 }}>{t}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{d}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const revs = [
    ["We went from 40 customers/day to over 120 in 4 months. Incredible.","Marcus T.","SpinCycle, Houston TX"],
    ["Spending less on ads now and getting 5x the leads. They get laundromats.","Jennifer K.","CleanWave, Phoenix AZ"],
    ["AI chatbot booked 200+ pickup orders in month one. Game-changer.","David R.","FreshPress, Atlanta GA"],
    ["Landed 3 hotel contracts in 6 weeks via B2B outreach. 10x ROI.","Sarah M.","Metro Wash, Chicago IL"],
    ["CRM + Cents integration was seamless. 34% email open rate.","James L.","BrightSpin, Denver CO"],
  ];
  const doubled = [...revs, ...revs];
  const [paused, setPaused] = useState(false);
  return (
    <section style={{ background: BG2, padding: "90px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <Fade><div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ color: B, fontWeight: 700, fontSize: 12, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8 }}>Testimonials</p>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,36px)", fontWeight: 800, color: "#fff" }}>Trusted by laundromat owners nationwide</h2>
        </div></Fade>
      </div>
      <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} style={{ overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 16, animation: "scrollCards 40s linear infinite", animationPlayState: paused ? "paused" : "running", width: "max-content" }}>
          {doubled.map(([q,name,loc], i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "24px 22px", minWidth: 350, maxWidth: 350, flexShrink: 0 }}>
              <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>{[1,2,3,4,5].map(s => <span key={s} style={{ color: "#F59E0B", fontSize: 12 }}>★</span>)}</div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.55, marginBottom: 16 }}>"{q}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(43,127,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: B }}>{name[0]}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{name}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ background: BG, padding: "90px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48, alignItems: "center" }}>
        <Fade>
          <div>
            <p style={{ color: B, fontWeight: 700, fontSize: 12, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8 }}>About Fresh Leads</p>
            <h2 style={{ fontSize: "clamp(26px,3.5vw,36px)", fontWeight: 800, color: "#fff", marginBottom: 14, lineHeight: 1.15 }}>Exclusively for laundromats. Nothing else.</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 12 }}>We built Fresh Leads to serve laundromats and only laundromats. Every strategy, every AI tool, every template is designed specifically for the laundry business. No generic playbooks. No one-size-fits-all nonsense.</p>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 22 }}>Across 150+ laundromat clients, we've learned what actually works to drive growth, build loyalty, and maximize revenue for your business.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {["Laundromat-only focus","Full-service agency","AI-powered tools","Real results"].map((t,i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: B, fontSize: 14 }}>✓</span>
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 580 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </Fade>
        <Fade delay={.1}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "32px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 18 }}>📍</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 750, color: "#fff" }}>Honolulu, Hawaii</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Island-based, nationwide service</div>
              </div>
            </div>
            <div style={{ background: "rgba(43,127,255,0.04)", border: "1px solid rgba(43,127,255,0.08)", borderRadius: 10, padding: "16px 18px", marginBottom: 20 }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, margin: 0 }}>Based out of Honolulu, Hawaii. If you ever visit, let's connect in person and you can write off the trip. Just saying.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, textAlign: "center" }}>
              {[["150+","Laundromats served"],["100%","Laundromat focus"],["3x","Avg. client ROI"]].map(([n,l],i) => (
                <div key={i}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: B }}>{n}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  const qs = [
    ["What is the Laundromat Growth System?","The Laundromat Growth System is our all-in-one marketing package built specifically for laundromats. It includes everything you need to grow: geo-fencing ads on Facebook and Google, email and SMS automation, an AI chatbot and voice bot, a custom CRM synced to your POS, B2B commercial outreach, and Google review generation. Everything works together as one system so your marketing compounds instead of operating in silos."],
    ["Why can't I just pick individual services?","We don't offer à la carte services because isolated tactics don't work. Running ads without email follow-up means you're paying for leads that never come back. Getting reviews without a CRM means you can't track who's responding. The Laundromat Growth System is designed so every piece feeds the others. Ads bring in new customers, the CRM segments them, email and SMS bring them back, the chatbot captures leads 24/7, and reviews build your reputation. That's how you get compounding growth instead of one-off results."],
    ["How do geo-fencing ads work for laundromats?","We draw virtual boundaries around your laundromat, your competitors' locations, apartment complexes, and high-traffic areas. When someone enters that zone with their phone, they become eligible to see your ads on Facebook, Instagram, and Google. This means you're reaching people who are physically near your business, not blasting ads to an entire city. Our clients typically see a 3-4x return on ad spend with cost per lead between $4-8."],
    ["How fast will I see results?","Most clients see their first leads within 1-2 weeks of launching ads. By month 2-3, we've gathered enough data to deeply optimize your campaigns. That's when ROI typically hits 2-4x. Email and SMS campaigns can generate revenue within days if you have an existing customer list. Review generation starts showing Google Maps ranking improvements within 60-90 days. The full system builds momentum over time, with months 4-6 being where most clients see the biggest jumps."],
    ["How much does the Laundromat Growth System cost?","Pricing depends on your market size, number of locations, and specific goals. We'll walk you through options on our discovery call. What we can tell you is that most clients see a positive ROI within the first 60-90 days, and our average client generates 3x or more return on their total marketing investment."],
    ["Do I need to be tech-savvy to use this?","Not at all. We handle everything: ad creation, campaign management, email copywriting, chatbot training, CRM setup, review automation, and reporting. You'll get a dashboard where you can see your results anytime, but you don't need to touch anything. We send you clear, simple reports and hop on calls to walk through performance whenever you want."],
    ["What if I've tried marketing before and it didn't work?","This is the most common thing we hear. Almost every time, the issue is the same: the previous agency ran generic campaigns that weren't built for laundromats. They targeted too broad, used stock creative, and had no understanding of the laundry industry. We're different because we only work with laundromats. Every ad template, email sequence, and targeting strategy has been tested across 125+ laundromat clients. We already know what works."],
    ["How do you track and report results?","You get a real-time dashboard plus detailed monthly reports covering every channel: ad performance, email open rates, SMS engagement, review growth, lead counts, and revenue attribution. We tie everything back to actual dollars so you know exactly what your marketing investment is generating. No vanity metrics, no fluff. Just the numbers that matter to your bottom line."],
    ["What POS systems do you integrate with?","Our CRM integrates directly with Cents, LaundroWorks, and CCI. Customer data syncs automatically so you never need to manually enter contacts. If you use a different system, we'll work with you to find an integration path or set up manual imports."],
    ["Can this work for a brand new laundromat?","Absolutely. New laundromats are actually some of our best success stories because there's zero competition for your brand name, no bad habits to undo, and everything is set up correctly from day one. We'll focus on building awareness through geo-fencing ads, capturing every lead with the chatbot, and generating reviews fast to build your Google presence."],
  ];
  return (
    <section id="faq" style={{ background: BG2, padding: "90px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Fade><div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ color: B, fontWeight: 700, fontSize: 12, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8 }}>FAQ</p>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,36px)", fontWeight: 800, color: "#fff" }}>Common questions</h2>
        </div></Fade>
        <div className="faqg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {qs.map(([q,a],i) => (
            <Fade key={i} delay={i*.03}>
              <div onClick={() => setOpen(open === i ? null : i)} style={{
                background: open === i ? "rgba(43,127,255,0.04)" : "rgba(255,255,255,0.03)",
                border: "1px solid " + (open === i ? "rgba(43,127,255,0.15)" : "rgba(255,255,255,0.07)"),
                borderRadius: 12, marginBottom: 6, cursor: "pointer", transition: "all .2s"
              }}>
                <div style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 640, color: "#fff" }}>{q}</span>
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
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, margin: 0 }}>{a}</p>
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

function CTA() {
  return (
    <section id="contact" style={{ background: BG, padding: "90px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <Fade>
          <div style={{ background: "linear-gradient(135deg, rgba(43,127,255,0.1), rgba(43,127,255,0.03))", border: "1px solid rgba(43,127,255,0.15)", borderRadius: 20, padding: "clamp(36px,5vw,60px) clamp(24px,4vw,44px)", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 800, color: "#fff", marginBottom: 12 }}>Ready to grow your laundromat?</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", maxWidth: 420, margin: "0 auto 22px", lineHeight: 1.6 }}>Free discovery call. We'll audit your market and build a custom growth plan.</p>
            <a href="/contact" style={{ display: "inline-block", background: B, color: "#fff", padding: "14px 30px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 20px rgba(43,127,255,0.3)" }}>Schedule Your Discovery Call →</a>
          </div>
        </Fade>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: BG, padding: "36px 24px 20px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <Logo />
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>© 2026 Fresh Leads Marketing. Honolulu, HI.</p>
        <div style={{ display: "flex", gap: 14 }}>
          <a href="https://www.facebook.com/freshleadsmarketing" target="_blank" rel="noopener" style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, textDecoration: "none" }}>Facebook</a>
          <a href="https://www.instagram.com/freshleadsmarketing" target="_blank" rel="noopener" style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, textDecoration: "none" }}>Instagram</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: BG, minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <Services />
      <Process />
      <Testimonials />
      <About />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

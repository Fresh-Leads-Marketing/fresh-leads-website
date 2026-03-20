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
function Nav() {
  return <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(7,9,13,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}><div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}><Logo /><div className="dn" style={{ display: "flex", alignItems: "center", gap: 24 }}>{["Home","Services","About","Blog","Contact"].map(l=><a key={l} href={l==="Home"?"/":l==="Services"?"/services":l==="About"?"/about":l==="Blog"?"/blog":"/contact"} style={{ color: l==="Contact"?"#fff":"rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13, fontWeight: l==="Contact"?650:550 }}>{l}</a>)}</div></div></nav>;
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
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <div className="cg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
        <FI>
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Book your free discovery call</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: 28 }}>
              Pick a time that works for you. In 30 minutes, we&apos;ll audit your market, review your competition, and outline a custom growth strategy for your laundromat.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                ["\u23F1\uFE0F", "30 minutes", "Quick, focused, and actionable"],
                ["\uD83D\uDCCA", "Market audit", "We research your area before the call"],
                ["\uD83C\uDFAF", "Custom strategy", "You\u2019ll leave with a clear plan"],
                ["\uD83D\uDCB0", "100% free", "No commitment, no pressure"],
              ].map(([icon, title, sub], i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>{title}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FI>

        <FI delay={0.1}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "4px", overflow: "hidden", minHeight: 700 }}>
            {mounted ? (
              <iframe
                src="https://link.freshleadsmarketing.com/widget/booking/fTHzSQY7rRoHcQPNC9NV"
                style={{ width: "100%", minHeight: 700, border: "none", overflow: "hidden", borderRadius: 12, background: "#fff" }}
                scrolling="no"
                id="fTHzSQY7rRoHcQPNC9NV_embed"
                allow="payment; camera; microphone"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div style={{ width: "100%", minHeight: 700, borderRadius: 12, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ color: "#999", fontSize: 14 }}>Loading calendar...</div>
              </div>
            )}
          </div>
        </FI>
      </div>
    </div>

    {mounted && (
      <Script
        src="https://link.freshleadsmarketing.com/js/form_embed.js"
        strategy="lazyOnload"
      />
    )}
  </section>;
}

function ContactForm() {
  return <section style={{ background: BG, padding: "70px 24px" }}>
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <FI>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Prefer to send a message?</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>Fill out the form and we&apos;ll get back to you within 24 hours.</p>
        </div>

        {[
          ["Full name", "text", "John Smith"],
          ["Email", "email", "john@mylaundromat.com"],
          ["Laundromat name", "text", "Smith's Cleaners"],
          ["How many locations?", "text", "1"],
        ].map(([label, type, placeholder], i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 5 }}>{label}</label>
            <input type={type} placeholder={placeholder} style={{
              width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 9, padding: "11px 14px", color: "#fff", fontSize: 14,
              fontFamily: "'DM Sans', sans-serif", outline: "none",
            }} />
          </div>
        ))}

        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 5 }}>What services are you interested in?</label>
          <textarea placeholder="Tell us about your goals..." style={{
            width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 9, padding: "11px 14px", color: "#fff", fontSize: 14, minHeight: 100,
            fontFamily: "'DM Sans', sans-serif", outline: "none", resize: "vertical",
          }} />
        </div>

        <button style={{
          width: "100%", background: B, color: "#fff", padding: "13px", borderRadius: 10,
          border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif", boxShadow: "0 2px 16px rgba(43,127,255,0.3)",
        }}>Send Message &rarr;</button>
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
            ["\uD83D\uDCE7", "Email", "hello@freshleadsmarketing.com"],
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
  return <footer style={{ background: BG, padding: "36px 24px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 28 }}>
      <div><Logo /><p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", maxWidth: 220, lineHeight: 1.5, marginTop: 10 }}>The #1 laundromat marketing agency.</p></div>
    </div>
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", marginTop: 20, paddingTop: 14, fontSize: 11, color: "rgba(255,255,255,0.2)" }}>&copy; 2026 Fresh Leads Marketing</div>
  </footer>;
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

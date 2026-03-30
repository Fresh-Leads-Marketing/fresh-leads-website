"use client";
import { useState, useEffect, useRef } from "react";

const B = "#2B7FFF";
const BG = "#07090D";
const BG2 = "#0C1017";

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
function Logo() { return (<a href="/"><img src="/logo.png" alt="Fresh Leads Marketing" style={{ height: 32, width: "auto", display: "block" }} /></a>); }

function Nav() {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(7,9,13,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <Logo />
        <a href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13, fontWeight: 550 }}>← Back to Home</a>
      </div>
    </nav>
  );
}

export default function BookingConfirmedPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: BG, minHeight: "100vh" }}>
      <Nav />

      {/* Confirmation Hero */}
      <section style={{ background: BG, padding: "160px 24px 60px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(34,197,94,0.06) 0%, transparent 60%)" }} />
        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative", textAlign: "center" }}>
          <FI>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(34,197,94,0.1)", border: "2px solid rgba(34,197,94,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
            </div>
          </FI>
          <FI delay={0.05}>
            <h1 style={{ fontSize: "clamp(28px, 4.5vw, 42px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: 14 }}>
              You&apos;re All Set!
            </h1>
          </FI>
          <FI delay={0.1}>
            <p style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: 500, margin: "0 auto" }}>
              Your free marketing audit has been booked. Check your email for a calendar invite with all the details.
            </p>
          </FI>
        </div>
      </section>

      {/* What to Expect */}
      <section style={{ background: BG2, padding: "64px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <FI>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 28, textAlign: "center" }}>What happens next</h2>
          </FI>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { num: "1", title: "We research your market", desc: "Before our call, we'll analyze your local competition, review your online presence, and identify the biggest growth opportunities for your laundromat." },
              { num: "2", title: "We hop on a call together", desc: "We'll walk you through our findings, answer your questions, and discuss how our marketing system can help grow your business. No pressure, no hard sell." },
              { num: "3", title: "You decide if it's a fit", desc: "After the call, you'll have a clear picture of where you stand and what's possible. If we're a good fit, we can get started right away. If not, no worries at all." },
            ].map((step, i) => (
              <FI key={i} delay={i * 0.06}>
                <div style={{ display: "flex", gap: 18, alignItems: "flex-start", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "22px 24px" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(43,127,255,0.1)", border: "1px solid rgba(43,127,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: B, fontSize: 15, fontWeight: 800 }}>{step.num}</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{step.title}</h3>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                  </div>
                </div>
              </FI>
            ))}
          </div>
        </div>
      </section>

      {/* Need to Reschedule */}
      <section style={{ background: BG, padding: "56px 24px" }}>
        <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
          <FI>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>Need to reschedule or have a question before the call?</p>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", marginBottom: 32 }}>
              <a href="tel:808-736-1539" style={{ color: B, textDecoration: "none", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>📞 (808) 736-1539</a>
              <a href="mailto:info@freshleadsmarketing.com" style={{ color: B, textDecoration: "none", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>📧 info@freshleadsmarketing.com</a>
            </div>
          </FI>
          <FI delay={0.08}>
            <a href="/" style={{ display: "inline-block", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "12px 28px", borderRadius: 10, fontWeight: 600, fontSize: 14, textDecoration: "none", transition: "background .2s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}>
              Browse Our Services →
            </a>
          </FI>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer style={{ background: BG, padding: "24px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.15)", margin: 0 }}>© 2026 Fresh Leads Marketing. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

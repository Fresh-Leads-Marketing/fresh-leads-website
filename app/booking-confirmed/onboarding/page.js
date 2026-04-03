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
function Logo() { return (<a href="/"><img src="/logo.png" alt="Fresh Leads Marketing" style={{ height: 40, width: "auto", display: "block" }} /></a>); }

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

export default function OnboardingConfirmedPage() {
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
              Welcome to the Team!
            </h1>
          </FI>
          <FI delay={0.1}>
            <p style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: 500, margin: "0 auto" }}>
              Your onboarding call has been booked. We're excited to get started — here's how to prepare so we can hit the ground running.
            </p>
          </FI>
        </div>
      </section>

      {/* Before Your Call Checklist */}
      <section style={{ background: BG2, padding: "64px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <FI>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 28, textAlign: "center" }}>Before Your Call</h2>
          </FI>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              {
                icon: "📋",
                title: "Complete Your Onboarding Form",
                desc: "Fill this out before the call so we have everything we need to set up your accounts.",
                cta: "Fill Out Onboarding Form →",
                ctaUrl: "https://link.freshleadsmarketing.com/widget/form/k5hslM6qjOJgofHXrTa2",
              },
              {
                icon: "🔑",
                title: "Gather Your Account Access",
                desc: "Make sure you can log into your Google Ads account, Facebook Ads (Meta Business Manager), and your laundry software. If you don't have ad accounts yet, no worries — we'll create them together on the call.",
                cta: null,
              },
              {
                icon: "🌐",
                title: "Have Your Domain Info Ready",
                desc: "We'll need access to your website's DNS records to set up your dedicated email domain. If you have a web designer, you can loop them in and we'll send the records directly.",
                cta: null,
              },
            ].map((item, i) => (
              <FI key={i} delay={i * 0.06}>
                <div style={{ display: "flex", gap: 18, alignItems: "flex-start", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "22px 24px" }}>
                  <div style={{ fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, width: 36, height: 36 }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{item.title}</h3>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, margin: "0 0 12px 0" }}>{item.desc}</p>
                    {item.cta && (
                      <a href={item.ctaUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: B, color: "#fff", padding: "8px 16px", borderRadius: 7, fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "opacity .2s" }} onMouseEnter={e => e.currentTarget.style.opacity = "0.8"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                        {item.cta}
                      </a>
                    )}
                  </div>
                </div>
              </FI>
            ))}
          </div>
        </div>
      </section>

      {/* After Your Onboarding */}
      <section style={{ background: BG, padding: "64px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <FI>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 28, textAlign: "center" }}>After Your Onboarding</h2>
          </FI>
          <FI delay={0.05}>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", textAlign: "center", marginBottom: 28 }}>Here's what you'll have ready to launch:</p>
          </FI>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[
              "Custom CRM ready to use",
              "Ad accounts integrated and campaigns prepped for launch",
              "Dedicated email domain for branded marketing",
              "AI Review Automation activated for Google Reviews",
              "Clear ad strategy for the month",
              "Everything ready to launch within a few business days",
            ].map((item, i) => (
              <FI key={i} delay={i * 0.04}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "16px 18px" }}>
                  <div style={{ color: "#22C55E", fontSize: 16, flexShrink: 0, marginTop: 2 }}>✓</div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.5, margin: 0 }}>{item}</p>
                </div>
              </FI>
            ))}
          </div>
        </div>
      </section>

      {/* Promotion Ideas */}
      <section style={{ background: BG2, padding: "56px 24px" }}>
        <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
          <FI>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Have a promotion in mind?</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0 }}>
              If you have any promotions, campaigns, or marketing ideas you'd like us to launch this month, jot them down and bring them to the call. We'll go over everything and share recommendations based on what's worked for similar clients.
            </p>
          </FI>
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

import Link from "next/link";
import Logo from "./Logo";
import { B } from "./theme";

export default function Footer() {
  return (
    <footer style={{ background: "#07090D", padding: "48px 24px 28px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: 40, marginBottom: 32 }}>
          <div>
            <Link href="/" style={{ textDecoration: "none" }}>
              <div style={{ marginBottom: 12 }}><Logo /></div>
            </Link>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", maxWidth: 260, lineHeight: 1.6 }}>
              The #1 digital marketing agency for laundromats. Based in Honolulu, Hawaii — serving nationwide.
            </p>
          </div>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            <div>
              <h4 style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>Services</h4>
              {[
                { label: "Geo-Fencing Ads", href: "/services/geo-fencing-ads" },
                { label: "Email & SMS", href: "/services/email-sms" },
                { label: "AI Chatbot & Voice", href: "/services/ai-chatbot" },
                { label: "Custom CRM", href: "/services/crm" },
                { label: "Cold Outreach", href: "/services/b2b-outreach" },
                { label: "Google Reviews", href: "/services/google-reviews" },
              ].map((s) => (
                <Link key={s.href} href={s.href} style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none", marginBottom: 8 }}>
                  {s.label}
                </Link>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>Company</h4>
              {[
                { label: "About Us", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
              ].map((s) => (
                <Link key={s.href} href={s.href} style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none", marginBottom: 8 }}>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>© 2026 Fresh Leads Marketing. All rights reserved.</p>
          <div style={{ display: "flex", gap: 16 }}>
            <a href="https://www.facebook.com/freshleadsmarketing" target="_blank" rel="noopener" style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, textDecoration: "none" }}>Facebook</a>
            <a href="https://www.instagram.com/freshleadsmarketing" target="_blank" rel="noopener" style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, textDecoration: "none" }}>Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

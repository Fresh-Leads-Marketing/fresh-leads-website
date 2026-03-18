"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { B } from "./theme";

export default function Nav({ current = "" }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(7,9,13,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        transition: "all 0.35s",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Logo />
        </Link>

        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: current === link.label ? "#fff" : "rgba(255,255,255,0.5)",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: current === link.label ? 650 : 550,
                transition: "color 0.2s",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            style={{
              background: B, color: "#fff", padding: "9px 20px", borderRadius: 9,
              fontWeight: 650, fontSize: 13, textDecoration: "none",
              boxShadow: "0 2px 16px rgba(43,127,255,0.3)",
            }}
          >
            Free Marketing Audit
          </Link>
        </div>

        <button
          className="mobile-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: "none", background: "none", border: "none", color: "#fff", fontSize: 24, cursor: "pointer" }}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <div style={{ background: "#07090D", padding: "8px 24px 24px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block", color: "rgba(255,255,255,0.7)", textDecoration: "none",
                fontSize: 16, fontWeight: 550, padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            style={{
              display: "block", background: B, color: "#fff", padding: "14px",
              borderRadius: 10, fontWeight: 650, fontSize: 15, textDecoration: "none",
              textAlign: "center", marginTop: 12,
            }}
          >
            Free Marketing Audit
          </Link>
        </div>
      )}
    </nav>
  );
}

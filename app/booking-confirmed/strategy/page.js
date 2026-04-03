"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Color scheme
const B = "#2B7FFF";
const BG = "#07090D";
const BG2 = "#0C1017";

// Intersection Observer hook for fade-in
function useV() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

// Fade-in component
function FI({ children, delay = 0 }) {
  const [ref, isVisible] = useV();
  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// Logo component
function Logo() {
  return (
    <Link href="/">
      <img src="/logo.png" alt="Fresh Leads Marketing" style={{ height: 40, width: "auto", display: "block" }} />
    </Link>
  );
}

// Step card component
function StepCard({ number, title, description, delay }) {
  return (
    <FI delay={delay}>
      <div
        style={{
          background: "rgba(43, 127, 255, 0.08)",
          border: `1px solid rgba(43, 127, 255, 0.2)`,
          borderRadius: "14px",
          padding: "24px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: B,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "700",
              marginRight: "12px",
            }}
          >
            {number}
          </div>
          <h3
            style={{
              margin: "0",
              fontSize: "16px",
              fontWeight: "600",
              color: "#fff",
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            {title}
          </h3>
        </div>
        <p
          style={{
            margin: "0",
            marginLeft: "44px",
            fontSize: "14px",
            color: "rgba(255, 255, 255, 0.7)",
            lineHeight: "1.6",
            fontFamily: "DM Sans, sans-serif",
          }}
        >
          {description}
        </p>
      </div>
    </FI>
  );
}

export default function StrategyCallBooked() {
  return (
    <div
      style={{
        background: BG,
        color: "#fff",
        minHeight: "100vh",
        fontFamily: "DM Sans, sans-serif",
      }}
    >
      {/* Navigation */}
      <nav
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          padding: "20px 40px",
          backdropFilter: "blur(10px)",
          background: "rgba(7, 9, 13, 0.7)",
          borderBottom: "1px solid rgba(43, 127, 255, 0.1)",
          zIndex: "1000",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Logo />
          <Link
            href="/"
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              textDecoration: "none",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#fff")}
            onMouseLeave={(e) => (e.target.style.color = "rgba(255, 255, 255, 0.7)")}
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "140px 24px 60px",
        }}
      >
        {/* Hero Section */}
        <FI delay={0.1}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            {/* Green Checkmark Circle */}
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(34, 197, 94, 0.15)",
                border: `2px solid #22C55E`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22C55E"
                strokeWidth="2.5"
              >
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h1
              style={{
                margin: "0 0 12px 0",
                fontSize: "40px",
                fontWeight: "700",
                lineHeight: "1.2",
              }}
            >
              Strategy Call Booked!
            </h1>

            <p
              style={{
                margin: "0",
                fontSize: "16px",
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: "1.6",
              }}
            >
              Your monthly strategy session has been scheduled. Check your email for a calendar invite with the call details.
            </p>
          </div>
        </FI>

        {/* What to Prepare Section */}
        <FI delay={0.2}>
          <div style={{ marginBottom: "50px" }}>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "24px",
                color: "#fff",
              }}
            >
              What to prepare
            </h2>
            <StepCard
              number="1"
              title="Review your results"
              description="Take a quick look at your ad dashboard before the call. We'll review last month's performance together and highlight what worked, what didn't, and where the biggest opportunities are."
              delay={0.25}
            />
            <StepCard
              number="2"
              title="Note any questions or ideas"
              description="Have a new promotion in mind? Want to test a different service area? Jot down anything you'd like to discuss so we can make the most of our time together."
              delay={0.3}
            />
            <StepCard
              number="3"
              title="We'll map out next month"
              description="By the end of the call, you'll have a clear strategy for the upcoming month — including ad spend recommendations, campaign adjustments, and any new initiatives to launch."
              delay={0.35}
            />
          </div>
        </FI>

        {/* Reschedule Section */}
        <FI delay={0.4}>
          <div
            style={{
              background: BG2,
              border: `1px solid rgba(43, 127, 255, 0.2)`,
              borderRadius: "14px",
              padding: "32px 24px",
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            <p
              style={{
                margin: "0 0 20px 0",
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              Need to reschedule or have questions?
            </p>
            <div
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "20px",
                flexDirection: "column",
              }}
            >
              <a
                href="tel:808-736-1539"
                style={{
                  display: "inline-block",
                  padding: "12px 24px",
                  background: "rgba(43, 127, 255, 0.1)",
                  border: `1px solid ${B}`,
                  color: B,
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = B;
                  e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(43, 127, 255, 0.1)";
                  e.target.style.color = B;
                }}
              >
                📞 Call (808) 736-1539
              </a>
              <a
                href="mailto:info@freshleadsmarketing.com"
                style={{
                  display: "inline-block",
                  padding: "12px 24px",
                  background: "rgba(43, 127, 255, 0.1)",
                  border: `1px solid ${B}`,
                  color: B,
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = B;
                  e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(43, 127, 255, 0.1)";
                  e.target.style.color = B;
                }}
              >
                Email us
              </a>
            </div>
            <Link
              href="/services"
              style={{
                display: "inline-block",
                padding: "12px 32px",
                background: B,
                color: "#fff",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "600",
                transition: "opacity 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              Browse Our Services
            </Link>
          </div>
        </FI>
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(43, 127, 255, 0.1)",
          padding: "40px 24px",
          textAlign: "center",
          color: "rgba(255, 255, 255, 0.5)",
          fontSize: "12px",
        }}
      >
        <p style={{ margin: "0" }}>
          © {new Date().getFullYear()} Fresh Leads Marketing. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
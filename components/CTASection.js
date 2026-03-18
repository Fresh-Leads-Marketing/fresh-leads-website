import Link from "next/link";
import FadeIn from "./FadeIn";
import { B } from "./theme";

export default function CTASection({ title = "Ready to grow your laundromat?", subtitle = "Book a free discovery call. We'll audit your market, analyze your competitors, and build a custom growth plan — no commitment required.", buttonText = "Schedule Your Discovery Call →", testimonial = "" }) {
  return (
    <section id="cta" style={{ background: "#0C1017", padding: "90px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <FadeIn>
          <div style={{
            background: "linear-gradient(135deg, rgba(43,127,255,0.1), rgba(43,127,255,0.03))",
            border: "1px solid rgba(43,127,255,0.18)", borderRadius: 20,
            padding: "clamp(36px,6vw,56px) clamp(24px,5vw,44px)", textAlign: "center",
          }}>
            <h2 style={{ fontSize: "clamp(24px,4vw,34px)", fontWeight: 800, color: "#fff", marginBottom: 12 }}>{title}</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", maxWidth: 440, margin: "0 auto 20px", lineHeight: 1.6 }}>{subtitle}</p>
            <Link href="/contact" style={{
              display: "inline-block", background: B, color: "#fff", padding: "14px 30px",
              borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none",
              boxShadow: "0 4px 20px rgba(43,127,255,0.3)",
            }}>
              {buttonText}
            </Link>
            {testimonial && (
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 14, fontStyle: "italic" }}>{testimonial}</p>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

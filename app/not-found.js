const B = "#2B7FFF";
const BG = "#07090D";

export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: "'DM Sans', -apple-system, sans-serif", background: BG, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ maxWidth: 600, padding: "40px 24px", textAlign: "center" }}>
          <div style={{ marginBottom: 32 }}>
            <img src="/logo.png" alt="Fresh Leads Marketing" style={{ height: 40, width: "auto", display: "block", margin: "0 auto" }} />
          </div>

          <h1 style={{ fontSize: "clamp(36px,6vw,56px)", fontWeight: 800, color: "#fff", margin: "0 0 16px", letterSpacing: "-0.035em" }}>
            Page Not Found
          </h1>

          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginBottom: 28, lineHeight: 1.6, maxWidth: 400, margin: "0 auto 28px" }}>
            Sorry, the page you're looking for doesn't exist. Let's get you back on track.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
            <a href="/" style={{
              display: "inline-block",
              background: B,
              color: "#fff",
              padding: "14px 28px",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              boxShadow: "0 2px 20px rgba(43,127,255,0.3)",
              transition: "opacity 0.2s"
            }}>
              Back to Home
            </a>
            <a href="/contact" style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.7)",
              padding: "13px 24px",
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 15,
              textDecoration: "none",
              transition: "all 0.2s"
            }}>
              Contact Support
            </a>
          </div>

          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
            Error Code: 404
          </p>
        </div>
      </body>
    </html>
  );
}

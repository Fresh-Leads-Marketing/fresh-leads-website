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
  useEffect(() => { const e = r.current; if (!e) return; const o = new IntersectionObserver(([x]) => { if (x.isIntersecting) { s(true); o.disconnect(); } }, { threshold: t }); o.observe(e); return () => o.disconnect(); }, [t]);
  return [r, v];
}
function FI({ children, delay = 0 }) {
  const [r, v] = useV();
  return (<div ref={r} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transition: `opacity .6s ease ${delay}s, transform .6s ease ${delay}s` }}>{children}</div>);
}
function Logo(){return(<img src="/logo.png" alt="Fresh Leads Marketing" style={{height:32,width:"auto",display:"block"}}/>)}
function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const show = () => { clearTimeout(timer.current); setOpen(true); };
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 150); };
  const items = [
    ["Geo-Fencing Ads", "/services/geo-fencing-ads"],
    ["Email & SMS", "/services/email-sms"],
    ["CRM Integration", "/services/crm"],
    ["AI Chatbot & Voice AI", "/services/ai-chatbot"],
    ["Google Reviews", "/services/google-reviews"],
    ["B2B Outreach", "/services/b2b-outreach"],
  ];
  return (
    <div style={{ position: "relative" }} onMouseEnter={show} onMouseLeave={hide}>
      <a href="/services" style={{ color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 650, display: "flex", alignItems: "center", gap: 4 }}>
        Services <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </a>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", paddingTop: 10 }}>
          <div style={{ background: "rgba(30,35,48,0.98)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "8px 0", minWidth: 200, boxShadow: "0 8px 32px rgba(0,0,0,0.5)", backdropFilter: "blur(20px)" }}>
            {items.map(([label, href]) => (
              <a key={href} href={href} style={{ display: "block", padding: "9px 18px", color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: 13, fontWeight: 500, transition: "background .15s" }} onMouseEnter={e => { e.target.style.background = "rgba(43,127,255,0.15)"; e.target.style.color = "#fff"; }} onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "rgba(255,255,255,0.75)"; }}>{label}</a>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", margin: "6px 0" }} />
            <a href="/services" style={{ display: "block", padding: "9px 18px", color: "#2B7FFF", textDecoration: "none", fontSize: 13, fontWeight: 650 }}>All Services →</a>
          </div>
        </div>
      )}
    </div>
  );
}
function MobileMenu({ open, onClose }) {
  if (!open) return null;
  const links = [
    ["Home", "/"],
    ["Services", "/services"],
    ["Geo-Fencing Ads", "/services/geo-fencing-ads"],
    ["Email & SMS", "/services/email-sms"],
    ["CRM Integration", "/services/crm"],
    ["AI Chatbot & Voice AI", "/services/ai-chatbot"],
    ["Google Reviews", "/services/google-reviews"],
    ["B2B Outreach", "/services/b2b-outreach"],
    ["About", "/about"],
    ["Pricing", "/pricing"],
    ["Blog", "/blog"],
    ["FAQ", "/faq"],
    ["Contact", "/contact"],
  ];
  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ flex: 1 }}>
        <div style={{ position: "absolute", top: 20, right: 24 }}>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", fontSize: 28, cursor: "pointer", padding: 8 }}>✕</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {links.map(([label, href]) => {
            const isSub = ["Geo-Fencing Ads","AI Chatbot & Voice AI","Email & SMS","CRM Integration","B2B Outreach","Google Reviews"].includes(label);
            return (
              <a key={href+label} href={href} onClick={onClose} style={{
                color: isSub ? "rgba(255,255,255,0.4)" : "#fff",
                textDecoration: "none",
                fontSize: isSub ? 15 : 20,
                fontWeight: isSub ? 500 : 700,
                padding: isSub ? "6px 0 6px 20px" : "10px 0",
                borderBottom: label === "Google Reviews" || label === "Contact" ? "none" : label === "Services" ? "none" : "1px solid rgba(255,255,255,0.05)",
              }}>{label}</a>
            );
          })}
        </div>
        <a href="/contact" style={{ display: "block", background: "#2B7FFF", color: "#fff", padding: "16px 0", borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: "none", textAlign: "center", marginTop: 28 }}>Free Marketing Audit</a>
      </div>
    </div>
  );
}

function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);
  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(7,9,13,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <Logo />
          <div className="dn" style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <a href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13, fontWeight: 550 }}>Home</a>
            <ServicesDropdown />
            {["About", "Pricing", "Blog", "FAQ", "Contact"].map(l => <a key={l} href={l==="About"?"/about":l==="Pricing"?"/pricing":l==="Blog"?"/blog":l==="FAQ"?"/faq":"/contact"} style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13, fontWeight: 550 }}>{l}</a>)}
            <a href="/contact" style={{ background: B, color: "#fff", padding: "9px 20px", borderRadius: 9, fontWeight: 650, fontSize: 13, textDecoration: "none" }}>Free Marketing Audit</a>
          </div>
          <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none", alignItems: "center", justifyContent: "center" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </nav>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}


function Hero() {
  return (<section style={{ background: BG, padding: "130px 24px 70px", position: "relative" }}><div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(43,127,255,0.07) 0%, transparent 60%)" }} /><div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}><div className="hg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 44, alignItems: "center" }}><FI><div><a href="/services" style={{ color: B, fontSize: 13, fontWeight: 600, textDecoration: "none", display: "inline-block", marginBottom: 16 }}>← All Services</a><span style={{ fontSize: 32, display: "block", marginBottom: 12 }}>🤖</span><h1 style={{ fontSize: "clamp(30px,4.5vw,46px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-.03em", marginBottom: 16 }}>AI Chatbot & Voice Bot for <span style={{ color: B }}>Laundromats</span></h1><p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, marginBottom: 28 }}>Your website and phone become lead-capturing machines. The chatbot handles website visitors, Facebook, and Instagram. The voice bot picks up calls 24/7 and sounds natural. Both custom-trained on your laundromat.</p><a href="/contact" style={{ background: B, color: "#fff", padding: "14px 26px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 2px 16px rgba(43,127,255,0.3)" }}>Get Started →</a></div></FI><FI delay={0.1}><svg width="100%" viewBox="0 0 400 320" fill="none"><rect x="0" y="0" width="400" height="320" rx="16" fill={BG3} stroke="rgba(255,255,255,0.07)" /><rect x="80" y="20" width="240" height="40" rx="20" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" /><text x="200" y="44" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="sans-serif">What are your hours today?</text><rect x="110" y="72" width="270" height="52" rx="12" fill="rgba(43,127,255,0.06)" stroke="rgba(43,127,255,0.12)" /><text x="126" y="93" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="sans-serif">We're open 7am-10pm! Wash and fold</text><text x="126" y="108" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="sans-serif">available until 6pm.</text><rect x="80" y="136" width="240" height="40" rx="20" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" /><text x="200" y="160" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="sans-serif">Book a pickup for tomorrow?</text><rect x="110" y="188" width="270" height="42" rx="12" fill="rgba(43,127,255,0.06)" stroke="rgba(43,127,255,0.12)" /><text x="126" y="213" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="sans-serif">Done! Booked for 9am tomorrow.</text><rect x="20" y="250" width="360" height="50" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" /><text x="40" y="270" fill="rgba(255,255,255,0.4)" fontSize="8" fontWeight="600" fontFamily="sans-serif">Incoming call: (555) 123-4567</text><text x="40" y="286" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="sans-serif">AI Voice Bot · Lead qualified · Apt. Booked</text><rect x="310" y="258" width="55" height="22" rx="6" fill="rgba(34,197,94,0.1)" /><text x="338" y="272" textAnchor="middle" fill="#22C55E" fontSize="8" fontWeight="700" fontFamily="sans-serif">Handled</text></svg></FI></div></div></section>);
}

function KeyBenefits() {
  const benefits = [
    { title: "24/7 Customer Support", icon: "🎧" },
    { title: "Automatic Booking and Scheduling", icon: "📅" },
    { title: "Handles FAQs Instantly", icon: "⚡" },
    { title: "Never Miss an After-Hours Inquiry", icon: "🌙" }
  ];
  return (<section style={{ background: BG2, padding: "70px 24px" }}><div style={{ maxWidth: 900, margin: "0 auto" }}><FI><p style={{ color: B, fontWeight: 700, fontSize: 13, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 24, textAlign: "center" }}>Key benefits</p></FI><div className="csg detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>{benefits.map((benefit, i) => <FI key={i} delay={i * 0.08}><div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 26px" }}><div style={{ fontSize: 32, marginBottom: 16 }}>{benefit.icon}</div><h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 12, lineHeight: 1.4 }}>{benefit.title}</h3><p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0 }}>Built-in from day one, no extra setup required.</p></div></FI>)}</div></div></section>);
}

function Features() {
  return (<section style={{ background: BG, padding: "80px 24px" }}><div style={{ maxWidth: 900, margin: "0 auto" }}><FI><h2 style={{ fontSize: "clamp(24px,3vw,34px)", fontWeight: 800, color: "#fff", marginBottom: 14, textAlign: "center" }}>Two AI tools, one goal: never miss a lead</h2></FI><div className="fg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}><FI><div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 24px" }}><h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 14 }}>💬 AI Chatbot</h3>{["Website, Facebook, Instagram, Google","Answers hours, pricing, services","Captures leads into your CRM","Books appointments and P&D orders","Custom-trained on your business","Handles 80%+ automatically"].map((item,i)=><div key={i} style={{display:"flex",gap:8,marginBottom:10}}><span style={{color:B,flexShrink:0,fontSize:12,marginTop:2}}>→</span><span style={{fontSize:13.5,color:"rgba(255,255,255,0.5)",lineHeight:1.5}}>{item}</span></div>)}</div></FI><FI delay={0.08}><div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 24px" }}><h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 14 }}>📞 AI Voice Bot</h3>{["Answers calls 24/7 naturally","Qualifies and captures contact info","Books appointments and confirms","Handles pricing questions","Transfers when human needed","Full transcripts in dashboard"].map((item,i)=><div key={i} style={{display:"flex",gap:8,marginBottom:10}}><span style={{color:B,flexShrink:0,fontSize:12,marginTop:2}}>→</span><span style={{fontSize:13.5,color:"rgba(255,255,255,0.5)",lineHeight:1.5}}>{item}</span></div>)}</div></FI></div></div></section>);
}

function Objections() {
  return (<section style={{ background: BG2, padding: "80px 24px" }}><div style={{ maxWidth: 800, margin: "0 auto" }}><FI><h2 style={{ fontSize: "clamp(24px,3vw,32px)", fontWeight: 800, color: "#fff", marginBottom: 36, textAlign: "center" }}>"Will it sound robotic?"</h2></FI><FI delay={0.05}><p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 20, maxWidth: 650, margin: "0 auto 20px" }}>Today's voice bots sound like a friendly receptionist. Natural pacing, conversational tone. Most callers don't realize they're talking to AI. The chatbot feels like texting with a helpful staff member.</p><p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 650, margin: "0 auto" }}>What customers actually hate isn't AI. It's being ignored. A call that rings 8 times and goes to voicemail costs you business. An AI that picks up immediately is a dramatically better experience.</p></FI></div></section>);
}

function TryItOut() {
  const [voiceLoaded, setVoiceLoaded] = useState(false);
  const [voiceUses, setVoiceUses] = useState(0);
  const MAX_VOICE_USES = 2;

  const loadVoiceWidget = () => {
    if (voiceUses >= MAX_VOICE_USES || voiceLoaded) return;
    setVoiceLoaded(true);
    setVoiceUses(prev => prev + 1);
    const container = document.getElementById("voice-widget-container");
    if (!container) return;
    const script = document.createElement("script");
    script.src = "https://beta.leadconnectorhq.com/loader.js";
    script.setAttribute("data-resources-url", "https://beta.leadconnectorhq.com/chat-widget/loader.js");
    script.setAttribute("data-widget-id", "69be08d9db14804b0b82bfce");
    container.appendChild(script);
  };

  return (
    <section style={{ background: BG, padding: "80px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <FI>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ color: B, fontWeight: 700, fontSize: 13, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 12 }}>Try it yourself</p>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 800, color: "#fff", marginBottom: 14 }}>Test our AI live</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 600, margin: "0 auto", lineHeight: 1.65 }}>We built a demo for a fictional laundromat called Sparklean Laundromat in Honolulu. Try both AI tools below and imagine this running for your business.</p>
          </div>
        </FI>
        <div className="try-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <FI>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "32px 28px", height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>📞</div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 12 }}>AI Voice Bot</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, marginBottom: 20, flex: 1 }}>Call the Sparklean Laundromat AI Voice Bot. Ask about self-service pricing, wash and fold turnaround times, pickup and delivery areas — anything a real customer would call about. Listen to how natural it sounds.</p>
              {!voiceLoaded ? (
                voiceUses >= MAX_VOICE_USES ? (
                  <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "14px 18px", textAlign: "center" }}>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0 }}>Demo limit reached for this session. <a href="/contact" style={{ color: B, textDecoration: "none", fontWeight: 600 }}>Contact us</a> to learn more.</p>
                  </div>
                ) : (
                  <button onClick={loadVoiceWidget} style={{ background: B, color: "#fff", border: "none", borderRadius: 10, padding: "13px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 2px 16px rgba(43,127,255,0.3)", transition: "transform .15s" }} onMouseEnter={e => e.target.style.transform = "scale(1.02)"} onMouseLeave={e => e.target.style.transform = "scale(1)"}>
                    Try the Voice AI Demo
                  </button>
                )
              ) : (
                <div id="voice-widget-container" style={{ minHeight: 48 }} />
              )}
            </div>
          </FI>
          <FI delay={0.08}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "32px 28px", height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>💬</div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Chat With Us</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, marginBottom: 20, flex: 1 }}>Have questions about our services or ready to take the next step? Click the chat widget in the bottom-right corner to talk with our Fresh Leads Marketing AI assistant. Ask about pricing, what's included, how onboarding works, or anything else about working with us.</p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: B, fontSize: 14, fontWeight: 600 }}>
                <span style={{ fontSize: 18 }}>↘</span> Chat with our AI in the bottom right
              </div>
            </div>
          </FI>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  const Q = [["Can the chatbot handle booking or scheduling?","No, the chatbot does not handle booking or scheduling. It's designed to answer customer questions, provide information about your services and hours, and direct people to contact you for anything that requires a conversation with your team."],["What happens if the chatbot can't answer a question?","If the chatbot encounters a question it can't handle, it will direct the customer to reach out to your team at the phone number provided. The chatbot is designed to handle the majority of common questions, but it knows when to point someone to a real person."],["Can I customize what the chatbot says?","Yes. During setup, we provide you with a FAQ template. You add your specific questions and answers to the template, and that's what the AI is trained on. If anything changes about your business, you update the template and we retrain the chatbot so it always gives current, accurate information."],["Is the chatbot available 24/7?","Yes. The AI chatbot runs around the clock, which means customers can get answers and assistance even when your laundromat is closed or your staff is busy. This is especially valuable for after-hours inquiries when most calls go unanswered."],["Will the chatbot sound robotic?","No. Our AI chatbots are designed to have natural, conversational responses. Most customers don't realize they're talking to AI. The chatbot is trained on your specific business details so it speaks in a way that feels like a helpful member of your staff, not a generic robot."]];
  return (<section style={{ background: BG, padding: "80px 24px" }}><div style={{ maxWidth: 700, margin: "0 auto" }}><FI><h2 style={{ fontSize: "clamp(24px,3vw,32px)", fontWeight: 800, color: "#fff", marginBottom: 36, textAlign: "center" }}>Common questions</h2></FI>{Q.map(([q,a],i)=><FI key={i} delay={i*.03}><div onClick={()=>setOpen(open===i?null:i)} style={{background:open===i?"rgba(43,127,255,0.04)":"rgba(255,255,255,0.03)",border:`1px solid ${open===i?"rgba(43,127,255,0.2)":"rgba(255,255,255,0.06)"}`,borderRadius:12,marginBottom:8,cursor:"pointer"}}><div style={{padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:14}}><h3 style={{fontSize:14,fontWeight:640,color:"#fff",margin:0}}>{q}</h3><span style={{width:24,height:24,borderRadius:6,background:open===i?B:"rgba(255,255,255,0.07)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:open===i?"#fff":"rgba(255,255,255,0.3)",fontSize:15}}><span style={{transform:open===i?"rotate(45deg)":"none",transition:"transform .2s",display:"block"}}>+</span></span></div>{open===i&&<div style={{padding:"0 18px 14px"}}><p style={{fontSize:13.5,color:"rgba(255,255,255,0.45)",lineHeight:1.65,margin:0}}>{a}</p></div>}</div></FI>)}</div></section>);
}

function CTA() {
  return (<section style={{ background: BG2, padding: "90px 24px" }}><div style={{ maxWidth: 700, margin: "0 auto" }}><FI><div style={{ background: "linear-gradient(135deg, rgba(43,127,255,0.1), rgba(43,127,255,0.03))", border: "1px solid rgba(43,127,255,0.18)", borderRadius: 20, padding: "clamp(36px,6vw,56px) clamp(24px,5vw,44px)", textAlign: "center" }}><h2 style={{ fontSize: "clamp(24px,4vw,34px)", fontWeight: 800, color: "#fff", marginBottom: 12 }}>Ready to get started?</h2><p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", maxWidth: 440, margin: "0 auto 20px", lineHeight: 1.6 }}>No contracts. No commitment. Just a clear plan for your chatbot.</p><a href="/contact" style={{ display: "inline-block", background: B, color: "#fff", padding: "14px 30px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 20px rgba(43,127,255,0.3)" }}>Free Marketing Audit →</a></div></FI></div></section>);
}
function Footer() { return (<footer style={{background:BG,padding:"60px 24px 32px",borderTop:"1px solid rgba(255,255,255,0.05)"}}><div className="footer-inner" style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:40,marginBottom:40}}><div><Logo/><p style={{fontSize:13,color:"rgba(255,255,255,0.4)",lineHeight:1.6,marginTop:12,marginBottom:16}}>Marketing built exclusively for laundromats.</p><div style={{fontSize:13,color:"rgba(255,255,255,0.4)",marginBottom:8}}><div style={{marginBottom:6}}>📞 <a href="tel:808-736-1539" style={{color:"rgba(255,255,255,0.6)",textDecoration:"none"}}>808-736-1539</a></div><div>📧 <a href={"mailto:"+"info"+"@"+"freshleadsmarketing.com"} style={{color:"rgba(255,255,255,0.6)",textDecoration:"none"}}>{['info','@','freshleadsmarketing','.com'].join('')}</a></div></div></div><div><h4 style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:16}}>Quick Links</h4><div style={{display:"flex",flexDirection:"column",gap:8}}>{[["Home","/"],["Services","/services"],["About","/about"],["Pricing","/pricing"],["Blog","/blog"],["FAQ","/faq"],["Contact","/contact"]].map(([label,href])=>(<a key={href} href={href} style={{fontSize:13,color:"rgba(255,255,255,0.4)",textDecoration:"none",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.4)"}>{label}</a>))}</div></div><div><h4 style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:16}}>Services</h4><div style={{display:"flex",flexDirection:"column",gap:8}}>{[["Geo-Fencing Ads","/services/geo-fencing-ads"],["Email & SMS","/services/email-sms"],["CRM Integration","/services/crm"],["AI Chatbot & Voice AI","/services/ai-chatbot"],["Google Reviews","/services/google-reviews"],["B2B Outreach","/services/b2b-outreach"]].map(([label,href])=>(<a key={href} href={href} style={{fontSize:13,color:"rgba(255,255,255,0.4)",textDecoration:"none",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.4)"}>{label}</a>))}</div></div><div><h4 style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:16}}>Legal</h4><div style={{display:"flex",flexDirection:"column",gap:8}}>{[["Privacy Policy","/privacy"],["Terms of Service","/terms"]].map(([label,href])=>(<a key={href} href={href} style={{fontSize:13,color:"rgba(255,255,255,0.4)",textDecoration:"none",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.4)"}>{label}</a>))}</div></div></div><div style={{borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:24,textAlign:"center"}}><p style={{fontSize:12,color:"rgba(255,255,255,0.2)",margin:0}}>© 2026 Fresh Leads Marketing. All rights reserved.</p></div></footer>); }

export default function Page() {
  return (<div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: BG, minHeight: "100vh" }}><Nav /><Hero /><KeyBenefits /><Features /><TryItOut /><Objections /><FAQ /><CTA /><Footer /></div>);
}

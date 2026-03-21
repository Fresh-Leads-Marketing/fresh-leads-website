"use client";
import { useState, useEffect, useRef } from "react";
const B="#2B7FFF",BG="#07090D",BG2="#0C1017",BG3="#101520";
function useV(t=0.1){const r=useRef(null),[v,s]=useState(false);useEffect(()=>{const e=r.current;if(!e)return;const o=new IntersectionObserver(([x])=>{if(x.isIntersecting){s(true);o.disconnect()}},{threshold:t});o.observe(e);return()=>o.disconnect()},[t]);return[r,v]}
function FI({children,delay=0}){const[r,v]=useV();return(<div ref={r} style={{opacity:v?1:0,transform:v?"translateY(0)":"translateY(24px)",transition:`opacity .6s ease ${delay}s, transform .6s ease ${delay}s`}}>{children}</div>)}
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

function Hero(){return(<section style={{background:BG,padding:"130px 24px 70px",position:"relative"}}><div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 60% 40% at 50% 20%, rgba(43,127,255,0.07) 0%, transparent 60%)"}}/><div style={{maxWidth:1100,margin:"0 auto",position:"relative"}}><div className="hg" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:44,alignItems:"center"}}><FI><div><a href="/services" style={{color:B,fontSize:13,fontWeight:600,textDecoration:"none",display:"inline-block",marginBottom:16}}>← All Services</a><span style={{fontSize:32,display:"block",marginBottom:12}}>⭐</span><h1 style={{fontSize:"clamp(30px,4.5vw,46px)",fontWeight:800,color:"#fff",lineHeight:1.1,letterSpacing:"-.03em",marginBottom:16}}>Google Reviews for <span style={{color:B}}>Laundromats</span></h1><p style={{fontSize:17,color:"rgba(255,255,255,0.5)",lineHeight:1.65,marginBottom:28}}>Systematically generate 5-star reviews and automatically respond to every one with AI. More reviews = higher Google Maps ranking = more people find you when searching "laundromat near me." Free traffic that compounds forever.</p><a href="/contact" style={{background:B,color:"#fff",padding:"14px 26px",borderRadius:10,fontWeight:700,fontSize:15,textDecoration:"none",boxShadow:"0 2px 16px rgba(43,127,255,0.3)"}}>Get Started →</a></div></FI><FI delay={0.1}><svg width="100%" viewBox="0 0 400 300" fill="none"><rect x="0" y="0" width="400" height="300" rx="16" fill={BG3} stroke="rgba(255,255,255,0.07)"/><rect x="90" y="16" width="220" height="76" rx="12" fill="rgba(43,127,255,0.05)" stroke="rgba(43,127,255,0.1)"/><text x="200" y="48" textAnchor="middle" fill={B} fontSize="32" fontWeight="800" fontFamily="sans-serif">4.8</text><text x="148" y="72" fill="#F59E0B" fontSize="14" fontFamily="sans-serif">★ ★ ★ ★ ★</text><text x="220" y="72" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="sans-serif">247 reviews</text>{[["Great service, super clean!","Maria G. · ★★★★★"],["Best laundromat in town","James R. · ★★★★★"],["Fast pickup & delivery!","Lisa M. · ★★★★★"],["Friendly staff, fair prices","David K. · ★★★★★"]].map(([text,author],i)=>(<g key={i}><rect x="20" y={106+i*42} width="360" height="34" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)"/><text x="36" y={120+i*42} fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="sans-serif">"{text}"</text><text x="36" y={132+i*42} fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="sans-serif">{author}</text></g>))}</svg></FI></div></div></section>)}

function AIAutoResponse(){return(<section style={{background:BG2,padding:"80px 24px"}}><div style={{maxWidth:900,margin:"0 auto"}}><FI><p style={{color:B,fontWeight:700,fontSize:13,letterSpacing:".07em",textTransform:"uppercase",marginBottom:12,textAlign:"center"}}>Save hours every week</p><h2 style={{fontSize:"clamp(24px,3.5vw,36px)",fontWeight:800,color:"#fff",marginBottom:14,textAlign:"center"}}>AI-powered review responses</h2><p style={{fontSize:15,color:"rgba(255,255,255,0.45)",textAlign:"center",maxWidth:560,margin:"0 auto 36px",lineHeight:1.65}}>Every Google review your business receives gets a professional, personalized response automatically. Our AI reads each review, understands the context, and crafts a thoughtful reply that makes your customers feel heard.</p></FI><div className="csg detail-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}><FI><div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:"28px 26px"}}><h3 style={{fontSize:16,fontWeight:720,color:"#fff",marginBottom:16}}>How it works</h3>{[["New review comes in","A customer leaves a review on your Google Business Profile"],["AI analyzes the review","Our system reads the review, identifies the sentiment, and picks up on specific details the customer mentioned"],["Personalized response drafted","A thoughtful, on-brand reply is generated that addresses what the customer said"],["Response posted automatically","The reply goes live on your Google listing, so every review gets a timely response"]].map(([title,desc],i)=>(<div key={i} style={{display:"flex",gap:14,marginBottom:i<3?18:0}}><div style={{width:28,height:28,borderRadius:8,background:"rgba(43,127,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:13,fontWeight:800,color:B}}>{i+1}</div><div><div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:2}}>{title}</div><div style={{fontSize:13,color:"rgba(255,255,255,0.4)",lineHeight:1.55}}>{desc}</div></div></div>))}</div></FI><FI delay={0.08}><div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:"28px 26px"}}><h3 style={{fontSize:16,fontWeight:720,color:"#fff",marginBottom:16}}>Why this matters</h3>{[["Saves you hours","No more logging into Google to write replies. Every review is handled for you, so you can focus on running your laundromat."],["Faster response times","Customers notice when businesses respond quickly. AI replies go out within minutes, not days."],["Consistent professionalism","Every response is well-written and on-brand. No more rushed or forgotten replies."],["Turns negatives into positives","AI responds to critical reviews with empathy and professionalism, showing future customers that you care and take action."]].map(([title,desc],i)=>(<div key={i} style={{display:"flex",gap:12,marginBottom:i<3?18:0}}><div style={{color:"#22C55E",fontSize:12,marginTop:2,flexShrink:0}}>✓</div><div><div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:2}}>{title}</div><div style={{fontSize:13,color:"rgba(255,255,255,0.4)",lineHeight:1.55}}>{desc}</div></div></div>))}</div></FI></div></div></section>)}

function WhyReviews(){return(<section style={{background:BG,padding:"80px 24px"}}><div style={{maxWidth:900,margin:"0 auto"}}><FI><h2 style={{fontSize:"clamp(24px,3vw,34px)",fontWeight:800,color:"#fff",marginBottom:36,textAlign:"center"}}>Why reviews are your most valuable asset</h2></FI><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:14}}>{[["📍","Higher Maps ranking","More 5-star reviews = higher position in local search results."],["🤝","Instant trust","88% of consumers trust reviews as much as personal recommendations."],["💰","Free traffic forever","Unlike ads, reviews keep driving traffic permanently."],["🛡️","Competitive moat","250 reviews vs 30 is nearly impossible to catch."],["📈","More clicks","4.5+ star businesses get 28% more clicks from search."],["🔄","Feedback loop","Learn what's working and what needs fixing directly from customers."]].map(([icon,title,desc],i)=>(<FI key={i} delay={i*0.05}><div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:"24px 22px"}}><span style={{fontSize:22}}>{icon}</span><h3 style={{fontSize:15,fontWeight:720,color:"#fff",marginTop:10,marginBottom:6}}>{title}</h3><p style={{fontSize:13.5,color:"rgba(255,255,255,0.45)",lineHeight:1.6}}>{desc}</p></div></FI>))}</div></div></section>)}

function Objections(){return(<section style={{background:BG2,padding:"80px 24px"}}><div style={{maxWidth:800,margin:"0 auto"}}><FI><h2 style={{fontSize:"clamp(24px,3vw,32px)",fontWeight:800,color:"#fff",marginBottom:36,textAlign:"center"}}>"What if someone leaves a bad review?"</h2></FI><FI delay={0.05}><p style={{fontSize:16,color:"rgba(255,255,255,0.5)",lineHeight:1.7,marginBottom:20,maxWidth:650,margin:"0 auto 20px"}}>Our AI auto-response system handles it immediately. Within minutes of a negative review, a professional, empathetic response is posted on your behalf. No more scrambling to draft a reply or forgetting to respond altogether.</p><p style={{fontSize:16,color:"rgba(255,255,255,0.5)",lineHeight:1.7,marginBottom:20,maxWidth:650,margin:"0 auto 20px"}}>A business with 200 reviews and a 4.7 is actually more trustworthy than 15 reviews at 5.0. A few honest critiques make your positive reviews feel genuine. What matters is how you respond.</p><p style={{fontSize:16,color:"rgba(255,255,255,0.5)",lineHeight:1.7,maxWidth:650,margin:"0 auto"}}>A timely response like "Thank you for the feedback, we've addressed the dryer issue" shows future customers you care and take action. That kind of responsiveness is more powerful than any ad.</p></FI></div></section>)}

function FAQ(){const[o,setO]=useState(null);const Q=[["Is asking for reviews OK?","Google explicitly encourages it. You can't incentivize positive reviews specifically, but asking for honest feedback is recommended."],["How many reviews can we expect per month?","This varies depending on your location and how many customers you're serving. We set up the system and automations to maximize review requests, but we don't guarantee a specific number of reviews. Every market is different, and results depend on factors like customer volume and engagement."],["Few reviews now?","Best time to start. Going 20→100 has more Maps impact than 200→280."],["POS integration?","Yes. Auto-triggers review requests after transactions. Zero manual work."],["Fake reviews?","We monitor and flag them. We never generate fakes. every review is real."]];return(<section style={{background:BG,padding:"80px 24px"}}><div style={{maxWidth:700,margin:"0 auto"}}><FI><h2 style={{fontSize:"clamp(24px,3vw,32px)",fontWeight:800,color:"#fff",marginBottom:36,textAlign:"center"}}>Your questions, answered</h2></FI>{Q.map(([q,a],i)=><FI key={i} delay={i*.03}><div onClick={()=>setO(o===i?null:i)} style={{background:o===i?"rgba(43,127,255,0.04)":"rgba(255,255,255,0.03)",border:`1px solid ${o===i?"rgba(43,127,255,0.2)":"rgba(255,255,255,0.06)"}`,borderRadius:12,marginBottom:8,cursor:"pointer"}}><div style={{padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:14}}><h3 style={{fontSize:14,fontWeight:640,color:"#fff",margin:0}}>{q}</h3><span style={{width:24,height:24,borderRadius:6,background:o===i?B:"rgba(255,255,255,0.07)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:o===i?"#fff":"rgba(255,255,255,0.3)",fontSize:15}}><span style={{transform:o===i?"rotate(45deg)":"none",transition:"transform .2s",display:"block"}}>+</span></span></div>{o===i&&<div style={{padding:"0 18px 14px"}}><p style={{fontSize:13.5,color:"rgba(255,255,255,0.45)",lineHeight:1.65,margin:0}}>{a}</p></div>}</div></FI>)}</div></section>)}

function CTA(){return(<section style={{background:BG2,padding:"90px 24px"}}><div style={{maxWidth:700,margin:"0 auto"}}><FI><div style={{background:"linear-gradient(135deg, rgba(43,127,255,0.1), rgba(43,127,255,0.03))",border:"1px solid rgba(43,127,255,0.18)",borderRadius:20,padding:"clamp(36px,6vw,56px) clamp(24px,5vw,44px)",textAlign:"center"}}><h2 style={{fontSize:"clamp(24px,4vw,34px)",fontWeight:800,color:"#fff",marginBottom:12}}>Ready to dominate local search?</h2><p style={{fontSize:15,color:"rgba(255,255,255,0.5)",maxWidth:440,margin:"0 auto 20px",lineHeight:1.6}}>Book a free call. We'll show you where you rank vs. competitors, how to close the gap, and how AI auto-responses save you hours every week.</p><a href="/contact" style={{display:"inline-block",background:B,color:"#fff",padding:"14px 30px",borderRadius:10,fontWeight:700,fontSize:15,textDecoration:"none",boxShadow:"0 4px 20px rgba(43,127,255,0.3)"}}>Free Marketing Audit →</a><p style={{fontSize:13,color:"rgba(255,255,255,0.3)",marginTop:14}}>No contracts. No commitment. Just a clear plan for your reviews.</p></div></FI></div></section>)}
function Footer(){return(<footer style={{background:BG,padding:"60px 24px 32px",borderTop:"1px solid rgba(255,255,255,0.05)"}}><div className="footer-inner" style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:40,marginBottom:40}}><div><Logo/><p style={{fontSize:13,color:"rgba(255,255,255,0.4)",lineHeight:1.6,marginTop:12,marginBottom:16}}>Marketing built exclusively for laundromats.</p><div style={{fontSize:13,color:"rgba(255,255,255,0.4)",marginBottom:8}}><div style={{marginBottom:6}}>📞 <a href="tel:808-736-1539" style={{color:"rgba(255,255,255,0.6)",textDecoration:"none"}}>808-736-1539</a></div><div>📧 <a href={"mailto:"+"info"+"@"+"freshleadsmarketing.com"} style={{color:"rgba(255,255,255,0.6)",textDecoration:"none"}}>{['info','@','freshleadsmarketing','.com'].join('')}</a></div></div></div><div><h4 style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:16}}>Quick Links</h4><div style={{display:"flex",flexDirection:"column",gap:8}}>{[["Home","/"],["Services","/services"],["About","/about"],["Pricing","/pricing"],["Blog","/blog"],["FAQ","/faq"],["Contact","/contact"]].map(([label,href])=>(<a key={href} href={href} style={{fontSize:13,color:"rgba(255,255,255,0.4)",textDecoration:"none",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.4)"}>{label}</a>))}</div></div><div><h4 style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:16}}>Services</h4><div style={{display:"flex",flexDirection:"column",gap:8}}>{[["Geo-Fencing Ads","/services/geo-fencing-ads"],["Email & SMS","/services/email-sms"],["CRM Integration","/services/crm"],["AI Chatbot & Voice AI","/services/ai-chatbot"],["Google Reviews","/services/google-reviews"],["B2B Outreach","/services/b2b-outreach"]].map(([label,href])=>(<a key={href} href={href} style={{fontSize:13,color:"rgba(255,255,255,0.4)",textDecoration:"none",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.4)"}>{label}</a>))}</div></div><div><h4 style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:16}}>Legal</h4><div style={{display:"flex",flexDirection:"column",gap:8}}>{[["Privacy Policy","/privacy"],["Terms of Service","/terms"]].map(([label,href])=>(<a key={href} href={href} style={{fontSize:13,color:"rgba(255,255,255,0.4)",textDecoration:"none",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.4)"}>{label}</a>))}</div></div></div><div style={{borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:24,textAlign:"center"}}><p style={{fontSize:12,color:"rgba(255,255,255,0.2)",margin:0}}>© 2026 Fresh Leads Marketing. All rights reserved.</p></div></footer>)}

export default function Page(){return(<div style={{fontFamily:"'DM Sans', -apple-system, sans-serif",background:BG,minHeight:"100vh"}}><Nav/><Hero/><AIAutoResponse/><WhyReviews/><Objections/><FAQ/><CTA/><Footer/></div>)}

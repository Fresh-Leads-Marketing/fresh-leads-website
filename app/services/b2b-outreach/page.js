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
    ["AI Chatbot", "/services/ai-chatbot"],
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
          <div style={{ background: "rgba(12,16,23,0.98)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "8px 0", minWidth: 200, boxShadow: "0 8px 32px rgba(0,0,0,0.5)", backdropFilter: "blur(20px)" }}>
            {items.map(([label, href]) => (
              <a key={href} href={href} style={{ display: "block", padding: "9px 18px", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13, fontWeight: 500, transition: "background .15s" }} onMouseEnter={e => { e.target.style.background = "rgba(43,127,255,0.08)"; e.target.style.color = "#fff"; }} onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "rgba(255,255,255,0.6)"; }}>{label}</a>
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
    ["AI Chatbot", "/services/ai-chatbot"],
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
            const isSub = ["Geo-Fencing Ads","AI Chatbot","Email & SMS","CRM Integration","B2B Outreach","Google Reviews"].includes(label);
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

function Hero(){return(<section style={{background:BG,padding:"130px 24px 70px",position:"relative"}}><div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 60% 40% at 50% 20%, rgba(43,127,255,0.07) 0%, transparent 60%)"}}/><div style={{maxWidth:1100,margin:"0 auto",position:"relative"}}><div className="hg" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:44,alignItems:"center"}}><FI><div><a href="/services" style={{color:B,fontSize:13,fontWeight:600,textDecoration:"none",display:"inline-block",marginBottom:16}}>← All Services</a><span style={{fontSize:32,display:"block",marginBottom:12}}>📧</span><h1 style={{fontSize:"clamp(30px,4.5vw,46px)",fontWeight:800,color:"#fff",lineHeight:1.1,letterSpacing:"-.03em",marginBottom:16}}>B2B Cold Outreach for <span style={{color:B}}>Laundromats</span></h1><p style={{fontSize:17,color:"rgba(255,255,255,0.5)",lineHeight:1.65,marginBottom:28}}>We find hotels, gyms, Airbnbs, spas, and salons that need commercial laundry. Then reach out with personalized sequences. You show up to the meetings we book. Most clients land their first contract within 60 days.</p><a href="/contact" style={{background:B,color:"#fff",padding:"14px 26px",borderRadius:10,fontWeight:700,fontSize:15,textDecoration:"none",boxShadow:"0 2px 16px rgba(43,127,255,0.3)"}}>Get Started →</a></div></FI><FI delay={0.1}><svg width="100%" viewBox="0 0 400 300" fill="none"><rect x="0" y="0" width="400" height="300" rx="16" fill={BG3} stroke="rgba(255,255,255,0.07)"/><text x="20" y="32" fill="rgba(255,255,255,0.5)" fontSize="10" fontWeight="700" fontFamily="sans-serif">Pipeline</text><text x="320" y="32" fill={B} fontSize="10" fontWeight="700" fontFamily="sans-serif">12 leads</text>{[["Hilton Downtown","Hotel · 200 rooms","Meeting booked"],["Gold's Gym","Gym · 3 locations","Replied"],["Sunset Spa","Spa · High volume","Sequence sent"],["Marriott Airport","Hotel · 340 rooms","Opened email"],["Anytime Fitness","Gym · 180 members","Meeting booked"]].map(([name,type,status],i)=>(<g key={i}><rect x="20" y={46+i*46} width="360" height="38" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)"/><text x="36" y={62+i*46} fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="600" fontFamily="sans-serif">{name}</text><text x="36" y={76+i*46} fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="sans-serif">{type}</text><rect x="290" y={56+i*46} width="78" height="18" rx="5" fill={status.includes("booked")?"rgba(34,197,94,0.1)":"rgba(255,255,255,0.04)"}/><text x="329" y={68+i*46} textAnchor="middle" fill={status.includes("booked")?"#22C55E":"rgba(255,255,255,0.35)"} fontSize="7" fontWeight="600" fontFamily="sans-serif">{status}</text></g>))}</svg></FI></div></div></section>)}

function CaseStudy(){return(<section style={{background:BG2,padding:"70px 24px"}}><div style={{maxWidth:900,margin:"0 auto"}}><FI><p style={{color:B,fontWeight:700,fontSize:13,letterSpacing:".07em",textTransform:"uppercase",marginBottom:24,textAlign:"center"}}>How it works</p></FI><div className="csg detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr",gap:16}}><FI><div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:"28px 26px"}}><h3 style={{fontSize:16,fontWeight:700,color:"#fff",marginBottom:12}}>Find commercial accounts nearby</h3><p style={{fontSize:15,color:"rgba(255,255,255,0.6)",lineHeight:1.65}}>We identify hotels, gyms, salons, spas, Airbnbs, and other businesses within your service area that need commercial laundry. You get a targeted prospect list ready for outreach.</p></div></FI><FI delay={0.08}><div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:"28px 26px"}}><h3 style={{fontSize:16,fontWeight:700,color:"#fff",marginBottom:12}}>Professional outreach campaigns</h3><p style={{fontSize:15,color:"rgba(255,255,255,0.6)",lineHeight:1.65}}>We craft and send personalized email sequences to decision-makers at each business. Every message is tailored to the prospect's industry and specific needs.</p></div></FI></div></div></section>)}

function Targets(){return(<section style={{background:BG,padding:"80px 24px"}}><div style={{maxWidth:900,margin:"0 auto"}}><FI><h2 style={{fontSize:"clamp(24px,3vw,34px)",fontWeight:800,color:"#fff",marginBottom:36,textAlign:"center"}}>Who we target for you</h2></FI><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:14}}>{[["🏨","Hotels & motels","Linens, towels, robes. $2K-10K/month contracts."],["🏋️","Gyms & fitness","Towels, uniforms. Daily turnaround."],["🏠","Airbnbs","Sheets, towels between guests. consistent need."],["💆","Spas & salons","Towels, robes, linens. quality matters."],["🍽️","Restaurants","Tablecloths, napkins, aprons, uniforms."],["🏥","Medical offices","Scrubs, lab coats. compliance requirements."]].map(([icon,title,desc],i)=>(<FI key={i} delay={i*0.04}><div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:"22px 20px"}}><span style={{fontSize:20}}>{icon}</span><h3 style={{fontSize:14,fontWeight:720,color:"#fff",marginTop:8,marginBottom:4}}>{title}</h3><p style={{fontSize:13,color:"rgba(255,255,255,0.4)",lineHeight:1.55}}>{desc}</p></div></FI>))}</div></div></section>)}

function Objections(){return(<section style={{background:BG2,padding:"80px 24px"}}><div style={{maxWidth:800,margin:"0 auto"}}><FI><h2 style={{fontSize:"clamp(24px,3vw,32px)",fontWeight:800,color:"#fff",marginBottom:36,textAlign:"center"}}>"I've tried cold email. Didn't work"</h2></FI><FI delay={0.05}><p style={{fontSize:16,color:"rgba(255,255,255,0.5)",lineHeight:1.7,marginBottom:20,maxWidth:650,margin:"0 auto 20px"}}>Generic blasts don't work. agreed. We research each prospect individually, find the decision-maker by name, and write personalized multi-step sequences. A hotel GM gets a different email than a gym owner.</p><p style={{fontSize:16,color:"rgba(255,255,255,0.5)",lineHeight:1.7,maxWidth:650,margin:"0 auto"}}>Our reply rates are 15-25%. vs. 1-2% for mass blasts. That's the difference between targeted outreach and spam.</p></FI></div></section>)}

function FAQ(){const[o,setO]=useState(null);const Q=[["Time to first contract?","Meetings in 2-4 weeks, first contract within 60 days typically."],["Do I do any outreach?","No. We handle research, lists, copy, sending, replies, and meeting booking."],["Leads per month?","5-15 qualified leads depending on market size."],["Is cold email legal?","Yes. We follow CAN-SPAM, include opt-outs, use verified emails."],["Typical contract value?","$1,500/month (small gym) to $10,000+/month (large hotel)."]];return(<section style={{background:BG,padding:"80px 24px"}}><div style={{maxWidth:700,margin:"0 auto"}}><FI><h2 style={{fontSize:"clamp(24px,3vw,32px)",fontWeight:800,color:"#fff",marginBottom:36,textAlign:"center"}}>Your questions, answered</h2></FI>{Q.map(([q,a],i)=><FI key={i} delay={i*.03}><div onClick={()=>setO(o===i?null:i)} style={{background:o===i?"rgba(43,127,255,0.04)":"rgba(255,255,255,0.03)",border:`1px solid ${o===i?"rgba(43,127,255,0.2)":"rgba(255,255,255,0.06)"}`,borderRadius:12,marginBottom:8,cursor:"pointer"}}><div style={{padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:14}}><h3 style={{fontSize:14,fontWeight:640,color:"#fff",margin:0}}>{q}</h3><span style={{width:24,height:24,borderRadius:6,background:o===i?B:"rgba(255,255,255,0.07)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:o===i?"#fff":"rgba(255,255,255,0.3)",fontSize:15}}><span style={{transform:o===i?"rotate(45deg)":"none",transition:"transform .2s",display:"block"}}>+</span></span></div>{o===i&&<div style={{padding:"0 18px 14px"}}><p style={{fontSize:13.5,color:"rgba(255,255,255,0.45)",lineHeight:1.65,margin:0}}>{a}</p></div>}</div></FI>)}</div></section>)}

function CTA(){return(<section style={{background:BG2,padding:"90px 24px"}}><div style={{maxWidth:700,margin:"0 auto"}}><FI><div style={{background:"linear-gradient(135deg, rgba(43,127,255,0.1), rgba(43,127,255,0.03))",border:"1px solid rgba(43,127,255,0.18)",borderRadius:20,padding:"clamp(36px,6vw,56px) clamp(24px,5vw,44px)",textAlign:"center"}}><h2 style={{fontSize:"clamp(24px,4vw,34px)",fontWeight:800,color:"#fff",marginBottom:12}}>Ready to land commercial contracts?</h2><p style={{fontSize:15,color:"rgba(255,255,255,0.5)",maxWidth:440,margin:"0 auto 20px",lineHeight:1.6}}>Book a free call. We'll identify top commercial prospects in your area.</p><a href="/contact" style={{display:"inline-block",background:B,color:"#fff",padding:"14px 30px",borderRadius:10,fontWeight:700,fontSize:15,textDecoration:"none",boxShadow:"0 4px 20px rgba(43,127,255,0.3)"}}>Free Marketing Audit →</a><p style={{fontSize:13,color:"rgba(255,255,255,0.3)",marginTop:14,fontStyle:"italic"}}>No contracts. No commitment. Just a clear plan for your B2B outreach.</p></div></FI></div></section>)}
function Footer(){return(<footer style={{background:BG,padding:"60px 24px 32px",borderTop:"1px solid rgba(255,255,255,0.05)"}}><div className="footer-inner" style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:40,marginBottom:40}}><div><Logo/><p style={{fontSize:13,color:"rgba(255,255,255,0.4)",lineHeight:1.6,marginTop:12,marginBottom:16}}>Marketing built exclusively for laundromats.</p><div style={{fontSize:13,color:"rgba(255,255,255,0.4)",marginBottom:8}}><div style={{marginBottom:6}}>📞 <a href="tel:808-736-1539" style={{color:"rgba(255,255,255,0.6)",textDecoration:"none"}}>808-736-1539</a></div><div>📧 <a href="mailto:info@freshleadsmarketing.com" style={{color:"rgba(255,255,255,0.6)",textDecoration:"none"}}>info@freshleadsmarketing.com</a></div></div></div><div><h4 style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:16}}>Quick Links</h4><div style={{display:"flex",flexDirection:"column",gap:8}}>{[["Home","/"],["Services","/services"],["About","/about"],["Pricing","/pricing"],["Blog","/blog"],["FAQ","/faq"],["Contact","/contact"]].map(([label,href])=>(<a key={href} href={href} style={{fontSize:13,color:"rgba(255,255,255,0.4)",textDecoration:"none",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.4)"}>{label}</a>))}</div></div><div><h4 style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:16}}>Services</h4><div style={{display:"flex",flexDirection:"column",gap:8}}>{[["Geo-Fencing Ads","/services/geo-fencing-ads"],["Email & SMS","/services/email-sms"],["CRM Integration","/services/crm"],["AI Chatbot","/services/ai-chatbot"],["Google Reviews","/services/google-reviews"],["B2B Outreach","/services/b2b-outreach"]].map(([label,href])=>(<a key={href} href={href} style={{fontSize:13,color:"rgba(255,255,255,0.4)",textDecoration:"none",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.4)"}>{label}</a>))}</div></div><div><h4 style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:16}}>Legal</h4><div style={{display:"flex",flexDirection:"column",gap:8}}>{[["Privacy Policy","/privacy"],["Terms of Service","/terms"]].map(([label,href])=>(<a key={href} href={href} style={{fontSize:13,color:"rgba(255,255,255,0.4)",textDecoration:"none",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.4)"}>{label}</a>))}</div></div></div><div style={{borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:24,textAlign:"center"}}><p style={{fontSize:12,color:"rgba(255,255,255,0.2)",margin:0}}>© 2026 Fresh Leads Marketing. All rights reserved.</p></div></footer>)}

export default function Page(){return(<div style={{fontFamily:"'DM Sans', -apple-system, sans-serif",background:BG,minHeight:"100vh"}}><Nav/><Hero/><CaseStudy/><Targets/><Objections/><FAQ/><CTA/><Footer/></div>)}

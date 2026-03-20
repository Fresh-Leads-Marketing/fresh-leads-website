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
            {["About", "Blog", "FAQ", "Contact"].map(l => <a key={l} href={l==="About"?"/about":l==="Blog"?"/blog":l==="FAQ"?"/faq":"/contact"} style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13, fontWeight: 550 }}>{l}</a>)}
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

function Hero(){return(<section style={{background:BG,padding:"130px 24px 70px",position:"relative"}}><div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 60% 40% at 50% 20%, rgba(43,127,255,0.07) 0%, transparent 60%)"}}/><div style={{maxWidth:1100,margin:"0 auto",position:"relative"}}><div className="hg" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:44,alignItems:"center"}}><FI><div><a href="/services" style={{color:B,fontSize:13,fontWeight:600,textDecoration:"none",display:"inline-block",marginBottom:16}}>← All Services</a><span style={{fontSize:32,display:"block",marginBottom:12}}>📊</span><h1 style={{fontSize:"clamp(30px,4.5vw,46px)",fontWeight:800,color:"#fff",lineHeight:1.1,letterSpacing:"-.03em",marginBottom:16}}>Custom CRM for <span style={{color:B}}>Laundromats</span></h1><p style={{fontSize:17,color:"rgba(255,255,255,0.5)",lineHeight:1.65,marginBottom:28}}>Every customer touchpoint in one place. Synced automatically from your POS. See who's visiting, who's lapsed, and who needs a re-engagement campaign. No more scattered data.</p><a href="/contact" style={{background:B,color:"#fff",padding:"14px 26px",borderRadius:10,fontWeight:700,fontSize:15,textDecoration:"none",boxShadow:"0 2px 16px rgba(43,127,255,0.3)"}}>Get Started →</a></div></FI><FI delay={0.1}><svg width="100%" viewBox="0 0 400 300" fill="none"><rect x="0" y="0" width="400" height="300" rx="16" fill={BG3} stroke="rgba(255,255,255,0.07)"/><rect x="20" y="20" width="360" height="36" rx="8" fill="rgba(43,127,255,0.04)"/><text x="36" y="42" fill="rgba(255,255,255,0.5)" fontSize="9" fontWeight="600" fontFamily="sans-serif">Customer Dashboard</text><text x="300" y="42" fill={B} fontSize="9" fontWeight="700" fontFamily="sans-serif">1,247 contacts</text>{[["Maria G.","12 visits","VIP","2 days ago"],["James K.","3 visits","New","1 week ago"],["Sarah T.","0 visits","At risk","45 days ago"],["Robert L.","8 visits","Regular","5 days ago"]].map(([name,visits,tag,last],i)=>(<g key={i}><rect x="20" y={68+i*48} width="360" height="40" rx="6" fill={i%2===0?"rgba(255,255,255,0.02)":"transparent"}/><circle cx="42" cy={88+i*48} r="11" fill="rgba(43,127,255,0.08)"/><text x="42" y={92+i*48} textAnchor="middle" fill={B} fontSize="9" fontWeight="700" fontFamily="sans-serif">{name[0]}</text><text x="62" y={84+i*48} fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="600" fontFamily="sans-serif">{name}</text><text x="62" y={97+i*48} fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="sans-serif">{visits} · {last}</text><rect x="300" y={78+i*48} width="56" height="20" rx="6" fill={tag==="VIP"?"rgba(43,127,255,0.1)":tag==="At risk"?"rgba(239,68,68,0.1)":"rgba(255,255,255,0.04)"}/><text x="328" y={92+i*48} textAnchor="middle" fill={tag==="VIP"?B:tag==="At risk"?"#EF4444":"rgba(255,255,255,0.4)"} fontSize="8" fontWeight="600" fontFamily="sans-serif">{tag}</text></g>))}<text x="200" y="286" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="sans-serif">Syncs with Cents · LaundroWorks · CCI</text></svg></FI></div></div></section>)}

function CaseStudy(){return(<section style={{background:BG2,padding:"70px 24px"}}><div style={{maxWidth:900,margin:"0 auto"}}><FI><p style={{color:B,fontWeight:700,fontSize:13,letterSpacing:".07em",textTransform:"uppercase",marginBottom:24,textAlign:"center"}}>Why CRM matters</p></FI><div className="csg detail-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",gap:16}}><FI><div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:"28px 26px"}}><h3 style={{fontSize:17,fontWeight:700,color:"#fff",marginBottom:12}}>Centralize your data</h3><p style={{fontSize:15,color:"rgba(255,255,255,0.6)",lineHeight:1.65,marginBottom:16}}>Stop switching between your POS, email, phone system, and spreadsheets. Our CRM pulls everything into one dashboard so you can see every customer interaction in one place.</p></div></FI><FI delay={0.08}><div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:"28px 26px"}}><h3 style={{fontSize:17,fontWeight:700,color:"#fff",marginBottom:12}}>Automate follow-ups</h3><p style={{fontSize:15,color:"rgba(255,255,255,0.6)",lineHeight:1.65,marginBottom:16}}>Auto-tag customers by behavior, trigger re-engagement campaigns for lapsed visitors, and track every touchpoint from first visit to lifetime loyalty.</p></div></FI><FI delay={0.16}><div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:"28px 26px"}}><h3 style={{fontSize:17,fontWeight:700,color:"#fff",marginBottom:12}}>POS API integration</h3><p style={{fontSize:15,color:"rgba(255,255,255,0.6)",lineHeight:1.65,marginBottom:16}}>We connect directly to your laundry POS system via API so customer data syncs automatically. New customers, visit history, and transaction data flow into your CRM in real time. No manual imports, no spreadsheets.</p></div></FI><FI delay={0.24}><div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:"28px 26px"}}><h3 style={{fontSize:17,fontWeight:700,color:"#fff",marginBottom:12}}>Automated email & SMS</h3><p style={{fontSize:15,color:"rgba(255,255,255,0.6)",lineHeight:1.65,marginBottom:16}}>Once synced, your CRM triggers personalized messages automatically. Welcome sequences for new customers, win-back campaigns for lapsed visitors, and review requests after every visit. All running on autopilot.</p></div></FI></div></div></section>)}

function WhoThisIsFor(){return(<section style={{background:BG2,padding:"80px 24px"}}><div style={{maxWidth:900,margin:"0 auto"}}><FI><h2 style={{fontSize:"clamp(24px,3vw,32px)",fontWeight:800,color:"#fff",marginBottom:14,textAlign:"center"}}>Who this works best for</h2><p style={{fontSize:15,color:"rgba(255,255,255,0.4)",textAlign:"center",maxWidth:520,margin:"0 auto 32px"}}>A CRM delivers the strongest results for these laundromats:</p></FI><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:12}}>{[["📊","Multi-machine laundromats","Tracking hundreds or thousands of customers across machines. A CRM turns anonymous transactions into named customers you can market to."],["🚚","Pickup & delivery operations","P&D customers expect communication. Automated texts for order updates, delivery confirmations, and follow-up campaigns keep them coming back."],["🏢","Multi-location owners","One dashboard for all locations. See which stores are driving repeat visits and which need attention. Compare performance side by side."],["💳","Owners with a POS system","If your POS captures customer data (Cents, LaundroWorks, CCI, CleanCloud), we can sync it directly via API. That's the foundation for every automated campaign."],["📉","Laundromats losing repeat customers","If customers visit once and never return, your CRM identifies them within days and triggers an automated win-back campaign before they're gone for good."],["😴","Owners tired of manual marketing","Stop sending emails by hand or tracking customers in spreadsheets. A CRM automates everything so you can focus on running your business."]].map(([icon,title,desc],i)=>(<FI key={i} delay={i*0.04}><div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:"20px 18px"}}><span style={{fontSize:20}}>{icon}</span><h3 style={{fontSize:14,fontWeight:720,color:"#fff",marginTop:8,marginBottom:4}}>{title}</h3><p style={{fontSize:13,color:"rgba(255,255,255,0.4)",lineHeight:1.55}}>{desc}</p></div></FI>))}</div></div></section>)}

function Objections(){return(<section style={{background:BG,padding:"80px 24px"}}><div style={{maxWidth:800,margin:"0 auto"}}><FI><h2 style={{fontSize:"clamp(24px,3vw,32px)",fontWeight:800,color:"#fff",marginBottom:36,textAlign:"center"}}>"I already have POS data. Why a CRM?"</h2></FI><FI delay={0.05}><p style={{fontSize:16,color:"rgba(255,255,255,0.5)",lineHeight:1.7,marginBottom:20,maxWidth:650,margin:"0 auto 20px"}}>Your POS tells you what happened at the register. A CRM tells you what to do about it. A POS shows Maria visited 12 times. A CRM shows she's a VIP who responds to SMS, left a 5-star review, and hasn't visited in 14 days. Then automatically sends a personalized message before she churns.</p><p style={{fontSize:16,color:"rgba(255,255,255,0.5)",lineHeight:1.7,maxWidth:650,margin:"0 auto"}}>Your POS is a cash register. Your CRM is a marketing brain. You need both. we connect them seamlessly.</p></FI></div></section>)}

function FAQ(){const[o,setO]=useState(null);const Q=[["Works with my software?","Yes. Cents, LaundroWorks, CCI. Data syncs automatically in real time."],["Do I manage it?","No. Full-service. We handle segmentation, campaigns, automations, reporting."],["Existing data?","We import from CSV, Excel, or other CRM exports and clean everything."],["Setup time?","5-7 days. Import, segments, automations, testing. all before launch."],["Data if I cancel?","Yours. We export everything in a clean format."]];return(<section style={{background:BG2,padding:"80px 24px"}}><div style={{maxWidth:700,margin:"0 auto"}}><FI><h2 style={{fontSize:"clamp(24px,3vw,32px)",fontWeight:800,color:"#fff",marginBottom:36,textAlign:"center"}}>Common questions</h2></FI>{Q.map(([q,a],i)=><FI key={i} delay={i*.03}><div onClick={()=>setO(o===i?null:i)} style={{background:o===i?"rgba(43,127,255,0.04)":"rgba(255,255,255,0.03)",border:`1px solid ${o===i?"rgba(43,127,255,0.2)":"rgba(255,255,255,0.06)"}`,borderRadius:12,marginBottom:8,cursor:"pointer"}}><div style={{padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:14}}><h3 style={{fontSize:14,fontWeight:640,color:"#fff",margin:0}}>{q}</h3><span style={{width:24,height:24,borderRadius:6,background:o===i?B:"rgba(255,255,255,0.07)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:o===i?"#fff":"rgba(255,255,255,0.3)",fontSize:15}}><span style={{transform:o===i?"rotate(45deg)":"none",transition:"transform .2s",display:"block"}}>+</span></span></div>{o===i&&<div style={{padding:"0 18px 14px"}}><p style={{fontSize:13.5,color:"rgba(255,255,255,0.45)",lineHeight:1.65,margin:0}}>{a}</p></div>}</div></FI>)}</div></section>)}

function CTA(){return(<section style={{background:BG,padding:"90px 24px"}}><div style={{maxWidth:700,margin:"0 auto"}}><FI><div style={{background:"linear-gradient(135deg, rgba(43,127,255,0.1), rgba(43,127,255,0.03))",border:"1px solid rgba(43,127,255,0.18)",borderRadius:20,padding:"clamp(36px,6vw,56px) clamp(24px,5vw,44px)",textAlign:"center"}}><h2 style={{fontSize:"clamp(24px,4vw,34px)",fontWeight:800,color:"#fff",marginBottom:12}}>Ready to centralize your data?</h2><p style={{fontSize:15,color:"rgba(255,255,255,0.5)",maxWidth:440,margin:"0 auto 20px",lineHeight:1.6}}>No contracts. No commitment. Just a clear plan for your CRM.</p><a href="/contact" style={{display:"inline-block",background:B,color:"#fff",padding:"14px 30px",borderRadius:10,fontWeight:700,fontSize:15,textDecoration:"none",boxShadow:"0 4px 20px rgba(43,127,255,0.3)"}}>Free Marketing Audit →</a></div></FI></div></section>)}
function Footer(){return(<footer style={{background:BG,padding:"60px 24px 32px",borderTop:"1px solid rgba(255,255,255,0.05)"}}><div className="footer-inner" style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:40,marginBottom:40}}><div><Logo/><p style={{fontSize:13,color:"rgba(255,255,255,0.4)",lineHeight:1.6,marginTop:12,marginBottom:16}}>Marketing built exclusively for laundromats.</p><div style={{fontSize:13,color:"rgba(255,255,255,0.4)",marginBottom:8}}><div style={{marginBottom:6}}>📞 <a href="tel:808-736-1539" style={{color:"rgba(255,255,255,0.6)",textDecoration:"none"}}>808-736-1539</a></div><div>📧 <a href="mailto:info@freshleadsmarketing.com" style={{color:"rgba(255,255,255,0.6)",textDecoration:"none"}}>info@freshleadsmarketing.com</a></div></div></div><div><h4 style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:16}}>Quick Links</h4><div style={{display:"flex",flexDirection:"column",gap:8}}>{[["Home","/"],["Services","/services"],["About","/about"],["Blog","/blog"],["FAQ","/faq"],["Contact","/contact"]].map(([label,href])=>(<a key={href} href={href} style={{fontSize:13,color:"rgba(255,255,255,0.4)",textDecoration:"none",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.4)"}>{label}</a>))}</div></div><div><h4 style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:16}}>Services</h4><div style={{display:"flex",flexDirection:"column",gap:8}}>{[["Geo-Fencing Ads","/services/geo-fencing-ads"],["Email & SMS","/services/email-sms"],["CRM Integration","/services/crm"],["AI Chatbot","/services/ai-chatbot"],["Google Reviews","/services/google-reviews"],["B2B Outreach","/services/b2b-outreach"]].map(([label,href])=>(<a key={href} href={href} style={{fontSize:13,color:"rgba(255,255,255,0.4)",textDecoration:"none",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.4)"}>{label}</a>))}</div></div><div><h4 style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:16}}>Legal</h4><div style={{display:"flex",flexDirection:"column",gap:8}}>{[["Privacy Policy","/privacy"],["Terms of Service","/terms"]].map(([label,href])=>(<a key={href} href={href} style={{fontSize:13,color:"rgba(255,255,255,0.4)",textDecoration:"none",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.4)"}>{label}</a>))}</div></div></div><div style={{borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:24,textAlign:"center"}}><p style={{fontSize:12,color:"rgba(255,255,255,0.2)",margin:0}}>© 2026 Fresh Leads Marketing. All rights reserved.</p></div></footer>)}

export default function Page(){return(<div style={{fontFamily:"'DM Sans', -apple-system, sans-serif",background:BG,minHeight:"100vh"}}><Nav/><Hero/><CaseStudy/><WhoThisIsFor/><Objections/><FAQ/><CTA/><Footer/></div>)}

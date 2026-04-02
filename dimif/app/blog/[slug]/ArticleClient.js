"use client";
import Link from "next/link";

const catColors = {"Огляди":"#2D6A4F","єОселя":"#DDA15E","Ремонт":"#7C3AED","Інвестиції":"#E63946","Новобудови":"#2563EB","Поради":"#78716C"};

export default function ArticleClient({ article }) {
  return (
    <section style={{maxWidth:800,margin:"0 auto",padding:"48px 24px 60px",animation:"fadeUp .5s"}}>
      <Link href="/blog" style={{display:"inline-block",border:"none",background:"rgba(45,106,79,.06)",borderRadius:10,padding:"10px 20px",cursor:"pointer",fontSize:14,color:"#2D6A4F",fontWeight:600,marginBottom:24,textDecoration:"none"}}>← Назад до блогу</Link>
      <span style={{display:"block",fontSize:12,fontWeight:700,color:catColors[article.category]||"#999",textTransform:"uppercase",letterSpacing:2}}>{article.category}</span>
      <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(26px,4vw,40px)",fontWeight:800,marginBottom:8,marginTop:8,lineHeight:1.2}}>{article.title}</h1>
      <div style={{display:"flex",gap:16,color:"#999",fontSize:14,marginBottom:32}}>
        <span>{new Date(article.date).toLocaleDateString("uk-UA",{day:"numeric",month:"long",year:"numeric"})}</span>
        <span>·</span>
        <span>{article.readTime} читання</span>
      </div>
      <div style={{fontSize:17,lineHeight:1.8,color:"#333"}}>
        {article.content.split("\n\n").map((p,i) => <p key={i} style={{marginBottom:20}}>{p}</p>)}
      </div>
      <div style={{marginTop:40,padding:24,borderRadius:20,background:"linear-gradient(135deg,#f0fdf4,#dcfce7)",border:"1px solid rgba(45,106,79,.12)"}}>
        <div style={{fontSize:18,fontWeight:700,marginBottom:8}}>Потрібна консультація?</div>
        <div style={{fontSize:15,color:"#555",marginBottom:16}}>Допоможемо обрати район та квартиру під ваші потреби</div>
        <Link href="/districts" style={{display:"inline-block",padding:"12px 28px",borderRadius:12,border:"none",background:"#2D6A4F",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit",textDecoration:"none"}}>Порівняти райони →</Link>
      </div>
    </section>
  );
}

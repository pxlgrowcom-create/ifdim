"use client";
import { useState } from "react";
import Link from "next/link";
import { BLOG_ARTICLES } from "@/data/blog";
import { ContactForm } from "@/components/Forms";
import I from "@/components/Icons";

const catColors = {"Огляди":"#2D6A4F","єОселя":"#DDA15E","Ремонт":"#7C3AED","Інвестиції":"#E63946","Новобудови":"#2563EB","Поради":"#78716C"};

export default function BlogClient() {
  return (
    <section style={{maxWidth:1000,margin:"0 auto",padding:"48px 24px 60px"}}>
      <div style={{fontSize:13,fontWeight:700,textTransform:"uppercase",letterSpacing:3,color:"#2D6A4F",marginBottom:8,display:"flex",alignItems:"center",gap:8}}>
        {I.fileText(16,"#2D6A4F")} Блог
      </div>
      <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(28px,4vw,44px)",fontWeight:800,marginBottom:8}}>Корисні статті</h1>
      <p style={{color:"#7a7a72",fontSize:18,marginBottom:32}}>Аналітика ринку, поради та огляди нерухомості Івано-Франківська</p>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(320px,100%),1fr))",gap:20}}>
        {BLOG_ARTICLES.map(a => (
          <Link key={a.id} href={`/blog/${a.id}`} style={{textDecoration:"none",color:"inherit"}}>
            <div style={{
              background:"#fff",borderRadius:20,padding:"24px 20px",border:"1px solid rgba(0,0,0,.06)",
              cursor:"pointer",transition:"all .2s",boxShadow:"0 2px 8px rgba(0,0,0,.03)",height:"100%",
            }} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <span style={{fontSize:11,fontWeight:700,color:catColors[a.category]||"#999",textTransform:"uppercase",letterSpacing:1.5,padding:"4px 10px",borderRadius:6,background:(catColors[a.category]||"#999")+"14"}}>{a.category}</span>
                <span style={{fontSize:12,color:"#bbb"}}>{a.readTime}</span>
              </div>
              <h3 style={{fontFamily:"Georgia,serif",fontSize:19,fontWeight:700,marginBottom:10,marginTop:0,lineHeight:1.3}}>{a.title}</h3>
              <p style={{fontSize:14,color:"#7a7a72",lineHeight:1.6,marginBottom:12,marginTop:0}}>{a.excerpt}</p>
              <div style={{fontSize:13,color:"#bbb"}}>{new Date(a.date).toLocaleDateString("uk-UA",{day:"numeric",month:"long",year:"numeric"})}</div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{marginTop:48,maxWidth:720,margin:"48px auto 0"}}>
        <ContactForm title="Підпишіться на оновлення" subtitle="Отримуйте нові статті та аналітику ринку першими." />
      </div>
    </section>
  );
}

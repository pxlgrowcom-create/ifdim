"use client";
import { useState } from "react";
import { DISTRICTS, fmt, fmtK, investScore, roomsFromArea, RD } from "@/data/districts";
import { SL, Chip } from "@/components/UI";
import { ContactForm } from "@/components/Forms";
import I from "@/components/Icons";

const card = { background: "#fff", borderRadius: 24, padding: "28px 24px", border: "1px solid rgba(0,0,0,.06)", boxShadow: "0 2px 12px rgba(0,0,0,.03)" };
const infoB = { background: "linear-gradient(145deg, #F8F6F0, #F0EDE5)", borderRadius: 20, padding: 24, border: "1px solid rgba(0,0,0,.04)" };
const slider = { width: "100%", accentColor: "#2D6A4F", cursor: "pointer", height: 8, marginTop: 12 };
const panelBg = { background: "linear-gradient(145deg, #2D6A4F, #1B4332)", borderRadius: 24, color: "#fff", position: "relative", overflow: "hidden" };
const panelGlow = <div style={{ position: "absolute", top: -60, right: -60, width: 180, height: 180, borderRadius: "50%", background: "rgba(82,183,136,.15)", pointerEvents: "none" }} />;
const warmCard = { background: "linear-gradient(145deg, #FEFDF5, #FEF9E7)", borderRadius: 24, padding: "24px 20px", border: "1px solid rgba(0,0,0,.06)" };

function areaFromRooms(r) { return r === 1 ? 40 : r === 2 ? 65 : r === 3 ? 90 : 40; }

export default function InvestorClient() {
  const [invDi, setInvDi] = useState("pozytron");
  const [invArea, setInvArea] = useState(35);
  const invRooms = roomsFromArea(invArea);
  const invD = DISTRICTS.find(d => d.id === invDi);
  const invPrice = Math.round((invD.pMin + invD.pMax) / 2) * invArea;
  const invRent = invD["r" + invRooms + "k"], invYearInc = invRent * 11;
  const invBal = investScore(invD, invRooms);

  const invAreaCoef = Math.round((0.6 + 40 / invArea) * 100) / 100;
  const invRepPerM2 = Math.round(Object.values(RD).reduce((s, r) => {
    const c = r.scaled ? invAreaCoef : 1;
    const avg = ((r.matMin + r.workMin + r.matMax + r.workMax) / 2) * c;
    return s + avg;
  }, 0));
  const invRepair = invArea * invRepPerM2, invTotal = invPrice + invRepair;
  const invROI = ((invYearInc / invTotal) * 100).toFixed(1);
  const invPayback = (invTotal / invYearInc).toFixed(1);
  const inv10yRent = invYearInc * 10, inv10yPrice = Math.round(invTotal * Math.pow(1.10, 10));
  const inv10yProfit = inv10yRent + inv10yPrice - invTotal;

  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 60px" }}>
      <SL iconKey="trendUp" text="Інвестиції в нерухомість" />
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, marginBottom: 8 }}>Інвестиції в нерухомість Івано-Франківська</h2>
      <p style={{ color: "#7a7a72", fontSize: 18, marginBottom: 32 }}>ROI калькулятор — розрахуйте дохідність, окупність та прибуток за 10 років. 3 університети, 25,000+ студентів.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))", gap: 28 }}>
        <div style={card}>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 16, fontWeight: 600, color: "#7a7a72", marginBottom: 10, display: "block" }}>Район:</label>
            <select value={invDi} onChange={e => setInvDi(e.target.value)} style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid #e2e0d8", fontSize: 17, fontFamily: "inherit", background: "#fff", cursor: "pointer", outline: "none" }}>
              {DISTRICTS.map(d => <option key={d.id} value={d.id}>{d.name} — ${d.pMin}–{d.pMax}/м²</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 16, fontWeight: 600, color: "#7a7a72", display: "flex", justifyContent: "space-between" }}>Площа<strong style={{ color: "#2D6A4F", fontSize: 22, fontFamily: "Georgia, serif" }}>{invArea} м²</strong></label>
            <input type="range" min={20} max={120} step={5} value={invArea} onChange={e => setInvArea(+e.target.value)} style={{ ...slider, marginTop: 10 }} />
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
            {[1, 2, 3].map(r => <Chip key={r} active={invRooms === r} onClick={() => setInvArea(areaFromRooms(r))} style={{ flex: 1, justifyContent: "center" }}>{r}к</Chip>)}
          </div>
          <div style={infoB}>
            {[["Ціна квартири", "$" + fmt(invPrice)], ["Ремонт + меблі ($" + invRepPerM2 + "/м²)", "$" + fmt(invRepair)], ["Разом вкладення", "$" + fmt(invTotal)], ["Оренда/міс", "$" + invRent], ["Дохід/рік (11 міс)", "$" + fmt(invYearInc)]].map(([l, v], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 16, padding: "2px 0" }}><span style={{ color: "#7a7a72" }}>{l}</span><strong>{v}</strong></div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ ...panelBg, padding: "32px 24px" }}>
            {panelGlow}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, position: "relative", zIndex: 1 }}>
              {[[invROI + "%", "ROI / рік"], [invPayback + " р", "Окупність"], [invBal + "/10", "Бал інвест."], [fmtK(inv10yProfit), "Прибуток 10р"]].map(([v, l], i) => (
                <div key={i} style={{ textAlign: "center" }}><div style={{ fontFamily: "Georgia, serif", fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 800, lineHeight: 1 }}>{v}</div><div style={{ fontSize: 13, opacity: .7, marginTop: 6 }}>{l}</div></div>
              ))}
            </div>
          </div>
          <div style={warmCard}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>{I.barChart(20, "#2D6A4F")} Прогноз на 10 років</div>
            {[["Оренда (10 років)", fmtK(inv10yRent)], ["Вартість квартири (+10%/рік)", fmtK(inv10yPrice)], ["Чистий прибуток", fmtK(inv10yProfit)]].map(([l, v], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 16, padding: "12px 0", borderBottom: i < 2 ? "1px solid rgba(0,0,0,.06)" : "none" }}>
                <span style={{ color: "#7a7a72" }}>{l}</span><strong style={{ color: i === 2 ? "#2D6A4F" : "#1A1A18" }}>{v}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 40, maxWidth: 720, margin: "48px auto 0" }}>
        <ContactForm title="Інвестиційна консультація" subtitle="Підберемо об'єкт під ваш бюджет та очікувану дохідність." />
      </div>
    </section>
  );
}

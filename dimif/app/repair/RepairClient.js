"use client";
import { useState } from "react";
import { fmt, RD } from "@/data/districts";
import { SL, Chip } from "@/components/UI";
import { BrigadeForm } from "@/components/Forms";
import I from "@/components/Icons";

const card = { background: "#fff", borderRadius: 24, padding: "28px 24px", border: "1px solid rgba(0,0,0,.06)", boxShadow: "0 2px 12px rgba(0,0,0,.03)" };
const slider = { width: "100%", accentColor: "#2D6A4F", cursor: "pointer", height: 8, marginTop: 12 };
const panelBg = { background: "linear-gradient(145deg, #2D6A4F, #1B4332)", borderRadius: 24, color: "#fff", position: "relative", overflow: "hidden" };
const panelGlow = <div style={{ position: "absolute", top: -60, right: -60, width: 180, height: 180, borderRadius: "50%", background: "rgba(82,183,136,.15)", pointerEvents: "none" }} />;
const warmCard = { background: "linear-gradient(145deg, #FEFDF5, #FEF9E7)", borderRadius: 24, padding: "24px 20px", border: "1px solid rgba(0,0,0,.06)" };

export default function RepairClient() {
  const [repA, setRepA] = useState(50);
  const [repI, setRepI] = useState(["floor", "electro", "heat"]);
  const toggleR = (id) => setRepI(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const areaCoef = Math.round((0.6 + 40 / repA) * 100) / 100;
  const repTot = repI.reduce((s, id) => { const r = RD[id]; const c = r.scaled ? areaCoef : 1; return { min: s.min + (r.matMin + r.workMin) * c * repA, max: s.max + (r.matMax + r.workMax) * c * repA }; }, { min: 0, max: 0 });

  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 60px" }}>
      <SL iconKey="wrench" text="Ремонт" />
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, marginBottom: 8 }}>Калькулятор ремонту</h2>
      <p style={{ color: "#7a7a72", fontSize: 18, marginBottom: 32 }}>Розрахуйте вартість ремонту в ІФ</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))", gap: 28 }}>
        <div style={card}>
          <div style={{ marginBottom: 28 }}>
            <label style={{ fontSize: 16, fontWeight: 600, color: "#7a7a72", display: "flex", justifyContent: "space-between" }}>Площа квартири<strong style={{ color: "#2D6A4F", fontSize: 26, fontFamily: "Georgia, serif" }}>{repA} м²</strong></label>
            <input type="range" min={20} max={150} step={5} value={repA} onChange={e => setRepA(+e.target.value)} style={slider} />
          </div>
          <label style={{ fontSize: 16, fontWeight: 600, color: "#7a7a72", display: "block", marginBottom: 14 }}>Роботи:</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {Object.entries(RD).map(([id, r]) => (
              <Chip key={id} active={repI.includes(id)} onClick={() => toggleR(id)} style={{ borderRadius: 16, padding: "16px 22px", justifyContent: "flex-start" }}>
                {I[r.ic](22)} <div style={{ textAlign: "left" }}><div style={{ fontWeight: 700 }}>{r.name}</div><div style={{ fontSize: 13, opacity: .7, fontWeight: 400 }}>Мат: ${r.matMin}–{r.matMax}/м² + Робота: ${r.workMin}–{r.workMax}/м²</div></div>
              </Chip>
            ))}
          </div>
        </div>
        <div>
          <div style={{ ...panelBg, padding: "36px 24px" }}>
            {panelGlow}
            <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 15, opacity: .7, marginBottom: 10 }}>Орієнтовна вартість</div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: "clamp(34px, 6vw, 50px)", fontWeight: 800, lineHeight: 1 }}>${fmt(Math.round(repTot.min))}</div>
              <div style={{ fontSize: 22, opacity: .4, margin: "8px 0" }}>—</div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: "clamp(34px, 6vw, 50px)", fontWeight: 800, lineHeight: 1 }}>${fmt(Math.round(repTot.max))}</div>
              <div style={{ fontSize: 15, opacity: .7, marginTop: 14 }}>за {repA} м²</div>
              <div style={{ fontSize: 13, opacity: .5, marginTop: 6 }}>${Math.round(repTot.min / repA)}–${Math.round(repTot.max / repA)} за м²</div>
            </div>
          </div>
          {repI.length > 0 && <div style={{ ...warmCard, marginTop: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>{I.fileText(20, "#2D6A4F")} Деталізація</div>
            {repI.map((id, i) => { const r = RD[id]; const c = r.scaled ? areaCoef : 1; const mn = Math.round((r.matMin + r.workMin) * c * repA); const mx = Math.round((r.matMax + r.workMax) * c * repA); return (
              <div key={id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, fontSize: 15, padding: "12px 0", borderBottom: i < repI.length - 1 ? "1px solid rgba(0,0,0,.06)" : "none" }}>
                <span style={{ display: "flex", alignItems: "flex-start", gap: 8, flex: 1, minWidth: 0, lineHeight: 1.4 }}><span style={{ flexShrink: 0, marginTop: 1 }}>{I[r.ic](16, "#2D6A4F")}</span> {r.name}</span>
                <strong style={{ flexShrink: 0, whiteSpace: "nowrap", textAlign: "right" }}>${fmt(mn)}–${fmt(mx)}</strong>
              </div>
            ); })}
          </div>}
        </div>
      </div>
      <div style={{ marginTop: 40, maxWidth: 720, margin: "48px auto 0" }}>
        <BrigadeForm />
      </div>
    </section>
  );
}

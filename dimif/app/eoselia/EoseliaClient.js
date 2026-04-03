"use client";
import { useState } from "react";
import { fmt } from "@/data/districts";
import { SL, Chip } from "@/components/UI";
import { ContactForm } from "@/components/Forms";
import I from "@/components/Icons";

const card = { background: "#fff", borderRadius: 24, padding: "28px 24px", border: "1px solid rgba(0,0,0,.06)", boxShadow: "0 2px 12px rgba(0,0,0,.03)" };
const infoB = { background: "linear-gradient(145deg, #F8F6F0, #F0EDE5)", borderRadius: 20, padding: 24, border: "1px solid rgba(0,0,0,.04)" };
const slider = { width: "100%", accentColor: "#2D6A4F", cursor: "pointer", height: 8, marginTop: 12 };
const panelBg = { background: "linear-gradient(145deg, #2D6A4F, #1B4332)", borderRadius: 24, color: "#fff", position: "relative", overflow: "hidden" };
const panelGlow = <div style={{ position: "absolute", top: -60, right: -60, width: 180, height: 180, borderRadius: "50%", background: "rgba(82,183,136,.15)", pointerEvents: "none" }} />;

export default function EoseliaClient() {
  const [eoP, setEoP] = useState(30000);
  const [eoR, setEoR] = useState(7);
  const eoDown = Math.round(eoP * 0.2), eoLoan = eoP - eoDown, eoMR = eoR / 100 / 12;
  const eoPay = Math.round(eoLoan * eoMR / (1 - Math.pow(1 + eoMR, -240))), eoTot = eoPay * 240;

  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 60px" }}>
      <SL iconKey="calculator" text="єОселя 2026" />
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, marginBottom: 8 }}>єОселя — калькулятор та умови програми</h2>
      <p style={{ color: "#7a7a72", fontSize: 18, marginBottom: 32 }}>Державна іпотека під 3% (ВПО, військові) та 7% (медики, педагоги). Розрахунок платежу, хто має право, список акредитованих ЖК Івано-Франківська. Банки: Ощадбанк, ПриватБанк, Укргазбанк.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))", gap: 28 }}>
        <div style={card}>
          <div style={{ marginBottom: 28 }}>
            <label style={{ fontSize: 16, fontWeight: 600, color: "#7a7a72", display: "flex", justifyContent: "space-between", alignItems: "center" }}>Вартість квартири<strong style={{ color: "#2D6A4F", fontSize: 26, fontFamily: "Georgia, serif" }}>${fmt(eoP)}</strong></label>
            <input type="range" min={12000} max={75000} step={1000} value={eoP} onChange={e => setEoP(+e.target.value)} style={slider} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#bbb", marginTop: 6 }}><span>$12 000</span><span>$75 000</span></div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 16, fontWeight: 600, color: "#7a7a72", display: "block", marginBottom: 12 }}>Категорія:</label>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Chip active={eoR === 3} onClick={() => setEoR(3)}>3% — Військовий / Медик</Chip>
              <Chip active={eoR === 7} onClick={() => setEoR(7)}>7% — Загальна</Chip>
            </div>
          </div>
          <div style={infoB}>
            {[["Початковий внесок (20%)", "$" + fmt(eoDown)], ["Сума кредиту", "$" + fmt(eoLoan)], ["Ставка / Термін", eoR + "% / 20 років"]].map(([l, v], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 2 ? 14 : 0, fontSize: 17, padding: "4px 0" }}><span style={{ color: "#7a7a72" }}>{l}</span><strong>{v}</strong></div>
            ))}
          </div>
          <div style={{ ...panelBg, padding: "32px 24px", marginTop: 28 }}>
            {panelGlow}
            <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center", flexWrap: "wrap", gap: 20, position: "relative", zIndex: 1 }}>
              {[[fmt(eoPay), "платіж/міс"], [fmt(eoTot), "загалом за 20р"], [fmt(eoTot - eoLoan), "переплата"]].map(([v, l], i) => (
                <div key={i}><div style={{ fontFamily: "Georgia, serif", fontSize: "clamp(30px, 5vw, 44px)", fontWeight: 800, lineHeight: 1 }}>${v}</div><div style={{ fontSize: 14, opacity: .7, marginTop: 6 }}>{l}</div></div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ ...card, alignSelf: "start" }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(145deg, #f0fdf4, #dcfce7)", display: "flex", alignItems: "center", justifyContent: "center" }}>{I.fileText(20, "#2D6A4F")}</div>
            Акредитовані ЖК
          </div>
          {[["blago", "Manhattan UP · Family Plaza · Comfort Park · Comfort Lite · Comfort House · U ONE"], ["Kvartal", "ЖК Імперія"], ["Банки", "Ощадбанк · ПриватБанк · Глобус · Укргазбанк · Sky Bank · Sense Bank · Таскомбанк"], ["Ліміт", "~$890/м² (місто) · ~$779/м² (область) · 52.5м² + 21м² на члена сім'ї"]].map(([t, d], i) => (
            <div key={i} style={{ padding: "16px 0", borderBottom: i < 3 ? "1px solid rgba(0,0,0,.06)" : "none" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#2D6A4F", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>{t}</div>
              <div style={{ fontSize: 15, color: "#555", lineHeight: 1.6 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 40, maxWidth: 720, margin: "48px auto 0" }}>
        <ContactForm title="Потрібна допомога з єОселя?" subtitle="Консультація по програмі, підбір ЖК та банку. Безкоштовно." />
      </div>
    </section>
  );
}

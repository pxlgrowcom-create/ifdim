"use client";
import Link from "next/link";
import I from "@/components/Icons";
import { HC } from "@/components/UI";
import { fmt } from "@/data/districts";

export default function HomePage() {
  return (
    <>
      <header style={{ textAlign: "center", padding: "80px 24px 64px", background: "linear-gradient(168deg, #FAFAF7 0%, #f0f7f2 35%, #e8f0ea 65%, #F0EDE5 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(circle at 25% 50%, rgba(45,106,79,.05), transparent 50%), radial-gradient(circle at 75% 30%, rgba(221,161,94,.05), transparent 50%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 28px", borderRadius: 100, background: "rgba(45,106,79,.07)", border: "1px solid rgba(45,106,79,.12)", fontSize: 16, fontWeight: 600, color: "#2D6A4F", marginBottom: 32, animation: "fadeUp .5s ease both" }}>
            {I.mapPin(16, "#2D6A4F")} Івано-Франківськ
          </div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(42px, 5.5vw, 72px)", fontWeight: 800, lineHeight: 1.08, maxWidth: 820, margin: "0 auto 24px", animation: "fadeUp .5s ease .1s both" }}>
            Купити <span style={{ color: "#2D6A4F", position: "relative", display: "inline-block" }}>квартиру<span style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 5, background: "linear-gradient(90deg, #2D6A4F, #52B788)", borderRadius: 3, opacity: 0.25 }} /></span> у Франківську
          </h1>
          <p style={{ fontSize: 20, color: "#7a7a72", maxWidth: 620, margin: "0 auto 52px", lineHeight: 1.7, animation: "fadeUp .5s ease .2s both" }}>Порівняй райони та новобудови, розрахуй єОселя, підбери квартиру від забудовника — ціни, карта, калькулятори</p>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", maxWidth: 720, margin: "0 auto", animation: "fadeUp .5s ease .3s both" }}>
            {[["$910", "/м²", "середня ціна", "+15% комфорт"], ["185", "ЖК", "черг у продажу", "135 будується"], ["~$430", "/міс", "оренда квартири", "+23% рік"]].map(([n, u, l, a], i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 22px", borderRadius: 24, background: "rgba(255,255,255,.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,.5)", boxShadow: "0 4px 20px rgba(0,0,0,.04)", flex: "1 1 180px", minWidth: 160 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
                  <span style={{ fontFamily: "Georgia, serif", fontSize: 44, fontWeight: 800, color: "#2D6A4F", lineHeight: 1 }}>{n}</span>
                  <span style={{ fontSize: 16, color: "#2D6A4F", fontWeight: 700 }}>{u}</span>
                </div>
                <div style={{ fontSize: 14, color: "#7a7a72", marginTop: 8 }}>{l}</div>
                <div style={{ fontSize: 13, fontWeight: 700, marginTop: 6, padding: "4px 14px", borderRadius: 100, background: "rgba(221,161,94,.08)", color: "#c48a3f" }}>{a}</div>
              </div>
            ))}
          </div>
        </div>
      </header>
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px 80px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: "#2D6A4F", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
          {I.target(16, "#2D6A4F")} Що ви шукаєте?
        </div>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, marginBottom: 40 }}>Оберіть розділ</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: 16 }}>
          <HC iconKey="building" title="Райони" desc="Порівняння 10 мікрорайонів" href="/districts" delay={0} />
          <HC iconKey="calculator" title="єОселя" desc="Калькулятор іпотеки 3-7%" href="/eoselia" delay={0.1} />
          <HC iconKey="trendUp" title="Інвестору" desc="ROI, окупність, прогноз 10 років" href="/investor" delay={0.2} />
          <HC iconKey="mapPin" title="Карта" desc="38 новобудов, садочки, ліцеї" href="/map" delay={0.3} />
          <HC iconKey="wrench" title="Ремонт" desc="Калькулятор вартості під ключ" href="/repair" delay={0.4} />
          <HC iconKey="fileText" title="Блог" desc="Поради, ціни, аналітика" href="/blog" delay={0.5} />
        </div>
      </section>
    </>
  );
}

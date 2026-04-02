"use client";
import { useState } from "react";
import { DISTRICTS, PRIORITIES, scoreD, distMin } from "@/data/districts";
import { SL, Chip, DR } from "@/components/UI";
import { ContactForm } from "@/components/Forms";
import I from "@/components/Icons";

export default function DistrictsClient() {
  const [selPri, setSelPri] = useState([]);
  const [expD, setExpD] = useState(null);
  const ranked = [...DISTRICTS].map(d => ({ ...d, score: scoreD(d, selPri) })).sort((a, b) => b.score - a.score);

  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 60px" }}>
      <SL iconKey="building" text="Райони Івано-Франківська" />
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, marginBottom: 8 }}>Який район найкращий для вас?</h2>
      <p style={{ color: "#7a7a72", fontSize: 18, marginBottom: 32, maxWidth: 640 }}>10 мікрорайонів Івано-Франківська — порівняйте ціни, інфраструктуру та відстані. Оберіть пріоритети — алгоритм покаже найкращий район.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
        {PRIORITIES.map(p => <Chip key={p.id} active={selPri.includes(p.id)} onClick={() => setSelPri(pr => pr.includes(p.id) ? pr.filter(x => x !== p.id) : [...pr, p.id])}>{I[p.ic](18)} {p.label}</Chip>)}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {ranked.map((d, i) => <DR key={d.id} d={d} rank={i} score={d.score} expanded={expD === d.id} onToggle={() => setExpD(expD === d.id ? null : d.id)} />)}
      </div>
      <div style={{ marginTop: 40, maxWidth: 720, margin: "48px auto 0" }}>
        <ContactForm title="Безкоштовна консультація" subtitle="Розкажемо про кожен район детально. Зв'яжемося протягом години." />
      </div>
    </section>
  );
}

"use client";
import { useState } from "react";
import I from "./Icons";

export function ContactForm({ title, subtitle }) {
  const [form, setForm] = useState({ name: "", phone: "", interest: "" });
  const [sent, setSent] = useState(false);
  const inp = { padding: "16px 20px", borderRadius: 12, border: "1px solid rgba(255,255,255,.2)", fontSize: 16, fontFamily: "inherit", outline: "none", background: "rgba(255,255,255,.1)", color: "#fff", boxSizing: "border-box", width: "100%" };

  if (sent) return (
    <div style={{ background: "linear-gradient(135deg, #1B4332, #2D6A4F)", borderRadius: 24, padding: "48px 32px", textAlign: "center", color: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>{I.send(40, "#DDA15E")}</div>
      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Дякуємо!</div>
      <div style={{ fontSize: 16, opacity: .8 }}>Зв'яжемося протягом години</div>
    </div>
  );

  return (
    <div style={{ background: "linear-gradient(135deg, #1B4332, #2D6A4F 60%, #245a42)", borderRadius: 24, padding: "40px 28px", color: "#fff", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-30%", right: "-15%", width: "50%", height: "160%", background: "radial-gradient(circle, rgba(255,255,255,.04), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <h3 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 800, marginBottom: 8, marginTop: 0 }}>{title || "Підберемо квартиру під ваш бюджет"}</h3>
        <p style={{ fontSize: 16, opacity: .8, marginBottom: 28, marginTop: 0, lineHeight: 1.5 }}>{subtitle || "Безкоштовна консультація. Зв'яжемося протягом години."}</p>
        <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <input placeholder="Ваше ім'я" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inp} />
          <input placeholder="Телефон *" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inp} />
        </div>
        <select value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })} style={{ ...inp, cursor: "pointer", appearance: "auto", color: form.interest ? "#fff" : "rgba(255,255,255,.5)", marginBottom: 20 }}>
          <option value="" style={{ color: "#333" }}>Що цікавить?</option>
          <option style={{ color: "#333" }}>Купівля квартири</option>
          <option style={{ color: "#333" }}>Оренда</option>
          <option style={{ color: "#333" }}>Інвестиція</option>
          <option style={{ color: "#333" }}>Ремонт</option>
          <option style={{ color: "#333" }}>Консультація</option>
        </select>
        <div style={{ textAlign: "center" }}>
          <button onClick={() => { if (form.name && form.phone) setSent(true); }} style={{
            padding: "16px 40px", borderRadius: 100, border: "none",
            background: (form.name && form.phone) ? "linear-gradient(135deg, #DDA15E, #C4903E)" : "rgba(255,255,255,.15)",
            color: (form.name && form.phone) ? "#1B4332" : "rgba(255,255,255,.4)",
            fontSize: 17, fontWeight: 700, cursor: (form.name && form.phone) ? "pointer" : "default",
            fontFamily: "inherit", transition: "all .3s",
            boxShadow: (form.name && form.phone) ? "0 4px 20px rgba(221,161,94,.35)" : "none",
          }}>
            Отримати підбірку →
          </button>
        </div>
      </div>
    </div>
  );
}

export function BrigadeForm() {
  const [form, setForm] = useState({ name: "", phone: "", budget: "", comment: "" });
  const [sent, setSent] = useState(false);
  const inp = { padding: "16px 20px", borderRadius: 12, border: "1px solid rgba(255,255,255,.2)", fontSize: 16, fontFamily: "inherit", outline: "none", background: "rgba(255,255,255,.1)", color: "#fff", boxSizing: "border-box", width: "100%" };

  if (sent) return (
    <div style={{ background: "linear-gradient(135deg, #1B4332, #2D6A4F)", borderRadius: 24, padding: "48px 32px", textAlign: "center", color: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>{I.send(40, "#DDA15E")}</div>
      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Заявку отримано!</div>
      <div style={{ fontSize: 16, opacity: .8 }}>Підберемо бригаду і зв'яжемося протягом години</div>
    </div>
  );

  return (
    <div style={{ background: "linear-gradient(135deg, #1B4332, #2D6A4F 60%, #245a42)", borderRadius: 24, padding: "40px 28px", color: "#fff", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-30%", right: "-15%", width: "50%", height: "160%", background: "radial-gradient(circle, rgba(255,255,255,.04), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <h3 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 800, marginBottom: 8, marginTop: 0 }}>Підберемо бригаду під ваш бюджет</h3>
        <p style={{ fontSize: 16, opacity: .8, marginBottom: 28, marginTop: 0, lineHeight: 1.5 }}>Безкоштовна консультація. Зв'яжемося протягом години.</p>
        <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <input placeholder="Ваше ім'я" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inp} />
          <input placeholder="Телефон *" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inp} />
        </div>
        <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <input placeholder="Бюджет (напр. $5000)" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} style={inp} />
          <input placeholder="Площа квартири" value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })} style={inp} />
        </div>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button onClick={() => { if (form.name && form.phone) setSent(true); }} style={{
            padding: "16px 40px", borderRadius: 100, border: "none",
            background: (form.name && form.phone) ? "linear-gradient(135deg, #DDA15E, #C4903E)" : "rgba(255,255,255,.15)",
            color: (form.name && form.phone) ? "#1B4332" : "rgba(255,255,255,.4)",
            fontSize: 17, fontWeight: 700, cursor: (form.name && form.phone) ? "pointer" : "default",
            fontFamily: "inherit", transition: "all .3s",
            boxShadow: (form.name && form.phone) ? "0 4px 20px rgba(221,161,94,.35)" : "none",
          }}>
            Підібрати бригаду →
          </button>
        </div>
      </div>
    </div>
  );
}

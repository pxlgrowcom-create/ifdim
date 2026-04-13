"use client";
import { useState } from "react";
import I from "./Icons";

const EJS = {
  serviceId: "service_7qdczjc",
  templateId: "template_zsyaazb",
  publicKey: "4ILc5rkP2SFuxHIwb",
};

const TG = {
  botToken: "8638091495:AAHKiW6CWw6TRmyBmJ-MGN7JKS_uKzqCieE",
  chatId: "524205070",
};

async function sendTelegram(data) {
  try {
    const text = `🏠 *Нова заявка IFdim*\n\n👤 Ім'я: ${data.name}\n📞 Телефон: ${data.phone}\n💬 Повідомлення: ${data.message}\n📄 Сторінка: ${data.page}`;
    await fetch(`https://api.telegram.org/bot${TG.botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TG.chatId,
        text: text,
        parse_mode: "Markdown",
      }),
    });
  } catch (e) {
    console.error("Telegram error:", e);
  }
}

async function sendEmail(data) {
  try {
    const [emailRes] = await Promise.allSettled([
      fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EJS.serviceId,
          template_id: EJS.templateId,
          user_id: EJS.publicKey,
          template_params: data,
        }),
      }),
      sendTelegram(data),
    ]);
    return emailRes.status === "fulfilled" && emailRes.value.ok;
  } catch (e) {
    console.error("Send error:", e);
    return false;
  }
}

export function ContactForm({ title, subtitle }) {
  const [form, setForm] = useState({ name: "", phone: "", interest: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const inp = { padding: "16px 20px", borderRadius: 12, border: "1px solid rgba(255,255,255,.2)", fontSize: 16, fontFamily: "inherit", outline: "none", background: "rgba(255,255,255,.1)", color: "#fff", boxSizing: "border-box", width: "100%" };

  const handleSubmit = async () => {
    if (!form.name || !form.phone) return;
    setSending(true);
    setError(false);
    const ok = await sendEmail({
      name: form.name,
      phone: form.phone,
      message: form.interest || "Не вказано",
      page: typeof window !== "undefined" ? window.location.pathname : "",
    });
    setSending(false);
    if (ok) setSent(true);
    else setError(true);
  };

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
        {error && <div style={{ color: "#ff9b9b", fontSize: 14, marginBottom: 12, textAlign: "center" }}>Помилка відправки. Спробуйте ще раз.</div>}
        <div style={{ textAlign: "center" }}>
          <button onClick={handleSubmit} disabled={sending} style={{
            padding: "16px 40px", borderRadius: 100, border: "none",
            background: (form.name && form.phone && !sending) ? "linear-gradient(135deg, #DDA15E, #C4903E)" : "rgba(255,255,255,.15)",
            color: (form.name && form.phone && !sending) ? "#1B4332" : "rgba(255,255,255,.4)",
            fontSize: 17, fontWeight: 700, cursor: (form.name && form.phone && !sending) ? "pointer" : "default",
            fontFamily: "inherit", transition: "all .3s",
            boxShadow: (form.name && form.phone && !sending) ? "0 4px 20px rgba(221,161,94,.35)" : "none",
          }}>
            {sending ? "Відправляємо..." : "Отримати підбірку →"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function BrigadeForm() {
  const [form, setForm] = useState({ name: "", phone: "", budget: "", comment: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const inp = { padding: "16px 20px", borderRadius: 12, border: "1px solid rgba(255,255,255,.2)", fontSize: 16, fontFamily: "inherit", outline: "none", background: "rgba(255,255,255,.1)", color: "#fff", boxSizing: "border-box", width: "100%" };

  const handleSubmit = async () => {
    if (!form.name || !form.phone) return;
    setSending(true);
    setError(false);
    const ok = await sendEmail({
      name: form.name,
      phone: form.phone,
      message: `Ремонт. Бюджет: ${form.budget || "не вказано"}. Площа: ${form.comment || "не вказано"}`,
      page: typeof window !== "undefined" ? window.location.pathname : "",
    });
    setSending(false);
    if (ok) setSent(true);
    else setError(true);
  };

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
        {error && <div style={{ color: "#ff9b9b", fontSize: 14, marginBottom: 12, textAlign: "center" }}>Помилка відправки. Спробуйте ще раз.</div>}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button onClick={handleSubmit} disabled={sending} style={{
            padding: "16px 40px", borderRadius: 100, border: "none",
            background: (form.name && form.phone && !sending) ? "linear-gradient(135deg, #DDA15E, #C4903E)" : "rgba(255,255,255,.15)",
            color: (form.name && form.phone && !sending) ? "#1B4332" : "rgba(255,255,255,.4)",
            fontSize: 17, fontWeight: 700, cursor: (form.name && form.phone && !sending) ? "pointer" : "default",
            fontFamily: "inherit", transition: "all .3s",
            boxShadow: (form.name && form.phone && !sending) ? "0 4px 20px rgba(221,161,94,.35)" : "none",
          }}>
            {sending ? "Відправляємо..." : "Підібрати бригаду →"}
          </button>
        </div>
      </div>
    </div>
  );
}

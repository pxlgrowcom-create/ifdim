import I from "./Icons";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(0,0,0,.06)", padding: "32px 24px",
      textAlign: "center", color: "#aaa", fontSize: 14,
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    }}>
      <div style={{
        width: 24, height: 24, borderRadius: 6,
        background: "linear-gradient(135deg, #2D6A4F, #40916C)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>
        {I.home(14, "#fff")}
      </div>
      <span style={{ fontFamily: "Georgia, serif", color: "#2D6A4F", fontSize: 18, fontWeight: 800 }}>IFdim</span>
      <span style={{ color: "#ccc" }}>·</span>
      Нерухомість Івано-Франківська © 2026
    </footer>
  );
}

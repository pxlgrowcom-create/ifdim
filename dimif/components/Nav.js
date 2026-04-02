"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import I from "./Icons";

const NAV = [
  ["/", "home", "Головна"],
  ["/districts", "building", "Райони"],
  ["/eoselia", "calculator", "єОселя"],
  ["/investor", "trendUp", "Інвестору"],
  ["/repair", "wrench", "Ремонт"],
  ["/map", "mapPin", "Карта"],
  ["/blog", "fileText", "Блог"],
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav style={{ borderBottom: "1px solid rgba(0,0,0,.06)", background: "rgba(250,250,247,.88)", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <Link href="/" style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 800, color: "#2D6A4F", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #2D6A4F, #40916C)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(45,106,79,.25)" }}>
            {I.home(20, "#fff")}
          </div>
          IFdim
        </Link>

        <div className="desk-nav" style={{ display: "flex", gap: 4 }}>
          {NAV.map(([href, ic, label]) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link key={href} href={href} style={{
                padding: "10px 18px", borderRadius: 12, fontSize: 15, fontWeight: 600,
                background: active ? "rgba(45,106,79,.08)" : "transparent",
                color: active ? "#2D6A4F" : "#7a7a72",
                textDecoration: "none", display: "flex", alignItems: "center", gap: 6,
                transition: "all .2s",
              }}>
                {I[ic](16, active ? "#2D6A4F" : "#aaa")} {label}
              </Link>
            );
          })}
        </div>

        <button className="burger-btn" onClick={() => setMenuOpen(!menuOpen)} style={{
          border: "none", background: "transparent", cursor: "pointer", padding: 8,
        }}>
          {I.menu(24, "#2D6A4F")}
        </button>
      </div>

      {menuOpen && (
        <div className="mob-dd" style={{
          padding: "8px 24px 16px", display: "flex", flexDirection: "column", gap: 4,
          animation: "scaleIn .2s ease",
        }}>
          {NAV.map(([href, ic, label]) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{
                padding: "14px 18px", borderRadius: 14, fontSize: 16, fontWeight: 600,
                background: active ? "rgba(45,106,79,.08)" : "transparent",
                color: active ? "#2D6A4F" : "#555",
                textDecoration: "none", display: "flex", alignItems: "center", gap: 10,
              }}>
                {I[ic](20, active ? "#2D6A4F" : "#aaa")} {label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}

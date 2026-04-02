"use client";
import { useState } from "react";
import I from "./Icons";
import { distMin, POI_CENTER, POI_STATION } from "@/data/districts";

export function Chip({ children, active, onClick, style: xs }) {
  const [h, setH] = useState(false);
  return (
    <span onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "12px 24px", borderRadius: 100,
        fontSize: 15, fontWeight: 600, cursor: "pointer", userSelect: "none",
        transition: "all .3s cubic-bezier(.25,.46,.45,.94)",
        border: active ? "2px solid #2D6A4F" : h ? "2px solid #2D6A4F" : "2px solid #e2e0d8",
        background: active ? "#2D6A4F" : "#fff",
        color: active ? "#fff" : h ? "#2D6A4F" : "#555",
        transform: (h && !active) ? "translateY(-2px)" : "none",
        boxShadow: active ? "0 4px 16px rgba(45,106,79,.25)" : h ? "0 4px 12px rgba(45,106,79,.18)" : "none",
        ...xs,
      }}>{children}</span>
  );
}

export function SL({ iconKey, text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: "#2D6A4F", marginBottom: 8 }}>
      {I[iconKey](16, "#2D6A4F")} {text}
    </div>
  );
}

export function HC({ iconKey, title, desc, onClick, href, delay }) {
  const [h, setH] = useState(false);
  const Wrapper = href ? require("next/link").default : "div";
  const wrapperProps = href ? { href, style: { textDecoration: "none", color: "inherit" } } : { onClick };
  return (
    <Wrapper {...wrapperProps}>
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: h ? "linear-gradient(160deg, #fff 0%, #f0faf4 100%)" : "#fff",
      borderRadius: 24, padding: "40px 28px 32px",
      border: h ? "1px solid rgba(45,106,79,.2)" : "1px solid rgba(0,0,0,.06)",
      boxShadow: h ? "0 24px 64px rgba(45,106,79,.22), 0 8px 24px rgba(0,0,0,.04)" : "0 2px 8px rgba(0,0,0,.03)",
      cursor: "pointer", textAlign: "center",
      transition: "all .4s cubic-bezier(.25,.46,.45,.94)",
      transform: h ? "translateY(-10px)" : "translateY(0)",
      position: "relative", overflow: "hidden",
      animation: `fadeUp .5s ease ${delay}s both`,
    }}>
      <div style={{
        position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)",
        width: 120, height: 120, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(45,106,79,.18) 0%, transparent 70%)",
        opacity: h ? 1 : 0, transition: "opacity .4s", pointerEvents: "none",
      }} />
      <div style={{
        width: 72, height: 72, borderRadius: 20,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        marginBottom: 20,
        background: "linear-gradient(145deg, #f0fdf4 0%, #dcfce7 100%)",
        boxShadow: h ? "0 8px 24px rgba(45,106,79,.15)" : "0 4px 12px rgba(45,106,79,.06)",
        transition: "all .4s cubic-bezier(.25,.46,.45,.94)",
        transform: h ? "scale(1.12) rotate(-4deg)" : "scale(1)",
        position: "relative", color: "#2D6A4F",
      }}>
        {I[iconKey](32, "#2D6A4F")}
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: "#1A1A18" }}>{title}</div>
      <div style={{ fontSize: 15, color: "#7a7a72", lineHeight: 1.5 }}>{desc}</div>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
        marginTop: 16, fontSize: 14, fontWeight: 700, color: "#2D6A4F",
        opacity: h ? 1 : 0, transform: h ? "translateY(0)" : "translateY(8px)", transition: "all .3s ease",
      }}>Відкрити {I.chevronR(16, "#2D6A4F")}</div>
    </div>
    </Wrapper>
  );
}

export function DR({ d, rank, score, expanded, onToggle }) {
  const [h, setH] = useState(false);
  const scC = score >= 75 ? "#2D6A4F" : score >= 55 ? "#9A7B2E" : "#8B6B50";
  const scB = score >= 75 ? "#D8F3DC" : score >= 55 ? "#FEFAE0" : "#F0E8E2";
  const det = [
    ["school", d.schools, "Школи"], ["backpack", d.kg, "Садочки"],
    ["bus", distMin(d.lat,d.lng,POI_CENTER[0],POI_CENTER[1]) + " хв", "До центру"], ["train", distMin(d.lat,d.lng,POI_STATION[0],POI_STATION[1]) + " хв", "До вокзалу"],
    ["gradCap", distMin(d.lat,d.lng,48.9150,24.7010) + " хв", "До ПНУ"], ["hospital", distMin(d.lat,d.lng,48.9215,24.7089) + " хв", "До ІФНМУ"],
    ["fuel", distMin(d.lat,d.lng,48.9293,24.6964) + " хв", "До ІФНТУНГ"], ["hardHat", d.nb, "Новобудов"],
    ["home", "$" + d.r1k + "/$" + d.r2k + "/$" + d.r3k, "Оренда 1к/2к/3к"],
    ["leaf", d.green + "/10", "Озеленення"],
  ];
  return (
    <div style={{ marginBottom: 4 }}>
      <div onClick={onToggle} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
        background: "#fff", borderRadius: expanded ? "20px 20px 0 0" : 20, padding: "16px 14px",
        border: expanded ? "2px solid #2D6A4F" : h ? "2px solid rgba(45,106,79,.2)" : "2px solid transparent",
        borderBottom: expanded ? "2px dashed rgba(45,106,79,.15)" : undefined,
        cursor: "pointer", transition: "all .3s cubic-bezier(.25,.46,.45,.94)",
        boxShadow: expanded ? "0 8px 32px rgba(45,106,79,.18)" : h ? "0 6px 24px rgba(0,0,0,.06)" : "0 1px 4px rgba(0,0,0,.03)",
        transform: (h && !expanded) ? "translateX(4px)" : "none",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 800, color: rank === 0 ? "#DDA15E" : "#bbb", flexShrink: 0, width: 28, textAlign: "center", display: "flex", justifyContent: "center" }}>
            {rank === 0 ? I.trophy(22, "#DDA15E") : rank + 1}
          </div>
          <div style={{
            width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, color: "#2D6A4F",
            background: "linear-gradient(145deg, #f0fdf4, #dcfce7)",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,.04), 0 2px 8px rgba(45,106,79,.08)",
            transition: "transform .3s", transform: h ? "scale(1.08)" : "scale(1)",
          }}>
            {I[DICON[d.id]](24, "#2D6A4F")}
          </div>
          <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
            <div style={{ fontSize: 17, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.name}</div>
            <div style={{ fontSize: 13, color: "#555", marginTop: 2 }}>
              <span style={{ fontWeight: 700 }}>${d.pMin}–{d.pMax}</span>
              <span style={{ color: "#aaa", fontWeight: 400 }}> /м²</span>
            </div>
          </div>
          <div style={{
            width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 800, fontFamily: "Georgia, serif", flexShrink: 0,
            background: scB, color: scC,
            boxShadow: `0 0 0 3px ${scB}, 0 0 0 5px ${scC}22`,
            transition: "transform .3s", transform: h ? "scale(1.1)" : "scale(1)",
          }}>{score}</div>
        </div>
      </div>
      {expanded && (
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: 10, padding: 24,
          background: "linear-gradient(160deg, #fefdf7, #fef9e7)",
          borderRadius: "0 0 20px 20px", border: "2px solid #2D6A4F", borderTop: "none",
        }}>
          {det.map(([ic, v, l], j) => <DC key={j} iconKey={ic} value={v} label={l} />)}
        </div>
      )}
    </div>
  );
}

export function Dot({ cx, cy, color, shape, label, isSel, onClick, eo }) {
  const tw = Math.max(label.length * 5.5 + 10, 45);
  return (
    <g className="poi" onClick={onClick} style={{cursor:"pointer"}}>
      <circle cx={cx} cy={cy} r={18} fill="transparent" />
      <circle className="ring" cx={cx} cy={cy} r={13} fill={color+"10"} stroke={color+"25"} strokeWidth={0.8} />
      <g className="lbl">
        <rect x={cx - tw/2} y={cy - 26} width={tw} height={16} rx={5} fill="rgba(30,30,30,.85)" />
        <text x={cx} y={cy - 15} fontSize={8.5} fill="#fff" textAnchor="middle" fontWeight="600">{label}</text>
      </g>
      <g className="shape" transform={`translate(${cx},${cy})`}>
        {shape === "circle" && (
          <circle cx={0} cy={0} r={5} fill={color} stroke={isSel?color:"#fff"} strokeWidth={isSel?3:2} style={{filter:"drop-shadow(0 1px 2px rgba(0,0,0,.15))"}} />
        )}
        {shape === "square" && (
          <rect x={-4} y={-4} width={8} height={8} rx={2} fill={color} stroke={isSel?color:"#fff"} strokeWidth={isSel?3:2} style={{filter:"drop-shadow(0 1px 2px rgba(0,0,0,.15))"}} />
        )}
        {shape === "pin" && <>
          <path d="M0,10 C-7,10 -13,3 -13,-4 C-13,-12 -7,-18 0,-18 C7,-18 13,-12 13,-4 C13,3 7,10 0,10Z" fill={color}/>
          <polygon points="0,-14 -8,-8 0,-4 8,-8" fill="#fff" opacity={0.85}/>
          <rect x={-3} y={-10} width={6} height={3} rx={0.5} fill="#fff" opacity={0.55}/>
        </>}
        {shape === "house" && <>
          <path d="M0,10 C-7,10 -12,4 -12,-3 C-12,-11 -7,-16 0,-16 C7,-16 12,-11 12,-3 C12,4 7,10 0,10Z" fill={color}/>
          <path d="M0,-12 L-6,-7 L-6,-2 L6,-2 L6,-7 Z" fill="#fff" opacity={0.85}/>
          <rect x={-2} y={-5} width={4} height={3} rx={0.3} fill={color} opacity={0.5}/>
          {eo && <><circle cx={9} cy={-12} r={4} fill="#DDA15E" stroke="#fff" strokeWidth={1}/>
          <text x={9} y={-9.5} fontSize={5} fill="#fff" textAnchor="middle" fontWeight="800">є</text></>}
        </>}
      </g>
    </g>
  );
}


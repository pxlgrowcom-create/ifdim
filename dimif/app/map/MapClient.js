"use client";
import React, { useState, useMemo } from "react";
import { KG_COM, LYCEES, UNIS, JK_LIST, NOVOBUD, KEY_POI, W, H, latMin, latMax, lngMin, lngMax, xy, R200, R1K, hav, RAT } from "@/data/map";
import { Dot } from "@/components/UI";
import { ContactForm } from "@/components/Forms";

export default function MapClient() {
  const [sel, setSel] = useState(null);
  const [showKg, setShowKg] = useState(true);
  const [showLyc, setShowLyc] = useState(true);
  const [showUni, setShowUni] = useState(true);
  const [showJk, setShowJk] = useState(true);
  const [showNov, setShowNov] = useState(true);
  const [ddVal, setDdVal] = useState("");
  const [ratX, ratY] = xy(...RAT);

  // All selectable objects for dropdown
  const allObjs = React.useMemo(() => [
    ...JK_LIST.map(j => ({...j, group:'єОселя', color:'#E63946'})),
    ...NOVOBUD.map(j => ({...j, group:'Новобудови', color:'#F97316'})),
    ...KG_COM.map(j => ({...j, group:'Садочки', color:'#059669'})),
    ...LYCEES.map(j => ({...j, group:'Ліцеї', color:'#2563EB'})),
    ...UNIS.map(j => ({n:j.n, lat:j.lat, lng:j.lng, group:'Університети', color:'#7C3AED'})),
  ], []);

  const click = (item, color, extra) => {
    const d = hav(RAT, [item.lat, item.lng]);
    setSel(prev => prev?.n === item.n && prev?.color === color ? null : {...item, d, color, extra});
    setDdVal("");
  };

  // Handle dropdown selection
  const onDdChange = (e) => {
    const val = e.target.value;
    setDdVal(val);
    if (!val) { setSel(null); return; }
    const obj = allObjs.find(o => o.n === val);
    if (obj) {
      const d = hav(RAT, [obj.lat, obj.lng]);
      setSel({...obj, d, extra: obj.dev || obj.group});
    }
  };

  const selXY = sel ? xy(sel.lat, sel.lng) : null;

  // Distance table for selected object
  const distances = React.useMemo(() => {
    if (!sel) return [];
    return KEY_POI.map(p => ({
      ...p,
      d: hav([sel.lat, sel.lng], [p.lat, p.lng]),
    })).sort((a,b) => a.d - b.d);
  }, [sel]);

  // Find nearest KG and Lycee for selected object
  const nearestKg = React.useMemo(() => {
    if (!sel) return null;
    let best = null;
    KG_COM.forEach(k => { const d = hav([sel.lat,sel.lng],[k.lat,k.lng]); if (!best || d < best.d) best = {...k, d}; });
    return best;
  }, [sel]);
  const nearestLyc = React.useMemo(() => {
    if (!sel) return null;
    let best = null;
    LYCEES.forEach(l => { const d = hav([sel.lat,sel.lng],[l.lat,l.lng]); if (!best || d < best.d) best = {...l, d}; });
    return best;
  }, [sel]);

  return (
    <div style={{padding:"32px 16px",maxWidth:1000,margin:"0 auto",fontFamily:"'Segoe UI',system-ui,sans-serif",color:"#1A1A18"}}>
      <style>{`
        .poi .ring { opacity: 0; transition: opacity .15s; }
        .poi .lbl { opacity: 0; transition: opacity .15s; pointer-events: none; }
        .poi:hover .ring { opacity: 1; }
        .poi:hover .lbl { opacity: 1; }
      `}</style>

      <h2 style={{fontFamily:"Georgia,serif",fontSize:30,fontWeight:800,marginBottom:4}}>Карта новобудов Івано-Франківська</h2>
      <p style={{color:"#7a7a72",fontSize:15,marginBottom:16}}>38 новобудов та ЖК на карті — садочки, ліцеї, університети, ТЦ. Натисніть — побачите відстань.</p>

      {/* Object dropdown selector */}
      <select value={ddVal} onChange={onDdChange} style={{
        width:"100%",maxWidth:480,padding:"14px 18px",borderRadius:14,
        border:"2px solid #e2e0d8",fontSize:16,fontFamily:"inherit",
        background:"#fff",cursor:"pointer",outline:"none",marginBottom:16,
      }}>
        <option value="">Знайти об'єкт на карті...</option>
        <optgroup label="єОселя">
          {JK_LIST.map(j => <option key={"eo"+j.n} value={j.n}>{j.n}{j.dev?" · "+j.dev:""}</option>)}
        </optgroup>
        <optgroup label="Новобудови">
          {NOVOBUD.filter(nb => !JK_LIST.some(j=>j.n===nb.n)).map(j => <option key={"nb"+j.n} value={j.n}>{j.n}{j.dev?" · "+j.dev:""}</option>)}
        </optgroup>
        <optgroup label="Садочки">
          {KG_COM.map(j => <option key={"kg"+j.n} value={j.n}>{j.n}</option>)}
        </optgroup>
        <optgroup label="Ліцеї">
          {LYCEES.map(j => <option key={"ly"+j.n} value={j.n}>{j.n}</option>)}
        </optgroup>
        <optgroup label="Університети">
          {UNIS.map(j => <option key={"un"+j.n} value={j.n}>{j.n}</option>)}
        </optgroup>
      </select>

      {/* Filters */}
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>
        {[[showKg,setShowKg,"#059669","Садочки",KG_COM.length],[showLyc,setShowLyc,"#2563EB","Ліцеї",LYCEES.length],[showUni,setShowUni,"#7C3AED","Університети",UNIS.length],[showJk,setShowJk,"#E63946","єОселя",JK_LIST.length],[showNov,setShowNov,"#F97316","Новобудови",NOVOBUD.length]].map(([on,set,color,label,cnt],i) => (
          <button key={i} onClick={()=>set(!on)} style={{
            display:"inline-flex",alignItems:"center",gap:7,padding:"9px 18px",borderRadius:100,
            border:on?`2px solid ${color}`:"2px solid #e2e0d8",
            background:on?color+"14":"#fff",color:on?color:"#aaa",
            fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",
          }}>
            <span style={{width:9,height:9,borderRadius:on?"50%":"2px",background:color,opacity:on?1:0.3}}/>
            {label} ({cnt})
          </button>
        ))}
      </div>

      {/* Selected info */}
      {sel && <div style={{padding:"10px 16px",borderRadius:12,background:"#fff",border:`2px solid ${sel.color}22`,marginBottom:14,display:"flex",alignItems:"center",gap:10,flexWrap:"nowrap",boxShadow:"0 2px 10px rgba(0,0,0,.04)",overflow:"hidden"}}>
        <span style={{width:10,height:10,borderRadius:"50%",background:sel.color,flexShrink:0}}/>
        <span style={{fontWeight:700,fontSize:14,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",minWidth:0}}>{sel.n}</span>
        {sel.extra && <span style={{fontSize:11,padding:"2px 8px",borderRadius:6,background:sel.color+"14",color:sel.color,fontWeight:600,whiteSpace:"nowrap",flexShrink:0}}>{sel.extra}</span>}
        <span style={{fontSize:18,fontWeight:800,color:"#2D6A4F",fontFamily:"Georgia,serif",marginLeft:"auto",whiteSpace:"nowrap",flexShrink:0}}>{sel.d>1000?(sel.d/1000).toFixed(1)+" км":sel.d+" м"}</span>
        <span style={{fontSize:12,color:"#999",whiteSpace:"nowrap",flexShrink:0}}>~{Math.round(sel.d/70)} хв</span>
        <button onClick={()=>{setSel(null);setDdVal("")}} style={{border:"none",background:"rgba(0,0,0,.06)",borderRadius:6,width:28,height:28,cursor:"pointer",fontSize:14,color:"#999",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,lineHeight:1}}>✕</button>
      </div>}

      <div style={{borderRadius:20,overflow:"hidden",border:"1px solid rgba(0,0,0,.08)",boxShadow:"0 4px 20px rgba(0,0,0,.06)"}}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:"auto",display:"block",background:"#fafaff"}}>

          {/* Grid */}
          {Array.from({length:19}).map((_,i) => <React.Fragment key={i}>
            <line x1={0} y1={i*H/18} x2={W} y2={i*H/18} stroke="rgba(0,0,0,.018)" strokeWidth={0.5}/>
            <line x1={i*W/18} y1={0} x2={i*W/18} y2={H} stroke="rgba(0,0,0,.018)" strokeWidth={0.5}/>
          </React.Fragment>)}

          {/* Zones */}
          <circle cx={ratX} cy={ratY} r={R1K} fill="rgba(45,106,79,.015)" stroke="rgba(45,106,79,.08)" strokeWidth={1.2} strokeDasharray="6 4"/>
          {[[0,-1],[0,1],[1,0],[-1,0]].map(([dx,dy],i) => {
            const lx=ratX+dx*R1K, ly=ratY+dy*R1K;
            return <g key={"z"+i}><rect x={lx-12} y={ly-7} width={24} height={14} rx={4} fill="rgba(45,106,79,.06)"/>
            <text x={lx} y={ly+4} fontSize={8} fill="#2D6A4F" textAnchor="middle" fontWeight="700">1км</text></g>;
          })}
          <circle cx={ratX} cy={ratY} r={R200} fill="rgba(221,161,94,.04)" stroke="rgba(221,161,94,.25)" strokeWidth={1.2}/>

          {/* Lake */}
          {(()=>{const [lx,ly]=xy(48.9147,24.6918); return <g>
            <ellipse cx={lx} cy={ly} rx={36} ry={22} fill="rgba(45,140,220,.12)" stroke="rgba(45,140,220,.28)" strokeWidth={1.5}/>
            <text x={lx} y={ly+34} fontSize={12} fontWeight={700} fill="#3B82C8" textAnchor="middle" fontFamily="Georgia,serif">Міське озеро</text>
          </g>;})()}

          {/* Park */}
          {(()=>{const [px,py]=xy(48.9109,24.6991); return <g>
            <ellipse cx={px} cy={py} rx={34} ry={24} fill="rgba(46,160,67,.07)" stroke="rgba(46,160,67,.18)" strokeWidth={1.2}/>
            {[[-14,-10],[-6,10],[8,-6],[16,8],[0,-14],[-10,5],[12,-11],[6,12],[-16,1]].map(([dx,dy],j)=>
              <circle key={"t"+j} cx={px+dx} cy={py+dy} r={3.5} fill="rgba(46,160,67,.12)" stroke="rgba(46,160,67,.18)" strokeWidth={0.4}/>
            )}
            <text x={px} y={py+36} fontSize={12} fontWeight={700} fill="#2EA043" textAnchor="middle" fontFamily="Georgia,serif">Парк Шевченка</text>
          </g>;})()}

          {/* Selection line */}
          {sel && selXY && <line x1={ratX} y1={ratY} x2={selXY[0]} y2={selXY[1]} stroke={sel.color} strokeWidth={2} strokeDasharray="6 4" opacity={0.3}/>}

          {/* ═══ KINDERGARTENS ═══ */}
          {showKg && KG_COM.map((kg,i) => {
            const [cx,cy]=xy(kg.lat,kg.lng);
            return <Dot key={"kg"+i} cx={cx} cy={cy} color="#059669" shape="circle" label={kg.n} isSel={sel?.n===kg.n} onClick={()=>click(kg,"#059669")}/>;
          })}

          {/* ═══ LYCEES ═══ */}
          {showLyc && LYCEES.map((ly,i) => {
            const [cx,cy]=xy(ly.lat,ly.lng);
            return <Dot key={"ly"+i} cx={cx} cy={cy} color="#2563EB" shape="square" label={ly.n} isSel={sel?.n===ly.n} onClick={()=>click(ly,"#2563EB")}/>;
          })}

          {/* ═══ UNIVERSITIES ═══ */}
          {showUni && UNIS.map((u,i) => {
            const [ux,uy]=xy(u.lat,u.lng);
            return <Dot key={"u"+i} cx={ux} cy={uy} color="#7C3AED" shape="pin" label={u.n+" · "+u.sub} isSel={sel?.n===u.n} onClick={()=>click(u,"#7C3AED")}/>;
          })}

          {/* ═══ НОВОБУДОВИ (помаранчеві кружки) ═══ */}
          {showNov && NOVOBUD.map((nb,i) => {
            const [nx,ny]=xy(nb.lat,nb.lng);
            return <Dot key={"nb"+i} cx={nx} cy={ny} color="#F97316" shape="circle" label={nb.n+" · "+nb.dev} isSel={sel?.n===nb.n && sel?.color==="#F97316"} onClick={()=>click(nb,"#F97316",nb.dev)}/>;
          })}

          {/* ═══ єОселя (червоні піни з "є", поверх новобудов) ═══ */}
          {showJk && JK_LIST.map((jk,i) => {
            const [jx,jy]=xy(jk.lat,jk.lng);
            return <Dot key={"jk"+i} cx={jx} cy={jy} color="#E63946" shape="house" label={jk.n+" · єОселя"} isSel={sel?.n===jk.n && sel?.color==="#E63946"} eo={jk.eo} onClick={()=>click(jk,"#E63946",jk.dev+" · єОселя")}/>;
          })}

          {/* ═══ KEY POI (transport, malls) ═══ */}
          {KEY_POI.filter(p=>p.cat==='transport'||p.cat==='mall').map((p,i) => {
            const [px,py]=xy(p.lat,p.lng);
            const catColors = {transport:'#78716C',mall:'#D97706'};
            return <Dot key={"kp"+i} cx={px} cy={py} color={catColors[p.cat]} shape="square" label={p.n} isSel={false} onClick={()=>{}}/>;
          })}

          {/* ═══ RATUSHA ═══ */}
          <g transform={`translate(${ratX},${ratY})`}>
            <rect x={-16} y={8} width={32} height={5} rx={1.5} fill="#2D6A4F"/>
            <rect x={-18} y={12} width={36} height={3.5} rx={1} fill="#1B4332"/>
            {[-12,-4,4,12].map((cx,i) => <rect key={i} x={cx-1.5} y={-5} width={3} height={13} rx={0.5} fill="#2D6A4F"/>)}
            <polygon points="0,-15 -17,-5 17,-5" fill="#2D6A4F"/>
            <polygon points="0,-12 -13,-5 13,-5" fill="#40916C" opacity={0.3}/>
            <rect x={-4} y={-28} width={8} height={13} rx={1} fill="#2D6A4F"/>
            <circle cx={0} cy={-22} r={3} fill="#fff" stroke="#2D6A4F" strokeWidth={0.6}/>
            <line x1={0} y1={-22} x2={0} y2={-24.5} stroke="#2D6A4F" strokeWidth={0.6}/>
            <line x1={0} y1={-22} x2={1.5} y2={-21} stroke="#2D6A4F" strokeWidth={0.6}/>
            <polygon points="0,-38 -3,-28 3,-28" fill="#DDA15E"/>
            <circle cx={0} cy={-39} r={1.5} fill="#DDA15E"/>
          </g>
          <text x={ratX} y={ratY+28} fontSize={15} fontWeight={800} fill="#1A1A18" textAnchor="middle" fontFamily="Georgia,serif">Ратуша</text>
          <text x={ratX} y={ratY+41} fontSize={10} fill="#7a7a72" textAnchor="middle">центр міста</text>

          {/* Scale */}
          <g transform={`translate(20,${H-24})`}>
            <line x1={0} y1={0} x2={R200} y2={0} stroke="#bbb" strokeWidth={1.5}/>
            <line x1={0} y1={-3} x2={0} y2={3} stroke="#bbb" strokeWidth={1}/>
            <line x1={R200} y1={-3} x2={R200} y2={3} stroke="#bbb" strokeWidth={1}/>
            <text x={R200/2} y={-5} fontSize={8} fill="#bbb" textAnchor="middle" fontWeight="600">200м</text>
          </g>

          {/* Legend */}
          <g transform={`translate(${W-168},14)`}>
            <rect x={0} y={0} width={160} height={158} rx={12} fill="rgba(255,255,255,.94)" stroke="rgba(0,0,0,.05)" strokeWidth={1}/>
            <text x={12} y={18} fontSize={11} fill="#333" fontWeight="700">Легенда</text>
            <circle cx={16} cy={34} r={5} fill="#059669" stroke="#fff" strokeWidth={1.5}/>
            <text x={28} y={38} fontSize={10} fill="#555">Садочок ({KG_COM.length})</text>
            <rect x={12} y={48} width={8} height={8} rx={2} fill="#2563EB" stroke="#fff" strokeWidth={1.5}/>
            <text x={28} y={56} fontSize={10} fill="#555">Ліцей ({LYCEES.length})</text>
            <circle cx={16} cy={72} r={6} fill="#7C3AED"/>
            <polygon points="16,67 12,71 16,74 20,71" fill="#fff" opacity={0.8}/>
            <text x={28} y={76} fontSize={10} fill="#555">Університет ({UNIS.length})</text>
            <circle cx={16} cy={90} r={5} fill="#F97316" stroke="#fff" strokeWidth={1.5}/>
            <text x={28} y={94} fontSize={10} fill="#555">Новобудова ({NOVOBUD.length})</text>
            <circle cx={16} cy={108} r={6} fill="#E63946"/>
            <circle cx={21} cy={103} r={3} fill="#DDA15E" stroke="#fff" strokeWidth={0.8}/>
            <text x={28} y={112} fontSize={10} fill="#555">єОселя ({JK_LIST.length})</text>
            <rect x={10} y={122} width={12} height={8} rx={1.5} fill="#2D6A4F"/>
            <text x={28} y={131} fontSize={10} fill="#555">Ратуша (центр)</text>
            <circle cx={16} cy={148} r={5} fill="none" stroke="rgba(45,106,79,.2)" strokeWidth={1.2} strokeDasharray="2 1.5"/>
            <text x={28} y={152} fontSize={10} fill="#555">Зона 1 км</text>
          </g>
        </svg>
      </div>

      {/* ═══ DISTANCE TABLE ═══ */}
      {sel && <div style={{marginTop:24,background:"#fff",borderRadius:20,border:"1px solid rgba(0,0,0,.06)",padding:"24px 20px",boxShadow:"0 2px 12px rgba(0,0,0,.04)"}}>
        <h3 style={{fontFamily:"Georgia,serif",fontSize:20,fontWeight:800,marginBottom:4,marginTop:0}}>Відстані від {sel.n}</h3>
        <p style={{color:"#7a7a72",fontSize:14,marginBottom:16,marginTop:0}}>До ключових об'єктів міста (по прямій)</p>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10}}>
          {distances.map((p,i) => {
            const catIcons = {landmark:'🏛️',transport:'🚂',mall:'🛒',park:'🌿',uni:'🎓'};
            const catColors = {landmark:'#2D6A4F',transport:'#78716C',mall:'#D97706',park:'#16A34A',uni:'#7C3AED'};
            return <div key={i} style={{
              padding:"14px 16px",borderRadius:14,
              background:i===0?"linear-gradient(135deg,#f0fdf4,#dcfce7)":"#fafaf7",
              border:i===0?"1px solid rgba(45,106,79,.15)":"1px solid rgba(0,0,0,.04)",
            }}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                <span style={{fontSize:18}}>{catIcons[p.cat]||'📍'}</span>
                <span style={{fontWeight:700,fontSize:14}}>{p.n}</span>
              </div>
              <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between"}}>
                <span style={{fontSize:18,fontWeight:800,color:catColors[p.cat]||'#333',fontFamily:"Georgia,serif"}}>{p.d>1000?(p.d/1000).toFixed(1)+" км":p.d+" м"}</span>
                <span style={{fontSize:13,color:"#999"}}>~{Math.round(p.d/70)} хв</span>
              </div>
            </div>;
          })}

          {/* Nearest kindergarten */}
          {nearestKg && <div style={{padding:"14px 16px",borderRadius:14,background:"#f0fdf4",border:"1px solid rgba(5,150,105,.12)"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <span style={{fontSize:18}}>👶</span>
              <span style={{fontWeight:700,fontSize:14}}>Найближчий садочок</span>
            </div>
            <div style={{fontSize:13,color:"#555",marginBottom:4}}>{nearestKg.n}</div>
            <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between"}}>
              <span style={{fontSize:18,fontWeight:800,color:"#059669",fontFamily:"Georgia,serif"}}>{nearestKg.d>1000?(nearestKg.d/1000).toFixed(1)+" км":nearestKg.d+" м"}</span>
              <span style={{fontSize:13,color:"#999"}}>~{Math.round(nearestKg.d/70)} хв</span>
            </div>
          </div>}

          {/* Nearest lyceum */}
          {nearestLyc && <div style={{padding:"14px 16px",borderRadius:14,background:"#eff6ff",border:"1px solid rgba(37,99,235,.1)"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <span style={{fontSize:18}}>📚</span>
              <span style={{fontWeight:700,fontSize:14}}>Найближчий ліцей</span>
            </div>
            <div style={{fontSize:13,color:"#555",marginBottom:4}}>{nearestLyc.n}</div>
            <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between"}}>
              <span style={{fontSize:18,fontWeight:800,color:"#2563EB",fontFamily:"Georgia,serif"}}>{nearestLyc.d>1000?(nearestLyc.d/1000).toFixed(1)+" км":nearestLyc.d+" м"}</span>
              <span style={{fontSize:13,color:"#999"}}>~{Math.round(nearestLyc.d/70)} хв</span>
            </div>
          </div>}
        </div>
      </div>}

      <div style={{marginTop:40,maxWidth:720,margin:"48px auto 0"}}>
        <ContactForm title="Безкоштовна консультація" subtitle="Розкажемо про кожен район детально." />
      </div>
    </div>
  );
}

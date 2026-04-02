// ═══ Distance helpers ═══
export const distM = (lat1,lng1,lat2,lng2) => {
  const R=6371000, dLat=(lat2-lat1)*Math.PI/180, dLng=(lng2-lng1)*Math.PI/180;
  const a=Math.sin(dLat/2)**2+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
  return Math.round(R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)));
};
export const distMin = (lat1,lng1,lat2,lng2) => {
  const d = distM(lat1,lng1,lat2,lng2);
  return d < 800 ? Math.max(1, Math.round(d*1.3/70)) : Math.max(2, Math.round(d*1.3/250));
};

export const POI_CENTER = [48.9227, 24.7104];
export const POI_STATION = [48.9252, 24.7234];

export const DISTRICTS = [
  { id:"pozytron", name:"Позитрон", lat:48.916, lng:24.737, pMin:820, pMax:950, r1k:350, r2k:480, r3k:600, schools:4, kg:3, transport:9, green:7, quiet:6, nb:12, desc:"Найбільший район, ТРЦ Veles Mall, METRO." },
  { id:"kaskad", name:"Каскад", lat:48.938, lng:24.740, pMin:860, pMax:1000, r1k:370, r2k:500, r3k:620, schools:3, kg:3, transport:8, green:8, quiet:7, nb:8, desc:"Сучасний район, Вовчинецькі пагорби." },
  { id:"center", name:"Центр", lat:48.922, lng:24.712, pMin:1050, pMax:1250, r1k:420, r2k:580, r3k:750, schools:5, kg:4, transport:10, green:6, quiet:3, nb:3, desc:"Пішохідна зона, кав'ярні, театри." },
  { id:"pasichna", name:"Пасічна", lat:48.938, lng:24.688, pMin:780, pMax:920, r1k:300, r2k:420, r3k:530, schools:2, kg:2, transport:6, green:9, quiet:9, nb:5, desc:"Тиша, зелень, свіже повітря." },
  { id:"knyahynyn", name:"Княгинин", lat:48.929, lng:24.705, pMin:840, pMax:980, r1k:380, r2k:500, r3k:620, schools:3, kg:2, transport:7, green:7, quiet:7, nb:10, desc:"Набережна, нові ЖК. Район що росте." },
  { id:"naberezhna", name:"Набережна", lat:48.925, lng:24.695, pMin:1000, pMax:1200, r1k:430, r2k:580, r3k:720, schools:2, kg:2, transport:7, green:8, quiet:8, nb:4, desc:"Преміум, Manhattan UP, Міське озеро." },
  { id:"kalynova", name:"Калинова Слобода", lat:48.901, lng:24.682, pMin:750, pMax:880, r1k:280, r2k:400, r3k:500, schools:2, kg:2, transport:7, green:7, quiet:7, nb:6, desc:"Бюджетний, активно розвивається." },
  { id:"budivelnykiv", name:"Будівельників", lat:48.918, lng:24.720, pMin:720, pMax:860, r1k:270, r2k:380, r3k:480, schools:3, kg:2, transport:7, green:6, quiet:6, nb:4, desc:"Доступний, школи, садки." },
  { id:"bam", name:"БАМ", lat:48.904, lng:24.712, pMin:650, pMax:790, r1k:230, r2k:330, r3k:420, schools:1, kg:1, transport:5, green:7, quiet:8, nb:2, desc:"Найдешевший, приватний сектор." },
  { id:"vokzal", name:"Вокзал", lat:48.923, lng:24.718, pMin:790, pMax:930, r1k:320, r2k:440, r3k:550, schools:2, kg:2, transport:9, green:5, quiet:4, nb:3, desc:"Біля вокзалу, зручний транспорт." },
];

export const DICON = {
  pozytron: "building", kaskad: "mountain", center: "landmark",
  pasichna: "treePine", knyahynyn: "waves", naberezhna: "sparkles",
  kalynova: "home", budivelnykiv: "hammer", bam: "warehouse", vokzal: "train",
};

export const PRIORITIES = [
  { id: "cheap", label: "Бюджет", ic: "wallet" },
  { id: "kids", label: "Для сім'ї", ic: "baby" },
  { id: "transport", label: "Транспорт", ic: "bus" },
  { id: "quiet", label: "Тиша і зелень", ic: "trees" },
  { id: "newbuild", label: "Новобудови", ic: "crane" },
];

export function scoreD(d, sel) {
  if (!sel.length) return 50;
  let s = 0, w = 0;
  if (sel.includes("cheap")) { s += (1250 - d.pMin) / 6; w++; }
  if (sel.includes("kids")) { s += (d.schools + d.kg) * 8; w++; }
  if (sel.includes("transport")) { s += d.transport * 10; w++; }
  if (sel.includes("quiet")) { s += (d.quiet + d.green) * 5; w++; }
  if (sel.includes("newbuild")) { s += d.nb * 6; w++; }
  return Math.round(s / w);
}

export function investScore(d, rooms) {
  const r = rooms || 1;
  const area = r === 1 ? 40 : r === 2 ? 65 : 90;
  const avgP = (d.pMin + d.pMax) / 2;
  const totalInv = avgP * area + 350 * area;
  const rent = d["r" + r + "k"];
  const roi = (rent * 11) / totalInv * 100;
  const uniCoords = [[48.9293,24.6964],[48.9150,24.7010],[48.9215,24.7089]];
  const uniTimes = uniCoords.map(([la,lo]) => distMin(d.lat, d.lng, la, lo));
  const proxAvg = uniTimes.reduce((s, t) => s + t, 0) / uniTimes.length;
  const xS = Math.min(1, Math.max(0, (18 - proxAvg) / 12));
  const yS = Math.min(1, Math.max(0, (roi - 5.5) / 2.5));
  const pS = Math.min(1, Math.max(0, (1100 - avgP) / 400));
  const nS = Math.min(1, Math.max(0, (d.nb - 2) / 8));
  const raw = xS * 0.50 + yS * 0.20 + pS * 0.15 + nS * 0.15;
  return Math.min(10, Math.max(5, Math.round((5 + raw * 5.5) * 10) / 10));
}

export function fmt(n) { return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); }
export function fmtK(n) { return n >= 1000 ? "$" + (n / 1000).toFixed(1).replace(/\.0$/, "") + "K" : "$" + n; }
export function roomsFromArea(a) { return a <= 40 ? 1 : a <= 65 ? 2 : 3; }

// ═══ Repair data ═══
export const RD = {
  floor: { name: "Стяжка підлоги", ic: "layers", matMin: 3.5, matMax: 4, workMin: 3.5, workMax: 4.5, scaled: false },
  electro: { name: "Електромонтаж", ic: "zap", matMin: 8, matMax: 10, workMin: 10, workMax: 13, scaled: false },
  heat: { name: "Опалення (котел + матеріали + робота)", ic: "flame", matMin: 26, matMax: 30, workMin: 10, workMax: 13, scaled: false },
  finish: { name: "Фінішні роботи (штукатурка, шпаклівка, фарба, плитка, підлога)", ic: "paintBrush", matMin: 50, matMax: 80, workMin: 75, workMax: 110, scaled: true },
  furniture: { name: "Меблі + техніка (кухня, ванна, спальня, побутова)", ic: "sofa", matMin: 75, matMax: 115, workMin: 20, workMax: 28, scaled: true },
};

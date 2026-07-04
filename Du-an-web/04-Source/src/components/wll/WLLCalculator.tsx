"use client";

import { useState, useMemo } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type RopeType = "6x36FC" | "6x36IWRC" | "35x7WSC" | "6x36Bent";
type NumLegs = 1 | 2 | 3 | 4;
export type Safety = "excellent" | "good" | "caution" | "danger";

// ─── Rope data — Grade 1960, SWL (tonnes) at β = 0° ─────────────────────────

const ROPE_LABELS: Record<RopeType, string> = {
  "6x36FC": "6×36 + FC",
  "6x36IWRC": "6×36 + IWRC",
  "35x7WSC": "35×7 + WSC",
  "6x36Bent": "6×36 Rope Sling",
};

type RopeRow = Record<RopeType, number | null>;

const ROPE_DATA: Record<number, RopeRow> = {
  8:  { "6x36FC": 0.8,  "6x36IWRC": 0.8,  "35x7WSC": 0.9,  "6x36Bent": 0.7  },
  9:  { "6x36FC": 1.0,  "6x36IWRC": 1.0,  "35x7WSC": 1.1,  "6x36Bent": 0.9  },
  10: { "6x36FC": 1.2,  "6x36IWRC": 1.3,  "35x7WSC": 1.4,  "6x36Bent": 1.1  },
  11: { "6x36FC": 1.4,  "6x36IWRC": 1.5,  "35x7WSC": 1.7,  "6x36Bent": 1.3  },
  12: { "6x36FC": 1.7,  "6x36IWRC": 1.8,  "35x7WSC": 1.9,  "6x36Bent": 1.5  },
  13: { "6x36FC": 2.0,  "6x36IWRC": 2.2,  "35x7WSC": 2.3,  "6x36Bent": 1.8  },
  14: { "6x36FC": 2.3,  "6x36IWRC": 2.5,  "35x7WSC": 2.7,  "6x36Bent": 2.1  },
  16: { "6x36FC": 3.0,  "6x36IWRC": 3.3,  "35x7WSC": 3.5,  "6x36Bent": 2.7  },
  18: { "6x36FC": 3.9,  "6x36IWRC": 4.1,  "35x7WSC": 4.4,  "6x36Bent": 3.4  },
  20: { "6x36FC": 4.8,  "6x36IWRC": 5.1,  "35x7WSC": 5.5,  "6x36Bent": 4.2  },
  22: { "6x36FC": 5.7,  "6x36IWRC": 6.2,  "35x7WSC": 6.8,  "6x36Bent": 5.1  },
  24: { "6x36FC": 6.8,  "6x36IWRC": 7.4,  "35x7WSC": 8.1,  "6x36Bent": 6.1  },
  26: { "6x36FC": 8.0,  "6x36IWRC": 8.7,  "35x7WSC": 9.4,  "6x36Bent": 7.1  },
  28: { "6x36FC": 9.3,  "6x36IWRC": 10.0, "35x7WSC": 10.9, "6x36Bent": 8.3  },
  30: { "6x36FC": 10.7, "6x36IWRC": 11.5, "35x7WSC": 11.7, "6x36Bent": 9.5  },
  32: { "6x36FC": 12.1, "6x36IWRC": 13.1, "35x7WSC": 14.0, "6x36Bent": 10.8 },
  34: { "6x36FC": 13.7, "6x36IWRC": 14.8, "35x7WSC": 15.0, "6x36Bent": 12.2 },
  36: { "6x36FC": 15.4, "6x36IWRC": 16.6, "35x7WSC": 16.8, "6x36Bent": 13.7 },
  38: { "6x36FC": 17.1, "6x36IWRC": 18.5, "35x7WSC": 20.0, "6x36Bent": 15.2 },
  40: { "6x36FC": 19.1, "6x36IWRC": 20.6, "35x7WSC": 22.0, "6x36Bent": 17.0 },
  42: { "6x36FC": 20.9, "6x36IWRC": 22.6, "35x7WSC": null,  "6x36Bent": 18.6 },
  44: { "6x36FC": 22.9, "6x36IWRC": 24.8, "35x7WSC": null,  "6x36Bent": 20.4 },
  46: { "6x36FC": 25.1, "6x36IWRC": 27.2, "35x7WSC": null,  "6x36Bent": 22.3 },
  48: { "6x36FC": 27.3, "6x36IWRC": 29.5, "35x7WSC": null,  "6x36Bent": 24.3 },
  50: { "6x36FC": 29.7, "6x36IWRC": 32.0, "35x7WSC": null,  "6x36Bent": 26.4 },
  52: { "6x36FC": 32.1, "6x36IWRC": 34.7, "35x7WSC": null,  "6x36Bent": 28.5 },
  54: { "6x36FC": 34.6, "6x36IWRC": 37.4, "35x7WSC": null,  "6x36Bent": 30.8 },
  56: { "6x36FC": 37.2, "6x36IWRC": 40.2, "35x7WSC": null,  "6x36Bent": 33.1 },
  58: { "6x36FC": 39.9, "6x36IWRC": 43.1, "35x7WSC": null,  "6x36Bent": 35.5 },
  60: { "6x36FC": 42.8, "6x36IWRC": 46.1, "35x7WSC": null,  "6x36Bent": 38.0 },
  62: { "6x36FC": 45.6, "6x36IWRC": 49.2, "35x7WSC": null,  "6x36Bent": 40.5 },
  64: { "6x36FC": 48.6, "6x36IWRC": 52.4, "35x7WSC": null,  "6x36Bent": 43.2 },
  68: { "6x36FC": 54.9, "6x36IWRC": 59.2, "35x7WSC": null,  "6x36Bent": 48.8 },
  70: { "6x36FC": 58.2, "6x36IWRC": 62.8, "35x7WSC": null,  "6x36Bent": 51.7 },
  72: { "6x36FC": 61.5, "6x36IWRC": 66.4, "35x7WSC": null,  "6x36Bent": 54.7 },
  74: { "6x36FC": 65.0, "6x36IWRC": 70.1, "35x7WSC": null,  "6x36Bent": 57.8 },
  77: { "6x36FC": 70.4, "6x36IWRC": 75.9, "35x7WSC": null,  "6x36Bent": 62.5 },
};

const DIAMETERS = Object.keys(ROPE_DATA).map(Number);

// ─── WLL formula ─────────────────────────────────────────────────────────────
// 1-leg: WLL = SWL (β = 0°)
// 2-leg: WLL = SWL × 2 × cos(β)
// 3-leg: WLL = SWL × 3 × cos(β)
// 4-leg: WLL = SWL × 3 × cos(β)  ← conservative factor, unequal load distribution

const LEG_FACTOR: Record<NumLegs, number> = { 1: 1, 2: 2, 3: 3, 4: 3 };

function calcWLL(swl: number, legs: NumLegs, betaDeg: number): number {
  if (legs === 1) return swl;
  return swl * LEG_FACTOR[legs] * Math.cos((betaDeg * Math.PI) / 180);
}

export function getSafety(beta: number): Safety {
  if (beta <= 30) return "excellent";
  if (beta <= 45) return "good";
  if (beta <= 60) return "caution";
  return "danger";
}

export const SAFETY: Record<Safety, { label: string; color: string; bg: string; border: string }> = {
  excellent: { label: "Excellent ✓", color: "#0FA697", bg: "#E3E9F0", border: "#19D3C5" },
  good:      { label: "Good ✓",      color: "#0FA697", bg: "#f0fdfb", border: "#0FA697" },
  caution:   { label: "Caution ⚠",  color: "#D97706", bg: "#fffbeb", border: "#F59E0B" },
  danger:    { label: "Over limit ✕",color: "#DC2626", bg: "#fef2f2", border: "#EF4444" },
};

// DNV GL angles per DNVGL-ST-E271 Table E-4/E-5
const DNV_ANGLES = [25, 30, 35, 40, 45];
const REF_ANGLES = DNV_ANGLES;

// ─── SVG Diagram ─────────────────────────────────────────────────────────────

function getLegPoints(legs: NumLegs, betaDeg: number, cx: number, hookY: number, len: number) {
  const b = (betaDeg * Math.PI) / 180;
  const s = Math.sin(b) * len;
  const c = Math.cos(b) * len;
  if (legs === 1) return [{ x: cx, y: hookY + len }];
  if (legs === 2) return [{ x: cx - s, y: hookY + c }, { x: cx + s, y: hookY + c }];
  if (legs === 3) return [
    { x: cx - s, y: hookY + c },
    { x: cx,     y: hookY + len },
    { x: cx + s, y: hookY + c },
  ];
  // 4 legs: outer at β, inner at β/2
  const s2 = Math.sin(b / 2) * len;
  const c2 = Math.cos(b / 2) * len;
  return [
    { x: cx - s,  y: hookY + c  },
    { x: cx - s2, y: hookY + c2 },
    { x: cx + s2, y: hookY + c2 },
    { x: cx + s,  y: hookY + c  },
  ];
}

export function SlingDiagram({ legs, beta, safety }: { legs: NumLegs; beta: number; safety: Safety }) {
  const W = 300, H = 260;
  const cx = 150, hookY = 32, legLen = 148;
  const b = (beta * Math.PI) / 180;
  const color = SAFETY[safety].color;
  const pts = getLegPoints(legs, beta, cx, hookY, legLen);

  // Load block spans all attachment points
  const xs = pts.map(p => p.x);
  const maxY = Math.max(...pts.map(p => p.y));
  const lx = Math.min(...xs) - 18;
  const lw = Math.max(...xs) - Math.min(...xs) + 36;
  const blockW = Math.max(lw, 56);
  const blockX = cx - blockW / 2;
  const blockY = maxY + 4;

  // Angle arc (between two outermost legs, radius 52)
  const arcR = 52;
  const ax1 = cx - Math.sin(b) * arcR;
  const ay1 = hookY + Math.cos(b) * arcR;
  const ax2 = cx + Math.sin(b) * arcR;
  const ay2 = hookY + Math.cos(b) * arcR;
  const showArc = legs >= 2 && beta > 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[280px] mx-auto select-none">
      {/* Dashed vertical reference */}
      <line x1={cx} y1={hookY} x2={cx} y2={hookY + legLen + 4}
        stroke="#CDD9E6" strokeWidth={1.5} strokeDasharray="4 3" />

      {/* Angle arc */}
      {showArc && (
        <>
          <path
            d={`M ${ax1} ${ay1} A ${arcR} ${arcR} 0 0 1 ${ax2} ${ay2}`}
            fill="none" stroke={color} strokeWidth={1.5} strokeDasharray="5 3" opacity={0.7}
          />
          <text x={cx} y={hookY + arcR + 16} textAnchor="middle"
            fontSize={11} fill={color} fontFamily="monospace" fontWeight="600">
            2β = {(beta * 2)}°
          </text>
        </>
      )}

      {/* Sling legs */}
      {pts.map((pt, i) => (
        <line key={i}
          x1={cx} y1={hookY + 13}
          x2={pt.x} y2={pt.y}
          stroke={color} strokeWidth={3.5} strokeLinecap="round"
        />
      ))}

      {/* Hook / master link */}
      <circle cx={cx} cy={hookY} r={13} fill="none" stroke="#06182F" strokeWidth={3} />
      <circle cx={cx} cy={hookY} r={4} fill="#06182F" />
      {/* Hook chain link above */}
      <line x1={cx} y1={hookY - 13} x2={cx} y2={hookY - 24}
        stroke="#06182F" strokeWidth={4} strokeLinecap="round" />

      {/* Attachment dots on load */}
      {pts.map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r={5} fill={color} />
      ))}

      {/* Load block */}
      <rect x={blockX} y={blockY} width={blockW} height={30} rx={5} fill="#06182F" />
      <text x={cx} y={blockY + 20} textAnchor="middle"
        fontSize={10} fill="white" fontFamily="monospace" letterSpacing={1.5}>
        LOAD
      </text>

      {/* β label on one leg (right side) for single/2+ */}
      {legs >= 2 && beta > 5 && (
        <text
          x={cx + Math.sin(b) * (legLen * 0.55) + 10}
          y={hookY + Math.cos(b) * (legLen * 0.55)}
          fontSize={10} fill={color} fontFamily="monospace" opacity={0.8}
        >
          β={beta}°
        </text>
      )}
    </svg>
  );
}

// ─── Main Calculator ──────────────────────────────────────────────────────────

export default function WLLCalculator() {
  const [inputMode, setInputMode] = useState<"rope" | "custom">("rope");
  const [ropeType, setRopeType] = useState<RopeType>("6x36IWRC");
  const [diameter, setDiameter] = useState<number>(32);
  const [customSWL, setCustomSWL] = useState<string>("10");
  const [legs, setLegs] = useState<NumLegs>(2);
  const [beta, setBeta] = useState<number>(30);

  const swlPerLeg = useMemo<number>(() => {
    if (inputMode === "custom") return Math.max(0, parseFloat(customSWL) || 0);
    return ROPE_DATA[diameter]?.[ropeType] ?? 0;
  }, [inputMode, ropeType, diameter, customSWL]);

  const effectiveBeta = legs === 1 ? 0 : beta;
  const wll = useMemo(() => calcWLL(swlPerLeg, legs, effectiveBeta), [swlPerLeg, legs, effectiveBeta]);
  const safety = getSafety(effectiveBeta);
  const ss = SAFETY[safety];
  const cosVal = Math.cos((effectiveBeta * Math.PI) / 180);
  const availDiameters = DIAMETERS.filter(d => ROPE_DATA[d][ropeType] !== null);

  return (
    <div>
      {/* Calculator */}
      <section className="bg-slate-light py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

            {/* ── Left: Inputs ── */}
            <div className="lg:col-span-2 space-y-5">

              {/* Mode toggle */}
              <div className="flex rounded-xl border border-slate-border overflow-hidden bg-white">
                <button
                  onClick={() => setInputMode("rope")}
                  className={`flex-1 py-3 text-sm font-heading font-bold transition-colors ${
                    inputMode === "rope" ? "bg-navy text-white" : "text-navy/60 hover:text-navy"
                  }`}
                >
                  Select wire rope
                </button>
                <button
                  onClick={() => setInputMode("custom")}
                  className={`flex-1 py-3 text-sm font-heading font-bold transition-colors ${
                    inputMode === "custom" ? "bg-navy text-white" : "text-navy/60 hover:text-navy"
                  }`}
                >
                  Enter SWL manually
                </button>
              </div>

              {inputMode === "rope" ? (
                <div className="bg-white rounded-xl border border-slate-border p-5 space-y-4">
                  {/* Rope type */}
                  <div>
                    <label className="block font-mono text-xs text-navy/50 uppercase tracking-wide mb-1.5">
                      Rope type
                    </label>
                    <select
                      value={ropeType}
                      onChange={e => {
                        const rt = e.target.value as RopeType;
                        setRopeType(rt);
                        // reset diameter if not available for new rope type
                        if (ROPE_DATA[diameter][rt] === null) {
                          const first = DIAMETERS.find(d => ROPE_DATA[d][rt] !== null);
                          if (first) setDiameter(first);
                        }
                      }}
                      className="w-full border border-slate-border rounded-lg px-4 py-2.5 text-navy text-sm bg-white focus:outline-none focus:border-teal"
                    >
                      {(Object.keys(ROPE_LABELS) as RopeType[]).map(k => (
                        <option key={k} value={k}>{ROPE_LABELS[k]}</option>
                      ))}
                    </select>
                  </div>

                  {/* Diameter */}
                  <div>
                    <label className="block font-mono text-xs text-navy/50 uppercase tracking-wide mb-1.5">
                      Diameter (mm)
                    </label>
                    <select
                      value={diameter}
                      onChange={e => setDiameter(Number(e.target.value))}
                      className="w-full border border-slate-border rounded-lg px-4 py-2.5 text-navy text-sm bg-white focus:outline-none focus:border-teal"
                    >
                      {availDiameters.map(d => (
                        <option key={d} value={d}>Ø {d} mm</option>
                      ))}
                    </select>
                  </div>

                  {/* Auto SWL */}
                  <div className="rounded-lg bg-slate-light border border-slate-border px-4 py-3">
                    <div className="font-mono text-xs text-navy/40 uppercase tracking-wide mb-1">
                      SWL per leg · β = 0°
                    </div>
                    <div className="font-heading font-extrabold text-3xl text-navy">
                      {swlPerLeg.toFixed(1)}
                      <span className="text-base font-normal text-navy/50 ml-1">t</span>
                    </div>
                    <div className="font-mono text-xs text-navy/40 mt-0.5">
                      {ROPE_LABELS[ropeType]} · Ø{diameter}mm · Grade 1960
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-slate-border p-5">
                  <label className="block font-mono text-xs text-navy/50 uppercase tracking-wide mb-1.5">
                    SWL per leg (tonnes)
                  </label>
                  <input
                    type="number"
                    value={customSWL}
                    onChange={e => setCustomSWL(e.target.value)}
                    min="0" step="0.1"
                    className="w-full border border-slate-border rounded-lg px-4 py-3 text-navy text-2xl font-heading font-bold bg-white focus:outline-none focus:border-teal"
                    placeholder="0.0"
                  />
                </div>
              )}

              {/* Number of legs */}
              <div className="bg-white rounded-xl border border-slate-border p-5">
                <label className="block font-mono text-xs text-navy/50 uppercase tracking-wide mb-3">
                  Number of legs
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {([1, 2, 3, 4] as NumLegs[]).map(n => (
                    <button
                      key={n}
                      onClick={() => setLegs(n)}
                      className={`py-3 rounded-lg font-heading font-bold text-sm transition-all ${
                        legs === n
                          ? "bg-navy text-white shadow-md scale-105"
                          : "bg-slate-light border border-slate-border text-navy hover:border-teal/40"
                      }`}
                    >
                      {n}-leg
                    </button>
                  ))}
                </div>
                {legs === 4 && (
                  <p className="font-mono text-xs text-navy/40 mt-3 leading-relaxed">
                    ⚠ 4-leg: uses ×3 factor (conservative — accounts for unequal load distribution between legs)
                  </p>
                )}
              </div>

              {/* Angle slider */}
              {legs > 1 && (
                <div className="bg-white rounded-xl border border-slate-border p-5">
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-mono text-xs text-navy/50 uppercase tracking-wide">
                      Angle β (from vertical)
                    </label>
                    <span className="font-heading font-extrabold text-2xl" style={{ color: ss.color }}>
                      {beta}°
                    </span>
                  </div>

                  <input
                    type="range"
                    min={0} max={60} step={1}
                    value={beta}
                    onChange={e => setBeta(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: ss.color }}
                  />

                  {/* Tick marks */}
                  <div className="flex justify-between font-mono text-xs text-navy/40 mt-1.5">
                    <span>0°</span><span>15°</span><span>30°</span><span>45°</span><span>60°</span>
                  </div>

                  {/* Safety badge */}
                  <div className="flex items-center gap-3 mt-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold"
                      style={{ background: ss.bg, color: ss.color, border: `1px solid ${ss.border}` }}
                    >
                      {ss.label}
                    </span>
                    <span className="font-mono text-xs text-navy/50">
                      cos({beta}°) = {cosVal.toFixed(3)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* ── Right: Diagram + Result ── */}
            <div className="lg:col-span-3 space-y-5">

              {/* Diagram */}
              <div className="bg-white rounded-xl border border-slate-border p-6">
                <div className="font-mono text-xs text-navy/40 uppercase tracking-wide mb-4 text-center">
                  Sling diagram — {legs}-leg · β = {effectiveBeta}°
                </div>
                <SlingDiagram legs={legs} beta={effectiveBeta} safety={safety} />
              </div>

              {/* Result */}
              <div
                className="rounded-xl p-6 border-2"
                style={{ background: ss.bg, borderColor: ss.border }}
              >
                <div className="font-mono text-xs uppercase tracking-wide mb-2" style={{ color: ss.color }}>
                  Total WLL · {legs}-leg · β = {effectiveBeta}°
                </div>

                <div className="font-heading font-extrabold text-6xl mb-1" style={{ color: ss.color }}>
                  {wll.toFixed(2)}
                  <span className="text-2xl font-normal text-navy/50 ml-2">t</span>
                </div>
                <div className="text-navy/50 font-mono text-sm mb-4">
                  = {(wll * 1000).toFixed(0)} kg
                </div>

                {/* Formula breakdown */}
                <div className="bg-white/70 rounded-lg p-4 font-mono text-sm text-navy/70 space-y-1">
                  <div>
                    WLL = SWL × leg factor × cos(β)
                  </div>
                  <div className="text-navy font-bold">
                    = {swlPerLeg.toFixed(2)} × {LEG_FACTOR[legs]} × cos({effectiveBeta}°)
                  </div>
                  <div style={{ color: ss.color }} className="font-bold">
                    = {swlPerLeg.toFixed(2)} × {LEG_FACTOR[legs]} × {cosVal.toFixed(3)}
                    {" "}= <span className="text-base">{wll.toFixed(2)} t</span>
                  </div>
                </div>
              </div>

              {/* Quick angle buttons */}
              {legs > 1 && (
                <div className="bg-white rounded-xl border border-slate-border p-4">
                  <div className="font-mono text-xs text-navy/40 uppercase tracking-wide mb-3">
                    Quick angle select
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {[0, 25, 30, 35, 40, 45, 60].map(a => (
                      <button
                        key={a}
                        onClick={() => setBeta(a)}
                        className={`px-4 py-2 rounded-lg font-mono text-sm font-bold transition-all ${
                          beta === a
                            ? "bg-navy text-white"
                            : "bg-slate-light border border-slate-border text-navy hover:border-teal/50"
                        }`}
                      >
                        {a}°
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Reference Table ── */}
          {swlPerLeg > 0 && (
            <div className="mt-10">
              <div className="flex flex-wrap items-baseline gap-3 mb-4">
                <h2 className="font-heading font-bold text-navy text-xl">
                  DNVGL-ST-E271 Reference Table
                </h2>
                <span className="font-mono text-xs text-teal-dark border border-teal/30 rounded-full px-2.5 py-0.5">
                  Offshore standard angles
                </span>
                <span className="font-mono font-normal text-sm text-navy/50">
                  SWL/leg = {swlPerLeg.toFixed(2)} t
                </span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-border">
                <table className="w-full border-collapse bg-white text-sm">
                  <thead>
                    <tr className="bg-navy text-white">
                      <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide">Angle β</th>
                      <th className="px-4 py-3 text-center font-mono text-xs uppercase tracking-wide">cos(β)</th>
                      <th className="px-4 py-3 text-center font-mono text-xs uppercase tracking-wide">1-leg</th>
                      <th className="px-4 py-3 text-center font-mono text-xs uppercase tracking-wide">2-leg</th>
                      <th className="px-4 py-3 text-center font-mono text-xs uppercase tracking-wide">3-leg</th>
                      <th className="px-4 py-3 text-center font-mono text-xs uppercase tracking-wide">4-leg*</th>
                      <th className="px-4 py-3 text-center font-mono text-xs uppercase tracking-wide">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {REF_ANGLES.map((a, i) => {
                      const c = Math.cos((a * Math.PI) / 180);
                      const isActive = a === effectiveBeta && legs > 0;
                      const rowSafety = getSafety(a);
                      const rowSS = SAFETY[rowSafety];
                      return (
                        <tr
                          key={a}
                          className={`border-t border-slate-border transition-colors ${
                            isActive ? "bg-teal/10 font-bold" : i % 2 === 0 ? "bg-white" : "bg-slate-light/40"
                          }`}
                        >
                          <td className="px-4 py-3 font-mono font-bold text-navy">
                            {a}° {isActive ? "◀" : ""}
                          </td>
                          <td className="px-4 py-3 font-mono text-center text-navy/70">{c.toFixed(3)}</td>
                          <td className="px-4 py-3 font-mono text-center text-navy">{swlPerLeg.toFixed(2)}</td>
                          <td className="px-4 py-3 font-mono text-center text-navy">{(swlPerLeg * 2 * c).toFixed(2)}</td>
                          <td className="px-4 py-3 font-mono text-center text-navy">{(swlPerLeg * 3 * c).toFixed(2)}</td>
                          <td className="px-4 py-3 font-mono text-center text-navy">{(swlPerLeg * 3 * c).toFixed(2)}</td>
                          <td className="px-4 py-3 text-center">
                            <span
                              className="px-2 py-0.5 rounded-full text-xs font-mono"
                              style={{ background: rowSS.bg, color: rowSS.color }}
                            >
                              {rowSS.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="font-mono text-xs text-navy/40 mt-2">
                * 4-leg uses ×3 factor (conservative, per EN 13414). Values in tonnes. Grade 1960 · β measured from vertical.
                Reference: DNVGL-ST-E271 Table E-4/E-5.
              </p>
            </div>
          )}

          {/* Notes */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { range: "0° – 25°", label: "Ideal", note: "Maximum efficiency — recommended for all lifting applications.", color: "#19D3C5" },
              { range: "25° – 45°", label: "Offshore standard", note: "Standard angle range per DNVGL-ST-E271 — typical for offshore and FPSO lifts.", color: "#0FA697" },
              { range: "45° – 60°", label: "Limit zone", note: "60° is the maximum per EN 13414. Consider revising sling configuration.", color: "#D97706" },
            ].map(({ range, label, note, color }) => (
              <div
                key={range}
                className="rounded-xl p-4 border"
                style={{ borderColor: color, background: "#fff" }}
              >
                <div className="font-mono text-xs uppercase tracking-wide mb-1" style={{ color }}>
                  {range}
                </div>
                <div className="font-heading font-bold text-navy mb-1">{label}</div>
                <div className="font-mono text-xs text-navy/50">{note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

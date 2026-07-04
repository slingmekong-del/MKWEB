"use client";

import { useMemo, useState } from "react";
import {
  chonCap,
  chieuDaiCap,
  hardEyeAllowance,
  getConstructions,
  legFactor,
  BETA_CAUTION_DEG,
  type Standard,
  type NumLegs,
} from "@/lib/wll-engine";
import { SlingDiagram, getSafety, SAFETY } from "./WLLCalculator";

const BETA_PRESETS = [0, 30, 45, 60];

function num(v: string): number {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
}

export default function SlingQuoteBuilder() {
  const [tai, setTai] = useState("12");
  const [soChan, setSoChan] = useState<NumLegs>(4);
  const [beta, setBeta] = useState(45);
  const [standard, setStandard] = useState<Standard>("DNV");
  const [construction, setConstruction] = useState("E-5_steel_1960");
  const [offshore, setOffshore] = useState(true);
  const [L, setL] = useState("");
  const [W, setW] = useState("");

  const constructions = getConstructions(standard);
  const tai_t = num(tai);
  const validLoad = tai_t > 0;

  // Change standard → reset construction to the first item of the new standard
  function onStandardChange(s: Standard) {
    setStandard(s);
    setConstruction(getConstructions(s)[0].id);
    if (s !== "DNV") setOffshore(false);
    else setOffshore(true);
  }

  const cap = useMemo(() => {
    if (!validLoad) return null;
    return chonCap({ tai_t, soChan, betaDeg: beta, standard, construction, offshore });
  }, [validLoad, tai_t, soChan, beta, standard, construction, offshore]);

  // Selected rope Ø → add "2 hard eyes" allowance by size (replaces fixed +0.3m)
  const dia = cap && cap.ok ? cap.duongKinh_mm : null;
  const eyeAdd = dia != null ? hardEyeAllowance(dia) : null;

  const hasDims = num(L) > 0 && num(W) > 0;
  const length = useMemo(() => {
    if (!hasDims || beta <= 0 || dia == null) return null; // needs Ø + angle>0 + dimensions
    return chieuDaiCap({ L: num(L), W: num(W), betaDeg: beta, allowance: hardEyeAllowance(dia) });
  }, [hasDims, L, W, beta, dia]);

  const safety = getSafety(beta);
  const ss = SAFETY[safety];
  const cosVal = Math.cos((beta * Math.PI) / 180);

  const inputCls =
    "w-full border border-slate-border rounded-lg px-4 py-2.5 text-navy text-sm bg-white focus:outline-none focus:border-teal";
  const labelCls =
    "block font-mono text-xs text-navy/50 uppercase tracking-wide mb-1.5";

  return (
    <section className="bg-slate-light py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* ── Left: Inputs ── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Load to lift: Weight · Length · Width */}
            <div className="bg-white rounded-xl border border-slate-border p-5">
              <label className="block font-mono text-xs text-navy/50 uppercase tracking-wide mb-3">
                Load to lift
              </label>
              <div className="mb-3">
                <label className={labelCls}>Weight (tonnes)</label>
                <input
                  type="number"
                  value={tai}
                  onChange={(e) => setTai(e.target.value)}
                  min="0"
                  step="0.1"
                  placeholder="0.0"
                  className="w-full border border-slate-border rounded-lg px-4 py-3 text-navy text-2xl font-heading font-bold bg-white focus:outline-none focus:border-teal"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelCls}>Length L (m)</label>
                  <input
                    type="number"
                    value={L}
                    onChange={(e) => setL(e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="Length"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Width W (m)</label>
                  <input
                    type="number"
                    value={W}
                    onChange={(e) => setW(e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="Width"
                    className={inputCls}
                  />
                </div>
              </div>
              <p className="font-mono text-[11px] text-navy/40 mt-2">
                Length × Width (optional) to compute sling length — object height ignored.
              </p>
              {!validLoad && (
                <p className="font-mono text-xs text-amber-600 mt-2">
                  Enter a weight greater than 0 to calculate.
                </p>
              )}
            </div>

            {/* Number of legs */}
            <div className="bg-white rounded-xl border border-slate-border p-5">
              <label className="block font-mono text-xs text-navy/50 uppercase tracking-wide mb-3">
                Number of legs
              </label>
              <div className="grid grid-cols-4 gap-2">
                {([1, 2, 3, 4] as NumLegs[]).map((n) => (
                  <button
                    key={n}
                    onClick={() => setSoChan(n)}
                    className={`py-3 rounded-lg font-heading font-bold text-sm transition-all ${
                      soChan === n
                        ? "bg-navy text-white shadow-md scale-105"
                        : "bg-slate-light border border-slate-border text-navy hover:border-teal/40"
                    }`}
                  >
                    {n}-leg
                  </button>
                ))}
              </div>
              <p className="font-mono text-xs text-navy/40 mt-3">
                Leg factor k = {legFactor(soChan)} {soChan >= 3 && "(3 & 4 legs both ×3 — allows for unequal load)"}
              </p>
            </div>

            {/* Angle */}
            <div className="bg-white rounded-xl border border-slate-border p-5">
              <div className="flex justify-between items-center mb-3">
                <label className="font-mono text-xs text-navy/50 uppercase tracking-wide">
                  Sling angle β (from vertical)
                </label>
                <span className="font-heading font-extrabold text-2xl" style={{ color: ss.color }}>
                  {beta}°
                </span>
              </div>
              <div className="flex gap-2 flex-wrap mb-3">
                {BETA_PRESETS.map((a) => (
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
              <div className="flex items-center gap-3 mt-1">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold"
                  style={{ background: ss.bg, color: ss.color, border: `1px solid ${ss.border}` }}
                >
                  {ss.label}
                </span>
                <span className="font-mono text-xs text-navy/50">cos({beta}°) = {cosVal.toFixed(3)}</span>
              </div>
              {beta > BETA_CAUTION_DEG && (
                <p className="font-mono text-xs text-amber-600 mt-2">
                  ⚠ 60°: load drops sharply — reconsider the configuration.
                </p>
              )}
            </div>

            {/* Standard + construction */}
            <div className="bg-white rounded-xl border border-slate-border p-5 space-y-4">
              <div>
                <label className={labelCls}>Standard</label>
                <select
                  value={standard}
                  onChange={(e) => onStandardChange(e.target.value as Standard)}
                  className={inputCls}
                >
                  <option value="DNV">DNV-ST-E271 (offshore container)</option>
                  <option value="grade1960">Grade 1960 (general lifting)</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Construction / rope grade</label>
                <select
                  value={construction}
                  onChange={(e) => setConstruction(e.target.value)}
                  className={inputCls}
                >
                  {constructions.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              {standard === "DNV" && (
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={offshore}
                    onChange={(e) => setOffshore(e.target.checked)}
                    className="w-4 h-4 accent-teal"
                  />
                  <span className="font-mono text-xs text-navy/70">
                    Offshore container — sling WLL ≥ WLL_min (Table 8-1, 7t floor)
                  </span>
                </label>
              )}
            </div>

          </div>

          {/* ── Right: Diagram + Result ── */}
          <div className="lg:col-span-3 space-y-5">
            {/* Diagram */}
            <div className="bg-white rounded-xl border border-slate-border p-6">
              <div className="font-mono text-xs text-navy/40 uppercase tracking-wide mb-4 text-center">
                Sling diagram — {soChan}-leg · β = {beta}°
              </div>
              <SlingDiagram legs={soChan} beta={beta} safety={safety} />
            </div>

            {/* Result */}
            {!validLoad ? (
              <div className="rounded-xl p-6 border-2 border-slate-border bg-white text-navy/50 font-mono text-sm">
                Enter a weight to get a recommended sling set.
              </div>
            ) : cap && !cap.ok ? (
              <div className="rounded-xl p-6 border-2 border-red-300 bg-red-50">
                <div className="font-heading font-bold text-red-700 mb-1">No suitable sling found</div>
                <p className="font-mono text-sm text-red-700/80">{cap.error}</p>
                <p className="font-mono text-xs text-red-700/60 mt-2">
                  Required SWL per leg = {cap.swlCan_t} t
                </p>
              </div>
            ) : cap && cap.ok ? (
              <div className="rounded-xl p-6 border-2" style={{ background: ss.bg, borderColor: ss.border }}>
                <div className="font-mono text-xs uppercase tracking-wide mb-2" style={{ color: ss.color }}>
                  Recommended sling · {soChan}-leg · β = {beta}°
                </div>

                {/* Headline: diameter */}
                <div className="flex items-end gap-3 mb-1">
                  <div className="font-heading font-extrabold text-6xl" style={{ color: ss.color }}>
                    Ø{cap.duongKinh_mm}
                    <span className="text-2xl font-normal text-navy/50 ml-1">mm</span>
                  </div>
                </div>
                <div className="text-navy/50 font-mono text-sm mb-4">
                  {constructions.find((c) => c.id === construction)?.label}
                </div>

                {/* Spec grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Stat label="SWL per leg" value={`${cap.swl1Soi_t} t`} />
                  <Stat label="System WLL" value={`${cap.wllHeThong_t} t`} highlight={ss.color} />
                  <Stat label="Tension per leg" value={`${cap.lucCang1Chan_t} t`} />
                  {cap.enhanced && cap.wllMin_t != null ? (
                    <Stat label="WLL_min (Table 8-1)" value={`${cap.wllMin_t} t`} />
                  ) : (
                    <Stat label="Legs" value={`${soChan}`} />
                  )}
                  {cap.enhanced && cap.wllMin_t != null && (
                    <Stat label="Legs" value={`${soChan}`} />
                  )}
                </div>

                {/* Length block */}
                {length ? (
                  <div className="bg-white/70 rounded-lg p-4 font-mono text-sm text-navy/70 space-y-1">
                    <div className="text-navy/40 text-xs uppercase tracking-wide mb-1">Sling length (load {num(L)}×{num(W)} m · β = {beta}°)</div>
                    <div>Half plan diagonal r = {length.r_m} m</div>
                    <div>Length per leg = r / sin({beta}°) = {length.chieuDai1Chan_m} m</div>
                    <div className="text-navy font-bold">
                      Fabrication length (+{eyeAdd}m · 2 hard eyes Ø{dia}) = <span style={{ color: ss.color }}>{length.chieuDaiCheTao_m} m</span> × {soChan} legs
                    </div>
                  </div>
                ) : beta <= 0 && hasDims ? (
                  <div className="bg-white/70 rounded-lg p-3 font-mono text-xs text-amber-600">
                    0° (vertical sling) — length not applicable; pick 30/45/60°.
                  </div>
                ) : (
                  <div className="bg-white/70 rounded-lg p-3 font-mono text-xs text-navy/40">
                    Enter Length × Width on the left to compute fabrication length.
                  </div>
                )}

                {/* Notes */}
                <div className="mt-4 space-y-1 font-mono text-xs text-navy/50">
                  <div>• Safety factor 5:1 (SWL = MBL/5) — already applied in the table.</div>
                  <div>
                    • {cap.enhanced
                      ? `DNV 2.7-1 offshore · sling WLL ≥ WLL_min = ${cap.wllMin_t} t (Table 8-1, Rating ${tai_t}t)`
                      : "General lifting · sling WLL ≥ load"} · β = {beta}°.
                  </div>
                  <div className="text-navy/40 pt-1">
                    Quotation aid — does not replace approval by a lifting engineer.
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: string }) {
  return (
    <div className="bg-white/70 rounded-lg px-4 py-3">
      <div className="font-mono text-[10px] text-navy/40 uppercase tracking-wide mb-0.5">{label}</div>
      <div className="font-heading font-bold text-xl" style={highlight ? { color: highlight } : { color: "#06182F" }}>
        {value}
      </div>
    </div>
  );
}

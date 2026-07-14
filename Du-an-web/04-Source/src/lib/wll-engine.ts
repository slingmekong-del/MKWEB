// WLL / sling-set engine — pure functions driven by wll-config.json.
// Formulas per SPEC_Tinh_chieu_dai_cap_WLL_tool.md (§1.4 chọn cáp, §2 chiều dài).
// β = góc mỗi chân so với PHƯƠNG THẲNG ĐỨNG (vertical), độ.

import config from "@/data/wll-config.json";

export type Standard = "DNV" | "grade1960";
export type NumLegs = 1 | 2 | 3 | 4;

export const OFFSHORE_MIN_WLL_T = 7.0; // DNV 2.7-1 Table 8-1: sàn WLL của CẢ BỘ CÁP (hệ thống)
export const BETA_MAX_DEG = 60; // > 60° không cho phép
export const BETA_CAUTION_DEG = 45; // 45–60° cảnh báo
export const ALLOWANCE_M = config.config.cap_allowance_m; // dư chế tạo (0.3 m)

// ── DNV Table 8-1 — WLL_min theo Rating (kg) ─────────────────────────────────
const T81 = config.dnv_table_8_1;

// WLL_min (t) của cả bộ cáp theo Rating (t). Nội suy tuyến tính; sàn 7t;
// Rating > 25t dùng hệ số dòng 25t (1.104).
export function wllMinDNV(rating_t: number): number {
  const kg = rating_t * 1000;
  const R = T81.rating_kg;
  const V = T81.wll_min_t;
  let wll: number;
  if (kg <= R[0]) {
    wll = V[0];
  } else if (kg >= R[R.length - 1]) {
    wll = rating_t * T81.above_25t_factor; // ngoài bảng: hệ số 25t
  } else {
    let i = 1;
    while (i < R.length && R[i] < kg) i++;
    const t = (kg - R[i - 1]) / (R[i] - R[i - 1]);
    wll = V[i - 1] + t * (V[i] - V[i - 1]); // nội suy tuyến tính
  }
  return +Math.max(OFFSHORE_MIN_WLL_T, wll).toFixed(2);
}

// ── Cộng thêm chiều dài cho 2 mắt cứng theo Ø cáp ────────────────────────────
// Mr Bắc (2026-07-03): dùng công thức Ø × 38 (mm) — nhanh gọn, tương đối chuẩn.
// Trả về m/sợi (đã gồm 2 mắt cứng). Áp dụng cho mọi đường kính, không cần bảng.
const HARD_EYE_FACTOR = config.config.hard_eye_factor_x_D;

export function hardEyeAllowance(diameter_mm: number): number {
  return +((diameter_mm * HARD_EYE_FACTOR) / 1000).toFixed(2);
}

// ── Bảng tra từ config ───────────────────────────────────────────────────────
const DNV = config.table_DNV;
const G1960 = config.table_grade1960_local;

type ConstructionOption = { id: string; label: string };

const DNV_CONSTRUCTIONS: ConstructionOption[] = [
  { id: "E-5_steel_1960", label: "E-5 · Steel core · 1960" },
  { id: "E-4_fibre_1960", label: "E-4 · Fibre core · 1960" },
  { id: "E-3_steel_1770", label: "E-3 · Steel core · 1770" },
  { id: "E-2_fibre_1770", label: "E-2 · Fibre core · 1770" },
];

// Mr Quy (2026-07-14): the Grade 1960 table offers only these two constructions.
// The old "6x36 Compacted" entry was dropped — its numbers were the catalogue's
// last column (lower than plain FC), so the "compacted" label was wrong, and
// compacted rope is not to be quoted from this tool. 6×36 IWRC stays the default.
const G1960_CONSTRUCTIONS: ConstructionOption[] = [
  { id: "6x36_IWRC", label: "6×36 · IWRC (steel core)" },
  { id: "6x36_FC", label: "6×36 · FC (fibre core)" },
];

export function getConstructions(standard: Standard): ConstructionOption[] {
  return standard === "DNV" ? DNV_CONSTRUCTIONS : G1960_CONSTRUCTIONS;
}

// Bảng SWL 1 sợi (t) theo Ø cho chuẩn + cấu trúc đã chọn.
function getTable(standard: Standard, construction: string): { D: number[]; S: number[] } {
  if (standard === "DNV") {
    const S = (DNV.single_leg_WLL_t as Record<string, number[]>)[construction];
    return { D: DNV.diameter_mm, S: S ?? [] };
  }
  const S = (G1960.swl_single_leg_t as Record<string, number[]>)[construction];
  return { D: G1960.diameter_mm, S: S ?? [] };
}

// ── Hệ số chân k ─────────────────────────────────────────────────────────────
export function legFactor(soChan: NumLegs): number {
  return soChan === 2 ? 2 : soChan >= 3 ? 3 : 1;
}

// ── E1 — Chọn đường kính cáp ─────────────────────────────────────────────────
export type ChonCapInput = {
  tai_t: number;
  soChan: NumLegs;
  betaDeg: number;
  standard: Standard;
  construction: string;
  offshore: boolean;
};

export type ChonCapResult =
  | {
      ok: true;
      duongKinh_mm: number;
      swl1Soi_t: number;
      wllHeThong_t: number;
      swlCan_t: number; // SWL 1 sợi tối thiểu cần (dẫn tới việc chọn cáp)
      lucCang1Chan_t: number; // lực căng thực 1 chân = tải/(k·cosβ)
      wllYeuCau_t: number; // WLL bộ cáp tối thiểu phải đạt (= WLL_min offshore, hoặc = tải)
      wllMin_t: number | null; // WLL_min theo Table 8-1 (null khi không offshore)
      enhanced: boolean; // có áp Table 8-1 hay không
    }
  | { ok: false; error: string; swlCan_t: number };

export function chonCap({
  tai_t,
  soChan,
  betaDeg,
  standard,
  construction,
  offshore,
}: ChonCapInput): ChonCapResult {
  const k = legFactor(soChan);
  const cosB = Math.cos((betaDeg * Math.PI) / 180);
  const applyOffshore = offshore && standard === "DNV";

  // Offshore: WLL bộ cáp phải ≥ WLL_min (Table 8-1). Ngược lại chỉ cần ≥ tải.
  const wllMin = applyOffshore ? wllMinDNV(tai_t) : null;
  const wllYeuCau = wllMin ?? tai_t;

  const lucCang1Chan = tai_t / (k * cosB); // lực căng thực từ tải
  const swlCan = wllYeuCau / (k * cosB); // SWL 1 sợi tối thiểu để đạt WLL yêu cầu
  const swlCan_t = +swlCan.toFixed(2);

  const { D, S } = getTable(standard, construction);

  for (let i = 0; i < D.length; i++) {
    const s = S[i];
    if (s == null) continue;
    if (s >= swlCan) {
      return {
        ok: true,
        duongKinh_mm: D[i],
        swl1Soi_t: s,
        wllHeThong_t: +(s * k * cosB).toFixed(2),
        swlCan_t,
        lucCang1Chan_t: +lucCang1Chan.toFixed(2),
        wllYeuCau_t: +wllYeuCau.toFixed(2),
        wllMin_t: wllMin,
        enhanced: applyOffshore,
      };
    }
  }

  return {
    ok: false,
    error:
      "Vượt dải đường kính của bảng — cần tăng số chân, giảm góc treo hoặc đổi cấu trúc cáp.",
    swlCan_t,
  };
}

// ── E2 — Chiều dài 1 sợi cáp (theo góc, bỏ qua chiều cao vật) ─────────────────
// Coi vật là mặt bằng L×W: nửa đường chéo r; cáp nghiêng góc β so phương ĐỨNG
// → chiều dài 1 chân = r / sin(β). Chỉ dùng cho β > 0.
export type ChieuDaiInput = {
  L: number;
  W: number;
  betaDeg: number;
  allowance?: number;
};

export type ChieuDaiResult = {
  r_m: number;
  chieuDai1Chan_m: number;
  chieuDaiCheTao_m: number;
};

export function chieuDaiCap({
  L,
  W,
  betaDeg,
  allowance = ALLOWANCE_M,
}: ChieuDaiInput): ChieuDaiResult {
  const r = Math.sqrt((L / 2) ** 2 + (W / 2) ** 2);
  const Lleg = r / Math.sin((betaDeg * Math.PI) / 180); // β so với phương ĐỨNG
  return {
    r_m: +r.toFixed(3),
    chieuDai1Chan_m: +Lleg.toFixed(3),
    chieuDaiCheTao_m: +(Lleg + allowance).toFixed(3),
  };
}

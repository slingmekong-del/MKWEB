# CLAUDE.md — Mekongsling.com Project Memory
# Claude Code đọc file này tự động khi khởi động phiên mới.

## 🗂️ Project Overview
- **Tên project:** Mekongsling.com — Website B2B ngành móc cáp/dây cẩu
- **Khách hàng:** United Mekong JSC, Vũng Tàu (Giám đốc: Mr. Bắc)
- **Developer:** Mr. Nam (code) · Hưng (design) · Mr. Bắc (content/domain expert)
- **Mục tiêu:** B2B catalog website giúp kỹ sư/procurement tìm sản phẩm nhanh → gửi RFQ → Sales phản hồi trong 1 ngày
- **Stack:** Next.js 16.2.9 (App Router) · Tailwind CSS v4 · TypeScript · Vercel
- **CMS:** Decap CMS (Git-based) — làm sau khi hoàn thiện frontend
- **Email/RFQ:** Resend (kế hoạch)
- **Domain:** mekongsling.com (đang lấy lại từ Web360)

## 📁 Thư mục quan trọng
```
c:\Mekong\
├── Du-an-web\
│   ├── 01-Plan\          # Tài liệu kế hoạch
│   ├── 02-Data\          # Data sản phẩm JSON
│   ├── 03-Assets\        # 44 ảnh catalog ABLE (.png)
│   ├── 04-Source\        # SOURCE CODE CHÍNH ← làm việc ở đây
│   │   ├── src\app\      # Next.js pages (8 routes)
│   │   ├── src\components\  # Layout, Home, Products, WLL...
│   │   └── public\       # video, logo, images
│   └── 05-Deploy\        # Build outputs
└── Hop-thu-den\          # Tài liệu tham khảo (catalogs, Excel, PDFs)
```

## 📌 Quy tắc bất biến
- Dùng `npm` (không dùng pnpm/yarn)
- Tailwind v4: theme config viết trong `globals.css` với `@theme {}`, KHÔNG dùng `tailwind.config.js`
- Brand colors: Navy `#06182F` · Teal `#19D3C5` · Teal Dark `#0FA697`
- Fonts: `font-heading` = Archivo · `font-mono` = IBM Plex Mono · `font-sans` = Inter
- Commit nhỏ sau mỗi sprint/task hoàn thành
- File tham khảo tất cả đặt trong `Hop-thu-den\`

## 🏗️ Kiến trúc
```
src/app/
├── page.tsx              # Home (Hero, Stats, About, Products, Services)
├── about/page.tsx
├── products/
│   ├── page.tsx          # Listing + filter + search
│   └── [slug]/page.tsx   # Product detail (Sprint 4-5)
├── services/page.tsx
├── projects/page.tsx
├── contact/page.tsx
└── wll-tool/page.tsx     # WLL multi-leg calculator

src/components/
├── layout/               # Header, Footer
├── home/                 # HeroSection, StatsStrip, AboutTeaser, ProductsTeaser, ServicesTeaser
├── products/             # ProductCard, FilterSidebar, SearchBar, RFQCart (Sprint 4-5)
├── wll/                  # WLLCalculator (Sprint 7)
└── ui/                   # Shared UI components
```

## ✅ Tiến độ

### Đã hoàn thành
- [x] Sprint 1 — Next.js 16 + Tailwind v4 setup, Header, Footer, 8 skeleton pages
- [x] Sprint 2 — Home page: Hero (video), StatsStrip, AboutTeaser, ProductsTeaser, ServicesTeaser
- [x] Logo image vào Header (public/logo-mekong.jpg)
- [x] Headline: "From Vũng Tàu / to the world's oceans"
- [x] Sprint 4 — Products listing page: filter sidebar, search, product cards, RFQ (JSON tĩnh)
- [x] Sprint 5 — Product detail page (`/products/[slug]`) + RFQ cart (localStorage)
- [x] Sprint 6 — About, Services, Projects, Contact pages
- [x] Sprint 7 — WLL Calculator (`WLLCalculator.tsx` + `wll-tool/page.tsx`)
- [x] Commit Sprint 5 (962015d) + Sprint 6 (dfa6415) + Sprint 7 (c203ced) + Chore docs/assets (f35d10e)

### Đang làm / Tiếp theo
- [x] Trang sản phẩm: gallery 1-4 ảnh + mục "Catalogue detail" (ảnh render từ PDF), bỏ nút tải PDF
- [x] WLL tool 2 tab: thêm luồng "nhập vật nặng → ra bộ cáp" (E1 chọn cáp + E2 chiều dài)
- [x] WLL tool: chiều dài theo góc r/sin(β) (bỏ chiều cao); offshore theo DNV Table 8-1 (WLL bộ cáp ≥ WLL_min); input Dài×Rộng+tấn, góc chỉ 0/30/45/60
- [x] Products detail: Catalogue sát dưới ảnh, Description+Specs sang cột phải, bỏ khối liên lạc
- [x] WLL tool: mắt cáp = Ø×38 (Mr Bắc chốt); dịch toàn bộ UI sang tiếng Anh
- [x] Toàn site tiếng Anh: "Vũng Tàu"→"Vung Tau" + chống ngắt dòng heading
- [x] Tìm kiếm sản phẩm song ngữ Việt/Anh + bỏ dấu (synonym VN cho 51 SKU, ranking mới)
- [x] Pipeline data sản phẩm: field `specs` (label/value) + khối Specifications ở trang detail; crop ảnh gallery từ trang catalog bằng `sharp`; checklist đặt tên file 51 SKU
- [x] Build 4 SKU đầu đủ catalog+ảnh+Desc+Specs → live (#1 Bow Shackle, #8 Webbing, #12 Powerform rope, #40 ECHK)
- [ ] Build tiếp Desc+ảnh crop+Specs cho 47 SKU còn lại — khi Mr Bắc gửi trang catalog (bỏ vào `03-Assets\images`, tên theo checklist)
- [ ] WLL tool — E3 phụ kiện (master link/shackle/mắt cáp), link chia sẻ URL, xuất PDF báo giá (để sau)
- [x] SEO — metadata per-page + canonical, sitemap.xml (58 URL), robots.txt, OpenGraph image (`next/og`), JSON-LD (Organization/WebSite/Product/Breadcrumb)
- [x] Dọn repo — gộp lịch sử thành 1 commit snapshot, tách `03-Assets\images` ra local-only (.gitignore), `.git` 174MB→103MB
- [ ] Sprint 8 — Launch (domain + deploy Vercel) + submit sitemap vào Google Search Console
- [x] Backend Phase 1 — Decap CMS quản trị **Products** (thêm/sửa/xóa/ẩn, category, ảnh) + GitHub OAuth trên Vercel · ĐÃ SETUP & CHẠY THẬT tại `/admin`
- [ ] Backend Phase 2 — đưa nội dung Home/About/Services/Projects/Contact + settings (liên hệ/nav/footer) vào CMS
- [ ] Backend — Resend cho RFQ form (hiện dùng `mailto:`)

## 🔄 Session Handoff
<!-- Claude cập nhật phần này cuối mỗi phiên -->
**Phiên cuối:** 2026-07-04
**Trạng thái build sản phẩm: 37/51 SKU live** (14 coming). Pipeline & phân công không đổi: Mr Nam tách trang catalog (PNG → `03-Assets\images`, tên = slug/`id`); Claude lo Description + ảnh gallery (crop bằng `sharp`) + Specs. Hạ tầng có sẵn field `specs?:{label,value}[]` + khối Specifications ở `[slug]/page.tsx`.
**⚠️ Lịch sử Git đã bị GỘP (04/07):** toàn bộ commit batch cũ (`673b826 → 0c65823`) đã gộp thành **1 commit snapshot** `77cb895` để dọn repo → **các mã commit cũ dưới đây KHÔNG còn tồn tại** (chỉ ghi lại nội dung đã build). Backup bundle lịch sử cũ: `scratchpad\mekong-backup-20260704-*.bundle` (còn tới hết phiên). Commit hiện tại: `77cb895` (snapshot) → `396b816` (SEO) → `9983877` (JSON-LD) → `910d6a7` (handoff) → `ee74830` (Backend Phase 1 CMS) → `4e4bb34` (fix config path CMS).
**Đã build (37 SKU live — nội dung, mã commit cũ đã gộp):**
- Batch 1–5: Batch 1 (4 Master Link Green Pin #27–30) · Batch 2 (5 fitting Green Pin #22,32,33,35,36) · Batch 3 (#2 Bow Shackle BN + 3 Clamp ABLE #44,45,46) · Batch 4 (4 Hoist & Trolley ABLE #37,38,39,41) · Batch 5 (#13 Cargo Lashing Straps · #16&#43 Wire Rope Puller · #18 Binder Chain). Cùng 4 SKU đầu (#1,8,12,40).
- Batch 6 — cụm **Steel Wire Rope**: **#10** Independent Core (Hyflex 6×36 IWRC, ISO 4309) · **#11** Fiber Core (round strand 6×19F/6×21F/6×29F). Ảnh SP = crop rope cross-section.
- Batch 7 — **#21** Drum Lifter (DLVC/LTVC/VDL, p48+p49) · **#23** PP Rope (8-strand + PP Multi, ISO 2307/OCIMF MEG4, p32+p33) · **#31** Sling/Safety/Self-Locking Hook (ABLE HSE/HSC/HSA/HES + GP Sling Hook EN1677-2, p80/81/83/157) · **#47** Full-Body Harness ULMP02 (EN361/ANSI Z359, p36+p37).
- Batch 8 — **#14** Ratchet/Lever Load Binder FRB+FLB (p57, WSTDA T6) · **#19** Hoisting/Sling Chain G80 AW-80+CF-80 (p67, EN818-7/EN818-2) · **#42** Brake Hand Winch BHW (p59, EN13157). Kèm refresh catalog #18 (p68 BC70/TDC), #16/#43 (p55 WRP+p56 RWP+p54), #32 (thêm ABLE WRC p76). ⚠️ file `wire-rope-clip-...-7.png` (p77)=Mushroom Clutch+Weld-on Hook, KHÔNG phải WRC → đã BỎ.
- **SEO (phiên 04/07, `396b816`+`9983877`):** `app/sitemap.ts` (7 tĩnh + 51 SP) · `app/robots.ts` · `app/opengraph-image.tsx` (brand navy/teal 1200×630) · `layout.tsx` metadataBase+OG+twitter+Organization/WebSite JSON-LD · Home/Products metadata+canonical · `[slug]` canonical/OG ghi đè đúng slug + Product/BreadcrumbList JSON-LD · `lib/site.ts` (`SITE_URL`, env `NEXT_PUBLIC_SITE_URL` fallback mekongsling.com) · `lib/jsonld.ts` · `components/seo/JsonLd.tsx`. Đã verify build + curl (canonical đúng từng trang, JSON-LD parse hợp lệ, không rò rỉ).
- **Dọn repo (04/07, `77cb895`):** `03-Assets\images` (87 ảnh, 139MB) tách khỏi Git → **giữ local**, thêm `Du-an-web/03-Assets/images/` vào root `.gitignore`. `.git` 174MB→103MB (phần còn lại là ảnh `public/` phải giữ vì web dùng thật).
- **Backend Phase 1 — Decap CMS (04/07, `ee74830`+`4e4bb34`) — ĐÃ CHẠY THẬT:**
  - **Admin:** `https://mkweb-alpha.vercel.app/admin` — login GitHub, quản trị **Products** (thêm/sửa/xóa, toggle `hidden` ẩn hẳn khỏi web, chọn category, upload ảnh đại diện/gallery/catalog) + **Cài đặt → Danh mục** (đổi tên/thứ tự/`visible`). Publish → commit `main` → Vercel deploy.
  - **Auth:** OAuth proxy tự viết `src/app/api/auth` + `api/callback` (đọc env `GITHUB_OAUTH_CLIENT_ID`/`GITHUB_OAUTH_CLIENT_SECRET` đã set trên Vercel). GitHub OAuth App "Mekong Sling CMS" (id `Ov23li…`), callback `…/api/callback`. Admin cần là **collaborator repo**.
  - **Data refactor:** nguồn thật nay là **`content/products/*.json`** (51 file, 1 SP/1 file) + **`content/categories.json`**. `scripts/build-content.mjs` gộp → `src/data/products.json` (chạy tự động qua `predev`/`prebuild`, tự suy `categoryLabel` từ `categoryId`); **bundle này .gitignore** — ĐỪNG sửa tay. `lib/products.ts` thêm field `hidden` + `VISIBLE_PRODUCTS`/`VISIBLE_CATEGORIES` lọc ở search/filter/group/teaser/sitemap/[slug].
  - **config.yml:** mọi path tính từ **gốc repo** (`Du-an-web/04-Source/…`); `index.html` load Decap CDN + `<link rel="cms-config-url" href="/admin/config.yml">` (đường tuyệt đối, fix lỗi 404 config). `next.config` rewrite `/admin`. Đổi `base_url` khi có domain thật.
  - **Test local CMS:** `npx decap-server` chạy **từ gốc `c:\Mekong`** + `npm run dev` → `localhost:3000/admin` (`local_backend: true`).
**⚠️ Cảnh báo dữ liệu ảnh (87 file trong `03-Assets\images` — nay LOCAL-ONLY, đã .gitignore, KHÔNG còn trên Git):** file đặt theo **trang section** catalog, KHÔNG phải 1-file-1-SKU, và nhiều file **sai tên vs nội dung** (số trang xlsx lệch bản catalog nén ở khu p55–76) → PHẢI tự Read ảnh xác minh trước khi build, đừng tin tên file. Mr Bắc đã OCR 44 trang + sửa 4 file (04/07): `ratchet-lever-load-binder-frb-flb`=p57 FRB/FLB ✓ · `binder-chain-grade-70-80-lashing`=p68 BC70/TDC ✓ · `hoisting-sling-chain-grade-80-aw-80-cf-80`=p67 AW-80/CF-80 ✓ · `brake-hand-winch-bhw`=p59 BHW ✓. (Bẫy cũ đã xử lý: `lashing-chain-long-link-chain-lashing.png`=Binder Chain p68; `...-rwp-43.png`=trùng puller.)
**Dev server:** `cd Du-an-web\04-Source && npm run dev` → http://localhost:3000
**Production (Vercel):** https://mkweb-alpha.vercel.app — project `mkweb`, org MekongSling (Hobby), repo `slingmekong-del/MKWEB`, auto-deploy khi push `main`. Root Directory = `Du-an-web/04-Source`.
**File chưa commit:** (không còn — đã push tới `4e4bb34`). Script crop tạm ở scratchpad phiên (require sharp bằng path tuyệt đối `C:/Mekong/Du-an-web/04-Source/node_modules/sharp`, path Windows forward-slash).
**⚠️ Cách build 1 SKU mới (ĐÃ ĐỔI sau CMS):** nguồn data nay là **`content/products/<id>.json`** (KHÔNG sửa `src/data/products.json` — nó tự sinh, đã .gitignore). Read ảnh nguồn xác minh → copy trang đúng → `public/catalogs/` + crop ảnh SP → `public/products/` (sharp); mở/tạo `content/products/<id>.json`, viết Desc + Specs (khuôn #40/#16), set `image`/`images`/`catalogImages`, `status: coming→live`, `hidden:false`, `wText/wmin/wmax`; `npm run build` (tự chạy `prebuild` gộp bundle) rồi commit/push. HOẶC làm thẳng qua CMS `/admin` (upload ảnh + điền form).
**Bước tiếp theo:** SEO + **Backend Phase 1 (CMS Products) đã XONG & chạy thật**. Lựa chọn tiếp: **Backend Phase 2** (nội dung các trang vào CMS) · **Sprint 8 — Launch** domain · Resend cho RFQ. Chi tiết Launch: **Sprint 8**: (1) lấy/trỏ domain `mekongsling.com`; (2) khi domain live, submit `sitemap.xml` vào Google Search Console + test [Rich Results](https://search.google.com/test/rich-results); (3) nếu muốn OG preview chạy TRƯỚC khi domain về → set env `NEXT_PUBLIC_SITE_URL=https://mkweb-alpha.vercel.app` trên Vercel (xóa khi có domain thật). Việc còn chờ Mr Bắc: **14 SKU coming BỊ CHẶN** — (a) **#17** Lashing Chain (Long Link) chờ xác nhận dùng p68 TDC hay catalog khác; (b) KHÔNG có ảnh/nguồn — #5,6,7 Wire Rope Sling · #15/#34 Turnbuckle · #20 Chain G100 · #24,25,26 Nylon/Manila/Superflex Rope · #48,49,50 Nets · #51 Load Test service. Nâng cấp sau: RFQ form dùng Resend (nay `mailto:`).
**Chờ từ Mr. Bắc:** Xác nhận **#17 Lashing Chain (long-link)** — catalog ABLE không có trang riêng, dùng tạm p68 (BC70+TDC) hay gửi catalog khác? · Ảnh/nguồn cho #5,6,7,15,20,24,25,26,34,48,49,50 (Mr Bắc nói #48–49 có thể tải từ web MK cũ) · Data 20 SKU bestsellers · Ảnh dự án thực tế cho Projects gallery
**Nguồn WLL tool:** `Cataloge\SPEC_Tinh_chieu_dai_cap_WLL_tool.md` + `Cataloge\wll_length_calc_config.json`

## ⚠️ Cạm bẫy đã biết
- `create-next-app` không nhận tên thư mục có chữ hoa (04-Source) → tạo ở nơi khác rồi move
- Tailwind v4 KHÔNG có `tailwind.config.js` — mọi customization qua `@theme {}` trong CSS
- Next.js 16 có breaking changes — đọc `node_modules/next/dist/docs/` trước khi code patterns mới
- Dev server: dùng `Start-Process cmd.exe` (PowerShell), không dùng `&` background

## 🔗 Tài liệu tham khảo nhanh
- Prototype đầy đủ: `Hop-thu-den\MekongSling 2026 (offline).html`
- UX spec trang sản phẩm: `Hop-thu-den\Mekong-Sling-UX-Trang-San-pham.docx`
- Data ABLE: `Hop-thu-den\ABLE Product List.xlsx`
- Data Green Pin: `Hop-thu-den\Green Pin - Danh muc san pham.xlsx`
- Contact: sales@mekongsling.com · +84 254 351 2238 · Vũng Tàu

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
- **Domain:** **mekongsling.com — ĐÃ LIVE** (14/07). Registrar + DNS: **PA Vietnam** (`ns1/ns2.pavietnam.vn`, KHÔNG còn Cloudflare). Apex A → `76.76.21.21` (Vercel), apex 308→`www`. **Email chạy riêng qua Viettel IDC** (MX `mx.viettelidc.com.vn`) — sửa DNS phải tránh đụng MX/SPF gốc.

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
- [x] Sprint 8 — Launch: **domain `mekongsling.com` ĐÃ LIVE** trên Vercel (14/07). Còn lại: submit sitemap vào Google Search Console
- [x] Backend Phase 1 — Decap CMS quản trị **Products** (thêm/sửa/xóa/ẩn, category, ảnh) + GitHub OAuth trên Vercel · ĐÃ SETUP & CHẠY THẬT tại `/admin`
- [x] Backend Phase 2 — đưa nội dung Home/About/Services/Projects/Contact + settings (liên hệ/nav/footer) vào CMS · full scope, contact info gộp 1 nguồn
- [x] Backend — Resend cho RFQ form — **ĐÃ CHẠY THẬT (14/07)**: `/api/rfq` gửi email về `sales@mekongsling.com` (from `rfq@mekongsling.com`) + auto-reply cho khách + ghi Google Sheet. Domain Resend **Verified** (region Tokyo `ap-northeast-1`). Đã test end-to-end trên `www.mekongsling.com` → 200, email tới, dòng vào Sheet. (`RESEND_AUDIENCE_ID` chưa set — tùy chọn.)

## 🔄 Session Handoff
<!-- Claude cập nhật phần này cuối mỗi phiên -->
**Phiên cuối:** 2026-07-17
**Trạng thái build sản phẩm: 39/54 SKU live** (15 coming). Mr Bắc đang tự bật Featured + thêm brand (`ABLE / DRAGON`) + sửa SP qua CMS liên tục.

**🆕 Việc phiên 14–17/07 — WEBSITE LAUNCH HOÀN TẤT (đã commit & push):**
- **🚀 Domain `mekongsling.com` LIVE trên Vercel.** Nameserver chuyển Cloudflare → **PA Vietnam** (`ns1/ns2.pavietnam.vn`); apex A → `76.76.21.21`. **17/07 đảo primary: apex = chính, `www` 308 → apex** (trước đó ngược lại — sitemap/canonical toàn dùng apex nên phải đảo để khỏi dính "Page with redirect" hàng loạt). Email Viettel giữ nguyên qua đợt chuyển (MX/SPF/mail/webmail OK; ⚠️ riêng `dkim._domainkey` BỊ MẤT khi chuyển NS — đã báo Mr Nam hỏi Viettel, chưa xử lý).
- **📧 RFQ Resend + Google Sheet CHẠY THẬT** (`35b40e8`): Resend domain Verified (Tokyo `ap-northeast-1`, 3 record trên `send.` + `resend._domainkey` tại PA Vietnam — KHÔNG đụng SPF gốc). 4 env set trên Vercel. Test end-to-end OK: email → `sales@mekongsling.com`, auto-reply → khách, dòng → Sheet `Mekong Sling — RFQ Leads` (Drive `slingmekong@gmail.com`, tab `RFQ`, Apps Script webhook). Đã soạn hướng dẫn sử dụng cho Ms. Thủy. Bẫy đã gặp: env nhập 2 biến chung 1 form Vercel → biến 2 rơi mất; Apps Script lỗi trả HTTP 200 + trang HTML, thành công trả 302 → echo URL.
- **🔍 Google Search Console XONG:** property kiểu **Domain** `mekongsling.com` (account `slingmekong@gmail.com`), verify bằng TXT `google-site-verification=3peb...` tại PA Vietnam, **đã submit `sitemap.xml` (64 URL)**. SEO live đã kiểm: title/description/canonical ✓, 4 khối JSON-LD trang chủ + Product schema trang SP ✓, OG image 200 ✓. → **Sprint 8 ĐÓNG HOÀN TOÀN.**
- **WLL tool — vòng chỉnh theo Mr Bắc/Mr Quý** (`50df879`→`9dfd6e0`): (1) 1 chân KHÔNG áp DNV offshore container (Table 8-1 ép cáp to dư: 12t ra Ø40 thay vì Ø32) → ép dùng bảng **Grade 1960**, select Standard khóa+mờ khi 1 chân, fallback construction chống bảng rỗng; (2) gỡ hẳn cấu trúc **"6x36 Compacted"** (nhãn sai — số là cột "6×36 Rope Sling", thấp hơn FC; Mr Quý chốt bỏ, không thêm 35×7 WSC, mặc định 6×36 IWRC); (3) bỏ ô **Tension per leg** + thay **WLL_min** bằng **"Proof load maximum - set"** = 2×System WLL, áp mọi số chân. ❓ Treo: chữ `WLL_min` còn ở nhãn checkbox + ghi chú DNV (cố ý giữ để giải thích cáp to) — chờ Mr Quý chốt giữ/bỏ.
- **Trạng thái build sản phẩm:** 39/54 live. Mr Bắc tự vận hành CMS: bật Featured (~9 SP), thêm brand `ABLE / DRAGON` (⚠️ id="Dragon Sling" lệch chuẩn slug nhưng vô hại — code chỉ dùng label), thêm SKU `green-pin-heavy-duty-bow-shackle-fn-p-6016`, sửa banner Products (đổi heading, giữ token `{live}` đúng).
- **Còn treo sau launch:** (a) hỏi Viettel khôi phục `dkim._domainkey` · (b) `RESEND_AUDIENCE_ID` chưa set (tùy chọn) · (c) xóa dòng TEST trong Sheet + email TEST trong hộp `sales@` · (d) share Sheet cho Ms. Thủy · (e) Mr Quý chốt giữ/bỏ chữ WLL_min · (f) theo dõi GSC index sau vài ngày (Coverage/Performance).

**Phiên 10/07 (giữ tham chiếu):** +2 SKU `green-pin-dee-shackle-fn-g-4133` (`no:53`), `thimble-fittings` (`no:54`, coming).
**⚠️ Vị trí data ĐÃ ĐỔI:** thư mục `content/` (products/pages/settings/categories/**brands**) + `public/admin/config.yml` nay nằm dưới **`Du-an-web/04-Source/`** (Vercel Root Directory), KHÔNG còn ở gốc repo. Mọi tham chiếu `content/...` bên dưới hiểu là `Du-an-web/04-Source/content/...`.
**⚠️ CMS chạy song song:** Mr Bắc/Mr Nam Publish qua `/admin` liên tục → luôn `git pull --rebase origin main` **trước khi push**, nếu không sẽ bị reject (đã xảy ra nhiều lần phiên này).

**🆕 Việc phiên 10/07 (đã commit & push, working tree sạch, HEAD = `4a559e7` = `origin/main`):**
- **WLL tool — khóa góc cho cáp đơn** (`00fc51f`) — tab "Size a sling" (`SlingQuoteBuilder.tsx`): chọn **1 chân** nay ép `β=0` + **disable/làm mờ nút 30/45/60** (cáp đơn chỉ nâng thẳng đứng — Mr Bắc). Tab "WLL lookup" đã tự ẩn phần góc khi 1 chân từ trước, không đụng.
- **About — lightbox chứng chỉ** (`661cf1c`) — client component mới `components/pages/CertificateGallery.tsx`: click ảnh → phóng to fade+scale, đóng Esc/nút/nền, chuyển ảnh ←/→, khóa scroll nền, bộ đếm. ⚠️ **Bẫy Next 16:** `quality` ngoài danh sách cho phép → `/_next/image` trả **400 (vỡ ảnh)**. Phải khai `images.qualities:[75,92]` trong `next.config.ts` mới dùng được `quality={92}`. (Chỉ lộ khi chạy thật, typecheck/build không bắt.)
- **About — Certificates 3 trên/3 dưới** (`82da8a5`) — grid tối đa 3 cột + `max-w-4xl mx-auto` (bỏ `lg:grid-cols-4`).
- **Search VN — bảng tên Mr Bắc** (`67d85f4`+`f535994`) — đối chiếu toàn bảng: **hầu hết đã có sẵn** từ `5569c86`. Chỉ thiếu từ đơn **"palang"** → thêm cho Chain block. **Thimble** không có SKU → tạo mới `thimble-fittings` (coming, nhóm fittings, syn: `thimble/wire rope thimble/ben lot cap/khoen lot cap/khuyet cap/lot cap`).
- **Nút "Search Products"** (`7fc52dd`+`2ebb38e`) — đổi nhãn `Browse Products → Search Products` (home/about/projects CTA); **thêm nút Search Products vào Header** (desktop+mobile, cạnh Request a Quote → luôn hiện mọi trang, nhãn từ `site.headerCtas.productsLabel`); **bỏ 2 nút CTA giữa hero Home** (`HeroSection.tsx`, đã gỡ import `Link` thừa). Field `hero.ctaPrimary/ctaSecondary` trong `home.json` nay **không còn render** (vẫn còn trong data/CMS — cẩn thận gây hiểu lầm).
- **CMS: banner trang Products** (`190a1ae`) — trước hardcode, admin không sửa được. Nay có `content/pages/products.json` + collection **Trang → Sản phẩm (Products)** (eyebrow/heading/subhead/searchPlaceholder/meta). **Subhead dùng token `{live}` và `{total}`** → thay bằng số live & tổng SP lúc render (hết lệch số đếm). `SearchBar` nhận prop `placeholder`. Metadata `/products` lấy từ `products.json` qua `layout.tsx`.
- **CMS: quản lý Thương hiệu tập trung** (`a651b46`) — thêm `content/brands.json` + collection **Cài đặt → Thương hiệu** (add/sửa/xóa/sắp xếp). Field brand của SP đổi **string tự do → `relation`** (chọn từ danh sách, **lưu label**, `value_field: brands.*.label`) → hết typo. Seed 3 brand: `ABLE`, `Green Pin`, `Green Pin / ABLE` (mọi SKU khớp, không cần migrate; bộ lọc vẫn tự sinh từ `p.brand`).
- **Featured + hồi sinh `rank`** (`4a559e7`) — **PHÁT HIỆN: field `rank` của sản phẩm trước đây CHẾT hoàn toàn** (chỉ là bản sao rank của danh mục; mọi sắp xếp đều theo `no`) → chỉnh rank trong CMS vô tác dụng. Nay:
  - `rank` chạy thật: `groupByCategory` sort `byRankThenNo` (rank tăng dần, hòa → `no`). **Kiểm chứng: 0/13 danh mục đổi thứ tự** (rank đang đồng nhất) → bật an toàn. `sortFlat("catalogue")` **vẫn giữ nguyên theo `no`** (cố ý — rank là "ưu tiên trong danh mục").
  - Field mới `featured?: boolean` + toggle CMS "Sản phẩm nổi bật". Bật → ghim vào khu **"Featured"** đầu trang `/products`, **vẫn hiện trong danh mục gốc** (chốt với Mr Bắc). Khu Featured **tôn trọng bộ lọc**, chỉ hiện khi duyệt catalogue (`!query && sort==="catalogue"`), trống thì ẩn. Hàm `featuredFrom(list)` trong `lib/products.ts`.
  - `build-content.mjs` default `featured:false` + `rank:99`. **Chốt lại luật: THÊM FIELD MỚI NÀO CŨNG PHẢI DEFAULT TRONG `build-content.mjs`** (bẫy `f4af7ce`).
  - Chưa làm (Mr Bắc chưa chọn): nhãn "Featured" trên thẻ SP · khối SP nổi bật trên Home · boost featured trong search.

**Việc phiên 07/07 (giữ lại tham chiếu):**
- **CMS chạy thật rồi** — Mr Bắc/Mr Nam đang sửa Products + Pages (home/about/contact) + Settings/site qua `/admin`, mỗi lần Publish → commit `main` → Vercel deploy (rất nhiều commit `CMS: sửa…`). Phase 1 & Phase 2 coi như **đã verify trên browser**.
- **RFQ Resend đã PUSH** (`7324fb9`) — form `/contact` bỏ `mailto:`, gửi thật qua `/api/rfq`. **Vẫn chờ Mr Nam set 5 env + verify domain** trên Vercel (xem `docs/RFQ-RESEND-SETUP.md`) để gửi thật; chưa set → route trả 503 unconfigured (form fallback gọi/Zalo). `.gitignore` đã chặn file tài khoản/env (`f1f1760`).
- **Search VN** (`5569c86`) — bổ sung từ khóa tiếng Việt cho 19 SKU theo bảng Mr Bắc.
- **Fix build CMS-created SKU** (`f4af7ce`) — SKU tạo qua /admin thiếu field mảng (`standards/syn/images/catalogImages/specs`) làm `lib/products.ts` gọi `.map()` lỗi → sitemap fail → build đứt. `build-content.mjs` nay **default các field mảng + pdf về rỗng** cho mọi SP. (Lưu ý khi thêm field mảng mới: nhớ default trong build script.)
- **About nâng cấp** (`84d66a6`+`f75f0e8`) — hero banner ảnh nền lấy từ CMS (`about.hero.image`, media → `public/banners`, fallback `/backdrop-about.jpg`); thêm section **Certificates** dưới "Our Story" (grid ảnh `about.certificates`, media → `public/certificates`, ẩn khi trống); nút Header CTA đổi nhãn **"WLL Tool" → "Sling Calculation Tool"** (`site.json`). Fix #52: gắn đúng ảnh đại diện Green Pin Bow Shackle FN.
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
- **Backend Phase 2 — Nội dung trang & settings vào CMS (04/07, `04aeb6f`+`d924f8a`) — ĐÃ PUSH & DEPLOY:**
  - **Nguồn data mới:** `content/settings/site.json` (công ty/liên hệ/nav/footer — **1 nguồn duy nhất**, Footer + Contact cùng đọc, hết drift) + `content/pages/{home,about,services,projects,contact}.json`. Tất cả **commit thẳng** (không .gitignore, không qua build script) — import trực tiếp qua **`src/lib/content.ts`** (`SITE/HOME/ABOUT/SERVICES/PROJECTS/CONTACT`, có type), y pattern `categories.json`.
  - **Refactor:** Header/Footer + Home (page + 5 component `home/*`) + `about/services/projects/contact/page.tsx` nay đọc chữ từ `content.ts`. Bố cục/class **giữ nguyên**. `metadata` per-page lấy từ `meta` trong JSON.
  - **3 luật giữ trong CODE (không vào CMS):** (1) icon SVG khối Services trang chủ = map `ICONS` keyed `iconKey` (`ServicesTeaser.tsx`); (2) màu thẻ danh mục nổi bật = map `HIGHLIGHT_COLORS` keyed `id` (`ProductsTeaser.tsx`) — **Tailwind v4 purge class động**, đừng đưa class màu vào CMS; (3) câu đếm `{total}…{live}` ở ProductsTeaser vẫn tính trong code. Emoji icon = string bình thường → vào CMS OK.
  - **Tradeoff đã chốt:** 2 chữ in đậm `<strong>` trong "Our story" (About) — "Dragon Sling Division"/"ITIS" — nay **chữ thường** (paragraphs lưu plain text, tránh thêm markdown renderer).
  - **CMS config:** thêm file **Cài đặt → Site** + collection mới **Trang (Pages)** (5 file) trong `public/admin/config.yml` (label VN, `list` scalar dùng `field:` đơn). YAML validate parse OK; **config↔JSON khớp 100%** (script kiểm cấu trúc bắt & fix key `meta` thừa trong home.json → `d924f8a`). Serve tại `/admin/config.yml`.
  - **⏳ Còn lại để chốt 100%:** mở `https://mkweb-alpha.vercel.app/admin` bằng trình duyệt, kiểm **Cài đặt → Site** + collection **Trang** render OK + thử sửa 1 field → Publish → thấy commit `main`. (Bước này cần browser, code+structure đã xanh hết.)
  - **Gallery ảnh Services/Projects (phiên 05/07):** mỗi **dịch vụ** (services) và mỗi **lĩnh vực** (projects sectors) có field `images[]` (mỗi ảnh = `{image, caption?}`, media → `public/gallery`). Trang render khu **gallery nhóm theo mục** (component chung `components/pages/GroupedGallery.tsx`): Projects thay hẳn placeholder 8 ô "Photo N"; Services chỉ hiện khu gallery khi có ≥1 ảnh. Khi trống → hiện `gallery.note`. Đã test cả empty + filled (inject ảnh thật rồi khôi phục). Admin vào `/admin → Trang → Services/Projects` upload nhiều ảnh cho từng mục.
- **Backend — Resend cho RFQ (phiên 05/07) — CODE XONG, build+test route OK, chờ env:**
  - **Luồng:** form `/contact` bỏ `mailto:`, nay `fetch POST /api/rfq`. Route (`src/app/api/rfq/route.ts`): validate + honeypot `website` → (1) **bắt buộc** gửi email về `sales@mekongsling.com` (Reply-To=email khách) → (2) best-effort: auto-reply cho khách + `resend.contacts.create` vào **Audience** + POST **Google Sheet webhook** (Apps Script). Lỗi 2–4 KHÔNG làm hỏng RFQ.
  - **Chốt với Mr Nam:** list khách = **Resend Audience + Google Sheet**; **verify domain thật** (gửi từ `rfq@mekongsling.com`); **chỉ auto-reply, không checkbox consent**.
  - **File:** `src/lib/rfq.ts` (type/validate/HTML email), `route.ts`, `RfqForm.tsx` (state Sending/Success/Error, honeypot, fallback gọi/Zalo khi chưa cấu hình → route trả 503 `unconfigured`). Thêm dep `resend@^6.17.1`.
  - **Đã test local (dummy key):** thiếu field→400; honeypot→200 drop; thiếu key→503 unconfigured; key sai→502 graceful (không crash). Chưa test gửi thật (cần key thật).
  - **⏳ Mr Nam cần làm:** theo `Du-an-web/04-Source/docs/RFQ-RESEND-SETUP.md` → tạo Resend acct + API key, verify domain (3 DNS), tạo Audience, tạo Apps Script webhook cho Sheet, set 5 env trên Vercel (`RESEND_API_KEY`/`RFQ_FROM_EMAIL`/`RFQ_TO_EMAIL`/`RESEND_AUDIENCE_ID`/`GOOGLE_SHEET_WEBHOOK_URL`) → redeploy.
**⚠️ Cảnh báo dữ liệu ảnh (87 file trong `03-Assets\images` — nay LOCAL-ONLY, đã .gitignore, KHÔNG còn trên Git):** file đặt theo **trang section** catalog, KHÔNG phải 1-file-1-SKU, và nhiều file **sai tên vs nội dung** (số trang xlsx lệch bản catalog nén ở khu p55–76) → PHẢI tự Read ảnh xác minh trước khi build, đừng tin tên file. Mr Bắc đã OCR 44 trang + sửa 4 file (04/07): `ratchet-lever-load-binder-frb-flb`=p57 FRB/FLB ✓ · `binder-chain-grade-70-80-lashing`=p68 BC70/TDC ✓ · `hoisting-sling-chain-grade-80-aw-80-cf-80`=p67 AW-80/CF-80 ✓ · `brake-hand-winch-bhw`=p59 BHW ✓. (Bẫy cũ đã xử lý: `lashing-chain-long-link-chain-lashing.png`=Binder Chain p68; `...-rwp-43.png`=trùng puller.)
**Dev server:** `cd Du-an-web\04-Source && npm run dev` → http://localhost:3000
**Production (Vercel):** https://mkweb-alpha.vercel.app — project `mkweb`, org MekongSling (Hobby), repo `slingmekong-del/MKWEB`, auto-deploy khi push `main`. Root Directory = `Du-an-web/04-Source`.
**File chưa commit:** (không còn). Commit mới nhất `04aeb6f` (Phase 2) **đã commit local NHƯNG CHƯA push** — push `main` sẽ trigger Vercel deploy production (chờ Mr Nam quyết). Script crop tạm ở scratchpad phiên (require sharp bằng path tuyệt đối `C:/Mekong/Du-an-web/04-Source/node_modules/sharp`, path Windows forward-slash).
**⚠️ Cách build 1 SKU mới (ĐÃ ĐỔI sau CMS):** nguồn data nay là **`content/products/<id>.json`** (KHÔNG sửa `src/data/products.json` — nó tự sinh, đã .gitignore). Read ảnh nguồn xác minh → copy trang đúng → `public/catalogs/` + crop ảnh SP → `public/products/` (sharp); mở/tạo `content/products/<id>.json`, viết Desc + Specs (khuôn #40/#16), set `image`/`images`/`catalogImages`, `status: coming→live`, `hidden:false`, `wText/wmin/wmax`; `npm run build` (tự chạy `prebuild` gộp bundle) rồi commit/push. HOẶC làm thẳng qua CMS `/admin` (upload ảnh + điền form).
**Bước tiếp theo:** SEO + **CMS Phase 1 + Phase 2** + **Resend RFQ (code)** đã XONG. Còn lại: **(a)** Mr Nam set env Resend + verify domain (theo `docs/RFQ-RESEND-SETUP.md`) rồi test gửi RFQ thật · **(b)** verify CMS Phase 2 trên `/admin` (browser) · **(c)** **Sprint 8 — Launch** domain. Chi tiết Launch: **Sprint 8**: (1) lấy/trỏ domain `mekongsling.com`; (2) khi domain live, submit `sitemap.xml` vào Google Search Console + test [Rich Results](https://search.google.com/test/rich-results); (3) nếu muốn OG preview chạy TRƯỚC khi domain về → set env `NEXT_PUBLIC_SITE_URL=https://mkweb-alpha.vercel.app` trên Vercel (xóa khi có domain thật). Việc còn chờ Mr Bắc: **15 SKU coming BỊ CHẶN** — (a) **#17** Lashing Chain (Long Link) chờ xác nhận dùng p68 TDC hay catalog khác; (b) KHÔNG có ảnh/nguồn — #5,6,7 Wire Rope Sling · #15/#34 Turnbuckle · #20 Chain G100 · #24,25,26 Nylon/Manila/Superflex Rope · #48,49,50 Nets · #51 Load Test service · **#54 Thimble** (mới tạo, cần ảnh+specs).
**Chờ từ Mr. Bắc:** Xác nhận **#17 Lashing Chain (long-link)** — catalog ABLE không có trang riêng, dùng tạm p68 (BC70+TDC) hay gửi catalog khác? · Ảnh/nguồn cho #5,6,7,15,20,24,25,26,34,48,49,50 (Mr Bắc nói #48–49 có thể tải từ web MK cũ) · Data 20 SKU bestsellers · Ảnh dự án thực tế cho Projects gallery
**Nguồn WLL tool:** `Cataloge\SPEC_Tinh_chieu_dai_cap_WLL_tool.md` + `Cataloge\wll_length_calc_config.json`

## ⚠️ Cạm bẫy đã biết
- `create-next-app` không nhận tên thư mục có chữ hoa (04-Source) → tạo ở nơi khác rồi move
- Tailwind v4 KHÔNG có `tailwind.config.js` — mọi customization qua `@theme {}` trong CSS
- Next.js 16 có breaking changes — đọc `node_modules/next/dist/docs/` trước khi code patterns mới
- **`next/image` chặn `quality` lạ:** dùng `quality={N}` mà N không có trong `images.qualities` (mặc định chỉ `[75]`) → `/_next/image` trả **400, ảnh vỡ trên production**. Typecheck + `npm run build` KHÔNG bắt lỗi này — phải chạy dev server curl thử. Hiện khai `qualities:[75,92]` trong `next.config.ts`.
- **Thêm field mới cho sản phẩm → PHẢI default trong `scripts/build-content.mjs`**, nếu không SKU tạo qua `/admin` (thiếu field) sẽ làm đứt build. Đang default: `standards/syn/images/catalogImages/specs` = `[]`, `pdf`=null, `featured`=false, `rank`=99.
- **CMS Publish song song:** luôn `git pull --rebase origin main` trước khi push, kẻo bị reject vì Mr Bắc vừa Publish.
- Dev server: dùng `Start-Process cmd.exe` (PowerShell), không dùng `&` background

## 🔗 Tài liệu tham khảo nhanh
- Prototype đầy đủ: `Hop-thu-den\MekongSling 2026 (offline).html`
- UX spec trang sản phẩm: `Hop-thu-den\Mekong-Sling-UX-Trang-San-pham.docx`
- Data ABLE: `Hop-thu-den\ABLE Product List.xlsx`
- Data Green Pin: `Hop-thu-den\Green Pin - Danh muc san pham.xlsx`
- Contact: sales@mekongsling.com · +84 254 351 2238 · Vũng Tàu

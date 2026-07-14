# RFQ → Email (Resend) + Danh sách khách hàng — Hướng dẫn cấu hình

Form RFQ (`/contact`) nay gửi qua **API route `/api/rfq`** thay cho `mailto:`.
Khi khách bấm **Send RFQ**, server sẽ:

1. **Gửi email về `sales@mekongsling.com`** (Reply-To = email khách → bấm Reply là trả lời thẳng khách).
2. **Gửi auto-reply** cho khách ("Đã nhận RFQ, phản hồi trong 1 ngày").
3. **Thêm khách vào Resend Audience** (danh sách khách hàng để gửi bản tin sau).
4. **Ghi 1 dòng vào Google Sheet** (danh sách khách hàng dạng bảng cho Sales).

> Việc 2–4 là **best-effort**: nếu lỗi cũng KHÔNG làm hỏng RFQ. Chỉ việc 1 (email về sales) là bắt buộc.
> Khi **chưa cấu hình** `RESEND_API_KEY`, form hiện thông báo lịch sự "gọi/Zalo Ms. Thủy" — không vỡ.

---

## ⚠️ ĐỌC TRƯỚC — Không được làm hỏng email đang chạy

Domain `mekongsling.com` đang chạy **email thật qua Viettel IDC** (hộp thư
`sales@mekongsling.com`…). Thêm Resend **không được đụng** các bản ghi sau:

| Bản ghi | Giá trị hiện tại | |
|---|---|---|
| `MX` (gốc) | `mx.viettelidc.com.vn` | 🔒 **GIỮ NGUYÊN** |
| `TXT` SPF (gốc) | `v=spf1 +ip4:171.244.194.81 +ip4:103.1.208.0/24 +a +mx -all` | 🔒 **GIỮ NGUYÊN** |
| `A` `mail` / `webmail` | `171.244.194.81` | 🔒 **GIỮ NGUYÊN** |
| `TXT` `default._domainkey` | (DKIM Viettel) | 🔒 **GIỮ NGUYÊN** |

**🚨 BẪY CHẾT NGƯỜI — SPF:** một domain chỉ được có **ĐÚNG 1 bản ghi SPF**.
Nếu thêm bản ghi SPF **thứ hai** ở gốc (vd `v=spf1 include:amazonses.com ~all`)
thì SPF thành **KHÔNG HỢP LỆ** → email Viettel đang chạy sẽ **bị đánh spam / trả về**.

→ Cách tránh: dùng đúng bộ record Resend đưa ra, chúng nằm trên **subdomain
`send.mekongsling.com`** (MX + SPF) và selector riêng `resend._domainkey`,
**không đụng gốc**. Nếu Resend đòi SPF ở **gốc**, TUYỆT ĐỐI không thêm dòng
thứ hai — phải **gộp vào 1 dòng duy nhất**:
`v=spf1 +ip4:171.244.194.81 +ip4:103.1.208.0/24 include:amazonses.com +a +mx -all`

**DNS quản ở đâu:** nameserver hiện là **PA Vietnam** (`ns1/ns2.pavietnam.vn`)
→ thêm record tại **PA Vietnam → DNS → Cấu hình bản ghi tên miền** (không phải
Cloudflare nữa).

---

## Bước 1 — Tài khoản Resend + API key
1. Đăng ký **https://resend.com** (free 3.000 email/tháng, 100/ngày — dư dùng).
2. **API Keys → Create** → copy key `re_...` → dùng cho env `RESEND_API_KEY`.

## Bước 2 — Verify domain `mekongsling.com` (để gửi từ địa chỉ thương hiệu)
1. Resend → **Domains → Add Domain** → nhập `mekongsling.com`.
2. Resend cho **3 record DNS** (thường là: `MX` + `TXT` SPF trên `send.mekongsling.com`,
   và `TXT` DKIM trên `resend._domainkey`). Vào **PA Vietnam** thêm đúng 3 record đó.
   **Đọc lại phần cảnh báo SPF ở trên trước khi thêm.**
3. Bấm **Verify** trong Resend (chờ DNS lan ~vài phút–vài giờ). Verified xong mới gửi đàng hoàng.
   - Địa chỉ gửi khuyến nghị: `rfq@mekongsling.com` (không cần tạo hộp thư thật — chỉ cần domain verified).
   - Vì Return-Path nằm ở `send.mekongsling.com`, SPF được kiểm trên subdomain đó → **không xung đột** SPF gốc của Viettel.

> Trước khi domain verified, tài khoản Resend **chỉ gửi được về đúng email chủ tài khoản**. Muốn test sớm: tạm để `RFQ_FROM_EMAIL="Mekong Sling <onboarding@resend.dev>"` và `RFQ_TO_EMAIL=<email chủ tài khoản Resend>`.

## Bước 3 — Audience (danh sách khách hàng trong Resend)
1. Resend → **Audiences → Create Audience** (vd tên "Khách RFQ").
2. Copy **Audience ID** → env `RESEND_AUDIENCE_ID`.
   - Bỏ trống env này = bỏ qua bước thêm contact (vẫn gửi email bình thường).

## Bước 4 — Google Sheet webhook (danh sách khách hàng dạng bảng)

> Làm **bằng chính tài khoản `slingmekong@gmail.com`** — Sheet sẽ nằm trên Drive
> của tài khoản này, và Apps Script chạy dưới quyền tài khoản này.

1. Tạo Google Sheet mới, đổi tên tab (sheet) thành **`RFQ`**. Hàng 1 đặt tiêu đề cột:
   `Timestamp | Name | Company | Email | Phone | Industry | Products | Requirements`
2. **Extensions → Apps Script**, dán đoạn sau, lưu:
   ```js
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RFQ');
     var d = JSON.parse(e.postData.contents);
     sheet.appendRow([d.timestamp, d.name, d.company, d.email, d.phone, d.industry, d.products, d.requirements]);
     return ContentService
       .createTextOutput(JSON.stringify({ ok: true }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```
3. **Deploy → New deployment → Type: Web app**
   - *Execute as*: **Me**
   - *Who has access*: **Anyone**
   - Deploy → copy **Web app URL** (`https://script.google.com/macros/s/.../exec`) → env `GOOGLE_SHEET_WEBHOOK_URL`.
   - Bỏ trống env này = bỏ qua ghi Sheet.

## Bước 5 — Set env trên Vercel
Project `mkweb` → **Settings → Environment Variables** (Production + Preview), thêm:

| Key | Value ví dụ |
|---|---|
| `RESEND_API_KEY` | `re_xxxxxxxx` |
| `RFQ_FROM_EMAIL` | `Mekong Sling <rfq@mekongsling.com>` |
| `RFQ_TO_EMAIL` | `sales@mekongsling.com` |
| `RESEND_AUDIENCE_ID` | `xxxxxxxx-xxxx-...` *(tùy chọn)* |
| `GOOGLE_SHEET_WEBHOOK_URL` | `https://script.google.com/macros/s/.../exec` *(tùy chọn)* |

Sau khi thêm → **Redeploy** (hoặc push commit mới) để env có hiệu lực.

### Test local (tùy chọn)
Tạo file `Du-an-web/04-Source/.env.local` (đã .gitignore) với các biến trên, rồi `npm run dev` → mở `/contact` gửi thử.

---

## Đã build sẵn trong code
- `src/app/api/rfq/route.ts` — POST handler (validate + honeypot + gửi email + audience + sheet).
- `src/lib/rfq.ts` — type + validate + HTML email (sales + auto-reply).
- `src/components/contact/RfqForm.tsx` — `fetch('/api/rfq')`, trạng thái Sending/Success/Error, honeypot `website`, fallback gọi/Zalo.
- Chống spam: honeypot ẩn + validate server. Chưa gắn captcha/rate-limit (thêm sau nếu bị spam).

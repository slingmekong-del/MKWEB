import Link from "next/link";

const PRODUCT_LINKS = [
  { href: "/products?type=hardware", label: "Shackles & Hardware" },
  { href: "/products?type=wire-rope", label: "Wire Rope & Slings" },
  { href: "/products?type=rope", label: "Rope" },
  { href: "/products?type=safety", label: "Safety Equipment" },
];

const SERVICE_LINKS = [
  { href: "/services#spooling", label: "Wire Rope Spooling" },
  { href: "/services#load-testing", label: "Load & Proof Testing" },
  { href: "/services#ndt", label: "NDT Inspection" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/projects", label: "Projects" },
  { href: "/wll-tool", label: "WLL Calculator" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <div className="font-heading font-extrabold text-xl tracking-wider">
                MEKONG SLING
              </div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-teal uppercase mt-0.5">
                UNITED MEKONG · VŨNG TÀU
              </div>
            </div>
            <p className="text-slate-border text-sm leading-relaxed mb-6">
              Genuine hardware &amp; certified slings. From the Mekong, to the
              world&apos;s oceans.
            </p>
            <div className="space-y-2 text-sm text-slate-border">
              <div>
                <span className="font-mono text-teal">TEL</span>{" "}
                <a href="tel:+842543512738" className="hover:text-white">
                  0254 3512 738
                </a>
              </div>
              <div>
                <span className="font-mono text-teal">EMAIL</span>{" "}
                <a
                  href="mailto:sales@mekongsling.com"
                  className="hover:text-white"
                >
                  sales@mekongsling.com
                </a>
              </div>
              <div>
                <span className="font-mono text-teal">LOC</span> 444A, Binh Gia Str,
                Ward Tam Thang, Ho Chi Minh City, Vietnam
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-slate-border mb-4">
              Products
            </h3>
            <ul className="space-y-2">
              {PRODUCT_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-border hover:text-teal transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-slate-border mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {SERVICE_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-border hover:text-teal transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-slate-border mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {COMPANY_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-border hover:text-teal transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-border font-mono">
            © {new Date().getFullYear()} United Mekong JSC. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-border font-mono">
            <span>DNV Approved</span>
            <span className="text-white/20">·</span>
            <span>ISO 9001 Certified</span>
            <span className="text-white/20">·</span>
            <span>IMCA Member 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

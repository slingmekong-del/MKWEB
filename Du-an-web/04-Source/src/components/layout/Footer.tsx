import Link from "next/link";
import { Fragment } from "react";
import { SITE } from "@/lib/content";

const { company, footer } = SITE;
const { productLinks: PRODUCT_LINKS, serviceLinks: SERVICE_LINKS, companyLinks: COMPANY_LINKS } = footer;

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <div className="font-heading font-extrabold text-xl tracking-wider">
                {company.brandName}
              </div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-teal uppercase mt-0.5">
                {company.brandTagline}
              </div>
            </div>
            <p className="text-slate-border text-sm leading-relaxed mb-6">
              {company.blurb}
            </p>
            <div className="space-y-2 text-sm text-slate-border">
              <div>
                <span className="font-mono text-teal">TEL</span>{" "}
                <a href={`tel:${company.phoneHref}`} className="hover:text-white">
                  {company.phone}
                </a>
              </div>
              <div>
                <span className="font-mono text-teal">EMAIL</span>{" "}
                <a
                  href={`mailto:${company.email}`}
                  className="hover:text-white"
                >
                  {company.email}
                </a>
              </div>
              <div>
                <span className="font-mono text-teal">LOC</span> {company.addressInline}
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
            © {new Date().getFullYear()} {footer.copyrightName}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-border font-mono">
            {footer.bottomBar.map((item, i) => (
              <Fragment key={item}>
                {i > 0 && <span className="text-white/20">·</span>}
                <span>{item}</span>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

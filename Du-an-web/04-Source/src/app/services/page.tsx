import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES as SERVICES_CONTENT } from "@/lib/content";

export const metadata: Metadata = {
  title: SERVICES_CONTENT.meta.title,
  description: SERVICES_CONTENT.meta.description,
};

const { hero, stats, services, facility, process, certifications, cta } =
  SERVICES_CONTENT;

export default function ServicesPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-navy py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-teal text-xs tracking-[0.4em] uppercase mb-5">
            {hero.eyebrow}
          </p>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white leading-tight mb-6">
            {hero.headline}
          </h1>
          <p className="text-slate-border text-lg max-w-2xl mx-auto leading-relaxed">
            {hero.subhead}
          </p>
        </div>
      </section>

      {/* Capability stats */}
      <section className="bg-navy-light border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-heading font-extrabold text-3xl text-teal mb-1">
                  {value}
                </div>
                <div className="font-mono text-xs text-slate-border uppercase tracking-widest">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ id, icon, title, desc, items, tags }) => (
              <div
                key={id}
                className="bg-slate-light rounded-xl p-8 border border-slate-border hover:border-teal/40 transition-colors flex flex-col"
              >
                <div className="text-3xl mb-5">{icon}</div>
                <h3 className="font-heading font-bold text-navy text-xl mb-3">
                  {title}
                </h3>
                <p className="text-navy/60 text-sm leading-relaxed mb-5">
                  {desc}
                </p>
                <ul className="space-y-1.5 mb-6">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-navy/70 text-sm leading-relaxed"
                    >
                      <span className="text-teal-dark mt-0.5">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs text-teal-dark border border-teal-dark/30 rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility & equipment */}
      <section className="bg-slate-light py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
                {facility.eyebrow}
              </p>
              <h2 className="font-heading font-extrabold text-3xl text-navy leading-tight mb-6">
                {facility.heading}
              </h2>
              <div className="space-y-4 text-navy/60 leading-relaxed">
                {facility.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {facility.equipment.map(({ name, detail }) => (
                <div
                  key={name}
                  className="bg-white rounded-xl p-6 border border-slate-border"
                >
                  <div className="font-heading font-bold text-navy text-base mb-1">
                    {name}
                  </div>
                  <div className="font-mono text-xs text-navy/50 uppercase tracking-wide leading-relaxed">
                    {detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-navy py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono text-teal text-xs tracking-[0.3em] uppercase mb-4">
              {process.eyebrow}
            </p>
            <h2 className="font-heading font-extrabold text-3xl text-white">
              {process.heading}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.items.map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <div className="font-heading font-extrabold text-5xl text-teal/20 mb-3">
                  {step}
                </div>
                <h3 className="font-heading font-bold text-white text-lg mb-2">
                  {title}
                </h3>
                <p className="text-slate-border text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
              {certifications.eyebrow}
            </p>
            <h2 className="font-heading font-extrabold text-3xl text-navy">
              {certifications.heading}
            </h2>
          </div>
          {/* TODO: thêm ảnh logo chứng chỉ thật khi Mr. Bắc gửi (ISO/VR/MOLISA certificates) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {certifications.items.map(({ code, title, detail }) => (
              <div
                key={code}
                className="bg-slate-light rounded-xl p-8 border border-slate-border text-center"
              >
                <div className="font-heading font-extrabold text-3xl text-navy mb-3">
                  {code}
                </div>
                <div className="font-heading font-bold text-navy text-base mb-2">
                  {title}
                </div>
                <div className="font-mono text-xs text-navy/50 uppercase tracking-wide leading-relaxed">
                  {detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-light py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-3xl text-navy mb-4">
            {cta.heading}
          </h2>
          <p className="text-navy/60 mb-8">
            {cta.body}
          </p>
          <Link
            href={cta.primary.href}
            className="inline-block px-8 py-3.5 rounded bg-teal text-navy font-heading font-bold text-sm tracking-wide hover:bg-teal-dark transition-colors"
          >
            {cta.primary.label}
          </Link>
        </div>
      </section>
    </div>
  );
}

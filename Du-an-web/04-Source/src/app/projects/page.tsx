import type { Metadata } from "next";
import Link from "next/link";
import { PROJECTS } from "@/lib/content";

export const metadata: Metadata = {
  title: PROJECTS.meta.title,
  description: PROJECTS.meta.description,
};

const { hero, stats, sectorsSection, sectors, gallery, cta } = PROJECTS;

export default function ProjectsPage() {
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

      {/* Stats */}
      <section className="bg-teal py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div className="font-heading font-extrabold text-3xl text-navy mb-1">
                {value}
              </div>
              <div className="font-mono text-xs text-navy/70 uppercase tracking-wide">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sectors */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
              {sectorsSection.eyebrow}
            </p>
            <h2 className="font-heading font-extrabold text-3xl text-navy">
              {sectorsSection.heading}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sectors.map(({ id, icon, title, desc, clients }) => (
              <div
                key={id}
                className="bg-slate-light rounded-xl p-8 border border-slate-border"
              >
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-heading font-bold text-navy text-xl mb-3">
                  {title}
                </h3>
                <p className="text-navy/60 text-sm leading-relaxed mb-4">{desc}</p>
                <p className="font-mono text-xs text-teal-dark uppercase tracking-wide">
                  {clients}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo gallery placeholder */}
      <section className="bg-slate-light py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
              {gallery.eyebrow}
            </p>
            <h2 className="font-heading font-extrabold text-3xl text-navy mb-4">
              {gallery.heading}
            </h2>
            <p className="text-navy/60 max-w-md mx-auto">
              {gallery.note}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-slate-border/40 border border-slate-border flex items-center justify-center"
              >
                <span className="font-mono text-xs text-navy/30 uppercase tracking-wide">
                  Photo {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-3xl text-white mb-4">
            {cta.heading}
          </h2>
          <p className="text-slate-border mb-8">
            {cta.body}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={cta.primary.href}
              className="px-8 py-3.5 rounded bg-teal text-navy font-heading font-bold text-sm tracking-wide hover:bg-teal-dark transition-colors"
            >
              {cta.primary.label}
            </Link>
            <Link
              href={cta.secondary.href}
              className="px-8 py-3.5 rounded border border-white/30 text-white font-heading font-semibold text-sm tracking-wide hover:bg-white/10 transition-colors"
            >
              {cta.secondary.label}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

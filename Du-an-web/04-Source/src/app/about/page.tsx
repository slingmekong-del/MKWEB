import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ABOUT } from "@/lib/content";
import CertificateGallery from "@/components/pages/CertificateGallery";

export const metadata: Metadata = {
  title: ABOUT.meta.title,
  description: ABOUT.meta.description,
};

const { hero, missionVision, story, certificates, credentials, values, clients, cta } = ABOUT;

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero with backdrop image */}
      <section className="relative bg-navy py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <Image
          src={hero.image || "/backdrop-about.jpg"}
          alt=""
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/30 to-navy/70" />
        <div className="relative max-w-4xl mx-auto text-center">
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

      {/* Mission & Vision */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-slate-light rounded-xl p-8 border border-slate-border">
              <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
                Mission
              </p>
              <p className="font-heading font-bold text-navy text-xl leading-relaxed">
                {missionVision.mission}
              </p>
            </div>
            <div className="bg-slate-light rounded-xl p-8 border border-slate-border">
              <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
                Vision
              </p>
              <p className="font-heading font-bold text-navy text-xl leading-relaxed">
                {missionVision.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
                {story.eyebrow}
              </p>
              <h2 className="font-heading font-extrabold text-3xl text-navy leading-tight mb-6">
                {story.heading}
              </h2>
              <div className="space-y-4 text-navy/60 leading-relaxed">
                {story.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            {/* Credentials */}
            <div className="grid grid-cols-2 gap-4">
              {credentials.map(({ code, label, detail }) => (
                <div
                  key={code}
                  className="bg-slate-light rounded-xl p-6 border border-slate-border"
                >
                  <div className="font-heading font-extrabold text-2xl text-navy mb-1">
                    {code}
                  </div>
                  <div className="font-heading font-semibold text-sm text-navy mb-1">
                    {label}
                  </div>
                  <div className="font-mono text-xs text-navy/50 uppercase tracking-wide">
                    {detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificates */}
      {certificates && (
        <section className="bg-white border-t border-slate-border py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
                {certificates.eyebrow}
              </p>
              <h2 className="font-heading font-extrabold text-3xl text-navy">
                {certificates.heading}
              </h2>
            </div>
            {certificates.items.length > 0 ? (
              <CertificateGallery items={certificates.items} />
            ) : (
              <p className="text-center text-navy/50">{certificates.note}</p>
            )}
          </div>
        </section>
      )}

      {/* Values */}
      <section className="bg-slate-light py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
              {values.eyebrow}
            </p>
            <h2 className="font-heading font-extrabold text-3xl text-navy">
              {values.heading}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.items.map(({ title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-xl p-6 border border-slate-border"
              >
                <h3 className="font-heading font-bold text-navy text-lg mb-3">
                  {title}
                </h3>
                <p className="text-navy/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
            {clients.eyebrow}
          </p>
          <h2 className="font-heading font-extrabold text-3xl text-navy mb-10">
            {clients.heading}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {clients.names.map((name) => (
              <div
                key={name}
                className="bg-slate-light border border-slate-border rounded-xl px-8 py-5 font-heading font-bold text-navy text-lg"
              >
                {name}
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

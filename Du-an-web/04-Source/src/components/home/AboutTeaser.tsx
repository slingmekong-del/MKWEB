import Link from "next/link";
import { HOME } from "@/lib/content";

const { aboutTeaser } = HOME;
const CREDENTIALS = aboutTeaser.credentials;

export default function AboutTeaser() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
              {aboutTeaser.eyebrow}
            </p>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy leading-tight mb-6">
              {aboutTeaser.heading}
            </h2>
            <p className="text-navy/60 text-lg leading-relaxed mb-8">
              {aboutTeaser.body}
            </p>
            <Link
              href={aboutTeaser.link.href}
              className="inline-flex items-center gap-2 font-heading font-semibold text-sm text-teal-dark hover:text-teal transition-colors"
            >
              {aboutTeaser.link.label}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {/* Credentials grid */}
          <div className="grid grid-cols-2 gap-4">
            {CREDENTIALS.map(({ code, desc }) => (
              <div
                key={code}
                className="bg-slate-light rounded-xl p-6 border border-slate-border"
              >
                <div className="font-heading font-extrabold text-2xl text-navy mb-2">
                  {code}
                </div>
                <div className="font-mono text-xs text-navy/50 uppercase tracking-wide">
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

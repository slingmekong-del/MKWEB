"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type CertItem = { image: string; title?: string };

export default function CertificateGallery({ items }: { items: CertItem[] }) {
  // index of the open certificate, or null when the lightbox is closed
  const [open, setOpen] = useState<number | null>(null);
  // drives the enter/leave transition (mounted = true → fade + scale in)
  const [shown, setShown] = useState(false);

  const close = useCallback(() => {
    setShown(false);
    // wait for the fade-out before unmounting
    window.setTimeout(() => setOpen(null), 200);
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length));
    },
    [items.length]
  );

  // Trigger the enter animation on the next frame after mount
  useEffect(() => {
    if (open === null) return;
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  // Keyboard controls + lock page scroll while open
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, go]);

  const active = open === null ? null : items[open];

  return (
    <>
      {/* Thumbnail grid — max 3 columns so 6 certs lay out 3-top / 3-bottom */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {items.map(({ image, title }, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Zoom ${title || "certificate"}`}
            className="group block cursor-zoom-in bg-white rounded-xl p-3 border border-slate-border transition-all duration-300 hover:border-teal hover:shadow-lg hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-slate-light">
              <Image
                src={image}
                alt={title || "Certificate"}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain transition-transform duration-300 group-hover:scale-[1.04]"
              />
              {/* Zoom cue */}
              <span className="pointer-events-none absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-navy/80 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </span>
            </div>
            {title && (
              <span className="mt-3 block text-center font-heading font-semibold text-sm text-navy">
                {title}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title || "Certificate"}
          onClick={close}
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-navy/90 backdrop-blur-sm transition-opacity duration-200 ${
            shown ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>

          {/* Prev / Next */}
          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); go(-1); }}
                aria-label="Previous"
                className="absolute left-3 sm:left-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); go(1); }}
                aria-label="Next"
                className="absolute right-3 sm:right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}

          {/* Image + caption */}
          <figure
            onClick={(e) => e.stopPropagation()}
            className={`relative flex flex-col items-center transition-transform duration-200 ${
              shown ? "scale-100" : "scale-95"
            }`}
          >
            <div
              className="relative"
              style={{ width: "min(92vw, 860px)", height: "82vh" }}
            >
              <Image
                key={active.image}
                src={active.image}
                alt={active.title || "Certificate"}
                fill
                quality={92}
                sizes="(max-width: 860px) 92vw, 860px"
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
            <figcaption className="mt-4 text-center font-heading font-semibold text-white">
              {active.title}
              {items.length > 1 && (
                <span className="ml-2 font-mono text-xs font-normal text-white/50">
                  {(open ?? 0) + 1} / {items.length}
                </span>
              )}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}

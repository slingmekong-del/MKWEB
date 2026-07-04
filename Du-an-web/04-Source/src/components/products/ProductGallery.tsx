"use client";
import { useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  alt: string;
  categoryLabel: string;
  subcategory: string;
};

export default function ProductGallery({ images, alt, categoryLabel, subcategory }: Props) {
  const [active, setActive] = useState(0);
  const hasImages = images.length > 0;
  const current = images[Math.min(active, images.length - 1)];

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="bg-white rounded-xl border border-slate-border overflow-hidden">
        <div className="relative aspect-[16/10] bg-white flex items-center justify-center">
          {hasImages ? (
            <Image
              key={current}
              src={current}
              alt={alt}
              fill
              sizes="(max-width:1024px) 100vw, 66vw"
              className="object-contain p-8"
              priority
            />
          ) : (
            <div className="text-center px-6">
              <div className="font-mono text-navy/30 text-xs uppercase tracking-widest mb-2">{categoryLabel}</div>
              <div className="font-heading font-bold text-navy/50 text-lg">{subcategory}</div>
              <div className="text-navy/30 text-sm mt-2">Product image coming soon</div>
            </div>
          )}
        </div>
      </div>

      {/* Thumbnails — only when more than one image */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:max-w-md">
          {images.map((img, i) => {
            const isActive = i === active;
            return (
              <button
                key={img}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                aria-current={isActive}
                className={`relative aspect-square rounded-lg border overflow-hidden bg-white transition-colors ${
                  isActive ? "border-teal ring-1 ring-teal" : "border-slate-border hover:border-teal/50"
                }`}
              >
                <Image src={img} alt={`${alt} — ${i + 1}`} fill sizes="120px" className="object-contain p-2" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

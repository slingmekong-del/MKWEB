import Image from "next/image";
import type { GalleryImage } from "@/lib/content";

export type GalleryGroup = { id: string; title: string; images?: GalleryImage[] };

// A photo gallery grouped by item (service or project sector). Each group with
// photos renders its title + a responsive thumbnail grid; groups without photos
// are skipped. When no group has any photo, the `note` fallback is shown.
export default function GroupedGallery({
  eyebrow,
  heading,
  note,
  groups,
}: {
  eyebrow: string;
  heading: string;
  note: string;
  groups: GalleryGroup[];
}) {
  const withPhotos = groups.filter((g) => g.images && g.images.length > 0);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
          {eyebrow}
        </p>
        <h2 className="font-heading font-extrabold text-3xl text-navy mb-4">
          {heading}
        </h2>
        {withPhotos.length === 0 && (
          <p className="text-navy/60 max-w-md mx-auto">{note}</p>
        )}
      </div>

      {withPhotos.length > 0 && (
        <div className="space-y-12">
          {withPhotos.map((g) => (
            <div key={g.id}>
              <h3 className="font-heading font-bold text-navy text-lg mb-4 flex items-baseline gap-3">
                <span>{g.title}</span>
                <span className="font-mono text-xs text-navy/40 uppercase tracking-wide">
                  {g.images!.length} photo{g.images!.length > 1 ? "s" : ""}
                </span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {g.images!.map((img, i) => (
                  <figure key={i} className="group">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-border bg-slate-light">
                      <Image
                        src={img.image}
                        alt={img.caption || g.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {img.caption && (
                      <figcaption className="mt-2 text-xs text-navy/50 leading-snug">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

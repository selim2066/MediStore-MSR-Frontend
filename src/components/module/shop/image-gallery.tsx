// src/app/(commonLayout)/shop/[id]/page.tsx
"use client"; // ← needed for useState (active image)

// NOTE: Since we need useState for active image switching,
// we convert this to a client component and fetch data via useEffect,
// OR keep it server and extract gallery to a separate client component.
// Best approach: keep page as server component, extract ImageGallery as client.
// See ImageGallery component below — import and use it in the page.

// ─── OPTION A: Extract as separate client component ───────────────────────────
// Create: src/components/module/shop/image-gallery.tsx

"use client";

import { Package, ShieldCheck, ZoomIn } from "lucide-react";
import { useState } from "react";

interface ImageGalleryProps {
  mainImage: string | null;
  extraImages: string[];
  name: string;
  stock: number;
}

export function ImageGallery({
  mainImage,
  extraImages,
  name,
  stock,
}: ImageGalleryProps) {
  // All images: main first, then extras
  const allImages = [mainImage, ...extraImages].filter(Boolean) as string[];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = allImages[activeIndex] ?? null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main image display */}
      <div className="relative aspect-square max-h-[60vh] rounded-3xl overflow-hidden bg-white/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 shadow-lg backdrop-blur-2xl">
        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-3/4 h-3/4 bg-emerald-400/10 blur-[90px]" />
        </div>

        {activeImage ? (
          <img
            src={activeImage}
            alt={name}
            className="relative z-10 w-full h-full object-contain p-10 transition-all duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-24 h-24 text-emerald-500/40" />
          </div>
        )}

        {/* Authentic badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 text-[10px] font-bold uppercase bg-white/80 dark:bg-white/10 border border-slate-200/60 dark:border-white/10 rounded-full text-emerald-600 dark:text-emerald-400 backdrop-blur-xl flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            Authentic
          </span>
        </div>

        {/* Image counter */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 right-4 z-20">
            <span className="px-2.5 py-1 text-[10px] font-bold bg-black/40 text-white rounded-full backdrop-blur-sm flex items-center gap-1">
              <ZoomIn className="w-3 h-3" />
              {activeIndex + 1} / {allImages.length}
            </span>
          </div>
        )}

        {stock <= 0 && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
            <span className="bg-red-500 text-white px-4 py-2 rounded-full text-xs font-black">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {allImages.length > 1 ? (
        <div className="grid grid-cols-4 gap-3">
          {allImages.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`
                aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-200
                bg-white/80 dark:bg-white/5 backdrop-blur-xl
                ${
                  i === activeIndex
                    ? "border-emerald-500 shadow-md shadow-emerald-500/20 scale-[1.03]"
                    : "border-slate-200/60 dark:border-white/10 opacity-60 hover:opacity-90 hover:border-emerald-300 dark:hover:border-emerald-700 hover:scale-[1.02]"
                }
              `}
            >
              <img
                src={img}
                alt={`${name} view ${i + 1}`}
                className="w-full h-full object-contain p-2"
              />
            </button>
          ))}

          {/* Empty placeholder slots to fill grid */}
          {allImages.length < 4 &&
            Array.from({ length: 4 - allImages.length }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="aspect-square rounded-2xl border-2 border-dashed border-slate-200/40 dark:border-white/[0.05] bg-slate-50/50 dark:bg-white/[0.02]"
              />
            ))}
        </div>
      ) : (
        /* Single image — show placeholder thumbnails */
        <div className="grid grid-cols-4 gap-3">
          <button
            type="button"
            className="aspect-square rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md shadow-emerald-500/20 bg-white/80 dark:bg-white/5 backdrop-blur-xl"
          >
            {mainImage && (
              <img
                src={mainImage}
                alt={name}
                className="w-full h-full object-contain p-2"
              />
            )}
          </button>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl border-2 border-dashed border-slate-200/40 dark:border-white/[0.05] bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-center"
            >
              <Package className="w-5 h-5 text-slate-200 dark:text-slate-700" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

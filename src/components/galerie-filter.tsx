"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SA = any;

interface Photo {
  _id: string;
  image: { image: SA; alt: string };
  legende: string | null;
  categorie: { _id: string; nom: string; slug: { current: string } } | null;
}

interface CatGalerie {
  _id: string;
  nom: string;
}

interface GalerieFilterProps {
  photos: Photo[];
  categories: CatGalerie[];
}

const spanPatterns = [
  "md:col-span-2 md:row-span-2", "", "", "",
  "md:col-span-2", "", "", "",
  "md:col-span-2", "", "", "",
];

export default function GalerieFilter({ photos, categories }: GalerieFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? photos.filter((p) => p.categorie?._id === activeCategory)
    : photos;

  return (
    <>
      {/* Filtres */}
      {categories.length > 0 && (
        <section className="py-8 bg-white sticky top-[73px] z-40 border-b border-primary/10">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] whitespace-nowrap transition-all duration-300 ${
                  activeCategory === null
                    ? "bg-secondary text-white"
                    : "bg-transparent text-charcoal/60 border border-primary/20 hover:border-secondary hover:text-secondary"
                }`}
              >
                Tout
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setActiveCategory(cat._id)}
                  className={`px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] whitespace-nowrap transition-all duration-300 ${
                    activeCategory === cat._id
                      ? "bg-secondary text-white"
                      : "bg-transparent text-charcoal/60 border border-primary/20 hover:border-secondary hover:text-secondary"
                  }`}
                >
                  {cat.nom}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Grille */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[200px] md:auto-rows-[280px]">
            {filtered.map((photo, i) => (
              <div
                key={photo._id}
                className={`group relative overflow-hidden cursor-pointer ${spanPatterns[i % spanPatterns.length]}`}
              >
                {photo.image?.image?.asset ? (
                  <Image
                    src={urlFor(photo.image.image).width(600).height(600).url()}
                    alt={photo.image.alt || photo.legende || ""}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-cream flex items-center justify-center">
                    <span className="text-charcoal/20 text-sm">{photo.legende || "Photo"}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/30 transition-all duration-500" />
                <div className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div>
                    {photo.legende && (
                      <span className="text-white text-sm font-medium drop-shadow-lg block">
                        {photo.legende}
                      </span>
                    )}
                    {photo.categorie && (
                      <span className="text-white/70 text-xs drop-shadow-lg uppercase tracking-wider">
                        {photo.categorie.nom}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-charcoal/40 py-20">
              Aucune photo dans cette cat&eacute;gorie pour le moment.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

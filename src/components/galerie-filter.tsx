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
        <section className="py-8 bg-white sticky top-[73px] z-40 border-b border-primary/5">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeCategory === null
                    ? "bg-primary text-white"
                    : "bg-primary/5 text-charcoal/60 hover:bg-primary/10 hover:text-primary"
                }`}
              >
                Tout
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setActiveCategory(cat._id)}
                  className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    activeCategory === cat._id
                      ? "bg-primary text-white"
                      : "bg-primary/5 text-charcoal/60 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {cat.nom}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Grille photos */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
            {filtered.map((photo, i) => (
              <div
                key={photo._id}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${spanPatterns[i % spanPatterns.length]}`}
              >
                {photo.image?.image?.asset ? (
                  <Image
                    src={urlFor(photo.image.image).width(600).height(600).url()}
                    alt={photo.image.alt || photo.legende || ""}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center">
                    <span className="text-charcoal/30 text-sm">{photo.legende || "Photo"}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-500" />
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div>
                    {photo.legende && (
                      <span className="text-white text-sm font-medium drop-shadow-lg block">
                        {photo.legende}
                      </span>
                    )}
                    {photo.categorie && (
                      <span className="text-white/70 text-xs drop-shadow-lg">
                        {photo.categorie.nom}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-charcoal/40 py-16">
              Aucune photo dans cette cat&eacute;gorie pour le moment.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export const revalidate = 60;

import type { Metadata } from "next";
import Image from "next/image";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { GALERIE_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Parcourez notre galerie de créations florales artisanales. Bouquets, compositions et événements.",
};

interface GalerieItem {
  _id: string;
  nom: string;
  category: string | null;
  images: Array<{
    image: { asset: { _id: string; url: string; metadata?: { dimensions?: { width: number; height: number } } } };
    alt: string;
  }>;
}

// Spans for masonry-like layout
const spanPatterns = [
  "md:col-span-2 md:row-span-2",
  "",
  "",
  "",
  "md:col-span-2",
  "",
  "",
  "",
  "md:col-span-2",
  "",
  "",
  "",
];

export default async function Galerie() {
  const data: GalerieItem[] = await client.fetch(GALERIE_QUERY);

  // Flatten all images from products into a single array
  const allImages = data.flatMap((item) =>
    (item.images || []).map((img, i) => ({
      key: `${item._id}-${i}`,
      category: item.category || "Autre",
      productName: item.nom,
      image: img.image,
      alt: img.alt,
    }))
  );

  const hasSanityData = allImages.length > 0;

  // Fallback photos
  const fallbackPhotos = [
    { id: 1, category: "Bouquets", span: "md:col-span-2 md:row-span-2" },
    { id: 2, category: "Compositions", span: "" },
    { id: 3, category: "Mariages", span: "" },
    { id: 4, category: "\u00c9v\u00e9nements", span: "" },
    { id: 5, category: "Bouquets", span: "md:col-span-2" },
    { id: 6, category: "Compositions", span: "" },
    { id: 7, category: "Mariages", span: "" },
    { id: 8, category: "Bouquets", span: "" },
    { id: 9, category: "\u00c9v\u00e9nements", span: "md:col-span-2" },
    { id: 10, category: "Compositions", span: "" },
    { id: 11, category: "Mariages", span: "" },
    { id: 12, category: "Bouquets", span: "" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-primary/5 to-cream">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-secondary font-medium tracking-widest uppercase text-sm mb-4">
            Nos r&eacute;alisations
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-primary font-bold leading-tight">
            Galerie
          </h1>
          <p className="mt-4 text-charcoal/60 max-w-xl mx-auto">
            Un aper&ccedil;u de nos cr&eacute;ations, des bouquets du quotidien
            aux compositions pour vos &eacute;v&eacute;nements les plus
            pr&eacute;cieux.
          </p>
        </div>
      </section>

      {/* Grille */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
            {hasSanityData
              ? allImages.map((photo, i) => (
                  <div
                    key={photo.key}
                    className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                      spanPatterns[i % spanPatterns.length]
                    }`}
                  >
                    {photo.image?.asset ? (
                      <Image
                        src={urlFor(photo.image).width(600).height(600).url()}
                        alt={photo.alt || photo.productName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center">
                        <span className="text-charcoal/30 text-sm">
                          {photo.category}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-500" />
                    <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div>
                        <span className="text-white text-sm font-medium drop-shadow-lg block">
                          {photo.productName}
                        </span>
                        {photo.category && (
                          <span className="text-white/70 text-xs drop-shadow-lg">
                            {photo.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              : fallbackPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className={`group relative rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center overflow-hidden cursor-pointer ${photo.span}`}
                  >
                    <span className="text-charcoal/30 text-sm z-10">
                      {photo.category}
                    </span>
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-500" />
                    <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="text-white text-sm font-medium drop-shadow-lg">
                        {photo.category} #{photo.id}
                      </span>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-primary">
            Envie d&rsquo;une cr&eacute;ation sur mesure ?
          </h2>
          <p className="mt-4 text-charcoal/60">
            Chaque projet est unique. Parlons ensemble de vos envies.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-block bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-primary-light transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
          >
            Discutons de votre projet
          </a>
        </div>
      </section>
    </>
  );
}

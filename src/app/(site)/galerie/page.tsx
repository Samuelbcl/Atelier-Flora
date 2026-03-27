export const revalidate = 60;

import type { Metadata } from "next";
import Image from "next/image";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PAGE_GALERIE_QUERY, PHOTOS_GALERIE_QUERY, CATEGORIES_GALERIE_QUERY } from "@/sanity/queries";
import HeroSection from "@/components/hero-section";
import CtaSection from "@/components/cta-section";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SA = any;

interface Photo {
  _id: string;
  image: { image: SA; alt: string };
  legende: string | null;
  categorie: { _id: string; nom: string; slug: { current: string } } | null;
}

interface CatGalerie { _id: string; nom: string; slug: { current: string } }

interface PageGalerie {
  hero: SA | null;
  cta: SA | null;
  seo: { metaTitre: string | null; metaDescription: string | null } | null;
}

const spanPatterns = ["md:col-span-2 md:row-span-2", "", "", "", "md:col-span-2", "", "", "", "md:col-span-2", "", "", ""];

export async function generateMetadata(): Promise<Metadata> {
  const data: PageGalerie | null = await client.fetch(PAGE_GALERIE_QUERY);
  return {
    title: data?.seo?.metaTitre || "Galerie",
    description: data?.seo?.metaDescription || "Parcourez notre galerie de cr\u00e9ations florales artisanales.",
  };
}

export default async function Galerie() {
  const [pageData, photos, categories] = await Promise.all([
    client.fetch<PageGalerie | null>(PAGE_GALERIE_QUERY),
    client.fetch<Photo[]>(PHOTOS_GALERIE_QUERY),
    client.fetch<CatGalerie[]>(CATEGORIES_GALERIE_QUERY),
  ]);

  const hasPhotos = photos.length > 0;

  return (
    <>
      <HeroSection
        data={pageData?.hero}
        defaults={{ label: "Nos r\u00e9alisations", titre: "Galerie", sousTitre: "Un aper\u00e7u de nos cr\u00e9ations, des bouquets du quotidien aux compositions pour vos \u00e9v\u00e9nements." }}
      />

      {/* Filtres catégories */}
      {categories.length > 0 && (
        <section className="py-8 bg-white sticky top-[73px] z-40 border-b border-primary/5">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              <span className="px-5 py-2 rounded-full text-sm font-medium bg-primary text-white">Tout</span>
              {categories.map((cat) => (
                <span key={cat._id} className="px-5 py-2 rounded-full text-sm font-medium bg-primary/5 text-charcoal/60 whitespace-nowrap">
                  {cat.nom}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Grille photos */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
            {hasPhotos
              ? photos.map((photo, i) => (
                  <div key={photo._id} className={`group relative rounded-2xl overflow-hidden cursor-pointer ${spanPatterns[i % spanPatterns.length]}`}>
                    {photo.image?.image?.asset ? (
                      <Image src={urlFor(photo.image.image).width(600).height(600).url()} alt={photo.image.alt || photo.legende || ""} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center">
                        <span className="text-charcoal/30 text-sm">{photo.legende || "Photo"}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-500" />
                    <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div>
                        {photo.legende && <span className="text-white text-sm font-medium drop-shadow-lg block">{photo.legende}</span>}
                        {photo.categorie && <span className="text-white/70 text-xs drop-shadow-lg">{photo.categorie.nom}</span>}
                      </div>
                    </div>
                  </div>
                ))
              : Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className={`group relative rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center overflow-hidden ${spanPatterns[i % spanPatterns.length]}`}>
                    <span className="text-charcoal/30 text-sm">Photo {i + 1}</span>
                  </div>
                ))}
          </div>
        </div>
      </section>

      <CtaSection
        data={pageData?.cta}
        defaults={{ titre: "Envie d\u2019une cr\u00e9ation sur mesure ?", texte: "Chaque projet est unique. Parlons ensemble de vos envies.", boutonTexte: "Discutons de votre projet", boutonLien: "/contact" }}
      />
    </>
  );
}

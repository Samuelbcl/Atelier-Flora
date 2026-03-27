export const revalidate = 60;

import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { PAGE_GALERIE_QUERY, PHOTOS_GALERIE_QUERY, CATEGORIES_GALERIE_QUERY } from "@/sanity/queries";
import HeroSection from "@/components/hero-section";
import CtaSection from "@/components/cta-section";
import GalerieFilter from "@/components/galerie-filter";

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

  return (
    <>
      <HeroSection
        data={pageData?.hero}
        defaults={{ label: "Nos r\u00e9alisations", titre: "Galerie", sousTitre: "Un aper\u00e7u de nos cr\u00e9ations, des bouquets du quotidien aux compositions pour vos \u00e9v\u00e9nements." }}
      />

      <GalerieFilter photos={photos} categories={categories} />

      <CtaSection
        data={pageData?.cta}
        defaults={{ titre: "Envie d\u2019une cr\u00e9ation sur mesure ?", texte: "Chaque projet est unique. Parlons ensemble de vos envies.", boutonTexte: "Discutons de votre projet", boutonLien: "/contact" }}
      />
    </>
  );
}

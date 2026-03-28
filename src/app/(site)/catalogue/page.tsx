export const revalidate = 60;

import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { PRODUITS_QUERY, CATEGORIES_QUERY, PAGE_CATALOGUE_QUERY } from "@/sanity/queries";
import HeroSection from "@/components/hero-section";
import CtaSection from "@/components/cta-section";
import CatalogueFilter from "@/components/catalogue-filter";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SA = any;

interface Categorie { _id: string; nom: string; slug: { current: string }; description: string | null; contenuSEO: SA }
interface Produit { _id: string; nom: string; slug: { current: string }; prix: number | null; etiquette: string | null; images: Array<{ image: SA; alt: string }>; categorie: { _id: string; nom: string } | null; disponible: boolean }
interface PageCatalogue { hero: SA | null; infosCommande: Array<{ _key: string; icone: string; titre: string; texte: string }> | null; cta: SA | null; seo: { metaTitre: string | null; metaDescription: string | null } | null }

const defaultInfos = [
  { _key: "i1", titre: "Livraison Paris", texte: "Livraison \u00e0 v\u00e9lo dans tout Paris, du mardi au samedi." },
  { _key: "i2", titre: "Sur mesure", texte: "Chaque bouquet peut \u00eatre personnalis\u00e9 selon vos envies et votre budget." },
  { _key: "i3", titre: "Emballage soign\u00e9", texte: "Papier kraft recycl\u00e9, ruban en coton \u2014 un \u00e9crin naturel pour vos fleurs." },
];

export async function generateMetadata(): Promise<Metadata> {
  const data: PageCatalogue | null = await client.fetch(PAGE_CATALOGUE_QUERY);
  return {
    title: data?.seo?.metaTitre || "Catalogue",
    description: data?.seo?.metaDescription || "D\u00e9couvrez notre catalogue de bouquets et compositions florales.",
  };
}

export default async function Catalogue() {
  const [pageData, produits, categories] = await Promise.all([
    client.fetch<PageCatalogue | null>(PAGE_CATALOGUE_QUERY),
    client.fetch<Produit[]>(PRODUITS_QUERY),
    client.fetch<Categorie[]>(CATEGORIES_QUERY),
  ]);

  const infos = pageData?.infosCommande?.length ? pageData.infosCommande : defaultInfos;

  return (
    <>
      <HeroSection
        data={pageData?.hero}
        defaults={{ label: "Catalogue", titre: "Nos cr\u00e9ations", sousTitre: "Des bouquets et compositions pour toutes les occasions, r\u00e9alis\u00e9s avec des fleurs fra\u00eeches de saison." }}
      />

      <CatalogueFilter categories={categories} produits={produits} />

      {/* Infos commande */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {infos.map((item) => (
              <div key={item._key} className="px-4">
                <h3 className="font-serif text-lg text-primary mb-2">{item.titre}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{item.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        data={pageData?.cta}
        defaults={{ titre: "Vous ne trouvez pas votre bonheur ?", texte: "Nous cr\u00e9ons des compositions sur mesure pour chaque occasion.", boutonTexte: "Commander sur mesure", boutonLien: "/contact" }}
      />
    </>
  );
}

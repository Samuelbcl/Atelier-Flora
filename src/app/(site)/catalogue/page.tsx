export const revalidate = 60;

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PRODUITS_QUERY, CATEGORIES_QUERY, PAGE_CATALOGUE_QUERY } from "@/sanity/queries";
import HeroSection from "@/components/hero-section";
import CtaSection from "@/components/cta-section";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SA = any;

interface Categorie { _id: string; nom: string; slug: { current: string }; description: string | null; image: { image: SA; alt: string } | null }
interface Produit { _id: string; nom: string; slug: { current: string }; prix: number | null; etiquette: string | null; images: Array<{ image: SA; alt: string }>; categorie: { _id: string; nom: string } | null; disponible: boolean }
interface PageCatalogue { hero: SA | null; infosCommande: Array<{ _key: string; icone: string; titre: string; texte: string }> | null; cta: SA | null; seo: { metaTitre: string | null; metaDescription: string | null } | null }

const defaultInfos = [
  { _key: "i1", icone: "\u{1F69A}", titre: "Livraison Paris", texte: "Livraison \u00e0 v\u00e9lo dans tout Paris, du mardi au samedi." },
  { _key: "i2", icone: "\u{1F4AC}", titre: "Sur mesure", texte: "Chaque bouquet peut \u00eatre personnalis\u00e9 selon vos envies et votre budget." },
  { _key: "i3", icone: "\u{1F381}", titre: "Emballage soign\u00e9", texte: "Papier kraft recycl\u00e9, ruban en coton \u2014 un \u00e9crin naturel pour vos fleurs." },
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

      {/* Catégories */}
      {categories.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <div key={cat._id} className="group p-6 rounded-2xl bg-cream/50 border border-primary/5 hover:border-primary/20 transition-all duration-300 text-left">
                  {cat.image?.image?.asset && (
                    <div className="aspect-video rounded-xl overflow-hidden mb-3 relative">
                      <Image src={urlFor(cat.image.image).width(300).height(170).url()} alt={cat.image.alt || cat.nom} fill className="object-cover" />
                    </div>
                  )}
                  <h3 className="font-serif text-lg text-primary group-hover:text-primary-light transition-colors">{cat.nom}</h3>
                  {cat.description && <p className="text-charcoal/40 text-xs mt-1">{cat.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Produits */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl text-primary">Tous nos produits</h2>
            <p className="text-charcoal/40 text-sm">{produits.length} cr&eacute;ations</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {produits.map((product) => (
              <Link key={product._id} href={`/catalogue/${product.slug?.current}`} className="group">
                <div className="relative aspect-[3/4] rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/10 overflow-hidden">
                  {product.images?.[0]?.image?.asset ? (
                    <Image src={urlFor(product.images[0].image).width(400).height(533).url()} alt={product.images[0].alt || product.nom} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="flex items-center justify-center h-full"><span className="text-charcoal/30 text-sm">Photo produit</span></div>
                  )}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-500" />
                  {!product.disponible && <div className="absolute top-4 right-4 bg-charcoal/70 text-white text-xs px-3 py-1 rounded-full">Indisponible</div>}
                  {product.categorie && <div className="absolute top-4 left-4 bg-white/90 text-charcoal/60 text-xs px-3 py-1 rounded-full">{product.categorie.nom}</div>}
                </div>
                <div className="mt-4 flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-charcoal group-hover:text-primary transition-colors duration-300">{product.nom}</h3>
                    {product.etiquette && <p className="text-charcoal/40 text-sm mt-0.5">{product.etiquette}</p>}
                  </div>
                  {product.prix && <p className="text-secondary font-semibold text-lg">{product.prix}&nbsp;&euro;</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Infos commande */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {infos.map((item) => (
              <div key={item._key} className="px-4">
                {item.icone && <span className="text-3xl">{item.icone}</span>}
                <h3 className="font-serif text-lg text-primary mt-3 mb-2">{item.titre}</h3>
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

export const revalidate = 60;

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PRODUITS_QUERY, CATEGORIES_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Catalogue",
  description:
    "Découvrez notre catalogue de bouquets, compositions florales et créations sur mesure. Livraison à Paris.",
};

interface Categorie {
  _id: string;
  nom: string;
  slug: { current: string };
  description: string | null;
  image: {
    image: { asset: { _id: string; url: string } };
    alt: string;
  } | null;
}

interface Produit {
  _id: string;
  nom: string;
  slug: { current: string };
  prix: number | null;
  images: Array<{
    image: { asset: { _id: string; url: string } };
    alt: string;
  }>;
  categorie: { _id: string; nom: string; slug: { current: string } } | null;
  disponible: boolean;
}

export default async function Catalogue() {
  const [produits, categories]: [Produit[], Categorie[]] = await Promise.all([
    client.fetch(PRODUITS_QUERY),
    client.fetch(CATEGORIES_QUERY),
  ]);

  const hasSanityData = produits.length > 0;

  // Fallback produits si Sanity est vide
  const fallbackProduits = [
    { name: "Bouquet Aurore", price: 45, category: "Bouquets" },
    { name: "Composition Jardin Secret", price: 65, category: "Compositions" },
    { name: "Bouquet Ros\u00e9e du Matin", price: 55, category: "Bouquets" },
    { name: "Couronne Champ\u00eatre", price: 75, category: "Mariages" },
    { name: "Bouquet Soleil d'Or", price: 40, category: "Bouquets" },
    { name: "Centre de Table \u00c9l\u00e9gance", price: 85, category: "\u00c9v\u00e9nements" },
    { name: "Bouquet Douceur Pastel", price: 50, category: "Bouquets" },
    { name: "Composition Zen", price: 70, category: "Compositions" },
    { name: "Boutonni\u00e8re Classique", price: 15, category: "Mariages" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-primary/5 to-cream">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-secondary font-medium tracking-widest uppercase text-sm mb-4">
            Catalogue
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-primary font-bold leading-tight">
            Nos cr&eacute;ations
          </h1>
          <p className="mt-4 text-charcoal/60 max-w-xl mx-auto">
            Des bouquets et compositions pour toutes les occasions,
            r&eacute;alis&eacute;s avec des fleurs fra&icirc;ches de saison.
          </p>
        </div>
      </section>

      {/* Catégories */}
      {categories.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  className="group p-6 rounded-2xl bg-cream/50 border border-primary/5 hover:border-primary/20 transition-all duration-300 text-left"
                >
                  {cat.image?.image?.asset && (
                    <div className="aspect-video rounded-xl overflow-hidden mb-3">
                      <Image
                        src={urlFor(cat.image.image).width(300).height(170).url()}
                        alt={cat.image.alt || cat.nom}
                        width={300}
                        height={170}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <h3 className="font-serif text-lg text-primary group-hover:text-primary-light transition-colors">
                    {cat.nom}
                  </h3>
                  {cat.description && (
                    <p className="text-charcoal/40 text-xs mt-1">
                      {cat.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {!hasSanityData && (
        <section className="py-12 md:py-16 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Bouquets", "Compositions", "Mariages", "\u00c9v\u00e9nements"].map(
                (cat) => (
                  <div
                    key={cat}
                    className="group p-6 rounded-2xl bg-cream/50 border border-primary/5 hover:border-primary/20 transition-all duration-300 text-left"
                  >
                    <h3 className="font-serif text-lg text-primary group-hover:text-primary-light transition-colors">
                      {cat}
                    </h3>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* Grille produits */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl text-primary">
              Tous nos produits
            </h2>
            <p className="text-charcoal/40 text-sm">
              {hasSanityData ? produits.length : fallbackProduits.length}{" "}
              cr&eacute;ations
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hasSanityData
              ? produits.map((product) => (
                  <Link
                    key={product._id}
                    href={`/catalogue/${product.slug?.current}`}
                    className="group"
                  >
                    <div className="relative aspect-[3/4] rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/10 overflow-hidden">
                      {product.images?.[0]?.image?.asset ? (
                        <Image
                          src={urlFor(product.images[0].image)
                            .width(400)
                            .height(533)
                            .url()}
                          alt={product.images[0].alt || product.nom}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-charcoal/30 text-sm">
                            Photo produit
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-500" />
                      {!product.disponible && (
                        <div className="absolute top-4 right-4 bg-charcoal/70 text-white text-xs px-3 py-1 rounded-full">
                          Indisponible
                        </div>
                      )}
                      {product.categorie && (
                        <div className="absolute top-4 left-4 bg-white/90 text-charcoal/60 text-xs px-3 py-1 rounded-full">
                          {product.categorie.nom}
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex items-start justify-between">
                      <div>
                        <h3 className="font-serif text-lg text-charcoal group-hover:text-primary transition-colors duration-300">
                          {product.nom}
                        </h3>
                        <p className="text-charcoal/40 text-sm mt-0.5">
                          Fleurs de saison
                        </p>
                      </div>
                      {product.prix && (
                        <p className="text-secondary font-semibold text-lg">
                          {product.prix}&nbsp;&euro;
                        </p>
                      )}
                    </div>
                  </Link>
                ))
              : fallbackProduits.map((product) => (
                  <div key={product.name} className="group">
                    <div className="relative aspect-[3/4] rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center overflow-hidden">
                      <span className="text-charcoal/30 text-sm">
                        Photo produit
                      </span>
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-500" />
                      <div className="absolute top-4 left-4 bg-white/90 text-charcoal/60 text-xs px-3 py-1 rounded-full">
                        {product.category}
                      </div>
                    </div>
                    <div className="mt-4 flex items-start justify-between">
                      <div>
                        <h3 className="font-serif text-lg text-charcoal group-hover:text-primary transition-colors duration-300">
                          {product.name}
                        </h3>
                        <p className="text-charcoal/40 text-sm mt-0.5">
                          Fleurs de saison
                        </p>
                      </div>
                      <p className="text-secondary font-semibold text-lg">
                        {product.price}&nbsp;&euro;
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Info commande */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: "\u{1F69A}",
                title: "Livraison Paris",
                text: "Livraison \u00e0 v\u00e9lo dans tout Paris, du mardi au samedi.",
              },
              {
                icon: "\u{1F4AC}",
                title: "Sur mesure",
                text: "Chaque bouquet peut \u00eatre personnalis\u00e9 selon vos envies et votre budget.",
              },
              {
                icon: "\u{1F381}",
                title: "Emballage soign\u00e9",
                text: "Papier kraft recycl\u00e9, ruban en coton \u2014 un \u00e9crin naturel pour vos fleurs.",
              },
            ].map((item) => (
              <div key={item.title} className="px-4">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="font-serif text-lg text-primary mt-3 mb-2">
                  {item.title}
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-2xl md:text-3xl">
            Vous ne trouvez pas votre bonheur ?
          </h2>
          <p className="mt-4 text-white/80">
            Nous cr&eacute;ons des compositions sur mesure pour chaque occasion.
            Parlez-nous de votre projet.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block bg-white text-primary px-8 py-4 rounded-full font-medium hover:bg-cream transition-all duration-300 hover:shadow-lg"
          >
            Commander sur mesure
          </Link>
        </div>
      </section>
    </>
  );
}

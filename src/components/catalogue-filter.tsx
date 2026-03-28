"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import PortableTextRenderer from "@/components/portable-text-renderer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SA = any;

interface Categorie {
  _id: string;
  nom: string;
  slug: { current: string };
  description: string | null;
  contenuSEO: SA;
}

interface Produit {
  _id: string;
  nom: string;
  slug: { current: string };
  prix: number | null;
  etiquette: string | null;
  images: Array<{ image: SA; alt: string }>;
  categorie: { _id: string; nom: string } | null;
  disponible: boolean;
}

interface CatalogueFilterProps {
  categories: Categorie[];
  produits: Produit[];
}

export default function CatalogueFilter({ categories, produits }: CatalogueFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? produits.filter((p) => p.categorie?._id === activeCategory)
    : produits;

  const activeCat = activeCategory
    ? categories.find((c) => c._id === activeCategory)
    : null;

  return (
    <>
      {/* Filtres */}
      {categories.length > 0 && (
        <section className="py-8 bg-white sticky top-[73px] z-40 border-b border-primary/10">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${
                  activeCategory === null
                    ? "bg-secondary text-white"
                    : "bg-transparent text-charcoal/60 border border-primary/20 hover:border-secondary hover:text-secondary"
                }`}
              >
                Tout voir
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setActiveCategory(cat._id)}
                  className={`px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${
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

      {/* Grille produits */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-serif text-2xl text-secondary font-normal">
              {activeCat?.nom || "Tous nos produits"}
            </h2>
            <p className="text-charcoal/40 text-sm">
              {filtered.length} cr&eacute;ation{filtered.length > 1 ? "s" : ""}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <Link
                key={product._id}
                href={`/catalogue/${product.slug?.current}`}
                className="group"
              >
                <div className="relative aspect-[3/4] bg-cream overflow-hidden">
                  {product.images?.[0]?.image?.asset ? (
                    <Image
                      src={urlFor(product.images[0].image).width(400).height(533).url()}
                      alt={product.images[0].alt || product.nom}
                      fill
                      className={`object-cover transition-transform duration-700 ${product.disponible ? "group-hover:scale-105" : ""}`}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-charcoal/20 text-sm">Photo produit</span>
                    </div>
                  )}
                  {product.disponible ? (
                    <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/10 transition-all duration-500" />
                  ) : (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="bg-secondary text-white text-xs font-semibold uppercase tracking-[0.15em] px-6 py-2.5">
                        &Eacute;puis&eacute;
                      </span>
                    </div>
                  )}
                  {product.categorie && (
                    <div className="absolute top-4 left-4 bg-white/90 text-charcoal/60 text-xs px-3 py-1.5 font-medium uppercase tracking-wider">
                      {product.categorie.nom}
                    </div>
                  )}
                </div>
                <div className="mt-5 flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-secondary group-hover:text-primary transition-colors duration-300">
                      {product.nom}
                    </h3>
                    {product.etiquette && (
                      <p className="text-charcoal/40 text-sm mt-0.5">{product.etiquette}</p>
                    )}
                  </div>
                  {product.prix && (
                    <p className="text-primary font-semibold text-lg">
                      {product.prix}&nbsp;&euro;
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-charcoal/40 py-20">
              Aucun produit dans cette cat&eacute;gorie pour le moment.
            </p>
          )}
        </div>
      </section>

      {/* Contenu SEO de la catégorie active */}
      {activeCat?.contenuSEO && (
        <section className="py-16 md:py-24 bg-white border-t border-primary/10">
          <div className="mx-auto max-w-3xl px-6">
            <PortableTextRenderer value={activeCat.contenuSEO} />
          </div>
        </section>
      )}
    </>
  );
}

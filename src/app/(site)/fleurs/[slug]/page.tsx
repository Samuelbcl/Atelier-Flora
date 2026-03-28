export const revalidate = 60;
export const dynamicParams = true;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import PortableTextRenderer from "@/components/portable-text-renderer";
import FadeIn from "@/components/fade-in";
import { groq } from "next-sanity";

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
  disponible: boolean;
}

const CATEGORIE_BY_SLUG = groq`
  *[_type == "categorie" && slug.current == $slug][0]{
    _id, nom, slug, description, contenuSEO
  }
`;

const PRODUITS_BY_CATEGORIE = groq`
  *[_type == "produit" && categorie->slug.current == $slug] | order(ordre asc){
    _id, nom, slug, prix, etiquette, disponible,
    images[]{
      image{
        asset->{_id, url, metadata{dimensions}},
        hotspot, crop
      },
      alt
    }
  }
`;

const ALL_CATEGORIE_SLUGS = groq`
  *[_type == "categorie" && defined(slug.current)].slug.current
`;

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(ALL_CATEGORIE_SLUGS);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat: Categorie | null = await client.fetch(CATEGORIE_BY_SLUG, { slug });
  if (!cat) return { title: "Cat\u00e9gorie introuvable" };
  return {
    title: cat.nom,
    description: cat.description || `D\u00e9couvrez nos ${cat.nom.toLowerCase()} chez Bloom Club, fleuriste \u00e0 Li\u00e8ge.`,
  };
}

export default async function FleursCategorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [categorie, produits] = await Promise.all([
    client.fetch<Categorie | null>(CATEGORIE_BY_SLUG, { slug }),
    client.fetch<Produit[]>(PRODUITS_BY_CATEGORIE, { slug }),
  ]);

  if (!categorie) notFound();

  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 bg-cream">
        <FadeIn className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-6">
            Nos fleurs
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-secondary font-normal leading-tight">
            {categorie.nom}
          </h1>
          {categorie.description && (
            <p className="mt-6 text-charcoal/50 max-w-xl mx-auto leading-relaxed">
              {categorie.description}
            </p>
          )}
        </FadeIn>
      </section>

      {/* Produits */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between mb-10">
            <nav className="text-sm text-charcoal/40">
              <Link href="/" className="hover:text-secondary transition-colors">Accueil</Link>
              <span className="mx-2">/</span>
              <span className="text-secondary">{categorie.nom}</span>
            </nav>
            <p className="text-charcoal/40 text-sm">
              {produits.length} produit{produits.length > 1 ? "s" : ""}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {produits.map((product, i) => (
              <FadeIn key={product._id} delay={i * 0.05}>
                <Link href={`/fleurs/${slug}/${product.slug?.current}`} className="group block">
                  <div className="relative aspect-square bg-cream overflow-hidden">
                    {product.images?.[0]?.image?.asset ? (
                      <Image
                        src={urlFor(product.images[0].image).width(400).height(400).url()}
                        alt={product.images[0].alt || product.nom}
                        fill
                        className={`object-cover transition-transform duration-700 ${product.disponible ? "group-hover:scale-105" : ""}`}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-charcoal/20 text-sm">Photo</span>
                      </div>
                    )}
                    {product.disponible ? (
                      <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/10 transition-all duration-500" />
                    ) : (
                      <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="bg-secondary text-white text-xs font-semibold uppercase tracking-[0.15em] px-5 py-2">
                          &Eacute;puis&eacute;
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="font-serif text-lg text-secondary group-hover:text-primary transition-colors duration-300">
                      {product.nom}
                    </h3>
                    {product.prix && (
                      <p className="text-primary font-medium mt-1">{product.prix}&nbsp;&euro;</p>
                    )}
                    {product.etiquette && (
                      <p className="text-charcoal/40 text-xs mt-1 uppercase tracking-wider">{product.etiquette}</p>
                    )}
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
          {produits.length === 0 && (
            <p className="text-center text-charcoal/40 py-20">Aucun produit dans cette cat&eacute;gorie pour le moment.</p>
          )}
        </div>
      </section>

      {/* Contenu SEO */}
      {categorie.contenuSEO && (
        <section className="py-16 md:py-24 bg-white border-t border-primary/10">
          <div className="mx-auto max-w-3xl px-6">
            <PortableTextRenderer value={categorie.contenuSEO} />
          </div>
        </section>
      )}
    </>
  );
}

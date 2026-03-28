export const revalidate = 60;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PRODUIT_BY_SLUG_QUERY, PRODUIT_SLUGS_QUERY } from "@/sanity/queries";
import PortableTextRenderer from "@/components/portable-text-renderer";
import FadeIn from "@/components/fade-in";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SA = any;

interface Produit {
  _id: string;
  nom: string;
  slug: { current: string };
  description: SA;
  prix: number | null;
  etiquette: string | null;
  images: Array<{ image: SA; alt: string }>;
  categorie: { _id: string; nom: string; slug: { current: string } } | null;
  disponible: boolean;
  seo: { metaTitre: string | null; metaDescription: string | null } | null;
}

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(PRODUIT_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const produit: Produit | null = await client.fetch(PRODUIT_BY_SLUG_QUERY, { slug });
  if (!produit) return { title: "Produit introuvable" };
  return {
    title: produit.seo?.metaTitre || produit.nom,
    description: produit.seo?.metaDescription || `D\u00e9couvrez ${produit.nom} chez Atelier Flora.`,
  };
}

export default async function ProduitPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const produit: Produit | null = await client.fetch(PRODUIT_BY_SLUG_QUERY, { slug });

  if (!produit) notFound();

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-cream py-4">
        <div className="mx-auto max-w-6xl px-6">
          <nav className="text-sm text-charcoal/40">
            <Link href="/catalogue" className="hover:text-secondary transition-colors">Catalogue</Link>
            {produit.categorie && (
              <><span className="mx-2">/</span><span>{produit.categorie.nom}</span></>
            )}
            <span className="mx-2">/</span>
            <span className="text-secondary">{produit.nom}</span>
          </nav>
        </div>
      </div>

      {/* Produit */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Images */}
          <FadeIn>
            <div className="space-y-3">
              {produit.images?.map((img, i) => (
                <div key={i} className="aspect-[3/4] bg-cream overflow-hidden relative">
                  {img.image?.asset ? (
                    <Image
                      src={urlFor(img.image).width(800).height(1066).url()}
                      alt={img.alt || produit.nom}
                      fill
                      className="object-cover"
                      priority={i === 0}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-charcoal/20 text-sm">Photo {i + 1}</span>
                    </div>
                  )}
                  {!produit.disponible && i === 0 && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="bg-secondary text-white text-xs font-semibold uppercase tracking-[0.15em] px-6 py-2.5">
                        &Eacute;puis&eacute;
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Détails */}
          <FadeIn delay={0.2}>
            <div className="md:sticky md:top-32">
              {produit.categorie && (
                <p className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-4">
                  {produit.categorie.nom}
                </p>
              )}
              <h1 className="font-serif text-3xl md:text-4xl text-secondary font-normal">
                {produit.nom}
              </h1>
              {produit.prix && (
                <p className="text-primary text-2xl font-medium mt-4">
                  {produit.prix}&nbsp;&euro;
                </p>
              )}
              {produit.etiquette && (
                <p className="text-charcoal/40 text-sm mt-2">{produit.etiquette}</p>
              )}

              <div className="w-10 h-[1px] bg-primary my-8" />

              {produit.description && (
                <div className="prose-sm">
                  <PortableTextRenderer value={produit.description} />
                </div>
              )}

              {!produit.disponible && (
                <div className="mt-8 p-4 bg-cream border border-primary/10 text-center">
                  <p className="text-secondary text-sm font-medium">Ce produit est actuellement indisponible</p>
                  <Link href="/contact" className="mt-2 inline-block text-xs text-primary underline underline-offset-2 hover:text-secondary transition-colors">
                    Contactez-nous pour une alternative
                  </Link>
                </div>
              )}

              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-block bg-secondary text-white px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] hover:bg-primary transition-all duration-300 w-full text-center"
                >
                  Commander
                </Link>
              </div>

              <Link href="/catalogue" className="mt-6 inline-block text-sm text-charcoal/40 hover:text-secondary transition-colors">
                &larr; Retour au catalogue
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

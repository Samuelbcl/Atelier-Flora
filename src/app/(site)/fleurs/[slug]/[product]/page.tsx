export const revalidate = 60;
export const dynamicParams = true;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PRODUIT_BY_SLUG_QUERY } from "@/sanity/queries";
import PortableTextRenderer from "@/components/portable-text-renderer";
import FadeIn from "@/components/fade-in";
import ProductDetails from "@/components/product-details";
import { groq } from "next-sanity";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SA = any;

interface Taille { _key: string; nom: string; prix: number; stock: number }

interface Produit {
  _id: string;
  nom: string;
  slug: { current: string };
  descriptionCourte: string | null;
  description: SA;
  prix: number | null;
  etiquette: string | null;
  tailles: Taille[] | null;
  images: Array<{ image: SA; alt: string }>;
  categorie: { _id: string; nom: string; slug: { current: string } } | null;
  disponible: boolean;
  seo: { metaTitre: string | null; metaDescription: string | null } | null;
  recommandes: Array<{
    _id: string; nom: string; slug: { current: string }; prix: number; etiquette: string | null;
    catSlug: string; firstImage: { image: SA; alt: string } | null;
  }> | null;
}

const ALL_PRODUCT_PARAMS = groq`
  *[_type == "produit" && defined(slug.current) && defined(categorie)]{
    "slug": categorie->slug.current,
    "product": slug.current
  }
`;

export async function generateStaticParams() {
  const items: Array<{ slug: string; product: string }> = await client.fetch(ALL_PRODUCT_PARAMS);
  return items.filter((i) => i.slug && i.product);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; product: string }> }): Promise<Metadata> {
  const { product } = await params;
  const produit: Produit | null = await client.fetch(PRODUIT_BY_SLUG_QUERY, { slug: product });
  if (!produit) return { title: "Produit introuvable" };
  return {
    title: produit.seo?.metaTitre || produit.nom,
    description: produit.seo?.metaDescription || produit.descriptionCourte || `D\u00e9couvrez ${produit.nom} chez Bloom Club.`,
  };
}

export default async function ProduitPage({ params }: { params: Promise<{ slug: string; product: string }> }) {
  const { slug, product: productSlug } = await params;
  const produit: Produit | null = await client.fetch(PRODUIT_BY_SLUG_QUERY, { slug: productSlug });

  if (!produit) notFound();

  const catSlug = produit.categorie?.slug?.current || slug;
  const catNom = produit.categorie?.nom || "Fleurs";

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-cream py-4">
        <div className="mx-auto max-w-7xl px-6">
          <nav className="text-sm text-charcoal/40">
            <Link href="/" className="hover:text-secondary transition-colors">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href={`/fleurs/${catSlug}`} className="hover:text-secondary transition-colors">{catNom}</Link>
            <span className="mx-2">/</span>
            <span className="text-secondary">{produit.nom}</span>
          </nav>
        </div>
      </div>

      {/* Produit — 2 colonnes style Lys Royal */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Colonne gauche — Image */}
          <FadeIn>
            {produit.images?.[0]?.image?.asset ? (
              <div className="aspect-[3/4] bg-cream overflow-hidden relative">
                <Image
                  src={urlFor(produit.images[0].image).width(1000).height(1333).url()}
                  alt={produit.images[0].alt || produit.nom}
                  fill
                  className="object-cover"
                  priority
                />
                {!produit.disponible && (
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="bg-secondary text-white text-sm font-semibold uppercase tracking-[0.15em] px-8 py-3">&Eacute;puis&eacute;</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-[3/4] bg-cream flex items-center justify-center">
                <span className="text-charcoal/20">Photo du produit</span>
              </div>
            )}
          </FadeIn>

          {/* Colonne droite — Détails */}
          <FadeIn delay={0.15}>
            <div className="md:sticky md:top-28">
              {/* Catégorie */}
              <Link href={`/fleurs/${catSlug}`} className="text-primary font-medium tracking-[0.2em] uppercase text-xs hover:text-secondary transition-colors">
                {catNom}
              </Link>

              {/* Titre */}
              <h1 className="font-serif text-3xl md:text-4xl text-secondary font-normal mt-3">
                {produit.nom}
              </h1>

              {/* Description courte */}
              {produit.descriptionCourte && (
                <p className="text-charcoal/50 text-sm leading-relaxed mt-4">{produit.descriptionCourte}</p>
              )}

              {/* Tailles + prix + bouton (client component) */}
              <ProductDetails
                prix={produit.prix}
                tailles={produit.tailles}
                disponible={produit.disponible}
                nom={produit.nom}
              />

              {/* Indicateur stock */}
              {produit.disponible && (
                <div className="flex items-center gap-2 mt-6">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                  </span>
                  <span className="text-xs text-charcoal/40">En stock, disponible sous un jour ouvrable</span>
                </div>
              )}

              {/* Séparateur */}
              <div className="w-full h-[1px] bg-primary/10 my-8" />

              {/* 3 avantages */}
              <div className="space-y-4">
                {[
                  { titre: "Livraison gratuite", texte: "\u00c0 Li\u00e8ge et environs" },
                  { titre: "Planifier la livraison", texte: "Toujours livr\u00e9 \u00e0 temps" },
                  { titre: "Savoir-faire artisanal", texte: "Avec amour et passion" },
                ].map((item) => (
                  <div key={item.titre} className="flex items-start gap-3">
                    <div className="w-5 h-[1px] bg-primary mt-2.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-secondary">{item.titre}</p>
                      <p className="text-xs text-charcoal/40">{item.texte}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Onglets accordéon */}
              <div className="mt-10 border-t border-primary/10">
                <Accordion title="Description">
                  {produit.description ? (
                    <PortableTextRenderer value={produit.description} />
                  ) : (
                    <p className="text-charcoal/50 text-sm">La composition du bouquet peut varier selon la disponibilit&eacute; des fleurs de saison.</p>
                  )}
                </Accordion>
                <Accordion title="Livraison">
                  <div className="text-charcoal/50 text-sm space-y-2">
                    <p>Command&eacute; avant 14h, livr&eacute; le jour m&ecirc;me &agrave; Li&egrave;ge et environs.</p>
                    <p>Livraison gratuite dans un rayon de 15 km autour de Li&egrave;ge.</p>
                    <p>Pour les autres r&eacute;gions, contactez-nous pour un devis.</p>
                  </div>
                </Accordion>
                <Accordion title="Retour">
                  <div className="text-charcoal/50 text-sm space-y-2">
                    <p>En raison de la nature p&eacute;rissable des fleurs, les bouquets ne peuvent pas &ecirc;tre retourn&eacute;s.</p>
                    <p>Si votre bouquet arrive endommag&eacute;, contactez-nous dans les 24 heures avec une photo et nous trouverons une solution.</p>
                  </div>
                </Accordion>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Produits recommandés */}
      {produit.recommandes && produit.recommandes.length > 0 && (
        <section className="py-16 md:py-24 bg-white border-t border-primary/10">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn className="mb-10">
              <h2 className="font-serif text-2xl text-secondary font-normal">
                Cet article peut &eacute;galement vous int&eacute;resser
              </h2>
            </FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {produit.recommandes.map((rec, i) => (
                <FadeIn key={rec._id} delay={i * 0.05}>
                  <Link href={`/fleurs/${rec.catSlug}/${rec.slug?.current}`} className="group block">
                    <div className="aspect-square bg-cream overflow-hidden relative">
                      {rec.firstImage?.image?.asset ? (
                        <Image src={urlFor(rec.firstImage.image).width(300).height(300).url()} alt={rec.firstImage.alt || rec.nom} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="flex items-center justify-center h-full"><span className="text-charcoal/20 text-sm">Photo</span></div>
                      )}
                    </div>
                    <div className="mt-3 text-center">
                      <h3 className="font-serif text-sm text-secondary group-hover:text-primary transition-colors">{rec.nom}</h3>
                      {rec.prix && <p className="text-primary text-sm mt-0.5">{rec.prix}&nbsp;&euro;</p>}
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

// Accordion component (server-side, uses details/summary)
function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="border-b border-primary/10 group">
      <summary className="py-5 flex items-center justify-between cursor-pointer list-none">
        <span className="text-sm font-medium text-secondary">{title}</span>
        <svg className="w-4 h-4 text-charcoal/30 group-open:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="pb-5">{children}</div>
    </details>
  );
}

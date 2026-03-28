export const revalidate = 60;

import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PAGE_ACCUEIL_QUERY, TEMOIGNAGES_QUERY } from "@/sanity/queries";
import PortableTextRenderer from "@/components/portable-text-renderer";
import HeroSection from "@/components/hero-section";
import CtaSection from "@/components/cta-section";
import Temoignages from "@/components/temoignages";
import FadeIn from "@/components/fade-in";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SA = any;

interface PageAccueil {
  hero: { label: string; titre: string; sousTitre: string; image: { image: SA; alt: string }; ctaTexte: string; ctaLien: string } | null;
  valeurs: Array<{ _key: string; titre: string; texte: string }> | null;
  introTitre: string | null;
  introduction: SA;
  introImage: { image: SA; alt: string } | null;
  produitsVedettesTitre: string | null;
  produitsVedettes: Array<{ _id: string; nom: string; slug: { current: string }; prix: number; etiquette: string | null; catSlug: string | null; firstImage: { image: SA; alt: string } | null }> | null;
  temoignagesTitre: string | null;
  temoignagesAffiches: Array<{ _id: string; auteur: string; texte: string; note: number | null; date: string | null }> | null;
  cta: { titre: string; texte: string; boutonTexte: string; boutonLien: string } | null;
}

const defaultValeurs = [
  { _key: "v1", titre: "Fleurs de saison", texte: "Nous travaillons exclusivement avec des fleurs fra\u00eeches et de saison, s\u00e9lectionn\u00e9es aupr\u00e8s de producteurs locaux." },
  { _key: "v2", titre: "Fait main", texte: "Chaque bouquet est compos\u00e9 \u00e0 la main dans notre atelier parisien, avec soin et cr\u00e9ativit\u00e9." },
  { _key: "v3", titre: "\u00c9co-responsable", texte: "Emballages recycl\u00e9s, circuits courts et z\u00e9ro mousse florale synth\u00e9tique pour un impact minimal." },
];

export default async function Accueil() {
  const [data, defaultTemoignages] = await Promise.all([
    client.fetch<PageAccueil | null>(PAGE_ACCUEIL_QUERY),
    client.fetch<Array<{ _id: string; auteur: string; texte: string; note: number | null; date: string | null }>>(TEMOIGNAGES_QUERY),
  ]);

  const valeurs = data?.valeurs?.length ? data.valeurs : defaultValeurs;
  const produitsVedettes = data?.produitsVedettes || [];
  const temoignages = data?.temoignagesAffiches?.length ? data.temoignagesAffiches : defaultTemoignages;

  return (
    <>
      <HeroSection
        data={data?.hero}
        defaults={{ label: "Fleuriste artisanale \u00e0 Paris", titre: "Bloom Club", sousTitre: "Des cr\u00e9ations florales uniques, compos\u00e9es avec passion \u00e0 partir de fleurs de saison pour sublimer chaque instant." }}
        large
      />

      {/* Valeurs */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
            {valeurs.map((item, i) => (
              <FadeIn key={item._key} delay={i * 0.1} className="text-center px-4">
                <div className="w-10 h-[1px] bg-primary mx-auto mb-6" />
                <h3 className="font-serif text-xl text-secondary mb-4">{item.titre}</h3>
                <p className="text-charcoal/50 leading-relaxed text-sm">{item.texte}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <FadeIn className="aspect-[4/5] bg-white overflow-hidden relative">
            {data?.introImage?.image?.asset ? (
              <Image src={urlFor(data.introImage.image).width(600).height(750).url()} alt={data.introImage.alt || ""} fill className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full"><span className="text-charcoal/20 text-sm">Photo de l&rsquo;atelier</span></div>
            )}
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-6">Notre histoire</p>
            <h2 className="font-serif text-3xl md:text-4xl text-secondary font-normal leading-tight">
              {data?.introTitre || "L\u2019art floral au service de vos \u00e9motions"}
            </h2>
            {data?.introduction ? (
              <div className="mt-6"><PortableTextRenderer value={data.introduction} /></div>
            ) : (
              <p className="mt-6 text-charcoal/50 leading-relaxed">
                N&eacute; d&rsquo;une passion pour la beaut&eacute; &eacute;ph&eacute;m&egrave;re des fleurs, Bloom Club est un espace de cr&eacute;ation o&ugrave; chaque composition raconte une histoire.
              </p>
            )}
            <Link href="/a-propos" className="mt-8 inline-block text-sm font-semibold uppercase tracking-[0.1em] text-secondary border-b border-secondary pb-1 hover:text-primary hover:border-primary transition-colors duration-300">
              En savoir plus
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Produits vedettes */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">S&eacute;lection</p>
            <h2 className="font-serif text-3xl md:text-4xl text-secondary font-normal">
              {data?.produitsVedettesTitre || "Nos cr\u00e9ations phares"}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {produitsVedettes.map((product, i) => (
              <FadeIn key={product._id} delay={i * 0.1}>
                <Link href={`/fleurs/${product.catSlug || 'populaire'}/${product.slug?.current}`} className="group block">
                  <div className="aspect-[3/4] bg-cream overflow-hidden relative">
                    {product.firstImage?.image?.asset ? (
                      <Image src={urlFor(product.firstImage.image).width(600).height(800).url()} alt={product.firstImage.alt || product.nom} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="flex items-center justify-center h-full"><span className="text-charcoal/20 text-sm">Photo produit</span></div>
                    )}
                    <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/10 transition-all duration-500" />
                  </div>
                  <div className="mt-5">
                    <h3 className="font-serif text-lg text-secondary group-hover:text-primary transition-colors duration-300">{product.nom}</h3>
                    {product.prix && <p className="text-primary font-medium mt-1">{product.prix}&nbsp;&euro;</p>}
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="text-center mt-14">
            <Link href="/fleurs/populaire" className="inline-block border border-secondary text-secondary px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] hover:bg-secondary hover:text-white transition-all duration-300">
              Voir tout le catalogue
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Témoignages */}
      <Temoignages titre={data?.temoignagesTitre} temoignages={temoignages} />

      {/* CTA */}
      <CtaSection
        data={data?.cta}
        defaults={{ titre: "Un \u00e9v\u00e9nement \u00e0 fleurir ?", texte: "Mariage, anniversaire ou simplement envie de faire plaisir \u2014 parlons de votre projet floral.", boutonTexte: "Nous contacter", boutonLien: "/contact" }}
      />
    </>
  );
}

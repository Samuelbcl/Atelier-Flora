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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImage = any;

interface PageAccueil {
  hero: { label: string; titre: string; sousTitre: string; image: { image: SanityImage; alt: string }; ctaTexte: string; ctaLien: string } | null;
  valeurs: Array<{ _key: string; icone: string; titre: string; texte: string }> | null;
  introTitre: string | null;
  introduction: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  introImage: { image: SanityImage; alt: string } | null;
  produitsVedettesTitre: string | null;
  produitsVedettes: Array<{ _id: string; nom: string; slug: { current: string }; prix: number; etiquette: string | null; firstImage: { image: SanityImage; alt: string } | null }> | null;
  temoignagesTitre: string | null;
  temoignagesAffiches: Array<{ _id: string; auteur: string; texte: string; note: number | null; date: string | null }> | null;
  cta: { titre: string; texte: string; boutonTexte: string; boutonLien: string } | null;
}

const defaultValeurs = [
  { _key: "v1", icone: "\u{1F331}", titre: "Fleurs de saison", texte: "Nous travaillons exclusivement avec des fleurs fra\u00eeches et de saison, s\u00e9lectionn\u00e9es aupr\u00e8s de producteurs locaux." },
  { _key: "v2", icone: "\u{2702}\u{FE0F}", titre: "Fait main", texte: "Chaque bouquet est compos\u00e9 \u00e0 la main dans notre atelier parisien, avec soin et cr\u00e9ativit\u00e9." },
  { _key: "v3", icone: "\u{1F49A}", titre: "\u00c9co-responsable", texte: "Emballages recycl\u00e9s, circuits courts et z\u00e9ro mousse florale synth\u00e9tique pour un impact minimal." },
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
        defaults={{ label: "Fleuriste artisanale \u00e0 Paris", titre: "Atelier Flora", sousTitre: "Des cr\u00e9ations florales uniques, compos\u00e9es avec passion \u00e0 partir de fleurs de saison pour sublimer chaque instant." }}
        large
      />

      {/* Valeurs */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {valeurs.map((item) => (
              <div key={item._key} className="text-center px-4">
                {item.icone && <span className="text-4xl">{item.icone}</span>}
                <h3 className="font-serif text-xl text-primary mt-4 mb-3">{item.titre}</h3>
                <p className="text-charcoal/60 leading-relaxed text-sm">{item.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center overflow-hidden relative">
            {data?.introImage?.image?.asset ? (
              <Image src={urlFor(data.introImage.image).width(600).height(750).url()} alt={data.introImage.alt || ""} fill className="object-cover" />
            ) : (
              <span className="text-charcoal/30 text-sm">Photo de l&rsquo;atelier</span>
            )}
          </div>
          <div>
            <p className="text-secondary font-medium tracking-widest uppercase text-sm mb-3">Notre histoire</p>
            <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight">
              {data?.introTitre || "L\u2019art floral au service de vos \u00e9motions"}
            </h2>
            {data?.introduction ? (
              <div className="mt-6"><PortableTextRenderer value={data.introduction} /></div>
            ) : (
              <p className="mt-6 text-charcoal/60 leading-relaxed">
                N&eacute; d&rsquo;une passion pour la beaut&eacute; &eacute;ph&eacute;m&egrave;re des fleurs, Atelier Flora est un espace de cr&eacute;ation o&ugrave; chaque composition raconte une histoire.
              </p>
            )}
            <Link href="/a-propos" className="mt-8 inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300">
              En savoir plus <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Produits vedettes */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <p className="text-secondary font-medium tracking-widest uppercase text-sm mb-3">S&eacute;lection</p>
            <h2 className="font-serif text-3xl md:text-4xl text-primary">
              {data?.produitsVedettesTitre || "Nos cr\u00e9ations phares"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {produitsVedettes.map((product) => (
              <Link key={product._id} href={`/catalogue/${product.slug?.current}`} className="group">
                <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/10 overflow-hidden relative">
                  {product.firstImage?.image?.asset ? (
                    <Image src={urlFor(product.firstImage.image).width(600).height(800).url()} alt={product.firstImage.alt || product.nom} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="flex items-center justify-center h-full"><span className="text-charcoal/30 text-sm">Photo produit</span></div>
                  )}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-500" />
                </div>
                <div className="mt-4">
                  <h3 className="font-serif text-lg text-charcoal group-hover:text-primary transition-colors duration-300">{product.nom}</h3>
                  {product.prix && <p className="text-secondary font-medium mt-1">{product.prix}&nbsp;&euro;</p>}
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/catalogue" className="border border-primary/30 text-primary px-8 py-4 rounded-full font-medium hover:bg-primary/5 transition-all duration-300">
              Voir tout le catalogue
            </Link>
          </div>
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

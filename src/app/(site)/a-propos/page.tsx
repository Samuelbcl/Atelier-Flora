export const revalidate = 60;

import type { Metadata } from "next";
import Image from "next/image";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PAGE_A_PROPOS_QUERY } from "@/sanity/queries";
import PortableTextRenderer from "@/components/portable-text-renderer";
import HeroSection from "@/components/hero-section";
import Equipe from "@/components/equipe";
import FadeIn from "@/components/fade-in";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SA = any;

interface PageAPropos {
  hero: { label: string; titre: string; sousTitre: string } | null;
  contenu: SA;
  valeurs: Array<{ _key: string; titre: string; texte: string }> | null;
  equipe: Array<{ _key: string; nom: string; role: string | null; photo: { image: SA; alt: string } | null; bio: string | null }> | null;
  images: Array<{ image: SA; alt: string }> | null;
  citationTexte: string | null;
  citationAuteur: string | null;
  seo: { metaTitre: string | null; metaDescription: string | null } | null;
}

const defaultValeurs = [
  { _key: "v1", titre: "La saisonnalit\u00e9", texte: "Nous travaillons au rythme des saisons. Chaque p\u00e9riode offre sa palette unique de couleurs et de textures." },
  { _key: "v2", titre: "L\u2019artisanat", texte: "Chaque bouquet est compos\u00e9 \u00e0 la main. Nous prenons le temps de cr\u00e9er des arrangements qui refl\u00e8tent notre savoir-faire." },
  { _key: "v3", titre: "Le local", texte: "Nos fleurs proviennent de producteurs fran\u00e7ais et europ\u00e9ens engag\u00e9s dans des pratiques agricoles responsables." },
  { _key: "v4", titre: "La durabilit\u00e9", texte: "Z\u00e9ro mousse florale synth\u00e9tique, emballages recycl\u00e9s \u2014 nous minimisons notre impact \u00e0 chaque \u00e9tape." },
];

export async function generateMetadata(): Promise<Metadata> {
  const data: PageAPropos | null = await client.fetch(PAGE_A_PROPOS_QUERY);
  return {
    title: data?.seo?.metaTitre || "\u00c0 propos",
    description: data?.seo?.metaDescription || "D\u00e9couvrez l'histoire d'Atelier Flora, fleuriste artisanale \u00e0 Paris.",
  };
}

export default async function APropos() {
  const data: PageAPropos | null = await client.fetch(PAGE_A_PROPOS_QUERY);
  const valeurs = data?.valeurs?.length ? data.valeurs : defaultValeurs;

  return (
    <>
      <HeroSection data={data?.hero} defaults={{ label: "Notre histoire", titre: "La passion des fleurs depuis toujours" }} />

      {/* Contenu */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <FadeIn>
            {data?.contenu ? (
              <PortableTextRenderer value={data.contenu} />
            ) : (
              <div className="space-y-4 text-charcoal/50 leading-relaxed">
                <h2 className="font-serif text-2xl md:text-3xl text-secondary mb-6 font-normal">Comment tout a commenc&eacute;</h2>
                <p>Atelier Flora est n&eacute; en 2020 d&rsquo;un r&ecirc;ve simple : rendre la beaut&eacute; des fleurs accessible &agrave; tous.</p>
                <p>Notre fondatrice a ouvert les portes de son propre atelier au c&oelig;ur de Paris, dans le Marais.</p>
              </div>
            )}
          </FadeIn>
          <FadeIn delay={0.2} className="aspect-[4/5] bg-cream overflow-hidden relative">
            {data?.images?.[0]?.image?.asset ? (
              <Image src={urlFor(data.images[0].image).width(600).height(750).url()} alt={data.images[0].alt || ""} fill className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full"><span className="text-charcoal/20 text-sm">Photo fondatrice</span></div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">Ce qui nous guide</p>
            <h2 className="font-serif text-3xl md:text-4xl text-secondary font-normal">Nos valeurs</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {valeurs.map((value, i) => (
              <FadeIn key={value._key} delay={i * 0.1}>
                <div className="p-8 bg-cream border border-primary/10">
                  <h3 className="font-serif text-xl text-secondary mb-3">{value.titre}</h3>
                  <p className="text-charcoal/50 leading-relaxed text-sm">{value.texte}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      {data?.equipe && <Equipe equipe={data.equipe} />}

      {/* Galerie */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-secondary font-normal">L&rsquo;atelier en images</h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {data?.images && data.images.length > 0
              ? data.images.map((img, i) => (
                  <FadeIn key={i} delay={i * 0.05} className={`overflow-hidden relative ${i === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"}`}>
                    {img.image?.asset ? (
                      <Image src={urlFor(img.image).width(i === 0 ? 800 : 400).height(i === 0 ? 800 : 400).url()} alt={img.alt || ""} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-cream flex items-center justify-center"><span className="text-charcoal/20 text-sm">Photo {i + 1}</span></div>
                    )}
                  </FadeIn>
                ))
              : Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className={`bg-cream flex items-center justify-center ${i === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"}`}>
                    <span className="text-charcoal/20 text-sm">Photo {i + 1}</span>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Citation */}
      <section className="py-24 md:py-32 bg-secondary text-white">
        <FadeIn className="mx-auto max-w-3xl px-6 text-center">
          <blockquote className="font-serif text-2xl md:text-3xl italic leading-relaxed font-normal">
            &laquo; {data?.citationTexte || "Les fleurs ne sont pas seulement belles, elles sont porteuses d\u2019\u00e9motions. C\u2019est ce qui rend notre m\u00e9tier si extraordinaire."} &raquo;
          </blockquote>
          <p className="mt-8 text-white/50 font-medium tracking-wide">
            &mdash; {data?.citationAuteur || "Clara Dumont, fondatrice d\u2019Atelier Flora"}
          </p>
        </FadeIn>
      </section>
    </>
  );
}

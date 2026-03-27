export const revalidate = 60;

import type { Metadata } from "next";
import Image from "next/image";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PAGE_A_PROPOS_QUERY } from "@/sanity/queries";
import PortableTextRenderer from "@/components/portable-text-renderer";
import HeroSection from "@/components/hero-section";
import Equipe from "@/components/equipe";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SA = any;

interface PageAPropos {
  hero: { label: string; titre: string; sousTitre: string } | null;
  contenu: SA;
  valeurs: Array<{ _key: string; icone: string; titre: string; texte: string }> | null;
  equipe: Array<{ _key: string; nom: string; role: string | null; photo: { image: SA; alt: string } | null; bio: string | null }> | null;
  images: Array<{ image: SA; alt: string }> | null;
  citationTexte: string | null;
  citationAuteur: string | null;
  seo: { metaTitre: string | null; metaDescription: string | null } | null;
}

const defaultValeurs = [
  { _key: "v1", icone: "", titre: "La saisonnalit\u00e9", texte: "Nous travaillons au rythme des saisons. Chaque p\u00e9riode offre sa palette unique de couleurs et de textures." },
  { _key: "v2", icone: "", titre: "L\u2019artisanat", texte: "Chaque bouquet est compos\u00e9 \u00e0 la main. Nous prenons le temps de cr\u00e9er des arrangements qui refl\u00e8tent notre savoir-faire." },
  { _key: "v3", icone: "", titre: "Le local", texte: "Nos fleurs proviennent de producteurs fran\u00e7ais et europ\u00e9ens engag\u00e9s dans des pratiques agricoles responsables." },
  { _key: "v4", icone: "", titre: "La durabilit\u00e9", texte: "Z\u00e9ro mousse florale synth\u00e9tique, emballages recycl\u00e9s \u2014 nous minimisons notre impact \u00e0 chaque \u00e9tape." },
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
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            {data?.contenu ? (
              <PortableTextRenderer value={data.contenu} />
            ) : (
              <div className="space-y-4 text-charcoal/60 leading-relaxed">
                <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6">Comment tout a commenc&eacute;</h2>
                <p>Atelier Flora est n&eacute; en 2020 d&rsquo;un r&ecirc;ve simple : rendre la beaut&eacute; des fleurs accessible &agrave; tous.</p>
                <p>Notre fondatrice a ouvert les portes de son propre atelier au c&oelig;ur de Paris, dans le Marais.</p>
              </div>
            )}
          </div>
          <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center overflow-hidden relative">
            {data?.images?.[0]?.image?.asset ? (
              <Image src={urlFor(data.images[0].image).width(600).height(750).url()} alt={data.images[0].alt || ""} fill className="object-cover" />
            ) : (
              <span className="text-charcoal/30 text-sm">Photo fondatrice</span>
            )}
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <p className="text-secondary font-medium tracking-widest uppercase text-sm mb-3">Ce qui nous guide</p>
            <h2 className="font-serif text-3xl md:text-4xl text-primary">Nos valeurs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {valeurs.map((value) => (
              <div key={value._key} className="p-8 rounded-2xl bg-cream/50 border border-primary/5">
                <h3 className="font-serif text-xl text-primary mb-3">{value.titre}</h3>
                <p className="text-charcoal/60 leading-relaxed text-sm">{value.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      {data?.equipe && <Equipe equipe={data.equipe} />}

      {/* Galerie photos */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-primary">L&rsquo;atelier en images</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data?.images && data.images.length > 0
              ? data.images.map((img, i) => (
                  <div key={i} className={`rounded-2xl overflow-hidden relative ${i === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"}`}>
                    {img.image?.asset ? (
                      <Image src={urlFor(img.image).width(i === 0 ? 800 : 400).height(i === 0 ? 800 : 400).url()} alt={img.alt || ""} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center"><span className="text-charcoal/30 text-sm">Photo {i + 1}</span></div>
                    )}
                  </div>
                ))
              : Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className={`rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center ${i === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"}`}>
                    <span className="text-charcoal/30 text-sm">Photo {i + 1}</span>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Citation */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <blockquote className="font-serif text-2xl md:text-3xl italic leading-relaxed">
            &laquo; {data?.citationTexte || "Les fleurs ne sont pas seulement belles, elles sont porteuses d\u2019\u00e9motions. C\u2019est ce qui rend notre m\u00e9tier si extraordinaire."} &raquo;
          </blockquote>
          <p className="mt-6 text-white/70 font-medium">
            &mdash; {data?.citationAuteur || "Clara Dumont, fondatrice d\u2019Atelier Flora"}
          </p>
        </div>
      </section>
    </>
  );
}

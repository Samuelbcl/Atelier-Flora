export const revalidate = 60;

import type { Metadata } from "next";
import Image from "next/image";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PAGE_MARIAGE_QUERY, SETTINGS_QUERY } from "@/sanity/queries";
import PortableTextRenderer from "@/components/portable-text-renderer";
import HeroSection from "@/components/hero-section";
import ContactForm from "@/components/contact-form";
import FadeIn from "@/components/fade-in";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SA = any;

interface PageMariage {
  hero: SA | null;
  introTexte: SA;
  services: Array<{ _key: string; titre: string; description: string; image: { image: SA; alt: string } | null }> | null;
  images: Array<{ image: SA; alt: string }> | null;
  temoignages: Array<{ _id: string; auteur: string; texte: string }> | null;
  contactTitre: string | null;
  contactTexte: string | null;
  seo: { metaTitre: string | null; metaDescription: string | null } | null;
}

interface Settings { telephone: string | null; email: string | null; adresse: string | null }

const defaultServices = [
  { _key: "s1", titre: "Bouquet de Mari\u00e9e", description: "Un bouquet sur mesure qui capture l\u2019essence de votre amour et compl\u00e8te votre tenue \u00e0 la perfection.", image: null },
  { _key: "s2", titre: "D\u00e9corations de la C\u00e9r\u00e9monie", description: "Des arches florales, des all\u00e9es fleuries et des autels magnifiquement d\u00e9cor\u00e9s pour une ambiance inoubliable.", image: null },
  { _key: "s3", titre: "Centres de Table", description: "Des compositions florales uniques pour embellir chaque table et enchanter vos invit\u00e9s.", image: null },
  { _key: "s4", titre: "D\u00e9corations de R\u00e9ception", description: "Transformez votre lieu de r\u00e9ception avec nos arrangements floraux artistiques et harmonieux.", image: null },
];

export async function generateMetadata(): Promise<Metadata> {
  const data: PageMariage | null = await client.fetch(PAGE_MARIAGE_QUERY);
  return {
    title: data?.seo?.metaTitre || "Mariage",
    description: data?.seo?.metaDescription || "Confiez la d\u00e9coration florale de votre mariage \u00e0 Bloom Club, fleuriste \u00e0 Li\u00e8ge.",
  };
}

export default async function Mariage() {
  const [data, settings] = await Promise.all([
    client.fetch<PageMariage | null>(PAGE_MARIAGE_QUERY),
    client.fetch<Settings | null>(SETTINGS_QUERY),
  ]);

  const services = data?.services?.length ? data.services : defaultServices;

  return (
    <>
      <HeroSection
        data={data?.hero}
        defaults={{ label: "Journ\u00e9e inoubliable", titre: "Mariage", sousTitre: "Ne laissez rien au hasard pour le plus beau jour de votre vie." }}
        large
      />

      {/* Introduction */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            {data?.introTexte ? (
              <PortableTextRenderer value={data.introTexte} />
            ) : (
              <div className="text-center space-y-6">
                <p className="text-charcoal/50 leading-relaxed text-lg">
                  Ne laissez rien au hasard pour le plus beau jour de votre vie. Confiez la d&eacute;coration florale de votre mariage &agrave; Bloom Club, fleuriste &eacute;l&eacute;gant et moderne &agrave; Li&egrave;ge.
                </p>
                <p className="text-charcoal/50 leading-relaxed">
                  Du bouquet de la mari&eacute;e aux d&eacute;corations de la voiture ou du lieu de c&eacute;l&eacute;bration, nous confectionnons, dans le respect de votre budget, tous types de cr&eacute;ations.
                </p>
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">Soins complets</p>
            <h2 className="font-serif text-3xl md:text-4xl text-secondary font-normal">Nos services floraux pour votre mariage</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {services.map((service, i) => (
              <FadeIn key={service._key} delay={i * 0.1}>
                <div className="flex gap-6">
                  {service.image?.image?.asset ? (
                    <div className="w-28 h-28 shrink-0 bg-white overflow-hidden relative">
                      <Image src={urlFor(service.image.image).width(200).height(200).url()} alt={service.image.alt || service.titre} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-28 h-28 shrink-0 bg-white flex items-center justify-center">
                      <div className="w-8 h-[1px] bg-primary" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-serif text-xl text-secondary mb-2">{service.titre}</h3>
                    <p className="text-charcoal/50 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-12 text-center">
            <p className="text-charcoal/50 text-sm leading-relaxed max-w-2xl mx-auto">
              Confiez la d&eacute;coration florale de votre mariage &agrave; Bloom Club et profitez d&rsquo;une exp&eacute;rience sans stress, o&ugrave; chaque d&eacute;tail est pris en charge avec soin et expertise.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Galerie photos — carousel style 2x2 */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          {data?.images && data.images.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {data.images.slice(0, 4).map((img, i) => (
                <FadeIn key={i} delay={i * 0.1} className="aspect-square overflow-hidden relative">
                  {img.image?.asset ? (
                    <Image src={urlFor(img.image).width(600).height(600).url()} alt={img.alt || ""} fill className="object-cover hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-cream" />
                  )}
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-white flex items-center justify-center">
                  <span className="text-charcoal/20 text-sm">Photo mariage {i}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Témoignages */}
      {data?.temoignages && data.temoignages.length > 0 ? (
        <section className="py-24 md:py-32 bg-cream">
          <div className="mx-auto max-w-4xl px-6">
            <FadeIn className="text-center mb-16">
              <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">T&eacute;moignages</p>
              <h2 className="font-serif text-3xl md:text-4xl text-secondary font-normal">Nos clients parlent</h2>
            </FadeIn>
            <div className="space-y-10">
              {data.temoignages.map((t, i) => (
                <FadeIn key={t._id} delay={i * 0.1}>
                  <blockquote className="text-center">
                    <div className="w-10 h-[1px] bg-primary mx-auto mb-6" />
                    <p className="text-charcoal/60 leading-relaxed italic text-lg">&laquo; {t.texte} &raquo;</p>
                    <p className="mt-4 font-serif text-secondary">{t.auteur}</p>
                  </blockquote>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-24 md:py-32 bg-cream">
          <div className="mx-auto max-w-4xl px-6">
            <FadeIn className="text-center mb-16">
              <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">T&eacute;moignages</p>
              <h2 className="font-serif text-3xl md:text-4xl text-secondary font-normal">Nos clients parlent</h2>
            </FadeIn>
            <div className="space-y-10">
              {[
                { auteur: "Marie & Thomas", texte: "Bloom Club a sublim\u00e9 notre mariage. Le bouquet de mari\u00e9e \u00e9tait exactement ce dont je r\u00eavais, et la d\u00e9coration de la salle \u00e9tait \u00e0 couper le souffle." },
                { auteur: "Sophie & Laurent", texte: "Un professionnalisme remarquable du premier rendez-vous jusqu\u2019au jour J. Chaque d\u00e9tail floral \u00e9tait parfait. Merci pour cette journ\u00e9e magique." },
              ].map((t, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <blockquote className="text-center">
                    <div className="w-10 h-[1px] bg-primary mx-auto mb-6" />
                    <p className="text-charcoal/60 leading-relaxed italic text-lg">&laquo; {t.texte} &raquo;</p>
                    <p className="mt-4 font-serif text-secondary">{t.auteur}</p>
                  </blockquote>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="py-24 md:py-32 bg-secondary text-white">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          <FadeIn>
            <p className="text-primary-light font-medium tracking-[0.2em] uppercase text-sm mb-4">Rendez-vous</p>
            <h2 className="font-serif text-3xl md:text-4xl font-normal mb-6">
              {data?.contactTitre || "Nous aimons vous aider"}
            </h2>
            <p className="text-white/60 leading-relaxed mb-10">
              {data?.contactTexte || "Prenez rendez-vous pour une consultation personnalis\u00e9e. Nous discuterons de vos envies, de votre th\u00e8me et de votre budget pour cr\u00e9er la d\u00e9coration florale parfaite."}
            </p>
            <div className="space-y-4 text-white/50 text-sm">
              <p>{settings?.telephone || "+32 (0)4 123 45 67"}</p>
              <p>{settings?.email || "contact@bloomclub.be"}</p>
              <p className="whitespace-pre-line">{settings?.adresse || "Rue des Guillemins, 27\n4000 Li\u00e8ge"}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <ContactForm sujets={["Mariage", "Demande de devis", "Rendez-vous", "Autre"]} />
          </FadeIn>
        </div>
      </section>
    </>
  );
}

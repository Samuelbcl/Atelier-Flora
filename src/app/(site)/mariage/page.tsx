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
  { _key: "s1", titre: "Bouquet de mari\u00e9e", description: "Un bouquet unique, cr\u00e9\u00e9 sur mesure pour refl\u00e9ter votre personnalit\u00e9 et le th\u00e8me de votre mariage.", image: null },
  { _key: "s2", titre: "D\u00e9coration de c\u00e9r\u00e9monie", description: "Arche florale, bout de banc, p\u00e9tales \u2014 nous habillons votre lieu de c\u00e9r\u00e9monie avec \u00e9l\u00e9gance.", image: null },
  { _key: "s3", titre: "Centres de table", description: "Des compositions qui subliment vos tables tout en laissant vos invit\u00e9s se voir et \u00e9changer.", image: null },
  { _key: "s4", titre: "D\u00e9coration de r\u00e9ception", description: "Du cocktail au dessert, une ambiance florale coh\u00e9rente et raffin\u00e9e pour votre r\u00e9ception.", image: null },
];

export async function generateMetadata(): Promise<Metadata> {
  const data: PageMariage | null = await client.fetch(PAGE_MARIAGE_QUERY);
  return {
    title: data?.seo?.metaTitre || "Mariage",
    description: data?.seo?.metaDescription || "Confiez la d\u00e9coration florale de votre mariage \u00e0 Atelier Flora.",
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
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeIn>
            {data?.introTexte ? (
              <PortableTextRenderer value={data.introTexte} />
            ) : (
              <p className="text-charcoal/50 leading-relaxed text-lg">
                Confiez la d&eacute;coration florale de votre mariage &agrave; Atelier Flora. De la conception &agrave; l&rsquo;installation, nous cr&eacute;ons une ambiance florale unique qui refl&egrave;te votre histoire d&rsquo;amour.
              </p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <FadeIn key={service._key} delay={i * 0.1}>
                <div className="flex gap-6">
                  {service.image?.image?.asset ? (
                    <div className="w-24 h-24 shrink-0 bg-cream overflow-hidden relative">
                      <Image src={urlFor(service.image.image).width(200).height(200).url()} alt={service.image.alt || service.titre} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 shrink-0 bg-cream" />
                  )}
                  <div>
                    <h3 className="font-serif text-xl text-secondary mb-2">{service.titre}</h3>
                    <p className="text-charcoal/50 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Galerie photos */}
      {data?.images && data.images.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 gap-3">
              {data.images.map((img, i) => (
                <FadeIn key={i} delay={i * 0.1} className="aspect-square overflow-hidden relative">
                  {img.image?.asset ? (
                    <Image src={urlFor(img.image).width(600).height(600).url()} alt={img.alt || ""} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-cream" />
                  )}
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Témoignages */}
      {data?.temoignages && data.temoignages.length > 0 && (
        <section className="py-24 md:py-32 bg-cream">
          <div className="mx-auto max-w-4xl px-6">
            <FadeIn className="text-center mb-16">
              <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">T&eacute;moignages</p>
              <h2 className="font-serif text-3xl md:text-4xl text-secondary font-normal">Nos clients parlent</h2>
            </FadeIn>
            <div className="space-y-8">
              {data.temoignages.map((t, i) => (
                <FadeIn key={t._id} delay={i * 0.1}>
                  <blockquote className="text-center">
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
              <p>{settings?.telephone || "01 23 45 67 89"}</p>
              <p>{settings?.email || "contact@atelier-flora.fr"}</p>
              <p className="whitespace-pre-line">{settings?.adresse || "12 rue des Fleurs\n75004 Paris"}</p>
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

export const revalidate = 60;

import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { SETTINGS_QUERY, PAGE_CONTACT_QUERY } from "@/sanity/queries";
import HeroSection from "@/components/hero-section";
import ContactForm from "@/components/contact-form";
import FadeIn from "@/components/fade-in";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SA = any;

interface Settings { adresse: string | null; telephone: string | null; email: string | null; horaires: Array<{ _key: string; jour: string; heures: string }> | null }
interface PageContact { hero: SA | null; introTexte: string | null; sujetsFormulaire: string[] | null; seo: { metaTitre: string | null; metaDescription: string | null } | null }

const defaultHoraires = [
  { _key: "h1", jour: "Lundi \u2013 Vendredi", heures: "9h \u2013 19h" },
  { _key: "h2", jour: "Samedi", heures: "9h \u2013 18h" },
  { _key: "h3", jour: "Dimanche", heures: "Ferm\u00e9" },
];
const defaultSujets = ["Commande sur mesure", "Mariage", "\u00c9v\u00e9nement", "Renseignement", "Autre"];

export async function generateMetadata(): Promise<Metadata> {
  const data: PageContact | null = await client.fetch(PAGE_CONTACT_QUERY);
  return {
    title: data?.seo?.metaTitre || "Contact",
    description: data?.seo?.metaDescription || "Contactez Bloom Club pour vos commandes sur mesure.",
  };
}

export default async function Contact() {
  const [settings, pageData] = await Promise.all([
    client.fetch<Settings | null>(SETTINGS_QUERY),
    client.fetch<PageContact | null>(PAGE_CONTACT_QUERY),
  ]);

  const horaires = settings?.horaires?.length ? settings.horaires : defaultHoraires;
  const sujets = pageData?.sujetsFormulaire?.length ? pageData.sujetsFormulaire : defaultSujets;

  return (
    <>
      <HeroSection
        data={pageData?.hero}
        defaults={{ label: "Parlons fleurs", titre: "Contactez-nous", sousTitre: "Une question, une commande sur mesure ou un \u00e9v\u00e9nement \u00e0 fleurir ? Nous sommes \u00e0 votre \u00e9coute." }}
      />

      <section className="py-24 md:py-32 bg-cream">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Informations */}
          <FadeIn className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-serif text-2xl text-secondary mb-8 font-normal">Nos coordonn&eacute;es</h2>
              <div className="space-y-8">
                <div>
                  <p className="font-serif text-lg text-secondary mb-2">Adresse</p>
                  <p className="text-charcoal/50 text-sm leading-relaxed whitespace-pre-line">{settings?.adresse || "12 rue des Fleurs\n75004 Paris"}</p>
                </div>
                <div>
                  <p className="font-serif text-lg text-secondary mb-2">T&eacute;l&eacute;phone</p>
                  <p className="text-charcoal/50 text-sm">{settings?.telephone || "01 23 45 67 89"}</p>
                </div>
                <div>
                  <p className="font-serif text-lg text-secondary mb-2">Email</p>
                  <p className="text-charcoal/50 text-sm">{settings?.email || "contact@bloomclub.fr"}</p>
                </div>
              </div>
            </div>

            {pageData?.introTexte && (
              <p className="text-charcoal/50 text-sm leading-relaxed">{pageData.introTexte}</p>
            )}

            <div>
              <p className="font-serif text-lg text-secondary mb-4">Horaires</p>
              <div className="space-y-2 text-sm">
                {horaires.map((item) => (
                  <div key={item._key} className="flex justify-between py-3 border-b border-primary/10">
                    <span className="text-charcoal/50">{item.jour}</span>
                    <span className="font-medium text-secondary">{item.heures}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Formulaire */}
          <FadeIn delay={0.2} className="lg:col-span-3">
            <ContactForm sujets={sujets} />
          </FadeIn>
        </div>
      </section>
    </>
  );
}

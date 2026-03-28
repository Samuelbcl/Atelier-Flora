export const revalidate = 60;

import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { SETTINGS_QUERY, PAGE_CONTACT_QUERY } from "@/sanity/queries";
import HeroSection from "@/components/hero-section";
import ContactForm from "@/components/contact-form";

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
    description: data?.seo?.metaDescription || "Contactez Atelier Flora pour vos commandes sur mesure.",
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

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Informations */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-serif text-2xl text-primary mb-6">Nos coordonn&eacute;es</h2>
              <div className="space-y-6">
                <div>
                  <p className="font-serif text-lg text-primary mb-1">Adresse</p>
                  <p className="text-charcoal/60 text-sm leading-relaxed whitespace-pre-line">{settings?.adresse || "12 rue des Fleurs\n75004 Paris"}</p>
                </div>
                <div>
                  <p className="font-serif text-lg text-primary mb-1">T&eacute;l&eacute;phone</p>
                  <p className="text-charcoal/60 text-sm">{settings?.telephone || "01 23 45 67 89"}</p>
                </div>
                <div>
                  <p className="font-serif text-lg text-primary mb-1">Email</p>
                  <p className="text-charcoal/60 text-sm">{settings?.email || "contact@atelier-flora.fr"}</p>
                </div>
              </div>
            </div>

            {pageData?.introTexte && (
              <p className="text-charcoal/60 text-sm leading-relaxed">{pageData.introTexte}</p>
            )}

            <div>
              <h3 className="font-serif text-xl text-primary mb-4">Horaires</h3>
              <div className="space-y-2 text-sm">
                {horaires.map((item) => (
                  <div key={item._key} className="flex justify-between py-2 border-b border-primary/5">
                    <span className="text-charcoal/70">{item.jour}</span>
                    <span className="font-medium text-charcoal">{item.heures}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center">
              <span className="text-charcoal/30 text-sm">Carte Google Maps</span>
            </div>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-3">
            <ContactForm sujets={sujets} />
          </div>
        </div>
      </section>
    </>
  );
}

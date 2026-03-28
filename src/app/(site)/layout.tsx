import Link from "next/link";
import Header from "@/components/header";
import { client } from "@/sanity/client";
import { SETTINGS_QUERY } from "@/sanity/queries";

interface Settings {
  nomDuSite: string | null;
  adresse: string | null;
  telephone: string | null;
  email: string | null;
  reseauxSociaux: Array<{ _key: string; plateforme: string; url: string }> | null;
  footerDescription: string | null;
}

const footerNav = [
  { name: "Accueil", href: "/" },
  { name: "\u00c0 propos", href: "/a-propos" },
  { name: "Populaire", href: "/fleurs/populaire" },
  { name: "Bouquets", href: "/fleurs/bouquets" },
  { name: "Mariage", href: "/fleurs/mariage" },
  { name: "Contact", href: "/contact" },
];

const socialLabels: Record<string, string> = {
  facebook: "Fb",
  instagram: "Ig",
  pinterest: "Pi",
  tiktok: "Tk",
  linkedin: "Li",
};

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings: Settings | null = await client.fetch(SETTINGS_QUERY);
  const siteName = settings?.nomDuSite || "Atelier Flora";

  return (
    <>
      <Header siteName={siteName} />
      <main className="flex-1">{children}</main>

      <footer className="border-t border-primary/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <p className="font-serif text-xl text-secondary">{siteName}</p>
              <p className="mt-4 text-sm text-charcoal/50 leading-relaxed max-w-xs">
                {settings?.footerDescription || "Fleuriste artisanale \u00e0 Paris. Bouquets sur mesure, compositions florales et cr\u00e9ations uniques."}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-secondary mb-5">Navigation</p>
              <ul className="space-y-3">
                {footerNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-charcoal/50 hover:text-secondary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-secondary mb-5">Contact</p>
              <address className="not-italic text-sm text-charcoal/50 space-y-3">
                <p className="whitespace-pre-line">{settings?.adresse || "12 rue des Fleurs, 75004 Paris"}</p>
                <p>{settings?.telephone || "01 23 45 67 89"}</p>
                <p>{settings?.email || "contact@atelier-flora.fr"}</p>
              </address>
              {settings?.reseauxSociaux && settings.reseauxSociaux.length > 0 && (
                <div className="mt-6 flex gap-4">
                  {settings.reseauxSociaux.map((s) => (
                    <a key={s._key} href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm text-charcoal/40 hover:text-secondary transition-colors uppercase tracking-wider font-medium">
                      {socialLabels[s.plateforme] || s.plateforme}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-primary/10 text-center">
            <p className="text-xs text-charcoal/30">&copy; {new Date().getFullYear()} {siteName}. Tous droits r&eacute;serv&eacute;s.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

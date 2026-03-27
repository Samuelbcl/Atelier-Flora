import Link from "next/link";
import Header from "@/components/header";
import { client } from "@/sanity/client";
import { SETTINGS_QUERY } from "@/sanity/queries";

interface Settings {
  adresse: string | null;
  telephone: string | null;
  email: string | null;
  reseauxSociaux: Array<{ _key: string; plateforme: string; url: string }> | null;
  footerDescription: string | null;
}

const footerNavigation = [
  { name: "Accueil", href: "/" },
  { name: "\u00c0 propos", href: "/a-propos" },
  { name: "Galerie", href: "/galerie" },
  { name: "Catalogue", href: "/catalogue" },
  { name: "Contact", href: "/contact" },
];

const socialLabels: Record<string, string> = {
  facebook: "Fb",
  instagram: "Ig",
  pinterest: "Pi",
  tiktok: "Tk",
  linkedin: "Li",
};

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings: Settings | null = await client.fetch(SETTINGS_QUERY);

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>

      <footer className="border-t border-primary/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <p className="font-serif text-xl text-primary font-bold">Atelier Flora</p>
              <p className="mt-3 text-sm text-charcoal/60 leading-relaxed max-w-xs">
                {settings?.footerDescription || "Fleuriste artisanale \u00e0 Paris. Bouquets sur mesure, compositions florales et cr\u00e9ations uniques pour toutes vos occasions."}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal mb-4">Navigation</p>
              <ul className="space-y-2.5">
                {footerNavigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-charcoal/50 hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal mb-4">Contact</p>
              <address className="not-italic text-sm text-charcoal/50 space-y-2.5">
                <p>{settings?.adresse || "12 rue des Fleurs, 75004 Paris"}</p>
                <p>{settings?.telephone || "01 23 45 67 89"}</p>
                <p>{settings?.email || "contact@atelier-flora.fr"}</p>
              </address>
              {settings?.reseauxSociaux && settings.reseauxSociaux.length > 0 && (
                <div className="mt-6 flex gap-3">
                  {settings.reseauxSociaux.map((social) => (
                    <a
                      key={social._key}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                    >
                      {socialLabels[social.plateforme] || social.plateforme}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-primary/5 text-center">
            <p className="text-xs text-charcoal/30">
              &copy; {new Date().getFullYear()} Atelier Flora. Tous droits r&eacute;serv&eacute;s.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

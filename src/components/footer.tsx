import Link from "next/link";

interface FooterColumn {
  _key: string;
  titre: string;
  liens: Array<{ _key: string; label: string; lien: string }> | null;
}

interface SocialLink {
  _key: string;
  plateforme: string;
  url: string;
}

interface FooterProps {
  siteName: string;
  settings: {
    footerConfig?: {
      style?: string;
      description?: string | null;
      copyright?: string | null;
      colonnes?: FooterColumn[] | null;
      reseauxSociaux?: SocialLink[] | null;
    } | null;
    adresse?: string | null;
    telephone?: string | null;
    email?: string | null;
  } | null;
}

const socialLabels: Record<string, string> = {
  facebook: "Fb",
  instagram: "Ig",
  pinterest: "Pi",
  tiktok: "Tk",
  linkedin: "Li",
};

const defaultColumns: FooterColumn[] = [
  {
    _key: "nav",
    titre: "Navigation",
    liens: [
      { _key: "1", label: "Accueil", lien: "/" },
      { _key: "2", label: "À propos", lien: "/a-propos" },
      { _key: "3", label: "Populaire", lien: "/fleurs/populaire" },
      { _key: "4", label: "Bouquets", lien: "/fleurs/bouquets" },
      { _key: "5", label: "Mariage", lien: "/fleurs/mariage" },
      { _key: "6", label: "Contact", lien: "/contact" },
    ],
  },
];

export default function Footer({ siteName, settings }: FooterProps) {
  const footer = settings?.footerConfig;
  const colonnes = footer?.colonnes?.length ? footer.colonnes : defaultColumns;
  const socials = footer?.reseauxSociaux;
  const description = footer?.description || "Fleuriste artisanale à Liège. Bouquets sur mesure, compositions florales et créations uniques.";
  const copyright = footer?.copyright || `${new Date().getFullYear()} ${siteName}. Tous droits réservés.`;

  return (
    <footer className="border-t border-primary/10 bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className={`grid grid-cols-1 gap-12 ${colonnes.length > 0 ? "md:grid-cols-" + (colonnes.length + 2) : "md:grid-cols-3"}`}>
          {/* Brand */}
          <div>
            <p className="font-serif text-xl text-secondary">{siteName}</p>
            <p className="mt-4 text-sm text-charcoal/50 leading-relaxed max-w-xs">
              {description}
            </p>
          </div>

          {/* Dynamic columns */}
          {colonnes.map((col) => (
            <div key={col._key}>
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-secondary mb-5">
                {col.titre}
              </p>
              <ul className="space-y-3">
                {col.liens?.map((item) => (
                  <li key={item._key}>
                    <Link
                      href={item.lien}
                      className="text-sm text-charcoal/50 hover:text-secondary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-secondary mb-5">
              Contact
            </p>
            <address className="not-italic text-sm text-charcoal/50 space-y-3">
              <p className="whitespace-pre-line">
                {settings?.adresse || "Rue des Guillemins, 27\n4000 Liège"}
              </p>
              <p>{settings?.telephone || "+32 (0)4 123 45 67"}</p>
              <p>{settings?.email || "contact@bloomclub.be"}</p>
            </address>
            {socials && socials.length > 0 && (
              <div className="mt-6 flex gap-4">
                {socials.map((s) => (
                  <a
                    key={s._key}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-charcoal/40 hover:text-secondary transition-colors uppercase tracking-wider font-medium"
                  >
                    {socialLabels[s.plateforme] || s.plateforme}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary/10 text-center">
          <p className="text-xs text-charcoal/30">&copy; {copyright}</p>
        </div>
      </div>
    </footer>
  );
}

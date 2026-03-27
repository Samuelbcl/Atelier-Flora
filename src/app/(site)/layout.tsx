import Link from "next/link";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "À propos", href: "/a-propos" },
  { name: "Galerie", href: "/galerie" },
  { name: "Catalogue", href: "/catalogue" },
  { name: "Contact", href: "/contact" },
];

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-primary/10 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl text-primary font-bold">
            Atelier Flora
          </Link>
          <ul className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-charcoal/70 hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-primary/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <p className="font-serif text-xl text-primary font-bold">
                Atelier Flora
              </p>
              <p className="mt-2 text-sm text-charcoal/60">
                Fleuriste artisanale &mdash; Bouquets sur mesure
              </p>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Navigation</p>
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-charcoal/60 hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Contact</p>
              <address className="not-italic text-sm text-charcoal/60 space-y-1">
                <p>12 rue des Fleurs, 75004 Paris</p>
                <p>01 23 45 67 89</p>
                <p>contact@atelier-flora.fr</p>
              </address>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-charcoal/40">
            &copy; {new Date().getFullYear()} Atelier Flora. Tous droits
            r&eacute;serv&eacute;s.
          </p>
        </div>
      </footer>
    </>
  );
}

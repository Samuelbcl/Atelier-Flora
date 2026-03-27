import Link from "next/link";
import Header from "@/components/header";

const footerNavigation = [
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
      <Header />

      <main className="flex-1">{children}</main>

      <footer className="border-t border-primary/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <p className="font-serif text-xl text-primary font-bold">
                Atelier Flora
              </p>
              <p className="mt-3 text-sm text-charcoal/60 leading-relaxed max-w-xs">
                Fleuriste artisanale &agrave; Paris. Bouquets sur mesure,
                compositions florales et cr&eacute;ations uniques pour toutes
                vos occasions.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal mb-4">
                Navigation
              </p>
              <ul className="space-y-2.5">
                {footerNavigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-charcoal/50 hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal mb-4">
                Contact
              </p>
              <address className="not-italic text-sm text-charcoal/50 space-y-2.5">
                <p>12 rue des Fleurs, 75004 Paris</p>
                <p>01 23 45 67 89</p>
                <p>contact@atelier-flora.fr</p>
              </address>
              <div className="mt-6 flex gap-4">
                <span className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm cursor-pointer hover:bg-primary/20 transition-colors">
                  f
                </span>
                <span className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm cursor-pointer hover:bg-primary/20 transition-colors">
                  in
                </span>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-primary/5 text-center">
            <p className="text-xs text-charcoal/30">
              &copy; {new Date().getFullYear()} Atelier Flora. Tous droits
              r&eacute;serv&eacute;s.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

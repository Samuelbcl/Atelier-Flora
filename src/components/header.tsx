"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "\u00c0 propos", href: "/a-propos" },
  { name: "Galerie", href: "/galerie" },
  { name: "Catalogue", href: "/catalogue" },
  { name: "Mariage", href: "/mariage" },
  { name: "Contact", href: "/contact" },
];

export default function Header({ siteName = "Atelier Flora" }: { siteName?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="border-b border-primary/10 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-2xl text-secondary tracking-wide"
          onClick={() => setMobileOpen(false)}
        >
          {siteName}
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-10">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`text-sm tracking-wide transition-colors duration-300 ${
                  pathname === item.href
                    ? "text-secondary font-medium"
                    : "text-charcoal/50 hover:text-secondary"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Burger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
        >
          <span className={`block w-5 h-[1.5px] bg-secondary transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[4.5px]" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-secondary transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-secondary transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[4.5px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-80" : "max-h-0"}`}>
        <ul className="px-6 pb-6 space-y-1">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-3 text-base border-b border-primary/5 transition-colors ${
                  pathname === item.href
                    ? "text-secondary font-medium"
                    : "text-charcoal/50 hover:text-secondary"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

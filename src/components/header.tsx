"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const fleursLinks = [
  { name: "Populaire", href: "/fleurs/populaire" },
  { name: "Bouquets", href: "/fleurs/bouquets" },
  { name: "Bouquet de saison", href: "/fleurs/bouquet-de-saison" },
  { name: "Deuil", href: "/fleurs/deuil" },
  { name: "Mariage", href: "/fleurs/mariage" },
  { name: "Roses", href: "/fleurs/roses" },
];

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "\u00c0 propos", href: "/a-propos" },
  { name: "Contact", href: "/contact" },
];

export default function Header({ siteName = "Atelier Flora" }: { siteName?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [fleursOpen, setFleursOpen] = useState(false);
  const [mobileFleursOpen, setMobileFleursOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setFleursOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isFleurs = pathname.startsWith("/fleurs");

  return (
    <header className="border-b border-primary/10 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-2xl text-secondary tracking-wide"
          onClick={() => { setMobileOpen(false); setFleursOpen(false); }}
        >
          {siteName}
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-10">
          {/* Fleurs dropdown */}
          <li ref={dropdownRef} className="relative">
            <button
              onMouseEnter={() => setFleursOpen(true)}
              onClick={() => setFleursOpen(!fleursOpen)}
              className={`text-sm tracking-wide transition-colors duration-300 flex items-center gap-1 ${
                isFleurs ? "text-secondary font-medium" : "text-charcoal/50 hover:text-secondary"
              }`}
            >
              Fleurs
              <svg className={`w-3 h-3 transition-transform duration-200 ${fleursOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {fleursOpen && (
              <div
                onMouseLeave={() => setFleursOpen(false)}
                className="absolute top-full left-0 mt-2 bg-white border border-primary/10 shadow-lg py-2 min-w-[200px]"
              >
                {fleursLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setFleursOpen(false)}
                    className={`block px-5 py-2.5 text-sm transition-colors ${
                      pathname === item.href
                        ? "text-secondary font-medium bg-cream/50"
                        : "text-charcoal/50 hover:text-secondary hover:bg-cream/30"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </li>

          {/* Other links */}
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
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-[500px]" : "max-h-0"}`}>
        <ul className="px-6 pb-6 space-y-1">
          {/* Fleurs accordion */}
          <li>
            <button
              onClick={() => setMobileFleursOpen(!mobileFleursOpen)}
              className={`w-full flex items-center justify-between py-3 text-base border-b border-primary/5 transition-colors ${
                isFleurs ? "text-secondary font-medium" : "text-charcoal/50"
              }`}
            >
              Fleurs
              <svg className={`w-4 h-4 transition-transform duration-200 ${mobileFleursOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${mobileFleursOpen ? "max-h-[300px]" : "max-h-0"}`}>
              {fleursLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => { setMobileOpen(false); setMobileFleursOpen(false); }}
                  className={`block py-2.5 pl-4 text-sm border-b border-primary/5 transition-colors ${
                    pathname === item.href
                      ? "text-secondary font-medium"
                      : "text-charcoal/40 hover:text-secondary"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </li>

          {/* Other links */}
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

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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setFleursOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setFleursOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setFleursOpen(false), 200);
  };

  const isFleurs = pathname.startsWith("/fleurs");

  return (
    <>
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
            <li
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setFleursOpen(!fleursOpen)}
                className={`text-sm tracking-wide transition-colors duration-300 flex items-center gap-1.5 ${
                  isFleurs ? "text-secondary font-medium" : "text-charcoal/50 hover:text-secondary"
                }`}
              >
                Fleurs
                <svg className={`w-3 h-3 transition-transform duration-200 ${fleursOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </li>

            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm tracking-wide transition-colors duration-300 ${
                    pathname === item.href ? "text-secondary font-medium" : "text-charcoal/50 hover:text-secondary"
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
                      pathname === item.href ? "text-secondary font-medium" : "text-charcoal/40 hover:text-secondary"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </li>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-3 text-base border-b border-primary/5 transition-colors ${
                    pathname === item.href ? "text-secondary font-medium" : "text-charcoal/50 hover:text-secondary"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Mega menu desktop — full width under header */}
      {fleursOpen && (
        <div
          className="hidden md:block fixed top-[73px] left-0 right-0 z-40 bg-white border-b border-primary/10 shadow-lg"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-3 gap-10">
            {/* Links column */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/30 mb-5">
                Type de fleurs
              </p>
              <ul className="space-y-3">
                {fleursLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setFleursOpen(false)}
                      className={`text-base transition-colors duration-200 ${
                        pathname === item.href
                          ? "text-secondary font-medium"
                          : "text-charcoal/60 hover:text-secondary"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image placeholders — 2 featured categories (entire card clickable) */}
            <Link
              href="/fleurs/bouquet-de-saison"
              onClick={() => setFleursOpen(false)}
              className="group aspect-[4/5] bg-cream overflow-hidden relative flex items-end p-6 cursor-pointer"
            >
              <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/5 transition-all duration-300" />
              <span className="relative z-10 font-serif text-xl text-secondary group-hover:text-primary transition-colors">
                Bouquet de saison
              </span>
            </Link>
            <Link
              href="/fleurs/populaire"
              onClick={() => setFleursOpen(false)}
              className="group aspect-[4/5] bg-cream overflow-hidden relative flex items-end p-6 cursor-pointer"
            >
              <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/5 transition-all duration-300" />
              <span className="relative z-10 font-serif text-xl text-secondary group-hover:text-primary transition-colors">
                Populaire
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

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

export default function Header({ siteName = "Atelier Flora", logoUrl }: { siteName?: string; logoUrl?: string | null }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [fleursOpen, setFleursOpen] = useState(false);
  const [mobileFleursOpen, setMobileFleursOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isHome = pathname === "/";

  // Track scroll position
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll(); // check on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openFleurs = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setFleursOpen(true);
  };

  const closeFleurs = () => {
    timeoutRef.current = setTimeout(() => setFleursOpen(false), 150);
  };

  // Close on route change
  useEffect(() => {
    setFleursOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const isFleurs = pathname.startsWith("/fleurs");

  // Transparent header only on homepage when not scrolled
  const isTransparent = isHome && !scrolled && !mobileOpen;

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isTransparent
            ? "bg-transparent border-b border-white/10"
            : "bg-white/95 backdrop-blur-sm border-b border-primary/10 shadow-sm"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={siteName}
                className={`max-h-16 max-w-[200px] w-auto object-contain transition-all duration-500 ${
                  isTransparent ? "brightness-0 invert" : ""
                }`}
              />
            ) : (
              <span className={`font-serif text-2xl tracking-wide transition-colors duration-500 ${
                isTransparent ? "text-white" : "text-secondary"
              }`}>{siteName}</span>
            )}
          </Link>

          {/* Desktop */}
          <ul className="hidden md:flex items-center gap-10">
            <li
              onMouseEnter={openFleurs}
              onMouseLeave={closeFleurs}
            >
              <button
                onClick={() => setFleursOpen(!fleursOpen)}
                className={`text-sm tracking-wide transition-colors duration-300 flex items-center gap-1.5 py-2 ${
                  isTransparent
                    ? isFleurs ? "text-white font-medium" : "text-white/70 hover:text-white"
                    : isFleurs ? "text-secondary font-medium" : "text-charcoal/50 hover:text-secondary"
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
                    isTransparent
                      ? pathname === item.href ? "text-white font-medium" : "text-white/70 hover:text-white"
                      : pathname === item.href ? "text-secondary font-medium" : "text-charcoal/50 hover:text-secondary"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Burger */}
          <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5" aria-label={mobileOpen ? "Fermer" : "Menu"} aria-expanded={mobileOpen}>
            <span className={`block w-5 h-[1.5px] transition-all duration-300 ${isTransparent ? "bg-white" : "bg-secondary"} ${mobileOpen ? "rotate-45 translate-y-[4.5px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] transition-all duration-300 ${isTransparent ? "bg-white" : "bg-secondary"} ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[1.5px] transition-all duration-300 ${isTransparent ? "bg-white" : "bg-secondary"} ${mobileOpen ? "-rotate-45 -translate-y-[4.5px]" : ""}`} />
          </button>
        </nav>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-[500px]" : "max-h-0"}`}>
          <ul className="px-6 pb-6 space-y-1">
            <li>
              <button onClick={() => setMobileFleursOpen(!mobileFleursOpen)} className={`w-full flex items-center justify-between py-3 text-base border-b border-primary/5 ${isFleurs ? "text-secondary font-medium" : "text-charcoal/50"}`}>
                Fleurs
                <svg className={`w-4 h-4 transition-transform duration-200 ${mobileFleursOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileFleursOpen ? "max-h-[300px]" : "max-h-0"}`}>
                {fleursLinks.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => { setMobileOpen(false); setMobileFleursOpen(false); }} className={`block py-2.5 pl-4 text-sm border-b border-primary/5 ${pathname === item.href ? "text-secondary font-medium" : "text-charcoal/40 hover:text-secondary"}`}>
                    {item.name}
                  </Link>
                ))}
              </div>
            </li>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setMobileOpen(false)} className={`block py-3 text-base border-b border-primary/5 ${pathname === item.href ? "text-secondary font-medium" : "text-charcoal/50 hover:text-secondary"}`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Mega menu — pont invisible entre header et dropdown pour garder le hover */}
      {fleursOpen && (
        <div
          className="hidden md:block fixed top-[73px] left-0 right-0 z-40"
          onMouseEnter={openFleurs}
          onMouseLeave={closeFleurs}
        >
          <div className="h-0" />
          <div className="bg-white border-b border-primary/10 shadow-lg">
            <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-3 gap-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/30 mb-5">Type de fleurs</p>
                <ul className="space-y-3">
                  {fleursLinks.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} onClick={() => setFleursOpen(false)} className={`text-base transition-colors duration-200 ${pathname === item.href ? "text-secondary font-medium" : "text-charcoal/60 hover:text-secondary"}`}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/fleurs/bouquet-de-saison" onClick={() => setFleursOpen(false)} className="group aspect-[4/5] bg-cream overflow-hidden relative flex items-end p-6">
                <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/5 transition-all duration-300" />
                <span className="relative z-10 font-serif text-xl text-secondary group-hover:text-primary transition-colors">Bouquet de saison</span>
              </Link>
              <Link href="/fleurs/populaire" onClick={() => setFleursOpen(false)} className="group aspect-[4/5] bg-cream overflow-hidden relative flex items-end p-6">
                <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/5 transition-all duration-300" />
                <span className="relative z-10 font-serif text-xl text-secondary group-hover:text-primary transition-colors">Populaire</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavChild {
  _key: string;
  label: string;
  lien: string;
}

interface NavItem {
  _key: string;
  label: string;
  lien?: string;
  isButton?: boolean;
  children?: NavChild[] | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface MegaMenuProduct {
  nom: string;
  slug: string;
  catSlug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: { image: any; alt: string } | null;
}

interface HeaderProps {
  siteName?: string;
  logoUrl?: string | null;
  settings?: {
    headerConfig?: {
      style?: string;
      logoPosition?: string;
      showTopBar?: boolean;
      topBarText?: string;
      topBarBgColor?: { hex?: string } | null;
      navigationPrincipale?: NavItem[] | null;
    } | null;
  } | null;
  megaMenuProducts?: {
    populaire?: MegaMenuProduct | null;
    bouquetDeSaison?: MegaMenuProduct | null;
  } | null;
}

// Fallback navigation when nothing is configured in Sanity
const defaultNav: NavItem[] = [
  {
    _key: "fleurs",
    label: "Fleurs",
    children: [
      { _key: "1", label: "Populaire", lien: "/fleurs/populaire" },
      { _key: "2", label: "Bouquets", lien: "/fleurs/bouquets" },
      { _key: "3", label: "Bouquet de saison", lien: "/fleurs/bouquet-de-saison" },
      { _key: "4", label: "Deuil", lien: "/fleurs/deuil" },
      { _key: "5", label: "Mariage", lien: "/fleurs/mariage" },
      { _key: "6", label: "Roses", lien: "/fleurs/roses" },
    ],
  },
  { _key: "accueil", label: "Accueil", lien: "/" },
  { _key: "apropos", label: "À propos", lien: "/a-propos" },
  { _key: "contact", label: "Contact", lien: "/contact" },
];

export default function Header({ siteName = "Bloom Club", logoUrl, settings, megaMenuProducts }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const headerConfig = settings?.headerConfig;
  const headerStyle = headerConfig?.style || "transparent";
  const navItems = headerConfig?.navigationPrincipale?.length
    ? headerConfig.navigationPrincipale
    : defaultNav;

  const isHome = pathname === "/";
  const isTransparent = headerStyle === "transparent" && isHome && !scrolled && !mobileOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
  }, [pathname]);

  const openMenu = (key: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(key);
  };

  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const isActive = (lien?: string) => lien && pathname === lien;
  const isParentActive = (item: NavItem) =>
    item.children?.some((c) => pathname === c.lien || pathname.startsWith(c.lien));

  return (
    <>
      {/* Top bar */}
      {headerConfig?.showTopBar && headerConfig.topBarText && (
        <div
          className="text-center text-xs py-2 px-4 tracking-wide"
          style={{
            backgroundColor: headerConfig.topBarBgColor?.hex || "#312F22",
            color: "#fff",
          }}
        >
          {headerConfig.topBarText}
        </div>
      )}

      <header
        className="sticky top-0 z-50 transition-[background-color,box-shadow] duration-500"
        style={{
          backgroundColor: isTransparent ? "transparent" : "rgba(255,255,255,0.95)",
          backdropFilter: isTransparent ? "none" : "blur(4px)",
          boxShadow: isTransparent ? "none" : "0 1px 2px rgba(0,0,0,0.06)",
        }}
      >
        <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            {logoUrl ? (
              <img src={logoUrl} alt={siteName} className="h-20 w-auto object-contain -my-4" />
            ) : (
              <span className={`font-serif text-2xl tracking-wide transition-colors duration-500 ${isTransparent ? "text-white" : "text-secondary"}`}>
                {siteName}
              </span>
            )}
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-10">
            {navItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const active = isActive(item.lien) || isParentActive(item);

              if (hasChildren) {
                return (
                  <li
                    key={item._key}
                    onMouseEnter={() => openMenu(item._key)}
                    onMouseLeave={closeMenu}
                  >
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item._key ? null : item._key)}
                      className={`text-sm tracking-wide transition-colors duration-300 flex items-center gap-1.5 py-2 ${
                        isTransparent
                          ? active ? "text-white font-medium" : "text-white/70 hover:text-white"
                          : active ? "text-secondary font-medium" : "text-charcoal/50 hover:text-secondary"
                      }`}
                    >
                      {item.label}
                      <svg className={`w-3 h-3 transition-transform duration-200 ${openDropdown === item._key ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </li>
                );
              }

              return (
                <li key={item._key}>
                  {item.isButton ? (
                    <Link
                      href={item.lien || "/"}
                      className="bg-secondary text-white px-6 py-2 text-sm font-semibold uppercase tracking-[0.1em] hover:bg-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <Link
                      href={item.lien || "/"}
                      className={`text-sm tracking-wide transition-colors duration-300 ${
                        isTransparent
                          ? active ? "text-white font-medium" : "text-white/70 hover:text-white"
                          : active ? "text-secondary font-medium" : "text-charcoal/50 hover:text-secondary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Burger */}
          <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5" aria-label={mobileOpen ? "Fermer" : "Menu"} aria-expanded={mobileOpen}>
            <span className={`block w-5 h-[1.5px] transition-all duration-300 ${isTransparent ? "bg-white" : "bg-secondary"} ${mobileOpen ? "rotate-45 translate-y-[4.5px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] transition-all duration-300 ${isTransparent ? "bg-white" : "bg-secondary"} ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[1.5px] transition-all duration-300 ${isTransparent ? "bg-white" : "bg-secondary"} ${mobileOpen ? "-rotate-45 -translate-y-[4.5px]" : ""}`} />
          </button>
        </nav>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-[600px]" : "max-h-0"}`}>
          <ul className="px-6 pb-6 space-y-1">
            {navItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;

              if (hasChildren) {
                return (
                  <li key={item._key}>
                    <button
                      onClick={() => setMobileDropdown(mobileDropdown === item._key ? null : item._key)}
                      className={`w-full flex items-center justify-between py-3 text-base border-b border-primary/5 ${isParentActive(item) ? "text-secondary font-medium" : "text-charcoal/50"}`}
                    >
                      {item.label}
                      <svg className={`w-4 h-4 transition-transform duration-200 ${mobileDropdown === item._key ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${mobileDropdown === item._key ? "max-h-[400px]" : "max-h-0"}`}>
                      {item.children!.map((child) => (
                        <Link
                          key={child._key}
                          href={child.lien}
                          onClick={() => { setMobileOpen(false); setMobileDropdown(null); }}
                          className={`block py-2.5 pl-4 text-sm border-b border-primary/5 ${pathname === child.lien ? "text-secondary font-medium" : "text-charcoal/40 hover:text-secondary"}`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </li>
                );
              }

              return (
                <li key={item._key}>
                  <Link
                    href={item.lien || "/"}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-3 text-base border-b border-primary/5 ${isActive(item.lien) ? "text-secondary font-medium" : "text-charcoal/50 hover:text-secondary"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </header>

      {/* Mega menu dropdown */}
      {navItems.map((item) => {
        if (!item.children?.length || openDropdown !== item._key) return null;
        return (
          <div
            key={item._key}
            className="hidden md:block fixed top-[73px] left-0 right-0 z-40"
            onMouseEnter={() => openMenu(item._key)}
            onMouseLeave={closeMenu}
          >
            <div className="h-0" />
            <div className="bg-white border-b border-primary/10 shadow-lg">
              <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-3 gap-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/30 mb-5">{item.label}</p>
                  <ul className="space-y-3">
                    {item.children!.map((child) => (
                      <li key={child._key}>
                        <Link
                          href={child.lien}
                          onClick={() => setOpenDropdown(null)}
                          className={`text-base transition-colors duration-200 ${pathname === child.lien ? "text-secondary font-medium" : "text-charcoal/60 hover:text-secondary"}`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {item.children!.length >= 2 && (
                  <>
                    <MegaMenuCard
                      product={megaMenuProducts?.bouquetDeSaison}
                      fallbackLabel={item.children![2]?.label || item.children![0].label}
                      fallbackHref={item.children![2]?.lien || item.children![0].lien}
                      onClose={() => setOpenDropdown(null)}
                    />
                    <MegaMenuCard
                      product={megaMenuProducts?.populaire}
                      fallbackLabel={item.children![0].label}
                      fallbackHref={item.children![0].lien}
                      onClose={() => setOpenDropdown(null)}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

function MegaMenuCard({ product, fallbackLabel, fallbackHref, onClose }: {
  product?: MegaMenuProduct | null;
  fallbackLabel: string;
  fallbackHref: string;
  onClose: () => void;
}) {
  const href = product ? `/fleurs/${product.catSlug}/${product.slug}` : fallbackHref;
  const label = product?.nom || fallbackLabel;
  const imageUrl = product?.image?.image?.asset?.url;

  return (
    <Link href={href} onClick={onClose} className="group aspect-[4/5] bg-white overflow-hidden relative flex items-end p-6">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={product?.image?.alt || label}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <span className="relative z-10 font-serif text-xl text-white group-hover:text-primary-light transition-colors">{label}</span>
    </Link>
  );
}

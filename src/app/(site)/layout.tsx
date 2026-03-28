import Header from "@/components/header";
import Footer from "@/components/footer";
import ThemeProvider from "@/components/theme-provider";
import { client } from "@/sanity/client";
import { SETTINGS_QUERY, MEGA_MENU_PRODUCTS_QUERY } from "@/sanity/queries";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SA = any;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, megaMenuProducts]: [SA, SA] = await Promise.all([
    client.fetch(SETTINGS_QUERY),
    client.fetch(MEGA_MENU_PRODUCTS_QUERY),
  ]);
  const siteName = settings?.nomDuSite || "Bloom Club";
  const logoUrl = settings?.logo?.asset?.url || null;

  return (
    <ThemeProvider settings={settings}>
      <Header siteName={siteName} logoUrl={logoUrl} settings={settings} megaMenuProducts={megaMenuProducts} />
      <main className="flex-1">{children}</main>
      <Footer siteName={siteName} settings={settings} />
    </ThemeProvider>
  );
}

import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Atelier Flora | Fleuriste Artisanale Paris",
    template: "%s | Atelier Flora",
  },
  description:
    "Atelier Flora, fleuriste artisanale au coeur de Paris. Bouquets sur mesure, compositions florales et cr\u00e9ations uniques avec des fleurs de saison.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://atelier-flora.vercel.app"
  ),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Atelier Flora",
    title: "Atelier Flora | Fleuriste Artisanale Paris",
    description:
      "Bouquets sur mesure, compositions florales et cr\u00e9ations uniques avec des fleurs de saison.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream text-charcoal font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

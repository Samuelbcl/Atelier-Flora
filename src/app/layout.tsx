import type { Metadata } from "next";
import { Inter, Prata } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const prata = Prata({
  variable: "--font-prata",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bloom Club | Fleuriste Artisanale Paris",
    template: "%s | Bloom Club",
  },
  description:
    "Bloom Club, fleuriste artisanale au coeur de Paris. Bouquets sur mesure, compositions florales et cr\u00e9ations uniques avec des fleurs de saison.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://bloom-club.vercel.app"
  ),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Bloom Club",
    title: "Bloom Club | Fleuriste Artisanale Paris",
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
    <html lang="fr" className={`${inter.variable} ${prata.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream text-charcoal font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

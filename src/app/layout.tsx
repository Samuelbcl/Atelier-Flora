import type { Metadata } from "next";
import {
  Inter,
  Prata,
  Playfair_Display,
  Cormorant_Garamond,
  Lora,
  DM_Serif_Display,
  Libre_Baskerville,
  Work_Sans,
  Montserrat,
  Raleway,
  Nunito_Sans,
  Source_Sans_3,
} from "next/font/google";
import "./globals.css";

// ── Sans-serif fonts ──
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const workSans = Work_Sans({ variable: "--font-work-sans", subsets: ["latin"] });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });
const raleway = Raleway({ variable: "--font-raleway", subsets: ["latin"] });
const nunitoSans = Nunito_Sans({ variable: "--font-nunito-sans", subsets: ["latin"] });
const sourceSans3 = Source_Sans_3({ variable: "--font-source-sans-3", subsets: ["latin"] });

// ── Serif fonts ──
const prata = Prata({ variable: "--font-prata", weight: "400", subsets: ["latin"] });
const playfairDisplay = Playfair_Display({ variable: "--font-playfair-display", subsets: ["latin"] });
const cormorantGaramond = Cormorant_Garamond({ variable: "--font-cormorant-garamond", weight: ["300", "400", "500", "600", "700"], subsets: ["latin"] });
const lora = Lora({ variable: "--font-lora", subsets: ["latin"] });
const dmSerifDisplay = DM_Serif_Display({ variable: "--font-dm-serif-display", weight: "400", subsets: ["latin"] });
const libreBaskerville = Libre_Baskerville({ variable: "--font-libre-baskerville", weight: ["400", "700"], subsets: ["latin"] });

const fontVars = [
  inter, prata, playfairDisplay, cormorantGaramond, lora, dmSerifDisplay,
  libreBaskerville, workSans, montserrat, raleway, nunitoSans, sourceSans3,
].map((f) => f.variable).join(" ");

export const metadata: Metadata = {
  title: {
    default: "Bloom Club | Fleuriste Artisanale Liège",
    template: "%s | Bloom Club",
  },
  description:
    "Bloom Club, fleuriste artisanale à Liège. Bouquets sur mesure, compositions florales et créations uniques avec des fleurs de saison.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://bloom-club.vercel.app"
  ),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Bloom Club",
    title: "Bloom Club | Fleuriste Artisanale Liège",
    description:
      "Bouquets sur mesure, compositions florales et créations uniques avec des fleurs de saison.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={fontVars}>
      <body className="min-h-screen flex flex-col bg-cream text-charcoal font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

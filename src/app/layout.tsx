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
    default: "Atelier Flora | Fleuriste Artisanale",
    template: "%s | Atelier Flora",
  },
  description:
    "Atelier Flora, fleuriste artisanale. Bouquets sur mesure, compositions florales et créations uniques pour toutes vos occasions.",
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

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalogue",
  description:
    "Découvrez notre catalogue de bouquets, compositions florales et créations sur mesure.",
};

export default function Catalogue() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-serif text-3xl md:text-4xl text-primary font-bold text-center">
          Nos cr&eacute;ations
        </h1>
        <p className="mt-4 text-center text-charcoal/70 max-w-xl mx-auto">
          Bouquets, compositions et cr&eacute;ations florales pour toutes
          les occasions.
        </p>

        {/* Placeholder grille produits */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="group">
              <div className="aspect-square rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
                <p className="text-charcoal/40 text-sm">Produit {i + 1}</p>
              </div>
              <h3 className="font-serif text-lg text-primary">
                Bouquet exemple {i + 1}
              </h3>
              <p className="text-sm text-charcoal/60 mt-1">
                &Agrave; partir de 35 &euro;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

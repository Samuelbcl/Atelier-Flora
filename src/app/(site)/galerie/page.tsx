import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Parcourez notre galerie de créations florales artisanales.",
};

export default function Galerie() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-serif text-3xl md:text-4xl text-primary font-bold text-center">
          Galerie
        </h1>
        <p className="mt-4 text-center text-charcoal/70 max-w-xl mx-auto">
          Un aper&ccedil;u de nos cr&eacute;ations florales, r&eacute;alis&eacute;es
          avec soin pour chaque occasion.
        </p>

        {/* Placeholder grille */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl bg-primary/5 flex items-center justify-center"
            >
              <p className="text-charcoal/40 text-sm">Photo {i + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

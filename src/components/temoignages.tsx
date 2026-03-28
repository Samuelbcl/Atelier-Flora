import FadeIn from "@/components/fade-in";

interface Temoignage {
  _id: string;
  auteur: string;
  texte: string;
  note?: number | null;
  date?: string | null;
}

interface TemoignagesProps {
  titre?: string | null;
  temoignages: Temoignage[];
}

export default function Temoignages({ titre, temoignages }: TemoignagesProps) {
  if (temoignages.length === 0) return null;

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="text-center mb-16">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">
            T&eacute;moignages
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-secondary font-normal">
            {titre || "Ce que disent nos clients"}
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {temoignages.map((t, i) => (
            <FadeIn key={t._id} delay={i * 0.1}>
              <div className="p-8 bg-white border border-primary/10">
                <div className="w-10 h-[1px] bg-primary mb-6" />
                <p className="text-charcoal/70 leading-relaxed text-sm italic mb-6">
                  &laquo; {t.texte} &raquo;
                </p>
                <div className="border-t border-primary/10 pt-4">
                  <p className="font-serif text-secondary text-sm">{t.auteur}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

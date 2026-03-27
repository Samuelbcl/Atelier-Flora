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

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < count ? "text-secondary" : "text-charcoal/15"}>
          {"\u2605"}
        </span>
      ))}
    </div>
  );
}

export default function Temoignages({ titre, temoignages }: TemoignagesProps) {
  if (temoignages.length === 0) return null;

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <p className="text-secondary font-medium tracking-widest uppercase text-sm mb-3">
            T&eacute;moignages
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-primary">
            {titre || "Ce que disent nos clients"}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {temoignages.map((t) => (
            <div
              key={t._id}
              className="p-8 rounded-2xl bg-white border border-primary/5 shadow-sm"
            >
              {t.note && <Stars count={t.note} />}
              <p className="text-charcoal/70 leading-relaxed text-sm italic mb-4">
                &laquo; {t.texte} &raquo;
              </p>
              <p className="text-primary font-medium text-sm">{t.auteur}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

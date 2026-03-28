import FadeIn from "@/components/fade-in";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TestimonialsSection({ data }: { data: any }) {
  const bgColor = data.backgroundColor?.hex;
  const temoignages = data.temoignages || [];

  return (
    <section className="py-24 md:py-32 bg-cream" style={bgColor ? { backgroundColor: bgColor } : undefined}>
      <div className="mx-auto max-w-4xl px-6">
        {data.titre && (
          <FadeIn className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-secondary font-normal">{data.titre}</h2>
          </FadeIn>
        )}
        <div className="space-y-10">
          {temoignages.map((t: any, i: number) => (
            <FadeIn key={t._id || t._key || i} delay={i * 0.1}>
              <blockquote className="text-center">
                <div className="w-10 h-[1px] bg-primary mx-auto mb-6" />
                <p className="text-charcoal/60 leading-relaxed italic text-lg">&laquo; {t.texte} &raquo;</p>
                <p className="mt-4 font-serif text-secondary">{t.auteur}</p>
                {t.note && (
                  <div className="mt-2 text-primary text-sm">
                    {"★".repeat(t.note)}{"☆".repeat(5 - t.note)}
                  </div>
                )}
              </blockquote>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

import PortableTextRenderer from "@/components/portable-text-renderer";
import FadeIn from "@/components/fade-in";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FaqSection({ data }: { data: any }) {
  const bgColor = data.backgroundColor?.hex;

  return (
    <section className="py-24 md:py-32" style={bgColor ? { backgroundColor: bgColor } : undefined}>
      <div className="mx-auto max-w-3xl px-6">
        {data.titre && (
          <FadeIn className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-secondary font-normal">{data.titre}</h2>
          </FadeIn>
        )}
        <FadeIn delay={0.1}>
          <div className="border-t border-primary/10">
            {data.questions?.map((item: any, i: number) => (
              <details key={item._key || i} className="border-b border-primary/10 group">
                <summary className="py-5 flex items-center justify-between cursor-pointer list-none">
                  <span className="text-sm font-medium text-secondary">{item.question}</span>
                  <svg className="w-4 h-4 text-charcoal/30 group-open:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="pb-5">
                  {item.reponse ? (
                    <PortableTextRenderer value={item.reponse} />
                  ) : null}
                </div>
              </details>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

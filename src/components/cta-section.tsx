import Link from "next/link";
import FadeIn from "@/components/fade-in";

interface CtaData {
  titre?: string | null;
  texte?: string | null;
  boutonTexte?: string | null;
  boutonLien?: string | null;
}

interface CtaSectionProps {
  data: CtaData | null | undefined;
  defaults: {
    titre: string;
    texte: string;
    boutonTexte: string;
    boutonLien: string;
  };
}

export default function CtaSection({ data, defaults }: CtaSectionProps) {
  return (
    <section className="py-24 md:py-32 bg-secondary text-white">
      <FadeIn className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-serif text-3xl md:text-4xl leading-tight font-normal">
          {data?.titre || defaults.titre}
        </h2>
        <p className="mt-6 text-white/60 text-lg leading-relaxed">
          {data?.texte || defaults.texte}
        </p>
        <Link
          href={data?.boutonLien || defaults.boutonLien}
          className="mt-10 inline-block bg-white text-secondary px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] hover:bg-primary hover:text-white transition-all duration-300"
        >
          {data?.boutonTexte || defaults.boutonTexte}
        </Link>
      </FadeIn>
    </section>
  );
}

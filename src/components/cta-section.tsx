import Link from "next/link";

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
    <section className="py-20 md:py-28 bg-gradient-to-r from-primary to-primary-light text-white">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-serif text-3xl md:text-4xl leading-tight">
          {data?.titre || defaults.titre}
        </h2>
        <p className="mt-4 text-white/80 text-lg">
          {data?.texte || defaults.texte}
        </p>
        <Link
          href={data?.boutonLien || defaults.boutonLien}
          className="mt-8 inline-block bg-white text-primary px-8 py-4 rounded-full font-medium hover:bg-cream transition-all duration-300 hover:shadow-lg"
        >
          {data?.boutonTexte || defaults.boutonTexte}
        </Link>
      </div>
    </section>
  );
}

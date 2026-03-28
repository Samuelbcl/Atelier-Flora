import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";

interface HeroData {
  label?: string | null;
  titre?: string | null;
  sousTitre?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: { image: any; alt: string } | null;
  ctaTexte?: string | null;
  ctaLien?: string | null;
}

interface HeroSectionProps {
  data: HeroData | null | undefined;
  defaults: {
    label?: string;
    titre: string;
    sousTitre?: string;
  };
  large?: boolean;
}

export default function HeroSection({ data, defaults, large }: HeroSectionProps) {
  const label = data?.label || defaults.label;
  const titre = data?.titre || defaults.titre;
  const sousTitre = data?.sousTitre || defaults.sousTitre;
  const hasImage = data?.image?.image?.asset;

  if (large) {
    return (
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-cream to-secondary/10">
        {hasImage ? (
          <>
            <Image
              src={urlFor(data!.image!.image).width(1920).quality(80).url()}
              alt={data!.image!.alt || ""}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </>
        ) : (
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
          </div>
        )}
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          {label && (
            <p className={`font-medium tracking-widest uppercase text-sm mb-4 ${hasImage ? "text-white/70" : "text-secondary"}`}>
              {label}
            </p>
          )}
          <h1 className={`font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight ${hasImage ? "text-white" : "text-primary"}`}>
            {titre}
          </h1>
          {sousTitre && (
            <p className={`mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${hasImage ? "text-white/80" : "text-charcoal/60"}`}>
              {sousTitre}
            </p>
          )}
          {data?.ctaTexte && data.ctaLien && (
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={data.ctaLien}
                className={`px-8 py-4 rounded-full font-medium transition-all duration-300 hover:shadow-lg ${hasImage ? "bg-white text-primary hover:bg-cream hover:shadow-white/20" : "bg-primary text-white hover:bg-primary-light hover:shadow-primary/20"}`}
              >
                {data.ctaTexte}
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-primary/5 to-cream">
      <div className="mx-auto max-w-3xl px-6 text-center">
        {label && (
          <p className="text-secondary font-medium tracking-widest uppercase text-sm mb-4">
            {label}
          </p>
        )}
        <h1 className="font-serif text-4xl md:text-5xl text-primary font-bold leading-tight">
          {titre}
        </h1>
        {sousTitre && (
          <p className="mt-4 text-charcoal/60 max-w-xl mx-auto">{sousTitre}</p>
        )}
      </div>
    </section>
  );
}

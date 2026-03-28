import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import FadeIn from "@/components/fade-in";

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
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-secondary -mt-[89px] pt-[89px]">
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
          <div className="absolute inset-0 bg-gradient-to-br from-secondary to-charcoal" />
        )}
        <FadeIn className="relative mx-auto max-w-4xl px-6 text-center">
          {label && (
            <p className="text-primary-light font-medium tracking-[0.2em] uppercase text-sm mb-6">
              {label}
            </p>
          )}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-normal leading-tight">
            {titre}
          </h1>
          {sousTitre && (
            <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              {sousTitre}
            </p>
          )}
          {data?.ctaTexte && data.ctaLien && (
            <div className="mt-10">
              <Link
                href={data.ctaLien}
                className="inline-block bg-white text-secondary px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] hover:bg-primary hover:text-white transition-all duration-300"
              >
                {data.ctaTexte}
              </Link>
            </div>
          )}
        </FadeIn>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 bg-cream">
      <FadeIn className="mx-auto max-w-3xl px-6 text-center">
        {label && (
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-6">
            {label}
          </p>
        )}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-secondary font-normal leading-tight">
          {titre}
        </h1>
        {sousTitre && (
          <p className="mt-6 text-charcoal/60 max-w-xl mx-auto leading-relaxed">{sousTitre}</p>
        )}
      </FadeIn>
    </section>
  );
}

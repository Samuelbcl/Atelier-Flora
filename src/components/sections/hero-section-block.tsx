import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import FadeIn from "@/components/fade-in";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HeroSectionBlock({ data }: { data: any }) {
  const hasImage = data.image?.image?.asset;
  const minHeight = data.minHeight || "100vh";
  const align = data.alignment || "center";
  const overlayOpacity = data.overlay ? (data.overlayOpacity || 40) / 100 : 0;

  const alignClass = align === "left" ? "text-left items-start" : align === "right" ? "text-right items-end" : "text-center items-center";

  return (
    <section
      className={`relative flex justify-center overflow-hidden bg-secondary`}
      style={{ minHeight }}
    >
      {hasImage && (
        <>
          <Image
            src={urlFor(data.image.image).width(1920).quality(80).url()}
            alt={data.image.alt || ""}
            fill
            className="object-cover"
            priority
          />
          {overlayOpacity > 0 && (
            <div className="absolute inset-0" style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }} />
          )}
        </>
      )}
      {!hasImage && <div className="absolute inset-0 bg-gradient-to-br from-secondary to-charcoal" />}

      <FadeIn className={`relative mx-auto max-w-4xl px-6 flex flex-col justify-center ${alignClass}`}>
        {data.label && (
          <p className="text-primary-light font-medium tracking-[0.2em] uppercase text-sm mb-6">
            {data.label}
          </p>
        )}
        {data.titre && (
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-normal leading-tight">
            {data.titre}
          </h1>
        )}
        {data.sousTitre && (
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
            {data.sousTitre}
          </p>
        )}
        {data.ctaTexte && data.ctaLien && (
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

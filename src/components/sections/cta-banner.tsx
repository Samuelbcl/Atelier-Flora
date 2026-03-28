import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import FadeIn from "@/components/fade-in";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CtaBannerSection({ data }: { data: any }) {
  const hasImage = data.image?.image?.asset;
  const bgColor = data.backgroundColor?.hex || "#312F22";
  const align = data.alignment === "left" ? "text-left" : "text-center";

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: bgColor }}>
      {hasImage && (
        <>
          <Image src={urlFor(data.image.image).width(1920).quality(80).url()} alt={data.image.alt || ""} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </>
      )}
      <FadeIn className={`relative mx-auto max-w-3xl px-6 ${align}`}>
        {data.titre && (
          <h2 className="font-serif text-3xl md:text-4xl text-white font-normal">{data.titre}</h2>
        )}
        {data.texte && (
          <p className="mt-4 text-white/70 leading-relaxed">{data.texte}</p>
        )}
        {data.ctaTexte && data.ctaLien && (
          <div className="mt-8">
            <Link
              href={data.ctaLien}
              className={`inline-block px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
                data.ctaStyle === "outline"
                  ? "border border-white text-white hover:bg-white hover:text-secondary"
                  : "bg-white text-secondary hover:bg-primary hover:text-white"
              }`}
            >
              {data.ctaTexte}
            </Link>
          </div>
        )}
      </FadeIn>
    </section>
  );
}

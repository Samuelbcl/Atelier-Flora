import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import PortableTextRenderer from "@/components/portable-text-renderer";
import FadeIn from "@/components/fade-in";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TextImageSection({ data }: { data: any }) {
  const isLeft = data.imagePosition === "left";
  const bgColor = data.backgroundColor?.hex;

  return (
    <section className="py-24 md:py-32" style={bgColor ? { backgroundColor: bgColor } : undefined}>
      <div className={`mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${isLeft ? "" : "md:[&>:first-child]:order-2"}`}>
        <FadeIn className="aspect-[4/5] bg-white overflow-hidden relative">
          {data.image?.image?.asset ? (
            <Image src={urlFor(data.image.image).width(600).height(750).url()} alt={data.image.alt || ""} fill className="object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full"><span className="text-charcoal/20 text-sm">Image</span></div>
          )}
        </FadeIn>
        <FadeIn delay={0.2}>
          {data.label && (
            <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-6">{data.label}</p>
          )}
          {data.titre && (
            <h2 className="font-serif text-3xl md:text-4xl text-secondary font-normal leading-tight">{data.titre}</h2>
          )}
          {data.contenu && (
            <div className="mt-6"><PortableTextRenderer value={data.contenu} /></div>
          )}
          {data.ctaTexte && data.ctaLien && (
            <div className="mt-8">
              <Link href={data.ctaLien} className="inline-block text-sm font-semibold uppercase tracking-[0.1em] text-secondary border-b border-secondary pb-1 hover:text-primary hover:border-primary transition-colors duration-300">
                {data.ctaTexte}
              </Link>
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

import Image from "next/image";
import { urlFor } from "@/sanity/image";
import FadeIn from "@/components/fade-in";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function GallerySection({ data }: { data: any }) {
  const cols = data.colonnes || 3;
  const bgColor = data.backgroundColor?.hex;
  const colClass = cols === 2 ? "grid-cols-2" : cols === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3";

  return (
    <section className="py-24 md:py-32" style={bgColor ? { backgroundColor: bgColor } : undefined}>
      <div className="mx-auto max-w-6xl px-6">
        {data.titre && (
          <FadeIn className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-secondary font-normal">{data.titre}</h2>
          </FadeIn>
        )}
        <div className={`grid ${colClass} gap-3`}>
          {data.images?.map((img: any, i: number) => (
            <FadeIn key={img._key || i} delay={i * 0.05} className="aspect-square overflow-hidden relative">
              {img.image?.asset ? (
                <Image src={urlFor(img.image).width(400).height(400).url()} alt={img.alt || ""} fill className="object-cover hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="w-full h-full bg-cream" />
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

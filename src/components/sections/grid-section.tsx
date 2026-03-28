import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import FadeIn from "@/components/fade-in";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function GridSection({ data }: { data: any }) {
  const cols = data.colonnes || 3;
  const bgColor = data.backgroundColor?.hex;
  const colClass = cols === 2 ? "md:grid-cols-2" : cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="py-24 md:py-32" style={bgColor ? { backgroundColor: bgColor } : undefined}>
      <div className="mx-auto max-w-6xl px-6">
        {(data.titre || data.sousTitre) && (
          <FadeIn className="text-center mb-16">
            {data.sousTitre && <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">{data.sousTitre}</p>}
            {data.titre && <h2 className="font-serif text-3xl md:text-4xl text-secondary font-normal">{data.titre}</h2>}
          </FadeIn>
        )}
        <div className={`grid grid-cols-1 ${colClass} gap-8`}>
          {data.items?.map((item: any, i: number) => (
            <FadeIn key={item._key || i} delay={i * 0.1}>
              {item.lien ? (
                <Link href={item.lien} className="group block">
                  <GridCard item={item} />
                </Link>
              ) : (
                <GridCard item={item} />
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GridCard({ item }: { item: any }) {
  return (
    <div>
      {item.image?.image?.asset ? (
        <div className="aspect-square bg-white overflow-hidden relative">
          <Image src={urlFor(item.image.image).width(400).height(400).url()} alt={item.image.alt || item.titre} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
          {item.badge && (
            <span className="absolute top-3 left-3 bg-secondary text-white text-xs font-semibold uppercase tracking-wider px-3 py-1">{item.badge}</span>
          )}
        </div>
      ) : (
        <div className="aspect-square bg-white flex items-center justify-center">
          <div className="w-10 h-[1px] bg-primary" />
        </div>
      )}
      <div className="mt-4">
        <h3 className="font-serif text-lg text-secondary group-hover:text-primary transition-colors">{item.titre}</h3>
        {item.description && <p className="text-charcoal/50 text-sm mt-2 leading-relaxed">{item.description}</p>}
      </div>
    </div>
  );
}

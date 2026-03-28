import Image from "next/image";
import { urlFor } from "@/sanity/image";
import FadeIn from "@/components/fade-in";

interface Membre {
  _key: string;
  nom: string;
  role?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photo?: { image: any; alt: string } | null;
  bio?: string | null;
}

interface EquipeProps {
  equipe: Membre[];
}

export default function Equipe({ equipe }: EquipeProps) {
  if (!equipe || equipe.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="text-center mb-16">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">
            Notre &eacute;quipe
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-secondary font-normal">
            Les visages derri&egrave;re les fleurs
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipe.map((membre, i) => (
            <FadeIn key={membre._key} delay={i * 0.1}>
              <div className="text-center">
                <div className="aspect-[4/5] bg-cream overflow-hidden relative mb-6">
                  {membre.photo?.image?.asset ? (
                    <Image
                      src={urlFor(membre.photo.image).width(400).height(500).url()}
                      alt={membre.photo.alt || membre.nom}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="font-serif text-4xl text-primary/30">
                        {membre.nom.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-serif text-lg text-secondary">{membre.nom}</h3>
                {membre.role && (
                  <p className="text-charcoal/50 text-sm mt-1">{membre.role}</p>
                )}
                {membre.bio && (
                  <p className="text-charcoal/60 text-sm mt-3 leading-relaxed max-w-xs mx-auto">
                    {membre.bio}
                  </p>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { urlFor } from "@/sanity/image";

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
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <p className="text-secondary font-medium tracking-widest uppercase text-sm mb-3">
            Notre &eacute;quipe
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-primary">
            Les visages derri&egrave;re les fleurs
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipe.map((membre) => (
            <div key={membre._key} className="text-center">
              <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden relative mb-4">
                {membre.photo?.image?.asset ? (
                  <Image
                    src={urlFor(membre.photo.image).width(400).height(400).url()}
                    alt={membre.photo.alt || membre.nom}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-4xl text-charcoal/20">
                      {membre.nom.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="font-serif text-lg text-primary">{membre.nom}</h3>
              {membre.role && (
                <p className="text-charcoal/50 text-sm mt-1">{membre.role}</p>
              )}
              {membre.bio && (
                <p className="text-charcoal/60 text-sm mt-2 leading-relaxed max-w-xs mx-auto">
                  {membre.bio}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

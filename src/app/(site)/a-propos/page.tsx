import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez l'histoire d'Atelier Flora, fleuriste artisanale passionnée par l'art floral.",
};

export default function APropos() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="font-serif text-3xl md:text-4xl text-primary font-bold">
          &Agrave; propos
        </h1>
        <div className="mt-8 space-y-6 text-charcoal/70 leading-relaxed">
          <p>
            Atelier Flora est n&eacute; d&rsquo;une passion pour les fleurs et
            d&rsquo;un d&eacute;sir de partager la beaut&eacute; de la nature au
            quotidien. Fond&eacute; en 2020, notre atelier est un espace de
            cr&eacute;ation o&ugrave; chaque composition est pens&eacute;e comme
            une &oelig;uvre &eacute;ph&eacute;m&egrave;re.
          </p>
          <p>
            Nous travaillons exclusivement avec des fleurs de saison,
            s&eacute;lectionn&eacute;es aupr&egrave;s de producteurs locaux
            engag&eacute;s dans une agriculture respectueuse de
            l&rsquo;environnement.
          </p>
          <p>
            Notre philosophie : cr&eacute;er des arrangements floraux qui
            &eacute;veillent les sens et accompagnent vos moments de vie les
            plus pr&eacute;cieux.
          </p>
        </div>

        {/* Placeholder galerie */}
        <div className="mt-12 grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-xl bg-primary/5 flex items-center justify-center"
            >
              <p className="text-charcoal/40 text-sm">Photo {i}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

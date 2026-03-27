export default function Accueil() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary/5 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="font-serif text-4xl md:text-6xl text-primary font-bold">
            Atelier Flora
          </h1>
          <p className="mt-4 text-lg md:text-xl text-charcoal/70 max-w-2xl mx-auto">
            Des cr&eacute;ations florales artisanales, compos&eacute;es avec
            passion pour sublimer chaque instant de votre vie.
          </p>
          <a
            href="/catalogue"
            className="mt-8 inline-block bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary-light transition-colors"
          >
            D&eacute;couvrir nos cr&eacute;ations
          </a>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-primary">
            L&rsquo;art floral au service de vos &eacute;motions
          </h2>
          <p className="mt-6 text-charcoal/70 leading-relaxed">
            Chez Atelier Flora, chaque bouquet est une &oelig;uvre unique.
            Nous s&eacute;lectionnons les plus belles fleurs de saison pour
            cr&eacute;er des compositions qui racontent votre histoire.
          </p>
        </div>
      </section>

      {/* Produits vedettes (placeholder) */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-serif text-2xl md:text-3xl text-primary text-center mb-12">
            Nos cr&eacute;ations phares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-primary/5 flex items-center justify-center"
              >
                <p className="text-charcoal/40 text-sm">Produit {i}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

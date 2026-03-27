import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Atelier Flora pour vos commandes sur mesure, événements ou toute question.",
};

export default function Contact() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-serif text-3xl md:text-4xl text-primary font-bold text-center">
          Contact
        </h1>
        <p className="mt-4 text-center text-charcoal/70 max-w-xl mx-auto">
          Une question, une commande sur mesure ou un &eacute;v&eacute;nement
          &agrave; fleurir ? Contactez-nous.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Informations */}
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-xl text-primary mb-2">Adresse</h2>
              <address className="not-italic text-charcoal/70">
                <p>12 rue des Fleurs</p>
                <p>75004 Paris</p>
              </address>
            </div>
            <div>
              <h2 className="font-serif text-xl text-primary mb-2">
                T&eacute;l&eacute;phone
              </h2>
              <p className="text-charcoal/70">01 23 45 67 89</p>
            </div>
            <div>
              <h2 className="font-serif text-xl text-primary mb-2">Email</h2>
              <p className="text-charcoal/70">contact@atelier-flora.fr</p>
            </div>
            <div>
              <h2 className="font-serif text-xl text-primary mb-2">Horaires</h2>
              <div className="text-charcoal/70 text-sm space-y-1">
                <p>Lundi &ndash; Vendredi : 9h &ndash; 19h</p>
                <p>Samedi : 9h &ndash; 18h</p>
                <p>Dimanche : Ferm&eacute;</p>
              </div>
            </div>
          </div>

          {/* Formulaire placeholder */}
          <form className="space-y-4">
            <div>
              <label htmlFor="nom" className="block text-sm font-medium mb-1">
                Nom
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                className="w-full rounded-lg border border-primary/20 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full rounded-lg border border-primary/20 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full rounded-lg border border-primary/20 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary-light transition-colors"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

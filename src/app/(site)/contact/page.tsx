import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Atelier Flora pour vos commandes sur mesure, événements ou toute question. Fleuriste artisanale à Paris.",
};

export default function Contact() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-primary/5 to-cream">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-secondary font-medium tracking-widest uppercase text-sm mb-4">
            Parlons fleurs
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-primary font-bold leading-tight">
            Contactez-nous
          </h1>
          <p className="mt-4 text-charcoal/60 max-w-xl mx-auto">
            Une question, une commande sur mesure ou un &eacute;v&eacute;nement
            &agrave; fleurir ? Nous sommes &agrave; votre &eacute;coute.
          </p>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Informations */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-serif text-2xl text-primary mb-6">
                Nos coordonn&eacute;es
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-sm">{"\uD83D\uDCCD"}</span>
                  </div>
                  <div>
                    <p className="font-medium text-charcoal mb-1">Adresse</p>
                    <address className="not-italic text-charcoal/60 text-sm leading-relaxed">
                      12 rue des Fleurs<br />
                      75004 Paris
                    </address>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-sm">{"\uD83D\uDCDE"}</span>
                  </div>
                  <div>
                    <p className="font-medium text-charcoal mb-1">
                      T&eacute;l&eacute;phone
                    </p>
                    <p className="text-charcoal/60 text-sm">01 23 45 67 89</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-sm">{"\u2709\uFE0F"}</span>
                  </div>
                  <div>
                    <p className="font-medium text-charcoal mb-1">Email</p>
                    <p className="text-charcoal/60 text-sm">
                      contact@atelier-flora.fr
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-xl text-primary mb-4">Horaires</h3>
              <div className="space-y-2 text-sm">
                {[
                  { day: "Lundi \u2013 Vendredi", hours: "9h \u2013 19h" },
                  { day: "Samedi", hours: "9h \u2013 18h" },
                  { day: "Dimanche", hours: "Ferm\u00e9" },
                ].map((item) => (
                  <div
                    key={item.day}
                    className="flex justify-between py-2 border-b border-primary/5"
                  >
                    <span className="text-charcoal/70">{item.day}</span>
                    <span className="font-medium text-charcoal">
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Placeholder carte */}
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center">
              <span className="text-charcoal/30 text-sm">Carte Google Maps</span>
            </div>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-primary/5">
              <h2 className="font-serif text-2xl text-primary mb-2">
                Envoyez-nous un message
              </h2>
              <p className="text-charcoal/50 text-sm mb-8">
                Nous vous r&eacute;pondrons dans les 24 heures.
              </p>
              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="prenom"
                      className="block text-sm font-medium text-charcoal mb-1.5"
                    >
                      Pr&eacute;nom
                    </label>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      className="w-full rounded-xl border border-primary/15 bg-cream/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                      placeholder="Votre pr\u00e9nom"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="nom"
                      className="block text-sm font-medium text-charcoal mb-1.5"
                    >
                      Nom
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      className="w-full rounded-xl border border-primary/15 bg-cream/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-charcoal mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full rounded-xl border border-primary/15 bg-cream/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                    placeholder="votre@email.fr"
                  />
                </div>
                <div>
                  <label
                    htmlFor="sujet"
                    className="block text-sm font-medium text-charcoal mb-1.5"
                  >
                    Sujet
                  </label>
                  <select
                    id="sujet"
                    name="sujet"
                    className="w-full rounded-xl border border-primary/15 bg-cream/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-charcoal/70"
                  >
                    <option value="">Choisissez un sujet</option>
                    <option value="commande">Commande sur mesure</option>
                    <option value="mariage">Mariage</option>
                    <option value="evenement">&Eacute;v&eacute;nement</option>
                    <option value="info">Renseignement</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-charcoal mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full rounded-xl border border-primary/15 bg-cream/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all resize-none"
                    placeholder="D\u00e9crivez votre projet ou votre demande..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-xl font-medium hover:bg-primary-light transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                >
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

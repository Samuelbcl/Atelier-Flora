"use client";

import { useState } from "react";

interface ContactFormProps {
  sujets: string[];
}

export default function ContactForm({ sujets }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="bg-white p-8 md:p-10 border border-primary/10 text-center">
        <div className="w-12 h-12 border-2 border-primary flex items-center justify-center mx-auto mb-6">
          <div className="w-4 h-4 border-b-2 border-r-2 border-primary rotate-45 -mt-1" />
        </div>
        <h2 className="font-serif text-2xl text-secondary mb-2">Message envoy&eacute;</h2>
        <p className="text-charcoal/60 text-sm">
          Merci pour votre message. Nous vous r&eacute;pondrons dans les 24 heures.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm font-semibold uppercase tracking-[0.1em] text-secondary border-b border-secondary pb-1 hover:text-primary hover:border-primary transition-colors"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  const inputClass = "w-full border border-primary/15 bg-white px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/40 transition-all";

  return (
    <div className="bg-white p-8 md:p-10 border border-primary/10">
      <h2 className="font-serif text-2xl text-secondary mb-2">Envoyez-nous un message</h2>
      <p className="text-charcoal/50 text-sm mb-8">
        Nous vous r&eacute;pondrons dans les 24 heures.
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="prenom" className="block text-sm font-medium text-charcoal mb-2">Pr&eacute;nom</label>
            <input type="text" id="prenom" name="prenom" required className={inputClass} placeholder="Votre pr\u00e9nom" />
          </div>
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-charcoal mb-2">Nom</label>
            <input type="text" id="nom" name="nom" required className={inputClass} placeholder="Votre nom" />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">Email</label>
          <input type="email" id="email" name="email" required className={inputClass} placeholder="votre@email.fr" />
        </div>
        <div>
          <label htmlFor="sujet" className="block text-sm font-medium text-charcoal mb-2">Sujet</label>
          <select id="sujet" name="sujet" required className={`${inputClass} text-charcoal/70`}>
            <option value="">Choisissez un sujet</option>
            {sujets.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">Message</label>
          <textarea id="message" name="message" rows={6} required className={`${inputClass} resize-none`} placeholder="D\u00e9crivez votre projet ou votre demande..." />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-secondary text-white py-4 text-sm font-semibold uppercase tracking-[0.15em] hover:bg-primary transition-all duration-300 disabled:opacity-50"
        >
          {status === "sending" ? "Envoi en cours..." : "Envoyer le message"}
        </button>
      </form>
    </div>
  );
}

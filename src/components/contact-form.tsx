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

    // Simulate sending (replace with real API later: Resend, SendGrid, etc.)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-primary/5 text-center">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <div className="w-5 h-5 border-b-2 border-r-2 border-primary rotate-45 -mt-1" />
        </div>
        <h2 className="font-serif text-2xl text-primary mb-2">Message envoy&eacute; !</h2>
        <p className="text-charcoal/60 text-sm">
          Merci pour votre message. Nous vous r&eacute;pondrons dans les 24 heures.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-primary font-medium text-sm hover:underline"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-primary/5">
      <h2 className="font-serif text-2xl text-primary mb-2">Envoyez-nous un message</h2>
      <p className="text-charcoal/50 text-sm mb-8">
        Nous vous r&eacute;pondrons dans les 24 heures.
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="prenom" className="block text-sm font-medium text-charcoal mb-1.5">
              Pr&eacute;nom
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              required
              className="w-full rounded-xl border border-primary/15 bg-cream/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
              placeholder="Votre pr\u00e9nom"
            />
          </div>
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-charcoal mb-1.5">
              Nom
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              required
              className="w-full rounded-xl border border-primary/15 bg-cream/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
              placeholder="Votre nom"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1.5">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-xl border border-primary/15 bg-cream/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
            placeholder="votre@email.fr"
          />
        </div>
        <div>
          <label htmlFor="sujet" className="block text-sm font-medium text-charcoal mb-1.5">
            Sujet
          </label>
          <select
            id="sujet"
            name="sujet"
            required
            className="w-full rounded-xl border border-primary/15 bg-cream/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-charcoal/70"
          >
            <option value="">Choisissez un sujet</option>
            {sujets.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-1.5">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className="w-full rounded-xl border border-primary/15 bg-cream/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all resize-none"
            placeholder="D\u00e9crivez votre projet ou votre demande..."
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-primary text-white py-4 rounded-xl font-medium hover:bg-primary-light transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "sending" ? "Envoi en cours..." : "Envoyer le message"}
        </button>
      </form>
    </div>
  );
}

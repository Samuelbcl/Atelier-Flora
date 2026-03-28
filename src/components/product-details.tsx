"use client";

import { useState } from "react";

interface Taille {
  _key: string;
  nom: string;
  prix: number;
  stock: number;
}

interface ProductDetailsProps {
  prix: number | null;
  tailles: Taille[] | null;
  disponible: boolean;
  nom: string;
}

export default function ProductDetails({ prix, tailles, disponible, nom }: ProductDetailsProps) {
  const hasTailles = tailles && tailles.length > 0;
  const [selectedTaille, setSelectedTaille] = useState<string | null>(
    hasTailles ? tailles[0]._key : null
  );

  const activeTaille = hasTailles
    ? tailles.find((t) => t._key === selectedTaille)
    : null;

  const displayPrix = activeTaille?.prix || prix;
  const isEpuise = hasTailles
    ? activeTaille?.stock === 0
    : !disponible;

  return (
    <div className="mt-6">
      {/* Prix */}
      {displayPrix && (
        <p className="text-2xl font-medium text-secondary">
          {displayPrix}&nbsp;&euro;
        </p>
      )}

      {/* Sélecteur de taille */}
      {hasTailles && (
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal/40 mb-3">
            Taille
          </p>
          <div className="flex gap-3">
            {tailles.map((taille) => (
              <button
                key={taille._key}
                onClick={() => setSelectedTaille(taille._key)}
                disabled={taille.stock === 0}
                className={`w-12 h-12 flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                  selectedTaille === taille._key
                    ? "bg-secondary text-white"
                    : taille.stock === 0
                      ? "bg-cream text-charcoal/20 cursor-not-allowed line-through"
                      : "bg-cream text-secondary hover:bg-primary/10"
                }`}
              >
                {taille.nom}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bouton ajouter au panier */}
      <button
        disabled={isEpuise}
        className={`mt-8 w-full py-4 text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
          isEpuise
            ? "bg-cream text-charcoal/30 cursor-not-allowed"
            : "bg-secondary text-white hover:bg-primary"
        }`}
      >
        {isEpuise ? "\u00c9puis\u00e9" : "Ajouter au panier"}
      </button>
    </div>
  );
}

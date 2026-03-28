import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-03-27",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

async function run() {
  console.log("=== Migration Theme Customizer ===\n");

  // 1. Patch settings avec valeurs par défaut
  console.log("→ Patch settings...");

  const settings = await client.fetch('*[_type == "settings"][0]');

  if (!settings) {
    console.log("  ⚠ Pas de document settings trouvé. Créez-le dans le Studio.");
    return;
  }

  const patch = client.patch("settings");

  // Couleurs par défaut (si pas encore définies)
  if (!settings.couleurs) {
    patch.set({
      couleurs: {
        primary: { hex: "#B49E7A" },
        primaryLight: { hex: "#c4b08a" },
        secondary: { hex: "#312F22" },
        cream: { hex: "#f3eae0" },
        accent: { hex: "#B49E7A" },
        surface: { hex: "#ffffff" },
        text: { hex: "#312F22" },
        textMuted: { hex: "#9a9a8a" },
      },
    });
    console.log("  ✓ Couleurs par défaut ajoutées");
  } else {
    console.log("  ⏭ Couleurs déjà configurées");
  }

  // Typographie par défaut
  if (!settings.typographie) {
    patch.set({
      typographie: {
        headingFont: "prata",
        bodyFont: "inter",
        baseSize: 16,
        headingWeight: "400",
      },
    });
    console.log("  ✓ Typographie par défaut ajoutée");
  } else {
    console.log("  ⏭ Typographie déjà configurée");
  }

  // Header config avec navigation par défaut
  if (!settings.headerConfig) {
    patch.set({
      headerConfig: {
        style: "transparent",
        logoPosition: "left",
        showTopBar: false,
        navigationPrincipale: [
          {
            _key: "fleurs",
            _type: "object",
            label: "Fleurs",
            children: [
              { _key: "1", _type: "object", label: "Populaire", lien: "/fleurs/populaire" },
              { _key: "2", _type: "object", label: "Bouquets", lien: "/fleurs/bouquets" },
              { _key: "3", _type: "object", label: "Bouquet de saison", lien: "/fleurs/bouquet-de-saison" },
              { _key: "4", _type: "object", label: "Deuil", lien: "/fleurs/deuil" },
              { _key: "5", _type: "object", label: "Mariage", lien: "/fleurs/mariage" },
              { _key: "6", _type: "object", label: "Roses", lien: "/fleurs/roses" },
            ],
          },
          { _key: "accueil", _type: "object", label: "Accueil", lien: "/" },
          { _key: "apropos", _type: "object", label: "À propos", lien: "/a-propos" },
          { _key: "contact", _type: "object", label: "Contact", lien: "/contact" },
        ],
      },
    });
    console.log("  ✓ Header config + navigation ajoutés");
  } else {
    console.log("  ⏭ Header déjà configuré");
  }

  // Footer config
  if (!settings.footerConfig) {
    const footerDesc = settings.footerDescription || "Fleuriste artisanale à Liège. Bouquets sur mesure, compositions florales et créations uniques.";
    const socials = settings.reseauxSociaux || [];

    patch.set({
      footerConfig: {
        style: "columns",
        description: footerDesc,
        colonnes: [
          {
            _key: "nav",
            _type: "object",
            titre: "Navigation",
            liens: [
              { _key: "1", _type: "object", label: "Accueil", lien: "/" },
              { _key: "2", _type: "object", label: "À propos", lien: "/a-propos" },
              { _key: "3", _type: "object", label: "Populaire", lien: "/fleurs/populaire" },
              { _key: "4", _type: "object", label: "Bouquets", lien: "/fleurs/bouquets" },
              { _key: "5", _type: "object", label: "Mariage", lien: "/fleurs/mariage" },
              { _key: "6", _type: "object", label: "Contact", lien: "/contact" },
            ],
          },
        ],
        reseauxSociaux: socials,
      },
    });
    console.log("  ✓ Footer config ajouté");
  } else {
    console.log("  ⏭ Footer déjà configuré");
  }

  // Fonctionnalités par défaut
  if (!settings.fonctionnalites) {
    patch.set({
      fonctionnalites: {
        animations: true,
        scrollToTop: false,
        whatsappActif: false,
        maintenance: false,
      },
    });
    console.log("  ✓ Fonctionnalités par défaut ajoutées");
  } else {
    console.log("  ⏭ Fonctionnalités déjà configurées");
  }

  // SEO title template
  if (!settings.seoTitleTemplate) {
    patch.set({ seoTitleTemplate: "%s | Bloom Club" });
    console.log("  ✓ SEO title template ajouté");
  }

  await patch.commit();
  console.log("\n✅ Migration terminée ! Publiez dans le Studio.");
}

run().catch(console.error);

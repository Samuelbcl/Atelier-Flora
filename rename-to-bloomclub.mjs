import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-03-27",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

async function run() {
  // 1. Settings — nom du site + email
  console.log("→ Settings : nom du site + email");
  await client
    .patch("settings")
    .set({
      nomDuSite: "Bloom Club",
      email: "contact@bloomclub.be",
    })
    .commit();
  console.log("  ✓ Done");

  // 2. Page Accueil — hero titre
  console.log("→ Page Accueil : hero titre");
  await client
    .patch("pageAccueil")
    .set({
      "hero.titre": "Bloom Club",
    })
    .commit();
  console.log("  ✓ Done");

  // 3. Page À propos — citation auteur
  console.log("→ Page À propos : citation auteur");
  const aPropos = await client.fetch(
    `*[_type == "pageAPropos"][0]{citationAuteur}`
  );
  if (aPropos?.citationAuteur?.includes("Atelier Flora")) {
    await client
      .patch("pageAPropos")
      .set({
        citationAuteur: aPropos.citationAuteur.replace(
          "Atelier Flora",
          "Bloom Club"
        ),
      })
      .commit();
    console.log("  ✓ Done");
  } else {
    console.log("  ⏭ Pas de mention trouvée");
  }

  // 4. Chercher dans tous les documents les champs texte avec "Atelier Flora"
  console.log("→ Recherche globale...");
  const docs = await client.fetch(
    `*[_type in ["settings","pageAccueil","pageAPropos","pageContact","pageMariage","temoignage","categorie","produit"]]{ _id, _type, ... }`
  );

  let count = 0;
  for (const doc of docs) {
    const json = JSON.stringify(doc);
    if (json.includes("Atelier Flora") || json.includes("atelier-flora") || json.includes("atelier flora")) {
      console.log(`  Found in ${doc._type} (${doc._id})`);
      count++;
    }
  }

  if (count === 0) {
    console.log("  ✓ Aucune mention restante");
  } else {
    console.log(`  ⚠ ${count} document(s) contiennent encore l'ancien nom — vérifiez manuellement dans le Studio`);
  }

  // 5. Publier les drafts modifiés
  console.log("\n✅ Renommage terminé ! Publiez dans le Studio si nécessaire.");
}

run().catch(console.error);

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'bq9tfqwt',
  dataset: 'production',
  apiVersion: '2025-03-27',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

try {
  // 1. Supprimer les anciennes catégories
  console.log('=== Suppression anciennes catégories ===')
  const oldCats = await client.fetch('*[_type == "categorie"]{ _id }')
  for (const cat of oldCats) {
    await client.delete(cat._id)
    console.log(`  ✗ ${cat._id} supprimé`)
  }

  // 2. Supprimer les anciens produits
  console.log('=== Suppression anciens produits ===')
  const oldProds = await client.fetch('*[_type == "produit"]{ _id }')
  for (const prod of oldProds) {
    await client.delete(prod._id)
    console.log(`  ✗ ${prod._id} supprimé`)
  }

  // 3. Créer les nouvelles catégories
  console.log('\n=== Création nouvelles catégories ===')
  const categories = [
    { _id: 'cat-populaire', nom: 'Populaire', slug: 'populaire', description: 'Nos bouquets les plus demandés par nos clients.', ordre: 1 },
    { _id: 'cat-bouquets', nom: 'Bouquets', slug: 'bouquets', description: 'Nos bouquets de fleurs fraîches, composés à la main avec des fleurs de saison.', ordre: 2 },
    { _id: 'cat-bouquet-saison', nom: 'Bouquet de saison', slug: 'bouquet-de-saison', description: 'Un bouquet unique, spécialement composé pour cette saison.', ordre: 3 },
    { _id: 'cat-deuil', nom: 'Deuil', slug: 'deuil', description: 'Arrangements floraux pour accompagner vos moments de recueillement avec dignité.', ordre: 4 },
    { _id: 'cat-roses', nom: 'Roses', slug: 'roses', description: 'La rose, symbole universel d\'élégance. Rouges pour l\'amour, blanches pour la pureté, roses pour la gratitude.', ordre: 5 },
  ]
  for (const cat of categories) {
    await client.createOrReplace({
      _id: cat._id,
      _type: 'categorie',
      nom: cat.nom,
      slug: { _type: 'slug', current: cat.slug },
      description: cat.description,
      ordre: cat.ordre,
    })
    console.log(`  ✓ ${cat.nom}`)
  }

  // 4. Créer les produits
  console.log('\n=== Création produits ===')

  const produits = [
    // Populaire
    { _id: 'prod-le-classique', nom: 'Le Classique', slug: 'le-classique', prix: 60, cat: 'cat-populaire', desc: 'Un bouquet intemporel qui traverse les saisons. Fleurs variées dans des tons harmonieux, parfait pour toutes les occasions.', etiquette: 'Best-seller', ordre: 1 },
    { _id: 'prod-le-voluptueux', nom: 'Le Voluptueux', slug: 'le-voluptueux', prix: 60, cat: 'cat-populaire', desc: 'Un bouquet généreux et opulent. Des fleurs choisies pour leur volume et leur texture, créant un arrangement saisissant.', etiquette: 'Populaire', ordre: 2 },
    { _id: 'prod-le-libre', nom: 'Le Libre', slug: 'le-libre', prix: 60, cat: 'cat-populaire', desc: 'Un bouquet champêtre et naturel, comme cueilli dans un jardin sauvage. Fleurs des champs et feuillages aériens.', etiquette: 'Populaire', ordre: 3 },

    // Bouquets
    { _id: 'prod-loptimiste', nom: "L'Optimiste", slug: 'loptimiste', prix: 60, cat: 'cat-bouquets', desc: 'Un bouquet lumineux aux couleurs vives qui rayonne de joie. Parfait pour égayer une journée ou célébrer un moment heureux.', etiquette: 'Fleurs de saison', ordre: 4 },
    { _id: 'prod-laudacieux', nom: "L'Audacieux", slug: 'laudacieux', prix: 60, cat: 'cat-bouquets', desc: 'Un bouquet aux teintes profondes et contrastées pour ceux qui osent. Des associations florales surprenantes et élégantes.', etiquette: 'Fleurs de saison', ordre: 5 },
    { _id: 'prod-le-delicat', nom: 'Le Délicat', slug: 'le-delicat', prix: 55, cat: 'cat-bouquets', desc: 'Tout en douceur et en légèreté. Des fleurs pastel et des feuillages fins pour un effet aérien et romantique.', etiquette: 'Fleurs de saison', ordre: 6 },

    // Bouquet de saison
    { _id: 'prod-bouquet-saison', nom: 'Bouquet de Saison', slug: 'bouquet-de-saison', prix: 60, cat: 'cat-bouquet-saison', desc: 'Un magnifique bouquet spécialement composé pour cette saison. Les fleurs changent chaque mois pour refléter ce que la nature offre de plus beau.', etiquette: 'Offre du mois', ordre: 7 },

    // Deuil
    { _id: 'prod-montage-rond-blanc', nom: 'Montage Rond Blanc', slug: 'montage-rond-blanc', prix: 60, cat: 'cat-deuil', desc: 'Un arrangement rond de fleurs blanches, symbole de pureté et de sérénité. Composition soignée pour accompagner vos hommages.', etiquette: null, ordre: 8 },
    { _id: 'prod-montage-rond-pastel', nom: 'Montage Rond Pastel', slug: 'montage-rond-pastel', prix: 60, cat: 'cat-deuil', desc: 'Des teintes douces et apaisantes pour un hommage tout en délicatesse. Fleurs pastel arrangées avec respect et élégance.', etiquette: null, ordre: 9 },
    { _id: 'prod-couronne-blanche', nom: 'Couronne Blanche', slug: 'couronne-blanche', prix: 100, cat: 'cat-deuil', desc: 'Une couronne de fleurs blanches, geste traditionnel et noble pour honorer la mémoire de vos proches.', etiquette: null, ordre: 10 },
    { _id: 'prod-coeur-pastel', nom: 'Cœur Pastel', slug: 'coeur-pastel', prix: 100, cat: 'cat-deuil', desc: 'Un arrangement en forme de cœur composé de fleurs aux tons pastel. Un geste tendre et émouvant.', etiquette: null, ordre: 11 },

    // Roses
    { _id: 'prod-le-blanc', nom: 'Le Blanc', slug: 'le-blanc', prix: 80, cat: 'cat-roses', desc: 'Un bouquet de roses blanches d\'une élégance pure. Symbole de pureté et de respect, idéal pour un geste sincère.', etiquette: 'Roses premium', ordre: 12 },
    { _id: 'prod-le-rose', nom: 'Le Rose', slug: 'le-rose', prix: 80, cat: 'cat-roses', desc: 'Des roses roses délicates, expression de gratitude et de tendresse. Un classique indémodable pour dire merci.', etiquette: 'Roses premium', ordre: 13 },
    { _id: 'prod-le-rouge', nom: 'Le Rouge', slug: 'le-rouge', prix: 80, cat: 'cat-roses', desc: 'Le bouquet de roses rouges par excellence. Symbole universel d\'amour et de passion, pour les déclarations qui comptent.', etiquette: 'Roses premium', disponible: false, ordre: 14 },
  ]

  for (const p of produits) {
    await client.createOrReplace({
      _id: p._id,
      _type: 'produit',
      nom: p.nom,
      slug: { _type: 'slug', current: p.slug },
      prix: p.prix,
      description: [
        { _type: 'block', _key: `${p._id}-desc`, style: 'normal', markDefs: [], children: [{ _type: 'span', _key: `${p._id}-span`, text: p.desc, marks: [] }] },
      ],
      categorie: { _type: 'reference', _ref: p.cat },
      etiquette: p.etiquette || null,
      disponible: p.disponible !== undefined ? p.disponible : true,
      ordre: p.ordre,
    })
    console.log(`  ✓ ${p.nom} (${p.prix}€)`)
  }

  // 5. Mettre à jour les produits vedettes de la page d'accueil
  console.log('\n=== Mise à jour produits vedettes ===')
  await client.patch('pageAccueil').set({
    produitsVedettes: [
      { _type: 'reference', _ref: 'prod-le-classique', _key: 'fv1' },
      { _type: 'reference', _ref: 'prod-le-voluptueux', _key: 'fv2' },
      { _type: 'reference', _ref: 'prod-le-libre', _key: 'fv3' },
    ],
  }).commit()
  console.log('  ✓ Produits vedettes mis à jour')

  // 6. Créer le singleton page Mariage
  console.log('\n=== Création page Mariage ===')
  await client.createOrReplace({
    _id: 'pageMariage',
    _type: 'pageMariage',
    hero: {
      _type: 'heroSection',
      label: 'Journée inoubliable',
      titre: 'Mariage',
      sousTitre: 'Ne laissez rien au hasard pour le plus beau jour de votre vie.',
    },
    services: [
      { _key: 's1', titre: 'Bouquet de Mariée', description: 'Un bouquet unique, créé sur mesure pour refléter votre personnalité et le thème de votre mariage.' },
      { _key: 's2', titre: 'Décoration de Cérémonie', description: 'Arche florale, bout de banc, pétales — nous habillons votre lieu de cérémonie avec élégance.' },
      { _key: 's3', titre: 'Centres de Table', description: 'Des compositions qui subliment vos tables tout en laissant vos invités se voir et échanger.' },
      { _key: 's4', titre: 'Décoration de Réception', description: 'Du cocktail au dessert, une ambiance florale cohérente et raffinée pour votre réception.' },
    ],
    contactTitre: 'Nous aimons vous aider',
    contactTexte: 'Prenez rendez-vous pour une consultation personnalisée. Nous discuterons de vos envies, de votre thème et de votre budget pour créer la décoration florale parfaite.',
  })
  console.log('  ✓ Page Mariage créée')

  console.log('\n=== Migration terminée ! ===')
  console.log(`${categories.length} catégories + ${produits.length} produits créés`)
} catch (err) {
  console.error('Error:', err.message)
}

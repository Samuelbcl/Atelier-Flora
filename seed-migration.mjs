import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'bq9tfqwt',
  dataset: 'production',
  apiVersion: '2025-03-27',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

try {
  // 1. Migrate pageAccueil: flat fields → nested hero + cta objects
  console.log('=== Migrating pageAccueil ===')
  const accueil = await client.getDocument('pageAccueil')
  if (accueil) {
    await client.patch('pageAccueil').set({
      hero: {
        _type: 'heroSection',
        label: 'Fleuriste artisanale à Paris',
        titre: accueil.titre || 'Atelier Flora',
        sousTitre: accueil.sousTitre || '',
        image: accueil.heroImage || undefined,
        ctaTexte: 'Découvrir nos créations',
        ctaLien: '/catalogue',
      },
      cta: {
        _type: 'ctaSection',
        titre: accueil.ctaTitre || 'Un événement à fleurir ?',
        texte: accueil.ctaTexte || 'Mariage, anniversaire ou simplement envie de faire plaisir — parlons de votre projet floral.',
        boutonTexte: accueil.ctaBouton || 'Nous contacter',
        boutonLien: '/contact',
      },
      produitsVedettesTitre: 'Nos créations phares',
      temoignagesTitre: 'Ce que disent nos clients',
    }).commit()
    console.log('  ✓ pageAccueil migrated')
  }

  // 2. Migrate pageAPropos: flat titre → nested hero
  console.log('=== Migrating pageAPropos ===')
  const apropos = await client.getDocument('pageAPropos')
  if (apropos) {
    await client.patch('pageAPropos').set({
      hero: {
        _type: 'heroSection',
        label: 'Notre histoire',
        titre: apropos.titre || 'La passion des fleurs depuis toujours',
      },
      equipe: [
        {
          _key: 'e1',
          _type: 'membreEquipe',
          nom: 'Clara Dumont',
          role: 'Fondatrice & fleuriste',
          bio: 'Passionnée par l\'art floral depuis l\'enfance, Clara a fondé Atelier Flora pour partager sa vision d\'une floriculture respectueuse et créative.',
        },
      ],
    }).commit()
    console.log('  ✓ pageAPropos migrated')
  }

  // 3. Create pageGalerie singleton
  console.log('=== Creating pageGalerie ===')
  await client.createOrReplace({
    _id: 'pageGalerie',
    _type: 'pageGalerie',
    hero: {
      _type: 'heroSection',
      label: 'Nos réalisations',
      titre: 'Galerie',
      sousTitre: 'Un aperçu de nos créations, des bouquets du quotidien aux compositions pour vos événements.',
    },
    cta: {
      _type: 'ctaSection',
      titre: 'Envie d\'une création sur mesure ?',
      texte: 'Chaque projet est unique. Parlons ensemble de vos envies.',
      boutonTexte: 'Discutons de votre projet',
      boutonLien: '/contact',
    },
  })
  console.log('  ✓ pageGalerie created')

  // 4. Create pageCatalogue singleton
  console.log('=== Creating pageCatalogue ===')
  await client.createOrReplace({
    _id: 'pageCatalogue',
    _type: 'pageCatalogue',
    hero: {
      _type: 'heroSection',
      label: 'Catalogue',
      titre: 'Nos créations',
      sousTitre: 'Des bouquets et compositions pour toutes les occasions, réalisés avec des fleurs fraîches de saison.',
    },
    infosCommande: [
      { _key: 'i1', _type: 'infoCard', icone: '🚚', titre: 'Livraison Paris', texte: 'Livraison à vélo dans tout Paris, du mardi au samedi.' },
      { _key: 'i2', _type: 'infoCard', icone: '💬', titre: 'Sur mesure', texte: 'Chaque bouquet peut être personnalisé selon vos envies et votre budget.' },
      { _key: 'i3', _type: 'infoCard', icone: '🎁', titre: 'Emballage soigné', texte: 'Papier kraft recyclé, ruban en coton — un écrin naturel pour vos fleurs.' },
    ],
    cta: {
      _type: 'ctaSection',
      titre: 'Vous ne trouvez pas votre bonheur ?',
      texte: 'Nous créons des compositions sur mesure pour chaque occasion.',
      boutonTexte: 'Commander sur mesure',
      boutonLien: '/contact',
    },
  })
  console.log('  ✓ pageCatalogue created')

  // 5. Create pageContact singleton
  console.log('=== Creating pageContact ===')
  await client.createOrReplace({
    _id: 'pageContact',
    _type: 'pageContact',
    hero: {
      _type: 'heroSection',
      label: 'Parlons fleurs',
      titre: 'Contactez-nous',
      sousTitre: 'Une question, une commande sur mesure ou un événement à fleurir ? Nous sommes à votre écoute.',
    },
    sujetsFormulaire: ['Commande sur mesure', 'Mariage', 'Événement', 'Renseignement', 'Autre'],
  })
  console.log('  ✓ pageContact created')

  // 6. Update settings with identity fields
  console.log('=== Updating settings ===')
  await client.patch('settings').set({
    nomDuSite: 'Atelier Flora',
    slogan: 'Fleuriste artisanale à Paris',
    seoGlobal: {
      _type: 'seo',
      metaTitre: 'Atelier Flora | Fleuriste Artisanale Paris',
      metaDescription: 'Atelier Flora, fleuriste artisanale au cœur de Paris. Bouquets sur mesure, compositions florales et créations uniques avec des fleurs de saison.',
    },
  }).commit()
  console.log('  ✓ settings updated')

  // 7. Create gallery categories
  console.log('=== Creating gallery categories ===')
  const galCats = [
    { _id: 'galcat-mariages', nom: 'Mariages', slug: { _type: 'slug', current: 'mariages' }, ordre: 1 },
    { _id: 'galcat-evenements', nom: 'Événements', slug: { _type: 'slug', current: 'evenements' }, ordre: 2 },
    { _id: 'galcat-boutique', nom: 'Boutique', slug: { _type: 'slug', current: 'boutique' }, ordre: 3 },
    { _id: 'galcat-saisons', nom: 'Au fil des saisons', slug: { _type: 'slug', current: 'au-fil-des-saisons' }, ordre: 4 },
  ]
  for (const cat of galCats) {
    await client.createOrReplace({ ...cat, _type: 'categorieGalerie' })
    console.log(`  ✓ ${cat.nom}`)
  }

  // 8. Create sample testimonials
  console.log('=== Creating testimonials ===')
  const temoignages = [
    { _id: 'temoignage-1', auteur: 'Marie L.', texte: 'Un bouquet magnifique pour mon mariage ! Clara a su capturer exactement l\'ambiance que je souhaitais. Chaque détail était parfait.', note: 5, date: '2025-09-15', actif: true },
    { _id: 'temoignage-2', auteur: 'Sophie D.', texte: 'Je commande régulièrement des bouquets pour mon bureau. La fraîcheur et la créativité sont toujours au rendez-vous. Un vrai bonheur chaque semaine !', note: 5, date: '2025-11-02', actif: true },
    { _id: 'temoignage-3', auteur: 'Thomas B.', texte: 'J\'ai offert un bouquet Aurore à ma femme pour notre anniversaire. Elle a adoré ! Les fleurs ont tenu plus d\'une semaine. Merci Atelier Flora.', note: 5, date: '2026-01-20', actif: true },
  ]
  for (const t of temoignages) {
    await client.createOrReplace({ ...t, _type: 'temoignage' })
    console.log(`  ✓ ${t.auteur}`)
  }

  // 9. Add etiquette to existing products
  console.log('=== Adding etiquette to products ===')
  const products = await client.fetch('*[_type == "produit"]{ _id }')
  for (const p of products) {
    await client.patch(p._id).setIfMissing({ etiquette: 'Fleurs de saison' }).commit()
  }
  console.log(`  ✓ ${products.length} products updated`)

  console.log('\n=== Migration complete! ===')
} catch (err) {
  console.error('Error:', err.message)
}

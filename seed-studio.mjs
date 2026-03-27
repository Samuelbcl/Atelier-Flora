import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'bq9tfqwt',
  dataset: 'production',
  apiVersion: '2025-03-27',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

try {
  // 1. Create Settings
  console.log('Creating Settings...')
  await client.createOrReplace({
    _id: 'settings',
    _type: 'settings',
    adresse: '12 rue des Fleurs\n75004 Paris',
    telephone: '01 23 45 67 89',
    email: 'contact@atelier-flora.fr',
    horaires: [
      { _key: 'h1', jour: 'Lundi – Vendredi', heures: '9h – 19h' },
      { _key: 'h2', jour: 'Samedi', heures: '9h – 18h' },
      { _key: 'h3', jour: 'Dimanche', heures: 'Fermé' },
    ],
    reseauxSociaux: [
      { _key: 's1', plateforme: 'instagram', url: 'https://instagram.com/atelierflora' },
      { _key: 's2', plateforme: 'facebook', url: 'https://facebook.com/atelierflora' },
      { _key: 's3', plateforme: 'pinterest', url: 'https://pinterest.com/atelierflora' },
    ],
    footerDescription: 'Fleuriste artisanale à Paris. Bouquets sur mesure, compositions florales et créations uniques avec des fleurs de saison pour toutes vos occasions.',
  })
  console.log('  ✓ settings')

  // 2. Update Page Accueil with values, intro title, CTA
  console.log('Updating Page Accueil...')
  await client
    .patch('pageAccueil')
    .set({
      valeurs: [
        { _key: 'v1', icone: '🌱', titre: 'Fleurs de saison', texte: 'Nous travaillons exclusivement avec des fleurs fraîches et de saison, sélectionnées auprès de producteurs locaux.' },
        { _key: 'v2', icone: '✂️', titre: 'Fait main', texte: 'Chaque bouquet est composé à la main dans notre atelier parisien, avec soin et créativité.' },
        { _key: 'v3', icone: '💚', titre: 'Éco-responsable', texte: 'Emballages recyclés, circuits courts et zéro mousse florale synthétique pour un impact minimal.' },
      ],
      introTitre: "L'art floral au service de vos émotions",
      ctaTitre: 'Un événement à fleurir ?',
      ctaTexte: 'Mariage, anniversaire ou simplement envie de faire plaisir — parlons de votre projet floral.',
      ctaBouton: 'Nous contacter',
    })
    .commit()
  console.log('  ✓ pageAccueil')

  // 3. Add intro image (reuse hero asset)
  console.log('Adding intro image...')
  const heroDoc = await client.getDocument('pageAccueil')
  if (heroDoc?.heroImage?.image?.asset) {
    await client
      .patch('pageAccueil')
      .set({
        introImage: {
          _type: 'imageWithAlt',
          image: {
            _type: 'image',
            asset: heroDoc.heroImage.image.asset,
          },
          alt: "L'atelier Atelier Flora",
        },
      })
      .commit()
    console.log('  ✓ introImage')
  }

  // 4. Update Page À Propos with values and quote
  console.log('Updating Page À Propos...')
  await client
    .patch('pageAPropos')
    .set({
      valeurs: [
        { _key: 'v1', titre: 'La saisonnalité', texte: "Nous travaillons au rythme des saisons. Chaque période de l'année offre sa palette unique de couleurs et de textures que nous mettons en valeur dans nos créations." },
        { _key: 'v2', titre: "L'artisanat", texte: 'Chaque bouquet est composé à la main, sans mécanisation. Nous prenons le temps de créer des arrangements qui reflètent notre savoir-faire et notre sensibilité artistique.' },
        { _key: 'v3', titre: 'Le local', texte: 'Nos fleurs proviennent de producteurs français et européens engagés dans des pratiques agricoles responsables. Nous privilégions les circuits courts.' },
        { _key: 'v4', titre: 'La durabilité', texte: 'Zéro mousse florale synthétique, emballages recyclés et réduction des déchets — nous cherchons à minimiser notre impact environnemental à chaque étape.' },
      ],
      citationTexte: "Les fleurs ne sont pas seulement belles, elles sont porteuses d'émotions. C'est ce qui rend notre métier si extraordinaire.",
      citationAuteur: "Clara Dumont, fondatrice d'Atelier Flora",
    })
    .commit()
  console.log('  ✓ pageAPropos')

  console.log('\n=== Done! All Studio content updated. ===')
} catch (err) {
  console.error('Error:', err.message)
}

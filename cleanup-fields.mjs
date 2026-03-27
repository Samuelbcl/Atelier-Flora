import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'bq9tfqwt',
  dataset: 'production',
  apiVersion: '2025-03-27',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

try {
  // Nettoyer pageAccueil — supprimer les anciens champs plats
  console.log('Cleaning pageAccueil...')
  await client
    .patch('pageAccueil')
    .unset(['titre', 'sousTitre', 'heroImage', 'ctaTitre', 'ctaTexte', 'ctaBouton'])
    .commit()
  console.log('  ✓ 6 orphaned fields removed')

  // Nettoyer pageAPropos — supprimer l'ancien champ titre
  console.log('Cleaning pageAPropos...')
  await client
    .patch('pageAPropos')
    .unset(['titre'])
    .commit()
  console.log('  ✓ 1 orphaned field removed')

  console.log('\nDone! No more "unknown fields" warnings.')
} catch (err) {
  console.error('Error:', err.message)
}

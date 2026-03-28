import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'bq9tfqwt',
  dataset: 'production',
  apiVersion: '2025-03-27',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

try {
  // 1. Vider les références de la page d'accueil vers les produits
  console.log('Clearing pageAccueil references...')
  await client.patch('pageAccueil').set({ produitsVedettes: [] }).commit()
  console.log('  ✓ produitsVedettes cleared')

  // 2. Supprimer tous les produits
  console.log('Deleting all products...')
  const produits = await client.fetch('*[_type == "produit"]._id')
  for (const id of produits) {
    await client.delete(id)
    console.log('  ✗', id)
  }
  console.log(`  ${produits.length} products deleted`)

  // 3. Supprimer toutes les catégories
  console.log('Deleting all categories...')
  const categories = await client.fetch('*[_type == "categorie"]._id')
  for (const id of categories) {
    await client.delete(id)
    console.log('  ✗', id)
  }
  console.log(`  ${categories.length} categories deleted`)

  console.log('\nDone! Now run: node seed-categories.mjs')
} catch (err) {
  console.error('Error:', err.message)
}

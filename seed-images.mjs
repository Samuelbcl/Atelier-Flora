import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'bq9tfqwt',
  dataset: 'production',
  apiVersion: '2025-03-27',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

// Pexels free images (stable URLs)
const images = {
  hero: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&w=1920',
  atelier: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&w=800',

  fondatrice: 'https://images.pexels.com/photos/1458282/pexels-photo-1458282.jpeg?auto=compress&w=600',
  atelier1: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&w=800',
  atelier2: 'https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?auto=compress&w=600',
  atelier3: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&w=600',
  atelier4: 'https://images.pexels.com/photos/371285/pexels-photo-371285.jpeg?auto=compress&w=600',
  atelier5: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&w=600',
  atelier6: 'https://images.pexels.com/photos/2879820/pexels-photo-2879820.jpeg?auto=compress&w=600',

  catBouquets: 'https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?auto=compress&w=400',
  catCompositions: 'https://images.pexels.com/photos/371285/pexels-photo-371285.jpeg?auto=compress&w=400',
  catMariages: 'https://images.pexels.com/photos/2879820/pexels-photo-2879820.jpeg?auto=compress&w=400',
  catEvenements: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&w=400',

  aurore: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&w=600',
  jardinSecret: 'https://images.pexels.com/photos/371285/pexels-photo-371285.jpeg?auto=compress&w=600',
  rosee: 'https://images.pexels.com/photos/1458282/pexels-photo-1458282.jpeg?auto=compress&w=600',
  champetre: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&w=600',
  soleilDor: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&w=600',
  elegance: 'https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?auto=compress&w=600',
  pastel: 'https://images.pexels.com/photos/2879820/pexels-photo-2879820.jpeg?auto=compress&w=600',
  zen: 'https://images.pexels.com/photos/1458282/pexels-photo-1458282.jpeg?auto=compress&w=600',
  boutonniere: 'https://images.pexels.com/photos/2879820/pexels-photo-2879820.jpeg?auto=compress&w=600',
}

async function uploadImage(url, filename) {
  console.log(`  Downloading ${filename}...`)
  const res = await fetch(url)
  if (!res.ok) {
    console.log(`  ⚠ Skipped ${filename} (HTTP ${res.status})`)
    return null
  }
  const buffer = Buffer.from(await res.arrayBuffer())
  console.log(`  Uploading ${filename} to Sanity...`)
  const asset = await client.assets.upload('image', buffer, {
    filename: `${filename}.jpg`,
    contentType: 'image/jpeg',
  })
  console.log(`  ✓ ${filename}`)
  return asset._id
}

function imageField(assetId, alt) {
  return {
    _type: 'imageWithAlt',
    image: {
      _type: 'image',
      asset: { _type: 'reference', _ref: assetId },
    },
    alt,
  }
}

try {
  console.log('=== Uploading images ===\n')
  const assets = {}
  for (const [key, url] of Object.entries(images)) {
    assets[key] = await uploadImage(url, key)
  }

  const uploaded = Object.values(assets).filter(Boolean).length
  console.log(`\n${uploaded}/${Object.keys(images).length} images uploaded!\n`)

  // Patch Page Accueil
  if (assets.hero) {
    console.log('Patching Page Accueil...')
    await client
      .patch('pageAccueil')
      .set({
        heroImage: imageField(assets.hero, 'Bouquet de fleurs artisanal'),
        produitsVedettes: [
          { _type: 'reference', _ref: 'prod-aurore', _key: 'fv1' },
          { _type: 'reference', _ref: 'prod-jardin-secret', _key: 'fv2' },
          { _type: 'reference', _ref: 'prod-rosee', _key: 'fv3' },
        ],
      })
      .commit()
    console.log('  ✓ pageAccueil')
  }

  // Patch Page À Propos
  console.log('Patching Page À Propos...')
  const aboutImages = ['atelier1', 'fondatrice', 'atelier2', 'atelier3', 'atelier4', 'atelier5']
    .filter((k) => assets[k])
    .map((k, i) => ({
      ...imageField(assets[k], `Photo atelier ${i + 1}`),
      _key: `img${i}`,
    }))
  if (aboutImages.length > 0) {
    await client.patch('pageAPropos').set({ images: aboutImages }).commit()
    console.log('  ✓ pageAPropos')
  }

  // Patch Catégories
  console.log('Patching Catégories...')
  const cats = [
    ['cat-bouquets', 'catBouquets', 'Bouquets artisanaux'],
    ['cat-compositions', 'catCompositions', 'Compositions florales'],
    ['cat-mariages', 'catMariages', 'Fleurs de mariage'],
    ['cat-evenements', 'catEvenements', 'Décoration événementielle'],
  ]
  for (const [id, key, alt] of cats) {
    if (assets[key]) {
      await client.patch(id).set({ image: imageField(assets[key], alt) }).commit()
      console.log(`  ✓ ${id}`)
    }
  }

  // Patch Produits
  console.log('Patching Produits...')
  const prods = [
    ['prod-aurore', 'aurore', 'Bouquet Aurore'],
    ['prod-jardin-secret', 'jardinSecret', 'Composition Jardin Secret'],
    ['prod-rosee', 'rosee', 'Bouquet Rosée du Matin'],
    ['prod-champetre', 'champetre', 'Couronne Champêtre'],
    ['prod-soleil-dor', 'soleilDor', "Bouquet Soleil d'Or"],
    ['prod-elegance', 'elegance', 'Centre de Table Élégance'],
    ['prod-pastel', 'pastel', 'Bouquet Douceur Pastel'],
    ['prod-zen', 'zen', 'Composition Zen'],
    ['prod-boutonniere', 'boutonniere', 'Boutonnière Classique'],
  ]
  for (const [id, key, alt] of prods) {
    if (assets[key]) {
      await client
        .patch(id)
        .set({ images: [{ ...imageField(assets[key], alt), _key: 'main' }] })
        .commit()
      console.log(`  ✓ ${id}`)
    }
  }

  console.log('\n=== Done! All images added. ===')
} catch (err) {
  console.error('Error:', err.message)
}

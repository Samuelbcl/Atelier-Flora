import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'bq9tfqwt',
  dataset: 'production',
  apiVersion: '2025-03-27',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

// Fetch all draft documents
const drafts = await client.fetch('*[_id in path("drafts.**")]{_id, _type, _rev}')

if (drafts.length === 0) {
  console.log('No drafts to publish.')
  process.exit(0)
}

console.log(`Found ${drafts.length} drafts. Publishing...`)

for (const draft of drafts) {
  const publishedId = draft._id.replace('drafts.', '')
  try {
    // Get the full draft document
    const doc = await client.getDocument(draft._id)
    const { _id, _rev, ...fields } = doc
    // Create or replace the published version
    await client.createOrReplace({ ...fields, _id: publishedId })
    // Delete the draft
    await client.delete(draft._id)
    console.log(`  ✓ ${publishedId}`)
  } catch (err) {
    console.error(`  ✗ ${publishedId}: ${err.message}`)
  }
}

console.log('Done!')

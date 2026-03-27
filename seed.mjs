import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'

const client = createClient({
  projectId: 'bq9tfqwt',
  dataset: 'production',
  apiVersion: '2025-03-27',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

const lines = readFileSync('seed.ndjson', 'utf-8')
  .split('\n')
  .filter(Boolean)
  .map((line) => JSON.parse(line))

console.log(`Importing ${lines.length} documents...`)

let transaction = client.transaction()
for (const doc of lines) {
  transaction = transaction.createOrReplace(doc)
}

try {
  const result = await transaction.commit()
  console.log(`Done! ${result.documentIds.length} documents created.`)
} catch (err) {
  console.error('Error:', err.message)
}

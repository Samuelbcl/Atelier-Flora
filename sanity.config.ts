'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@/sanity/schemas'
import { structure } from '@/sanity/structure'

export default defineConfig({
  name: 'atelier-flora',
  title: 'Atelier Flora',
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: '2025-03-27' }),
  ],
  schema: {
    types: schemaTypes,
    // Prevent creating new documents for singleton types
    templates: (templates) =>
      templates.filter(
        ({ schemaType }) => !['pageAccueil', 'pageAPropos'].includes(schemaType)
      ),
  },
  document: {
    // Prevent deleting singleton documents
    actions: (prev, context) => {
      if (['pageAccueil', 'pageAPropos'].includes(context.schemaType)) {
        return prev.filter(
          ({ action }) => action !== 'delete'
        )
      }
      return prev
    },
  },
})

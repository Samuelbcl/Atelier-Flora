'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@/sanity/schemas'

export default defineConfig({
  name: 'atelier-flora',
  title: 'Atelier Flora',
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: '2025-03-27' }),
  ],
  schema: {
    types: schemaTypes,
  },
})

'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@/sanity/schemas'
import { structure } from '@/sanity/structure'
import { ConfirmPublishAction } from '@/sanity/actions/confirm-publish'

const SINGLETONS = [
  'pageAccueil',
  'pageAPropos',
  'pageGalerie',
  'pageCatalogue',
  'pageContact',
  'settings',
]

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
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },
  document: {
    actions: (prev, context) => {
      const actions = prev.map((action) =>
        action.action === 'publish' ? ConfirmPublishAction : action
      )
      if (SINGLETONS.includes(context.schemaType)) {
        return actions.filter(
          ({ action }) => action !== 'delete' && action !== 'duplicate'
        )
      }
      return actions
    },
  },
})

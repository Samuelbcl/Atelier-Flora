'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from '@/sanity/schemas'
import { structure } from '@/sanity/structure'
import { ConfirmPublishAction } from '@/sanity/actions/confirm-publish'

const SINGLETONS = [
  'pageAccueil',
  'pageAPropos',
  'pageContact',
  'pageMariage',
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
  ],
  // Masquer Vision et Releases de la barre de navigation
  tools: (prev) =>
    prev.filter((tool) => !['vision', 'releases', 'scheduled-publishing'].includes(tool.name)),
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
          ({ action }) => action !== 'delete' && action !== 'duplicate' && action !== 'unpublish'
        )
      }
      return actions
    },
  },
})

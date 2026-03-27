'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@/sanity/schemas'
import { structure } from '@/sanity/structure'
import { ConfirmPublishAction } from '@/sanity/actions/confirm-publish'

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
      templates.filter(
        ({ schemaType }) => !['pageAccueil', 'pageAPropos'].includes(schemaType)
      ),
  },
  document: {
    actions: (prev, context) => {
      // Replace default publish with confirm-publish
      const actions = prev.map((action) =>
        action.action === 'publish' ? ConfirmPublishAction : action
      )

      // Prevent deleting singleton documents
      if (['pageAccueil', 'pageAPropos'].includes(context.schemaType)) {
        return actions.filter(({ action }) => action !== 'delete')
      }

      return actions
    },
  },
})

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'categorieGalerie',
  title: 'Catégorie de galerie',
  type: 'document',
  fields: [
    defineField({
      name: 'nom',
      title: 'Nom',
      type: 'string',
      description: 'Nom de la catégorie (ex: Mariages, Événements, Boutique).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'nom', maxLength: 96 },
      description: 'URL de la catégorie (généré automatiquement).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Les catégories sont triées par ce nombre (1 = première).',
    }),
  ],
  orderings: [
    { title: 'Ordre d\'affichage', name: 'ordreAsc', by: [{ field: 'ordre', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'nom' },
  },
})

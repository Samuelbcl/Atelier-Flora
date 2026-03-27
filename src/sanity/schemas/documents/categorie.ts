import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'categorie',
  title: 'Catégorie',
  type: 'document',
  fields: [
    defineField({
      name: 'nom',
      title: 'Nom',
      type: 'string',
      description: 'Nom de la catégorie (ex: Bouquets, Compositions, Mariages).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: { source: 'nom', maxLength: 96 },
      description: 'Adresse web de la catégorie (générée automatiquement).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Courte description de la catégorie.',
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

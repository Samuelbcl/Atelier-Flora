import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'infoCard',
  title: 'Carte d\'information',
  type: 'object',
  fields: [
    defineField({
      name: 'icone',
      title: 'Icône',
      type: 'string',
      description: 'Emoji ou icône (ex: 🌱, ✂️, 💚, 🚚). Laisser vide si non souhaité.',
    }),
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'texte',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Texte explicatif court.',
    }),
  ],
  preview: {
    select: { title: 'titre', subtitle: 'texte' },
  },
})

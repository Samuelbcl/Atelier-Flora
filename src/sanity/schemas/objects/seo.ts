import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitre',
      title: 'Titre meta',
      type: 'string',
      description: 'Titre affiché dans les résultats de recherche',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Description meta',
      type: 'text',
      rows: 3,
      description: 'Description affichée dans les résultats de recherche',
    }),
    defineField({
      name: 'ogImage',
      title: 'Image Open Graph',
      type: 'image',
      description: 'Image affichée lors du partage sur les réseaux sociaux',
    }),
  ],
})

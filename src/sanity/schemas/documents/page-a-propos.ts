import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pageAPropos',
  title: 'Page À propos',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contenu',
      title: 'Contenu',
      type: 'portableText',
    }),
    defineField({
      name: 'images',
      title: 'Galerie photos',
      type: 'array',
      of: [{ type: 'imageWithAlt' }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Page À propos' }
    },
  },
})

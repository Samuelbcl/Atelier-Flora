import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page personnalisée',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre de la page',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: { source: 'titre' },
      validation: (r) => r.required(),
      description: 'L\'adresse de la page (ex: /evenements).',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      description: 'Glissez-déposez les sections pour construire votre page.',
      of: [
        { type: 'heroSectionBlock' },
        { type: 'textImageSection' },
        { type: 'gridSection' },
        { type: 'testimonialsSection' },
        { type: 'gallerySection' },
        { type: 'ctaBanner' },
        { type: 'contactSection' },
        { type: 'faqSection' },
        { type: 'dividerSection' },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: { title: 'titre', slug: 'slug.current' },
    prepare({ title, slug }) {
      return { title: title || 'Page', subtitle: slug ? `/${slug}` : '' }
    },
  },
})

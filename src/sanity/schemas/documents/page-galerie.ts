import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pageGalerie',
  title: 'Page Galerie',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Bandeau principal', default: true },
    { name: 'cta', title: 'Bandeau CTA' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Bandeau principal',
      type: 'heroSection',
      group: 'hero',
      description: 'Configurez le bandeau affiché en haut de la page galerie.',
    }),
    defineField({
      name: 'cta',
      title: 'Bandeau d\'appel à l\'action',
      type: 'ctaSection',
      group: 'cta',
      description: 'Bandeau affiché en bas de la page pour inciter les visiteurs à vous contacter.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Page Galerie' }
    },
  },
})

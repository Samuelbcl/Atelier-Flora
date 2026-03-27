import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pageCatalogue',
  title: 'Page Catalogue',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Bandeau principal', default: true },
    { name: 'infos', title: 'Informations commande' },
    { name: 'cta', title: 'Bandeau CTA' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Bandeau principal',
      type: 'heroSection',
      group: 'hero',
      description: 'Configurez le bandeau affiché en haut du catalogue.',
    }),
    defineField({
      name: 'infosCommande',
      title: 'Informations de commande',
      type: 'array',
      group: 'infos',
      of: [{ type: 'infoCard' }],
      description: 'Cartes affichées en bas du catalogue (ex: Livraison, Sur mesure, Emballage). 3 recommandées.',
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'cta',
      title: 'Bandeau d\'appel à l\'action',
      type: 'ctaSection',
      group: 'cta',
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
      return { title: 'Page Catalogue' }
    },
  },
})

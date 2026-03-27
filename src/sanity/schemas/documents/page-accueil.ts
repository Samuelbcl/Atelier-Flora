import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pageAccueil',
  title: 'Page d\'accueil',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre principal',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sousTitre',
      title: 'Sous-titre',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Image hero',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'introduction',
      title: 'Texte d\'introduction',
      type: 'portableText',
    }),
    defineField({
      name: 'produitsVedettes',
      title: 'Produits vedettes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'produit' }] }],
      description: 'Sélectionnez les produits à mettre en avant sur la page d\'accueil',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Page d\'accueil' }
    },
  },
})

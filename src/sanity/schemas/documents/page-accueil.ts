import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pageAccueil',
  title: 'Page d\'accueil',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'valeurs', title: 'Valeurs' },
    { name: 'introduction', title: 'Notre histoire' },
    { name: 'produits', title: 'Produits vedettes' },
    { name: 'cta', title: 'Bandeau CTA' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Hero
    defineField({
      name: 'titre',
      title: 'Titre principal',
      type: 'string',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sousTitre',
      title: 'Sous-titre',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Image hero',
      type: 'imageWithAlt',
      group: 'hero',
    }),

    // Valeurs
    defineField({
      name: 'valeurs',
      title: 'Nos valeurs',
      description: '3 points forts affichés sous le hero',
      type: 'array',
      group: 'valeurs',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icone', title: 'Emoji / Icône', type: 'string', description: 'Ex: 🌱, ✂️, 💚' },
            { name: 'titre', title: 'Titre', type: 'string' },
            { name: 'texte', title: 'Description', type: 'text', rows: 3 },
          ],
          preview: {
            select: { title: 'titre', subtitle: 'texte', media: 'icone' },
            prepare({ title, subtitle }) {
              return { title, subtitle }
            },
          },
        },
      ],
      validation: (rule) => rule.max(4),
    }),

    // Introduction / Notre histoire
    defineField({
      name: 'introTitre',
      title: 'Titre de la section',
      type: 'string',
      group: 'introduction',
    }),
    defineField({
      name: 'introduction',
      title: 'Texte d\'introduction',
      type: 'portableText',
      group: 'introduction',
    }),
    defineField({
      name: 'introImage',
      title: 'Photo de l\'atelier',
      type: 'imageWithAlt',
      group: 'introduction',
    }),

    // Produits vedettes
    defineField({
      name: 'produitsVedettes',
      title: 'Produits vedettes',
      type: 'array',
      group: 'produits',
      of: [{ type: 'reference', to: [{ type: 'produit' }] }],
      description: 'Sélectionnez les produits à mettre en avant (3 recommandés)',
    }),

    // Bandeau CTA
    defineField({
      name: 'ctaTitre',
      title: 'Titre du bandeau',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaTexte',
      title: 'Texte du bandeau',
      type: 'text',
      rows: 2,
      group: 'cta',
    }),
    defineField({
      name: 'ctaBouton',
      title: 'Texte du bouton',
      type: 'string',
      group: 'cta',
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Page d\'accueil' }
    },
  },
})

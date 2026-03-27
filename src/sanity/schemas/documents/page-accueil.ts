import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pageAccueil',
  title: 'Page d\'accueil',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Bandeau principal', default: true },
    { name: 'valeurs', title: 'Nos points forts' },
    { name: 'introduction', title: 'Notre histoire' },
    { name: 'produits', title: 'Produits vedettes' },
    { name: 'temoignages', title: 'Témoignages' },
    { name: 'cta', title: 'Bandeau CTA' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Hero
    defineField({
      name: 'hero',
      title: 'Bandeau principal',
      type: 'heroSection',
      group: 'hero',
      description: 'Le grand bandeau affiché en haut de la page d\'accueil.',
    }),

    // Valeurs
    defineField({
      name: 'valeurs',
      title: 'Nos points forts',
      type: 'array',
      group: 'valeurs',
      of: [{ type: 'infoCard' }],
      description: '3 à 4 points forts affichés sous le bandeau principal (ex: Fleurs de saison, Fait main, Éco-responsable).',
      validation: (rule) => rule.max(4),
    }),

    // Introduction
    defineField({
      name: 'introTitre',
      title: 'Titre de la section',
      type: 'string',
      group: 'introduction',
      description: 'Titre affiché au-dessus du texte (ex: "L\'art floral au service de vos émotions").',
    }),
    defineField({
      name: 'introduction',
      title: 'Texte de présentation',
      type: 'portableText',
      group: 'introduction',
      description: 'Texte de présentation de votre atelier.',
    }),
    defineField({
      name: 'introImage',
      title: 'Photo de l\'atelier',
      type: 'imageWithAlt',
      group: 'introduction',
      description: 'Photo affichée à côté du texte. Taille recommandée : 600×750px (format portrait).',
    }),

    // Produits vedettes
    defineField({
      name: 'produitsVedettesTitre',
      title: 'Titre de la section',
      type: 'string',
      group: 'produits',
      description: 'Titre affiché au-dessus des produits (ex: "Nos créations phares").',
    }),
    defineField({
      name: 'produitsVedettes',
      title: 'Produits mis en avant',
      type: 'array',
      group: 'produits',
      of: [{ type: 'reference', to: [{ type: 'produit' }] }],
      description: 'Sélectionnez 3 produits à mettre en avant sur la page d\'accueil.',
    }),

    // Témoignages
    defineField({
      name: 'temoignagesTitre',
      title: 'Titre de la section',
      type: 'string',
      group: 'temoignages',
      description: 'Titre affiché au-dessus des témoignages (ex: "Ce que disent nos clients").',
    }),
    defineField({
      name: 'temoignagesAffiches',
      title: 'Témoignages à afficher',
      type: 'array',
      group: 'temoignages',
      of: [{ type: 'reference', to: [{ type: 'temoignage' }] }],
      description: 'Sélectionnez 3 témoignages. Laissez vide pour afficher les 3 plus récents.',
    }),

    // CTA
    defineField({
      name: 'cta',
      title: 'Bandeau d\'appel à l\'action',
      type: 'ctaSection',
      group: 'cta',
      description: 'Le bandeau coloré affiché en bas de page.',
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

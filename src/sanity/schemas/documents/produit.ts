import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'produit',
  title: 'Produit',
  type: 'document',
  groups: [
    { name: 'general', title: 'Général', default: true },
    { name: 'medias', title: 'Photos' },
    { name: 'details', title: 'Détails' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'nom',
      title: 'Nom du produit',
      type: 'string',
      group: 'general',
      description: 'Nom affiché sur le site (ex: Bouquet Aurore).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      group: 'general',
      options: { source: 'nom', maxLength: 96 },
      description: 'Adresse web du produit (générée automatiquement à partir du nom).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'portableText',
      group: 'general',
      description: 'Description détaillée du produit.',
    }),
    defineField({
      name: 'categorie',
      title: 'Catégorie',
      type: 'reference',
      to: [{ type: 'categorie' }],
      group: 'general',
      description: 'Catégorie du produit (ex: Bouquets, Compositions, Mariages).',
    }),
    defineField({
      name: 'images',
      title: 'Photos du produit',
      type: 'array',
      group: 'medias',
      of: [{ type: 'imageWithAlt' }],
      description: 'La première photo sera utilisée comme image principale. Taille recommandée : 600×800px.',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'prix',
      title: 'Prix (€)',
      type: 'number',
      group: 'details',
      description: 'Prix en euros (ex: 45).',
      validation: (rule) => rule.positive(),
    }),
    defineField({
      name: 'etiquette',
      title: 'Étiquette',
      type: 'string',
      group: 'details',
      description: 'Texte affiché sur la carte produit (ex: Fleurs de saison, Nouveau, Best-seller). Laisser vide pour aucune.',
    }),
    defineField({
      name: 'disponible',
      title: 'Disponible',
      type: 'boolean',
      group: 'details',
      description: 'Décochez pour marquer le produit comme indisponible sur le site.',
      initialValue: true,
    }),
    defineField({
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
      group: 'details',
      description: 'Les produits sont triés par ce nombre (1 = premier affiché).',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  orderings: [
    { title: 'Ordre d\'affichage', name: 'ordreAsc', by: [{ field: 'ordre', direction: 'asc' }] },
  ],
  preview: {
    select: {
      title: 'nom',
      subtitle: 'prix',
      media: 'images.0.image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `${subtitle} €` : '',
        media,
      }
    },
  },
})

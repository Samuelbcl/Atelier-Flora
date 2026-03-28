import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'categorie',
  title: 'Catégorie',
  type: 'document',
  fieldsets: [
    { name: 'general', title: 'Informations générales', options: { collapsible: true, collapsed: false } },
    { name: 'seoContent', title: 'Contenu SEO (affiché sous les produits)', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'nom',
      title: 'Nom',
      type: 'string',
      fieldset: 'general',
      description: 'Nom de la catégorie (ex: Bouquets, Deuil, Roses).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      fieldset: 'general',
      options: { source: 'nom', maxLength: 96 },
      description: 'Adresse web de la catégorie (générée automatiquement).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description courte',
      type: 'text',
      fieldset: 'general',
      description: 'Description affichée sur la carte de la catégorie (1-2 phrases).',
    }),
    defineField({
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
      fieldset: 'general',
      description: 'Les catégories sont triées par ce nombre (1 = première).',
    }),
    defineField({
      name: 'contenuSEO',
      title: 'Contenu riche',
      type: 'portableText',
      fieldset: 'seoContent',
      description: 'Texte détaillé affiché sous les produits de cette catégorie. Utilisez des titres, paragraphes et images pour un contenu riche et optimisé pour le référencement.',
    }),
  ],
  orderings: [
    { title: 'Ordre d\'affichage', name: 'ordreAsc', by: [{ field: 'ordre', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'nom' },
  },
})

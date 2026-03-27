import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'photoGalerie',
  title: 'Photo de galerie',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'imageWithAlt',
      description: 'Photo à afficher dans la galerie. Taille recommandée : 800×800px minimum.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'legende',
      title: 'Légende',
      type: 'string',
      description: 'Titre ou légende de la photo (optionnel, affiché au survol).',
    }),
    defineField({
      name: 'categorie',
      title: 'Catégorie',
      type: 'reference',
      to: [{ type: 'categorieGalerie' }],
      description: 'Catégorie de la photo (pour le filtre sur le site).',
    }),
    defineField({
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Les photos sont triées par ce nombre (1 = première).',
    }),
  ],
  orderings: [
    { title: 'Ordre d\'affichage', name: 'ordreAsc', by: [{ field: 'ordre', direction: 'asc' }] },
  ],
  preview: {
    select: {
      title: 'legende',
      subtitle: 'categorie.nom',
      media: 'image.image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Sans légende',
        subtitle: subtitle || '',
        media,
      }
    },
  },
})

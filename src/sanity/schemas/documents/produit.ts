import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'produit',
  title: 'Produit',
  type: 'document',
  fields: [
    defineField({
      name: 'nom',
      title: 'Nom',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'nom', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'portableText',
    }),
    defineField({
      name: 'prix',
      title: 'Prix (€)',
      type: 'number',
      validation: (rule) => rule.positive(),
    }),
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'imageWithAlt' }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'categorie',
      title: 'Catégorie',
      type: 'reference',
      to: [{ type: 'categorie' }],
    }),
    defineField({
      name: 'disponible',
      title: 'Disponible',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'ordreAsc',
      by: [{ field: 'ordre', direction: 'asc' }],
    },
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

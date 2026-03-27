import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Texte alternatif',
      type: 'string',
      description: 'Important pour l\'accessibilité et le référencement',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      media: 'image',
      title: 'alt',
    },
  },
})

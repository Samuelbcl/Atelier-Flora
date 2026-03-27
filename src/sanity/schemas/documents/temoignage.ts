import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'temoignage',
  title: 'Témoignage',
  type: 'document',
  fields: [
    defineField({
      name: 'auteur',
      title: 'Auteur',
      type: 'string',
      description: 'Prénom et première lettre du nom (ex: Marie L.).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'texte',
      title: 'Témoignage',
      type: 'text',
      rows: 4,
      description: 'Le témoignage du client.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'number',
      description: 'Note sur 5 étoiles (optionnel).',
      validation: (rule) => rule.min(1).max(5),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'Date du témoignage (optionnel).',
    }),
    defineField({
      name: 'actif',
      title: 'Actif',
      type: 'boolean',
      description: 'Décochez pour masquer ce témoignage sur le site.',
      initialValue: true,
    }),
  ],
  orderings: [
    { title: 'Date (récent)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
  preview: {
    select: {
      title: 'auteur',
      subtitle: 'texte',
      active: 'actif',
    },
    prepare({ title, subtitle, active }) {
      return {
        title: `${active === false ? '🔴 ' : ''}${title}`,
        subtitle: subtitle?.slice(0, 80) + (subtitle?.length > 80 ? '…' : ''),
      }
    },
  },
})

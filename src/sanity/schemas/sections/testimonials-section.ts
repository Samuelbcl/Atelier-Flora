import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonialsSection',
  title: 'Témoignages',
  type: 'object',
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string', initialValue: 'Ce que nos clients disent' }),
    defineField({ name: 'style', title: 'Style', type: 'string', options: { list: [{ title: 'Cartes', value: 'cards' }, { title: 'Citations', value: 'quotes' }, { title: 'Minimal', value: 'minimal' }] }, initialValue: 'quotes' }),
    defineField({
      name: 'temoignages',
      title: 'Témoignages',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'temoignage' }] }],
      description: 'Sélectionnez les témoignages à afficher.',
    }),
    defineField({ name: 'backgroundColor', title: 'Couleur de fond', type: 'color' }),
  ],
  preview: {
    select: { title: 'titre', temoignages: 'temoignages' },
    prepare({ title, temoignages }) {
      return { title: title || 'Témoignages', subtitle: `Témoignages — ${temoignages?.length || 0}` }
    },
  },
})

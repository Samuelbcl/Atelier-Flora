import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'dividerSection',
  title: 'Séparateur',
  type: 'object',
  fields: [
    defineField({ name: 'style', title: 'Style', type: 'string', options: { list: [{ title: 'Ligne', value: 'line' }, { title: 'Espace vide', value: 'space' }, { title: 'Ornement', value: 'ornament' }] }, initialValue: 'line' }),
    defineField({ name: 'hauteur', title: 'Hauteur', type: 'string', options: { list: [{ title: 'Petit', value: 'sm' }, { title: 'Moyen', value: 'md' }, { title: 'Grand', value: 'lg' }, { title: 'Très grand', value: 'xl' }] }, initialValue: 'md' }),
    defineField({ name: 'couleur', title: 'Couleur', type: 'color' }),
  ],
  preview: {
    select: { style: 'style' },
    prepare({ style }) {
      return { title: 'Séparateur', subtitle: style || 'line' }
    },
  },
})

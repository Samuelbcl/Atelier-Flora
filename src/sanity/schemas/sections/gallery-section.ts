import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'gallerySection',
  title: 'Galerie',
  type: 'object',
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string' }),
    defineField({ name: 'layout', title: 'Disposition', type: 'string', options: { list: [{ title: 'Grille', value: 'grid' }, { title: 'Mosaïque', value: 'masonry' }] }, initialValue: 'grid' }),
    defineField({ name: 'colonnes', title: 'Colonnes', type: 'number', options: { list: [{ title: '2', value: 2 }, { title: '3', value: 3 }, { title: '4', value: 4 }] }, initialValue: 3 }),
    defineField({ name: 'images', title: 'Images', type: 'array', of: [{ type: 'imageWithAlt' }], validation: (r) => r.min(1) }),
    defineField({ name: 'backgroundColor', title: 'Couleur de fond', type: 'color' }),
  ],
  preview: {
    select: { title: 'titre', images: 'images' },
    prepare({ title, images }) {
      return { title: title || 'Galerie', subtitle: `Galerie — ${images?.length || 0} photos` }
    },
  },
})

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'gridSection',
  title: 'Grille',
  type: 'object',
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string' }),
    defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'string' }),
    defineField({ name: 'colonnes', title: 'Nombre de colonnes', type: 'number', options: { list: [{ title: '2 colonnes', value: 2 }, { title: '3 colonnes', value: 3 }, { title: '4 colonnes', value: 4 }] }, initialValue: 3 }),
    defineField({
      name: 'items',
      title: 'Éléments',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'image', title: 'Image', type: 'imageWithAlt' }),
          defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (r) => r.required() }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          defineField({ name: 'lien', title: 'Lien', type: 'string' }),
          defineField({ name: 'badge', title: 'Badge', type: 'string', description: 'Ex: "Nouveau", "Best-seller".' }),
        ],
        preview: {
          select: { title: 'titre', subtitle: 'badge', media: 'image.image' },
        },
      }],
    }),
    defineField({ name: 'backgroundColor', title: 'Couleur de fond', type: 'color' }),
  ],
  preview: {
    select: { title: 'titre', items: 'items' },
    prepare({ title, items }) {
      return { title: title || 'Grille', subtitle: `Grille — ${items?.length || 0} éléments` }
    },
  },
})

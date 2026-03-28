import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'textImageSection',
  title: 'Texte + Image',
  type: 'object',
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string' }),
    defineField({ name: 'label', title: 'Label', type: 'string', description: 'Petit texte au-dessus du titre.' }),
    defineField({ name: 'contenu', title: 'Contenu', type: 'portableText' }),
    defineField({ name: 'image', title: 'Image', type: 'imageWithAlt' }),
    defineField({ name: 'imagePosition', title: 'Position de l\'image', type: 'string', options: { list: [{ title: 'À gauche', value: 'left' }, { title: 'À droite', value: 'right' }] }, initialValue: 'right' }),
    defineField({ name: 'ctaTexte', title: 'Bouton — texte', type: 'string' }),
    defineField({ name: 'ctaLien', title: 'Bouton — lien', type: 'string' }),
    defineField({ name: 'backgroundColor', title: 'Couleur de fond', type: 'color' }),
  ],
  preview: {
    select: { title: 'titre' },
    prepare({ title }) {
      return { title: title || 'Texte + Image', subtitle: 'Texte + Image' }
    },
  },
})

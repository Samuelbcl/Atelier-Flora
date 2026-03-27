import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Section Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
    }),
    defineField({
      name: 'sousTitre',
      title: 'Sous-titre',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image de fond',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'ctaTexte',
      title: 'Texte du bouton',
      type: 'string',
    }),
    defineField({
      name: 'ctaLien',
      title: 'Lien du bouton',
      type: 'string',
    }),
  ],
})

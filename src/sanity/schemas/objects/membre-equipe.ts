import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'membreEquipe',
  title: 'Membre de l\'équipe',
  type: 'object',
  fields: [
    defineField({
      name: 'nom',
      title: 'Nom complet',
      type: 'string',
      description: 'Prénom et nom.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rôle',
      type: 'string',
      description: 'Poste ou rôle (ex: Fondatrice, Fleuriste senior).',
    }),
    defineField({
      name: 'photo',
      title: 'Photo portrait',
      type: 'imageWithAlt',
      description: 'Photo du membre. Taille recommandée : 400×500px (format portrait).',
    }),
    defineField({
      name: 'bio',
      title: 'Biographie',
      type: 'text',
      rows: 3,
      description: 'Courte biographie (optionnel).',
    }),
  ],
  preview: {
    select: {
      title: 'nom',
      subtitle: 'role',
      media: 'photo.image',
    },
  },
})

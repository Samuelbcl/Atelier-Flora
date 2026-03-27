import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ctaSection',
  title: 'Bandeau d\'appel à l\'action',
  type: 'object',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      description: 'Titre du bandeau (ex: "Un événement à fleurir ?").',
    }),
    defineField({
      name: 'texte',
      title: 'Texte',
      type: 'text',
      rows: 2,
      description: 'Texte d\'accompagnement sous le titre.',
    }),
    defineField({
      name: 'boutonTexte',
      title: 'Texte du bouton',
      type: 'string',
      description: 'Texte affiché sur le bouton (ex: "Nous contacter").',
    }),
    defineField({
      name: 'boutonLien',
      title: 'Lien du bouton',
      type: 'string',
      description: 'Page de destination (ex: /contact).',
    }),
  ],
})

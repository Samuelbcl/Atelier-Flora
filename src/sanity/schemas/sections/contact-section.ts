import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactSection',
  title: 'Contact / Formulaire',
  type: 'object',
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string', initialValue: 'Contactez-nous' }),
    defineField({ name: 'texte', title: 'Texte d\'introduction', type: 'text', rows: 3 }),
    defineField({ name: 'layout', title: 'Disposition', type: 'string', options: { list: [{ title: 'Côte à côte', value: 'side-by-side' }, { title: 'Empilé', value: 'stacked' }] }, initialValue: 'side-by-side' }),
    defineField({ name: 'afficherInfos', title: 'Afficher les coordonnées', type: 'boolean', description: 'Affiche adresse, téléphone et email à côté du formulaire.', initialValue: true }),
    defineField({ name: 'afficherHoraires', title: 'Afficher les horaires', type: 'boolean', initialValue: true }),
    defineField({
      name: 'sujets',
      title: 'Sujets du formulaire',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Les options du menu déroulant "Sujet".',
      initialValue: ['Commande sur mesure', 'Mariage', 'Événement', 'Renseignement', 'Autre'],
    }),
    defineField({ name: 'backgroundColor', title: 'Couleur de fond', type: 'color' }),
  ],
  preview: {
    select: { title: 'titre' },
    prepare({ title }) {
      return { title: title || 'Contact', subtitle: 'Formulaire de contact' }
    },
  },
})

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pageContact',
  title: 'Page Contact',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Bandeau principal', default: true },
    { name: 'contenu', title: 'Contenu' },
    { name: 'formulaire', title: 'Formulaire' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Bandeau principal',
      type: 'heroSection',
      group: 'hero',
      description: 'Configurez le bandeau affiché en haut de la page contact.',
    }),
    defineField({
      name: 'introTexte',
      title: 'Texte d\'introduction',
      type: 'text',
      rows: 3,
      group: 'contenu',
      description: 'Texte affiché sous les coordonnées (optionnel).',
    }),
    defineField({
      name: 'sujetsFormulaire',
      title: 'Sujets du formulaire',
      type: 'array',
      group: 'formulaire',
      of: [{ type: 'string' }],
      description: 'Options du menu déroulant "Sujet" dans le formulaire de contact.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Page Contact' }
    },
  },
})

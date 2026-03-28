import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ctaBanner',
  title: 'Bannière CTA',
  type: 'object',
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string' }),
    defineField({ name: 'texte', title: 'Texte', type: 'text', rows: 3 }),
    defineField({ name: 'ctaTexte', title: 'Bouton — texte', type: 'string' }),
    defineField({ name: 'ctaLien', title: 'Bouton — lien', type: 'string' }),
    defineField({ name: 'ctaStyle', title: 'Bouton — style', type: 'string', options: { list: [{ title: 'Principal', value: 'primary' }, { title: 'Contour blanc', value: 'outline' }] }, initialValue: 'primary' }),
    defineField({ name: 'image', title: 'Image de fond', type: 'imageWithAlt' }),
    defineField({ name: 'backgroundColor', title: 'Couleur de fond', type: 'color', description: 'Utilisé si pas d\'image de fond.' }),
    defineField({ name: 'alignment', title: 'Alignement', type: 'string', options: { list: [{ title: 'Gauche', value: 'left' }, { title: 'Centre', value: 'center' }] }, initialValue: 'center' }),
  ],
  preview: {
    select: { title: 'titre' },
    prepare({ title }) {
      return { title: title || 'Bannière CTA', subtitle: 'CTA' }
    },
  },
})

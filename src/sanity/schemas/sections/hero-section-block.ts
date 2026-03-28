import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroSectionBlock',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({ name: 'variant', title: 'Variante', type: 'string', options: { list: [{ title: 'Plein écran', value: 'fullscreen' }, { title: 'Moitié écran', value: 'split' }, { title: 'Minimal', value: 'minimal' }] }, initialValue: 'fullscreen' }),
    defineField({ name: 'image', title: 'Image de fond', type: 'imageWithAlt', description: 'Image affichée en arrière-plan.' }),
    defineField({ name: 'overlay', title: 'Assombrir l\'image', type: 'boolean', initialValue: true }),
    defineField({ name: 'overlayOpacity', title: 'Opacité de l\'assombrissement (%)', type: 'number', validation: (r) => r.min(0).max(100), initialValue: 40, hidden: ({ parent }) => !parent?.overlay }),
    defineField({ name: 'titre', title: 'Titre', type: 'string' }),
    defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'text', rows: 3 }),
    defineField({ name: 'label', title: 'Label au-dessus du titre', type: 'string', description: 'Ex: "Fleuriste artisanale à Liège".' }),
    defineField({ name: 'alignment', title: 'Alignement', type: 'string', options: { list: [{ title: 'Gauche', value: 'left' }, { title: 'Centre', value: 'center' }, { title: 'Droite', value: 'right' }] }, initialValue: 'center' }),
    defineField({ name: 'ctaTexte', title: 'Bouton — texte', type: 'string' }),
    defineField({ name: 'ctaLien', title: 'Bouton — lien', type: 'string' }),
    defineField({ name: 'ctaStyle', title: 'Bouton — style', type: 'string', options: { list: [{ title: 'Principal', value: 'primary' }, { title: 'Secondaire', value: 'secondary' }, { title: 'Contour', value: 'outline' }] }, initialValue: 'primary' }),
    defineField({ name: 'minHeight', title: 'Hauteur minimale', type: 'string', options: { list: [{ title: 'Auto', value: 'auto' }, { title: '50% écran', value: '50vh' }, { title: '75% écran', value: '75vh' }, { title: 'Plein écran', value: '100vh' }] }, initialValue: '100vh' }),
  ],
  preview: {
    select: { title: 'titre', variant: 'variant' },
    prepare({ title, variant }) {
      return { title: title || 'Hero', subtitle: `Hero — ${variant || 'fullscreen'}` }
    },
  },
})

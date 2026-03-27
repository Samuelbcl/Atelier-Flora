import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Section Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Étiquette',
      type: 'string',
      description: 'Petit texte au-dessus du titre (ex: "Nos réalisations", "Parlons fleurs"). Optionnel.',
    }),
    defineField({
      name: 'titre',
      title: 'Titre principal',
      type: 'string',
      description: 'Titre affiché en grand sur le bandeau.',
    }),
    defineField({
      name: 'sousTitre',
      title: 'Sous-titre',
      type: 'text',
      rows: 2,
      description: 'Texte d\'accroche sous le titre.',
    }),
    defineField({
      name: 'image',
      title: 'Image de fond',
      type: 'imageWithAlt',
      description: 'Image affichée en arrière-plan. Taille recommandée : 1920×1080px.',
    }),
    defineField({
      name: 'ctaTexte',
      title: 'Texte du bouton',
      type: 'string',
      description: 'Texte du bouton d\'action. Laisser vide pour masquer le bouton.',
    }),
    defineField({
      name: 'ctaLien',
      title: 'Lien du bouton',
      type: 'string',
      description: 'Page de destination (ex: /contact, /catalogue).',
    }),
  ],
})

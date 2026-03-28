import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'faqSection',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string', initialValue: 'Questions fréquentes' }),
    defineField({
      name: 'questions',
      title: 'Questions / Réponses',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'question', title: 'Question', type: 'string', validation: (r) => r.required() }),
          defineField({ name: 'reponse', title: 'Réponse', type: 'portableText' }),
        ],
        preview: {
          select: { title: 'question' },
        },
      }],
    }),
    defineField({ name: 'backgroundColor', title: 'Couleur de fond', type: 'color' }),
  ],
  preview: {
    select: { title: 'titre', questions: 'questions' },
    prepare({ title, questions }) {
      return { title: title || 'FAQ', subtitle: `FAQ — ${questions?.length || 0} questions` }
    },
  },
})

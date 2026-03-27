import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pageAPropos',
  title: 'Page À propos',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'contenu', title: 'Contenu' },
    { name: 'valeurs', title: 'Valeurs' },
    { name: 'galerie', title: 'Galerie photos' },
    { name: 'citation', title: 'Citation' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contenu',
      title: 'Contenu principal',
      type: 'portableText',
      group: 'contenu',
    }),
    defineField({
      name: 'valeurs',
      title: 'Nos valeurs',
      description: 'Les valeurs affichées en grille (4 recommandées)',
      type: 'array',
      group: 'valeurs',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'titre', title: 'Titre', type: 'string' },
            { name: 'texte', title: 'Description', type: 'text', rows: 3 },
          ],
          preview: {
            select: { title: 'titre', subtitle: 'texte' },
          },
        },
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'images',
      title: 'Galerie photos',
      type: 'array',
      group: 'galerie',
      of: [{ type: 'imageWithAlt' }],
    }),
    defineField({
      name: 'citationTexte',
      title: 'Texte de la citation',
      type: 'text',
      rows: 3,
      group: 'citation',
    }),
    defineField({
      name: 'citationAuteur',
      title: 'Auteur de la citation',
      type: 'string',
      group: 'citation',
      description: 'Ex: Clara Dumont, fondatrice d\'Atelier Flora',
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
      return { title: 'Page À propos' }
    },
  },
})

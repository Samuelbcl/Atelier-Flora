import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pageAPropos',
  title: 'Page À propos',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Bandeau principal', default: true },
    { name: 'contenu', title: 'Notre histoire' },
    { name: 'valeurs', title: 'Nos valeurs' },
    { name: 'equipe', title: 'L\'équipe' },
    { name: 'galerie', title: 'Galerie photos' },
    { name: 'citation', title: 'Citation' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Bandeau principal',
      type: 'heroSection',
      group: 'hero',
      description: 'Le bandeau affiché en haut de la page À propos.',
    }),
    defineField({
      name: 'contenu',
      title: 'Notre histoire',
      type: 'portableText',
      group: 'contenu',
      description: 'Racontez l\'histoire de votre atelier. Vous pouvez ajouter des titres, du texte et des images.',
    }),
    defineField({
      name: 'valeurs',
      title: 'Nos valeurs',
      type: 'array',
      group: 'valeurs',
      of: [{ type: 'infoCard' }],
      description: 'Vos valeurs affichées en grille (4 recommandées). L\'icône est optionnelle pour cette section.',
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'equipe',
      title: 'L\'équipe',
      type: 'array',
      group: 'equipe',
      of: [{ type: 'membreEquipe' }],
      description: 'Présentez les membres de votre équipe avec photo, nom et rôle.',
    }),
    defineField({
      name: 'images',
      title: 'Photos de l\'atelier',
      type: 'array',
      group: 'galerie',
      of: [{ type: 'imageWithAlt' }],
      description: 'Photos de votre atelier affichées en mosaïque. Taille recommandée : 800×800px.',
    }),
    defineField({
      name: 'citationTexte',
      title: 'Texte de la citation',
      type: 'text',
      rows: 3,
      group: 'citation',
      description: 'Une citation inspirante affichée sur fond coloré.',
    }),
    defineField({
      name: 'citationAuteur',
      title: 'Auteur',
      type: 'string',
      group: 'citation',
      description: 'Nom et titre de l\'auteur (ex: Clara Dumont, fondatrice d\'Atelier Flora).',
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

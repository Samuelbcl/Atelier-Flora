import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pageAPropos',
  title: 'Page À propos',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: 'Bandeau principal', options: { collapsible: true, collapsed: true } },
    { name: 'contenu', title: 'Notre histoire', options: { collapsible: true, collapsed: true } },
    { name: 'valeurs', title: 'Nos valeurs', options: { collapsible: true, collapsed: true } },
    { name: 'equipe', title: 'L\'équipe', options: { collapsible: true, collapsed: true } },
    { name: 'galerie', title: 'Galerie photos', options: { collapsible: true, collapsed: true } },
    { name: 'citation', title: 'Citation', options: { collapsible: true, collapsed: true } },
    { name: 'seo', title: 'SEO', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: 'hero', title: 'Bandeau principal', type: 'heroSection', fieldset: 'hero', description: 'Le bandeau affiché en haut de la page.' }),

    defineField({ name: 'contenu', title: 'Texte de l\'histoire', type: 'portableText', fieldset: 'contenu', description: 'Racontez l\'histoire de votre atelier. Vous pouvez ajouter des titres, du texte et des images.' }),

    defineField({ name: 'valeurs', title: 'Nos valeurs', type: 'array', fieldset: 'valeurs', of: [{ type: 'infoCard' }], description: 'Vos valeurs affichées en grille (4 recommandées).', validation: (rule) => rule.max(6) }),

    defineField({ name: 'equipe', title: 'Membres de l\'équipe', type: 'array', fieldset: 'equipe', of: [{ type: 'membreEquipe' }], description: 'Présentez les membres de votre équipe avec photo, nom et rôle.' }),

    defineField({ name: 'images', title: 'Photos de l\'atelier', type: 'array', fieldset: 'galerie', of: [{ type: 'imageWithAlt' }], description: 'Photos affichées en mosaïque. Taille recommandée : 800×800px.' }),

    defineField({ name: 'citationTexte', title: 'Texte de la citation', type: 'text', rows: 3, fieldset: 'citation', description: 'Citation inspirante affichée sur fond coloré.' }),
    defineField({ name: 'citationAuteur', title: 'Auteur', type: 'string', fieldset: 'citation', description: 'Ex: Clara Dumont, fondatrice de Bloom Club.' }),

    defineField({ name: 'seo', title: 'SEO', type: 'seo', fieldset: 'seo' }),
  ],
  preview: { prepare() { return { title: 'Page À propos' } } },
})

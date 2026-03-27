import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pageContact',
  title: 'Page Contact',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: 'Bandeau principal', options: { collapsible: true, collapsed: true } },
    { name: 'contenu', title: 'Contenu et formulaire', options: { collapsible: true, collapsed: true } },
    { name: 'seo', title: 'SEO', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: 'hero', title: 'Bandeau principal', type: 'heroSection', fieldset: 'hero', description: 'Titre et texte affichés en haut de la page contact.' }),
    defineField({ name: 'introTexte', title: 'Texte d\'introduction', type: 'text', rows: 3, fieldset: 'contenu', description: 'Texte supplémentaire affiché sous les coordonnées (optionnel).' }),
    defineField({ name: 'sujetsFormulaire', title: 'Sujets du formulaire', type: 'array', fieldset: 'contenu', of: [{ type: 'string' }], description: 'Options du menu déroulant "Sujet" dans le formulaire de contact.' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', fieldset: 'seo' }),
  ],
  preview: { prepare() { return { title: 'Page Contact' } } },
})

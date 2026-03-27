import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pageCatalogue',
  title: 'Page Catalogue',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: 'Bandeau principal', options: { collapsible: true, collapsed: true } },
    { name: 'infos', title: 'Informations de commande', options: { collapsible: true, collapsed: true } },
    { name: 'cta', title: 'Bandeau d\'appel à l\'action', options: { collapsible: true, collapsed: true } },
    { name: 'seo', title: 'SEO', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: 'hero', title: 'Bandeau principal', type: 'heroSection', fieldset: 'hero', description: 'Titre et texte affichés en haut du catalogue.' }),
    defineField({ name: 'infosCommande', title: 'Cartes d\'information', type: 'array', fieldset: 'infos', of: [{ type: 'infoCard' }], description: 'Cartes en bas du catalogue (ex: Livraison, Sur mesure, Emballage). 3 recommandées.', validation: (rule) => rule.max(4) }),
    defineField({ name: 'cta', title: 'Bandeau CTA', type: 'ctaSection', fieldset: 'cta' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', fieldset: 'seo' }),
  ],
  preview: { prepare() { return { title: 'Page Catalogue — Paramètres' } } },
})

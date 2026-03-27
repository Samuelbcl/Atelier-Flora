import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pageGalerie',
  title: 'Page Galerie',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: 'Bandeau principal', options: { collapsible: true, collapsed: true } },
    { name: 'cta', title: 'Bandeau d\'appel à l\'action', options: { collapsible: true, collapsed: true } },
    { name: 'seo', title: 'SEO', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: 'hero', title: 'Bandeau principal', type: 'heroSection', fieldset: 'hero', description: 'Titre et texte affichés en haut de la page galerie.' }),
    defineField({ name: 'cta', title: 'Bandeau CTA', type: 'ctaSection', fieldset: 'cta', description: 'Bandeau en bas de page pour inciter les visiteurs à vous contacter.' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', fieldset: 'seo' }),
  ],
  preview: { prepare() { return { title: 'Page Galerie — Paramètres' } } },
})

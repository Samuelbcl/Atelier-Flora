import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Réglages du site',
  type: 'document',
  fieldsets: [
    { name: 'identite', title: 'Identité du site', options: { collapsible: true, collapsed: true } },
    { name: 'contact', title: 'Coordonnées', options: { collapsible: true, collapsed: true } },
    { name: 'social', title: 'Réseaux sociaux', options: { collapsible: true, collapsed: true } },
    { name: 'footer', title: 'Pied de page', options: { collapsible: true, collapsed: true } },
    { name: 'seoGlobal', title: 'SEO global', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: 'nomDuSite', title: 'Nom du commerce', type: 'string', fieldset: 'identite', description: 'Nom affiché dans l\'en-tête et le pied de page.' }),
    defineField({ name: 'slogan', title: 'Slogan', type: 'string', fieldset: 'identite', description: 'Slogan court (ex: "Fleuriste artisanale à Paris").' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', fieldset: 'identite', description: 'Logo de votre boutique (optionnel). Taille recommandée : 200×60px.' }),

    defineField({ name: 'adresse', title: 'Adresse', type: 'text', rows: 2, fieldset: 'contact', description: 'Adresse complète affichée sur le site.' }),
    defineField({ name: 'telephone', title: 'Téléphone', type: 'string', fieldset: 'contact' }),
    defineField({ name: 'email', title: 'Email', type: 'string', fieldset: 'contact' }),
    defineField({
      name: 'horaires', title: 'Horaires d\'ouverture', type: 'array', fieldset: 'contact',
      of: [{
        type: 'object',
        fields: [
          { name: 'jour', title: 'Jour(s)', type: 'string', description: 'Ex: Lundi – Vendredi' },
          { name: 'heures', title: 'Horaires', type: 'string', description: 'Ex: 9h – 19h' },
        ],
        preview: { select: { title: 'jour', subtitle: 'heures' } },
      }],
    }),

    defineField({ name: 'reseauxSociaux', title: 'Réseaux sociaux', type: 'array', fieldset: 'social', of: [{ type: 'lienSocial' }], description: 'Liens vers vos profils.' }),

    defineField({ name: 'footerDescription', title: 'Description', type: 'text', rows: 3, fieldset: 'footer', description: 'Texte court affiché dans le pied de page.' }),

    defineField({ name: 'seoGlobal', title: 'SEO par défaut', type: 'seo', fieldset: 'seoGlobal', description: 'Utilisé si une page n\'a pas ses propres paramètres SEO.' }),
  ],
  preview: { prepare() { return { title: 'Réglages du site' } } },
})

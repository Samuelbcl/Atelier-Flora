import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'produit',
  title: 'Produit',
  type: 'document',
  fieldsets: [
    { name: 'general', title: 'Informations générales', options: { collapsible: true, collapsed: false } },
    { name: 'medias', title: 'Photos', options: { collapsible: true, collapsed: true } },
    { name: 'details', title: 'Détails et prix', options: { collapsible: true, collapsed: true } },
    { name: 'seo', title: 'SEO', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: 'nom', title: 'Nom du produit', type: 'string', fieldset: 'general', description: 'Nom affiché sur le site (ex: Bouquet Aurore).', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'URL', type: 'slug', fieldset: 'general', options: { source: 'nom', maxLength: 96 }, description: 'Adresse web (générée automatiquement).', validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'portableText', fieldset: 'general', description: 'Description détaillée du produit.' }),
    defineField({ name: 'categorie', title: 'Catégorie', type: 'reference', to: [{ type: 'categorie' }], fieldset: 'general', description: 'Catégorie du produit.' }),

    defineField({ name: 'images', title: 'Photos du produit', type: 'array', fieldset: 'medias', of: [{ type: 'imageWithAlt' }], description: 'La première photo sera l\'image principale. Taille recommandée : 600×800px.', validation: (rule) => rule.required().min(1) }),

    defineField({ name: 'prix', title: 'Prix (€)', type: 'number', fieldset: 'details', description: 'Prix en euros (ex: 45).', validation: (rule) => rule.positive() }),
    defineField({ name: 'etiquette', title: 'Étiquette', type: 'string', fieldset: 'details', description: 'Texte sur la carte (ex: Fleurs de saison, Nouveau). Laisser vide si non souhaité.' }),
    defineField({ name: 'disponible', title: 'Disponible', type: 'boolean', fieldset: 'details', description: 'Décochez pour marquer comme indisponible.', initialValue: true }),
    defineField({ name: 'ordre', title: 'Ordre d\'affichage', type: 'number', fieldset: 'details', description: 'Tri par ce nombre (1 = premier).' }),

    defineField({ name: 'seo', title: 'SEO', type: 'seo', fieldset: 'seo' }),
  ],
  orderings: [{ title: 'Ordre d\'affichage', name: 'ordreAsc', by: [{ field: 'ordre', direction: 'asc' }] }],
  preview: {
    select: { title: 'nom', subtitle: 'prix', media: 'images.0.image' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? `${subtitle} €` : '', media }
    },
  },
})

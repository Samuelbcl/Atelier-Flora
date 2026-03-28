import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'produit',
  title: 'Produit',
  type: 'document',
  fieldsets: [
    { name: 'general', title: 'Informations générales', options: { collapsible: true, collapsed: false } },
    { name: 'medias', title: 'Photos', options: { collapsible: true, collapsed: true } },
    { name: 'tarifs', title: 'Tailles et prix', options: { collapsible: true, collapsed: true } },
    { name: 'details', title: 'Détails', options: { collapsible: true, collapsed: true } },
    { name: 'seo', title: 'SEO', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: 'nom', title: 'Nom du produit', type: 'string', fieldset: 'general', description: 'Nom affiché sur le site (ex: Le Classique).', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'URL', type: 'slug', fieldset: 'general', options: { source: 'nom', maxLength: 96 }, description: 'Adresse web (générée automatiquement).', validation: (rule) => rule.required() }),
    defineField({ name: 'descriptionCourte', title: 'Description courte', type: 'text', rows: 2, fieldset: 'general', description: 'Résumé affiché sous le titre sur la page produit (1-2 phrases).' }),
    defineField({ name: 'description', title: 'Description complète', type: 'portableText', fieldset: 'general', description: 'Description détaillée affichée dans l\'onglet Description.' }),
    defineField({ name: 'categorie', title: 'Catégorie', type: 'reference', to: [{ type: 'categorie' }], fieldset: 'general', description: 'Catégorie du produit.' }),

    defineField({ name: 'images', title: 'Photos du produit', type: 'array', fieldset: 'medias', of: [{ type: 'imageWithAlt' }], description: 'La première photo sera l\'image principale. Taille recommandée : 800×1000px.', validation: (rule) => rule.required().min(1) }),

    defineField({ name: 'prix', title: 'Prix de base (€)', type: 'number', fieldset: 'tarifs', description: 'Prix affiché par défaut (taille M ou prix unique).', validation: (rule) => rule.positive() }),
    defineField({
      name: 'tailles',
      title: 'Variantes de taille',
      type: 'array',
      fieldset: 'tarifs',
      of: [{
        type: 'object',
        fields: [
          { name: 'nom', title: 'Taille', type: 'string', description: 'Ex: M, L, XL' },
          { name: 'prix', title: 'Prix (€)', type: 'number' },
          { name: 'stock', title: 'Stock disponible', type: 'number', description: '0 = épuisé pour cette taille.' },
        ],
        preview: {
          select: { title: 'nom', prix: 'prix', stock: 'stock' },
          prepare({ title, prix, stock }) {
            return { title: `${title} — ${prix}€`, subtitle: stock === 0 ? 'Épuisé' : `${stock} en stock` }
          },
        },
      }],
      description: 'Laissez vide si le produit n\'a qu\'une seule taille. Sinon ajoutez M, L, XL avec leurs prix.',
    }),

    defineField({ name: 'etiquette', title: 'Étiquette', type: 'string', fieldset: 'details', description: 'Badge sur la carte (ex: Best-seller, Nouveau). Laisser vide si non souhaité.' }),
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

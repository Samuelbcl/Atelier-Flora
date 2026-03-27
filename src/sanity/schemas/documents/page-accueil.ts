import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pageAccueil',
  title: 'Page d\'accueil',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: 'Hero (bandeau principal)', options: { collapsible: true, collapsed: true } },
    { name: 'valeurs', title: 'Nos points forts', options: { collapsible: true, collapsed: true } },
    { name: 'introduction', title: 'Notre histoire', options: { collapsible: true, collapsed: true } },
    { name: 'produits', title: 'Produits vedettes', options: { collapsible: true, collapsed: true } },
    { name: 'temoignages', title: 'Témoignages clients', options: { collapsible: true, collapsed: true } },
    { name: 'cta', title: 'Bandeau d\'appel à l\'action', options: { collapsible: true, collapsed: true } },
    { name: 'seo', title: 'SEO', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: 'hero', title: 'Bandeau principal', type: 'heroSection', fieldset: 'hero', description: 'Le grand bandeau affiché en haut de la page d\'accueil.' }),

    defineField({ name: 'valeurs', title: 'Nos points forts', type: 'array', fieldset: 'valeurs', of: [{ type: 'infoCard' }], description: '3 à 4 points forts affichés sous le bandeau (ex: Fleurs de saison, Fait main, Éco-responsable).', validation: (rule) => rule.max(4) }),

    defineField({ name: 'introTitre', title: 'Titre de la section', type: 'string', fieldset: 'introduction', description: 'Ex: "L\'art floral au service de vos émotions".' }),
    defineField({ name: 'introduction', title: 'Texte de présentation', type: 'portableText', fieldset: 'introduction', description: 'Texte de présentation de votre atelier.' }),
    defineField({ name: 'introImage', title: 'Photo de l\'atelier', type: 'imageWithAlt', fieldset: 'introduction', description: 'Photo affichée à côté du texte. Taille recommandée : 600×750px.' }),

    defineField({ name: 'produitsVedettesTitre', title: 'Titre de la section', type: 'string', fieldset: 'produits', description: 'Ex: "Nos créations phares".' }),
    defineField({ name: 'produitsVedettes', title: 'Produits mis en avant', type: 'array', fieldset: 'produits', of: [{ type: 'reference', to: [{ type: 'produit' }] }], description: 'Sélectionnez 3 produits à mettre en avant.' }),

    defineField({ name: 'temoignagesTitre', title: 'Titre de la section', type: 'string', fieldset: 'temoignages', description: 'Ex: "Ce que disent nos clients".' }),
    defineField({ name: 'temoignagesAffiches', title: 'Témoignages à afficher', type: 'array', fieldset: 'temoignages', of: [{ type: 'reference', to: [{ type: 'temoignage' }] }], description: 'Sélectionnez 3 témoignages. Laissez vide pour afficher les plus récents.' }),

    defineField({ name: 'cta', title: 'Bandeau CTA', type: 'ctaSection', fieldset: 'cta', description: 'Le bandeau coloré affiché en bas de page.' }),

    defineField({ name: 'seo', title: 'SEO', type: 'seo', fieldset: 'seo' }),
  ],
  preview: { prepare() { return { title: 'Page d\'accueil' } } },
})

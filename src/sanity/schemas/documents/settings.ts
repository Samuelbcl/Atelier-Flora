import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Réglages du site',
  type: 'document',
  groups: [
    { name: 'identite', title: 'Identité', default: true },
    { name: 'contact', title: 'Contact' },
    { name: 'social', title: 'Réseaux sociaux' },
    { name: 'footer', title: 'Pied de page' },
    { name: 'seoGlobal', title: 'SEO global' },
  ],
  fields: [
    // Identité
    defineField({
      name: 'nomDuSite',
      title: 'Nom du commerce',
      type: 'string',
      group: 'identite',
      description: 'Nom affiché dans l\'en-tête et le pied de page du site.',
    }),
    defineField({
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
      group: 'identite',
      description: 'Slogan court (ex: "Fleuriste artisanale à Paris").',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'identite',
      description: 'Logo de votre boutique (optionnel). Taille recommandée : 200×60px.',
    }),

    // Contact
    defineField({
      name: 'adresse',
      title: 'Adresse',
      type: 'text',
      rows: 2,
      group: 'contact',
      description: 'Adresse complète de votre boutique.',
    }),
    defineField({
      name: 'telephone',
      title: 'Téléphone',
      type: 'string',
      group: 'contact',
      description: 'Numéro de téléphone affiché sur le site.',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
      description: 'Adresse email de contact.',
    }),
    defineField({
      name: 'horaires',
      title: 'Horaires d\'ouverture',
      type: 'array',
      group: 'contact',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'jour', title: 'Jour(s)', type: 'string', description: 'Ex: Lundi – Vendredi, Samedi, Dimanche' },
            { name: 'heures', title: 'Horaires', type: 'string', description: 'Ex: 9h – 19h, Fermé' },
          ],
          preview: {
            select: { title: 'jour', subtitle: 'heures' },
          },
        },
      ],
      description: 'Horaires affichés sur la page Contact.',
    }),

    // Réseaux sociaux
    defineField({
      name: 'reseauxSociaux',
      title: 'Réseaux sociaux',
      type: 'array',
      group: 'social',
      of: [{ type: 'lienSocial' }],
      description: 'Liens vers vos profils sur les réseaux sociaux.',
    }),

    // Footer
    defineField({
      name: 'footerDescription',
      title: 'Description du pied de page',
      type: 'text',
      rows: 3,
      group: 'footer',
      description: 'Courte description affichée dans le pied de page du site.',
    }),

    // SEO global
    defineField({
      name: 'seoGlobal',
      title: 'SEO par défaut',
      type: 'seo',
      group: 'seoGlobal',
      description: 'Paramètres SEO utilisés par défaut si une page n\'a pas ses propres paramètres.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Réglages du site' }
    },
  },
})

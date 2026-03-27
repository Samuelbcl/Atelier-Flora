import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Paramètres du site',
  type: 'document',
  groups: [
    { name: 'contact', title: 'Contact', default: true },
    { name: 'social', title: 'Réseaux sociaux' },
    { name: 'footer', title: 'Pied de page' },
  ],
  fields: [
    defineField({
      name: 'adresse',
      title: 'Adresse',
      type: 'text',
      rows: 2,
      group: 'contact',
    }),
    defineField({
      name: 'telephone',
      title: 'Téléphone',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
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
            { name: 'jour', title: 'Jour(s)', type: 'string' },
            { name: 'heures', title: 'Horaires', type: 'string' },
          ],
          preview: {
            select: { title: 'jour', subtitle: 'heures' },
          },
        },
      ],
    }),
    defineField({
      name: 'reseauxSociaux',
      title: 'Réseaux sociaux',
      type: 'array',
      group: 'social',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'plateforme',
              title: 'Plateforme',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Pinterest', value: 'pinterest' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'LinkedIn', value: 'linkedin' },
                ],
              },
            },
            { name: 'url', title: 'URL', type: 'url' },
          ],
          preview: {
            select: { title: 'plateforme', subtitle: 'url' },
          },
        },
      ],
    }),
    defineField({
      name: 'footerDescription',
      title: 'Description du pied de page',
      type: 'text',
      rows: 3,
      group: 'footer',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Paramètres du site' }
    },
  },
})

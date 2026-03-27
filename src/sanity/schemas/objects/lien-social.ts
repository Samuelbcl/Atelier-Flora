import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'lienSocial',
  title: 'Lien réseau social',
  type: 'object',
  fields: [
    defineField({
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Lien vers votre profil sur cette plateforme.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'plateforme', subtitle: 'url' },
  },
})

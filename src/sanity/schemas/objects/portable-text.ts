import { defineType, defineArrayMember } from 'sanity'

export default defineType({
  name: 'portableText',
  title: 'Texte riche',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Titre 2', value: 'h2' },
        { title: 'Titre 3', value: 'h3' },
        { title: 'Citation', value: 'blockquote' },
      ],
      marks: {
        decorators: [
          { title: 'Gras', value: 'strong' },
          { title: 'Italique', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            title: 'Lien',
            type: 'object',
            fields: [
              {
                name: 'href',
                title: 'URL',
                type: 'url',
                validation: (rule) =>
                  rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'imageWithAlt',
    }),
  ],
})

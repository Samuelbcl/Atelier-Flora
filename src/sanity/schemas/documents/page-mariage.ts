import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pageMariage',
  title: 'Page Mariage',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: 'Bandeau principal', options: { collapsible: true, collapsed: true } },
    { name: 'services', title: 'Nos services', options: { collapsible: true, collapsed: true } },
    { name: 'galerie', title: 'Galerie photos', options: { collapsible: true, collapsed: true } },
    { name: 'temoignages', title: 'Témoignages', options: { collapsible: true, collapsed: true } },
    { name: 'contact', title: 'Prise de contact', options: { collapsible: true, collapsed: true } },
    { name: 'seo', title: 'SEO', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'hero', title: 'Bandeau principal', type: 'heroSection', fieldset: 'hero',
      description: 'Le grand bandeau affiché en haut de la page Mariage.',
    }),
    defineField({
      name: 'introTexte', title: 'Texte d\'introduction', type: 'portableText', fieldset: 'hero',
      description: 'Texte qui accompagne le bandeau. Décrivez votre approche pour les mariages.',
    }),
    defineField({
      name: 'services', title: 'Services floraux', type: 'array', fieldset: 'services',
      of: [{
        type: 'object',
        fields: [
          { name: 'titre', title: 'Titre du service', type: 'string' },
          { name: 'description', title: 'Description', type: 'text', rows: 3 },
          { name: 'image', title: 'Photo', type: 'imageWithAlt' },
        ],
        preview: {
          select: { title: 'titre', subtitle: 'description', media: 'image.image' },
        },
      }],
      description: 'Vos services mariage (ex: Bouquet de mariée, Décoration cérémonie, Centres de table, Décoration réception).',
    }),
    defineField({
      name: 'images', title: 'Photos', type: 'array', fieldset: 'galerie',
      of: [{ type: 'imageWithAlt' }],
      description: 'Galerie photos de vos réalisations mariage. 4 photos recommandées.',
    }),
    defineField({
      name: 'temoignages', title: 'Témoignages mariage', type: 'array', fieldset: 'temoignages',
      of: [{ type: 'reference', to: [{ type: 'temoignage' }] }],
      description: 'Sélectionnez des témoignages de mariés.',
    }),
    defineField({
      name: 'contactTitre', title: 'Titre section contact', type: 'string', fieldset: 'contact',
      description: 'Ex: "Nous aimons vous aider".',
    }),
    defineField({
      name: 'contactTexte', title: 'Texte d\'invitation', type: 'text', rows: 3, fieldset: 'contact',
      description: 'Texte invitant les futurs mariés à prendre rendez-vous.',
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', fieldset: 'seo' }),
  ],
  preview: { prepare() { return { title: 'Page Mariage' } } },
})

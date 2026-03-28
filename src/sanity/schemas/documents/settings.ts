import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Réglages du site',
  type: 'document',
  groups: [
    { name: 'identite', title: 'Identité', default: true },
    { name: 'couleurs', title: 'Couleurs' },
    { name: 'typographie', title: 'Typographie' },
    { name: 'header', title: 'Header' },
    { name: 'footer', title: 'Footer' },
    { name: 'contact', title: 'Contact' },
    { name: 'seo', title: 'SEO' },
    { name: 'fonctionnalites', title: 'Fonctionnalités' },
  ],
  fields: [
    // ── IDENTITÉ ──
    defineField({
      name: 'nomDuSite',
      title: 'Nom du commerce',
      type: 'string',
      group: 'identite',
      description: 'Nom affiché dans l\'en-tête et le pied de page.',
    }),
    defineField({
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
      group: 'identite',
      description: 'Slogan court (ex: "Fleuriste artisanale à Liège").',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'identite',
      options: { hotspot: true },
      description: 'Logo avec fond transparent (PNG). Utilisez le crop pour recadrer.',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'identite',
      description: 'Icône affichée dans l\'onglet du navigateur. Format carré recommandé.',
    }),

    // ── COULEURS ──
    defineField({
      name: 'couleurs',
      title: 'Palette de couleurs',
      type: 'object',
      group: 'couleurs',
      description: 'Personnalisez les couleurs du site. Cliquez sur chaque carré pour choisir une couleur.',
      fields: [
        defineField({ name: 'primary', title: 'Couleur principale', type: 'color', description: 'Boutons, liens, accents (défaut: or #B49E7A).' }),
        defineField({ name: 'primaryLight', title: 'Couleur principale claire', type: 'color', description: 'Version claire de la couleur principale (défaut: #c4b08a).' }),
        defineField({ name: 'secondary', title: 'Couleur secondaire', type: 'color', description: 'Texte foncé, titres, header (défaut: brun #312F22).' }),
        defineField({ name: 'cream', title: 'Fond crème', type: 'color', description: 'Fond des sections alternées (défaut: #f3eae0).' }),
        defineField({ name: 'accent', title: 'Accent', type: 'color', description: 'Couleur d\'accent pour les badges et highlights.' }),
        defineField({ name: 'surface', title: 'Surface', type: 'color', description: 'Fond des cartes et éléments en relief (défaut: blanc).' }),
        defineField({ name: 'text', title: 'Texte principal', type: 'color', description: 'Couleur du texte courant.' }),
        defineField({ name: 'textMuted', title: 'Texte secondaire', type: 'color', description: 'Couleur du texte atténué (descriptions, labels).' }),
      ],
    }),

    // ── TYPOGRAPHIE ──
    defineField({
      name: 'typographie',
      title: 'Typographie',
      type: 'object',
      group: 'typographie',
      description: 'Personnalisez les polices et tailles de texte.',
      fields: [
        defineField({
          name: 'headingFont',
          title: 'Police des titres',
          type: 'string',
          description: 'Police utilisée pour les titres et headings.',
          options: {
            list: [
              { title: 'Prata', value: 'prata' },
              { title: 'Playfair Display', value: 'playfair-display' },
              { title: 'Cormorant Garamond', value: 'cormorant-garamond' },
              { title: 'Lora', value: 'lora' },
              { title: 'DM Serif Display', value: 'dm-serif-display' },
              { title: 'Libre Baskerville', value: 'libre-baskerville' },
            ],
          },
          initialValue: 'prata',
        }),
        defineField({
          name: 'bodyFont',
          title: 'Police du texte',
          type: 'string',
          description: 'Police utilisée pour le texte courant.',
          options: {
            list: [
              { title: 'Inter', value: 'inter' },
              { title: 'Work Sans', value: 'work-sans' },
              { title: 'Montserrat', value: 'montserrat' },
              { title: 'Raleway', value: 'raleway' },
              { title: 'Nunito Sans', value: 'nunito-sans' },
              { title: 'Source Sans 3', value: 'source-sans-3' },
            ],
          },
          initialValue: 'inter',
        }),
        defineField({
          name: 'baseSize',
          title: 'Taille de base (px)',
          type: 'number',
          description: 'Taille de la police de base en pixels (14-20).',
          validation: (rule) => rule.min(14).max(20),
          initialValue: 16,
        }),
        defineField({
          name: 'headingWeight',
          title: 'Épaisseur des titres',
          type: 'string',
          description: 'Épaisseur de la police des titres.',
          options: {
            list: [
              { title: 'Léger (300)', value: '300' },
              { title: 'Normal (400)', value: '400' },
              { title: 'Medium (500)', value: '500' },
              { title: 'Semi-bold (600)', value: '600' },
              { title: 'Bold (700)', value: '700' },
            ],
          },
          initialValue: '400',
        }),
      ],
    }),

    // ── HEADER ──
    defineField({
      name: 'headerConfig',
      title: 'Configuration du header',
      type: 'object',
      group: 'header',
      description: 'Personnalisez l\'en-tête du site.',
      fields: [
        defineField({
          name: 'style',
          title: 'Style du header',
          type: 'string',
          description: 'Le style d\'affichage du header.',
          options: {
            list: [
              { title: 'Transparent (fond de l\'image sur la page d\'accueil)', value: 'transparent' },
              { title: 'Solide (fond blanc permanent)', value: 'solid' },
              { title: 'Sticky (suit le scroll)', value: 'sticky' },
            ],
          },
          initialValue: 'transparent',
        }),
        defineField({
          name: 'logoPosition',
          title: 'Position du logo',
          type: 'string',
          options: {
            list: [
              { title: 'À gauche', value: 'left' },
              { title: 'Centré', value: 'center' },
            ],
          },
          initialValue: 'left',
        }),
        defineField({
          name: 'showTopBar',
          title: 'Afficher la barre supérieure',
          type: 'boolean',
          description: 'Barre d\'annonce au-dessus du header (promo, info livraison...).',
          initialValue: false,
        }),
        defineField({
          name: 'topBarText',
          title: 'Texte de la barre supérieure',
          type: 'string',
          description: 'Ex: "Livraison gratuite à Liège et environs".',
          hidden: ({ parent }) => !parent?.showTopBar,
        }),
        defineField({
          name: 'topBarBgColor',
          title: 'Couleur de fond de la barre',
          type: 'color',
          hidden: ({ parent }) => !parent?.showTopBar,
        }),
        defineField({
          name: 'navigationPrincipale',
          title: 'Navigation principale',
          type: 'array',
          description: 'Les liens affichés dans le header. Ajoutez des sous-liens pour créer un menu déroulant.',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'label', title: 'Libellé', type: 'string', validation: (r) => r.required() }),
              defineField({ name: 'lien', title: 'Lien', type: 'string', description: 'URL relative (/fleurs/populaire) ou absolue (https://...).' }),
              defineField({ name: 'isButton', title: 'Afficher comme bouton', type: 'boolean', initialValue: false }),
              defineField({
                name: 'children',
                title: 'Sous-liens (menu déroulant)',
                type: 'array',
                of: [{
                  type: 'object',
                  fields: [
                    defineField({ name: 'label', title: 'Libellé', type: 'string', validation: (r) => r.required() }),
                    defineField({ name: 'lien', title: 'Lien', type: 'string', validation: (r) => r.required() }),
                  ],
                  preview: { select: { title: 'label', subtitle: 'lien' } },
                }],
              }),
            ],
            preview: {
              select: { title: 'label', subtitle: 'lien', children: 'children' },
              prepare({ title, subtitle, children }) {
                const count = children?.length || 0
                return {
                  title: title || 'Lien',
                  subtitle: count > 0 ? `${count} sous-lien${count > 1 ? 's' : ''} — ${subtitle || ''}` : subtitle || '',
                }
              },
            },
          }],
        }),
      ],
    }),

    // ── FOOTER ──
    defineField({
      name: 'footerConfig',
      title: 'Configuration du footer',
      type: 'object',
      group: 'footer',
      description: 'Personnalisez le pied de page.',
      fields: [
        defineField({
          name: 'style',
          title: 'Style du footer',
          type: 'string',
          options: {
            list: [
              { title: 'Colonnes (classique)', value: 'columns' },
              { title: 'Simple (1 ligne)', value: 'simple' },
              { title: 'Centré', value: 'centered' },
            ],
          },
          initialValue: 'columns',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          description: 'Texte court affiché dans le pied de page.',
        }),
        defineField({
          name: 'copyright',
          title: 'Texte copyright',
          type: 'string',
          description: 'Laissez vide pour le copyright par défaut.',
        }),
        defineField({
          name: 'colonnes',
          title: 'Colonnes de navigation',
          type: 'array',
          description: 'Ajoutez des colonnes de liens dans le footer.',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'titre', title: 'Titre de la colonne', type: 'string', validation: (r) => r.required() }),
              defineField({
                name: 'liens',
                title: 'Liens',
                type: 'array',
                of: [{
                  type: 'object',
                  fields: [
                    defineField({ name: 'label', title: 'Libellé', type: 'string', validation: (r) => r.required() }),
                    defineField({ name: 'lien', title: 'URL', type: 'string', validation: (r) => r.required() }),
                  ],
                  preview: { select: { title: 'label', subtitle: 'lien' } },
                }],
              }),
            ],
            preview: {
              select: { title: 'titre', liens: 'liens' },
              prepare({ title, liens }) {
                return { title, subtitle: `${liens?.length || 0} lien(s)` }
              },
            },
          }],
        }),
        defineField({
          name: 'reseauxSociaux',
          title: 'Réseaux sociaux',
          type: 'array',
          of: [{ type: 'lienSocial' }],
          description: 'Liens vers vos profils.',
        }),
      ],
    }),

    // ── CONTACT ──
    defineField({
      name: 'adresse',
      title: 'Adresse',
      type: 'text',
      rows: 2,
      group: 'contact',
      description: 'Adresse complète affichée sur le site.',
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
      of: [{
        type: 'object',
        fields: [
          { name: 'jour', title: 'Jour(s)', type: 'string', description: 'Ex: Lundi – Vendredi' },
          { name: 'heures', title: 'Horaires', type: 'string', description: 'Ex: 9h – 19h' },
        ],
        preview: { select: { title: 'jour', subtitle: 'heures' } },
      }],
    }),

    // ── SEO ──
    defineField({
      name: 'seoTitleTemplate',
      title: 'Modèle de titre',
      type: 'string',
      group: 'seo',
      description: 'Ex: "%s | Bloom Club". Le %s sera remplacé par le titre de la page.',
      initialValue: '%s | Bloom Club',
    }),
    defineField({
      name: 'seoGlobal',
      title: 'SEO par défaut',
      type: 'seo',
      group: 'seo',
      description: 'Utilisé si une page n\'a pas ses propres paramètres SEO.',
    }),

    // ── FONCTIONNALITÉS ──
    defineField({
      name: 'fonctionnalites',
      title: 'Fonctionnalités',
      type: 'object',
      group: 'fonctionnalites',
      description: 'Activez ou désactivez des fonctionnalités du site.',
      fields: [
        defineField({ name: 'animations', title: 'Animations au scroll', type: 'boolean', description: 'Active les animations fade-in au défilement.', initialValue: true }),
        defineField({ name: 'scrollToTop', title: 'Bouton retour en haut', type: 'boolean', description: 'Affiche un bouton pour remonter en haut de la page.', initialValue: false }),
        defineField({ name: 'whatsappActif', title: 'Bouton WhatsApp', type: 'boolean', description: 'Affiche un bouton WhatsApp flottant.', initialValue: false }),
        defineField({ name: 'whatsappNumero', title: 'Numéro WhatsApp', type: 'string', description: 'Format international (ex: +32471234567).', hidden: ({ parent }) => !parent?.whatsappActif }),
        defineField({ name: 'whatsappMessage', title: 'Message pré-rempli WhatsApp', type: 'string', description: 'Message affiché par défaut.', hidden: ({ parent }) => !parent?.whatsappActif }),
        defineField({ name: 'maintenance', title: 'Mode maintenance', type: 'boolean', description: 'Active le mode maintenance (site inaccessible aux visiteurs).', initialValue: false }),
      ],
    }),
  ],
  preview: { prepare() { return { title: 'Réglages du site' } } },
})

import { groq } from 'next-sanity'

// Fragment réutilisable pour les images
const imageFields = `
  image{
    asset->{_id, url, metadata{dimensions}},
    hotspot,
    crop
  },
  alt
`

const heroFields = `
  hero{
    label,
    titre,
    sousTitre,
    image{ ${imageFields} },
    ctaTexte,
    ctaLien
  }
`

const ctaFields = `
  cta{
    titre,
    texte,
    boutonTexte,
    boutonLien
  }
`

// Réglages du site
export const SETTINGS_QUERY = groq`
  *[_type == "settings"][0]{
    nomDuSite,
    slogan,
    logo{ asset->{_id, url}, hotspot, crop },
    favicon{ asset->{_id, url} },
    couleurs,
    typographie,
    headerConfig{
      style,
      logoPosition,
      showTopBar,
      topBarText,
      topBarBgColor,
      navigationPrincipale[]{
        _key, label, lien, isButton,
        children[]{ _key, label, lien }
      }
    },
    footerConfig{
      style,
      description,
      copyright,
      colonnes[]{ _key, titre, liens[]{ _key, label, lien } },
      reseauxSociaux[]{ _key, plateforme, url }
    },
    adresse,
    telephone,
    email,
    horaires[]{ _key, jour, heures },
    seoTitleTemplate,
    seoGlobal{ metaTitre, metaDescription, ogImage{ asset->{_id, url}, hotspot, crop } },
    fonctionnalites
  }
`

// Page d'accueil
export const PAGE_ACCUEIL_QUERY = groq`
  *[_type == "pageAccueil"][0]{
    ${heroFields},
    valeurs[]{ _key, icone, titre, texte },
    introTitre,
    introduction,
    introImage{ ${imageFields} },
    produitsVedettesTitre,
    produitsVedettes[]->{
      _id, nom, slug, prix, etiquette,
      "catSlug": categorie->slug.current,
      "firstImage": images[0]{ ${imageFields} }
    },
    temoignagesTitre,
    temoignagesAffiches[]->{
      _id, auteur, texte, note, date
    },
    ${ctaFields},
    seo
  }
`

// Page À propos
export const PAGE_A_PROPOS_QUERY = groq`
  *[_type == "pageAPropos"][0]{
    ${heroFields},
    contenu,
    valeurs[]{ _key, icone, titre, texte },
    equipe[]{
      _key, nom, role, bio,
      photo{ ${imageFields} }
    },
    images[]{ ${imageFields} },
    citationTexte,
    citationAuteur,
    seo
  }
`

// Page Galerie
export const PAGE_GALERIE_QUERY = groq`
  *[_type == "pageGalerie"][0]{
    ${heroFields},
    ${ctaFields},
    seo
  }
`

// Page Catalogue
export const PAGE_CATALOGUE_QUERY = groq`
  *[_type == "pageCatalogue"][0]{
    ${heroFields},
    infosCommande[]{ _key, icone, titre, texte },
    ${ctaFields},
    seo
  }
`

// Page Contact
export const PAGE_CONTACT_QUERY = groq`
  *[_type == "pageContact"][0]{
    ${heroFields},
    introTexte,
    sujetsFormulaire,
    seo
  }
`

// Photos de la galerie
export const PHOTOS_GALERIE_QUERY = groq`
  *[_type == "photoGalerie"] | order(ordre asc){
    _id,
    image{ ${imageFields} },
    legende,
    categorie->{ _id, nom, slug }
  }
`

// Catégories de la galerie
export const CATEGORIES_GALERIE_QUERY = groq`
  *[_type == "categorieGalerie"] | order(ordre asc){
    _id, nom, slug
  }
`

// Témoignages actifs
export const TEMOIGNAGES_QUERY = groq`
  *[_type == "temoignage" && actif == true] | order(date desc)[0...6]{
    _id, auteur, texte, note, date
  }
`

// Tous les produits
export const PRODUITS_QUERY = groq`
  *[_type == "produit"] | order(ordre asc){
    _id, nom, slug, description, prix, etiquette,
    images[]{ ${imageFields} },
    categorie->{ _id, nom, slug },
    disponible, ordre
  }
`

// Toutes les catégories
export const CATEGORIES_QUERY = groq`
  *[_type == "categorie"] | order(ordre asc){
    _id, nom, slug, description, contenuSEO
  }
`

// Produit par slug (page détail)
export const PRODUIT_BY_SLUG_QUERY = groq`
  *[_type == "produit" && slug.current == $slug][0]{
    _id, nom, slug, descriptionCourte, description, prix, etiquette,
    tailles[]{ _key, nom, prix, stock },
    images[]{ ${imageFields} },
    categorie->{ _id, nom, slug },
    disponible, seo,
    "recommandes": *[_type == "produit" && categorie._ref == ^.categorie._ref && _id != ^._id] | order(ordre asc)[0...4]{
      _id, nom, slug, prix, etiquette,
      "catSlug": categorie->slug.current,
      "firstImage": images[0]{ ${imageFields} }
    }
  }
`

// Page Mariage
export const PAGE_MARIAGE_QUERY = groq`
  *[_type == "pageMariage"][0]{
    ${heroFields},
    introTexte,
    services[]{
      _key, titre, description,
      image{ ${imageFields} }
    },
    images[]{ ${imageFields} },
    temoignages[]->{
      _id, auteur, texte, note, date
    },
    contactTitre,
    contactTexte,
    seo
  }
`

// Produits vedettes pour le mega menu (1er produit de catégories clés)
export const MEGA_MENU_PRODUCTS_QUERY = groq`
  {
    "populaire": *[_type == "produit" && categorie->slug.current == "populaire" && defined(images)] | order(ordre asc)[0]{
      nom, "slug": slug.current, "catSlug": categorie->slug.current,
      "image": images[0]{ ${imageFields} }
    },
    "bouquetDeSaison": *[_type == "produit" && categorie->slug.current == "bouquet-de-saison" && defined(images)] | order(ordre asc)[0]{
      nom, "slug": slug.current, "catSlug": categorie->slug.current,
      "image": images[0]{ ${imageFields} }
    }
  }
`

// Tous les slugs produits (pour generateStaticParams)
export const PRODUIT_SLUGS_QUERY = groq`
  *[_type == "produit" && defined(slug.current)].slug.current
`

// Page personnalisée par slug (page builder)
export const PAGE_BY_SLUG_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id, titre, slug,
    sections[]{
      _key, _type, ...,
      image{ ${imageFields} },
      images[]{ ${imageFields} },
      items[]{
        _key, ...,
        image{ ${imageFields} }
      },
      temoignages[]->{
        _id, auteur, texte, note, date
      }
    },
    seo
  }
`

// Tous les slugs de pages personnalisées
export const PAGE_SLUGS_QUERY = groq`
  *[_type == "page" && defined(slug.current)].slug.current
`

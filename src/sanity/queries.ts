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
    logo{ asset->{_id, url} },
    adresse,
    telephone,
    email,
    horaires[]{ _key, jour, heures },
    reseauxSociaux[]{ _key, plateforme, url },
    footerDescription,
    seoGlobal{ metaTitre, metaDescription, ogImage{ asset->{_id, url} } }
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
    _id, nom, slug, description,
    image{ ${imageFields} }
  }
`

// Produit par slug
export const PRODUIT_BY_SLUG_QUERY = groq`
  *[_type == "produit" && slug.current == $slug][0]{
    _id, nom, slug, description, prix, etiquette,
    images[]{ ${imageFields} },
    categorie->{ _id, nom, slug },
    disponible, seo
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

// Tous les slugs produits (pour generateStaticParams)
export const PRODUIT_SLUGS_QUERY = groq`
  *[_type == "produit" && defined(slug.current)].slug.current
`

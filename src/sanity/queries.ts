import { groq } from 'next-sanity'

// Paramètres du site (contact, réseaux sociaux, footer)
export const SETTINGS_QUERY = groq`
  *[_type == "settings"][0]{
    adresse,
    telephone,
    email,
    horaires[]{
      _key,
      jour,
      heures
    },
    reseauxSociaux[]{
      _key,
      plateforme,
      url
    },
    footerDescription
  }
`

// Page d'accueil
export const PAGE_ACCUEIL_QUERY = groq`
  *[_type == "pageAccueil"][0]{
    titre,
    sousTitre,
    heroImage{
      image{
        asset->{_id, url, metadata{dimensions}},
        hotspot,
        crop
      },
      alt
    },
    valeurs[]{
      _key,
      icone,
      titre,
      texte
    },
    introTitre,
    introduction,
    introImage{
      image{
        asset->{_id, url, metadata{dimensions}},
        hotspot,
        crop
      },
      alt
    },
    produitsVedettes[]->{
      _id,
      nom,
      slug,
      prix,
      images[0]{
        image{
          asset->{_id, url, metadata{dimensions}},
          hotspot,
          crop
        },
        alt
      }
    },
    ctaTitre,
    ctaTexte,
    ctaBouton,
    seo
  }
`

// Page À propos
export const PAGE_A_PROPOS_QUERY = groq`
  *[_type == "pageAPropos"][0]{
    titre,
    contenu,
    valeurs[]{
      _key,
      titre,
      texte
    },
    images[]{
      image{
        asset->{_id, url, metadata{dimensions}},
        hotspot,
        crop
      },
      alt
    },
    citationTexte,
    citationAuteur,
    seo
  }
`

// Tous les produits
export const PRODUITS_QUERY = groq`
  *[_type == "produit"] | order(ordre asc){
    _id,
    nom,
    slug,
    description,
    prix,
    images[]{
      image{
        asset->{_id, url, metadata{dimensions}},
        hotspot,
        crop
      },
      alt
    },
    categorie->{
      _id,
      nom,
      slug
    },
    disponible,
    ordre
  }
`

// Toutes les catégories
export const CATEGORIES_QUERY = groq`
  *[_type == "categorie"] | order(ordre asc){
    _id,
    nom,
    slug,
    description,
    image{
      image{
        asset->{_id, url, metadata{dimensions}},
        hotspot,
        crop
      },
      alt
    }
  }
`

// Produit par slug
export const PRODUIT_BY_SLUG_QUERY = groq`
  *[_type == "produit" && slug.current == $slug][0]{
    _id,
    nom,
    slug,
    description,
    prix,
    images[]{
      image{
        asset->{_id, url, metadata{dimensions}},
        hotspot,
        crop
      },
      alt
    },
    categorie->{
      _id,
      nom,
      slug
    },
    disponible,
    seo
  }
`

// Images pour la galerie
export const GALERIE_QUERY = groq`
  *[_type == "produit" && defined(images)]{
    _id,
    nom,
    "category": categorie->nom,
    images[]{
      image{
        asset->{_id, url, metadata{dimensions}},
        hotspot,
        crop
      },
      alt
    }
  }
`

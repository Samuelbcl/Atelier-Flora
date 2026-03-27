// Documents
import pageAccueil from './documents/page-accueil'
import pageAPropos from './documents/page-a-propos'
import pageGalerie from './documents/page-galerie'
import pageCatalogue from './documents/page-catalogue'
import pageContact from './documents/page-contact'
import produit from './documents/produit'
import categorie from './documents/categorie'
import categorieGalerie from './documents/categorie-galerie'
import photoGalerie from './documents/photo-galerie'
import temoignage from './documents/temoignage'
import settings from './documents/settings'

// Objets réutilisables
import heroSection from './objects/hero-section'
import ctaSection from './objects/cta-section'
import infoCard from './objects/info-card'
import membreEquipe from './objects/membre-equipe'
import lienSocial from './objects/lien-social'
import portableText from './objects/portable-text'
import imageWithAlt from './objects/image-with-alt'
import seo from './objects/seo'

export const schemaTypes = [
  // Documents — Pages
  pageAccueil,
  pageAPropos,
  pageGalerie,
  pageCatalogue,
  pageContact,
  // Documents — Collections
  produit,
  categorie,
  categorieGalerie,
  photoGalerie,
  temoignage,
  // Documents — Réglages
  settings,
  // Objets
  heroSection,
  ctaSection,
  infoCard,
  membreEquipe,
  lienSocial,
  portableText,
  imageWithAlt,
  seo,
]

// Documents
import pageAccueil from './documents/page-accueil'
import pageAPropos from './documents/page-a-propos'
import pageGalerie from './documents/page-galerie'
import pageCatalogue from './documents/page-catalogue'
import pageContact from './documents/page-contact'
import pageMariage from './documents/page-mariage'
import page from './documents/page'
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

// Sections (page builder)
import heroSectionBlock from './sections/hero-section-block'
import textImageSection from './sections/text-image-section'
import gridSection from './sections/grid-section'
import testimonialsSection from './sections/testimonials-section'
import gallerySection from './sections/gallery-section'
import ctaBanner from './sections/cta-banner'
import contactSection from './sections/contact-section'
import faqSection from './sections/faq-section'
import dividerSection from './sections/divider-section'

export const schemaTypes = [
  // Documents — Pages
  pageAccueil,
  pageAPropos,
  pageGalerie,
  pageCatalogue,
  pageContact,
  pageMariage,
  page,
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
  // Sections (page builder)
  heroSectionBlock,
  textImageSection,
  gridSection,
  testimonialsSection,
  gallerySection,
  ctaBanner,
  contactSection,
  faqSection,
  dividerSection,
]

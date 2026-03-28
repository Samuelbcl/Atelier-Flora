import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'bq9tfqwt',
  dataset: 'production',
  apiVersion: '2025-03-27',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

function block(key, style, text) {
  return { _type: 'block', _key: key, style: style || 'normal', markDefs: [], children: [{ _type: 'span', _key: key + 's', text, marks: [] }] }
}

try {
  // 1. Mettre à jour settings avec Liège
  console.log('=== Mise à jour localisation Liège ===')
  await client.patch('settings').set({
    adresse: 'Rue des Guillemins, 27\n4000 Liège',
    telephone: '+32 (0)4 123 45 67',
    email: 'contact@atelier-flora.be',
    footerDescription: 'Fleuriste artisanale à Liège. Bouquets sur mesure, compositions florales et créations uniques avec des fleurs de saison pour toutes vos occasions.',
    slogan: 'Fleuriste artisanale à Liège',
  }).commit()
  console.log('  ✓ Settings mis à jour')

  // 2. Mettre à jour le hero de la page d'accueil
  console.log('=== Mise à jour hero accueil ===')
  await client.patch('pageAccueil').set({
    'hero.label': 'Fleuriste artisanale à Liège',
    'hero.sousTitre': 'Des créations florales uniques, composées avec passion à partir de fleurs de saison pour sublimer chaque instant.',
  }).commit()
  console.log('  ✓ Hero accueil mis à jour')

  // 3. Contenu SEO catégorie Bouquets
  console.log('=== Contenu SEO Bouquets ===')
  await client.patch('cat-bouquets').set({
    contenuSEO: [
      block('b1', 'h2', 'Bouquets de fleurs : offrez un cadeau inoubliable à Liège'),
      block('b2', 'normal', 'Pour embellir votre intérieur, pour offrir ou simplement pour vous faire plaisir, Atelier Flora vous propose un vaste choix de bouquets de fleurs haut de gamme, réalisés à partir des plus belles fleurs de saison. Laissez-vous séduire par nos bouquets élégants et colorés.'),
      block('b3', 'normal', 'À la recherche d\'un bouquet de fleurs magnifique à offrir dans la région de Liège ? Chez Atelier Flora, nous comprenons l\'importance de chaque occasion et nous nous efforçons de créer des bouquets qui captivent les cœurs et embellissent les journées.'),
      block('b4', 'h2', 'Pourquoi choisir Atelier Flora ?'),
      block('b5', 'h3', 'Qualité et fraîcheur'),
      block('b6', 'normal', 'Nous accordons une attention particulière à la qualité et à la fraîcheur de nos fleurs. Chaque bouquet est composé de fleurs soigneusement sélectionnées pour garantir qu\'elles restent éclatantes et fraîches le plus longtemps possible. Nous collaborons avec des producteurs locaux et européens pour vous offrir une sélection diversifiée de fleurs de saison.'),
      block('b7', 'h3', 'Créativité et personnalisation'),
      block('b8', 'normal', 'Nos fleuristes talentueux sont passionnés par l\'art floral et mettent leur créativité au service de chaque composition. Nous offrons des options de personnalisation pour que chaque bouquet soit unique et réponde parfaitement à vos attentes.'),
      block('b9', 'h3', 'Service attentionné'),
      block('b10', 'normal', 'Votre satisfaction est notre priorité. Nous nous engageons à fournir un service client exceptionnel, de la commande à la livraison. Notre service de livraison rapide et fiable dans toute la région liégeoise assure que vos fleurs arrivent à temps et en parfait état.'),
      block('b11', 'h2', 'Nos collections de bouquets'),
      block('b12', 'h3', 'Bouquets classiques'),
      block('b13', 'normal', 'Nos bouquets classiques sont parfaits pour toutes les occasions. Composés de fleurs intemporelles telles que les roses, les lys et les tulipes, ces bouquets sont élégants et sophistiqués. Offrez un bouquet classique pour un anniversaire, un mariage ou simplement pour dire « je t\'aime ».'),
      block('b14', 'h3', 'Bouquets modernes'),
      block('b15', 'normal', 'Pour ceux qui recherchent quelque chose de plus audacieux et contemporain, nos bouquets modernes combinent des fleurs variées et des couleurs vibrantes pour créer des compositions originales et impressionnantes.'),
      block('b16', 'h3', 'Bouquets de saison'),
      block('b17', 'normal', 'Nos bouquets de saison mettent en valeur les fleurs les plus fraîches disponibles à chaque période de l\'année. En choisissant un bouquet de saison, vous êtes assuré d\'offrir des fleurs au summum de leur beauté et de leur fraîcheur.'),
      block('b18', 'h2', 'Livraison à Liège et environs'),
      block('b19', 'normal', 'Nous offrons un service de livraison rapide et fiable dans toute la région de Liège. Commander un bouquet chez Atelier Flora est simple et pratique — contactez-nous et nous nous occupons du reste.'),
    ],
  }).commit()
  console.log('  ✓ Contenu SEO Bouquets ajouté')

  // 4. Contenu SEO catégorie Deuil
  console.log('=== Contenu SEO Deuil ===')
  await client.patch('cat-deuil').set({
    contenuSEO: [
      block('d1', 'h2', 'Bouquets de deuil : honorez la mémoire de vos proches à Liège'),
      block('d2', 'normal', 'Lorsque nous perdons un être cher, les mots ne suffisent souvent pas à exprimer notre peine. Un bouquet de deuil peut alors offrir une manière silencieuse mais significative de montrer notre soutien et notre amour. Chez Atelier Flora, nous comprenons l\'importance de ce geste et nous nous engageons à créer des arrangements qui honorent dignement la mémoire de vos proches.'),
      block('d3', 'normal', 'Dessus de cercueils, couronnes, bouquets, gerbes de fleurs — nous vous proposons une large gamme de compositions pour l\'enterrement ou pour témoigner votre compassion au défunt et à sa famille.'),
      block('d4', 'h2', 'Pourquoi choisir Atelier Flora pour vos fleurs de deuil ?'),
      block('d5', 'h3', 'Fleurs de qualité supérieure'),
      block('d6', 'normal', 'Chaque arrangement de deuil est confectionné avec des fleurs de la plus haute qualité. Les fleurs sont choisies avec soin pour leur longévité et leur beauté, afin de rendre hommage de la manière la plus respectueuse possible.'),
      block('d7', 'h3', 'Expertise et personnalisation'),
      block('d8', 'normal', 'Nos fleuristes expérimentés mettent leur savoir-faire et leur créativité au service de chaque composition de deuil. Nous offrons des options de personnalisation pour refléter la personnalité et les préférences de l\'être cher disparu.'),
      block('d9', 'h3', 'Service attentif et discret'),
      block('d10', 'normal', 'Nous comprenons la sensibilité entourant les moments de deuil. Notre équipe est dévouée à fournir un service respectueux, en vous écoutant attentivement et en répondant à toutes vos questions avec la plus grande délicatesse.'),
      block('d11', 'h2', 'Nos compositions de deuil'),
      block('d12', 'h3', 'Montages et arrangements'),
      block('d13', 'normal', 'Nos montages ronds et allongés, en blanc, pastel ou coloré, sont des compositions soignées et élégantes pour accompagner vos hommages. Les roses et les lys sont souvent mis à l\'honneur, mais nos artisans vous conseillent dans votre choix en respectant vos souhaits et votre budget.'),
      block('d14', 'h3', 'Couronnes et cœurs'),
      block('d15', 'normal', 'Gestes traditionnels et nobles, nos couronnes et cœurs de fleurs sont spécialement conçus pour les cérémonies et les services commémoratifs. Ils peuvent être personnalisés pour honorer de manière appropriée la mémoire de la personne défunte.'),
      block('d16', 'h2', 'Livraison rapide et discrète à Liège'),
      block('d17', 'normal', 'Nous proposons un service de livraison rapide et respectueux dans toute la région de Liège. Nos livreurs sont formés pour gérer ces situations délicates avec la plus grande sensibilité, assurant que vos fleurs arrivent en parfait état et à temps pour la cérémonie.'),
    ],
  }).commit()
  console.log('  ✓ Contenu SEO Deuil ajouté')

  // 5. Contenu SEO catégorie Roses
  console.log('=== Contenu SEO Roses ===')
  await client.patch('cat-roses').set({
    contenuSEO: [
      block('r1', 'h2', 'Bouquets de roses : offrez l\'élégance et l\'amour à Liège'),
      block('r2', 'normal', 'Rien ne dit « je t\'aime » comme un bouquet de roses. Que ce soit pour célébrer un anniversaire, exprimer votre amour ou simplement faire plaisir à quelqu\'un, les roses sont le choix parfait. Chez Atelier Flora, nous nous engageons à offrir des bouquets de roses de la plus haute qualité, conçus pour charmer et ravir vos proches à Liège et ses environs.'),
      block('r3', 'h2', 'Pourquoi choisir nos roses ?'),
      block('r4', 'h3', 'Qualité exceptionnelle'),
      block('r5', 'normal', 'Nous sélectionnons nos roses avec le plus grand soin pour garantir leur fraîcheur et leur beauté. Chaque bouquet est composé de roses cultivées dans les meilleures conditions, connues pour leur durabilité et leur éclat.'),
      block('r6', 'h3', 'Créativité et personnalisation'),
      block('r7', 'normal', 'Nos fleuristes talentueux apportent une touche artistique à chaque bouquet. Que vous préfériez un style classique ou moderne, nous pouvons personnaliser votre bouquet selon vos goûts. Chaque bouquet est unique, reflétant la personnalité de celui qui le reçoit.'),
      block('r8', 'h2', 'Les différentes variétés de roses'),
      block('r9', 'h3', 'Roses rouges'),
      block('r10', 'normal', 'Symbole de l\'amour passionné, les roses rouges sont parfaites pour exprimer des sentiments profonds et sincères. Offrir un bouquet de roses rouges est une déclaration d\'amour intemporelle.'),
      block('r11', 'h3', 'Roses blanches'),
      block('r12', 'normal', 'Les roses blanches représentent la pureté, l\'innocence et le respect. Un bouquet de roses blanches est élégant et sobre, idéal pour de nombreuses occasions.'),
      block('r13', 'h3', 'Roses roses'),
      block('r14', 'normal', 'Douces et délicates, les roses roses symbolisent la gratitude, l\'admiration et la joie. Parfaites pour remercier quelqu\'un ou exprimer une affection tendre.'),
      block('r15', 'h3', 'Roses jaunes'),
      block('r16', 'normal', 'Les roses jaunes sont synonymes d\'amitié, de bonheur et de nouvelles possibilités. Un geste chaleureux qui transmet des vœux de bonheur et de succès.'),
      block('r17', 'h2', 'Livraison à Liège et environs'),
      block('r18', 'normal', 'Nous offrons un service de livraison rapide et fiable dans toute la région de Liège. Vos roses arrivent fraîches et en parfait état, exactement quand vous en avez besoin. Vous pouvez également ajouter un message personnalisé pour accompagner votre bouquet.'),
    ],
  }).commit()
  console.log('  ✓ Contenu SEO Roses ajouté')

  // 6. Mise à jour page Mariage
  console.log('=== Mise à jour page Mariage ===')
  await client.patch('pageMariage').set({
    hero: {
      _type: 'heroSection',
      label: 'Journée inoubliable',
      titre: 'Mariage',
      sousTitre: 'Ne laissez rien au hasard pour le plus beau jour de votre vie.',
    },
    introTexte: [
      block('m1', 'normal', 'Ne laissez rien au hasard pour le plus beau jour de votre vie. Confiez la décoration florale de votre mariage à Atelier Flora, fleuriste élégant et moderne à Liège.'),
      block('m2', 'normal', 'Du bouquet de la mariée aux décorations de la voiture ou du lieu de célébration, nous confectionnons, dans le respect de votre budget, tous types de créations.'),
    ],
    services: [
      { _key: 's1', titre: 'Bouquet de Mariée', description: 'Un bouquet sur mesure qui capture l\'essence de votre amour et complète votre tenue à la perfection.' },
      { _key: 's2', titre: 'Décorations de la Cérémonie', description: 'Des arches florales, des allées fleuries et des autels magnifiquement décorés pour une ambiance inoubliable.' },
      { _key: 's3', titre: 'Centres de Table', description: 'Des compositions florales uniques pour embellir chaque table et enchanter vos invités.' },
      { _key: 's4', titre: 'Décorations de Réception', description: 'Transformez votre lieu de réception avec nos arrangements floraux artistiques et harmonieux.' },
    ],
    contactTitre: 'Nous aimons vous aider',
    contactTexte: 'Confiez la décoration florale de votre mariage à Atelier Flora et profitez d\'une expérience sans stress, où chaque détail est pris en charge avec soin et expertise. Prenez rendez-vous pour une consultation personnalisée.',
  }).commit()
  console.log('  ✓ Page Mariage mise à jour')

  console.log('\n=== Tout est terminé ! ===')
} catch (err) {
  console.error('Error:', err.message)
}

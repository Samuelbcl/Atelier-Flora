import type { StructureResolver } from 'sanity/structure'

const singletonItem = (
  S: Parameters<StructureResolver>[0],
  typeName: string,
  title: string,
  icon?: React.ComponentType
) =>
  S.listItem()
    .title(title)
    .id(typeName)
    .icon(icon as Parameters<ReturnType<typeof S.listItem>['icon']>[0])
    .child(
      S.document()
        .schemaType(typeName)
        .documentId(typeName)
        .title(title)
    )

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      // Pages
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              singletonItem(S, 'pageAccueil', 'Accueil'),
              singletonItem(S, 'pageAPropos', 'À propos'),
              singletonItem(S, 'pageGalerie', 'Galerie'),
              singletonItem(S, 'pageCatalogue', 'Catalogue'),
              singletonItem(S, 'pageContact', 'Contact'),
            ])
        ),
      S.divider(),

      // Catalogue
      S.listItem()
        .title('Catalogue')
        .child(
          S.list()
            .title('Catalogue')
            .items([
              S.documentTypeListItem('produit').title('Produits'),
              S.documentTypeListItem('categorie').title('Catégories'),
            ])
        ),
      S.divider(),

      // Galerie photos
      S.listItem()
        .title('Galerie photos')
        .child(
          S.list()
            .title('Galerie photos')
            .items([
              S.documentTypeListItem('photoGalerie').title('Photos'),
              S.documentTypeListItem('categorieGalerie').title('Catégories'),
            ])
        ),
      S.divider(),

      // Témoignages
      S.documentTypeListItem('temoignage').title('Témoignages'),
      S.divider(),

      // Réglages
      singletonItem(S, 'settings', 'Réglages du site'),
    ])

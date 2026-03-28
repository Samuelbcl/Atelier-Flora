import type { StructureResolver } from 'sanity/structure'

const singletonItem = (
  S: Parameters<StructureResolver>[0],
  typeName: string,
  title: string,
) =>
  S.listItem()
    .title(title)
    .id(typeName)
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
        .id('pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              singletonItem(S, 'pageAccueil', 'Accueil'),
              singletonItem(S, 'pageAPropos', 'À propos'),

              // Galerie — sous-menu avec paramètres + collections
              S.listItem()
                .title('Galerie')
                .id('galerie-group')
                .child(
                  S.list()
                    .title('Galerie')
                    .items([
                      singletonItem(S, 'pageGalerie', 'Paramètres de la page'),
                      S.divider(),
                      S.documentTypeListItem('categorieGalerie').title('Catégories'),
                      S.documentTypeListItem('photoGalerie').title('Photos'),
                    ])
                ),

              // Catalogue — sous-menu avec paramètres + collections
              S.listItem()
                .title('Catalogue')
                .id('catalogue-group')
                .child(
                  S.list()
                    .title('Catalogue')
                    .items([
                      singletonItem(S, 'pageCatalogue', 'Paramètres de la page'),
                      S.divider(),
                      S.documentTypeListItem('categorie').title('Catégories'),
                      S.documentTypeListItem('produit').title('Produits'),
                    ])
                ),

              singletonItem(S, 'pageMariage', 'Mariage'),
              singletonItem(S, 'pageContact', 'Contact'),
            ])
        ),
      S.divider(),

      // Réglages
      singletonItem(S, 'settings', 'Réglages du site'),
    ])

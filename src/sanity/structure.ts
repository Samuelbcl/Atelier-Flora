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
              // Fleurs — sous-menu (comme la nav du site)
              S.listItem()
                .title('Fleurs')
                .id('fleurs-group')
                .child(
                  S.list()
                    .title('Fleurs')
                    .items([
                      S.documentTypeListItem('categorie').title('Catégories'),
                      S.documentTypeListItem('produit').title('Produits'),
                      S.divider(),
                      singletonItem(S, 'pageMariage', 'Page Mariage'),
                    ])
                ),
              singletonItem(S, 'pageAccueil', 'Accueil'),
              singletonItem(S, 'pageAPropos', 'À propos'),
              singletonItem(S, 'pageContact', 'Contact'),
            ])
        ),
      S.divider(),

      // Témoignages
      S.documentTypeListItem('temoignage').title('Témoignages'),
      S.divider(),

      // Réglages
      singletonItem(S, 'settings', 'Réglages du site'),
    ])

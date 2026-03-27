import type { StructureResolver } from 'sanity/structure'

const singletonItem = (S: Parameters<StructureResolver>[0], typeName: string, title: string) =>
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
      // Paramètres
      singletonItem(S, 'settings', 'Paramètres du site'),
      S.divider(),

      // Pages
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              singletonItem(S, 'pageAccueil', 'Page d\'accueil'),
              singletonItem(S, 'pageAPropos', 'Page À propos'),
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
    ])

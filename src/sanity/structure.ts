import type { StructureResolver } from 'sanity/structure'

// Singleton document types — only one instance should exist
const singletonTypes = new Set(['pageAccueil', 'pageAPropos'])

// Helpers
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
      // Singletons — pages uniques
      S.divider(),
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

      // Collections — produits & catégories
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

// Filter out singleton types from the global "new document" menu
export const singletonActions = (prev: string[], context: { schemaType: string }) => {
  if (singletonTypes.has(context.schemaType)) {
    return prev.filter((action) => action !== 'delete')
  }
  return prev
}

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
    .title('Bloom Club')
    .items([
      // Personnalisation
      singletonItem(S, 'settings', 'Personnalisation'),
      S.divider(),

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
              singletonItem(S, 'pageContact', 'Contact'),
              singletonItem(S, 'pageMariage', 'Mariage'),
            ])
        ),
      S.divider(),

      // Contenu
      S.listItem()
        .title('Contenu')
        .id('contenu')
        .child(
          S.list()
            .title('Contenu')
            .items([
              S.listItem()
                .title('Fleurs')
                .id('fleurs-group')
                .child(
                  S.list()
                    .title('Fleurs')
                    .items([
                      S.documentTypeListItem('categorie').title('Catégories'),
                      S.documentTypeListItem('produit').title('Produits'),
                    ])
                ),
              S.documentTypeListItem('temoignage').title('Témoignages'),
            ])
        ),
      S.divider(),

      // Pages personnalisées (page builder)
      S.documentTypeListItem('page').title('Pages personnalisées'),
    ])

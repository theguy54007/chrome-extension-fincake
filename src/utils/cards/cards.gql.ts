export const CardQuery = `
query {
  cards(last: 3) {
    nodes {
       fullTitle,
       imgUrl,
       path
    }
  }
}`

export function genCardQueryByTags(tagId: number) {
  return `
  query {
    cards(tagIds: [${tagId}], first: 5) {
      nodes {
        fullTitle,
        imgUrl,
        path
      }
    }
  }`
}

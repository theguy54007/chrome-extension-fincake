export const UserCardQuery = `
query {
  userCards{
    nodes{
      id
      card {
        fullTitle
        imgUrl
        path
      }
    }
  }
}`

// export function genCardQueryByTags(tagId: number) {
//   return `
//   query {
//     cards(tagIds: [${tagId}], first: 5) {
//       nodes {
//         fullTitle,
//         imgUrl,
//         path
//       }
//     }
//   }`
// }

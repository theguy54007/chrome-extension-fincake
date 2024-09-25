import { getStoredUser } from "../storage"

export const TaskQuery = `
query {
  tasks(scopes: ["show", "active"], first: 5,sortBy: "sort.asc") {
    totalCount
    nodes {
      id
      title
      subtitle
      imgUrl
      descriptions
      viewValue
      sort
    }
  }
}`

export async function genTaskValueQueryByUserId() {
  let userId = 0
  await getStoredUser().then((user) => {userId = user.id})
  if (!userId) {
    return ''
  }

  return `
  query {
    tasks(scopes: ["show", "active"], userId: ${userId}, sortBy: "sort.asc") {
    totalCount
    nodes {
      viewValue
    }
  }
  }`
}

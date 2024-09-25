import { getAccessToken } from "./storage"

// const fincakeDomain = 'http://localhost:3000'
export const FincakeDomain = 'https://www.fincake.co'
export const FincakeApiDomain = 'https://api.fincake.co'
export async function fetchAccessToken(refreshToken: string): Promise<any> {
  const res = await fetch(
    `${FincakeApiDomain}/api/v1/user/access_token`, {
      method: "Post",
      headers: {
        'Authorization': refreshToken,
        'Content-Type': 'json'
      }
    }
  )

  if (!res.ok) {
    throw new Error()
  }

  const data: any = await res.json()
  return data
}

export async function loginByToken(access_token: string): Promise<any> {
  const res = await fetch(
    `${FincakeApiDomain}/api/v1/user/login_by_token`, {
      method: "POST", // HTTP methods should be uppercase
      headers: {
        'Content-Type': 'application/json' // Correct MIME type for JSON
      },
      body: JSON.stringify({ // Convert the JavaScript object to a JSON string
        access_token: access_token
      })
    }
  );


  if (!res.ok) {
    throw new Error()
  }

  const data: any = await res.json()
  return data
}


export async function fetchGraphQL(query: string, args?: {useToken?: boolean, variables?: any}): Promise<any> {
    let { useToken = false, variables = {} } = args || {}
    let headers = {
      'Content-Type': 'application/json',
    }
    if (useToken) {
      await getAccessToken().then(token => {
        headers['Authorization'] = token
      })
    }
    const response = await fetch(`${FincakeApiDomain}/graphql`, {  // Replace with your GraphQL endpoint
        method: 'POST',
        headers,
        body: JSON.stringify({
            query,
            variables
        })
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const result = await response.json();
    if (result.errors) {
        throw new Error('GraphQL query errors: ' + JSON.stringify(result.errors));
    }
    return result.data;
}

export interface LocalStorageOptions {
  hasAutoOverlay: boolean
}

export type TLocalStorageUser ={
  email: string,
  name: string,
  id: number
}

export type TLocalStorageAccessToken = string

export interface LocalStorage {
  options?: LocalStorageOptions,
  user?: TLocalStorageUser,
  accessToken?: TLocalStorageAccessToken
}

export type LocalStorageKeys = keyof LocalStorage

export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  const vals: LocalStorage = {
    options,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}

export function setStoredUser(user: TLocalStorageUser): Promise<void> {
  const vals: LocalStorage = {
    user,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}

export function setStoredAccessToken(accessToken: TLocalStorageAccessToken): Promise<void> {
  const vals: LocalStorage = {
    accessToken,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}

export function getStoredOptions(): Promise<LocalStorageOptions> {
  const keys: LocalStorageKeys[] = ['options']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.options)
    })
  })
}


export function getStoredUser(): Promise<TLocalStorageUser> {
  const keys: LocalStorageKeys[] = ['user']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.user)
    })
  })
}

export function getAccessToken(): Promise<TLocalStorageAccessToken> {
  const keys: LocalStorageKeys[] = ['accessToken']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.accessToken)
    })
  })
}

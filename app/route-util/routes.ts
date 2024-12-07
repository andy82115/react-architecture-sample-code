export const Routes = {
  DETAIL: '/detail',
  SEARCH: '/search',
  HOME: '/',
} as const

export type RoutePaths = keyof typeof Routes

export const QueryParams = {
  REPO_NAME: 'repoName',
}

export const buildQueryParams = (params: Record<string, any>) => {
  const queryString = new URLSearchParams(params).toString()
  return `?${queryString}`
}

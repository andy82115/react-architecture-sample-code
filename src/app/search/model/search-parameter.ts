import { z } from 'zod'

export enum SearchOrder {
  desc = 'desc',
  asc = 'asc',
}

export enum SearchSort {
  stars = 'stars',
  forks = 'forks',
  updated = 'updated',
}

export enum InWhere {
  all = 'all',
  name = 'name',
  description = 'description',
  topics = 'topics',
  readme = 'readme',
}

const InWhereSchema = z.nativeEnum(InWhere)

const SearchOrderSchema = z.nativeEnum(SearchOrder)

const SearchSortSchema = z.nativeEnum(SearchSort)

const QueryFilterSchema = z.object({
  keyword: z.string().default(''),
  inWhere: InWhereSchema.default(InWhere.all),
  followers: z.number().min(0).default(0),
  forks: z.number().min(0).default(0),
  stars: z.number().min(0).default(0),
  language: z.string().default(''),
})
export type QueryFilter = z.infer<typeof QueryFilterSchema>

const SearchParamSchema = z.object({
  queryFilter: QueryFilterSchema,
  sort: SearchSortSchema.default(SearchSort.updated),
  order: SearchOrderSchema.default(SearchOrder.asc),
  perPage: z.number().min(1).default(15),
  page: z.number().min(1).default(1),
})
export type SearchParam = z.infer<typeof SearchParamSchema>

// * Github query need to combine with special way, EX: q=ret+in:name+followers:>=10
// * Githubのクエリは特別な方法で組み合わせる必要がある, 例: q=ret+in:name+followers:>=10
export const combineQueryString = (filter: QueryFilter): string => {
  const queryParts: string[] = []
  if (filter.keyword) queryParts.push(filter.keyword)
  if (filter.inWhere !== InWhere.all) queryParts.push(`in:${filter.inWhere}`)
  if (filter.followers > 0) queryParts.push(`followers:>=${filter.followers}`)
  if (filter.forks > 0) queryParts.push(`forks:>=${filter.forks}`)
  if (filter.stars > 0) queryParts.push(`stars:>=${filter.stars}`)
  if (filter.language) queryParts.push(`language:${filter.language}`)
  return queryParts.join('+')
}

export const createNewSearchParam = (): SearchParam => {
    const newQueryFilter = QueryFilterSchema.parse({})
    const newSearchParam = SearchParamSchema.parse({
        queryFilter: newQueryFilter
    })
  
    return newSearchParam
  }

export const copyQueryFilter = (
  queryFilter: QueryFilter,
  modifications: Partial<QueryFilter>,
): QueryFilter => {
  const modifiedQueryFilter = { ...queryFilter, ...modifications }

  const result = QueryFilterSchema.safeParse(modifiedQueryFilter)

  if (result.success) {
    return result.data
  } else {
    throw new Error('Invalid QueryFilter modifications')
  }
}

export const copySearchParam = (
  searchParam: SearchParam,
  modifications: Partial<SearchParam>,
): SearchParam => {
  const modifiedSearchParam = { ...searchParam, ...modifications }

  const result = SearchParamSchema.safeParse(modifiedSearchParam)

  if (result.success) {
    return result.data
  } else {
    throw new Error('Invalid SearchParam modifications')
  }
}

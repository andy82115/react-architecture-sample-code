import {
  SearchParam,
  copySearchParam,
  copyQueryFilter,
  createNewSearchParam,
} from '../model/search-parameter'
import { InWhere, SearchSort, SearchOrder } from '../model/search-parameter'
import { create } from 'zustand'

type SetSearchParamArgs = {
  keyword?: string
  inWhere?: InWhere
  followers?: number
  forks?: number
  stars?: number
  language?: string
  sort?: SearchSort
  order?: SearchOrder
}

type SearchParamStore = {
  searchParamState: SearchParam
  setSearchParam: (args: SetSearchParamArgs) => SearchParam
}

// * keep the state for the Parameter of Search Repository
// * Search RepositoryのParameterの状態を保持する
export const useSearchParamStore = create<SearchParamStore>((set, get) => {
  return {
    searchParamState: createNewSearchParam(),
    setSearchParam: (args: SetSearchParamArgs) => {
      const searchParam = get().searchParamState

      const newQueryFilter = copyQueryFilter(searchParam.queryFilter, {
        keyword: args.keyword ?? searchParam.queryFilter.keyword,
        inWhere: args.inWhere ?? searchParam.queryFilter.inWhere,
        followers: args.followers ?? searchParam.queryFilter.followers,
        forks: args.forks ?? searchParam.queryFilter.forks,
        stars: args.stars ?? searchParam.queryFilter.stars,
        language: args.language ?? searchParam.queryFilter.language,
      })

      const newSearchParam = copySearchParam(searchParam, {
        queryFilter: newQueryFilter,
        sort: args.sort ?? searchParam.sort,
        order: args.order ?? searchParam.order,
      })

      set({ searchParamState: newSearchParam })

      return newSearchParam
    },
  }
})

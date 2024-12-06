import { SearchResponse } from '@/src/share/api/model/search-response'
import { SearchParam, copySearchParam } from '../model/search-parameter'
import { create } from 'zustand'
import { searchRepositoryImpl } from '../data/repository/search-repositoryImpl'
import { Item } from '../../../share/api/model/search-response'

export enum SearchFetchState {
  init = 'init',
  initLoading = 'initLoading',
  loaded = 'loaded',
  fail = 'fail',
  moreLoading = 'moreLoading',
  max = 'max',
}

type SearchStore = {
  repositoryList: Item[]
  fetchState: SearchFetchState
  total: number
  currentPage: number
  isSearchExtend: boolean
  onExtendToggle: (isExtend: boolean) => void
  fetchMoreData: (param: SearchParam) => void
  checkKeywordAndSearch: (param: SearchParam) => Promise<void>
}

// * funcName -> public function, _funcName -> private function
// * funcName -> 公開関数, _funcName -> プライベート関数
export const useSearchStore = create<SearchStore>((set, get) => {
  let fetchMoreDebounceTimer: NodeJS.Timeout | null = null
  let searchDebounceTimer: NodeJS.Timeout | null = null

  // * Get more data with debounce setting
  // * デバウンス設定 + もっとデータをもらう
  const fetchMoreData = (param: SearchParam) => {
    const currentState = get().fetchState
    if (currentState === SearchFetchState.init) return
    if (!_isFetchAllow()) return
    if (fetchMoreDebounceTimer) {
      clearTimeout(fetchMoreDebounceTimer)
    }

    fetchMoreDebounceTimer = setTimeout(() => {
      set({ fetchState: SearchFetchState.moreLoading })
      _requestRepositoryApi(param, 'fetch more data')
    }, 500)
  }

  // * Is state allow to ask data from Api
  // * Apiからデータを要求できる状態を確認する
  const _isFetchAllow = () => {
    const currentState = get().fetchState
    return (
      currentState !== SearchFetchState.init &&
      currentState !== SearchFetchState.max &&
      currentState !== SearchFetchState.moreLoading
    )
  }

  // *　Refresh data and use new SearchParam to get API Data
  // * データをリフレッシュ。新しいSearchParamを使用して、APIデータを取得する。
  const _searchAgain = async (param: SearchParam) => {
    if (!_isFetchAllow) return

    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer)
    }

    searchDebounceTimer = setTimeout(() => {
      set({
        repositoryList: [],
        fetchState: SearchFetchState.initLoading,
        total: 50,
        currentPage: 1,
      })
      _requestRepositoryApi(param, 'search again')
    }, 500)
  }

  // *　Get data from Api
  // * Api からデータを取得する
  const _requestRepositoryApi = async (param: SearchParam, tag: string) => {
    const currentPage = get().currentPage

    const searchParam = copySearchParam(param, {
      page: currentPage,
    })

    console.log('try to request repository list with' + tag)

    const response = await searchRepositoryImpl.getRepositoryList(searchParam)

    _updateStateFromResponse(response)
  }

  // * Update state based on Api response
  // * API レスポンスに基づいて状態を更新する
  const _updateStateFromResponse = (response: SearchResponse) => {
    const currentRepositoryList = get().repositoryList

    const newRepositoryList = [
      ...currentRepositoryList,
      ...(response.items ?? []),
    ]

    const newFetchState =
      newRepositoryList.length >= get().total
        ? SearchFetchState.max
        : SearchFetchState.loaded

    set({
      repositoryList: newRepositoryList,
      fetchState: newFetchState,
      total: response.total_count,
      currentPage: get().currentPage + 1,
    })
  }

  // * return Zustand define state and function
  // * Zustandの状態および関数を実装する
  return {
    repositoryList: [],
    fetchState: SearchFetchState.init,
    total: 50,
    currentPage: 1,
    isSearchExtend: false,
    fetchMoreData: fetchMoreData,
    onExtendToggle: (isExtend) => {
      set({
        isSearchExtend: isExtend,
      })
    },
    checkKeywordAndSearch: async (param: SearchParam) => {
      if (param.queryFilter.keyword === '') return
      _searchAgain(param)
    },
  }
})

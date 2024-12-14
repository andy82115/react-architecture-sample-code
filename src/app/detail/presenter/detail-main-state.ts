import { DetailResponse } from '@/src/share/api/model/detail-response'
import { create } from 'zustand'
import { detailRepositoryImpl } from '../data/repository/detail-reposiotryImpl'
import { DetailRepository } from '../domain/detail-repository'

export enum DetailFetchState {
  init = 'init',
  initLoading = 'initLoading',
  loaded = 'loaded',
  fail = 'fail',
}

type DetailStore = {
  repoData: DetailResponse | null
  fetchState: DetailFetchState
  fetchRepoData: (repoFullName: string) => Promise<void>
}

export const useDetailStore = create<DetailStore>((set) => {
  // ! TODO: replace with DI. Using inject to use detailRepositoryImpl
  const detailRepository: DetailRepository = detailRepositoryImpl

  return {
    repoData: null,
    fetchState: DetailFetchState.init,
    fetchRepoData: async (repoFullName: string) => {
      set({ fetchState: DetailFetchState.initLoading })

      try {
        const response =
          await detailRepository.getRepositoryDetail(repoFullName)
        set({
          fetchState: DetailFetchState.loaded,
          repoData: response,
        })
      } catch (error) {
        set({ fetchState: DetailFetchState.fail })
        throw new Error(
          'Failed to fetch repository detail: ' +
            (error instanceof Error ? error.message : String(error)),
        )
      }
    },
  }
})

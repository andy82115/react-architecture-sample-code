'use client'

import SearchCard from '@/components/search/search-card'
import ResultCard from '@/components/search/result-card'
import {
  useSearchStore,
  SearchFetchState,
} from '@/src/app/search/presenter/search-main-state'
import { useSearchParamStore } from '@/src/app/search/presenter/search-param-state'
import { Virtuoso } from 'react-virtuoso'
import { useRouter } from 'next/navigation'
import { Routes, QueryParams, buildQueryParams } from '../util/router/routes'
import { useState, useEffect } from 'react'
import { ScreenSize } from '../util/screen/screen'

export default function SearchRepository() {
  const {
    repositoryList,
    fetchState,
    total,
    currentPage,
    fetchMoreData,
    checkKeywordAndSearch,
    isSearchExtend,
    isCardTransform,
    onCardTransofrm,
    onExtendToggle,
  } = useSearchStore()

  const { searchParamState, setSearchParam } = useSearchParamStore()

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)

  const router = useRouter()

  const pushDetailPage = (repo?: String) => {
    if (repo) {
      const queryParams = buildQueryParams({ [QueryParams.REPO_NAME]: repo })
      router.push(`${Routes.DETAIL}${queryParams}`)
    }
  }

  const loadMoreItems = (index: number) => {
    fetchMoreData(searchParamState)
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
      console.log(`screen width = ${screenWidth}`)
      if (screenWidth < ScreenSize.SM) {
        onCardTransofrm(true)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="pt-[5vh] h-screen w-screen flex flex-col items-center sm:items-center">
      <SearchCard
        isCardTransform={isCardTransform}
        initExtendValue={isSearchExtend}
        queryFilter={searchParamState.queryFilter}
        onExtendToggle={onExtendToggle}
        onKeywordChange={(keyword) => {
          checkKeywordAndSearch(setSearchParam({ keyword: keyword }))
        }}
        onInWhereChange={(inWhere) => {
          checkKeywordAndSearch(setSearchParam({ inWhere: inWhere }))
        }}
        onFollowerChange={(follower) => {
          checkKeywordAndSearch(setSearchParam({ followers: follower }))
        }}
        onStarsChange={(stars) => {
          checkKeywordAndSearch(setSearchParam({ stars: stars }))
        }}
        onForksChange={(forks) => {
          checkKeywordAndSearch(setSearchParam({ forks: forks }))
        }}
        onLanguageChange={(language) => {
          checkKeywordAndSearch(setSearchParam({ language: language }))
        }}
      ></SearchCard>

      <div className="h-4 w-4"></div>

      <div className="h-full w-full">
        {/* Api Fail の画面 */}
        {fetchState == SearchFetchState.fail && (
          <div className="text-black dark:text-white">data load fail</div>
        )}
        {/* Api初めてinitの画面 */}
        {fetchState === SearchFetchState.init ||
        fetchState === SearchFetchState.initLoading ? (
          <div className="w-full h-full flex justify-center items-center text-black dark:text-white">
            loading
          </div>
        ) : (
          <div className="h-full w-full overflow-y-auto">
            {/* Api loading 成功しました画面 */}
            <Virtuoso
              className="scrollbar-hide"
              totalCount={repositoryList.length}
              itemContent={(index) => {
                const repo = repositoryList[index]
                return (
                  <div className="px-10 py-5">
                    <ResultCard
                      imgUrl={repo.owner?.avatar_url ?? ''}
                      name={repo.full_name ?? ''}
                      describe={repo.description ?? ''}
                      followers={repo.watchers_count ?? 0}
                      stars={repo.forks_count ?? 0}
                      forks={repo.stargazers_count ?? 0}
                      onCardClick={() => {
                        pushDetailPage(repo.full_name)
                      }}
                    />
                  </div>
                )
              }}
              endReached={loadMoreItems}
              rangeChanged={({ startIndex, endIndex }) => {
                console.log(
                  `start index = ${startIndex}, end index = ${endIndex}`,
                )
                if (startIndex < 1 && screenWidth >= ScreenSize.SM) {
                  onCardTransofrm(false)
                } else {
                  onCardTransofrm(true)
                }
              }}
            />
            {fetchState === SearchFetchState.moreLoading && (
              <div className="text-center py-2">Loading more...</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

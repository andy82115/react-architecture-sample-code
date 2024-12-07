'use client'

import { useSearchParams } from 'next/navigation'
import {
  useDetailStore,
  DetailFetchState,
} from '@/src/app/detail/presenter/detail-main-state'
import { useEffect } from 'react'
import DetailCard from '../../components/detail/detail-card'
import { QueryParams } from '../util/router/routes'

export default function Detail() {
  const searchParams = useSearchParams()
  const repoName = searchParams.get(QueryParams.REPO_NAME)

  const { repoData, fetchRepoData, fetchState } = useDetailStore()

  useEffect(() => {
    if (repoName) {
      fetchRepoData(repoName)
    }
  }, [])

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      {fetchState == DetailFetchState.init && (
        <div className="text-black dark:text-white">data init</div>
      )}
      {fetchState == DetailFetchState.initLoading && (
        <div className="text-black dark:text-white">data loading</div>
      )}
      {fetchState == DetailFetchState.fail && (
        <div className="text-black dark:text-white">data load fail</div>
      )}
      {fetchState == DetailFetchState.loaded && (
        <DetailCard
          imgUrl={repoData?.owner?.avatar_url ?? 'X'}
          repoName={repoData?.full_name ?? 'X'}
          owner={repoData?.owner?.login ?? 'X'}
          language={repoData?.language ?? 'X'}
          describe={repoData?.description ?? 'X'}
          followers={repoData?.watchers_count ?? 0}
          forks={repoData?.forks ?? 0}
          stars={repoData?.stargazers_count ?? 0}
          issue={repoData?.open_issues_count ?? 0}
        ></DetailCard>
      )}
    </div>
  )
}

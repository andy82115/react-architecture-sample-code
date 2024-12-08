import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import {
  useDetailStore,
  DetailFetchState,
} from '../../../src/app/detail/presenter/detail-main-state'
import { detailRepositoryImpl } from '../../../src/app/detail/data/repository/detail-reposiotryImpl'

vi.mock(
  '../../../src/app/detail/data/repository/detail-reposiotryImpl',
  () => ({
    detailRepositoryImpl: {
      getRepositoryDetail: vi.fn(),
    },
  }),
)

describe('useDetailStore', () => {
  const mockDetailResponse = {
    id: 1,
    full_name: 'test/repo',
    description: 'Test Repository',
    owner: {
      login: 'testowner',
      avatar_url: 'https://example.com/avatar.jpg',
    },
    stargazers_count: 100,
    forks_count: 50,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useDetailStore())

    expect(result.current.repoData).toBeNull()
    expect(result.current.fetchState).toBe(DetailFetchState.init)
  })

  it('should fetch repository detail successfully', async () => {
    vi.mocked(detailRepositoryImpl.getRepositoryDetail).mockResolvedValue(
      mockDetailResponse,
    )

    const { result } = renderHook(() => useDetailStore())

    const repoFullName = 'test/repo'

    await act(async () => {
      await result.current.fetchRepoData(repoFullName)
    })

    await waitFor(
      () => {
        // console.log('fetch repository detail successfully: ' , result.current)
        expect(result.current.repoData).toEqual(mockDetailResponse)
        expect(result.current.fetchState).toBe(DetailFetchState.loaded)
        expect(detailRepositoryImpl.getRepositoryDetail).toHaveBeenCalledWith(
          repoFullName,
        )
      },
      { timeout: 600 },
    )
  })

  it('should handle fetch repository detail failure', async () => {
    const errorMessage = 'Network Error'
    vi.mocked(detailRepositoryImpl.getRepositoryDetail).mockRejectedValue(
      new Error(errorMessage),
    )

    const { result } = renderHook(() => useDetailStore())

    const repoFullName = 'test/repo'

    await act(async () => {
      await expect(result.current.fetchRepoData(repoFullName)).rejects.toThrow(
        `Failed to fetch repository detail: ${errorMessage}`,
      )
    })

    // await waitFor(() => {
    //   // console.log('fetch repository detail fail: ' , result.current)
    //   expect(result.current.fetchState).toBe(DetailFetchState.fail)
    // })
  })

  it('should handle multiple consecutive fetch calls', async () => {
    vi.mocked(detailRepositoryImpl.getRepositoryDetail)
      .mockResolvedValueOnce(mockDetailResponse)
      .mockResolvedValueOnce({
        ...mockDetailResponse,
        full_name: 'another/repo',
      })

    const { result } = renderHook(() => useDetailStore())

    const repos = ['test/repo', 'another/repo']

    for (const repoName of repos) {
      await act(async () => {
        await result.current.fetchRepoData(repoName)
      })
    }

    await waitFor(() => {
      // console.log('handle multiple consecutive fetch calls: ' , result.current)
      expect(result.current.repoData?.full_name).toBe('another/repo')
      expect(result.current.fetchState).toBe(DetailFetchState.loaded)
    })
  })
})

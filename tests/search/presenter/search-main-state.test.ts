import { vi, describe, it, expect, beforeEach } from 'vitest'
import {
  useSearchStore,
  SearchFetchState,
  SearchStateInitConfig,
} from '../../../src/app/search/presenter/search-main-state'
import { searchRepositoryImpl } from '../../../src/app/search/data/repository/search-repositoryImpl'
import { createNewSearchParam } from '../../../src/app/search/model/search-parameter'
import { renderHook, act, waitFor } from '@testing-library/react'

vi.mock(
  '../../../src/app/search/data/repository/search-repositoryImpl',
  () => ({
    searchRepositoryImpl: {
      getRepositoryList: vi.fn(),
    },
  }),
)

describe('useSearchStore', () => {
  const mockSearchResponse = {
    total_count: 100,
    items: [
      { id: 1, full_name: 'test/repo1', description: 'Test Repo 1' },
      { id: 2, full_name: 'test/repo2', description: 'Test Repo 2' },
    ],
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useSearchStore())

    expect(result.current.repositoryList).toEqual(
      SearchStateInitConfig.repositoryList,
    )
    expect(result.current.fetchState).toBe(SearchFetchState.init)
    expect(result.current.total).toBe(SearchStateInitConfig.total)
    expect(result.current.currentPage).toBe(SearchStateInitConfig.currentPage)
    expect(result.current.isSearchExtend).toBe(false)
    expect(result.current.isCardTransform).toBe(false)
  })

  it('should toggle search extend', () => {
    const { result } = renderHook(() => useSearchStore())

    act(() => {
      result.current.onExtendToggle(true)
    })

    expect(result.current.isSearchExtend).toBe(true)
  })

  it('should toggle card transform', () => {
    const { result } = renderHook(() => useSearchStore())

    act(() => {
      result.current.onCardTransofrm(true)
    })

    expect(result.current.isCardTransform).toBe(true)
  })

  it('should not search with empty keyword', async () => {
    const { result } = renderHook(() => useSearchStore())

    const mockSearchParam = createNewSearchParam()

    await act(async () => {
      await result.current.checkKeywordAndSearch(mockSearchParam)
    })

    expect(result.current.fetchState).toBe(SearchFetchState.init)
  })

  it('should fetch repository list successfully', async () => {
    vi.mocked(searchRepositoryImpl.getRepositoryList).mockResolvedValue(
      mockSearchResponse,
    )

    const { result } = renderHook(() => useSearchStore())

    act(() => {
      result.current.forceLoaded()
    })

    const mockSearchParam = createNewSearchParam()
    mockSearchParam.queryFilter.keyword = 'test'

    // console.log('Initial state:', result.current)
    await act(async () => {
      await result.current.checkKeywordAndSearch(mockSearchParam)
    })

    await waitFor(() => {
      // console.log('Final state:', result.current)
      expect(result.current.repositoryList).toEqual(mockSearchResponse.items)
      expect(result.current.fetchState).toBe(SearchFetchState.loaded)
      expect(result.current.total).toBe(mockSearchResponse.total_count)
      expect(result.current.currentPage).toBe(2)
    })
  })

  it('should fetch more data when allowed', async () => {
    vi.mocked(searchRepositoryImpl.getRepositoryList).mockResolvedValue(
      mockSearchResponse,
    )

    const { result } = renderHook(() => useSearchStore())

    act(() => {
      result.current.forceLoaded()
    })

    const mockSearchParam = createNewSearchParam()
    mockSearchParam.queryFilter.keyword = 'test'

    await act(async () => {
      await result.current.checkKeywordAndSearch(mockSearchParam)
    })

    await waitFor(() => {
      // console.log('Final state first:', result.current)
      expect(result.current.repositoryList.length).toBe(2)
    })

    await act(async () => {
      result.current.fetchMoreData(mockSearchParam)
    })

    await waitFor(() => {
      // console.log('Final state loadmore:', result.current)
      expect(result.current.repositoryList.length).toBe(4)
      expect(result.current.fetchState).toBe(SearchFetchState.loaded)
      expect(result.current.currentPage).toBe(3)
    })
  })

  it('should not fetch more data when in max state', async () => {
    const maxResponse = {
      total_count: 2,
      items: mockSearchResponse.items,
    }
    vi.mocked(searchRepositoryImpl.getRepositoryList).mockResolvedValue(
      maxResponse,
    )

    const { result } = renderHook(() => useSearchStore())

    const mockSearchParam = createNewSearchParam()
    mockSearchParam.queryFilter.keyword = 'test'

    await act(async () => {
      await result.current.checkKeywordAndSearch(mockSearchParam)
    })

    await waitFor(() => {
      // console.log('Final state first:', result.current)
      expect(result.current.repositoryList.length).toBe(2)
    })

    await act(async () => {
      result.current.fetchMoreData(mockSearchParam)
    })

    await waitFor(() => {
      // console.log('Final state loadmore:', result.current)
      expect(result.current.fetchState).toBe(SearchFetchState.max)
      expect(result.current.repositoryList.length).toBe(4)
    })
  })
})

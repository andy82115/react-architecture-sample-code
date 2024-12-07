import { vi, describe, it, expect, beforeEach } from 'vitest'
import axios from 'axios'
import { getApiClient } from '../../../src/share/api/api-client'

vi.mock('axios')

describe('API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch repository list successfully', async () => {
    const mockAxiosInstance = {
      get: vi.fn(),
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
    }

    vi.mocked(axios.create).mockReturnValue(mockAxiosInstance as any)

    const mockResponseData = {
      items: [
        {
          id: 1,
          full_name: 'test/repo',
          description: 'Test Repository',
        },
      ],
      total_count: 1,
    }

    mockAxiosInstance.get.mockResolvedValue({
      data: mockResponseData,
      status: 200,
    })

    const apiClient = getApiClient()

    const result = await apiClient.getRepository.list({
      q: 'test',
      page: 1,
      pageSize: 10,
    })

    expect(mockAxiosInstance.get).toHaveBeenCalledOnce()
    expect(result).toEqual(mockResponseData)
  })

  // * Will send api error when keyword is empty
  // * キーワードが空の場合、apiエラーを送信します。
  it('should handle API error for empty keyword', async () => {
    const mockAxiosInstance = {
      get: vi.fn(),
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
    }

    vi.mocked(axios.create).mockReturnValue(mockAxiosInstance as any)

    const apiClient = getApiClient()

    await expect(apiClient.getRepository.list({ q: '' })).rejects.toThrow(
      'Keyword empty error',
    )
  })
})

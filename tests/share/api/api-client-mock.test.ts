import { vi, describe, it, expect, beforeEach } from 'vitest'
import axios from 'axios'
import { getApiClient } from '../../../src/share/api/api-client'

vi.mock('axios')

describe('API Client', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks()
  })

  it('should fetch repository list successfully', async () => {
    // Mock axios.create to return a mock axios instance
    const mockAxiosInstance = {
      get: vi.fn(),
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
    }

    // Mock axios.create to return our mock instance
    vi.mocked(axios.create).mockReturnValue(mockAxiosInstance as any)

    // Prepare mock response data
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

    // Configure the mock get method to resolve with mock data
    mockAxiosInstance.get.mockResolvedValue({
      data: mockResponseData,
      status: 200,
    })

    // Get the API client and call the method
    const apiClient = getApiClient()

    // Ensure the correct method is called and that the response is returned
    const result = await apiClient.getRepository.list({
      q: 'test',
      page: 1,
      pageSize: 10,
    })

    // Assertions
    expect(mockAxiosInstance.get).toHaveBeenCalledOnce()
    expect(result).toEqual(mockResponseData)
  })

  it('should handle API error for empty keyword', async () => {
    const mockAxiosInstance = {
      get: vi.fn(),
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
    }

    vi.mocked(axios.create).mockReturnValue(mockAxiosInstance as any)

    // Try to call with an empty keyword and expect it to throw an error
    const apiClient = getApiClient()

    // Use reject() to expect the promise rejection
    await expect(apiClient.getRepository.list({ q: '' })).rejects.toThrow(
      'Keyword empty error',
    )
  })
})

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { SearchResponse } from './model/search-response'
import { DetailResponse } from './model/detail-response'

type HttpMethod = 'get' | 'post' | 'put' | 'delete'

let apiClientInstance: ReturnType<typeof createApiClient> | null = null

export const getApiClient = (config?: AxiosRequestConfig) => {
  if (!apiClientInstance) {
    apiClientInstance = createApiClient(config)
  }
  return apiClientInstance
}

const createApiClient = (config?: AxiosRequestConfig) => {
  const baseURL = process.env.GIT_API_URL
  const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    timeout: Number(process.env.REQUEST_TIMEOUT) | 10000,
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  })

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = process.env.GIT_TOKEN
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error),
  )

  axiosInstance.interceptors.response.use(
    (response) => {
      if (response.status !== 200) {
        return Promise.reject(new Error(response.data.message))
      }
      return response
    },
    (error) => {
      const errorMessage = error.response?.data?.message || 'api response error'
      return Promise.reject(new Error(errorMessage))
    },
  )

  const handleAutoEncode = (
    params: Record<string, any>,
    url: string,
    ...args: string[]
  ) => {
    let rawParams: Record<string, any> = {}
    let encodedParams: Record<string, any> = {}

    for (let key in params) {
      if (!args.includes(key)) {
        rawParams[key] = params[key]
      } else {
        encodedParams[key] = params[key]
      }
    }

    let finalUrl = `${url}?`

    for (let key in encodedParams) {
      finalUrl += `${key}=${encodedParams[key]}&`
    }

    const otherParams = new URLSearchParams(rawParams as any).toString()

    if (otherParams) {
      finalUrl += `${otherParams}&`
    }

    return finalUrl.substring(0, finalUrl.length - 1) // Removes the last character
  }

  const request = async <T, D = any>(
    method: HttpMethod,
    url: string,
    data?: D,
    params?: Record<string, any>,
  ): Promise<T> => {
    try {
      let response

      const finalUrl = handleAutoEncode(params ?? {}, url, 'q')

      switch (method) {
        case 'get':
          response = await axiosInstance.get<T>(finalUrl)
          break
        case 'post':
          response = await axiosInstance.post<T>(finalUrl, data)
          break
        case 'put':
          response = await axiosInstance.put<T>(finalUrl, data)
          break
        case 'delete':
          response = await axiosInstance.delete<T>(finalUrl)
          break
        default:
          throw new Error(`Unsupported HTTP method: ${method}`)
      }

      if (!response) {
        throw new Error('Response is undefined')
      }

      return response?.data
    } catch (error) {
      throw error
    }
  }

  const getRepository = {
    list: ({
      q = '',
      sort = 'updated',
      order = 'asc',
      page = 1,
      pageSize = 10,
    }) =>
      request<SearchResponse>('get', '/search/repositories', undefined, {
        q: q, // Pass q directly as is (without encoding)
        sort: sort,
        order: order,
        page: page,
        per_page: pageSize,
      }),
    detail: (repoFullName: string) =>
      request<DetailResponse>('get', `/repos/${repoFullName}`),
  }

  return {
    getRepository,
  }
}

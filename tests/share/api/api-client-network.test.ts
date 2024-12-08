/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, it } from 'vitest'
import { SearchResponse } from '../../../src/share/api/model/search-response'
import { DetailResponse } from '../../../src/share/api/model/detail-response'
import { getApiClient } from '../../../src/share/api/api-client'

// * Skip this test for now as it requires a running API server
// * 実行中のAPIサーバーが必要なので、このテストはスキップする。
it.skip('should search api return same data type', async () => {
  const apiClient = getApiClient()

  const response = await apiClient.getRepository.list({
    q: 'typescript+in:name+followers:>=10',
    page: 1,
    pageSize: 2,
  })

  console.log(response)

  function isSearchResponse(response: any): response is SearchResponse {
    return (
      response &&
      Array.isArray(response.items) &&
      typeof response.total_count === 'number'
    )
  }

  expect(isSearchResponse(response)).toBe(true)
})

it.skip('should detail api return same data type', async () => {
  const apiClient = getApiClient()

  const repoFullName = 'square/retrofit'

  const response = await apiClient.getRepository.detail(repoFullName)

  console.log(response)

  function isDetailResponse(response: any): response is DetailResponse {
    return response && String(response.full_name) === repoFullName
  }

  expect(isDetailResponse(response)).toBe(true)
})

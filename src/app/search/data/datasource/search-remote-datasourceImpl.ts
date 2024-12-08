import { getApiClient } from '../../../../share/api/api-client'
import { SearchRemoteDatasource } from '../../domain/search-remote-datasource'
import { SearchParam, combineQueryString } from '../../model/search-parameter'

export const searchRemoteDatasource: SearchRemoteDatasource = {
  getRepositoryList: async (param: SearchParam) => {
    const apiClient = getApiClient()

    try {
      const response = await apiClient.getRepository.list({
        q: combineQueryString(param.queryFilter),
        page: param.page,
        sort: param.sort,
        order: param.order,
      })

      return response
    } catch (error) {
      throw new Error('Failed to fetch repository list: ' + error)
    }
  },
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { SearchRepository } from '../../domain/search-repository'
import { searchRemoteDatasource } from '../datasource/search-remote-datasourceImpl'
import { SearchParam } from '../../model/search-parameter'

export const searchRepositoryImpl: SearchRepository = {
  getRepositoryList: async (param: SearchParam) => {
    const datasource = searchRemoteDatasource

    try {
      const response = await datasource.getRepositoryList(param)

      return response
    } catch (error) {
      throw new Error('Failed to fetch repository list: ' + error)
    }
  },
}

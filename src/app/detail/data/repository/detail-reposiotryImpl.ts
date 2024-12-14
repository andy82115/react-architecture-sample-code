/* eslint-disable @typescript-eslint/no-unused-vars */
import { DetailRepository } from '../../domain/detail-repository'
import { detailRemoteDatasource } from '../datasource/detail-remote-datasourceImpl'
import { DetailRemoteDatasource } from '../../domain/detail-remote-datasource'

export const detailRepositoryImpl: DetailRepository = {
  getRepositoryDetail: async (repoFullName: string) => {
    // ! TODO: use DI to inject DetailRemoteDatasource
    const datasource: DetailRemoteDatasource = detailRemoteDatasource

    try {
      const response = await datasource.getRepositoryDetail(repoFullName)

      return response
    } catch (error) {
      throw new Error('Failed to fetch repository list: ' + error)
    }
  },
}

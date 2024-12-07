/* eslint-disable @typescript-eslint/no-unused-vars */
import { DetailRepository } from '../../domain/detail-repository'
import { detailRemoteDatasource } from '../datasource/detail-remote-datasourceImpl'
export const detailRepositoryImpl: DetailRepository = {
  getRepositoryDetail: async (repoFullName: string) => {
    const datasource = detailRemoteDatasource

    try {
      const response = await datasource.getRepositoryDetail(repoFullName)

      return response
    } catch (error) {
      throw new Error('Failed to fetch repository list: ' + error)
    }
  },
}

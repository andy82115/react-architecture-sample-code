import { getApiClient } from '@/src/share/api/api-client';
import { DetailRemoteDatasource } from '../../domain/detail-remote-datasource';

export const detailRemoteDatasource: DetailRemoteDatasource = {
  getRepositoryDetail: async (repoFullName: string) => {
    const apiClient = getApiClient();

    try {
      const response = await apiClient.getRepository.detail(repoFullName);

      return response;
    } catch (error) {
      throw new Error('Failed to fetch repository detail: ' + error);
    }
  },
};

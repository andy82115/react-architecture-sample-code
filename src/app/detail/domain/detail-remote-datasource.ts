import { DetailResponse } from "@/src/share/api/model/detail-response";

export type DetailRemoteDatasource = {
  getRepositoryDetail: (repoFullName: string) => Promise<DetailResponse>;
};
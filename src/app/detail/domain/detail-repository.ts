import { DetailResponse } from "@/src/share/api/model/detail-response";

export type DetailRepository = {
  getRepositoryDetail: (repoFullName: string) => Promise<DetailResponse>;
};
import { SearchResponse } from '../../../share/api/model/search-response'
import { SearchParam } from '../model/search-parameter'

export type SearchRemoteDatasource = {
  getRepositoryList: (param: SearchParam) => Promise<SearchResponse>
}
